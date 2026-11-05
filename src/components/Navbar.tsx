import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logoImg from '../assets/logo Transparent.png';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/categories', label: 'Collections' },
  { path: '/about', label: 'About' },
  { path: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Main Navigation Bar */}
      <nav
        className={`transition-all duration-300 ${
          scrolled || !isHomePage
            ? 'bg-white/95 backdrop-blur-xl shadow-md py-1.5 sm:py-2.5'
            : 'bg-gradient-to-b from-royal-950/85 via-royal-950/50 to-transparent py-2 sm:py-3.5 text-white'
        }`}
      >
        <div className="max-w-[1720px] w-full mx-auto px-3 sm:px-6 lg:px-12">
          <div className="flex items-center justify-between h-14 sm:h-20 md:h-24">
            {/* Brand Logo with Real Oval Badge */}
            <Link to="/" className="flex items-center gap-2 sm:gap-3.5 group min-w-0">
              <div className="relative flex-shrink-0">
                <img
                  src={logoImg}
                  alt="Brightmo Luxury Furniture"
                  className="h-10 sm:h-14 md:h-20 w-auto object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-md"
                />
              </div>
              <div className="flex flex-col min-w-0">
                <span
                  className={`font-cinzel text-base sm:text-2xl md:text-3xl font-bold tracking-wide sm:tracking-wider truncate transition-colors ${
                    scrolled || !isHomePage ? 'text-royal-950' : 'text-white'
                  }`}
                >
                  BRIGHTMO Furniture
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-2">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`relative px-4 py-2 text-sm font-body font-medium transition-all duration-200 rounded-md ${
                      scrolled || !isHomePage
                        ? isActive
                          ? 'text-royal-800 font-semibold bg-royal-50'
                          : 'text-neutral-700 hover:text-royal-700 hover:bg-neutral-50'
                        : isActive
                        ? 'text-white font-semibold bg-white/10 backdrop-blur-sm'
                        : 'text-neutral-200 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-1 left-4 right-4 h-0.5 bg-gold-400 rounded-full" />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Action CTA: Catalog & WhatsApp */}
            <div className="hidden md:flex items-center gap-3">
              <Link
                to="/categories"
                className="gold-shine-button bg-gradient-to-r from-gold-500 via-gold-400 to-gold-600 text-royal-950 font-body text-xs font-bold px-4 py-2.5 rounded-lg shadow-md hover:shadow-gold-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 tracking-wide uppercase"
              >
                Browse Catalog
              </Link>
              <a
                href="https://wa.me/1234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-emerald-600/10 hover:bg-emerald-600 text-emerald-700 hover:text-white border border-emerald-500/30 transition-all duration-200 text-xs font-semibold"
                title="WhatsApp Us"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span>Contact</span>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`md:hidden relative w-10 h-10 rounded-lg flex items-center justify-center transition-colors flex-shrink-0 ${
                scrolled || !isHomePage ? 'text-neutral-900 bg-neutral-100 hover:bg-neutral-200' : 'text-white bg-white/10 hover:bg-white/20'
              }`}
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu Drawer */}
        {isOpen && (
          <div className="md:hidden fixed inset-x-0 top-full max-h-[calc(100vh-4rem)] overflow-y-auto bg-white/98 backdrop-blur-2xl border-b border-neutral-200/90 shadow-2xl px-4 pt-3 pb-8 space-y-2 animate-slide-up">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3 rounded-xl text-base font-body font-medium transition-colors ${
                  location.pathname === link.path
                    ? 'bg-royal-50 text-royal-900 font-bold border-l-4 border-gold-500'
                    : 'text-neutral-800 hover:bg-neutral-100'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-neutral-200/80 flex flex-col gap-2.5">
              <Link
                to="/categories"
                onClick={() => setIsOpen(false)}
                className="text-center bg-gradient-to-r from-royal-900 to-royal-950 text-white font-body text-sm font-semibold py-3.5 rounded-xl shadow-md active:scale-98 transition-transform"
              >
                Explore Collections
              </Link>
              <a
                href="https://wa.me/1234567890"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="text-center bg-emerald-600 hover:bg-emerald-700 text-white font-body text-sm font-semibold py-3.5 rounded-xl shadow-md flex items-center justify-center gap-2 active:scale-98 transition-transform"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Chat on WhatsApp
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
