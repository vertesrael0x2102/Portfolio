import { useCallback, useEffect, useRef, useState } from "react";
import { sections } from "./data";
import { scrollToTop, useReveal, useScrollState } from "./hooks";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Ticker from "./components/Ticker";
import About from "./components/About";
import Timeline from "./components/Timeline";
import Certificates from "./components/Certificates";
import Skills from "./components/Skills";
import FindMe from "./components/FindMe";
import Contact from "./components/Contact";

const sectionIds = sections.map((s) => s.id);

export default function App() {
  const { current, far } = useScrollState(sectionIds);
  const [toast, setToast] = useState("");
  const toastTimer = useRef(0);

  useReveal();

  // Section content only fades in when the "js" class is on <html>, so it never stays hidden if scripts fail.
  useEffect(() => {
    document.documentElement.classList.add("js");
  }, []);

  const say = useCallback((message) => {
    setToast(message);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(""), 1600);
  }, []);

  return (
    <>
      <Header current={current} />
      <Hero />
      <Ticker />
      <main className="in">
        <About />
        <Timeline />
        <Certificates />
        <Skills />
        <FindMe />
      </main>
      <Contact say={say} />
      <a className={far ? "up on" : "up"} href="#top" aria-label="Back to top" onClick={scrollToTop}>&uarr;</a>
      <div className={toast ? "toast on" : "toast"} role="status">{toast}</div>
    </>
  );
}
