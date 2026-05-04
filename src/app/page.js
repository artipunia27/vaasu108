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
      <section style={{marginBottom: '80px'}}>
        <h2 style={{textAlign: 'center', marginBottom: '40px'}}>✦ Daily Spiritual Wisdom ✦</h2>
        
        <div className="daily-wisdom-grid">
          <div className="card wisdom-card wisdom-card-shloka compact-card">
            <div className="wisdom-kicker" style={{color: 'var(--primary)'}}>
              ✦ Aaj Ka Shloka (Today's Verse) ✦
            </div>
            <div className="shloka-text shloka-text-compact shloka-text-tight" style={{whiteSpace: 'pre-line'}}>
              {dailyShloka?.hindi}
            </div>
            <div className="shloka-meaning shloka-meaning-compact">
              <strong>"{dailyShloka?.meaning_english}"</strong>
              <p style={{marginTop: '10px', fontStyle: 'italic', color: '#1C1C1C'}}>
                From {dailyShloka?.source} {dailyShloka?.chapter && `(${dailyShloka.chapter}.${dailyShloka.verse})`}
              </p>
            </div>
            <a href="/bhajans" className="btn btn-small" style={{marginTop: '18px'}}>Read More Shlokas</a>
          </div>

          <div className="card wisdom-card wisdom-card-bhajan compact-card">
            <div className="wisdom-kicker" style={{color: 'var(--accent)'}}>
              ✦ Bhajan Recommendation ✦
            </div>
            <h3 className="wisdom-title">{dailyBhajan.title_english}</h3>
            <p className="wisdom-copy">
              {dailyBhajan.description}
            </p>
            <strong style={{display: 'block', marginBottom: '8px', color: 'var(--secondary)'}}>About this Bhajan:</strong>
            <ul className="wisdom-list">
              <li>Deity: {dailyBhajan.deity}</li>
              <li>Perfect for: Daily meditation and devotion</li>
            </ul>
            <a href={`/bhajans/${dailyBhajan.id}`} className="btn btn-small">Listen & Read Full Lyrics</a>
          </div>
        </div>
      </section>

      {/* FEATURED BHAJANS */}
      <section style={{marginBottom: '80px'}}>
        <h2 style={{textAlign: 'center', marginBottom: '12px'}}>🎵 Featured Devotional Bhajans</h2>
        <p style={{textAlign: 'center', color: 'var(--text-light)', marginBottom: '40px', fontSize: '16px'}}>
          Experience the divine through these popular spiritual hymns. Listen, learn meanings, and practice daily for spiritual growth.
        </p>
        
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px'}}>
          {featuredBhajans.map((bhajan) => (
            <div key={bhajan.id} className="card" style={{display: 'flex', flexDirection: 'column'}}>
              <div style={{fontSize: '13px', color: 'var(--primary)', fontWeight: '700', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '10px'}}>
                {bhajan.deity} • {bhajan.type}
              </div>
              <h3 style={{fontSize: '22px', marginBottom: '8px'}}>{bhajan.title_english}</h3>
              <p style={{color: 'var(--primary)', fontWeight: '600', marginBottom: '12px', fontSize: '14px'}}>
                {bhajan.title_hindi}
              </p>
              <p style={{color: 'var(--text-light)', marginBottom: '20px', flex: '1', lineHeight: '1.8', fontSize: '14px'}}>
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
