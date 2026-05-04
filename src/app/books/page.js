import { getBooksContent } from "../../lib/content-store";
import { getBookBuyLinks } from "../../lib/book-links";

export const metadata = {
  title: "Buy Spiritual Books Online | Vaasu",
  description:
    "Discover popular spiritual books and purchase from trusted stores like Amazon and Flipkart.",
  alternates: {
    canonical: "/books",
  },
  openGraph: {
    title: "Buy Spiritual Books Online | Vaasu",
    description:
      "Browse Bhagavad Gita, Ramayana and other spiritual books with direct buying links.",
    url: "https://vaasu108.vercel.app/books",
    type: "website",
    images: [
      {
        url: "https://vaasu108.vercel.app/images/krishna.png",
        width: 1200,
        height: 630,
        alt: "Vaasu spiritual books",
      },
    ],
  },
};

export default async function BooksPage() {
  const booksData = await getBooksContent();
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Spiritual Books Buying Guide",
    itemListElement: booksData.map((book, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: book.title,
      url: `https://vaasu108.vercel.app/books/${book.id}`,
    })),
  };

  return (
    <div className="books-page-shell">
      <section className="books-hero-band">
        <p className="books-hero-kicker">Trusted Marketplace Picks</p>
        <h1 className="books-hero-title">Buy Spiritual Books With Confidence</h1>
        <p className="books-hero-subtitle">
          A clean buying guide for popular spiritual books. Compare sellers and purchase from trusted stores.
        </p>
      </section>

      <section className="books-buy-grid" aria-label="Spiritual books buying options">
        {booksData.map((book) => (
          <article key={book.id} className="book-buy-card">
            <div className="book-buy-top">
              <img
                src={book.image || "/images/krishna.png"}
                alt={`${book.title} cover`}
                className="book-buy-cover"
                loading="lazy"
              />
              <div className="book-buy-copy">
                <p className="book-buy-label">Spiritual Book</p>
                <h2 className="book-buy-title">{book.title}</h2>
                <p className="book-buy-author">By {book.author}</p>
                <p className="book-buy-description">{book.description}</p>
              </div>
            </div>

            <div className="book-buy-links">
              {getBookBuyLinks(book).map((link) => {
                const label = String(link.label || "").toLowerCase();
                const brand = label.includes("amazon")
                  ? "amazon"
                  : label.includes("flipkart")
                  ? "flipkart"
                  : "generic";
                return (
                  <a
                    key={`${book.id}-${link.label}`}
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

            <div className="book-buy-footer">
              <a href={`/books/${book.id}`} className="book-buy-details-link">
                See all details
              </a>
            </div>
          </article>
        ))}
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
    </div>
  );
}
