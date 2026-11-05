import { Link } from 'react-router-dom';
import logoImg from '../assets/logo Transparent.png';
import watermarkEagle from '../assets/watermark eagl2.png';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/categories', label: 'Collections' },
    { path: '/about', label: 'About Us' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <footer className="relative bg-royal-950 text-white overflow-hidden border-t border-royal-800/80">
      {/* Background Watermark Eagle */}
      <div className="absolute -bottom-10 right-0 pointer-events-none opacity-5 w-96 h-96 select-none">
        <img src={watermarkEagle} alt="" className="w-full h-full object-contain filter invert" />
      </div>

      {/* Main Footer Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 lg:py-20 z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 lg:gap-16">
          {/* Brand Info */}
          <div className="sm:col-span-2">
            <Link to="/" className="inline-flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6 group">
              <img
                src={logoImg}
                alt="Brightmo"
                className="h-12 sm:h-16 md:h-20 w-auto object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-lg"
              />
              <div className="flex flex-col">
                <span className="font-cinzel text-xl sm:text-2xl font-bold tracking-wider text-white">
                  BRIGHTMO
                </span>
                <span className="font-body text-[10px] tracking-[0.25em] text-gold-400 font-semibold uppercase -mt-1">
                  Furniture
                </span>
              </div>
            </Link>
            <p className="text-neutral-300 font-body text-xs sm:text-sm leading-relaxed max-w-md mb-6 sm:mb-8">
              Crafting timeless, regal furniture that transforms everyday residences into sanctuaries of distinction.
              Every piece is masterfully executed with sustainable hardwoods, bespoke metals, and artisanal fabrics.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://wa.me/+94743864343"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-royal-900 border border-royal-700/80 flex items-center justify-center text-gold-400 hover:bg-gold-500 hover:text-royal-950 transition-all duration-300 shadow-sm active:scale-95"
                aria-label="WhatsApp"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
              <a
                href="mailto:contact@brightmofurniture.com"
                className="w-10 h-10 rounded-full bg-royal-900 border border-royal-700/80 flex items-center justify-center text-neutral-300 hover:bg-gold-500 hover:text-royal-950 transition-all duration-300 shadow-sm active:scale-95"
                aria-label="Email"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-cinzel text-sm sm:text-base font-bold tracking-wider text-gold-400 mb-4 sm:mb-6">
              Navigation
            </h4>
            <ul className="space-y-2.5 sm:space-y-3 font-body text-xs sm:text-sm">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-neutral-300 hover:text-gold-300 transition-colors flex items-center gap-1.5"
                  >
                    <span className="text-gold-500/50">›</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-cinzel text-sm sm:text-base font-bold tracking-wider text-gold-400 mb-4 sm:mb-6">
              Studio & Atelier
            </h4>
            <ul className="space-y-3 sm:space-y-3.5 text-xs sm:text-sm text-neutral-300 font-body">
              <li className="flex items-start gap-3">
                <svg className="w-4 h-4 mt-0.5 sm:mt-1 text-gold-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Brightmo Design Gallery<br />Custom Furniture Showroom</span>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-4 h-4 text-gold-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>WhatsApp: Available 24/7</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-royal-900 bg-royal-950/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-xs font-body text-neutral-400 text-center sm:text-left">
          <p>© {currentYear} Brightmo Furniture. All rights reserved.</p>
          <p className="text-gold-400/80 font-medium">Bespoke Quality • Lifetime Integrity</p>
        </div>
      </div>
    </footer>
  );
}
