import { tickerWords } from "../data";

// The words are listed twice so the loop has no gap.
export default function Ticker() {
  return (
    <div className="ticker" aria-hidden="true">
      <div className="track">
        {[...tickerWords, ...tickerWords].map((w, i) => <span key={i}>{w}</span>)}
      </div>
    </div>
  );
}
