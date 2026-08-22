"use client";

import Image from "next/image";
import type { CSSProperties, FormEvent } from "react";
import { useCallback, useEffect, useRef, useState } from "react";

const weddingDate = new Date("2026-09-07T09:00:00+05:30").getTime();
const googleScriptUrl = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_WEB_APP_URL ?? "";

function Bloom({ className = "" }: { className?: string }) {
  return (
    <span className={`bloom ${className}`} aria-hidden="true">
      {Array.from({ length: 7 }, (_, i) => (
        <i key={i} style={{ "--i": i } as CSSProperties} />
      ))}
      <b />
    </span>
  );
}

function CoupleArt({ className = "" }: { className?: string }) {
  return (
    <div className={`couple-art ${className}`}>
      <Image
        src="/couple-portrait.png"
        alt="Shehan and Gayathri in wedding attire surrounded by burgundy and blush flowers"
        width={763}
        height={1024}
        priority
      />
    </div>
  );
}

/* Luxurious Flowing Silk/Satin Ribbon in theme burgundy/wine, matching reference wavy motion */
function FlowingBurgundyRibbon() {
  return (
    <div className="flowing-ribbon-container" aria-hidden="true">
      <svg className="flowing-ribbon-svg" viewBox="0 0 1200 320" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <defs>
          <linearGradient id="satinMain" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#520b1c" />
            <stop offset="25%" stopColor="#961f3c" />
            <stop offset="45%" stopColor="#d14264" />
            <stop offset="65%" stopColor="#7a142c" />
            <stop offset="85%" stopColor="#a32b49" />
            <stop offset="100%" stopColor="#430816" />
          </linearGradient>
          <linearGradient id="satinFold1" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#380512" />
            <stop offset="50%" stopColor="#871b35" />
            <stop offset="100%" stopColor="#cf3d60" />
          </linearGradient>
          <linearGradient id="satinHighlight" x1="30%" y1="0%" x2="70%" y2="100%">
            <stop offset="0%" stopColor="#ff9cb0" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#e34f73" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#630c22" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="satinUnder" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#2e040e" />
            <stop offset="100%" stopColor="#610f23" />
          </linearGradient>
        </defs>

        {/* Back under-fold shadow layer */}
        <path
          d="M -20 220 
             C 180 260, 320 180, 480 90 
             C 620 10, 780 40, 920 120 
             C 1060 200, 1150 250, 1220 270
             L 1220 320 L -20 320 Z"
          fill="url(#satinUnder)"
          opacity="0.9"
        />

        {/* Main billowing satin body with smooth crests and troughs */}
        <path
          d="M -30 200 
             C 140 240, 290 270, 440 180 
             C 560 105, 680 20, 810 35 
             C 960 52, 1080 160, 1230 190 
             L 1230 300 
             C 1090 260, 950 180, 810 160 
             C 660 140, 540 220, 410 270 
             C 270 320, 110 300, -30 280 Z"
          fill="url(#satinMain)"
        />

        {/* Silk fold ridges / highlights */}
        <path
          d="M -20 205 
             C 150 245, 290 272, 440 185 
             C 555 115, 675 35, 805 45 
             C 950 58, 1075 162, 1220 195 
             C 1085 170, 955 80, 815 65 
             C 685 50, 570 125, 450 198 
             C 310 280, 160 255, -20 215 Z"
          fill="url(#satinHighlight)"
        />

        {/* Secondary undulating crease */}
        <path
          d="M 440 180 
             C 580 90, 700 15, 830 40 
             C 970 65, 1090 175, 1230 205 
             L 1230 240 
             C 1095 205, 975 110, 835 85 
             C 705 60, 585 130, 445 220 Z"
          fill="url(#satinFold1)"
          opacity="0.85"
        />

        {/* Delicate crest sheen line */}
        <path
          d="M 0 210 
             C 160 250, 300 275, 440 190 
             C 560 115, 680 30, 810 42 
             C 955 56, 1080 165, 1220 196"
          stroke="url(#satinHighlight)"
          strokeWidth="3.5"
          strokeLinecap="round"
          opacity="0.75"
        />
      </svg>
    </div>
  );
}

