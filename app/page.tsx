"use client";

import { FormEvent, useCallback, useEffect, useRef, useState } from "react";

const weddingDate = new Date("2026-09-07T09:00:00+05:30").getTime();
const googleScriptUrl = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_WEB_APP_URL ?? "";

function Bloom({ className = "" }: { className?: string }) {
  return <span className={`bloom ${className}`} aria-hidden="true">{Array.from({ length: 7 }, (_, i) => <i key={i} style={{ "--i": i } as React.CSSProperties} />)}<b /></span>;
}

function CoupleArt({ className = "" }: { className?: string }) {
  return <div className={`couple-art ${className}`}><img src="/couple-portrait.png" alt="An illustrated bride and groom surrounded by burgundy and blush flowers" /></div>;
}

export default function Home() {
  const [opened, setOpened] = useState(false);
  const [opening, setOpening] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error" | "setup">("idle");
  const [message, setMessage] = useState("");
  const [remaining, setRemaining] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const openingStarted = useRef(false);

  const beginOpening = useCallback(() => {
    if (openingStarted.current) return;
    openingStarted.current = true;
    window.scrollTo({ top: 0 });
    setOpening(true);
    window.setTimeout(() => setOpened(true), 2700);
    window.setTimeout(() => document.getElementById("home")?.scrollIntoView(), 3050);
  }, []);

  useEffect(() => {
    const update = () => {
      const delta = Math.max(0, weddingDate - Date.now());
      setRemaining({ days: Math.floor(delta / 86400000), hours: Math.floor(delta / 3600000) % 24, minutes: Math.floor(delta / 60000) % 60, seconds: Math.floor(delta / 1000) % 60 });
    };
    update(); const timer = window.setInterval(update, 1000); return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    let touchY = 0;
    const onWheel = (event: WheelEvent) => { if (event.deltaY > 3) beginOpening(); };
    const onTouchStart = (event: TouchEvent) => { touchY = event.touches[0]?.clientY ?? 0; };
    const onTouchMove = (event: TouchEvent) => { if (touchY - (event.touches[0]?.clientY ?? touchY) > 22) beginOpening(); };
    const onKeyDown = (event: KeyboardEvent) => { if (["ArrowDown", "PageDown", " "].includes(event.key)) beginOpening(); };
    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [beginOpening]);

  async function submitRsvp(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setStatus("sending"); setMessage(""); const form = event.currentTarget;
    try {
      if (!googleScriptUrl) { setStatus("setup"); setMessage("The Google Sheet connection still needs to be configured."); return; }
      await fetch(googleScriptUrl, { method: "POST", mode: "no-cors", headers: { "Content-Type": "text/plain;charset=utf-8" }, body: JSON.stringify(Object.fromEntries(new FormData(form))) });
      form.reset(); setStatus("success"); setMessage("Your place is saved. We cannot wait to celebrate with you!");
    } catch { setStatus("error"); setMessage("We could not reach the guest list. Please try again."); }
  }

  return (
    <>
      <div className={`opening-screen ${opening ? "is-opening" : ""} ${opened ? "is-open" : ""}`} aria-hidden={opened}>
        <div className="opening-petals" aria-hidden="true"><i /><i /><i /><i /><i /><i /></div>
        <div className="envelope-scene">
          <p className="envelope-intro">A celebration of love</p>
          <div className="envelope">
            <div className="envelope-glow" />
            <div className="envelope-back" />
            <div className="envelope-card">
              <span className="card-crest">S <i>&amp;</i> G</span>
              <span className="card-ornament">❦</span>
              <p>Together with their families</p>
              <h1>Shehan <i>&amp;</i> Gayathri</h1>
              <strong>07 · 09 · 2026</strong>
            </div>
            <div className="envelope-pocket" />
            <div className="envelope-flap" />
            <button
              className="wax-seal"
              aria-label="Open Shehan and Gayathri's wedding invitation"
              disabled={opening}
              onClick={beginOpening}
            ><span>S <i>&amp;</i> G</span></button>
          </div>
          <p className="seal-hint"><span>Scroll to open</span><i aria-hidden="true" /></p>
        </div>
      </div>

      <main className={`wedding-site ${opening ? "site-revealing" : ""} ${opened ? "site-visible" : ""}`}>
        <nav aria-label="Wedding navigation">
          <a href="#story">Our story</a><a href="#nakath">Nakath</a><a className="monogram" href="#home">S <i>&amp;</i> G</a><a href="#venue">Venue</a><a href="#rsvp">RSVP</a>
        </nav>

        <section className="main-hero" id="home">
          <div className="petal-drift" aria-hidden="true"><i /><i /><i /><i /><i /></div>
          <CoupleArt className="hero-art" />
          <div className="hero-copy">
            <p className="micro-label">We invite you to attend</p>
            <h2>The wedding of</h2>
            <h1><span>Shehan</span><i>&amp;</i><span>Gayathri</span></h1>
            <div className="hero-date"><b>•</b> 07.09.2026 <b>•</b></div>
            <p>With love and the blessings of our families</p>
          </div>
        </section>

        <section className="story-section" id="story">
          <p className="section-kicker">The bride &amp; groom</p>
          <blockquote>“Together with love in our hearts and the blessings of our families, we invite you to share in the joy of our wedding celebration.”</blockquote>
          <div className="floral-rule"><span /><Bloom /><span /></div>
          <h2 className="script-title">Shehan &amp; Gayathri</h2>
          <p>Together with their parents</p>
          <div className="families"><strong>Mr. Pradeep Kumara &amp; Family</strong><i>and</i><strong>Mr. Ajith Kumara &amp; Family</strong></div>
          <p>take pleasure in inviting</p>
          <h3 className="script-title">Our Dear Guest</h3>
          <p>to celebrate their marriage</p>
        </section>

        <section className="details-section" id="venue">
          <div className="details-intro"><p className="section-kicker">The sacred union</p><h2>A Celebration of<br /><em>Tradition &amp; Love</em></h2></div>
          <div className="details-grid">
            <article><span>01</span><p>Date</p><h3>Monday, 7th September</h3><small>The year two thousand twenty-six</small></article>
            <article><span>02</span><p>Time</p><h3>09:00 AM — 04:30 PM</h3><small>A day of love and celebration</small></article>
            <article><span>03</span><p>Venue</p><h3>Nethmi Reception Hall</h3><small>Divulapitiya, Sri Lanka</small><a href="https://www.google.com/maps/dir/?api=1&destination=Nethmi+Reception+Hall%2C+Divulapitiya%2C+Sri+Lanka" target="_blank" rel="noreferrer">Get directions ↗</a></article>
          </div>
          <div className="venue-map"><iframe title="Map to Nethmi Reception Hall, Divulapitiya" src="https://www.google.com/maps?q=Nethmi%20Reception%20Hall%2C%20Divulapitiya%2C%20Sri%20Lanka&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></div>
          <p className="joy-note">We joyfully invite you to celebrate the beginning of our forever together.</p>
        </section>

        <section className="timeline-section" id="nakath">
          <p className="section-kicker">Auspicious moments</p><h2>Wedding Day <em>Nakath</em></h2>
          <div className="timeline">
            <article><time>09:00 <small>AM</small></time><span /><div><h3>Guests Arrive</h3><p>Please arrive and be seated before the ceremony begins</p></div></article>
            <article><time>10:06 <small>AM</small></time><span /><div><h3>Engagement Ceremony</h3><p>The engagement ceremony begins with blessings and joy</p></div></article>
            <article><time>10:26 <small>AM</small></time><span /><div><h3>Poruwa Ceremony</h3><p>The sacred poruwa ceremony follows in tradition</p></div></article>
            <article><time>04:02 <small>PM</small></time><span /><div><h3>Couple’s Departure</h3><p>Shehan and Gayathri leave together as husband and wife</p></div></article>
          </div>
        </section>

        <section className="rsvp-section-new" id="rsvp">
          <Bloom className="rsvp-bloom-left" /><Bloom className="rsvp-bloom-right" />
          <p className="section-kicker">Kindly respond</p><h2 className="script-title">RSVP</h2><p>We would be honoured by your presence</p>
          {status === "success" ? <div className="rsvp-success" role="status"><span>✓</span><h3>Thank you!</h3><p>{message}</p><button onClick={() => setStatus("idle")}>Add another guest</button></div> :
            <form onSubmit={submitRsvp}>
              <label>Guest name<input name="name" autoComplete="name" placeholder="Your full name" required /></label>
              <label>Telephone number<input name="telephone" type="tel" autoComplete="tel" placeholder="07X XXX XXXX" minLength={7} maxLength={20} required /></label>
              <label>Number of guests<input name="count" type="number" min="1" max="20" defaultValue="1" required /></label>
              <input className="trap" name="website" tabIndex={-1} autoComplete="off" />
              <button className="send-response" disabled={status === "sending"}>{status === "sending" ? "Sending…" : "Send response"}<i>→</i></button>
              {(status === "error" || status === "setup") && <p className="form-message" role="alert">{message}</p>}
            </form>}
        </section>

        <section className="countdown-section"><p className="section-kicker">Counting down</p><h2>To our special day</h2><div className="countdown">{Object.entries(remaining).map(([label, value]) => <div key={label}><strong>{String(value).padStart(2, "0")}</strong><span>{label}</span></div>)}</div><blockquote>“Thank you for being part of our love story.<br />Your presence will make our day even more special.”</blockquote><p className="final-date">07.09.2026</p></section>
      </main>
    </>
  );
}
