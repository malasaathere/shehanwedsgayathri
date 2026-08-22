import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import HomePage from "../app/page";
import RsvpPage from "../app/rsvp/page";
import "../app/globals.css";

function App() {
  return window.location.pathname.startsWith("/rsvp") ? <RsvpPage /> : <HomePage />;
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
