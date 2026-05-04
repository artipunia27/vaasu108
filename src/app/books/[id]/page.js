import { getBookById } from "../../../lib/content-store";
import { getBookBuyLinks } from "../../../lib/book-links";

export default async function BookDetails({ params }) {
  const { id } = await params;
  const book = await getBookById(id);

  if (!book) {
    return (
      <div style={{textAlign: 'center', padding: '100px 0'}}>
        <h1>Granth Not Found</h1>
        <p>Sorry, the spiritual book you are looking for is not available or is coming soon.</p>
        <a href="/books" className="btn" style={{marginTop: '20px'}}>Back to Books</a>
      </div>
    );
  }

  return (
    <div style={{padding: '36px 0', maxWidth: '860px', margin: '0 auto'}}>
      <div style={{textAlign: 'center', marginBottom: '28px'}}>
        <h1 style={{fontSize: '34px', color: 'var(--primary)', marginBottom: '12px'}}>{book.title}</h1>
        <h2 style={{fontSize: '18px', color: 'var(--text-light)', fontWeight: 'normal', marginTop: '0'}}>
          Author: {book.author}
        </h2>
        <p style={{marginTop: '16px', maxWidth: '700px', marginLeft: 'auto', marginRight: 'auto'}}>{book.description}</p>
      </div>

      <div className="card book-detail-card" style={{marginBottom: '20px'}}>
        <h2 style={{marginTop: 0, marginBottom: '10px', fontSize: '26px'}}>Where to buy this book</h2>
        <p style={{marginTop: 0, color: 'var(--text-light)', fontSize: '15px'}}>
          Choose a marketplace below to buy the complete edition instead of reading partial content on the site.
        </p>
        <div className="marketplace-links">
          {getBookBuyLinks(book).map((link) => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="marketplace-link"
            >
              Buy on {link.label}
            </a>
          ))}
        </div>
      </div>

      <div className="card book-detail-card">
        <h2 style={{marginTop: 0, fontSize: '26px'}}>Why this page exists</h2>
        <p style={{marginBottom: 0, color: 'var(--text-light)', fontSize: '15px'}}>
          This section is now a buying guide for spiritual books, so visitors can quickly reach marketplaces that stock the full book.
        </p>
      </div>
    </div>
  );
}
