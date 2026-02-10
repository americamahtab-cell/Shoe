"use client";

import React from 'react';
import { Shoe } from '@/data/shoes';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface ProductCardProps {
  shoe: Shoe;
  onAddToCart: (shoe: Shoe) => void;
}

const ProductCard = ({ shoe, onAddToCart }: ProductCardProps) => {
  return (
    <Card className="group overflow-hidden border-none bg-secondary/20 transition-all hover:shadow-xl rounded-3xl">
      <CardContent className="p-0">
        <div className="relative aspect-square overflow-hidden bg-secondary/40">
          <img 
            src={shoe.image} 
            alt={shoe.name} 
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute top-4 left-4">
            <span className="rounded-full bg-background/80 backdrop-blur-sm px-3 py-1 text-[10px] font-bold uppercase tracking-wider">
              {shoe.brand}
            </span>
          </div>
        </div>
        <div className="p-6">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-bold text-lg leading-tight">{shoe.name}</h3>
              <p className="text-sm text-muted-foreground">{shoe.category}</p>
            </div>
            <p className="font-black text-lg">${shoe.price}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button 
          className="w-full rounded-2xl h-12 font-bold transition-all group-hover:bg-primary"
          onClick={() => onAddToCart(shoe)}
        >
          <Plus className="mr-2 h-4 w-4" /> Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;