import { useEffect, useRef, useState } from "react";
import { profile } from "../data";
import { prefersReducedMotion } from "../hooks";
import me from "../assets/me.webp";

// Types the name out one letter at a time, then leaves a blinking block cursor.
function Typed({ lines }) {
  const reduce = prefersReducedMotion();
  const [typed, setTyped] = useState(reduce ? lines.map((l) => l.length) : [0, 0]);

  useEffect(() => {
    if (reduce) return;
    let line = 0, n = 0;
    const timer = setInterval(() => {
      n++;
      const at = line, count = n;
      setTyped((t) => t.map((v, i) => (i === at ? count : v)));
      if (n >= lines[line].length) {
        if (line === 0) { line = 1; n = 0; } else clearInterval(timer);
      }
    }, 75);
    return () => clearInterval(timer);
  }, [lines, reduce]);

  const cursorLine = typed[1] > 0 || typed[0] >= lines[0].length ? 1 : 0;
  const cursor = <i className="cur" aria-hidden="true" />;
  return (
    <h1 aria-label={lines.join(" ")}>
      {lines.map((l, i) => (
        <span key={l} aria-hidden="true">
          {l.slice(0, typed[i])}
          {cursorLine === i && cursor}
        </span>
      ))}
    </h1>
  );
}

// Draws the photo as big blocks and sharpens it step by step. Hover replays it.
function PixelPhoto() {
  const canvasRef = useRef(null);
  const imgRef = useRef(null);
  const timerRef = useRef(0);

  useEffect(() => {
    const cv = canvasRef.current, img = imgRef.current, ctx = cv.getContext("2d");
    const W = cv.width, H = cv.height, reduce = prefersReducedMotion();

    function draw(block) {
      ctx.clearRect(0, 0, W, H);
      if (block <= 1) { ctx.imageSmoothingEnabled = true; ctx.drawImage(img, 0, 0, W, H); return; }
      const sw = Math.max(1, Math.round(W / block)), sh = Math.max(1, Math.round(H / block));
      const small = document.createElement("canvas");
      small.width = sw; small.height = sh;
      small.getContext("2d").drawImage(img, 0, 0, sw, sh);
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(small, 0, 0, sw, sh, 0, 0, W, H);
    }
    function play() {
      clearInterval(timerRef.current);
      if (reduce) { draw(1); return; }
      const steps = [30, 22, 16, 12, 9, 7, 5, 3, 2, 1];
      let i = 0;
      draw(steps[0]);
      timerRef.current = setInterval(() => {
        i++;
        draw(steps[i]);
        if (i >= steps.length - 1) clearInterval(timerRef.current);
      }, 110);
    }
    let startTimer = 0;
    function start() { draw(1); startTimer = setTimeout(play, reduce ? 0 : 350); }
    function onEnter(e) { if (e.pointerType === "mouse") play(); }

    if (img.complete && img.naturalWidth) start(); else img.addEventListener("load", start);
    cv.addEventListener("pointerenter", onEnter);
    return () => {
      clearTimeout(startTimer);
      clearInterval(timerRef.current);
      img.removeEventListener("load", start);
      cv.removeEventListener("pointerenter", onEnter);
    };
  }, []);

  return (
    <div className="photo">
      <canvas ref={canvasRef} width="231" height="239" role="img" aria-label="Vert Esrael Gumera in a maroon graduation toga and yellow sash" />
      <img ref={imgRef} src={me} alt="" hidden />
    </div>
  );
}

const clockFormat = new Intl.DateTimeFormat("en-US", { timeZone: "Asia/Manila", hour: "numeric", minute: "2-digit", second: "2-digit" });

function Clock() {
  const [now, setNow] = useState(() => clockFormat.format(new Date()));
  useEffect(() => {
    const t = setInterval(() => setNow(clockFormat.format(new Date())), 1000);
    return () => clearInterval(t);
  }, []);
  return <dd>{now}</dd>;
}

export default function Hero() {
  const lines = [profile.firstLine, profile.secondLine];
  return (
    <section className="hero">
      <div className="in">
        <div>
          <p className="stamp">{profile.place}</p>
          <Typed lines={lines} />
          <p className="intro">{profile.intro}</p>
          <div className="go">
            <a className="btn blue" href="#contact">Say hi</a>
            <a className="btn gold" href="/Vert_Esrael_Gumera_Resume.pdf" target="_blank" rel="noreferrer">Resume</a>
            <a className="btn" href={profile.github}>GitHub</a>
            <a className="btn" href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          </div>
        </div>
        <div className="side">
          <PixelPhoto />
          <dl className="box status">
            <div><dt>Status</dt><dd><i className="dot" />Open to work</dd></div>
            <div><dt>Iligan time</dt><Clock /></div>
            <div><dt>Degree</dt><dd>BSIT, MSU-IIT</dd></div>
          </dl>
        </div>
      </div>
    </section>
  );
}
