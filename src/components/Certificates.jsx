import { useState } from "react";
import { certs, filters } from "../data";
import { usePeek } from "./HoverPeek";

export default function Certificates() {
  const [active, setActive] = useState("all");
  const { handlers, preview } = usePeek();
  const shown = certs.filter((c) => active === "all" || c.group === active);
  const countOf = (key) => (key === "all" ? certs.length : certs.filter((c) => c.group === key).length);

  return (
    <section className="sec" id="certificates">
      <p className="kicker rv">Certificates</p>
      <h2 className="rv">{certs.length} courses completed</h2>
      <div className="filters rv" role="group" aria-label="Filter certificates">
        {filters.map((f) => (
          <button key={f.key} className="f" type="button" aria-pressed={active === f.key} onClick={() => setActive(f.key)}>
            {f.label} {countOf(f.key)}
          </button>
        ))}
      </div>
      <ul className="certs rv">
        {shown.map((c) => (
          <li key={c.name} data-g={c.group} {...handlers(c.badge, 140)}>
            <span className="bd">
              {c.badge && <img src={c.badge} alt={`Cisco Networking Academy verified badge: ${c.name}`} width="56" height="56" />}
            </span>
            <b>{c.tag}</b>
            <span className="nm">
              {c.name}
              {c.file && (
                <small>
                  Completed {c.date} &middot; <a href={c.file} target="_blank" rel="noreferrer">View certificate</a>
                </small>
              )}
            </span>
          </li>
        ))}
      </ul>
      <p className="count" aria-live="polite">
        {active === "all" ? `Showing all ${certs.length}` : `Showing ${shown.length} of ${certs.length}`}
      </p>
      {preview}
    </section>
  );
}
