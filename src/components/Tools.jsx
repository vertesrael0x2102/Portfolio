import { tools } from "../data";

export default function Tools() {
  return (
    <section className="sec" id="tools">
      <p className="kicker rv">Software</p>
      <h2 className="rv">Tools I use</h2>
      <ul className="tools rv">
        {tools.map((tool) => (
          <li key={tool.name}>
            {tool.href ? (
              <a className="box tool-card" href={tool.href} target="_blank" rel="noreferrer">
                <span className="tool-category">{tool.category}</span>
                <h3>{tool.name} <span aria-hidden="true">↗</span></h3>
                <p>{tool.description}</p>
              </a>
            ) : (
              <div className="box">
                <span className="tool-category">{tool.category}</span>
                <h3>{tool.name}</h3>
                <p>{tool.description}</p>
              </div>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
