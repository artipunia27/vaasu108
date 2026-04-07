import bhajansData from "../../../data/bhajans.json";

export default async function BhajanDetails({ params }) {
  const { id } = await params;
  const bhajan = bhajansData.find(b => b.id === id);

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
    <div style={{padding: '40px 0', maxWidth: '800px', margin: '0 auto'}}>
      <div style={{textAlign: 'center', marginBottom: '40px'}}>
        <div style={{color: 'var(--primary)', fontWeight: 'bold'}}>{bhajan.deity} • {bhajan.type}</div>
        <h1 style={{fontSize: '36px', marginTop: '10px'}}>{bhajan.title_english}</h1>
        <h2 style={{fontSize: '28px', color: 'var(--text-light)', fontWeight: 'normal'}}>{bhajan.title_hindi}</h2>
        <p style={{marginTop: '20px', fontStyle: 'italic'}}>{bhajan.description}</p>
        <a 
          href={`https://www.youtube.com/results?search_query=${encodeURIComponent(bhajan.title_english + ' ' + bhajan.title_hindi + ' bhajan')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn" 
          style={{marginTop: '20px', background: 'var(--secondary)', color: '#000'}}
        >
          Watch on YouTube
        </a>
      </div>

      <div className="card">
        <h3 style={{marginBottom: '20px', color: 'var(--primary)'}}>हिंदी (Hindi)</h3>
        {bhajan.lyrics_hindi.map((line, i) => (
          <p key={i} style={{fontSize: '20px', marginBottom: '10px'}}>{line}</p>
        ))}
      </div>

      <div className="card" style={{marginTop: '30px'}}>
        <h3 style={{marginBottom: '20px', color: 'var(--primary)'}}>English</h3>
        {bhajan.lyrics_english.map((line, i) => (
          <p key={i} style={{fontSize: '18px', marginBottom: '10px'}}>{line}</p>
        ))}
      </div>
    </div>
  );
}
