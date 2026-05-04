export const metadata = {
  title: "Vaasu | Daily Bhajans, Shlokas & Spiritual Books | Devotional Content",
  description: "Discover sacred Bhajans, meaningful Shlokas with translations, Mantras, Aarti, and spiritual wisdom from Bhagavad Gita. Your gateway to daily spiritual growth and divine knowledge.",
  keywords: "bhajans, shlokas, spiritual books, bhagavad gita, mantras, aarti, devotional content, hindu spirituality",
  openGraph: {
    title: "Vaasu | Daily Bhajans & Spiritual Wisdom",
    description: "Explore sacred devotional content, spiritual books, and divine mantras.",
    url: "https://vaasu108.vercel.app",
    type: "website",
  },
};

export const revalidate = 86400; // Revalidate daily

import { getBhajansContent, getBooksContent, getShlokasContent } from "../lib/content-store";

export default async function Home() {
  const [shlokasData, bhajansData, booksData] = await Promise.all([
    getShlokasContent(),
    getBhajansContent(),
    getBooksContent(),
  ]);

  const dayIndex = Math.floor(Date.now() / 86400000);
  const pickDailyItem = (items, offset = 0) => {
    if (!items.length) {
      return null;
    }

    return items[(dayIndex + offset) % items.length];
  };

  const dailyShloka = pickDailyItem(shlokasData, 0);
  const dailyBhajan = pickDailyItem(bhajansData, 5);
  const featuredBhajans = bhajansData;

  return (
    <>
      {/* HERO SECTION */}
      <section className="hero" itemScope itemType="https://schema.org/WebPage">
        <meta itemProp="name" content="Vaasu - Spiritual Content Platform" />
        <meta itemProp="description" content="Daily Bhajans, Shlokas, and Spiritual Wisdom" />
        <h1 className="hero-main-text">
          Discover Sacred <span style={{color: 'var(--primary)'}}>Bhajans</span>,
          <br/>
          Meaningful <span style={{color: 'var(--primary)'}}>Shlokas</span>,
          <span className="hero-sub-text">and Timeless Spiritual Books</span>
        </h1>
        <p style={{fontSize: '18px', color: 'var(--text-light)', marginTop: '24px', maxWidth: '600px', margin: '24px auto 0'}}>
          Your gateway to daily spiritual growth through devotional Bhajans, Vedic wisdom, Mantras, and sacred texts of Hinduism.
        </p>
      </section>

      {/* DAILY SPIRITUAL CONTENT */}
      <section className="daily-reframed-section">
        <div className="daily-reframed-head">
          <p className="daily-reframed-kicker">Daily Practice</p>
          <h2>✦ Daily Spiritual Wisdom ✦</h2>
          <p className="daily-reframed-subtext">
            One verse for reflection and one bhajan for devotion, refreshed for your daily sadhana.
          </p>
        </div>

        <div className="daily-reframed-grid">
          <article className="daily-panel daily-panel-shloka">
            <div className="daily-panel-chip">Aaj Ka Shloka</div>
            <p className="daily-shloka-text" style={{ whiteSpace: 'pre-line' }}>
              {dailyShloka?.hindi}
            </p>
            <p className="daily-shloka-meaning">"{dailyShloka?.meaning_english}"</p>
            <p className="daily-panel-meta">
              {dailyShloka?.source} {dailyShloka?.chapter && `(${dailyShloka.chapter}.${dailyShloka.verse})`}
            </p>
            <a href="/bhajans" className="btn btn-small">Read More Shlokas</a>
          </article>

          <article className="daily-panel daily-panel-bhajan">
            <div className="daily-panel-chip">Bhajan Recommendation</div>
            <h3 className="daily-bhajan-title">{dailyBhajan.title_english}</h3>
            <p className="daily-bhajan-desc">{dailyBhajan.description}</p>
            <div className="daily-panel-meta">{dailyBhajan.deity} • {dailyBhajan.type}</div>
            <a href={`/bhajans/${dailyBhajan.id}`} className="btn btn-small">Listen & Read Full Lyrics</a>
          </article>
        </div>
      </section>

      {/* FEATURED BHAJANS */}
      <section style={{marginBottom: '80px'}}>
        <h2 style={{textAlign: 'center', marginBottom: '12px'}}>🎵 Featured Devotional Bhajans</h2>
        <p style={{textAlign: 'center', color: 'var(--text-light)', marginBottom: '30px', fontSize: '16px'}}>
          Experience the divine through these popular spiritual hymns. Listen, learn meanings, and practice daily for spiritual growth.
        </p>
        
        <div className="featured-bhajan-grid">
          {featuredBhajans.map((bhajan) => (
            <div key={bhajan.id} className="card featured-bhajan-card" style={{display: 'flex', flexDirection: 'column'}}>
              <div style={{fontSize: '13px', color: 'var(--primary)', fontWeight: '700', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '10px'}}>
                {bhajan.deity} • {bhajan.type}
              </div>
              <h3 style={{fontSize: '22px', marginBottom: '8px'}}>{bhajan.title_english}</h3>
              <p style={{color: 'var(--primary)', fontWeight: '600', marginBottom: '12px', fontSize: '14px'}}>
                {bhajan.title_hindi}
              </p>
              <p className="featured-bhajan-desc" style={{color: 'var(--text-light)', marginBottom: '16px', flex: '1', lineHeight: '1.7', fontSize: '14px'}}>
                {bhajan.description}
              </p>
              <a href={`/bhajans/${bhajan.id}`} className="btn" style={{alignSelf: 'flex-start'}}>
                Read {bhajan.title_english}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* TRUSTED BY SECTION */}
      <section style={{marginBottom: '80px', textAlign: 'center'}}>
        <h2 style={{textAlign: 'center', marginBottom: '40px'}}>Why Choose Vaasu?</h2>
        
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px'}}>
          {[
            {icon: '🕉️', title: 'Authentic Content', desc: 'Verified spiritual texts from authentic sources'},
            {icon: '🎯', title: 'Daily Guidance', desc: 'Fresh spiritual wisdom delivered every day'},
            {icon: '📖', title: 'Complete Meanings', desc: 'Sanskrit verses with detailed English translations'},
            {icon: '🔐', title: '100% Free', desc: 'Access all spiritual content without subscription'}
          ].map((item, idx) => (
            <div key={idx} className="card" style={{textAlign: 'center'}}>
              <div style={{fontSize: '48px', marginBottom: '16px'}}>{item.icon}</div>
              <h3 style={{fontSize: '20px', marginBottom: '12px'}}>{item.title}</h3>
              <p style={{color: 'var(--text-light)', fontSize: '14px'}}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="card" style={{textAlign: 'center', marginBottom: '60px', background: 'linear-gradient(135deg, rgba(106, 27, 154, 0.05) 0%, rgba(255, 107, 53, 0.05) 100%)'}}>
        <h2 style={{marginBottom: '16px'}}>Begin Your Spiritual Journey Today</h2>
        <p style={{color: 'var(--text-light)', marginBottom: '32px', fontSize: '16px'}}>
          Join thousands seeking spiritual wisdom, daily devotional content, and divine knowledge.
        </p>
        <div style={{display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap'}}>
          <a href="/bhajans" className="btn btn-secondary">Explore Bhajans</a>
          <a href="/books" className="btn">Read Sacred Texts</a>
        </div>
      </section>

      {/* FAQ SCHEMA */}
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
                name: "Bhajans",
                item: "https://vaasu108.vercel.app/bhajans"
              },
              {
                "@type": "ListItem",
                position: 3,
                name: "Books",
                item: "https://vaasu108.vercel.app/books"
              }
            ]
          })
        }}
      />
    </>
  );
}