/* Detailed realistic dried floral sprig (baby's breath & golden wheat) matching reference photo */
function BotanicalSprig() {
  return (
    <svg className="botanical-svg" viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <radialGradient id="budGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="60%" stopColor="#f7ebd7" />
          <stop offset="100%" stopColor="#dfc39a" />
        </radialGradient>
        <linearGradient id="stemGrad" x1="0" y1="100%" x2="100%" y2="0">
          <stop offset="0%" stopColor="#8d6840" />
          <stop offset="50%" stopColor="#c3a06a" />
          <stop offset="100%" stopColor="#e5c898" />
        </linearGradient>
        <linearGradient id="wheatGrad" x1="0" y1="100%" x2="100%" y2="0">
          <stop offset="0%" stopColor="#9a7243" />
          <stop offset="50%" stopColor="#deb97e" />
          <stop offset="100%" stopColor="#f5e1b5" />
        </linearGradient>
      </defs>

      {/* Main stems */}
      <path d="M 40 145 Q 85 105 130 50" stroke="url(#stemGrad)" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M 40 145 Q 100 115 165 70" stroke="url(#stemGrad)" strokeWidth="2" strokeLinecap="round" />
      <path d="M 80 110 Q 115 80 145 30" stroke="url(#stemGrad)" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M 60 125 Q 75 80 95 35" stroke="url(#stemGrad)" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M 105 90 Q 130 75 160 45" stroke="url(#stemGrad)" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M 125 70 Q 155 60 185 40" stroke="url(#stemGrad)" strokeWidth="1.3" strokeLinecap="round" />

      {/* Wheat / Pampas feathery head */}
      <g stroke="url(#wheatGrad)" strokeWidth="1.2" strokeLinecap="round">
        <line x1="125" y1="75" x2="148" y2="60" />
        <line x1="130" y1="70" x2="158" y2="58" />
        <line x1="135" y1="65" x2="168" y2="52" />
        <line x1="140" y1="60" x2="175" y2="48" />
        <line x1="145" y1="55" x2="182" y2="42" />
        <line x1="150" y1="50" x2="188" y2="38" />
        <line x1="155" y1="45" x2="192" y2="34" />
        <line x1="160" y1="40" x2="195" y2="28" />
        <line x1="165" y1="35" x2="196" y2="24" />
        {/* Opposing wheat awns */}
        <line x1="128" y1="72" x2="118" y2="56" />
        <line x1="134" y1="66" x2="126" y2="48" />
        <line x1="140" y1="60" x2="134" y2="40" />
        <line x1="146" y1="54" x2="142" y2="32" />
        <line x1="152" y1="48" x2="150" y2="25" />
      </g>

      {/* Wheat grains body */}
      <path d="M 125 75 Q 165 42 195 24" stroke="url(#wheatGrad)" strokeWidth="4.5" strokeLinecap="round" opacity="0.85" />

      {/* Baby's breath delicate white blossom clusters */}
      <g fill="url(#budGlow)">
        <circle cx="95" cy="35" r="3.2" />
        <circle cx="90" cy="42" r="2.6" />
        <circle cx="102" cy="38" r="2.8" />
        <circle cx="85" cy="50" r="2.4" />
        
        <circle cx="145" cy="30" r="3.4" />
        <circle cx="140" cy="24" r="2.8" />
        <circle cx="152" cy="26" r="3" />
        <circle cx="135" cy="36" r="2.5" />

        <circle cx="130" cy="50" r="3.2" />
        <circle cx="122" cy="56" r="2.6" />
        <circle cx="136" cy="44" r="2.7" />

        <circle cx="160" cy="45" r="3.5" />
        <circle cx="168" cy="40" r="2.9" />
        <circle cx="154" cy="52" r="2.6" />

        <circle cx="185" cy="40" r="3" />
        <circle cx="178" cy="46" r="2.5" />

        <circle cx="112" cy="78" r="2.6" />
        <circle cx="104" cy="85" r="2.3" />
      </g>
    </svg>
  );
}

/* Realistic jute twine cord wrapped around envelope with loose radiating fibers */
function TwineWrap() {
  return (
    <svg className="twine-svg" viewBox="0 0 520 360" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="none">
      <defs>
        <linearGradient id="twineGrad" x1="0" y1="0" x2="100%" y2="0">
          <stop offset="0%" stopColor="#a77d46" />
          <stop offset="18%" stopColor="#deb97e" />
          <stop offset="35%" stopColor="#966d3a" />
          <stop offset="55%" stopColor="#deb97e" />
          <stop offset="75%" stopColor="#966d3a" />
          <stop offset="100%" stopColor="#a77d46" />
        </linearGradient>
        <linearGradient id="twineVert" x1="0" y1="0" x2="0" y2="100%">
          <stop offset="0%" stopColor="#c59f6b" />
          <stop offset="100%" stopColor="#7a5227" />
        </linearGradient>
      </defs>

      {/* Horizontal wrapped cords with shadow */}
      <line x1="0" y1="175" x2="520" y2="175" stroke="#25040d" strokeWidth="4.5" opacity="0.35" />
      <line x1="0" y1="174" x2="520" y2="174" stroke="url(#twineGrad)" strokeWidth="3" strokeDasharray="6 2" />
      
      <line x1="0" y1="184" x2="520" y2="184" stroke="#25040d" strokeWidth="4.5" opacity="0.35" />
      <line x1="0" y1="183" x2="520" y2="183" stroke="url(#twineGrad)" strokeWidth="3" strokeDasharray="7 2" />

      {/* Vertical cord to bottom */}
      <line x1="254" y1="180" x2="236" y2="360" stroke="#25040d" strokeWidth="3.8" opacity="0.3" />
      <line x1="254" y1="180" x2="236" y2="360" stroke="url(#twineVert)" strokeWidth="2.8" strokeDasharray="5 1.5" />

      {/* Loose string tails radiating from beneath wax seal */}
      <g stroke="#20030a" strokeWidth="2.4" opacity="0.25" strokeLinecap="round">
        <path d="M 230 191 Q 180 216 140 236" />
        <path d="M 228 199 Q 185 236 155 261" />
        <path d="M 235 206 Q 205 256 185 286" />
        <path d="M 245 211 Q 230 271 220 301" />
        <path d="M 275 211 Q 295 266 315 296" />
        <path d="M 285 201 Q 320 241 345 266" />
        <path d="M 290 191 Q 350 216 390 236" />
        <path d="M 292 183 Q 380 199 420 209" />
      </g>
      <g stroke="#c79f66" strokeWidth="2" strokeLinecap="round">
        <path d="M 230 190 Q 180 215 140 235" />
        <path d="M 228 198 Q 185 235 155 260" />
        <path d="M 235 205 Q 205 255 185 285" />
        <path d="M 245 210 Q 230 270 220 300" />
        <path d="M 275 210 Q 295 265 315 295" />
        <path d="M 285 200 Q 320 240 345 265" />
        <path d="M 290 190 Q 350 215 390 235" />
        <path d="M 292 182 Q 380 198 420 208" />
      </g>
    </svg>
  );
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

    // Keep the viewport fixed while the envelope opens
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });

    setOpening(true);

    // Animation sequence:
    // 0.00s – 0.40s  wax seal release
    // 0.15s – 1.00s  flap opening backward
    // 0.85s – 2.05s  invitation card rises smoothly out of pocket
    // 2.05s – 2.20s  brief pause showing the risen invitation
    // 2.20s – 2.90s  envelope softly fades/scales back
    // 2.40s – 3.20s  main website smoothly reveals
    window.setTimeout(() => {
      setOpened(true);
    }, 3200);

    window.setTimeout(() => {
      document.getElementById("home")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 3300);
  }, []);

  useEffect(() => {
    const update = () => {
      const delta = Math.max(0, weddingDate - Date.now());
      setRemaining({
        days: Math.floor(delta / 86400000),
        hours: Math.floor(delta / 3600000) % 24,
        minutes: Math.floor(delta / 60000) % 60,
        seconds: Math.floor(delta / 1000) % 60,
      });
    };
    update();
    const timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    let touchY = 0;
    const onWheel = (event: WheelEvent) => {
      if (event.deltaY > 3) beginOpening();
    };
    const onTouchStart = (event: TouchEvent) => {
      touchY = event.touches[0]?.clientY ?? 0;
    };
    const onTouchMove = (event: TouchEvent) => {
      if (touchY - (event.touches[0]?.clientY ?? touchY) > 22) beginOpening();
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (["ArrowDown", "PageDown", " ", "Enter"].includes(event.key)) beginOpening();
    };
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

  useEffect(() => {
    if (!opened) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -30px 0px" }
    );

    const elements = document.querySelectorAll(".reveal-on-scroll");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [opened]);

  async function submitRsvp(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setMessage("");
    const form = event.currentTarget;
    try {
      if (!googleScriptUrl) {
        setStatus("setup");
        setMessage("The Google Sheet connection still needs to be configured.");
        return;
      }
      await fetch(googleScriptUrl, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      form.reset();
      setStatus("success");
      setMessage("Your place is saved. We cannot wait to celebrate with you!");
    } catch {
      setStatus("error");
      setMessage("We could not reach the guest list. Please try again.");
    }
  }

  return (
    <>
      <div className={`opening-screen ${opening ? "is-opening" : ""} ${opened ? "is-open" : ""}`} aria-hidden={opened}>
        <div className="opening-petals" aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
          <i />
          <i />
        </div>
        <div className="envelope-scene">
          <p className="envelope-intro">A celebration of love</p>
          <div className="envelope">
            <div className="envelope-glow" />
            <div className="envelope-back" />
            <div className="envelope-card">
              <span className="card-crest">
                S <i>&amp;</i> G
              </span>
              <span className="card-ornament">❦</span>
              <p>Together with their families</p>
              <h1>
                Shehan <i>&amp;</i> Gayathri
              </h1>
              <strong>07 · 09 · 2026</strong>
            </div>
            <div className="envelope-pocket" />
            <div className="envelope-flap" />
            <div className="envelope-twine-wrap">
              <TwineWrap />
            </div>
            <div className="envelope-botanical-wrap">
              <BotanicalSprig />
            </div>
            <button
              className="wax-seal"
              aria-label="Open Shehan and Gayathri's wedding invitation"
              disabled={opening}
              onClick={beginOpening}
            >
              <span className="seal-text">
                S <i>&amp;</i> G
              </span>
            </button>
          </div>
          <p className="seal-hint">
            <span>Scroll to open</span>
            <i aria-hidden="true" />
          </p>
        </div>
      </div>

      <main className={`wedding-site ${opening ? "site-revealing" : ""} ${opened ? "site-visible" : ""}`}>
        <nav aria-label="Wedding navigation">
          <a href="#story">Our story</a>
          <a href="#nakath">Nakath</a>
          <a className="monogram" href="#home">
            S <i>&amp;</i> G
          </a>
          <a href="#venue">Venue</a>
          <a href="#rsvp">RSVP</a>
        </nav>

        <section className="main-hero" id="home">
          <div className="petal-drift" aria-hidden="true">
            <i />
            <i />
            <i />
            <i />
            <i />
          </div>
          <CoupleArt className="hero-art" />
          <div className="hero-copy">
            <p className="micro-label">We invite you to attend</p>
            <h2>The wedding of</h2>
            <h1>
              <span>Shehan</span>
              <i>&amp;</i>
              <span>Gayathri</span>
            </h1>
            <div className="hero-date">
              <b>•</b> 07.09.2026 <b>•</b>
            </div>
            <p>With love and the blessings of our families</p>
          </div>
        </section>

        <section className="story-section reveal-on-scroll" id="story">
          <p className="section-kicker">The bride &amp; groom</p>
          <blockquote>
            “Together with love in our hearts and the blessings of our families, we invite you to share in the joy of our wedding celebration.”
          </blockquote>
          <div className="floral-rule">
            <span />
            <Bloom />
            <span />
          </div>
          <h2 className="script-title">Shehan &amp; Gayathri</h2>
          <p>Together with their parents</p>
          <div className="families">
            <strong>Mr. Pradeep Kumara &amp; Family</strong>
            <i>and</i>
            <strong>Mr. Ajith Kumara &amp; Family</strong>
          </div>
          <p>take pleasure in inviting</p>
          <h3 className="script-title">Our Dear Guest</h3>
          <p>to celebrate their marriage</p>
        </section>

        <section className="details-section reveal-on-scroll" id="venue">
          <div className="details-intro">
            <p className="section-kicker">The sacred union</p>
            <h2>
              A Celebration of<br />
              <em>Tradition &amp; Love</em>
            </h2>
          </div>
          <div className="details-grid">
            <article>
              <span>01</span>
              <p>Date</p>
              <h3>Monday, 7th September</h3>
              <small>The year two thousand twenty-six</small>
            </article>
            <article>
              <span>02</span>
              <p>Time</p>
              <h3>09:00 AM — 04:30 PM</h3>
              <small>A day of love and celebration</small>
            </article>
            <article>
              <span>03</span>
              <p>Venue</p>
              <h3>Nethmi Reception Hall</h3>
              <small>Divulapitiya, Sri Lanka</small>
              <a href="https://www.google.com/maps/dir/?api=1&destination=Nethmi+Reception+Hall%2C+Divulapitiya%2C+Sri+Lanka" target="_blank" rel="noreferrer">
                Get directions ↗
              </a>
            </article>
          </div>
          <div className="venue-map">
            <iframe
              title="Map to Nethmi Reception Hall, Divulapitiya"
              src="https://www.google.com/maps?q=Nethmi%20Reception%20Hall%2C%20Divulapitiya%2C%20Sri%20Lanka&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <p className="joy-note">We joyfully invite you to celebrate the beginning of our forever together.</p>
        </section>

        <section className="timeline-section reveal-on-scroll" id="nakath">
          <p className="section-kicker">Auspicious moments</p>
          <h2>
            Wedding Day <em>Nakath</em>
          </h2>
          <div className="timeline">
            <article>
              <time>
                09:00 <small>AM</small>
              </time>
              <span />
              <div>
                <h3>Guests Arrive</h3>
                <p>Please arrive and be seated before the ceremony begins</p>
              </div>
            </article>
            <article>
              <time>
                10:06 <small>AM</small>
              </time>
              <span />
              <div>
                <h3>Engagement Ceremony</h3>
                <p>The engagement ceremony begins with blessings and joy</p>
              </div>
            </article>
            <article>
              <time>
                10:26 <small>AM</small>
              </time>
              <span />
              <div>
                <h3>Poruwa Ceremony</h3>
                <p>The sacred poruwa ceremony follows in tradition</p>
              </div>
            </article>
            <article>
              <time>
                04:02 <small>PM</small>
              </time>
              <span />
              <div>
                <h3>Couple’s Departure</h3>
                <p>Shehan and Gayathri leave together as husband and wife</p>
              </div>
            </article>
          </div>
        </section>

        <section className="rsvp-section-new reveal-on-scroll" id="rsvp">
          <Bloom className="rsvp-bloom-left" />
          <Bloom className="rsvp-bloom-right" />
          <p className="section-kicker">Kindly respond</p>
          <h2 className="script-title">RSVP</h2>
          <p>We would be honoured by your presence</p>
          {status === "success" ? (
            <div className="rsvp-success" role="status">
              <span>✓</span>
              <h3>Thank you!</h3>
              <p>{message}</p>
              <button onClick={() => setStatus("idle")}>Add another guest</button>
            </div>
          ) : (
            <form onSubmit={submitRsvp}>
              <label>
                Guest name
                <input name="name" autoComplete="name" placeholder="Your full name" required />
              </label>
              <label>
                Telephone number
                <input name="telephone" type="tel" autoComplete="tel" placeholder="07X XXX XXXX" minLength={7} maxLength={20} required />
              </label>
              <label>
                Number of guests
                <input name="count" type="number" min="1" max="20" defaultValue="1" required />
              </label>
              <input className="trap" name="website" tabIndex={-1} autoComplete="off" />
              <button className="send-response" disabled={status === "sending"}>
                {status === "sending" ? "Sending…" : "Send response"}
                <i>→</i>
              </button>
              {(status === "error" || status === "setup") && (
                <p className="form-message" role="alert">
                  {message}
                </p>
              )}
            </form>
          )}
        </section>

        <section className="countdown-section reveal-on-scroll">
          <p className="section-kicker">Counting down</p>
          <h2>To our special day</h2>
          <div className="countdown">
            {Object.entries(remaining).map(([label, value]) => (
              <div key={label}>
                <strong>{String(value).padStart(2, "0")}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>
          <blockquote>
            “Thank you for being part of our love story.<br />
            Your presence will make our day even more special.”
          </blockquote>
          <p className="final-date">07.09.2026</p>
          <FlowingBurgundyRibbon />
        </section>
      </main>
    </>
  );
}
