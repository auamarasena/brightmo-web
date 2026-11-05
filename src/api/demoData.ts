import type { Category, SubCategory, Product, ProductImage } from "../types";

export const demoCategories: Category[] = [
  {
    categoryId: "living-room",
    categoryName: "Living Room",
    imageUrl:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
    displayOrder: 1,
    isActive: true,
  },
  {
    categoryId: "bedroom",
    categoryName: "Bedroom",
    imageUrl:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80",
    displayOrder: 2,
    isActive: true,
  },
  {
    categoryId: "dining",
    categoryName: "Dining",
    imageUrl:
      "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800&q=80",
    displayOrder: 3,
    isActive: true,
  },
  {
    categoryId: "office",
    categoryName: "Office",
    imageUrl:
      "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800&q=80",
    displayOrder: 4,
    isActive: true,
  },
  {
    categoryId: "outdoor",
    categoryName: "Outdoor",
    imageUrl:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80",
    displayOrder: 5,
    isActive: true,
  },
  {
    categoryId: "storage",
    categoryName: "Storage & Shelving",
    imageUrl:
      "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800&q=80",
    displayOrder: 6,
    isActive: true,
  },
];

export const demoSubCategories: SubCategory[] = [
  {
    subCategoryId: "sofas",
    categoryId: "living-room",
    subCategoryName: "Sofas",
    imageUrl:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80",
    displayOrder: 1,
    isActive: true,
  },
  {
    subCategoryId: "armchairs",
    categoryId: "living-room",
    subCategoryName: "Armchairs",
    imageUrl:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80",
    displayOrder: 2,
    isActive: true,
  },
  {
    subCategoryId: "coffee-tables",
    categoryId: "living-room",
    subCategoryName: "Coffee Tables",
    imageUrl:
      "https://images.unsplash.com/photo-1532372576444-dda954194ad0?w=600&q=80",
    displayOrder: 3,
    isActive: true,
  },
  {
    subCategoryId: "tv-units",
    categoryId: "living-room",
    subCategoryName: "TV Units",
    imageUrl:
      "https://images.unsplash.com/photo-1593062096033-9a26b09da705?w=600&q=80",
    displayOrder: 4,
    isActive: true,
  },

  {
    subCategoryId: "beds",
    categoryId: "bedroom",
    subCategoryName: "Beds",
    imageUrl:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600&q=80",
    displayOrder: 1,
    isActive: true,
  },
  {
    subCategoryId: "wardrobes",
    categoryId: "bedroom",
    subCategoryName: "Wardrobes",
    imageUrl:
      "https://images.unsplash.com/photo-1558997519-83ea9252edf8?w=600&q=80",
    displayOrder: 2,
    isActive: true,
  },
  {
    subCategoryId: "nightstands",
    categoryId: "bedroom",
    subCategoryName: "Nightstands",
    imageUrl:
      "https://images.unsplash.com/photo-1532372576444-dda954194ad0?w=600&q=80",
    displayOrder: 3,
    isActive: true,
  },
  {
    subCategoryId: "dressers",
    categoryId: "bedroom",
    subCategoryName: "Dressers",
    imageUrl:
      "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=600&q=80",
    displayOrder: 4,
    isActive: true,
  },

  {
    subCategoryId: "dining-tables",
    categoryId: "dining",
    subCategoryName: "Dining Tables",
    imageUrl:
      "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=600&q=80",
    displayOrder: 1,
    isActive: true,
  },
  {
    subCategoryId: "dining-chairs",
    categoryId: "dining",
    subCategoryName: "Dining Chairs",
    imageUrl:
      "https://images.unsplash.com/photo-1503602642458-232111445657?w=600&q=80",
    displayOrder: 2,
    isActive: true,
  },
  {
    subCategoryId: "sideboards",
    categoryId: "dining",
    subCategoryName: "Sideboards",
    imageUrl:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80",
    displayOrder: 3,
    isActive: true,
  },

  {
    subCategoryId: "desks",
    categoryId: "office",
    subCategoryName: "Desks",
    imageUrl:
      "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=600&q=80",
    displayOrder: 1,
    isActive: true,
  },
  {
    subCategoryId: "office-chairs",
    categoryId: "office",
    subCategoryName: "Office Chairs",
    imageUrl:
      "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=600&q=80",
    displayOrder: 2,
    isActive: true,
  },
  {
    subCategoryId: "bookcases",
    categoryId: "office",
    subCategoryName: "Bookcases",
    imageUrl:
      "https://images.unsplash.com/photo-1594620302200-9a762244a156?w=600&q=80",
    displayOrder: 3,
    isActive: true,
  },

  {
    subCategoryId: "garden-sets",
    categoryId: "outdoor",
    subCategoryName: "Garden Sets",
    imageUrl:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&q=80",
    displayOrder: 1,
    isActive: true,
  },
  {
    subCategoryId: "outdoor-loungers",
    categoryId: "outdoor",
    subCategoryName: "Loungers",
    imageUrl:
      "https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=600&q=80",
    displayOrder: 2,
    isActive: true,
  },

  {
    subCategoryId: "shelving-units",
    categoryId: "storage",
    subCategoryName: "Shelving Units",
    imageUrl:
      "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=600&q=80",
    displayOrder: 1,
    isActive: true,
  },
  {
    subCategoryId: "cabinets",
    categoryId: "storage",
    subCategoryName: "Cabinets",
    imageUrl:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80",
    displayOrder: 2,
    isActive: true,
  },
];

