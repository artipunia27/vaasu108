import { getBooksContent } from "../../lib/content-store";
import { getBookBuyLinks } from "../../lib/book-links";

export default async function BooksPage() {
  const booksData = await getBooksContent();

  return (
    <div style={{padding: '36px 0 20px'}}>
      <div style={{textAlign: 'center', marginBottom: '32px'}}>
        <div style={{color: 'var(--primary)', fontSize: '13px', fontWeight: '700', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '10px'}}>
          Buy Sacred Books
        </div>
        <h1 style={{textAlign: 'center', marginBottom: '12px'}}>Find and Buy Spiritual Books</h1>
        <p style={{textAlign: 'center', color: 'var(--text-light)', marginBottom: '0'}}>
          Browse spiritual books and jump straight to trusted purchase links.
        </p>
      </div>

      <div className="books-catalog">
        {booksData.map((book) => (
          <div key={book.id} className="card book-card-compact">
            <div className="book-card-header">
              <div style={{fontSize: '12px', color: 'var(--primary)', fontWeight: '700', letterSpacing: '1.4px', textTransform: 'uppercase', marginBottom: '10px'}}>
                Purchase Options
              </div>
              <h2 style={{marginTop: 0, marginBottom: '10px', fontSize: '28px'}}>{book.title}</h2>
              <p style={{color: 'var(--text-light)', marginBottom: '12px', fontSize: '15px'}}>
                {book.description}
              </p>
              <p style={{marginBottom: 0, color: 'var(--secondary)', fontWeight: '600', fontSize: '14px'}}>
                Author: {book.author}
              </p>
            </div>

            <div className="book-links-panel">
              <div style={{fontWeight: '700', marginBottom: '10px', color: 'var(--primary)'}}>
                Quick buy links
              </div>
              <div className="marketplace-links">
                {getBookBuyLinks(book).map((link) => (
                  <a
                    key={link.label}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="marketplace-link"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            <a href={`/books/${book.id}`} className="btn btn-small" style={{alignSelf: 'flex-start'}}>
              View all buying options
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
