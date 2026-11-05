interface WhatsAppButtonProps {
  productName: string;
  businessCode: string;
  phoneNumber?: string;
  className?: string;
  selectedColor?: string;
  inStock?: boolean;
}

export default function WhatsAppButton({
  productName,
  businessCode,
  phoneNumber = '+94743864343',
  className = '',
  selectedColor,
  inStock = true,
}: WhatsAppButtonProps) {
  let messageText = '';
  if (!inStock) {
    messageText = `Hello Brightmo Concierge! I see that the "${productName}" (SKU: ${businessCode})${selectedColor ? ` in "${selectedColor}" finish` : ''} is currently out of stock. Could you please let me know when it will be restocked or if I can pre-order a custom piece?`;
  } else if (selectedColor) {
    messageText = `Hello Brightmo! I am inquiring about the "${productName}" (SKU: ${businessCode}) in "${selectedColor}" finish. Could you please share more details, pricing, and delivery timeline?`;
  } else {
    messageText = `Hello Brightmo! I am inquiring about the "${productName}" (SKU: ${businessCode}). Could you please share more details, pricing, and availability?`;
  }

  const message = encodeURIComponent(messageText);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 sm:gap-3 ${
        inStock
          ? 'bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-600 text-white shadow-emerald-600/25 hover:shadow-emerald-600/40'
          : 'bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-white shadow-amber-600/25 hover:shadow-amber-600/40'
      } px-4 sm:px-7 py-3 sm:py-3.5 rounded-xl font-body font-semibold text-xs sm:text-sm transition-all duration-300 shadow-lg hover:-translate-y-0.5 active:translate-y-0 active:scale-98 ${className}`}
    >
      <span className="relative flex h-3 w-3">
        <span
          className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
            inStock ? 'bg-white' : 'bg-white'
          }`}
        />
        <span
          className={`relative inline-flex rounded-full h-3 w-3 ${
            inStock ? 'bg-white' : 'bg-white'
          }`}
        />
      </span>
      <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
      <span>
        {inStock ? 'Inquire via WhatsApp' : 'Inquire for Restock / Pre-Order'}
      </span>
    </a>
  );
}
