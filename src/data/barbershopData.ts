import { BarberService, Barber } from '../types';

export const BARBERSHOP_INFO = {
  name: 'Heritage & Blade Barbershop',
  tagline: 'Artisanal Grooming & Classic Barbering',
  address: '428 Artisan Way, Suite 102, Downtown Arts District',
  city: 'Portland, OR 97205',
  phone: '(555) 728-3920',
  email: 'concierge@heritageandblade.com',
  hours: [
    { day: 'Monday â€“ Friday', open: '08:00 AM', close: '08:00 PM', timeValue: { open: 8, close: 20 } },
    { day: 'Saturday', open: '09:00 AM', close: '06:00 PM', timeValue: { open: 9, close: 18 } },
    { day: 'Sunday', open: '10:00 AM', close: '05:00 PM', timeValue: { open: 10, close: 17 } },
  ],
  socials: {
    instagram: 'https://instagram.com',
    facebook: 'https://facebook.com',
    twitter: 'https://twitter.com',
  },
  established: 2018,
};

export const SERVICES: BarberService[] = [
  {
    id: 'exec-cut',
    name: 'The Executive Haircut & Style',
    category: 'hair',
    description: 'Precision scissor and clipper cut tailored to your head shape, followed by warm lather neck shave, invigorating wash, and matte or high-shine styling.',
    price: 55,
    durationMinutes: 45,
    featured: true,
  },
  {
    id: 'skin-fade',
    name: 'Signature Skin Fade & Foil Finish',
    category: 'hair',
    description: 'Zero to skin fade executed with surgical precision, foil shaver finish for glass-smooth blending, razor lineup, and cooling aftershave mist.',
    price: 60,
    durationMinutes: 45,
    featured: true,
  },
  {
    id: 'hot-towel-shave',
    name: 'Traditional Hot Towel Straight-Razor Shave',
    category: 'beard',
    description: 'Classic barber ritual: essential oil preparation, alternating steamed towels, rich badger-brush lather, double-pass straight razor shave, and cold stone finish.',
    price: 50,
    durationMinutes: 40,
    featured: true,
  },
  {
    id: 'craftsman-package',
    name: 'The Full Craftsman Experience',
    category: 'combo',
    description: 'Our ultimate grooming session: Tailored haircut, beard sculpting or hot razor shave, peppermint scalp massage, eucalyptus steamed towel, and complimentary single malt pour.',
    price: 95,
    durationMinutes: 75,
    featured: true,
  },
  {
    id: 'beard-sculpt',
    name: 'Artisanal Beard Sculpt & Lineup',
    category: 'beard',
    description: 'Custom beard shaping, length gradation, straight razor cheek and neck edging, deep conditioning beard butter massage, and thermal blow-comb shape.',
    price: 38,
    durationMinutes: 30,
  },
  {
    id: 'junior-cut',
    name: 'Young Gentleman Haircut (Under 13)',
    category: 'hair',
    description: 'Patient, master-level craftsmanship for boys. Includes clean styling and custom parting with gentle water-based styling balm.',
    price: 40,
    durationMinutes: 30,
  },
  {
    id: 'scalp-revival',
    name: 'Charcoal Scalp Detox & Facial Tonic',
    category: 'spa',
    description: 'Activated charcoal exfoliating scalp scrub, deep follicle cleansing wash, invigorating tea tree steam towel, and chilled cucumber eye compress.',
    price: 45,
    durationMinutes: 35,
  },
  {
    id: 'gray-blending',
    name: 'Discreet Gray Blending & Beard Camo',
    category: 'combo',
    description: 'Subtle, semi-permanent natural tone enhancement designed to soften contrast and restore youthful depth in 15 minutes at the wash basin.',
    price: 48,
    durationMinutes: 35,
  },
];

export const BARBERS: Barber[] = [
  {
    id: 'marcus-vance',
    name: 'Marcus Vance',
    role: 'Founder & Master Barber',
    experienceYears: 15,
    bio: 'Third-generation barber trained in traditional British scissor geometry and classic American fades. Passionate about enduring craftsmanship and timeless style.',
    specialties: ['Scissor Geometry', 'Executive Styling', 'Classic Pompadours'],
    avatarUrl: '/images/barbershop_team_craft_1790225642946.jpg',
    instagram: '@marcus.blade',
  },
  {
    id: 'leo-rossi',
    name: 'Leo Rossi',
    role: 'Straight-Razor Specialist',
    experienceYears: 10,
    bio: 'Apprenticed in Florence, Leo is known for master-level hot lather straight-edge shaves, meticulous beard sculpting, and facial wellness rituals.',
    specialties: ['Straight-Edge Shaves', 'Beard Architecture', 'Hot Towel Rituals'],
    avatarUrl: '/images/straight_razor_shave_1790225630292.jpg',
    instagram: '@rossi_barberia',
  },
  {
    id: 'darren-cole',
    name: 'Darren Cole',
    role: 'Texture & Fade Artisan',
    experienceYears: 9,
    bio: 'Master of drop fades, tapers, razor sharp lineups, and multi-textured hair shaping. Known for relentless precision and effortless modern finishes.',
    specialties: ['Skin Fades', 'Textured Crops', 'Razor Lineups'],
    avatarUrl: '/images/barber_haircut_craft_1790225617790.jpg',
    instagram: '@cole_precision',
  },
  {
    id: 'alex-chen',
    name: 'Alex Chen',
    role: 'Senior Stylist & Groomer',
    experienceYears: 7,
    bio: 'Specializing in medium-to-long scissor styling, modern taper flows, and beard contouring with an eye for natural movement and easy daily maintenance.',
    specialties: ['Modern Flow & Layering', 'Beard Detailing', 'Color Camo'],
    avatarUrl: '/images/hero_barbershop_interior_1790225602482.jpg',
    instagram: '@chen_craft',
  },
];

export const TESTIMONIALS = [
  {
    quote: "The Craftsman Package is the gold standard of men's grooming. Marcus's attention to line work and the hot towel straight razor shave is unmatched anywhere in the city.",
    author: "Julian Sterling",
    role: "Architect & Partner at Studio Apex",
    service: "The Full Craftsman Experience",
    date: "September 2026",
    rating: 5,
  },
  {
    quote: "Leo gave me the cleanest straight-razor shave of my life before my wedding day. Zero irritation, incredible precision, and the shop ambiance is pure class.",
    author: "David McAlister",
    role: "Creative Director",
    service: "Traditional Hot Towel Shave",
    date: "August 2026",
    rating: 5,
  },
  {
    quote: "Booked online in under a minute, synced directly to my Apple Calendar, and Darren had me looking sharp right on schedule. Consistent excellence every visit.",
    author: "Robert Chen",
    role: "Tech Executive",
    service: "Signature Skin Fade",
    date: "September 2026",
    rating: 5,
  },
];

export const PROMO_OFFER = {
  code: 'FIRSTCUT20',
  discountPercent: 20,
  description: 'First-Visit Welcome Offer: 20% off any grooming service + complimentary hot towel treatment.',
};

