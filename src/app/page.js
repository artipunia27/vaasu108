export const metadata = {
  title: "Vaasu | Daily Bhajans, Shlokas & Spiritual Books | Devotional Content",
  description: "Discover sacred Bhajans, meaningful Shlokas with translations, Mantras, Aarti, and spiritual wisdom from Bhagavad Gita. Your gateway to daily spiritual growth and divine knowledge.",
  keywords: "bhajans, shlokas, spiritual books, bhagavad gita, mantras, aarti, devotional content, hindu spirituality",
  openGraph: {
    title: "Vaasu | Daily Bhajans & Spiritual Wisdom",
    description: "Explore sacred devotional content, spiritual books, and divine mantras.",
    url: "https://vaasu.com",
    type: "website",
  },
};

export const revalidate = 86400; // Revalidate daily

import shlokasData from "../data/shlokas.json";
import bhajansData from "../data/bhajans.json";

export default function Home() {
  // Get a stable index for the current day
  const dayOfYear = Math.floor(Date.now() / 86400000);
  const dailyShloka = shlokasData[dayOfYear % shlokasData.length];
  
  // For the daily bhajan, we use a different offset so they don't sync up exactly
  const dailyBhajan = bhajansData[(dayOfYear + 5) % bhajansData.length];

  const bhajans = [
    { 
      id: 1,
      name: 'Hanuman Chalisa', 
      deity: 'Lord Hanuman',
      description: 'A powerful 40-verse devotional hymn praising Lord Hanuman'
    },
    { 
      id: 2,
      name: 'Achyutam Keshavam', 
      deity: 'Lord Krishna',
      description: 'A melodious bhajan dedicated to Lord Krishna and his divine forms'
    },
    { 
      id: 3,
      name: 'Shree Krishna Govind', 
      deity: 'Lord Krishna',
      description: 'A soothing devotional composition celebrating Krishna\'s divine nature'
    },
    { 
      id: 4,
      name: 'Aigiri Nandini', 
      deity: 'Goddess Durga',
      description: 'An energetic hymn honoring Goddess Durga\'s divine power'
    },
    { 
      id: 5,
      name: 'Gayatri Mantra', 
      deity: 'Sun God',
      description: 'The most sacred mantra in Hinduism, praising the Sun deity'
    },
    { 
      id: 6,
      name: 'Om Namah Shivaya', 
      deity: 'Lord Shiva',
      description: 'A powerful mantra for meditation and spiritual awakening'
    }
  ];

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
        
        <div className="daily-section">
          {/* Daily Shloka Card */}
          <div className="card" style={{background: 'linear-gradient(135deg, #FFFAF0 0%, #FFE8CC 100%)', border: '3px solid var(--primary)'}}>
            <div style={{color: 'var(--primary)', marginBottom: '20px', fontSize: '14px', textTransform: 'uppercase', fontWeight: '700', letterSpacing: '2px'}}>
              ✦ Aaj Ka Shloka (Today's Verse) ✦
            </div>
            <div className="shloka-text" style={{whiteSpace: 'pre-line'}}>
              {dailyShloka.hindi}
            </div>
            <div className="shloka-meaning">
              <strong>"{dailyShloka.meaning_english}"</strong>
              <p style={{marginTop: '12px', fontStyle: 'italic', color: '#1C1C1C'}}>
                From {dailyShloka.source} {dailyShloka.chapter && `(${dailyShloka.chapter}.${dailyShloka.verse})`}
              </p>
            </div>
            <a href="/bhajans" className="btn" style={{marginTop: '20px'}}>Read More Shlokas</a>
          </div>

          {/* Daily Bhajan Card */}
          <div className="card" style={{background: 'linear-gradient(135deg, #FFFAF0 0%, #FFF7C2 100%)', border: '3px solid var(--accent)'}}>
            <div style={{color: 'var(--accent)', marginBottom: '20px', fontSize: '14px', textTransform: 'uppercase', fontWeight: '700', letterSpacing: '2px'}}>
              ✦ Bhajan Recommendation ✦
            </div>
            <h3 style={{fontSize: '32px', marginBottom: '12px', color: 'var(--primary)'}}>{dailyBhajan.title_english}</h3>
            <p style={{color: 'var(--text-light)', marginBottom: '20px', fontSize: '16px', lineHeight: '1.8'}}>
              {dailyBhajan.description}
            </p>
            <strong style={{display: 'block', marginBottom: '8px', color: 'var(--secondary)'}}>About this Bhajan:</strong>
            <ul style={{marginLeft: '20px', marginBottom: '20px', lineHeight: '1.8'}}>
              <li>Deity: {dailyBhajan.deity}</li>
              <li>Perfect for: Daily meditation and devotion</li>
            </ul>
            <a href={`/bhajans/${dailyBhajan.id}`} className="btn">Listen & Read Full Lyrics</a>
          </div>
        </div>
      </section>

      {/* SPIRITUAL BOOKS SECTION */}
      <section style={{marginBottom: '80px'}}>
        <h2 style={{textAlign: 'center', marginBottom: '40px'}}>📚 Sacred Spiritual Books</h2>
        
        <div className="card book-section-grid">
          <div className="books-copy">
            <h3>Shrimad Bhagavad Gita</h3>
            <p>
              This sacred dialogue between Lord Krishna and Arjuna teaches duty, devotion, and inner peace.
            </p>
            <p>
              <strong>Key teachings:</strong> Dharma, Karma Yoga, Bhakti, and the path to spiritual freedom.
            </p>
            <p>
              <strong>Benefits:</strong> calmer mind, clear purpose, and deeper spiritual understanding.
            </p>
            <a href="/books" className="btn">Explore Full Library</a>
          </div>
          <div className="books-highlight">
            <h4>18 Chapters</h4>
            <p>700 Verses</p>
            <p><em>"Yoga is the journey of the self, through the self, to the self."</em></p>
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
          {bhajans.map((bhajan) => (
            <div key={bhajan.id} className="card" style={{display: 'flex', flexDirection: 'column'}}>
              <h3 style={{fontSize: '22px', marginBottom: '8px'}}>{bhajan.name}</h3>
              <p style={{color: 'var(--primary)', fontWeight: '600', marginBottom: '12px', fontSize: '14px'}}>
                {bhajan.deity}
              </p>
              <p style={{color: 'var(--text-light)', marginBottom: '20px', flex: '1', lineHeight: '1.8', fontSize: '14px'}}>
                {bhajan.description}
              </p>
              <a href={`/bhajans/${bhajan.id}`} className="btn" style={{alignSelf: 'flex-start'}}>
                Read {bhajan.name}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* UPCOMING FESTIVALS */}
      <section style={{marginBottom: '80px'}}>
        <h2 style={{textAlign: 'center', marginBottom: '40px'}}>🪔 Upcoming Festivals</h2>
        
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px'}}>
          {[
            {name: 'Krishna Janmashtami', date: 'August 26, 2026', desc: 'Celebration of Lord Krishna\'s birth', emoji: '🪔'},
            {name: 'Diwali', date: 'October 29, 2026', desc: 'Festival of lights and victory of good over evil', emoji: '🪔'},
            {name: 'Holi', date: 'March 14, 2026', desc: 'Festival of colors celebrating spring', emoji: '🎨'},
            {name: 'Ram Navami', date: 'April 6, 2026', desc: 'Celebration of Lord Rama\'s birth', emoji: '🏹'}
          ].map((festival, index) => (
            <div key={index} className="card" style={{textAlign: 'center'}}>
              <div style={{fontSize: '48px', marginBottom: '16px'}}>{festival.emoji}</div>
              <h3 style={{marginBottom: '8px'}}>{festival.name}</h3>
              <p style={{color: 'var(--primary)', fontWeight: '600', marginBottom: '12px'}}>{festival.date}</p>
              <p style={{color: 'var(--text-light)', lineHeight: '1.6'}}>{festival.desc}</p>
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
                item: "https://vaasu.com"
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Bhajans",
                item: "https://vaasu.com/bhajans"
              },
              {
                "@type": "ListItem",
                position: 3,
                name: "Books",
                item: "https://vaasu.com/books"
              }
            ]
          })
        }}
      />
    </>
  );
}