export const demoProducts: Product[] = [
  {
    productId: "p001",
    businessCode: "FS-LR-001",
    name: "Milano Sectional Sofa",
    categoryId: "living-room",
    subCategoryId: "sofas",
    price: 2499,
    dimensions: "280cm × 170cm × 85cm",
    warranty: "5 Years",
    description:
      "A premium L-shaped sectional sofa upholstered in soft linen blend fabric. Features deep seat cushions with high-density foam filling, solid hardwood frame, and chrome-finished legs. Perfect for modern living rooms seeking comfort and elegance.",
    isFinalized: true,
    displayOrder: 1,
    isMasterpiece: true,
    inStock: true,
    colors: [
      { name: "Emerald Velvet", hex: "#1F4D36" },
      { name: "Royal Navy", hex: "#1A3B6B" },
      { name: "Warm Ochre", hex: "#C8A236" },
      { name: "Charcoal Grey", hex: "#333333" },
    ],
  },
  {
    productId: "p002",
    businessCode: "FS-LR-002",
    name: "Oslo Accent Armchair",
    categoryId: "living-room",
    subCategoryId: "armchairs",
    price: 899,
    dimensions: "82cm × 78cm × 90cm",
    warranty: "3 Years",
    description:
      "Scandinavian-inspired accent armchair with curved backrest and tapered wooden legs. Upholstered in premium boucle fabric with a supportive lumbar cushion. A statement piece for any reading corner.",
    isFinalized: true,
    displayOrder: 1,
    isMasterpiece: false,
    inStock: false, // Out of Stock example
    colors: [
      { name: "Bouclé Cream", hex: "#F5F2EB" },
      { name: "Mustard Gold", hex: "#D4AF37" },
      { name: "Forest Green", hex: "#234E35" },
    ],
  },
  {
    productId: "p003",
    businessCode: "FS-LR-003",
    name: "Zenith Marble Coffee Table",
    categoryId: "living-room",
    subCategoryId: "coffee-tables",
    price: 1299,
    dimensions: "120cm × 60cm × 42cm",
    warranty: "3 Years",
    description:
      "Elegant coffee table featuring a genuine Carrara marble top set on a brushed brass geometric base. The natural veining of the marble ensures each piece is unique. Includes protective felt pads.",
    isFinalized: true,
    displayOrder: 1,
    isMasterpiece: false,
    inStock: true,
    colors: [
      { name: "Carrara White", hex: "#EAEAEA" },
      { name: "Nero Marquina", hex: "#1A1A1A" },
    ],
  },
  {
    productId: "p004",
    businessCode: "FS-LR-004",
    name: "Arc Media Console",
    categoryId: "living-room",
    subCategoryId: "tv-units",
    price: 1149,
    dimensions: "180cm × 45cm × 55cm",
    warranty: "5 Years",
    description:
      "Sleek walnut-veneer media console with soft-close drawers and ventilated cable management. Features brass-inlay handles and adjustable internal shelves. Supports TVs up to 75 inches.",
    isFinalized: true,
    displayOrder: 1,
    isMasterpiece: false,
    inStock: true,
    colors: [
      { name: "Natural Walnut", hex: "#4A3525" },
      { name: "Smoked Oak", hex: "#322A26" },
    ],
  },
  {
    productId: "p005",
    businessCode: "FS-BR-001",
    name: "Haven Platform Bed",
    categoryId: "bedroom",
    subCategoryId: "beds",
    price: 1899,
    dimensions: "200cm × 160cm × 95cm",
    warranty: "10 Years",
    description:
      "Solid oak platform bed with an upholstered headboard in premium linen. Japanese-inspired low-profile design with slatted base for optimal mattress ventilation. Available in Queen and King sizes.",
    isFinalized: true,
    displayOrder: 1,
  },
  {
    productId: "p006",
    businessCode: "FS-BR-002",
    name: "Luxe Walk-In Wardrobe",
    categoryId: "bedroom",
    subCategoryId: "wardrobes",
    price: 3299,
    dimensions: "240cm × 60cm × 220cm",
    warranty: "5 Years",
    description:
      "Spacious wardrobe system with mirrored sliding doors, integrated LED lighting, and customizable interior organizers. Crafted from engineered wood with a matte lacquer finish.",
    isFinalized: true,
    displayOrder: 1,
  },
  {
    productId: "p007",
    businessCode: "FS-BR-003",
    name: "Aura Floating Nightstand",
    categoryId: "bedroom",
    subCategoryId: "nightstands",
    price: 349,
    dimensions: "50cm × 40cm × 35cm",
    warranty: "2 Years",
    description:
      "Wall-mounted nightstand with single drawer and open shelf. Clean lines in natural walnut with soft-close mechanism. Includes concealed mounting hardware for a floating effect.",
    isFinalized: true,
    displayOrder: 1,
  },
  {
    productId: "p008",
    businessCode: "FS-DN-001",
    name: "Gather Dining Table",
    categoryId: "dining",
    subCategoryId: "dining-tables",
    price: 2199,
    dimensions: "220cm × 100cm × 76cm",
    warranty: "5 Years",
    description:
      "Live-edge solid acacia wood dining table with sculptural black steel pedestal base. Seats 8 comfortably. Each table showcases the natural grain patterns and organic edge of the wood.",
    isFinalized: true,
    displayOrder: 1,
  },
  {
    productId: "p009",
    businessCode: "FS-DN-002",
    name: "Harper Dining Chair",
    categoryId: "dining",
    subCategoryId: "dining-chairs",
    price: 399,
    dimensions: "52cm × 56cm × 82cm",
    warranty: "3 Years",
    description:
      "Mid-century modern dining chair with molded shell seat and solid beech wood legs. Available in matte black, warm white, and forest green. Stackable design for easy storage.",
    isFinalized: true,
    displayOrder: 1,
  },
  {
    productId: "p010",
    businessCode: "FS-OF-001",
    name: "Elevate Standing Desk",
    categoryId: "office",
    subCategoryId: "desks",
    price: 1599,
    dimensions: "160cm × 80cm × 65-130cm",
    warranty: "5 Years",
    description:
      "Electric height-adjustable standing desk with dual-motor system for whisper-quiet operation. Features programmable memory presets, built-in cable tray, and anti-collision technology. Desktop in sustainable bamboo.",
    isFinalized: true,
    displayOrder: 1,
  },
  {
    productId: "p011",
    businessCode: "FS-OF-002",
    name: "Ergo Pro Task Chair",
    categoryId: "office",
    subCategoryId: "office-chairs",
    price: 799,
    dimensions: "65cm × 65cm × 110cm",
    warranty: "5 Years",
    description:
      "Professional ergonomic office chair with adjustable lumbar support, 4D armrests, breathable mesh back, and synchronous tilt mechanism. Supports up to 150kg.",
    isFinalized: true,
    displayOrder: 1,
  } as Product,
  {
    productId: "p012",
    businessCode: "FS-OD-001",
    name: "Terraza Garden Set",
    categoryId: "outdoor",
    subCategoryId: "garden-sets",
    price: 2799,
    dimensions: "Table: 180cm × 90cm × 75cm",
    warranty: "3 Years",
    description:
      "All-weather outdoor dining set with powder-coated aluminum frame and synthetic rattan weave. Includes table and 6 chairs with weather-resistant cushions. UV and rust resistant.",
    isFinalized: true,
    displayOrder: 1,
  },
  {
    productId: "p013",
    businessCode: "FS-ST-001",
    name: "Modular Shelf System",
    categoryId: "storage",
    subCategoryId: "shelving-units",
    price: 899,
    dimensions: "120cm × 35cm × 180cm",
    warranty: "3 Years",
    description:
      "Configurable open shelving unit in powder-coated steel and oak veneer shelves. Expandable with add-on modules. Wall-anchoring kit included for safety.",
    isFinalized: true,
    displayOrder: 1,
  },
  // Product with missing fields (should be filtered out)
  {
    productId: "p014",
    businessCode: "",
    name: "Incomplete Product",
    categoryId: "living-room",
    subCategoryId: "sofas",
    price: 599,
    dimensions: "",
    warranty: "",
    description: "",
    isFinalized: true,
    displayOrder: 2,
  },
  // Product that is not finalized (should be filtered out)
  {
    productId: "p015",
    businessCode: "FS-LR-099",
    name: "Draft Sofa",
    categoryId: "living-room",
    subCategoryId: "sofas",
    price: 1299,
    dimensions: "200cm × 90cm",
    warranty: "1 Year",
    description: "This product is still in draft mode.",
    isFinalized: false,
    displayOrder: 3,
  },
];

