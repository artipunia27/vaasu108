export async function GET() {
  const baseUrl = 'https://vaasu-spiritual.vercel.app'; // Production URL

  const routes = [
    '',
    '/bhajans',
    '/books',
    '/darshan',
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${routes
  .map((route) => {
    const url = `${baseUrl}${route}`;
    const lastmod = new Date().toISOString().split('T')[0];
    const priority = route === '' ? '1.0' : '0.8';
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
