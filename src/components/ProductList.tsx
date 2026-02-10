"use client";

import React from 'react';
import ProductCard from './ProductCard';

const DUMMY_PRODUCTS = [
  {
    id: '1',
    name: 'Air Max Pulse',
    price: 150,
    category: 'Running',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: '2',
    name: 'Zoom Fly 5',
    price: 180,
    category: 'Performance',
    image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: '3',
    name: 'Metcon 9',
    price: 140,
    category: 'Training',
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: '4',
    name: 'Jordan Retro 4',
    price: 210,
    category: 'Lifestyle',
    image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: '5',
    name: 'React Pegasus',
    price: 130,
    category: 'Running',
    image: 'https://images.unsplash.com/photo-1605348532760-6753d2c43329?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: '6',
    name: 'Blazer Mid 77',
    price: 110,
    category: 'Classic',
    image: 'https://images.unsplash.com/photo-1514989940723-e8e51635b782?q=80&w=800&auto=format&fit=crop'
  }
];

const ProductList = () => {
  return (
    <section className="py-20 container px-4 md:px-8">
      <div className="flex flex-col gap-2 mb-12">
        <h2 className="text-4xl md:text-5xl font-black tracking-tight">OUR COLLECTION</h2>
        <div className="h-2 w-24 bg-primary rounded-full" />
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
        {DUMMY_PRODUCTS.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default ProductList;