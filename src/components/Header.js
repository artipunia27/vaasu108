'use client';

import { useEffect, useRef, useState } from 'react';

export default function Header() {
  const [isHidden, setIsHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY || window.pageYOffset;
      if (currentScroll > lastScrollY.current && currentScroll > 100) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }
      lastScrollY.current = currentScroll;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header ${isHidden ? 'header-hidden' : ''}`}>
      <div className="header-content">
        <div className="logo" style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
          <svg width="46" height="46" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{filter: 'drop-shadow(0px 4px 8px rgba(255, 107, 53, 0.3))', animation: 'glow 3s ease-in-out infinite'}}>
            <circle cx="50" cy="50" r="25" fill="url(#sun-gradient)" />
            <path d="M 50 15 L 50 25 M 15 50 L 25 50 M 75 50 L 85 50 M 50 75 L 50 85" stroke="#FFB26B" strokeWidth="4" strokeLinecap="round" />
            <path d="M 35 35 L 42 42 M 58 35 L 65 42 M 35 65 L 42 58 M 58 65 L 65 58" stroke="#FFB26B" strokeWidth="3" strokeLinecap="round" />
            <defs>
              <linearGradient id="sun-gradient" x1="50" y1="25" x2="50" y2="75" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FFD56F"/>
                <stop offset="1" stopColor="#FF7B54"/>
              </linearGradient>
            </defs>
          </svg>
          <div>
            <a href="/" className="logo-text" style={{textDecoration: 'none'}}>Vaasu</a>
            <div style={{fontSize: '12px', color: 'var(--text-light)', letterSpacing: '1.2px', textTransform: 'uppercase', marginTop: '2px'}}>
              Daily Bhajans and Sacred Wisdom
            </div>
          </div>
        </div>
        <button
          type="button"
          className={`menu-toggle ${menuOpen ? 'active' : ''}`}
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          ☰
        </button>
        <nav className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <a href="/" className="nav-link" onClick={() => setMenuOpen(false)}>Home</a>
          <a href="/bhajans" className="nav-link" onClick={() => setMenuOpen(false)}>Bhajans</a>
          <a href="/books" className="nav-link" onClick={() => setMenuOpen(false)}>Spiritual Books</a>
          <a href="/darshan" className="nav-link" onClick={() => setMenuOpen(false)}>Daily Darshan</a>
          <a href="/community" className="nav-link" onClick={() => setMenuOpen(false)}>Community Bhajans</a>
          <a href="/meditation" className="nav-link" onClick={() => setMenuOpen(false)}>Meditation</a>
        </nav>
      </div>
    </header>
  );
}