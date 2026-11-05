import { useEffect, useState } from 'react';
import watermarkEagle from '../assets/watermark eagl2.png';

export default function ContactPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const whatsappMessage = encodeURIComponent(
      `Hello Brightmo Concierge! I'm ${formData.name}.\n\nInquiry Subject: ${formData.subject}\n\nMessage: ${formData.message}\n\nContact: ${formData.email} | ${formData.phone}`
    );
    window.open(`https://wa.me/+94743864343?text=${whatsappMessage}`, '_blank');
  };

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
            Concierge & Commissions
          </span>
          <h1 className="font-cinzel text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
            Connect with Our Atelier
          </h1>
          <p className="font-body text-neutral-300 mt-3 sm:mt-4 max-w-xl text-sm sm:text-base lg:text-lg leading-relaxed">
            Whether inquiring about catalogue dimensions, custom timber stains, or residential design projects, our craftsmen are at your service.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 sm:py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16">
            {/* Contact Details (5 cols) */}
            <div className="lg:col-span-5 space-y-6 sm:space-y-8">
              <div>
                <span className="text-gold-600 text-xs font-body font-bold tracking-[0.2em] uppercase">
                  Direct Inquiries
                </span>
                <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-neutral-900 mt-1 sm:mt-2 mb-2 sm:mb-4">
                  We Welcome Your Vision
                </h2>
                <p className="font-body text-neutral-600 text-xs sm:text-sm leading-relaxed">
                  Our design advisors provide individualized consultations to assist in selecting or customizing pieces tailored to your living space.
                </p>
              </div>

              {/* Contact Cards */}
              <div className="space-y-3 sm:space-y-4">
                <a
                  href="https://wa.me/+94743864343"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3.5 sm:gap-4 p-4 sm:p-5 rounded-xl bg-white border border-neutral-200 shadow-sm hover:border-emerald-500/80 hover:shadow-md transition-all group active:scale-[0.99]"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-body font-bold text-xs sm:text-sm text-neutral-900 flex items-center gap-2">
                      <span>WhatsApp Direct Concierge</span>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-semibold">Fastest</span>
                    </div>
                    <div className="text-[11px] sm:text-xs text-neutral-500 mt-0.5 sm:mt-1">Instant photo sharing, specs & quotes</div>
                  </div>
                </a>

                <div className="flex items-start gap-3.5 sm:gap-4 p-4 sm:p-5 rounded-xl bg-white border border-neutral-200 shadow-sm">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-royal-50 text-royal-700 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-body font-bold text-xs sm:text-sm text-neutral-900">Email Studio</div>
                    <div className="text-[11px] sm:text-xs text-neutral-500 mt-0.5 sm:mt-1 break-all">contact@brightmofurniture.com</div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 sm:gap-4 p-4 sm:p-5 rounded-xl bg-white border border-neutral-200 shadow-sm">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gold-50 text-gold-600 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-body font-bold text-xs sm:text-sm text-neutral-900">Consultation Hours</div>
                    <div className="text-[11px] sm:text-xs text-neutral-500 mt-0.5 sm:mt-1">Monday – Saturday: 9:00 AM – 7:00 PM</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Inquiry Form (7 cols) */}
            <div className="lg:col-span-7 bg-white p-5 sm:p-8 md:p-10 rounded-2xl border border-neutral-200/90 shadow-xl">
              <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-neutral-900 mb-1.5 sm:mb-2">
                Send an Inquiry Message
              </h3>
              <p className="font-body text-xs text-neutral-500 mb-5 sm:mb-6">
                Fill out the details below and we will prepare a personalized quote and direct reply via WhatsApp.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <div>
                    <label className="block text-xs font-body font-semibold text-neutral-700 uppercase tracking-wider mb-1.5 sm:mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Eleanor Vance"
                      className="w-full px-3.5 sm:px-4 py-3 rounded-xl border border-neutral-300 focus:border-royal-700 focus:ring-2 focus:ring-royal-100 font-body text-base sm:text-sm outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-body font-semibold text-neutral-700 uppercase tracking-wider mb-1.5 sm:mb-2">
                      Phone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder=""
                      className="w-full px-3.5 sm:px-4 py-3 rounded-xl border border-neutral-300 focus:border-royal-700 focus:ring-2 focus:ring-royal-100 font-body text-base sm:text-sm outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <div>
                    <label className="block text-xs font-body font-semibold text-neutral-700 uppercase tracking-wider mb-1.5 sm:mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="eleanor@example.com"
                      className="w-full px-3.5 sm:px-4 py-3 rounded-xl border border-neutral-300 focus:border-royal-700 focus:ring-2 focus:ring-royal-100 font-body text-base sm:text-sm outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-body font-semibold text-neutral-700 uppercase tracking-wider mb-1.5 sm:mb-2">
                      Inquiry Interest
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-3.5 sm:px-4 py-3 rounded-xl border border-neutral-300 focus:border-royal-700 focus:ring-2 focus:ring-royal-100 font-body text-base sm:text-sm outline-none transition-all bg-white"
                    >
                      <option value="">Select an interest</option>
                      <option value="Custom Sofa Dimensions">Custom Sofa Dimensions</option>
                      <option value="Dining Table Commission">Dining Table Commission</option>
                      <option value="Bed & Headboard Sizing">Bed & Headboard Sizing</option>
                      <option value="Office & Executive Desk">Office & Executive Desk</option>
                      <option value="General Catalogue Question">General Catalogue Question</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-body font-semibold text-neutral-700 uppercase tracking-wider mb-1.5 sm:mb-2">
                    Message & Customization Notes
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your room dimensions, desired wood finish, or any questions..."
                    className="w-full px-3.5 sm:px-4 py-3 rounded-xl border border-neutral-300 focus:border-royal-700 focus:ring-2 focus:ring-royal-100 font-body text-base sm:text-sm outline-none transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="gold-shine-button w-full bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-600 text-white font-body font-bold text-xs sm:text-sm py-3.5 sm:py-4 rounded-xl shadow-lg shadow-emerald-600/25 transition-all duration-300 flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99]"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Connect via WhatsApp
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
