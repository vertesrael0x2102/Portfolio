import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "../hooks";

// A picture that follows the mouse while you hover an item. It tilts and wobbles
// with how fast the mouse moves, like it is hanging from the cursor.
// Spread handlers(src, width) onto the element you hover, and render {preview} once in the section.
export function usePeek() {
  const [shown, setShown] = useState(null);
  const boxRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });
  const tilt = useRef({ angle: 0, speed: 0 });
  const frame = useRef(0);

  useEffect(() => {
    if (!shown) return;
    const reduce = prefersReducedMotion();
    pos.current = { ...mouse.current };
    tilt.current = { angle: 0, speed: 0 };

    function step() {
      const box = boxRef.current;
      if (!box) return;
      const prevX = pos.current.x;
      pos.current.x += (mouse.current.x - pos.current.x) * 0.2;
      pos.current.y += (mouse.current.y - pos.current.y) * 0.2;
      const moved = pos.current.x - prevX;

      // spring: the angle is pulled toward a tilt based on how fast it moved sideways
      const goal = reduce ? 0 : Math.max(-16, Math.min(16, moved * 2));
      tilt.current.speed += (goal - tilt.current.angle) * 0.16;
      tilt.current.speed *= 0.82;
      tilt.current.angle += tilt.current.speed;

      const boxWidth = box.offsetWidth;
      const boxHeight = box.offsetHeight;
      const flip = mouse.current.x > window.innerWidth - boxWidth - 40;
      const x = pos.current.x + (flip ? -boxWidth - 26 : 26);
      const y = Math.min(pos.current.y + 20, window.innerHeight - boxHeight - 16);
      box.style.transform = `translate(${x}px, ${Math.max(8, y)}px) rotate(${tilt.current.angle}deg)`;
      frame.current = requestAnimationFrame(step);
    }
    frame.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame.current);
  }, [shown]);

  const handlers = (src, width = 140) =>
    src
      ? {
          onPointerEnter: (e) => {
            if (e.pointerType !== "mouse") return;
            mouse.current = { x: e.clientX, y: e.clientY };
            setShown({ src, width });
          },
          onPointerMove: (e) => {
            if (e.pointerType === "mouse") mouse.current = { x: e.clientX, y: e.clientY };
          },
          onPointerLeave: () => setShown(null),
        }
      : { onPointerEnter: () => setShown(null) };

  const preview = (
    <div className={shown ? "peek on" : "peek"} ref={boxRef} aria-hidden="true">
      {shown && <img src={shown.src} alt="" style={{ width: shown.width }} />}
    </div>
  );
  return { handlers, preview };
}
