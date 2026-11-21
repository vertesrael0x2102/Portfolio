import { useEffect, useRef } from "react";
import { profile } from "../data";
import { prefersReducedMotion } from "../hooks";

// Small seeded random generator, so the pixel pattern is the same on every load.
function seeded(seed) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

const COLS = 64;
const ROWS = 7;
const CELL = 24;
const rand = seeded(2102);

// Squares hang from the top edge and get sparser toward the bottom, like the page dissolving into pixels.
const dither = [];
for (let r = 0; r < ROWS; r++) {
  for (let c = 0; c < COLS; c++) {
    if (rand() < 0.82 - r * 0.13) dither.push({ x: c * CELL, y: r * CELL, shade: rand() < 0.5 ? 1 : 2 });
  }
}

const WORD = "VERT ESRAEL";
const DOT_COLORS = ["#F4B400", "#2B4DE8", "#E5484D", "#8B5CF6", "#F8FAFC"];

// Draws the big name and rains square dots on it. A dot stops when it lands on a letter
// (or on another dot), stays a few seconds, then drops again once what held it up is gone.
function useRain(canvasRef, spaceRef) {
  useEffect(() => {
    const canvas = canvasRef.current;
    const space = spaceRef.current;
    const footer = canvas.parentElement;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    const reduce = prefersReducedMotion();
    let raf = 0, visible = true, stopped = false, running = false;
    let W = 0, H = 0, cell = 5, cols = 0, rows = 0;
    let glyph = new Uint8Array(0);
    let word = null; // the name, drawn once and copied onto the canvas every frame
    let dots = [];
    let last = 0, spawnAcc = 0;
    const occupied = new Map(); // "col,row" -> true while a dot rests there

    function layout() {
      W = footer.clientWidth;
      const probe = document.createElement("canvas").getContext("2d");
      probe.font = '700 100px "Pixelify Sans", "Courier New", monospace';
      const natural = probe.measureText(WORD).width || 1;
      const size = (100 * W) / natural;
      const capHeight = size * 0.7;
      // keep most of the letters visible, and let the bottom be cut off a little
      space.style.height = Math.round(capHeight * 0.9) + "px";
      H = footer.clientHeight;
      const dpr = 1;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      cell = Math.max(5, Math.round(W / 170));
      cols = Math.ceil(W / cell);
      rows = Math.ceil(H / cell);

      word = document.createElement("canvas");
      word.width = W;
      word.height = H;
      const wctx = word.getContext("2d", { willReadFrequently: true });
      wctx.fillStyle = "#F8FAFC";
      wctx.textBaseline = "alphabetic";
      wctx.font = `700 ${size}px "Pixelify Sans", "Courier New", monospace`;
      wctx.fillText(WORD, 0, H + size * 0.1);

      // remember which grid cells are covered by a letter
      const px = wctx.getImageData(0, 0, W, H).data;
      glyph = new Uint8Array(cols * rows);
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = Math.min(W - 1, c * cell + (cell >> 1));
          const y = Math.min(H - 1, r * cell + (cell >> 1));
          glyph[r * cols + c] = px[(y * W + x) * 4 + 3] > 128 ? 1 : 0;
        }
      }
      dots = [];
      occupied.clear();
    }

    const solid = (c, r) => r >= 0 && r < rows && c >= 0 && c < cols && (glyph[r * cols + c] === 1 || occupied.has(c + "," + r));


    function step(now) {
      if (!visible) { running = false; return; }
      raf = requestAnimationFrame(step);
      const dt = Math.min(64, now - last || 16);
      last = now;

      spawnAcc += dt * (W / 120000); // about 10 new dots a second on a wide screen
      while (spawnAcc >= 1) {
        spawnAcc -= 1;
        const c = Math.floor(rand() * cols);
        dots.push({ c, r: -1, color: DOT_COLORS[Math.floor(rand() * DOT_COLORS.length)], wait: 0, speed: 50 + rand() * 50, rest: 0, ttl: 3500 + rand() * 4000 });
      }

      for (let i = dots.length - 1; i >= 0; i--) {
        const d = dots[i];
        if (d.rest) {
          d.rest += dt;
          if (d.rest > d.ttl) {
            occupied.delete(d.c + "," + d.r);
            dots.splice(i, 1);
            continue;
          }
          // if what held it up is gone, it starts falling again
          if (!solid(d.c, d.r + 1) && d.r + 1 < rows) {
            occupied.delete(d.c + "," + d.r);
            d.rest = 0;
          }
          continue;
        }
        d.wait += dt;
        while (d.wait >= d.speed) {
          d.wait -= d.speed;
          if (solid(d.c, d.r + 1)) {
            d.rest = 1;
            occupied.set(d.c + "," + d.r, true);
            break;
          }
          d.r += 1;
          d.speed = Math.max(28, d.speed * 0.985); // gets quicker as it falls
        }
        if (d.r > rows) dots.splice(i, 1);
      }

      render();
    }

    function render() {
      ctx.clearRect(0, 0, W, H);
      ctx.drawImage(word, 0, 0);
      dots.forEach((d) => {
        const left = 1 - Math.min(1, Math.max(0, (d.rest - (d.ttl - 800)) / 800));
        ctx.globalAlpha = d.rest ? left : 1;
        ctx.fillStyle = d.color;
        ctx.fillRect(d.c * cell, d.r * cell, cell - 1, cell - 1);
      });
      ctx.globalAlpha = 1;
    }

    function loop() {
      if (running) return;
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(step);
    }

    function start() {
      cancelAnimationFrame(raf);
      layout();
      render();
      if (!reduce) loop();
    }

    // Nothing here runs until the footer is first scrolled near, so it never slows the first load.
    let started = false;
    function begin() {
      started = true;
      const ready = document.fonts && document.fonts.load ? document.fonts.load('700 100px "Pixelify Sans"').catch(() => {}) : Promise.resolve();
      ready.then(() => { if (!stopped) start(); });
    }

    let resizeTimer = 0;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => { if (!stopped && started) start(); }, 150);
    };
    window.addEventListener("resize", onResize);

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !started) begin();
      else if (visible && started && !reduce && glyph.length) loop();
    }, { rootMargin: "300px 0px" });
    io.observe(footer);

    return () => {
      stopped = true;
      cancelAnimationFrame(raf);
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      io.disconnect();
    };
  }, [canvasRef, spaceRef]);
}

