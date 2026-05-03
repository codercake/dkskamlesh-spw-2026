import { useState, useEffect, useRef } from 'react';
import { albums } from '../data/albums';
import SectionHeader from '../components/SectionHeader';
import Lightbox from '../components/Lightbox';
import './Albums.css';

const FILTER_OPTIONS = ['All', ...new Set(albums.map(a => a.month))];

export default function Albums() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [lightbox, setLightbox] = useState(null); // { albumId, photoIndex }
  const [visibleCards, setVisibleCards] = useState(new Set());
  const cardRefs = useRef([]);

  const filteredAlbums = activeFilter === 'All'
    ? albums
    : albums.filter(a => a.month === activeFilter);

  // Intersection observer for card animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setVisibleCards(prev => new Set([...prev, entry.target.dataset.albumId]));
          }
        });
      },
      { threshold: 0.15 }
    );

    cardRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [filteredAlbums]);

  const openLightbox = (albumId, photoIndex = 0) => {
    setLightbox({ albumId, photoIndex });
  };

  const closeLightbox = () => setLightbox(null);

  const lightboxAlbum = lightbox
    ? albums.find(a => a.id === lightbox.albumId)
    : null;

  return (
    <section className="albums section" id="albums">
      <div className="container">
        <SectionHeader
          title="Photowalk Albums"
          subtitle="Browse through our curated collection from each monthly photowalk — every frame tells a story."
        />

        {/* Filter pills */}
        <div className="albums__filters" role="tablist" id="album-filters">
          {FILTER_OPTIONS.map(filter => (
            <button
              key={filter}
              className={`albums__filter ${activeFilter === filter ? 'albums__filter--active' : ''}`}
              onClick={() => setActiveFilter(filter)}
              role="tab"
              aria-selected={activeFilter === filter}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Albums grid */}
        {filteredAlbums.length === 0 ? (
          <div className="albums__empty">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" opacity="0.3">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
            <p>No albums found for this month.</p>
          </div>
        ) : (
          <div className="albums__grid">
            {filteredAlbums.map((album, i) => (
              <div
                key={album.id}
                className={`albums__card ${visibleCards.has(album.id) ? 'albums__card--visible' : ''}`}
                ref={el => (cardRefs.current[i] = el)}
                data-album-id={album.id}
                style={{ animationDelay: `${i * 0.1}s` }}
                id={`album-card-${album.id}`}
              >
                <div
                  className="albums__card-cover"
                  onClick={() => openLightbox(album.id)}
                >
                  <img
                    src={album.coverImage}
                    alt={album.title}
                    className="albums__card-image"
                    loading="lazy"
                  />
                  <div className="albums__card-overlay">
                    <span className="albums__card-view">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                      View Album
                    </span>
                  </div>
                  <span className="albums__card-badge">{album.photoCount} photos</span>
                </div>

                <div className="albums__card-info">
                  <div className="albums__card-meta">
                    <span className="albums__card-month">{album.month} {album.year}</span>
                    <span className="albums__card-location">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      {album.location}
                    </span>
                  </div>
                  <h3 className="albums__card-title">{album.title}</h3>
                  <p className="albums__card-desc">{album.description}</p>

                  {/* Photo strip preview */}
                  <div className="albums__card-strip">
                    {album.photos.slice(0, 4).map((photo, idx) => (
                      <button
                        key={photo.id}
                        className="albums__card-thumb"
                        onClick={() => openLightbox(album.id, idx)}
                        aria-label={`View ${photo.alt}`}
                      >
                        <img src={photo.src} alt={photo.alt} loading="lazy" />
                      </button>
                    ))}
                    {album.photos.length > 4 && (
                      <button
                        className="albums__card-thumb albums__card-thumb--more"
                        onClick={() => openLightbox(album.id, 4)}
                      >
                        +{album.photos.length - 4}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightbox && lightboxAlbum && (
        <Lightbox
          photos={lightboxAlbum.photos}
          initialIndex={lightbox.photoIndex}
          onClose={closeLightbox}
        />
      )}
    </section>
  );
}
