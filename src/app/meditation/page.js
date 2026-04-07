'use client';

import { useState, useEffect } from 'react';

export default function Meditation() {
  const [godName, setGodName] = useState('');
  const [count, setCount] = useState(0);
  const [isActive, setIsActive] = useState(false);

  const incrementCount = () => {
    setCount(prev => prev + 1);
  };

  const resetCount = () => {
    setCount(0);
  };

  const shareNaamJap = () => {
    if (!godName.trim()) {
      alert('Please enter a god name first');
      return;
    }
    
    const message = `🕉️ I completed ${count} naam jap of "${godName}" today on Vaasu! Join me in spiritual practice. #NaamJap #Vaasu #Spirituality`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  useEffect(() => {
    const handleGlobalClick = () => {
      if (isActive && godName.trim()) {
        incrementCount();
      }
    };

    if (isActive) {
      document.addEventListener('click', handleGlobalClick);
    }

    return () => {
      document.removeEventListener('click', handleGlobalClick);
    };
  }, [isActive, godName]);

  return (
    <div style={{padding: '40px 0', textAlign: 'center'}}>
      <h1 style={{marginBottom: '20px'}}>🕉️ Naam Jap Counter</h1>
      <p style={{color: 'var(--text-light)', marginBottom: '40px', maxWidth: '600px', margin: '0 auto 40px'}}>
        Practice naam jap by chanting the name of your chosen deity. Enter the god's name and start your spiritual counting.
      </p>

      <div className="card" style={{maxWidth: '500px', margin: '0 auto'}}>
        <div style={{marginBottom: '30px'}}>
          <label style={{display: 'block', marginBottom: '12px', fontSize: '16px', fontWeight: '600', color: 'var(--primary)'}}>
            Enter God's Name for Naam Jap:
          </label>
          <input
            type="text"
            value={godName}
            onChange={(e) => setGodName(e.target.value)}
            placeholder="e.g., Krishna, Rama, Shiva..."
            style={{
              padding: '16px',
              width: '100%',
              fontSize: '18px',
              borderRadius: '12px',
              border: '2px solid var(--primary-light)',
              textAlign: 'center',
              fontFamily: 'inherit',
              outline: 'none',
              marginBottom: '20px'
            }}
          />
        </div>

        <div style={{
          fontSize: '72px',
          fontFamily: 'Lora, serif',
          color: 'var(--primary)',
          marginBottom: '30px',
          fontWeight: '700'
        }}>
          {count}
        </div>

        <div style={{marginBottom: '20px'}}>
          <p style={{color: 'var(--text-light)', fontSize: '16px'}}>
            {godName ? `Chanting: "${godName}"` : 'Enter a god name to begin'}
          </p>
        </div>

        <div style={{display: 'flex', gap: '15px', justifyContent: 'center', marginBottom: '20px', flexWrap: 'wrap'}}>
          {!isActive ? (
            <button 
              onClick={() => godName.trim() && setIsActive(true)} 
              className="btn"
              disabled={!godName.trim()}
            >
              Start Naam Jap
            </button>
          ) : (
            <>
              <button onClick={() => setIsActive(false)} className="btn">
                Stop
              </button>
              <button
                onClick={resetCount}
                style={{
                  background: 'var(--text-light)',
                  color: 'white',
                  padding: '16px 36px',
                  borderRadius: '50px',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                Reset
              </button>
            </>
          )}
        </div>

        {godName && (
          <button
            onClick={shareNaamJap}
            style={{
              background: '#25D366',
              color: 'white',
              padding: '12px 24px',
              borderRadius: '25px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '14px',
              marginBottom: '20px'
            }}
          >
            📱 Share on WhatsApp
          </button>
        )}

        <div style={{marginTop: '40px', padding: '20px', background: 'var(--bg-light)', borderRadius: '8px'}}>
          <h3 style={{marginBottom: '16px'}}>How to Practice Naam Jap</h3>
          <ul style={{textAlign: 'left', lineHeight: '1.8', color: 'var(--text-light)'}}>
            <li>🕉️ Sit comfortably with your spine straight</li>
            <li>🙏 Focus on the divine name you choose</li>
            <li>📿 Use prayer beads (mala) for counting if available</li>
            <li>🧘‍♀️ Chant with devotion and concentration</li>
            <li>🌅 Practice daily for spiritual growth</li>
          </ul>
        </div>

        <div style={{marginTop: '20px', padding: '20px', background: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)', borderRadius: '8px', color: 'white'}}>
          <h3 style={{marginBottom: '16px'}}>Benefits of Naam Jap</h3>
          <p style={{fontSize: '14px'}}>
            Regular naam jap brings peace, reduces stress, enhances concentration, and deepens your connection with the divine.
          </p>
        </div>
      </div>
    </div>
  );
}