import bhajansData from '../../../data/bhajans.json';
import booksData from '../../../data/books.json';

export async function GET() {
  const baseUrl = 'https://vaasu-spiritual.vercel.app'; // Production URL

  const staticRoutes = [
    '',
    '/bhajans',
    '/books',
    '/darshan',
    '/meditation',
    '/prayer',
    '/donate',
    '/privacy',
    '/terms',
  ];

  const dynamicRoutes = [
    ...bhajansData.map(b => `/bhajans/${b.id}`),
    ...booksData.map(b => `/books/${b.id}`),
  ];

  const allRoutes = [...staticRoutes, ...dynamicRoutes];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${allRoutes
  .map((route) => {
    const url = `${baseUrl}${route}`;
    const lastmod = new Date().toISOString().split('T')[0];
    const priority = route === '' ? '1.0' : route.startsWith('/bhajans/') || route.startsWith('/books/') ? '0.7' : '0.8';
    const changefreq = route === '' ? 'daily' : 'weekly';

    return `  <url>
    <loc>${url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
  })
  .join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate',
    },
  });
}
