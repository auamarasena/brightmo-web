import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import watermarkEagle from '../assets/watermark eagl2.png';
import logoImg from '../assets/logo Transparent.png';

export default function AboutPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-neutral-50 min-h-screen">
      {/* Hero */}
      <section className="relative pt-24 sm:pt-32 lg:pt-36 pb-12 sm:pb-20 bg-royal-950 text-white overflow-hidden">
        <div className="absolute inset-0 bg-radial-vignette opacity-80 pointer-events-none" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 pointer-events-none opacity-5 hidden lg:block">
          <img src={watermarkEagle} alt="" className="w-full h-full object-contain filter invert" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <span className="inline-block text-gold-400 text-xs font-body font-bold tracking-[0.25em] uppercase mb-2 sm:mb-3">
            Heritage & Craft
          </span>
          <h1 className="font-cinzel text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
            The Brightmo Philosophy
          </h1>
          <p className="font-body text-neutral-300 mt-3 sm:mt-4 max-w-2xl text-sm sm:text-base lg:text-lg leading-relaxed">
            Where enduring architectural design converges with centuries of artisan woodworking tradition.
          </p>
        </div>
      </section>

      {/* Main Narrative */}
      <section className="py-12 sm:py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-center">
            {/* Story */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-6 font-body text-neutral-600 text-sm sm:text-base leading-relaxed">
              <span className="text-gold-600 text-xs font-bold tracking-[0.2em] uppercase">
                Our Genesis
              </span>
              <h2 className="font-cinzel text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-900 leading-tight">
                Sculpting Furniture that Transcends Trends
              </h2>
              <p>
                Founded upon an uncompromising devotion to authentic materials and timeless proportions, Brightmo was born to counter disposable living culture. We view each dining table, sofa silhouette, and sleeping sanctuary as an heirloom in the making.
              </p>
              <p>
                Every timber log is ethically hand-selected for its natural grain story. Hand-cut mortise and tenon joinery ensures each frame endures through decades of cherished family gatherings, quiet mornings, and celebrated milestones.
              </p>
              <div className="pt-2 sm:pt-4 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                <img src={logoImg} alt="Brightmo Crest" className="h-12 sm:h-16 w-auto object-contain drop-shadow" />
                <div className="sm:border-l border-neutral-300 sm:pl-4">
                  <div className="font-cinzel text-sm font-bold text-royal-950">Brightmo Quality Promise</div>
                  <div className="text-xs text-neutral-400">10-Year Structural Integrity Assurance</div>
                </div>
              </div>
            </div>

            {/* Values Grid */}
            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-5">
              {[
                {
                  title: 'Noble Hardwoods',
                  desc: 'Only kiln-dried teak, white oak, and American walnut are permitted into our workshop.',
                },
                {
                  title: 'Hand-Finished',
                  desc: 'Hand-rubbed natural waxes and micro-textured lacquer preserve organic grain tactile warmth.',
                },
                {
                  title: 'Bespoke Sizing',
                  desc: 'We tailor dimensions, finishes, and textiles to harmonize flawlessly with your floor plans.',
                },
                {
                  title: 'Direct Atelier',
                  desc: 'No distributors or retail markups. Direct collaboration from craft bench to your residence.',
                },
              ].map((val, idx) => (
                <div
                  key={idx}
                  className="bg-neutral-50 p-6 rounded-xl border border-neutral-200/80 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-8 h-8 rounded-lg bg-royal-900 text-gold-400 flex items-center justify-center font-cinzel font-bold text-xs mb-3">
                    0{idx + 1}
                  </div>
                  <h3 className="font-cinzel text-base font-bold text-royal-950 mb-2">
                    {val.title}
                  </h3>
                  <p className="font-body text-xs text-neutral-500 leading-relaxed">
                    {val.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Numbers Strip */}
      <section className="py-10 sm:py-16 bg-royal-950 text-white border-y border-royal-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 text-center">
            {[
              { number: '10+', label: 'Years of Atelier Excellence' },
              { number: '1,200+', label: 'Homes Transformed' },
              { number: '100%', label: 'Solid Natural Hardwoods' },
              { number: '10-YR', label: 'Craftsmanship Warranty' },
            ].map((stat, idx) => (
              <div key={idx} className="p-2 sm:p-0">
                <div className="font-cinzel text-2xl sm:text-4xl font-extrabold text-gold-400 mb-1">
                  {stat.number}
                </div>
                <div className="font-body text-[10px] sm:text-xs text-neutral-300 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 sm:py-20 lg:py-28 bg-white text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-cinzel text-2xl sm:text-4xl font-bold text-neutral-900 mb-3 sm:mb-4">
            Curate Your Living Space Today
          </h2>
          <p className="font-body text-neutral-600 text-sm sm:text-base max-w-xl mx-auto mb-8 leading-relaxed">
            Experience our furniture firsthand in our online collection or reach out for custom residential commissions.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 max-w-xs sm:max-w-none mx-auto">
            <Link
              to="/categories"
              className="gold-shine-button text-center bg-gradient-to-r from-gold-500 via-gold-400 to-gold-600 text-royal-950 px-6 sm:px-8 py-3.5 rounded-xl font-body font-bold text-xs sm:text-sm uppercase tracking-wide shadow-md w-full sm:w-auto"
            >
              Browse Collections
            </Link>
            <Link
              to="/contact"
              className="text-center border-2 border-royal-900 text-royal-900 hover:bg-royal-900 hover:text-white px-6 sm:px-8 py-3.5 rounded-xl font-body font-semibold text-xs sm:text-sm transition-all duration-300 w-full sm:w-auto"
            >
              Contact Concierge
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
