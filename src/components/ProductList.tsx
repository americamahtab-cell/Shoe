"use client";

import React from 'react';
import { useProducts } from '@/context/ProductContext';
import { useCurrency } from '@/context/CurrencyContext';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Heart } from 'lucide-react';

const ProductList = () => {
  const { products } = useProducts();
  const { formatPrice } = useCurrency();

  return (
    <section className="py-16 container px-4 md:px-8">
      <div className="flex flex-col gap-2 mb-10">
        <h2 className="text-4xl font-black tracking-tight">OUR COLLECTION</h2>
        <div className="h-1.5 w-20 bg-primary rounded-full" />
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <div key={product.id} className="group relative bg-card rounded-[2rem] overflow-hidden border border-border/50 hover:border-primary/20 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5">
            <div className="aspect-[4/5] overflow-hidden bg-secondary/20 relative">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute top-4 right-4 flex flex-col gap-2 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500">
                <Button size="icon" variant="secondary" className="rounded-full shadow-lg">
                  <Heart className="h-5 w-5" />
                </Button>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-gradient-to-t from-black/60 to-transparent">
                <Button className="w-full rounded-2xl font-bold h-12 gap-2">
                  <ShoppingCart className="h-5 w-5" /> Add to Cart
                </Button>
              </div>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="text-xs font-bold text-primary uppercase tracking-widest mb-1">{product.category}</p>
                  <h3 className="text-xl font-bold tracking-tight">{product.name}</h3>
                </div>
                <p className="text-xl font-black text-primary">{formatPrice(product.price)}</p>
              </div>
              <p className="text-muted-foreground text-sm line-clamp-2">{product.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductList;