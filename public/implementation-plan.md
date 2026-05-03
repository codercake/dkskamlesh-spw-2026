# Kamlesh's Photowalk Community SPA

A single-page photography community application with dark, moody aesthetics inspired by camera culture. Built with React + Vite, fully static, GitHub Pages deployable.

## Proposed Changes

### 1. Project Scaffolding

#### [NEW] Vite + React Project
- Initialize with `npx create-vite@latest ./ --template react`
- Install dependencies: `react-router-dom`, `gh-pages`
- Configure `vite.config.js` with `base` for GitHub Pages
- Add `deploy` script to `package.json`

---

### 2. Design System & Global Styles

#### [NEW] `src/index.css`
- **Color palette**: Deep blacks (#0a0a0a), charcoal grays (#1a1a1a, #2a2a2a), warm amber accents (#d4a853), soft white (#f5f5f0)
- **Typography**: Google Fonts — `Inter` for body, `Playfair Display` for headings
- **CSS custom properties** for all tokens (colors, spacing, radii, shadows)
- **Glassmorphism cards**, subtle grain/noise texture overlay
- **Animations**: fade-in on scroll, parallax-like hero, aperture-blade loading spinner
- **Responsive breakpoints**: 480px, 768px, 1024px, 1280px

---

### 3. Data Layer

#### [NEW] `src/data/albums.js`
- Mock album data for 4+ months (January–April 2026)
- Each album: `{ id, month, year, title, description, location, date, coverImage, photos: [{ id, src, alt, photographer }] }`
- Use placeholder images from `picsum.photos` or generated images

#### [NEW] `src/data/constants.js`
- Navigation links, social links, gear list, experience levels, city options
- Kamlesh's bio text, photography style description

---

### 4. Layout & Navigation

#### [NEW] `src/components/Navbar.jsx` + `Navbar.css`
- Fixed top navbar with logo/brand ("SPW" or aperture icon)
- Smooth scroll links to each section
- Active section indicator (highlight current section on scroll using IntersectionObserver)
- Mobile hamburger menu with slide-in drawer
- Subtle backdrop blur on scroll

#### [NEW] `src/components/Footer.jsx` + `Footer.css`
- Social links, copyright, "Made with ❤️ for the photowalk community"

#### [NEW] `src/App.jsx`
- Single-page layout: all sections rendered vertically
- HashRouter wrapping for GitHub Pages compatibility
- Scroll-to-section logic

---

### 5. Sections / Components

#### [NEW] `src/sections/Hero.jsx` + `Hero.css`
- Full-viewport hero with dark atmospheric background
- Animated tagline with typewriter or fade-in effect
- Camera lens/aperture decorative SVG elements
- Two CTAs: "Join Next Photowalk" → scrolls to Join Us, "Explore Albums" → scrolls to Albums
- Subtle parallax on background image
- Stats bar: "4+ Months", "50+ Photos", "20+ Members"

#### [NEW] `src/sections/Albums.jsx` + `Albums.css`
- Section header with month filter pills (All, January, February, March, April)
- Grid of album cards with hover zoom effect and overlay info
- Each card shows: cover image, month/title, photo count, location
- Click opens a **Lightbox** component

#### [NEW] `src/components/Lightbox.jsx` + `Lightbox.css`
- Full-screen overlay with backdrop blur
- Image carousel with prev/next navigation
- Image counter ("3 / 12")
- Keyboard navigation (arrow keys, Escape to close)
- Swipe support on mobile
- Photographer credit overlay

#### [NEW] `src/sections/Upload.jsx` + `Upload.css`
- Two upload modes with tab/toggle: "From Computer" and "Google Drive Link"
- **Local upload**: Drag-and-drop zone + file picker button
  - File type validation (JPEG, PNG, WEBP only)
  - File size validation (max 10MB per file)
  - Multiple file support (max 10 files)
  - Preview thumbnails with remove button
  - Progress indicator (simulated)
- **Google Drive**: URL input with validation (must be a valid drive.google.com link)
- Success/error toast notifications
- Empty state with camera upload icon

#### [NEW] `src/sections/JoinUs.jsx` + `JoinUs.css`
- Registration form with fields: Name, Email, Phone, City (dropdown), Experience Level (radio/select), Preferred Month (dropdown)
- Real-time field validation with error messages
- Animated submit button with loading state
- Success modal/state after submission ("You're in! 🎉")
- Google Forms-inspired clean layout

#### [NEW] `src/sections/About.jsx` + `About.css`
- Split layout: Kamlesh's photo (placeholder) + bio text
- Photography style description
- Gear showcase (camera body, lenses) with subtle icon decorations
- Social/portfolio links with hover effects
- Quote or photography philosophy callout

---

### 6. Utility Components

#### [NEW] `src/components/ScrollToTop.jsx`
- Floating button to scroll back to top (appears after scrolling down)

#### [NEW] `src/components/SectionHeader.jsx`
- Reusable section title component with decorative line/aperture motif

#### [NEW] `src/components/Toast.jsx` + `Toast.css`
- Reusable toast notification system (success, error, info)

---

### 7. Deployment

#### [MODIFY] `package.json`
- Add `"homepage"` field
- Add `"predeploy": "npm run build"` and `"deploy": "gh-pages -d dist"` scripts

#### [MODIFY] `vite.config.js`
- Set `base: '/dkskamlesh-spw-2026/'` for GitHub Pages path

---

## Verification Plan

### Automated Tests
- Run `npm run build` to verify production build succeeds
- Run dev server and verify all sections render

### Manual Verification
- Browser test: Navigate through all sections, test scroll spy, test lightbox, test form validation, test file upload, test responsive layout
- Record a video walkthrough of the complete app
