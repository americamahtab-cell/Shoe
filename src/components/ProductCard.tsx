"use client";

import React from 'react';
import { ShoppingCart, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCurrency } from '@/context/CurrencyContext';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
    category: string;
  };
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { formatPrice } = useCurrency();

  return (
    <div className="group relative bg-card rounded-[2rem] overflow-hidden border border-border/50 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 hover:-translate-y-2">
      <div className="aspect-[4/5] overflow-hidden bg-secondary/30 relative">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-4 right-4 flex flex-col gap-2 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
          <Button size="icon" variant="secondary" className="rounded-full shadow-lg">
            <Heart className="h-5 w-5" />
          </Button>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
          <Button className="w-full rounded-2xl h-12 font-bold shadow-xl gap-2">
            <ShoppingCart className="h-5 w-5" /> Add to Cart
          </Button>
        </div>
      </div>
      <div className="p-6 space-y-2">
        <p className="text-xs font-bold text-primary uppercase tracking-widest">{product.category}</p>
        <h3 className="text-xl font-bold truncate">{product.name}</h3>
        <p className="text-2xl font-black text-foreground">
          {formatPrice(product.price)}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;