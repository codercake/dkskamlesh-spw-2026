import { useState, useEffect, useCallback } from 'react';
import { NAV_LINKS } from '../data/constants';
import './Navbar.css';

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sectionIds = NAV_LINKS.map(l => l.id);
    const observers = [];

    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach(obs => obs.disconnect());
  }, []);

  const scrollTo = useCallback((id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setMobileOpen(false);
    }
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`} id="main-nav">
      <div className="navbar__inner container">
        <button className="navbar__brand" onClick={() => scrollTo('home')} aria-label="Go to home">
          <div className="navbar__logo">
            <svg width="32" height="32" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="24" cy="24" r="14" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="24" cy="24" r="6" fill="currentColor" opacity="0.8" />
              <line x1="24" y1="2" x2="24" y2="10" stroke="currentColor" strokeWidth="1" opacity="0.5" />
              <line x1="24" y1="38" x2="24" y2="46" stroke="currentColor" strokeWidth="1" opacity="0.5" />
              <line x1="2" y1="24" x2="10" y2="24" stroke="currentColor" strokeWidth="1" opacity="0.5" />
              <line x1="38" y1="24" x2="46" y2="24" stroke="currentColor" strokeWidth="1" opacity="0.5" />
            </svg>
          </div>
          <div className="navbar__brand-text">
            <span className="navbar__brand-name">SPW</span>
            <span className="navbar__brand-sub">Photowalk</span>
          </div>
        </button>

        <div className="navbar__links">
          {NAV_LINKS.map(link => (
            <button
              key={link.id}
              className={`navbar__link ${activeSection === link.id ? 'navbar__link--active' : ''}`}
              onClick={() => scrollTo(link.id)}
            >
              {link.label}
              {activeSection === link.id && <span className="navbar__link-indicator" />}
            </button>
          ))}
        </div>

        <button
          className={`navbar__hamburger ${mobileOpen ? 'navbar__hamburger--open' : ''}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          id="mobile-menu-toggle"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile drawer */}
      <div className={`navbar__mobile ${mobileOpen ? 'navbar__mobile--open' : ''}`}>
        <div className="navbar__mobile-overlay" onClick={() => setMobileOpen(false)} />
        <div className="navbar__mobile-drawer">
          <div className="navbar__mobile-header">
            <span className="navbar__brand-name">SPW</span>
          </div>
          {NAV_LINKS.map((link, i) => (
            <button
              key={link.id}
              className={`navbar__mobile-link ${activeSection === link.id ? 'navbar__mobile-link--active' : ''}`}
              onClick={() => scrollTo(link.id)}
              style={{ animationDelay: `${i * 50}ms` }}
            >
              {link.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
