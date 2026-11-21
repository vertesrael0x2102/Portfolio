import { socials } from "../data";
import { iconPaths } from "../icons";

export default function FindMe() {
  return (
    <section className="sec" id="find">
      <p className="kicker rv">Find me</p>
      <h2 className="rv">Where to find me</h2>
      <ul className="finds rv">
        {socials.map((s) => (
          <li key={s.name}>
            <a href={s.href} target="_blank" rel="noreferrer">
              <svg viewBox="0 0 24 24" width="30" height="30" aria-hidden="true"><path d={iconPaths[s.name]} fill="currentColor" /></svg>
              <span><b>{s.name}</b><small>{s.handle}</small></span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
