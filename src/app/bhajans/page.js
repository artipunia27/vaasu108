import { getBhajansContent } from "../../lib/content-store";

export default async function BhajansSearch({ searchParams }) {
  const params = await searchParams;
  const godFilter = (params?.god || "").trim();
  const searchFilter = (params?.search || "").trim();
  const query = godFilter || searchFilter;
  const lowerQuery = query.toLowerCase();

  const bhajansData = await getBhajansContent();
  const results = lowerQuery
    ? bhajansData.filter((b) =>
        b.title_english.toLowerCase().includes(lowerQuery) ||
        b.title_hindi.toLowerCase().includes(lowerQuery) ||
        b.deity.toLowerCase().includes(lowerQuery)
      )
    : bhajansData;

  return (
    <div style={{ padding: '40px 0', minHeight: '60vh' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px', color: 'var(--primary)' }}>Search Bhajans</h1>

      <form method="GET" style={{ maxWidth: '600px', margin: '0 auto 40px', textAlign: 'center' }}>
        <input
          name="search"
          type="text"
          placeholder="Search by name, god, or hindi title..."
          defaultValue={query}
          style={{
            padding: '16px',
            width: '100%',
            fontSize: '18px',
            borderRadius: '30px',
            border: '2px solid var(--primary-light)',
            outline: 'none',
            fontFamily: 'inherit'
          }}
        />
      </form>

      <div className="daily-section">
        {results.length > 0 ? results.map((bhajan) => (
          <a key={bhajan.id} href={`/bhajans/${bhajan.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="card" style={{ cursor: 'pointer' }}>
              <div style={{ fontSize: '14px', color: 'var(--primary)', fontWeight: 'bold' }}>{bhajan.deity} • {bhajan.type}</div>
              <h3 style={{ margin: '10px 0', fontSize: '24px' }}>{bhajan.title_english} ({bhajan.title_hindi})</h3>
              <p style={{ color: 'var(--text-light)', marginBottom: '20px' }}>{bhajan.description}</p>
            </div>
          </a>
        )) : (
          <div style={{ textAlign: 'center', gridColumn: 'span 2', color: 'var(--text-light)', padding: '40px' }}>
            No Bhajans found for "{query}".
          </div>
        )}
      </div>
    </div>
  );
}
