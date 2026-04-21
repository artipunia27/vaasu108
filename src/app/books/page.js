import { getBooksContent } from "../../lib/content-store";

export default async function BooksPage() {
  const booksData = await getBooksContent();

  return (
    <div style={{padding: '40px 0'}}>
      <div style={{textAlign: 'center', marginBottom: '44px'}}>
        <div style={{color: 'var(--primary)', fontSize: '14px', fontWeight: '700', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '10px'}}>
          Sacred Library
        </div>
        <h1 style={{textAlign: 'center', marginBottom: '16px'}}>Spiritual Books Collection</h1>
        <p style={{textAlign: 'center', color: 'var(--text-light)', marginBottom: '0'}}>
          Explore timeless scripture, one sacred book at a time.
        </p>
      </div>

      <div className="daily-section">
        {booksData.map((book) => (
          <div key={book.id} className="card" style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
            <div>
              <div style={{fontSize: '13px', color: 'var(--primary)', fontWeight: '700', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '10px'}}>
                Spiritual Book
              </div>
              <h2 style={{marginTop: 0, marginBottom: '12px'}}>{book.title}</h2>
              <p style={{color: 'var(--text-light)', marginBottom: '14px'}}>
                {book.description}
              </p>
              <p style={{marginBottom: 0, color: 'var(--secondary)', fontWeight: '600'}}>
                Author: {book.author}
              </p>
            </div>

            <div style={{background: 'rgba(255,255,255,0.75)', borderRadius: '16px', padding: '18px', border: '1px solid rgba(255, 178, 107, 0.25)'}}>
              <div style={{fontWeight: '700', marginBottom: '8px', color: 'var(--primary)'}}>
                {book.chapters.length} Chapters
              </div>
              <p style={{marginBottom: 0, color: 'var(--text-light)', fontSize: '14px'}}>
                {book.chapters[0]?.title} and more sacred teachings.
              </p>
            </div>

            <a href={`/books/${book.id}`} className="btn" style={{alignSelf: 'flex-start'}}>
              Explore {book.title}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
