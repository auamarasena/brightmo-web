import logoImg from '../assets/logo Transparent.png';

export default function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-royal-950 text-white">
      <div className="text-center relative">
        <div className="relative w-36 h-36 sm:w-44 sm:h-44 mx-auto mb-8 flex items-center justify-center">
          {/* Spinning Ring */}
          <div className="absolute inset-0 border-2 border-royal-800/80 rounded-full" />
          <div className="absolute inset-0 border-2 border-transparent border-t-gold-400 border-r-gold-400 rounded-full animate-spin" />
          
          {/* Logo in center */}
          <img
            src={logoImg}
            alt="Brightmo"
            className="w-24 h-24 sm:w-32 sm:h-32 object-contain animate-pulse drop-shadow-xl"
          />
        </div>

        <h3 className="font-cinzel text-lg font-bold tracking-widest text-gold-400 uppercase">
          BRIGHTMO
        </h3>
        <p className="font-body text-xs text-neutral-400 tracking-wider mt-1">
          Loading Atelier Catalog...
        </p>
      </div>
    </div>
  );
}
