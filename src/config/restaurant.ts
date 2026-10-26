// ============================================================
// Peepai Brewery & Kitchen — Restaurant Config
// Change this file + /public/photos to launch a new client.
// ============================================================

export type ThemeTokens = {
  bg: string;
  ink: string;
  accent: string;
  accent2: string;
  card: string;
  muted: string;
};

export type MenuItem = {
  name: string;
  description?: string;
  price?: number; // ₹ — omit if unknown
  veg?: boolean;  // true = veg dot shown
  badge?: string; // e.g. "Chef's Pick", "Bestseller"
};

export type MenuCategory = {
  id: string;
  label: string;
  emoji: string;
  items: MenuItem[];
};

export type GalleryItem = {
  src: string;
  title: string;
  caption: string;
  category?: string;
};

export type RestaurantConfig = {
  // Identity
  name: string;
  tagline: string;
  tagline2: string;
  about: string;
  features: string[];
  rating: number;
  reviewCount: string;
  logo?: string;

  // Contact
  phone: string; // voice calls only
  whatsapp: string; // digits only, with country code (e.g. 918746890706)
  whatsappFormatted?: string; // formatted for display
  address: string;
  mapsLink: string;
  mapsEmbedSrc: string;

  // Hours (displayed as-is)
  hours: { days: string; time: string }[];

  // Theme
  theme: ThemeTokens;

  // 3D
  shape: 'pint' | 'bowl' | 'knot' | 'donut';
  glb?: string; // path to GLB in /public

  // Photos — filenames inside /public/photos
  photos: string[];
  galleryItems?: GalleryItem[];

  // Menu
  menu: MenuCategory[];

  // Delivery & Aggregators
  deliveryLinks?: {
    swiggy?: string;
    zomato?: string;
  };

  // Social Media
  socialLinks?: {
    instagram?: string;
    facebook?: string;
    linkedin?: string;
  };

  // SEO
  metaDescription: string;
  ogImage: string;

  // Footer
  footerCredit: string;
  footerLinks?: { label: string; href: string }[];
};

