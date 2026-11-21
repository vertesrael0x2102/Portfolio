import { timeline } from "../data";
import { usePeek } from "./HoverPeek";

export default function Timeline() {
  const { handlers, preview } = usePeek();
  return (
    <section className="sec" id="timeline">
      <p className="kicker rv">Timeline</p>
      <h2 className="rv">From first year to graduation</h2>
      <ol className="tl">
        {timeline.map((t) => (
          <li className="rv" key={t.year + t.title} {...handlers(t.image, 260)}>
            <div className="yr">{t.year}</div>
            <div>
              <span className={`kind ${t.kind}`}>{t.label}</span>
              <h3>{t.title}</h3>
              {t.sub && <p className="sub">{t.sub}</p>}
              {t.text && <p>{t.text}</p>}
              {t.link && <p><a className="tlink" href={t.link.href} target="_blank" rel="noreferrer">{t.link.label}</a></p>}
              {t.bullets && <ul>{t.bullets.map((b) => <li key={b}>{b}</li>)}</ul>}
            </div>
          </li>
        ))}
      </ol>
      {preview}
    </section>
  );
}
