const MARKETPLACE_SOURCES = [
  {
    label: "Amazon",
    buildUrl: (query) => `https://www.amazon.in/s?k=${query}`,
  },
  {
    label: "Flipkart",
    buildUrl: (query) => `https://www.flipkart.com/search?q=${query}`,
  },
  {
    label: "Google Books",
    buildUrl: (query) => `https://books.google.com/books?q=${query}`,
  },
];

function toSearchQuery(book) {
  return encodeURIComponent([book.title, book.author].filter(Boolean).join(" "));
}

function normalizeLink(link) {
  if (!link) {
    return null;
  }

  const label = String(link.label || link.name || "Buy").trim();
  const url = String(link.url || link.href || "").trim();

  if (!url) {
    return null;
  }

  return {
    label,
    url,
  };
}

export function getBookBuyLinks(book) {
  const explicitLinks = Array.isArray(book.purchase_links)
    ? book.purchase_links.map(normalizeLink).filter(Boolean)
    : Array.isArray(book.purchaseLinks)
      ? book.purchaseLinks.map(normalizeLink).filter(Boolean)
      : [];

  if (explicitLinks.length > 0) {
    return explicitLinks;
  }

  const query = toSearchQuery(book);

  return MARKETPLACE_SOURCES.map((source) => ({
    label: source.label,
    url: source.buildUrl(query),
  }));
}