const config: RestaurantConfig = {
  // ─── Identity ───────────────────────────────────────────
  name: 'Peepai Brewery & Kitchen',
  tagline: 'Brew. Feast. Celebrate.',
  tagline2: 'Hebbal\'s Premier Craft Brewery & Kitchen',
  logo: '/logo.png',
  about:
    'Nestled in the heart of Hebbal, Peepai Brewery & Kitchen is more than a restaurant — it is an immersive architectural and craft dining sanctuary. We brew our signature craft beers in-house, from crisp Belgian witbiers to rich roasty stouts, pairing them with an expansive kitchen spanning North Indian clay-oven classics, artisanal wood-fired pizzas, coastal delicacies, and bold pan-Asian creations. Featuring bespoke gilded birdcage lounge booths, vaulted mirrored spirit salons, an open-air sky terrace, and live acoustic sundowners, every visit is curated for unforgettable celebrations.',
  features: [
    'In-House Craft Microbrewery',
    'Gilded Birdcage Lounges',
    'Vaulted Mirrored Spirit Salon',
    'Open-Air Sky Terrace',
    'Wood-Fired Artisanal Pizza',
    'Live Music & Acoustic Evenings',
    'Curated Multi-Cuisine Dining',
    'Dedicated Valet Parking',
  ],
  rating: 4.5,
  reviewCount: '5,600+',

  // ─── Contact ────────────────────────────────────────────
  phone: '+91 96327 06699', // Voice Calls Only
  whatsapp: '918746890706', // WhatsApp Messaging Only
  whatsappFormatted: '+91 87468 90706',
  address: '102/1 & 102/2, Ground Floor, GM Arcade, Service Road, Bellary Road, Hebbal, Bengaluru – 560092',
  mapsLink: 'https://www.google.com/maps/place/Peepai+Brewery+%26+Kitchen/@13.055678,77.590556,17z/data=!3m1!4b1!4m6!3m5!1s0x3bae17715488b8f1:0x1e6fda6b4447de80!8m2!3d13.055678!4d77.593131',
  mapsEmbedSrc:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.685338!2d77.590556!3d13.055678!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae17715488b8f1%3A0x1e6fda6b4447de80!2sPeepai%20Brewery%20%26%20Kitchen!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin',

  // ─── Hours ──────────────────────────────────────────────
  hours: [
    { days: 'Monday – Sunday', time: '12:00 PM – 12:30 AM' },
  ],

  // ─── Theme: Editorial 2.0 — Photography-Derived Palette ──────
  theme: {
    bg: '#171713',      // Midnight charcoal
    ink: '#F4EFE5',     // Soft ivory
    accent: '#B48A45',  // Antique brass
    accent2: '#C8793C', // Warm amber
    card: '#1E1C18',    // Deep card
    muted: '#C8BDAA',   // Warm stone
  },

  // ─── 3D ─────────────────────────────────────────────────
  shape: 'pint',

  // ─── Photos ─────────────────────────────────────────────
  photos: [
    'ambience1.jpg',
    'ambience2.jpg',
    'ambience3.jpg',
    'ambience4.jpg',
    'ambience5.jpg',
    'ambience6.jpg',
    'ambience7.jpg',
    'corporate.jpg',
  ],

  galleryItems: [
    {
      src: 'ambience2.jpg',
      title: 'The Open-Air Rooftop Sky Terrace',
      caption: 'Expansive rooftop lounge beneath an architectural amber geometric canopy, plush shell armchairs, and panoramic Bengaluru skyline vistas.',
      category: 'Sky Terrace',
    },
    {
      src: 'ambience6.jpg',
      title: 'Two-Tier Brewery Deck & Mezzanine Balcony',
      caption: 'Double-deck industrial architecture featuring ground-floor dining hall with yellow lounge and upper mezzanine balcony with brass railings.',
      category: 'Brewery & Bar',
    },
    {
      src: 'ambience1.jpg',
      title: 'The Bacardi Amber Canopy Bar & Emerald Lounge',
      caption: 'Green marble slab counter, illuminated spirit shelves, and warm velvet armchairs for craft cocktail evenings.',
      category: 'Brewery & Bar',
    },
    {
      src: 'ambience4.jpg',
      title: 'Courtyard Amphitheatre & Live Performance Stage',
      caption: 'Central acoustic stage with Peepai mountain LED graphic, lush living vertical wall, and the iconic Golden Elephant relief.',
      category: 'Courtyard & Stage',
    },
    {
      src: 'ambience7.jpg',
      title: 'Botanical Garden Courtyard & Cabana Pods',
      caption: 'Lush tropical planters, hanging fern baskets, emerald velvet seating, and private white birdcage cabanas under the mezzanine.',
      category: 'Courtyard & Stage',
    },
    {
      src: 'ambience3.jpg',
      title: 'Pop-Art VIP Suite & Mirrored Lounge',
      caption: 'Reflective mirrored ceiling, botanical wingback armchairs, black marble table, and playful pop-art neon silhouettes for private celebrations.',
      category: 'VIP & Private Dining',
    },
    {
      src: 'corporate.jpg',
      title: 'Private Dining & Corporate Enclave',
      caption: 'Bespoke corporate dining setup and intimate private celebration space with tailored seating and dedicated bar hospitality.',
      category: 'VIP & Private Dining',
    },
    {
      src: 'ambience5.jpg',
      title: 'Sky Terrace Daylight Shell Lounge',
      caption: 'Scalloped teal and charcoal velvet shell armchairs with golden legs bathed in daylight under the geometric canopy.',
      category: 'Sky Terrace',
    },
  ],

  // ─── Menu ───────────────────────────────────────────────
  menu: [
    {
      id: 'craft-beer',
      label: 'Craft Beer',
      emoji: '🍺',
      items: [
        {
          name: 'Wheat Ale',
          description: 'Refreshing, light & fruity — hints of banana and clove. The session brew.',
          veg: true,
          badge: 'Bestseller',
        },
        {
          name: 'Belgian Wit',
          description: 'Hazy golden ale with orange peel and coriander. Crisp & aromatic.',
          veg: true,
        },
        {
          name: 'Smooth Stout',
          description: 'Dark, rich & roasty with deep notes of dark chocolate, coffee and caramel.',
          veg: true,
          badge: 'Chef\'s Pick',
        },
        {
          name: 'Session IPA',
          description: 'Tropical hop-forward ale with citrus & pine. Bold but sessionable.',
          veg: true,
        },
        {
          name: 'Lager',
          description: 'Clean, crisp and cold-lagered. The perfect companion to spicy food.',
          veg: true,
        },
      ],
    },
    {
      id: 'bar-snacks',
      label: 'Bar Snacks',
      emoji: '🥨',
      items: [
        {
          name: 'Peepai Nachos (Veg)',
          description: 'Crunchy tortilla chips loaded with melted cheese, beans, salsa & sour cream.',
          price: 390,
          veg: true,
          badge: 'Bestseller',
        },
        {
          name: 'Peepai Nachos (Chicken)',
          description: 'Loaded nachos topped with spiced chicken bits and melted cheese.',
          price: 430,
        },
        {
          name: 'Peepai Nachos (Bacon)',
          description: 'Crispy bacon, melted cheese, jalapeños & house salsa on crunchy chips.',
          price: 470,
        },
        {
          name: 'Chutney Pudi Peanut Masala',
          description: 'Roasted peanuts tossed in house chutney pudi spice blend.',
          price: 330,
          veg: true,
        },
        {
          name: 'Butter Garlic Mushroom',
          description: 'Sautéed button mushrooms in herb-garlic butter with a squeeze of lemon.',
          price: 347,
          veg: true,
        },
        {
          name: 'Rosemary Cheese Garlic Bread',
          description: 'Toasted sourdough, rosemary butter, melted three-cheese blend.',
          price: 390,
          veg: true,
        },
        {
          name: 'Hare Matar Ki Stick',
          description: 'Crispy green pea croquettes with mint chutney.',
          price: 311,
          veg: true,
        },
        {
          name: 'Green Chilli Dal Vada',
          description: 'South Indian-style lentil fritters with a fiery green chilli kick.',
          price: 299,
          veg: true,
        },
        {
          name: 'Crystal Beetroot & Water Chestnut Dimsum',
          description: 'Translucent dim sum filled with sweet beetroot and crunchy water chestnut.',
          price: 340,
          veg: true,
        },
        {
          name: 'Fresno Chilli Pineapple',
          description: 'Grilled pineapple with Fresno chilli glaze — sweet heat at its finest.',
          price: 370,
          veg: true,
        },
      ],
    },
    {
      id: 'starters',
      label: 'Starters',
      emoji: '🔥',
      items: [
        {
          name: 'Mangalore Ghee Roast Chicken',
          description: 'Tender chicken in a fiery, aromatic coastal spice blend. A Peepai legend.',
          price: 395,
          badge: 'Signature',
        },
        {
          name: 'Clay-pot Roasted Chicken Wings',
          description: 'Slow-roasted wings in a smoky clay-pot masala glaze.',
          price: 360,
          badge: 'Bestseller',
        },
        {
          name: 'Ghee Pepper Fry Chicken',
          description: 'Wok-tossed chicken in cracked black pepper and ghee — bold and addictive.',
          price: 395,
        },
        {
          name: 'Ajwaini Fish Tikka',
          description: 'Carom-seed marinated fish, tandoor-fired and served with herb chutney.',
          price: 530,
        },
        {
          name: 'Bhatti Ka Pomfret',
          description: 'Whole pomfret marinated in Punjabi spices and char-roasted in the bhatti.',
          price: 860,
          badge: 'Chef\'s Pick',
        },
        {
          name: 'Cajun Butter Garlic Prawns',
          description: 'Tiger prawns in Cajun spice, butter, and roasted garlic. Pan-seared to perfection.',
          badge: 'Chef\'s Pick',
        },
        {
          name: 'Hot Crispy Squid',
          description: 'Lightly battered squid rings, flash-fried and tossed in a fiery glaze.',
        },
        {
          name: 'Bangalore Local Kebab',
          description: 'Minced meat patty with Bengaluru street spices, grilled on a flat iron.',
        },
        {
          name: 'Chilli Malai Broccoli',
          description: 'Tandoor-kissed broccoli in a rich malai marinade with a chilli kick.',
          price: 460,
          veg: true,
        },
        {
          name: 'Paneer Tikka',
          description: 'Classic smoky tandoor paneer with bell peppers and house spice rub.',
          veg: true,
        },
      ],
    },
    {
      id: 'mains',
      label: 'Mains',
      emoji: '🍛',
      items: [
        {
          name: 'Dal Bukhara',
          description: 'Slow-cooked whole black lentils simmered overnight in a tandoor-smoked gravy.',
          price: 380,
          veg: true,
          badge: 'Bestseller',
        },
        {
          name: 'Paneer Tikka Masala',
          description: 'Charred paneer in a velvety tomato-cashew gravy. Rich, creamy, unmissable.',
          price: 530,
          veg: true,
        },
        {
          name: 'Yellow Chilli Tawa Paneer',
          description: 'Paneer cubes sautéed on the tawa with yellow chillies and spiced butter.',
          price: 470,
          veg: true,
        },
        {
          name: 'Palak Paneer Kofta Curry',
          description: 'Soft paneer kofta in a silky spinach gravy spiced with fenugreek.',
          price: 440,
          veg: true,
        },
        {
          name: 'Chana Dal Fry',
          description: 'Tadka-tempered split chickpea lentils with ginger, garlic and cumin.',
          price: 300,
          veg: true,
        },
        {
          name: 'Dal Ghee Khichdi',
          description: 'Comforting rice and lentil khichdi finished with a generous pour of desi ghee.',
          price: 360,
          veg: true,
        },
        {
          name: 'Stuffed Grilled Chicken with Mushroom Sauce',
          description: 'Free-range chicken breast stuffed with herbs, grilled and served with forest mushroom cream sauce.',
          price: 530,
          badge: 'Chef\'s Pick',
        },
        {
          name: 'Lemon Butter Basa Fish',
          description: 'Pan-seared Basa fillet in lemon-caper butter, served with sautéed greens.',
          price: 490,
        },
        {
          name: 'Chicken Biryani',
          description: 'Dum-cooked basmati rice layered with spiced chicken and fried onions.',
          badge: 'Bestseller',
        },
        {
          name: 'Anda Pav',
          description: 'Spiced egg bhurji served with butter-toasted Bombay pav. Comfort on a plate.',
          price: 420,
        },
        {
          name: 'Steamed Rice',
          price: 220,
          veg: true,
        },
        {
          name: 'Ghee Rice',
          description: 'Fragrant basmati tossed in desi ghee with whole spices.',
          price: 270,
          veg: true,
        },
      ],
    },
    {
      id: 'pizzas',
      label: 'Pizzas',
      emoji: '🍕',
      items: [
        {
          name: 'Margherita',
          description: 'San Marzano tomato, fresh mozzarella, basil. The classic, done right.',
          veg: true,
        },
        {
          name: 'Pesto Veggie',
          description: 'House-made basil pesto base with roasted vegetables and goat cheese.',
          veg: true,
          badge: 'Chef\'s Pick',
        },
        {
          name: 'BBQ Chicken',
          description: 'Smoky BBQ base, pulled chicken, red onion, jalapeño, and double cheese.',
          badge: 'Bestseller',
        },
        {
          name: 'Prawn & Chilli',
          description: 'Tiger prawns, chilli oil, cherry tomato, mozzarella on a garlic cream base.',
        },
        {
          name: 'Loaded Meat Feast',
          description: 'Pepperoni, chicken sausage, bacon, pulled pork on a rich tomato base.',
          badge: 'Fan Favourite',
        },
      ],
    },
    {
      id: 'grills-pasta',
      label: 'Grills & Pasta',
      emoji: '🥩',
      items: [
        {
          name: 'Grilled Peri-Peri Paneer',
          description: 'Marinated paneer steaks flame-grilled with Nando\'s-style peri-peri sauce.',
          price: 510,
          veg: true,
        },
        {
          name: 'Chicken Koobideh',
          description: 'Persian-style minced chicken skewers grilled over charcoal, served with saffron rice.',
          price: 490,
        },
        {
          name: 'Lamb Koobideh',
          description: 'Minced lamb skewers with herbs and spices, slow-grilled over charcoal.',
          price: 610,
          badge: 'Chef\'s Pick',
        },
        {
          name: 'Arrabiata Rigatoni (Veg)',
          description: 'Al dente rigatoni in a spicy, slow-cooked San Marzano arrabiata.',
          price: 450,
          veg: true,
        },
        {
          name: 'Cheese Sauce Conchiglie (Veg)',
          description: 'Shell pasta in a creamy four-cheese sauce with herbs.',
          price: 450,
          veg: true,
        },
        {
          name: 'Cheese Sauce Conchiglie (Chicken)',
          description: 'Shell pasta in creamy cheese sauce with pan-seared chicken.',
          price: 500,
        },
        {
          name: 'Cheese Sauce Conchiglie (Bacon)',
          description: 'Smoky bacon and shell pasta bathed in a rich, indulgent cheese sauce.',
          price: 520,
        },
        {
          name: 'Cheese Sauce Conchiglie (Prawn)',
          description: 'Jumbo prawns, shell pasta, creamy cheese and chilli flakes.',
          price: 620,
        },
        {
          name: 'Croissant Veg Sandwich',
          description: 'Flaky croissant filled with grilled vegetables, basil aioli and smoked cheese.',
          price: 430,
          veg: true,
        },
        {
          name: 'Croissant Chicken Sandwich',
          description: 'Grilled chicken, sundried tomato mayo, rocket and cheese in a buttery croissant.',
          price: 470,
        },
      ],
    },
    {
      id: 'desserts',
      label: 'Desserts',
      emoji: '🍮',
      items: [
        {
          name: 'Pistachio Tres Leches',
          description: 'Light sponge soaked in three milks, topped with crushed pistachios and whipped cream.',
          badge: 'House Special',
          veg: true,
        },
        {
          name: 'Chocolate Fondant',
          description: 'Warm, gooey dark chocolate cake with a molten centre, served with vanilla ice cream.',
          price: 340,
          veg: true,
          badge: 'Bestseller',
        },
        // TODO: Ask owner for third dessert name (was cut off in source data)
      ],
    },
    {
      id: 'cocktails',
      label: 'Cocktails & Mocktails',
      emoji: '🍹',
      items: [
        {
          name: 'Peepai Long Island',
          description: 'A house twist on the classic LIIT — four spirits, citrus, and a secret pour.',
          badge: 'Signature',
          veg: true,
        },
        {
          name: 'Mango Chilli Margarita',
          description: 'Fresh mango purée, silver tequila, triple sec and a chilli-salt rim.',
          veg: true,
        },
        {
          name: 'Coconut Negroni',
          description: 'Coconut-washed gin, Campari, sweet vermouth. Tropical and bitter-sweet.',
          veg: true,
        },
        {
          name: 'Lychee Elderflower Spritz',
          description: 'Lychee vodka, elderflower tonic and prosecco. Light and floral.',
          veg: true,
        },
        {
          name: 'Peepai Sunrise (Mocktail)',
          description: 'Orange, grenadine, passion fruit and soda — our non-alcoholic showstopper.',
          veg: true,
        },
        {
          name: 'Virgin Mojito (Mocktail)',
          description: 'Fresh mint, lime, sugar and sparkling water. The refresher.',
          veg: true,
        },
      ],
    },
  ],

  // ─── Delivery & Aggregators ────────────────────────────
  deliveryLinks: {
    swiggy: 'https://www.swiggy.com/city/bangalore/peepai-kitchen-and-brewery-hebbal-rest631961',
    zomato: 'https://www.zomato.com/bangalore/peepai-3-hebbal-bangalore/order',
  },

  // ─── Social Media Handles ──────────────────────────────
  socialLinks: {
    instagram: 'https://www.instagram.com/peepaibrewery/',
    facebook: 'https://www.facebook.com/peepaibrewery/',
    linkedin: 'https://www.linkedin.com/company/peepai-brewery/posts/',
  },

  // ─── SEO ────────────────────────────────────────────────
  metaDescription:
    'Peepai Brewery & Kitchen in Hebbal, Bengaluru — craft beers brewed in-house, North Indian cuisine, pizza, live music & outdoor seating. Open daily 12 PM – 12:30 AM.',
  ogImage: '/photos/ambience2.jpg',

  // ─── Footer ─────────────────────────────────────────────
  footerCredit:
    'Concept design for the owner to review. Not the official website.',
};

export default config;
