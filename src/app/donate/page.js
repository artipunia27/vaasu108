export const metadata = {
  title: "Donate | Vaasu - Support Spiritual Content Creation",
  description: "Support our mission to spread spiritual wisdom and devotional content. Your donations help maintain and expand our platform for spiritual growth.",
  keywords: "donate, spiritual donation, support devotional content, charity, hindu donation",
};

export default function Donate() {
  return (
    <div style={{padding: '40px 0'}}>
      <h1 style={{textAlign: 'center', marginBottom: '20px'}}>🙏 Support Our Mission</h1>
      <p style={{textAlign: 'center', color: 'var(--text-light)', marginBottom: '40px', maxWidth: '600px', margin: '0 auto 40px'}}>
        Your generous donations help us maintain this sacred space for spiritual growth and keep our devotional content free for everyone.
      </p>

      <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px', marginBottom: '60px'}}>
        <div className="card">
          <h2 style={{marginBottom: '20px', textAlign: 'center'}}>Why Donate?</h2>
          <ul style={{lineHeight: '1.8', color: 'var(--text-light)'}}>
            <li>💝 Keep all content free and accessible</li>
            <li>📚 Expand our library of Bhajans and Shlokas</li>
            <li>🎵 Add audio recordings and videos</li>
            <li>🌐 Improve website performance and features</li>
            <li>🤝 Support our spiritual community</li>
          </ul>
        </div>

        <div className="card">
          <h2 style={{marginBottom: '20px', textAlign: 'center'}}>Donation Options</h2>
          <div style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
            <button className="btn" style={{width: '100%'}}>
              ₹100 - Basic Support
            </button>
            <button className="btn" style={{width: '100%'}}>
              ₹500 - Monthly Patron
            </button>
            <button className="btn" style={{width: '100%'}}>
              ₹1000 - Premium Supporter
            </button>
            <button className="btn" style={{width: '100%'}}>
              Custom Amount
            </button>
          </div>
        </div>
      </div>

      <div className="card" style={{maxWidth: '600px', margin: '0 auto'}}>
        <h2 style={{marginBottom: '20px', textAlign: 'center'}}>Payment Methods</h2>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '20px'}}>
          <div style={{textAlign: 'center', padding: '20px', border: '2px solid var(--primary)', borderRadius: '8px'}}>
            <div style={{fontSize: '32px', marginBottom: '10px'}}>💳</div>
            <div style={{fontWeight: '600'}}>Credit/Debit Card</div>
          </div>
          <div style={{textAlign: 'center', padding: '20px', border: '2px solid var(--primary)', borderRadius: '8px'}}>
            <div style={{fontSize: '32px', marginBottom: '10px'}}>🏦</div>
            <div style={{fontWeight: '600'}}>Bank Transfer</div>
          </div>
          <div style={{textAlign: 'center', padding: '20px', border: '2px solid var(--primary)', borderRadius: '8px'}}>
            <div style={{fontSize: '32px', marginBottom: '10px'}}>📱</div>
            <div style={{fontWeight: '600'}}>UPI</div>
          </div>
          <div style={{textAlign: 'center', padding: '20px', border: '2px solid var(--primary)', borderRadius: '8px'}}>
            <div style={{fontSize: '32px', marginBottom: '10px'}}>💰</div>
            <div style={{fontWeight: '600'}}>PayPal</div>
          </div>
        </div>
      </div>

      <div style={{textAlign: 'center', marginTop: '60px', padding: '40px', background: 'var(--bg-light)', borderRadius: '16px'}}>
        <h2 style={{marginBottom: '20px'}}>Your Contribution Matters</h2>
        <p style={{color: 'var(--text-light)', marginBottom: '20px', maxWidth: '500px', margin: '0 auto 20px'}}>
          Every donation, no matter the size, helps us continue our mission of spreading spiritual wisdom and maintaining this sacred digital space.
        </p>
        <div style={{fontSize: '48px', marginBottom: '20px'}}>🙏</div>
        <p style={{fontStyle: 'italic', color: 'var(--secondary)'}}>
          "The best way to find yourself is to lose yourself in the service of others." - Mahatma Gandhi
        </p>
      </div>
    </div>
  );
}