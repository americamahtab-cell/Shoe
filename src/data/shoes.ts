export interface Shoe {
  id: string;
  name: string;
  brand: string;
  price: number;
  category: 'Running' | 'Basketball' | 'Lifestyle' | 'Training';
  images: string[]; // Changed from image: string to images: string[]
  color: string;
}

export const shoes: Shoe[] = [
  {
    id: '1',
    name: 'Air Max Pulse',
    brand: 'Nike',
    price: 150,
    category: 'Lifestyle',
    images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop'],
    color: 'Red/Black'
  },
  {
    id: '2',
    name: 'Ultraboost Light',
    brand: 'Adidas',
    price: 190,
    category: 'Running',
    images: ['https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?q=80&w=800&auto=format&fit=crop'],
    color: 'Cloud White'
  },
  {
    id: '3',
    name: 'Jordan Retro 4',
    brand: 'Jordan',
    price: 210,
    category: 'Basketball',
    images: ['https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=800&auto=format&fit=crop'],
    color: 'Thunder'
  }
];