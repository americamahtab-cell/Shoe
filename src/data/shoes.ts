export interface Shoe {
  id: string;
  name: string;
  brand: string;
  price: number;
  category: 'Running' | 'Basketball' | 'Lifestyle' | 'Training';
  image: string;
  color: string;
}

export const shoes: Shoe[] = [
  {
    id: '1',
    name: 'Air Max Pulse',
    brand: 'Nike',
    price: 150,
    category: 'Lifestyle',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop',
    color: 'Red/Black'
  },
  {
    id: '2',
    name: 'Ultraboost Light',
    brand: 'Adidas',
    price: 190,
    category: 'Running',
    image: 'https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?q=80&w=800&auto=format&fit=crop',
    color: 'Cloud White'
  },
  {
    id: '3',
    name: 'Jordan Retro 4',
    brand: 'Jordan',
    price: 210,
    category: 'Basketball',
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=800&auto=format&fit=crop',
    color: 'Thunder'
  },
  {
    id: '4',
    name: 'Metcon 9',
    brand: 'Nike',
    price: 140,
    category: 'Training',
    image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=800&auto=format&fit=crop',
    color: 'Volt'
  },
  {
    id: '5',
    name: 'Forum Low',
    brand: 'Adidas',
    price: 110,
    category: 'Lifestyle',
    image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=800&auto=format&fit=crop',
    color: 'Blue/White'
  },
  {
    id: '6',
    name: 'LeBron XXI',
    brand: 'Nike',
    price: 200,
    category: 'Basketball',
    image: 'https://images.unsplash.com/photo-1605348532760-6753d2c43329?q=80&w=800&auto=format&fit=crop',
    color: 'Purple'
  }
];