export default function Footer({ say }) {
  const canvasRef = useRef(null);
  const spaceRef = useRef(null);
  const mailRef = useRef(null);

  useRain(canvasRef, spaceRef);

  function selectEmail() {
    const r = document.createRange();
    r.selectNodeContents(mailRef.current);
    const s = window.getSelection();
    s.removeAllRanges();
    s.addRange(r);
    say("Email selected, press copy");
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(profile.email);
      say("Email copied");
    } catch {
      selectEmail();
    }
  }

  return (
    <footer className="end" id="contact">
      <svg className="dither" viewBox={`0 0 ${COLS * CELL} ${ROWS * CELL}`} preserveAspectRatio="xMidYMin slice" aria-hidden="true">
        {dither.map((d) => (
          <rect key={d.x + "-" + d.y} x={d.x} y={d.y} width={CELL} height={CELL} className={`d${d.shade}`} />
        ))}
      </svg>
      <canvas className="stage" ref={canvasRef} role="img" aria-label={profile.fullName} />
      <div className="in end-text">
        <p className="end-brand"><span className="end-logo">VEG</span> {profile.fullName}</p>
        <p className="openTo">{profile.openTo}</p>
        <p className="mail" ref={mailRef}>{profile.email}</p>
        <div className="row">
          <button className="btn gold" type="button" onClick={copy}>Copy email</button>
          <p className="end-links">
            <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn &rarr;</a>
            <a href={profile.github} target="_blank" rel="noreferrer">GitHub &rarr;</a>
          </p>
        </div>
        <p className="end-small">&copy; 2026 {profile.fullName}</p>
      </div>
      <div className="wm-space" ref={spaceRef} aria-hidden="true" />
    </footer>
  );
}
