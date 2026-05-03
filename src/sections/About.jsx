import { useEffect, useRef, useState } from 'react';
import SectionHeader from '../components/SectionHeader';
import { KAMLESH_BIO, GEAR_LIST } from '../data/constants';
import './About.css';

export default function About() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="about section" id="about" ref={sectionRef}>
      <div className="container">
        <SectionHeader
          title="The Photographer"
          subtitle="The eye behind the lens and the heart behind the community."
        />

        <div className={`about__content ${visible ? 'about__content--visible' : ''}`}>
          {/* Profile image */}
          <div className="about__image-col">
            <div className="about__image-wrapper">
              <img
                src={KAMLESH_BIO.profileImage}
                alt={`${KAMLESH_BIO.name} — ${KAMLESH_BIO.title}`}
                className="about__image"
                loading="lazy"
              />
              <div className="about__image-frame" />
              <div className="about__image-accent" />
            </div>
          </div>

          {/* Info */}
          <div className="about__info-col">
            <div className="about__name-block">
              <h3 className="about__name">{KAMLESH_BIO.name}</h3>
              <span className="about__title">{KAMLESH_BIO.title}</span>
            </div>

            <blockquote className="about__quote">
              {KAMLESH_BIO.philosophy}
            </blockquote>

            <div className="about__bio">
              {KAMLESH_BIO.bio.split('\n\n').map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>

            <div className="about__style">
              <h4 className="about__section-title">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <circle cx="12" cy="12" r="4" />
                  <line x1="21.17" y1="8" x2="12" y2="8" />
                  <line x1="3.95" y1="6.06" x2="8.54" y2="14" />
                  <line x1="10.88" y1="21.94" x2="15.46" y2="14" />
                </svg>
                Photography Style
              </h4>
              <p>{KAMLESH_BIO.style}</p>
            </div>

            {/* Gear */}
            <div className="about__gear">
              <h4 className="about__section-title">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="6" width="20" height="12" rx="2" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="12" cy="12" r="1" />
                  <rect x="15" y="3" width="4" height="3" rx="1" />
                </svg>
                Gear
              </h4>
              <div className="about__gear-list">
                {GEAR_LIST.map(group => (
                  <div key={group.category} className="about__gear-group">
                    <span className="about__gear-category">{group.category}</span>
                    <ul>
                      {group.items.map(item => (
                        <li key={item} className="about__gear-item">{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>



          </div>
        </div>
      </div>
    </section>
  );
}
