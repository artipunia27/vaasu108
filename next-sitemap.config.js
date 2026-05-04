module.exports = {
  siteUrl: 'https://vaasu108.vercel.app/',
  generateRobotsTxt: true,
  changefreq: 'daily',
  priority: 0.7,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/admin/*', '/admin-ramanju-portal', '/admin-ramanju-portal/*'],
      },
    ],
    additionalSitemaps: ['https://vaasu108.vercel.app/api/sitemap'],
  },
};