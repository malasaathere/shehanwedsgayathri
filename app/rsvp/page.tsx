"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

type FormState = "idle" | "sending" | "success" | "error" | "setup";

function PetalFlower({ className = "" }: { className?: string }) {
  return <span className={`bloom ${className}`} aria-hidden="true">{Array.from({ length: 7 }, (_, i) => <i key={i} style={{ "--i": i } as React.CSSProperties} />)}<b /></span>;
}

export default function RsvpPage() {
  const [state, setState] = useState<FormState>("idle");
  const [message, setMessage] = useState("");

  async function submitRsvp(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("sending");
    const form = event.currentTarget;
    try {
      const response = await fetch("/api/rsvp", { method:"POST", headers:{ "Content-Type":"application/json" }, body:JSON.stringify(Object.fromEntries(new FormData(form))) });
      const result = await response.json() as { message?: string; needsSetup?: boolean };
      if (!response.ok) {
        setState(result.needsSetup ? "setup" : "error");
        setMessage(result.message || "කරුණාකර නැවත උත්සාහ කරන්න.");
        return;
      }
      form.reset(); setState("success"); setMessage("ඔබගේ පැමිණීම සාර්ථකව තහවුරු විය.");
    } catch {
      setState("error"); setMessage("සම්බන්ධතාවයේ ගැටලුවක් ඇත. කරුණාකර නැවත උත්සාහ කරන්න.");
    }
  }

  return (
    <main className="rsvp-page">
      <div className="floating-petals" aria-hidden="true"><i /><i /><i /><i /><i /></div>
      <header className="rsvp-header">
        <Link href="/" className="back-link" aria-label="ආරාධනා පත්‍රයට ආපසු යන්න">←</Link>
        <p>මේඝවන් <span>♡</span> ගයත්‍රි</p>
        <span className="header-spacer" />
      </header>

      <section className="rsvp-hero">
        <div className="flower-crown" aria-hidden="true"><PetalFlower className="crown-left" /><PetalFlower className="crown-center" /><PetalFlower className="crown-right" /></div>
        <p className="overline">සපැමිණෙන ඔබ වෙනුවෙන්</p>
        <h1>අප සමඟ<br /><em>සතුට බෙදාගන්න</em></h1>
        <p>2026 සැප්තැම්බර් 07 · පෙ.ව. 9.00</p>
      </section>

      <section className="form-card" aria-labelledby="rsvp-title">
        {state === "success" ? (
          <div className="success" role="status">
            <div className="success-flower"><PetalFlower /><strong>✓</strong></div>
            <p className="overline">ස්තුතියි!</p>
            <h2>ඔබව පිළිගැනීමට<br />අපි සූදානම්</h2>
            <p>{message}</p>
            <Link className="home-button" href="/">ආරාධනා පත්‍රය බලන්න</Link>
          </div>
        ) : (
          <>
            <div className="form-heading"><span aria-hidden="true">✦</span><div><p>ඔබගේ විස්තර</p><h2 id="rsvp-title">පැමිණීම තහවුරු කරන්න</h2></div></div>
            <form onSubmit={submitRsvp}>
              <label><span>ඔබගේ නම</span><div className="input-wrap"><i aria-hidden="true">✧</i><input name="name" type="text" autoComplete="name" placeholder="සම්පූර්ණ නම" maxLength={80} required /></div></label>
              <label><span>දුරකථන අංකය</span><div className="input-wrap"><i aria-hidden="true">☎</i><input name="telephone" type="tel" autoComplete="tel" inputMode="tel" placeholder="07X XXX XXXX" minLength={7} maxLength={20} required /></div></label>
              <label><span>පැමිණෙන සංඛ්‍යාව</span><div className="guest-stepper"><input name="count" type="number" inputMode="numeric" min="1" max="20" defaultValue="1" required /><small>දෙනෙකු</small></div></label>
              <input className="trap" name="website" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" />
              <button className="submit" type="submit" disabled={state === "sending"}>{state === "sending" ? "සුරකිමින් පවතී…" : <><span>තහවුරු කරන්න</span><i aria-hidden="true">→</i></>}</button>
              {(state === "error" || state === "setup") && <p className="form-message" role="alert">{message}</p>}
            </form>
            <p className="privacy-note">ඔබගේ තොරතුරු අපගේ අමුත්තන්ගේ ලැයිස්තුව සඳහා පමණි.</p>
          </>
        )}
      </section>
      <footer className="rsvp-footer"><span /> ආදරයෙන් බලා සිටිමු <span /></footer>
    </main>
  );
}
