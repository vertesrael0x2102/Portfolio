import { profile, chips } from "../data";

export default function About() {
  return (
    <section className="sec" id="about">
      <p className="kicker rv">About</p>
      <h2 className="rv">About me</h2>
      <div className="about rv">
        <div>
          <p>{profile.about}</p>
          <ul className="chips">{chips.map((c) => <li key={c}>{c}</li>)}</ul>
        </div>
        <dl className="box facts">
          <div><dt>Email</dt><dd>{profile.email}</dd></div>
          <div><dt>Location</dt><dd>{profile.place}</dd></div>
          <div><dt>Education</dt><dd>BS Information Technology</dd></div>
          <div><dt>GitHub</dt><dd><a href={profile.github}>{profile.githubName}</a></dd></div>
        </dl>
      </div>
    </section>
  );
}
