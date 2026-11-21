import { useRef, useState } from "react";
import { skills } from "../data";

export default function Skills() {
  const [i, setI] = useState(0);
  const tabRefs = useRef([]);

  function onKey(e, idx) {
    const d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!d) return;
    const n = (idx + d + skills.length) % skills.length;
    setI(n);
    tabRefs.current[n].focus();
  }

  return (
    <section className="sec" id="skills">
      <p className="kicker rv">Skills</p>
      <h2 className="rv">What I can do</h2>
      <div className="tabs rv" role="tablist" aria-label="Skill areas">
        {skills.map((s, idx) => (
          <button
            key={s.tab}
            ref={(el) => (tabRefs.current[idx] = el)}
            className="tab"
            role="tab"
            type="button"
            aria-selected={i === idx}
            tabIndex={i === idx ? 0 : -1}
            onClick={() => setI(idx)}
            onKeyDown={(e) => onKey(e, idx)}
          >
            {s.tab}
          </button>
        ))}
      </div>
      <div className="panel rv" role="tabpanel">{skills[i].text}</div>
    </section>
  );
}
