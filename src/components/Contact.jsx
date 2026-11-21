import { useRef } from "react";
import { profile } from "../data";

export default function Contact({ say }) {
  const mailRef = useRef(null);

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
    <>
      <section className="contact" id="contact">
        <div className="in">
          <p className="kicker rv">Contact</p>
          <h2 className="rv">Say hi.</h2>
          <p className="rv openTo">{profile.openTo}</p>
          <p className="mail rv" ref={mailRef}>{profile.email}</p>
          <div className="row rv">
            <button className="btn gold" type="button" onClick={copy}>Copy email</button>
            <a className="plain" href={profile.github}>github.com/{profile.githubName}</a>
            <a className="plain" href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          </div>
        </div>
      </section>
      <div className="in foot">{profile.fullName}, Iligan City</div>
    </>
  );
}