export const demoProductImages: ProductImage[] = [
  // Milano Sectional Sofa — 3 images per color variant
  // Emerald Velvet
  {
    imageId: "i001a",
    productId: "p001",
    imageUrl: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
    imageOrder: 1,
    colorName: "Emerald Velvet",
  },
  {
    imageId: "i001b",
    productId: "p001",
    imageUrl: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800&q=80",
    imageOrder: 2,
    colorName: "Emerald Velvet",
  },
  {
    imageId: "i001c",
    productId: "p001",
    imageUrl: "https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?w=800&q=80",
    imageOrder: 3,
    colorName: "Emerald Velvet",
  },
  // Royal Navy
  {
    imageId: "i001d",
    productId: "p001",
    imageUrl: "https://images.unsplash.com/photo-1567016432779-094069958ea5?w=800&q=80",
    imageOrder: 1,
    colorName: "Royal Navy",
  },
  {
    imageId: "i001e",
    productId: "p001",
    imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80",
    imageOrder: 2,
    colorName: "Royal Navy",
  },
  {
    imageId: "i001f",
    productId: "p001",
    imageUrl: "https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=800&q=80",
    imageOrder: 3,
    colorName: "Royal Navy",
  },
  // Warm Ochre
  {
    imageId: "i001g",
    productId: "p001",
    imageUrl: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=800&q=80",
    imageOrder: 1,
    colorName: "Warm Ochre",
  },
  {
    imageId: "i001h",
    productId: "p001",
    imageUrl: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80",
    imageOrder: 2,
    colorName: "Warm Ochre",
  },
  {
    imageId: "i001i",
    productId: "p001",
    imageUrl: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80",
    imageOrder: 3,
    colorName: "Warm Ochre",
  },
  // Charcoal Grey
  {
    imageId: "i001j",
    productId: "p001",
    imageUrl: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=800&q=80",
    imageOrder: 1,
    colorName: "Charcoal Grey",
  },
  {
    imageId: "i001k",
    productId: "p001",
    imageUrl: "https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=800&q=80",
    imageOrder: 2,
    colorName: "Charcoal Grey",
  },
  {
    imageId: "i001l",
    productId: "p001",
    imageUrl: "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=800&q=80",
    imageOrder: 3,
    colorName: "Charcoal Grey",
  },
  // Oslo Accent Armchair — images without colorName (shared across colors)
  {
    imageId: "i004",
    productId: "p002",
    imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80",
    imageOrder: 1,
  },
  {
    imageId: "i005",
    productId: "p002",
    imageUrl: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=800&q=80",
    imageOrder: 2,
  },
  // Zenith Marble Coffee Table
  {
    imageId: "i006",
    productId: "p003",
    imageUrl:
      "https://images.unsplash.com/photo-1532372576444-dda954194ad0?w=800&q=80",
    imageOrder: 1,
  },
  {
    imageId: "i007",
    productId: "p003",
    imageUrl:
      "https://images.unsplash.com/photo-1567016432779-094069958ea5?w=800&q=80",
    imageOrder: 2,
  },
  {
    imageId: "i008",
    productId: "p003",
    imageUrl:
      "https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=800&q=80",
    imageOrder: 3,
  },
  // Arc Media Console
  {
    imageId: "i009",
    productId: "p004",
    imageUrl:
      "https://images.unsplash.com/photo-1593062096033-9a26b09da705?w=800&q=80",
    imageOrder: 1,
  },
  {
    imageId: "i010",
    productId: "p004",
    imageUrl:
      "https://images.unsplash.com/photo-1585412727339-54e4bae3bbf9?w=800&q=80",
    imageOrder: 2,
  },
  // Haven Platform Bed
  {
    imageId: "i011",
    productId: "p005",
    imageUrl:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80",
    imageOrder: 1,
  },
  {
    imageId: "i012",
    productId: "p005",
    imageUrl:
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80",
    imageOrder: 2,
  },
  {
    imageId: "i013",
    productId: "p005",
    imageUrl:
      "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&q=80",
    imageOrder: 3,
  },
  // Luxe Walk-In Wardrobe
  {
    imageId: "i014",
    productId: "p006",
    imageUrl:
      "https://images.unsplash.com/photo-1558997519-83ea9252edf8?w=800&q=80",
    imageOrder: 1,
  },
  {
    imageId: "i015",
    productId: "p006",
    imageUrl:
      "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800&q=80",
    imageOrder: 2,
  },
  // Aura Floating Nightstand
  {
    imageId: "i016",
    productId: "p007",
    imageUrl:
      "https://images.unsplash.com/photo-1532372576444-dda954194ad0?w=800&q=80",
    imageOrder: 1,
  },
  // Gather Dining Table
  {
    imageId: "i017",
    productId: "p008",
    imageUrl:
      "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800&q=80",
    imageOrder: 1,
  },
  {
    imageId: "i018",
    productId: "p008",
    imageUrl:
      "https://images.unsplash.com/photo-1503602642458-232111445657?w=800&q=80",
    imageOrder: 2,
  },
  {
    imageId: "i019",
    productId: "p008",
    imageUrl:
      "https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=800&q=80",
    imageOrder: 3,
  },
  // Harper Dining Chair
  {
    imageId: "i020",
    productId: "p009",
    imageUrl:
      "https://images.unsplash.com/photo-1503602642458-232111445657?w=800&q=80",
    imageOrder: 1,
  },
  // Elevate Standing Desk
  {
    imageId: "i021",
    productId: "p010",
    imageUrl:
      "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800&q=80",
    imageOrder: 1,
  },
  {
    imageId: "i022",
    productId: "p010",
    imageUrl:
      "https://images.unsplash.com/photo-1593062096033-9a26b09da705?w=800&q=80",
    imageOrder: 2,
  },
  // Ergo Pro Task Chair
  {
    imageId: "i023",
    productId: "p011",
    imageUrl:
      "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=800&q=80",
    imageOrder: 1,
  },
  // Terraza Garden Set
  {
    imageId: "i024",
    productId: "p012",
    imageUrl:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80",
    imageOrder: 1,
  },
  {
    imageId: "i025",
    productId: "p012",
    imageUrl:
      "https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=800&q=80",
    imageOrder: 2,
  },
  // Modular Shelf System
  {
    imageId: "i026",
    productId: "p013",
    imageUrl:
      "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800&q=80",
    imageOrder: 1,
  },
  {
    imageId: "i027",
    productId: "p013",
    imageUrl:
      "https://images.unsplash.com/photo-1594620302200-9a762244a156?w=800&q=80",
    imageOrder: 2,
  },
];
