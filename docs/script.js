const GOOGLE_SCRIPT_URL = "";
const weddingDate = new Date("2026-09-07T09:00:00+05:30").getTime();

document.getElementById("open-invitation").addEventListener("click", () => {
  document.getElementById("opening-screen").classList.add("is-open");
  document.getElementById("site").classList.add("site-visible");
  setTimeout(() => document.getElementById("home").scrollIntoView(), 500);
});

function updateCountdown() {
  const delta = Math.max(0, weddingDate - Date.now());
  const values = {
    days: Math.floor(delta / 86400000),
    hours: Math.floor(delta / 3600000) % 24,
    minutes: Math.floor(delta / 60000) % 60,
    seconds: Math.floor(delta / 1000) % 60,
  };
  Object.entries(values).forEach(([id, value]) => document.getElementById(id).textContent = String(value).padStart(2, "0"));
}
updateCountdown();
setInterval(updateCountdown, 1000);

document.getElementById("rsvp-form").addEventListener("submit", async (event) => {
  event.preventDefault();
  const button = document.getElementById("send-response");
  const message = document.getElementById("form-message");
  if (!GOOGLE_SCRIPT_URL) {
    message.hidden = false;
    message.textContent = "The Google Sheet connection still needs to be configured.";
    return;
  }
  button.disabled = true;
  button.querySelector("span").textContent = "Sending…";
  try {
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    data.submittedAt = new Date().toISOString();
    await fetch(GOOGLE_SCRIPT_URL, { method: "POST", mode: "no-cors", headers: { "Content-Type": "text/plain;charset=utf-8" }, body: JSON.stringify(data) });
    form.reset();
    message.hidden = false;
    message.textContent = "Thank you! Your response has been received.";
  } catch {
    message.hidden = false;
    message.textContent = "We could not save your response. Please try again.";
  } finally {
    button.disabled = false;
    button.querySelector("span").textContent = "Send response";
  }
});
