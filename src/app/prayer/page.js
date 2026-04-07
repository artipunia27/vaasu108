export const metadata = {
  title: "Prayer Requests | Vaasu - Submit Your Devotional Prayers",
  description: "Submit your prayer requests to Lord Krishna and other deities. Join our community in spiritual devotion and find peace through collective prayers.",
  keywords: "prayer requests, devotional prayers, spiritual requests, lord krishna prayers",
};

export default function PrayerRequests() {
  return (
    <div style={{padding: '40px 0'}}>
      <h1 style={{textAlign: 'center', marginBottom: '20px'}}>🙏 Prayer Requests</h1>
      <p style={{textAlign: 'center', color: 'var(--text-light)', marginBottom: '40px', maxWidth: '600px', margin: '0 auto 40px'}}>
        Share your prayers and intentions with our spiritual community. Your prayers are sacred and will be included in our daily devotional practices.
      </p>

      <div className="card" style={{maxWidth: '600px', margin: '0 auto'}}>
        <h2 style={{marginBottom: '20px', textAlign: 'center'}}>Submit Your Prayer</h2>
        <form style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
          <div>
            <label style={{display: 'block', marginBottom: '8px', fontWeight: '600'}}>Your Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              style={{
                width: '100%',
                padding: '12px',
                border: '2px solid var(--primary)',
                borderRadius: '8px',
                fontFamily: 'Merriweather, serif',
                fontSize: '16px'
              }}
            />
          </div>

          <div>
            <label style={{display: 'block', marginBottom: '8px', fontWeight: '600'}}>Email (Optional)</label>
            <input
              type="email"
              placeholder="your.email@example.com"
              style={{
                width: '100%',
                padding: '12px',
                border: '2px solid var(--primary)',
                borderRadius: '8px',
                fontFamily: 'Merriweather, serif',
                fontSize: '16px'
              }}
            />
          </div>

          <div>
            <label style={{display: 'block', marginBottom: '8px', fontWeight: '600'}}>Deity</label>
            <select
              style={{
                width: '100%',
                padding: '12px',
                border: '2px solid var(--primary)',
                borderRadius: '8px',
                fontFamily: 'Merriweather, serif',
                fontSize: '16px'
              }}
            >
              <option>Lord Krishna</option>
              <option>Lord Rama</option>
              <option>Lord Shiva</option>
              <option>Goddess Durga</option>
              <option>Goddess Lakshmi</option>
              <option>Lord Hanuman</option>
              <option>Other</option>
            </select>
          </div>

          <div>
            <label style={{display: 'block', marginBottom: '8px', fontWeight: '600'}}>Your Prayer</label>
            <textarea
              placeholder="Share your prayer, intention, or request..."
              rows="6"
              style={{
                width: '100%',
                padding: '12px',
                border: '2px solid var(--primary)',
                borderRadius: '8px',
                fontFamily: 'Merriweather, serif',
                fontSize: '16px',
                resize: 'vertical'
              }}
            />
          </div>

          <button
            type="submit"
            className="btn"
            style={{alignSelf: 'center', marginTop: '20px'}}
          >
            Submit Prayer 🙏
          </button>
        </form>

        <div style={{marginTop: '40px', padding: '20px', background: 'var(--bg-light)', borderRadius: '8px'}}>
          <h3 style={{marginBottom: '16px'}}>How Your Prayers Are Handled</h3>
          <ul style={{lineHeight: '1.8', color: 'var(--text-light)'}}>
            <li>✅ All prayers are treated with utmost respect and confidentiality</li>
            <li>🙏 Included in our daily puja and devotional ceremonies</li>
            <li>🤝 Shared with our spiritual community for collective prayer</li>
            <li>📧 Optional email updates on prayer progress</li>
          </ul>
        </div>
      </div>
    </div>
  );
}