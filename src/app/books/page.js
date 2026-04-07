export default function BooksPage() {
  return (
    <div style={{padding: '40px 0'}}>
      <h1 style={{textAlign: 'center', marginBottom: '40px'}}>Spiritual Books Collection</h1>
      <p style={{textAlign: 'center', color: 'var(--text-light)', marginBottom: '40px'}}>
        Explore the absolute truth with these holy scriptures.
      </p>

      <div className="daily-section">
        <div className="card">
          <h2>Shrimad Bhagavad Gita</h2>
          <p style={{color: 'var(--text-light)', marginTop: '10px', marginBottom: '20px'}}>
            The divine song of God, imparted by Lord Krishna to Arjuna on the battlefield of Kurukshetra.
          </p>
          <a href="/books/bhagavad-gita" className="btn">Read Chapters</a>
        </div>

        <div className="card">
          <h2>Ramayana</h2>
          <p style={{color: 'var(--text-light)', marginTop: '10px', marginBottom: '20px'}}>
            The grand epic chronicling the life and journey of Lord Rama.
          </p>
          <a href="#" className="btn">Explore</a>
        </div>

        <div className="card">
          <h2>Shiva Purana</h2>
          <p style={{color: 'var(--text-light)', marginTop: '10px', marginBottom: '20px'}}>
            Deep dive into the supreme consciousness and stories of Lord Shiva.
          </p>
          <a href="#" className="btn">Explore</a>
        </div>
        
      </div>
    </div>
  );
}
