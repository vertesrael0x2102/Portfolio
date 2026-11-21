import { useEffect, useRef } from "react";
import { scrollToTop } from "../hooks";
import { sections } from "../data";

export default function Header({ current }) {
  const listRef = useRef(null);

  // On phones the menu scrolls sideways, so keep the active link in view.
  useEffect(() => {
    const ul = listRef.current;
    const active = ul && ul.querySelector('[aria-current="true"]');
    if (active && ul.scrollWidth > ul.clientWidth) ul.scrollLeft = active.offsetLeft - 16;
  }, [current]);

  return (
    <header className="top" id="top">
      <div className="in">
        <a className="logo" href="#top" aria-label="Back to top" onClick={scrollToTop}>VEG</a>
        <nav aria-label="Sections">
          <ul ref={listRef}>
            {sections.map((s) => (
              <li key={s.id}>
                <a className="l" href={`#${s.id}`} aria-current={current === s.id ? "true" : "false"}>{s.label}</a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
