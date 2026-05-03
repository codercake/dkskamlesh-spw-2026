import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import { ToastProvider } from './components/Toast';
import Hero from './sections/Hero';
import Albums from './sections/Albums';
import Upload from './sections/Upload';
import JoinUs from './sections/JoinUs';
import About from './sections/About';
import './App.css';

function App() {
  return (
    <ToastProvider>
      <div className="app">
        <Navbar />
        <main>
          <Hero />
          <Albums />
          <Upload />
          <JoinUs />
          <About />
        </main>
        <Footer />
        <ScrollToTop />
      </div>
    </ToastProvider>
  );
}

export default App;
