import { getBookById } from "../../../lib/content-store";
import { getBookBuyLinks } from "../../../lib/book-links";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const book = await getBookById(id);
  if (!book) return { title: 'Book Not Found | Vaasu' };
  return {
    title: `${book.title} | Vaasu`,
    description: book.description || `Buy ${book.title} by ${book.author} from trusted marketplaces.`,
    alternates: {
      canonical: `/books/${book.id}`,
    },
    openGraph: {
      title: `${book.title} | Vaasu`,
      description: book.description || `Buy ${book.title} by ${book.author} from trusted marketplaces.`,
      url: `https://vaasu108.vercel.app/books/${book.id}`,
      type: 'article',
      images: [
        {
          url: `https://vaasu108.vercel.app${book.image || '/images/krishna.png'}`,
          width: 1200,
          height: 630,
          alt: `${book.title} cover`,
        },
      ],
    },
  };
}

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

  const buyLinks = getBookBuyLinks(book);

  return (
    <div className="book-detail-shell">
      <a href="/books" className="book-back-link">Back to all books</a>

      <section className="book-detail-hero">
        <img
          src={book.image || '/images/krishna.png'}
          alt={`${book.title} cover`}
          className="book-detail-cover"
        />
        <div className="book-detail-copy">
          <p className="book-buy-label">Spiritual Book</p>
          <h1 className="book-detail-title">{book.title}</h1>
          <p className="book-detail-author">By {book.author}</p>
          <p className="book-detail-description">{book.description}</p>
        </div>
      </section>

      <section className="book-detail-purchase card book-detail-card">
        <h2 className="book-detail-section-title">Choose where to buy</h2>
        <div className="book-buy-links">
          {buyLinks.map((link) => {
            const label = String(link.label || '').toLowerCase();
            const brand = label.includes('amazon') ? 'amazon' : label.includes('flipkart') ? 'flipkart' : 'generic';
            return (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="sponsored nofollow noopener noreferrer"
                className={`book-buy-link ${brand}`}
              >
                Buy on {link.label}
              </a>
            );
          })}
        </div>
      </section>

      <section className="card book-detail-card">
        <h2 className="book-detail-section-title">About this guide</h2>
        <p className="book-detail-note">
          This page helps visitors quickly compare trusted stores and purchase complete editions.
        </p>
      </section>

      {/* Book JSON-LD / Product schema for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Book",
            name: book.title,
            author: book.author,
            description: book.description || '',
            url: `https://vaasu108.vercel.app/books/${book.id}`,
            image: `https://vaasu108.vercel.app${book.image || '/images/krishna.png'}`,
            offers: buyLinks.map((l) => ({
              "@type": "Offer",
              url: l.url,
              seller: { "@type": "Organization", name: l.label },
              availability: "https://schema.org/InStock"
            }))
          })
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://vaasu108.vercel.app"
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Books",
                item: "https://vaasu108.vercel.app/books"
              },
              {
                "@type": "ListItem",
                position: 3,
                name: book.title,
                item: `https://vaasu108.vercel.app/books/${book.id}`
              }
            ]
          })
        }}
      />
    </div>
  );
}
