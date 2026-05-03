import { SOCIAL_LINKS } from '../data/constants';
import './Footer.css';

const ICONS = {
  instagram: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  ),
  twitter: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  linktree: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M7.953 15.066l-.038-4.086 3.06-2.9-1.82-1.92L6.18 9.088 3.236 6.16l-1.9 1.82 2.86 2.96-4.086.04.012 2.668 4.068-.04-2.9 3.06 1.82 1.92 5.896-5.896 1.82 1.92-2.9 3.06 4.068-.04-.012-2.668-4.086.04 2.86-2.96-1.9-1.82-2.946 2.928-2.97-2.928-1.9 1.82 2.86 2.96-4.086.04.012 2.668 4.068-.04-2.9 3.06 1.82 1.92z" />
      <path d="M11.04 0h1.92v8h-1.92zM11.04 16h1.92v8h-1.92z" />
    </svg>
  ),
};

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer" id="footer">
      <div className="container">
        <div className="footer__inner">
          <div className="footer__left">
            <div className="footer__brand">
              <div className="footer__logo">
                <svg width="28" height="28" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="1.5" />
                  <circle cx="24" cy="24" r="14" stroke="currentColor" strokeWidth="1.5" />
                  <circle cx="24" cy="24" r="6" fill="currentColor" opacity="0.8" />
                </svg>
              </div>
              <div>
                <span className="footer__name">SPW Photowalk</span>
                <p className="footer__tagline">See. Walk. Capture.</p>
              </div>
            </div>

            <div className="footer__social">
              {SOCIAL_LINKS.map(link => (
                <a
                  key={link.platform}
                  href={link.url}
                  className="footer__social-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.platform}
                  title={link.platform}
                >
                  {ICONS[link.icon] || link.platform}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copyright">
            © {year} SPW Photowalk. Made with{' '}
            <span className="footer__heart">♥</span> for the photowalk community.
          </p>
          <p className="footer__credit">
            Founded by DK Kamlesh • Chennai, Tamil Nadu, India
          </p>
        </div>
      </div>
    </footer>
  );
}
