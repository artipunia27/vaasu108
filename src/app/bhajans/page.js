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
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <h1 style={{ marginBottom: '12px', color: 'var(--primary)' }}>Search Bhajans</h1>
        <p style={{ color: 'var(--text-light)', marginBottom: 0 }}>
          Search by deity, Hindi title, or English title.
        </p>
      </div>

      <form method="GET" style={{ maxWidth: '560px', margin: '0 auto 28px', textAlign: 'center' }}>
        <input
          name="search"
          type="text"
          placeholder="Search by name, god, or hindi title..."
          defaultValue={query}
          style={{
            padding: '14px 18px',
            width: '100%',
            fontSize: '16px',
            borderRadius: '22px',
            border: '2px solid var(--primary-light)',
            outline: 'none',
            fontFamily: 'inherit'
          }}
        />
      </form>

      <div className="bhajan-search-grid">
        {results.length > 0 ? results.map((bhajan) => (
          <a key={bhajan.id} href={`/bhajans/${bhajan.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="card bhajan-search-card" style={{ cursor: 'pointer' }}>
              <div style={{ fontSize: '12px', color: 'var(--primary)', fontWeight: '700', letterSpacing: '1.2px', textTransform: 'uppercase' }}>{bhajan.deity} • {bhajan.type}</div>
              <h3 style={{ margin: '8px 0 8px', fontSize: '19px', lineHeight: '1.35' }}>{bhajan.title_english}</h3>
              <p style={{ color: 'var(--primary)', fontWeight: '600', marginBottom: '0', fontSize: '14px', lineHeight: '1.5' }}>{bhajan.title_hindi}</p>
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
