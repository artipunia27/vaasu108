"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import bhajansData from "../../data/bhajans.json";

function SearchContent() {
  const searchParams = useSearchParams();
  const godFilter = searchParams.get('god');
  const searchFilter = searchParams.get('search');

  const [query, setQuery] = useState(godFilter || searchFilter || "");
  const [results, setResults] = useState(bhajansData);

  useEffect(() => {
    // Update query when URL parameters change
    const newQuery = godFilter || searchFilter || "";
    setQuery(newQuery);
  }, [godFilter, searchFilter]);

  useEffect(() => {
    if (query.trim() === "") {
      setResults(bhajansData);
      return;
    }
    const lowerQuery = query.toLowerCase();
    const filtered = bhajansData.filter(b => 
      b.title_english.toLowerCase().includes(lowerQuery) || 
      b.title_hindi.toLowerCase().includes(lowerQuery) ||
      b.deity.toLowerCase().includes(lowerQuery)
    );
    setResults(filtered);
  }, [query]);

  return (
    <>
      <div style={{maxWidth: '600px', margin: '0 auto', textAlign: 'center'}}>
        <input 
          type="text" 
          placeholder="Search by name, god, or hindi title..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            padding: '16px',
            width: '100%',
            fontSize: '18px',
            borderRadius: '30px',
            border: '2px solid var(--primary-light)',
            marginBottom: '40px',
            outline: 'none',
            fontFamily: 'inherit'
          }}
        />
      </div>

      <div className="daily-section">
        {results.length > 0 ? results.map(bhajan => (
          <a key={bhajan.id} href={`/bhajans/${bhajan.id}`} style={{textDecoration: 'none', color: 'inherit'}}>
            <div className="card" style={{cursor: 'pointer'}}>
              <div style={{fontSize: '14px', color: 'var(--primary)', fontWeight: 'bold'}}>{bhajan.deity} • {bhajan.type}</div>
              <h3 style={{margin: '10px 0', fontSize: '24px'}}>{bhajan.title_english} ({bhajan.title_hindi})</h3>
              <p style={{color: 'var(--text-light)', marginBottom: '20px'}}>{bhajan.description}</p>
            </div>
          </a>
        )) : (
          <div style={{textAlign: 'center', gridColumn: 'span 2', color: 'var(--text-light)', padding: '40px'}}>No Bhajans found for "{query}".</div>
        )}
      </div>
    </>
  );
}

export default function BhajansSearch() {
  return (
    <div style={{padding: '40px 0', minHeight: '60vh'}}>
      <h1 style={{textAlign: 'center', marginBottom: '30px', color: 'var(--primary)'}}>Search Bhajans</h1>
      <Suspense fallback={<div style={{textAlign: 'center'}}>Loading Search...</div>}>
        <SearchContent />
      </Suspense>
    </div>
  );
}
