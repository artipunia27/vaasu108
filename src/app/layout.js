import "./globals.css";
import Header from "../components/Header";

// JSON-LD Schema Markup
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Vaasu",
  description: "Premium spiritual platform for Bhajans, Shlokas, Mantras, and sacred wisdom",
  url: "https://vaasu108.vercel.app",
  logo: "https://vaasu108.vercel.app/logo.png",
  sameAs: ["https://facebook.com/vaasu", "https://twitter.com/vaasu"],
  address: {
    "@type": "PostalAddress",
    addressCountry: "IN"
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "Customer Support",
    email: "contact@vaasu.com"
  }
};

const webSiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Vaasu",
  url: "https://vaasu108.vercel.app",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://vaasu108.vercel.app/bhajans?search={search_term_string}"
    },
    query_input: {
      "@type": "PropertyValueSpecification",
      valueRequired: true,
      valueName: "search_term_string"
    }
  }
};

export const metadata = {
  title: "Vaasu | Daily Bhajans, Shlokas & Spiritual Books | Devotional Content",
  description: "Discover sacred Bhajans, meaningful Shlokas with translations, Mantras, Aarti, and spiritual wisdom from Bhagavad Gita. Your gateway to daily spiritual growth.",
  
  // URL base used for generating absolute metadata URLs
  metadataBase: new URL('https://vaasu108.vercel.app'),
  alternates: {
    canonical: '/',
  },

  // Open Graph (Social Media)
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://vaasu108.vercel.app',
    site_name: 'Vaasu',
    title: 'Vaasu | Daily Bhajans, Shlokas & Spiritual Books',
    description: 'Discover sacred Bhajans, meaningful Shlokas, Mantras, and spiritual wisdom. Your gateway to daily spiritual growth.',
    images: [
      {
        url: 'https://vaasu108.vercel.app/images/krishna.png',
        width: 1200,
        height: 630,
        alt: 'Vaasu - Spiritual Content Platform',
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    site: '@vaasu_spiritual',
    creator: '@vaasu_spiritual',
    title: 'Vaasu | Daily Bhajans & Shlokas',
    description: 'Discover sacred devotional content and spiritual wisdom',
    images: ['https://vaasu108.vercel.app/images/krishna.png'],
  },

  // Additional Meta Tags
  keywords: 'bhajans, shlokas, spiritual books, mantras, bhagavad gita, aarti, devotional music, hindu spirituality, spiritual content',
  
  authors: [{ name: 'Vaasu Team' }],
  
  robots: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
  
  // Verification
  verification: {
    google: 'ES6DCeFzxlulDecqWBci08BXplx9ilrNdzuTjUJbOgk',
  },

  icons: {
    icon: '/favicon.ico',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect to external resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Google Fonts */}
        <link href="https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700&family=Lora:wght@400;600&display=swap" rel="stylesheet" />
        <meta name="google-site-verification" content="ES6DCeFzxlulDecqWBci08BXplx9ilrNdzuTjUJbOgk" />
        
        {/* FAQ Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "What is Vaasu?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Vaasu is a premium spiritual platform offering daily Bhajans, Shlokas, Mantras, and spiritual wisdom from Hindu scriptures."
                  }
                },
                {
                  "@type": "Question",
                  name: "Can I access Bhajans for free?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes, all our Bhajans, Shlokas, and spiritual content are available for free."
                  }
                },
                {
                  "@type": "Question",
                  name: "Which spiritual books are available?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "We offer comprehensive access to the Bhagavad Gita, Upanishads, and other sacred texts with detailed explanations."
                  }
                }
              ]
            })
          }}
        />

        {/* Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />

        {/* Website Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
        />
      </head>
      <body>
        <div className="container">
          <Header />

          {/* Main Content */}
          <main role="main">
            {children}
          </main>

          {/* Footer */}
          <footer className="footer" role="contentinfo">
            <div className="footer-content">
              <div className="footer-section">
                <h3>About Vaasu</h3>
                <p>Your sacred gateway to daily spiritual wisdom, devotional Bhajans, and divine knowledge.</p>
              </div>
              <div className="footer-section">
                <h3>Quick Links</h3>
                <ul>
                  <li><a href="/bhajans">Bhajans</a></li>
                  <li><a href="/books">Books</a></li>
                  <li><a href="/darshan">Daily Darshan</a></li>
                </ul>
              </div>
              <div className="footer-section">
                <h3>Support</h3>
                <ul>
                  <li><a href="/community">Community Bhajans</a></li>
                  <li><a href="/books">Spiritual Books</a></li>
                  <li><a href="/meditation">Meditation</a></li>
                </ul>
              </div>
              <div className="footer-section">
                <h3>Legal</h3>
                <ul>
                  <li><a href="/privacy">Privacy Policy</a></li>
                  <li><a href="/terms">Terms of Service</a></li>
                </ul>
              </div>
            </div>
            <div className="footer-bottom">
              <p>&copy; {new Date().getFullYear()} Vaasu. All rights reserved. | Dedicated to spiritual wisdom and divine knowledge.</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
