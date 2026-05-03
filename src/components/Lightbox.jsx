import { useState, useEffect, useCallback } from 'react';
import './Lightbox.css';

export default function Lightbox({ photos, initialIndex = 0, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [loading, setLoading] = useState(true);
  const [touchStart, setTouchStart] = useState(null);

  const photo = photos[currentIndex];

  const goNext = useCallback(() => {
    setLoading(true);
    setCurrentIndex(prev => (prev + 1) % photos.length);
  }, [photos.length]);

  const goPrev = useCallback(() => {
    setLoading(true);
    setCurrentIndex(prev => (prev - 1 + photos.length) % photos.length);
  }, [photos.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case 'ArrowRight': goNext(); break;
        case 'ArrowLeft': goPrev(); break;
        case 'Escape': onClose(); break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [goNext, goPrev, onClose]);

  // Touch / swipe
  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (touchStart === null) return;
    const diff = touchStart - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? goNext() : goPrev();
    }
    setTouchStart(null);
  };

  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label="Photo viewer" id="lightbox-overlay">
      <div className="lightbox__backdrop" onClick={onClose} />

      <div className="lightbox__content"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Header */}
        <div className="lightbox__header">
          <span className="lightbox__counter">
            {currentIndex + 1} / {photos.length}
          </span>
          <button className="lightbox__close" onClick={onClose} aria-label="Close lightbox" id="lightbox-close">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Image area */}
        <div className="lightbox__image-area">
          <button className="lightbox__nav lightbox__nav--prev" onClick={goPrev} aria-label="Previous photo">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <div className="lightbox__image-wrapper">
            {loading && (
              <div className="lightbox__loader">
                <div className="lightbox__spinner" />
              </div>
            )}
            <img
              key={photo.id}
              src={photo.src}
              alt={photo.alt}
              className={`lightbox__image ${loading ? 'lightbox__image--loading' : ''}`}
              onLoad={() => setLoading(false)}
              draggable={false}
            />
          </div>

          <button className="lightbox__nav lightbox__nav--next" onClick={goNext} aria-label="Next photo">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>

        {/* Caption */}
        <div className="lightbox__caption">
          <p className="lightbox__caption-text">{photo.alt}</p>
          <p className="lightbox__caption-credit">📷 {photo.photographer}</p>
        </div>
      </div>
    </div>
  );
}
