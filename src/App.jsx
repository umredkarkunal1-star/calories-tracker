import { useEffect, useState } from "react";

export default function App() {
  const [markup, setMarkup] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadLegacyApplication() {
      try {
        const response = await fetch("/legacy.html");
        if (!response.ok) throw new Error(`Could not load the application markup (${response.status}).`);
        const html = await response.text();
        const documentFragment = new DOMParser().parseFromString(html, "text/html");
        if (!cancelled) setMarkup(documentFragment.body.innerHTML);
      } catch (loadError) {
        if (!cancelled) setError(loadError.message);
      }
    }

    loadLegacyApplication();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!markup) return;
    let disposed = false;

    async function startController() {
      try {
        const controller = await import("../app.js");
        if (!disposed) await controller.initialize();
      } catch (controllerError) {
        if (!disposed) setError(controllerError.message);
      }
    }

    startController();
    return () => {
      disposed = true;
    };
  }, [markup]);

  if (error) {
    return (
      <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: "24px" }}>
        <p role="alert">{error}</p>
      </main>
    );
  }

  if (!markup) {
    return (
      <main
        role="status"
        style={{
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          padding: "24px",
          color: "var(--color-ink)",
          background: "var(--color-cream)",
          fontFamily: "var(--font-sans)",
        }}
      >
        Loading Calorise…
      </main>
    );
  }

  return <div dangerouslySetInnerHTML={{ __html: markup }} />;
}
