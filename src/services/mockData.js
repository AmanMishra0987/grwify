// Curated high-fidelity product list for the Virtual Try-On catalog
// Unsplash images are selected for clean compositions, making them excellent for sizing/overlaying
export const products = [
  {
    id: 'p1',
    name: 'Classic Denim Jacket',
    category: 'Outerwear',
    price: '$89.00',
    description: 'Vintage washed denim jacket with metal button closures and double chest pockets.',
    image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=600&auto=format&fit=crop&q=80',
    popularity: 92,
    defaultScale: 0.65,
    defaultOffset: { x: 0, y: 50 }
  },
  {
    id: 'p2',
    name: 'Vintage Leather Jacket',
    category: 'Outerwear',
    price: '$189.00',
    description: 'Premium black leather biker jacket with asymmetric silver zipper details.',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&auto=format&fit=crop&q=80',
    popularity: 85,
    defaultScale: 0.65,
    defaultOffset: { x: 0, y: 40 }
  },
  {
    id: 'p3',
    name: 'Sunset Yellow Hoodie',
    category: 'Tops',
    price: '$59.00',
    description: 'Heavyweight organic cotton hoodie in a vibrant ochre yellow tone.',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&auto=format&fit=crop&q=80',
    popularity: 95,
    defaultScale: 0.60,
    defaultOffset: { x: 0, y: 60 }
  },
  {
    id: 'p4',
    name: 'Minimalist White Tee',
    category: 'Tops',
    price: '$29.00',
    description: 'Essential crewneck t-shirt crafted from long-staple Egyptian cotton.',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&auto=format&fit=crop&q=80',
    popularity: 78,
    defaultScale: 0.55,
    defaultOffset: { x: 0, y: 70 }
  },
  {
    id: 'p5',
    name: 'Floral Summer Dress',
    category: 'Dresses',
    price: '$110.00',
    description: 'A-line midi dress featuring a sweetheart neckline and delicate botanical print.',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&auto=format&fit=crop&q=80',
    popularity: 70,
    defaultScale: 0.70,
    defaultOffset: { x: 0, y: 120 }
  },
  {
    id: 'p6',
    name: 'Gold Aviator Sunglasses',
    category: 'Accessories',
    price: '$145.00',
    description: 'Classic aviator frames with 18k gold plating and polarized amber lenses.',
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&auto=format&fit=crop&q=80',
    popularity: 88,
    defaultScale: 0.20,
    defaultOffset: { x: 0, y: -90 }
  },
  {
    id: 'p7',
    name: 'Urban Straw Fedora',
    category: 'Hats',
    price: '$45.00',
    description: 'Handwoven Panama hat with a contrasting black grosgrain ribbon.',
    image: 'https://images.unsplash.com/photo-1572426315427-8393278c7735?w=600&auto=format&fit=crop&q=80',
    popularity: 64,
    defaultScale: 0.35,
    defaultOffset: { x: 0, y: -130 }
  },
  {
    id: 'p8',
    name: 'Crimson Puffer Jacket',
    category: 'Outerwear',
    price: '$210.00',
    description: 'Water-resistant quilted puffer jacket insulated with 700-fill power down.',
    image: 'https://images.unsplash.com/photo-1548883354-7622d03aca27?w=600&auto=format&fit=crop&q=80',
    popularity: 81,
    defaultScale: 0.65,
    defaultOffset: { x: 0, y: 40 }
  },
  {
    id: 'p9',
    name: 'Knit Wool Beanie',
    category: 'Hats',
    price: '$24.00',
    description: 'Rib-knit wool blend beanie for cozy cold-weather styling.',
    image: 'https://images.unsplash.com/photo-1576871337622-98d48d4aa53e?w=600&auto=format&fit=crop&q=80',
    popularity: 76,
    defaultScale: 0.32,
    defaultOffset: { x: 0, y: -120 }
  },
  {
    id: 'p10',
    name: 'Modern Charcoal Blazer',
    category: 'Outerwear',
    price: '$135.00',
    description: 'Slim-fit single-breasted blazer in structured structured wool blend tweed.',
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&auto=format&fit=crop&q=80',
    popularity: 89,
    defaultScale: 0.65,
    defaultOffset: { x: 0, y: 55 }
  }
];

// Sample model options for Screen 4 (Photo Upload)
export const sampleModels = [
  {
    id: 'm1',
    name: 'Alex (Male Model)',
    gender: 'Male',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'm2',
    name: 'Sophia (Female Model)',
    gender: 'Female',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'm3',
    name: 'Jordan (Androgynous)',
    gender: 'Unisex',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'm4',
    name: 'Marcus (Male Model)',
    gender: 'Male',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80'
  }
];

// Mock Analytics Data for Screen 6 (Admin Dashboard)
export const adminAnalytics = {
  summary: [
    { title: 'Total Try-Ons', value: '3,482', change: '+18.4%', isPositive: true },
    { title: 'Active Users Today', value: '849', change: '+12.3%', isPositive: true },
    { title: 'Fitting Conversion', value: '24.6%', change: '+3.1%', isPositive: true },
    { title: 'Avg. Fit Time', value: '1.74s', change: '-8.2%', isPositive: true }
  ],
  volumeOverTime: [
    { name: 'May 12', volume: 180 },
    { name: 'May 13', volume: 220 },
    { name: 'May 14', volume: 195 },
    { name: 'May 15', volume: 240 },
    { name: 'May 16', volume: 310 },
    { name: 'May 17', volume: 285 },
    { name: 'May 18', volume: 330 },
    { name: 'May 19', volume: 375 },
    { name: 'May 20', volume: 340 },
    { name: 'May 21', volume: 390 },
    { name: 'May 22', volume: 420 },
    { name: 'May 23', volume: 465 },
    { name: 'May 24', volume: 410 },
    { name: 'May 25', volume: 485 },
    { name: 'May 26', volume: 512 }
  ],
  deviceSplit: [
    { name: 'Mobile', value: 1671, color: '#8b5cf6' },
    { name: 'Desktop', value: 1462, color: '#6366f1' },
    { name: 'Tablet', value: 349, color: '#a78bfa' }
  ],
  categoryBreakdown: [
    { name: 'Outerwear', count: 1450 },
    { name: 'Tops', count: 980 },
    { name: 'Dresses', count: 482 },
    { name: 'Hats', count: 320 },
    { name: 'Accessories', count: 250 }
  ]
};
