"use client";

import { useMemo, useState } from "react";

function splitLines(value) {
  return String(value || "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function FullTextView({ title, lines }) {
  if (!lines.length) {
    return null;
  }

  return (
    <div style={{ marginTop: "16px", padding: "16px", borderRadius: "16px", border: "1px solid rgba(255, 178, 107, 0.22)", background: "rgba(255, 255, 255, 0.92)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
        <div style={{ width: "10px", height: "10px", borderRadius: "999px", background: "var(--primary)" }} />
        <h3 style={{ marginBottom: 0, color: "var(--primary)", fontSize: "20px" }}>{title}</h3>
      </div>

      <div style={{ display: "grid", gap: "12px" }}>
        {lines.map((line, index) => (
          <div
            key={`${title}-${index}`}
            style={{
              display: "grid",
              gridTemplateColumns: "56px minmax(0, 1fr)",
              gap: "12px",
              alignItems: "start",
              paddingBottom: "10px",
              borderBottom: index === lines.length - 1 ? "none" : "1px solid rgba(255, 178, 107, 0.12)",
            }}
          >
            <div style={{ fontWeight: 700, color: "var(--primary)", fontSize: "14px", lineHeight: 1.6 }}>
              {index + 1}
            </div>
            <div style={{ fontSize: "18px", lineHeight: 1.9, whiteSpace: "pre-wrap", wordBreak: "break-word", color: "#2b2118" }}>
              {line || " "}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function BhajanEditor({ action, initialBhajan }) {
  const [showHindiFullText, setShowHindiFullText] = useState(false);
  const [showEnglishFullText, setShowEnglishFullText] = useState(false);
  const [titleEnglish, setTitleEnglish] = useState(initialBhajan?.titleEnglish || "");
  const [titleHindi, setTitleHindi] = useState(initialBhajan?.titleHindi || "");
  const [deity, setDeity] = useState(initialBhajan?.deity || "");
  const [type, setType] = useState(initialBhajan?.type || "Bhajan");
  const [description, setDescription] = useState(initialBhajan?.description || "");
  const [lyricsHindi, setLyricsHindi] = useState((initialBhajan?.lyricsHindi || []).join("\n"));
  const [lyricsEnglish, setLyricsEnglish] = useState((initialBhajan?.lyricsEnglish || []).join("\n"));

  const hindiLines = useMemo(() => splitLines(lyricsHindi), [lyricsHindi]);
  const englishLines = useMemo(() => splitLines(lyricsEnglish), [lyricsEnglish]);

  return (
    <div className="card" style={{ marginBottom: "26px" }}>
      <h2 style={{ marginTop: 0 }}>Bhajan Composer</h2>
      <p style={{ color: "var(--text-light)", marginTop: 0 }}>
        Edit the bhajan and open the full Hindi or English lyrics in a formatted view before saving.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "18px", alignItems: "start" }}>
        <form action={action} style={{ display: "grid", gap: "10px" }}>
          <input name="existingId" type="hidden" defaultValue={initialBhajan?.id || ""} />
          <input name="adminToken" type="password" placeholder="Admin token" required />
          <input
            name="titleEnglish"
            placeholder="Title (English)"
            value={titleEnglish}
            onChange={(event) => setTitleEnglish(event.target.value)}
            required
          />
          <input
            name="titleHindi"
            placeholder="Title (Hindi)"
            value={titleHindi}
            onChange={(event) => setTitleHindi(event.target.value)}
            required
          />
          <input name="deity" placeholder="Deity" value={deity} onChange={(event) => setDeity(event.target.value)} required />
          <input name="type" placeholder="Type (Bhajan/Aarti/Chalisa)" value={type} onChange={(event) => setType(event.target.value)} />
          <textarea
            name="description"
            placeholder="Description"
            rows={3}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            required
          />
          <textarea
            name="lyricsHindi"
            placeholder="Hindi lyrics (one line per row)"
            rows={8}
            value={lyricsHindi}
            onChange={(event) => setLyricsHindi(event.target.value)}
          />
          <button
            type="button"
            className="btn btn-secondary"
            style={{ width: "fit-content" }}
            onClick={() => setShowHindiFullText((current) => !current)}
          >
            {showHindiFullText ? "Hide Hindi Full Text" : "View Hindi Full Text"}
          </button>
          {showHindiFullText ? <FullTextView title="Hindi Full Lyrics" lines={hindiLines} /> : null}
          <textarea
            name="lyricsEnglish"
            placeholder="English lyrics (one line per row)"
            rows={8}
            value={lyricsEnglish}
            onChange={(event) => setLyricsEnglish(event.target.value)}
          />
          <button
            type="button"
            className="btn btn-secondary"
            style={{ width: "fit-content" }}
            onClick={() => setShowEnglishFullText((current) => !current)}
          >
            {showEnglishFullText ? "Hide English Full Text" : "View English Full Text"}
          </button>
          {showEnglishFullText ? <FullTextView title="English Full Lyrics" lines={englishLines} /> : null}
          <button type="submit" className="btn" style={{ width: "fit-content" }}>
            Save Bhajan
          </button>
        </form>
      </div>
    </div>
  );
}
