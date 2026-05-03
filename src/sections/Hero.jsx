import { useEffect, useRef } from 'react';
import { STATS } from '../data/constants';
import './Hero.css';

export default function Hero() {
  const heroRef = useRef(null);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero" id="home" ref={heroRef}>
      {/* Decorative background elements */}
      <div className="hero__bg">
        <div className="hero__bg-gradient" />
        <div className="hero__bg-grid" />
        <div className="hero__aperture-deco hero__aperture-deco--1">
          <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="100" cy="100" r="95" stroke="currentColor" strokeWidth="0.5" />
            <circle cx="100" cy="100" r="70" stroke="currentColor" strokeWidth="0.5" />
            <circle cx="100" cy="100" r="45" stroke="currentColor" strokeWidth="0.5" />
            <circle cx="100" cy="100" r="20" stroke="currentColor" strokeWidth="0.5" />
            {/* Aperture blades */}
            <path d="M100 5 L115 55 L100 30 Z" fill="currentColor" opacity="0.1" />
            <path d="M195 100 L145 115 L170 100 Z" fill="currentColor" opacity="0.1" />
            <path d="M100 195 L85 145 L100 170 Z" fill="currentColor" opacity="0.1" />
            <path d="M5 100 L55 85 L30 100 Z" fill="currentColor" opacity="0.1" />
          </svg>
        </div>
        <div className="hero__aperture-deco hero__aperture-deco--2">
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="0.5" />
            <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="0.5" />
            <circle cx="50" cy="50" r="15" fill="currentColor" opacity="0.05" />
          </svg>
        </div>
      </div>

      <div className="hero__content container">
        <div className="hero__badge animate-fade-in-up">
          <span className="hero__badge-dot" />
          Next Photowalk: May 2026
        </div>

        <h1 className="hero__title">
          <span className="hero__title-line hero__title-line--1">See the World</span>
          <span className="hero__title-line hero__title-line--2">
            Through a <em className="hero__title-accent">Different</em>
          </span>
          <span className="hero__title-line hero__title-line--3">Lens</span>
        </h1>

        <p className="hero__subtitle">
          A monthly photography community by <strong>DK Kamlesh</strong> — walk, observe, capture, 
          and share the extraordinary beauty hidden in everyday streets.
        </p>

        <div className="hero__actions">
          <button className="btn btn-primary" onClick={() => scrollTo('join')} id="hero-cta-join">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4" />
              <polyline points="10 17 15 12 10 7" />
              <line x1="15" y1="12" x2="3" y2="12" />
            </svg>
            Join the Walk
          </button>
          <button className="btn btn-secondary" onClick={() => scrollTo('albums')} id="hero-cta-albums">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
            Explore Albums
          </button>
        </div>

        <div className="hero__stats">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className="hero__stat"
              style={{ animationDelay: `${0.8 + i * 0.1}s` }}
            >
              <span className="hero__stat-value">{stat.value}</span>
              <span className="hero__stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero__scroll-indicator">
        <div className="hero__scroll-line" />
      </div>
    </section>
  );
}
