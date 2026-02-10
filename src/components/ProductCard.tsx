"use client";

import React, { useState } from 'react';
import { Shoe } from '@/data/shoes';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ProductCardProps {
  shoe: Shoe;
  onAddToCart: (shoe: Shoe) => void;
}

const ProductCard = ({ shoe, onAddToCart }: ProductCardProps) => {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % shoe.images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + shoe.images.length) % shoe.images.length);
  };

  return (
    <Card className="group overflow-hidden border-none bg-secondary/20 transition-all hover:shadow-xl rounded-3xl">
      <CardContent className="p-0">
        <div className="relative aspect-square overflow-hidden bg-secondary/40">
          {/* Image with Preview Trigger */}
          <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
            <DialogTrigger asChild>
              <div className="relative h-full w-full cursor-zoom-in overflow-hidden">
                <img 
                  src={shoe.images[currentImageIndex]} 
                  alt={shoe.name} 
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                  <ZoomIn className="text-white opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8" />
                </div>
              </div>
            </DialogTrigger>
            <DialogContent className="max-w-3xl p-0 overflow-hidden border-none bg-transparent shadow-none sm:rounded-3xl">
              <div className="relative aspect-square w-full bg-secondary/20 backdrop-blur-sm flex items-center justify-center">
                <img 
                  src={shoe.images[currentImageIndex]} 
                  alt={shoe.name} 
                  className="max-h-[90vh] w-full object-contain rounded-2xl"
                />
              </div>
            </DialogContent>
          </Dialog>

          {/* Navigation Arrows */}
          {shoe.images.length > 1 && (
            <>
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute left-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-background/50 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={prevImage}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-background/50 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={nextImage}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              
              {/* Dots Indicator */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
                {shoe.images.map((_, i) => (
                  <div 
                    key={i} 
                    className={`h-1.5 w-1.5 rounded-full transition-all ${i === currentImageIndex ? 'bg-primary w-3' : 'bg-primary/30'}`}
                  />
                ))}
              </div>
            </>
          )}

          <div className="absolute top-4 left-4 pointer-events-none">
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