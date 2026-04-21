import { getBhajanById } from "../../../lib/content-store";

function splitIntoStanzas(lines) {
  const stanzas = [];
  let current = [];

  for (const rawLine of lines || []) {
    const line = String(rawLine || "");

    if (line.trim() === "") {
      if (current.length > 0) {
        stanzas.push(current);
        current = [];
      }
      continue;
    }

    current.push(line);
  }

  if (current.length > 0) {
    stanzas.push(current);
  }

  if (stanzas.length === 0 && Array.isArray(lines) && lines.length > 0) {
    return [lines.map((line) => String(line || ""))];
  }

  return stanzas;
}

function LyricsSection({ heading, lines, lineColor, badgeColor }) {
  const stanzas = splitIntoStanzas(lines);

  return (
    <div
      className="card"
      style={{
        marginTop: "30px",
        background: "linear-gradient(165deg, rgba(255, 255, 255, 0.97) 0%, rgba(255, 248, 236, 0.96) 100%)",
        border: "1px solid rgba(255, 178, 107, 0.28)",
        boxShadow: "0 16px 38px rgba(193, 82, 62, 0.12)",
      }}
    >
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "10px",
          marginBottom: "18px",
          fontSize: "13px",
          letterSpacing: "1.3px",
          textTransform: "uppercase",
          fontWeight: 700,
          color: badgeColor,
        }}
      >
        <span style={{ width: "10px", height: "10px", borderRadius: "999px", background: badgeColor }} />
        {heading}
      </div>

      <div style={{ display: "grid", gap: "18px" }}>
        {stanzas.map((stanza, stanzaIndex) => (
          <div
            key={`${heading}-${stanzaIndex}`}
            style={{
              padding: "14px 16px",
              borderRadius: "14px",
              background: "rgba(255, 255, 255, 0.88)",
              border: "1px solid rgba(255, 178, 107, 0.18)",
            }}
          >
            {stanza.map((line, lineIndex) => (
              <p
                key={`${heading}-${stanzaIndex}-${lineIndex}`}
                style={{
                  fontSize: "17px",
                  marginBottom: lineIndex === stanza.length - 1 ? 0 : "8px",
                  lineHeight: 1.85,
                  color: lineColor,
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word",
                  textAlign: "left",
                }}
              >
                {line}
              </p>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default async function BhajanDetails({ params }) {
  const { id } = await params;
  const bhajan = await getBhajanById(id);

  if (!bhajan) {
    return (
      <div style={{textAlign: 'center', padding: '100px 0'}}>
        <h1>Bhajan Not Found</h1>
        <p>Sorry, the bhajan you are looking for is not available.</p>
        <a href="/bhajans" className="btn" style={{marginTop: '20px'}}>Back to Search</a>
      </div>
    );
  }

  return (
    <div style={{ padding: "42px 0", maxWidth: "860px", margin: "0 auto" }}>
      <div
        className="card"
        style={{
          textAlign: "center",
          marginBottom: "28px",
          background: "radial-gradient(circle at top, rgba(255, 244, 225, 0.95) 0%, rgba(255, 255, 255, 0.98) 58%, rgba(255, 247, 233, 0.96) 100%)",
          border: "1px solid rgba(255, 178, 107, 0.3)",
          boxShadow: "0 18px 46px rgba(193, 82, 62, 0.14)",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "12px",
            padding: "8px 14px",
            borderRadius: "999px",
            border: "1px solid rgba(255, 178, 107, 0.34)",
            background: "rgba(255, 255, 255, 0.78)",
            color: "#8C3E2F",
            fontWeight: 700,
            fontSize: "13px",
            letterSpacing: "1.2px",
            textTransform: "uppercase",
          }}
        >
          {bhajan.deity} • {bhajan.type}
        </div>

        <h1 style={{ fontSize: "42px", marginTop: "8px", marginBottom: "10px", color: "#5F1B21" }}>{bhajan.title_english}</h1>
        <h2 style={{ fontSize: "32px", color: "#7B341E", fontWeight: 600 }}>{bhajan.title_hindi}</h2>
        <p style={{ marginTop: "20px", fontStyle: "italic", color: "#4A342A", lineHeight: 1.9 }}>{bhajan.description}</p>
        <a 
          href={`https://www.youtube.com/results?search_query=${encodeURIComponent(bhajan.title_english + ' ' + bhajan.title_hindi + ' bhajan')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn" 
          style={{ marginTop: "20px", background: "linear-gradient(135deg, #C1523E 0%, #8C3E2F 100%)", color: "#FFF8EF" }}
        >
          Watch on YouTube
        </a>
      </div>

      <LyricsSection heading="Hindi Lyrics" lines={bhajan.lyrics_hindi} lineColor="#25150F" badgeColor="#A43F24" />
      <LyricsSection heading="English Lyrics" lines={bhajan.lyrics_english} lineColor="#2E2117" badgeColor="#6A1B9A" />
    </div>
  );
}
