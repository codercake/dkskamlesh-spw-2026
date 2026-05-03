import { useState } from 'react';
import './SectionHeader.css';

export default function SectionHeader({ title, subtitle, align = 'center' }) {
  return (
    <div className={`section-header section-header--${align}`}>
      <div className="section-header__aperture">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3a7 7 0 017 7h-3.5L12 5zm-5.4 3.1L10.1 12H3a7 7 0 013.6-3.9zM3 12h3.5l3.5 7A7 7 0 013 12zm9 7l-3.5-7H12l3.5 7zm5.4-3.1L13.9 12H21a7 7 0 01-3.6 3.9zM12 5l3.5 7H12V5z" fill="currentColor" opacity="0.3" />
        </svg>
      </div>
      <h2 className="section-header__title">{title}</h2>
      {subtitle && <p className="section-header__subtitle">{subtitle}</p>}
      <div className="section-header__line">
        <span className="section-header__line-accent"></span>
      </div>
    </div>
  );
}
