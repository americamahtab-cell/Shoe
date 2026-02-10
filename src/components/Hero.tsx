"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useProducts } from '@/context/ProductContext';

const Hero = () => {
  const { products } = useProducts();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Extract the first image from each product to use in the hero slideshow
  const heroImages = products.length > 0 
    ? products.map(p => p.images[0]).filter(Boolean) 
    : ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop"];

  useEffect(() => {
    if (heroImages.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [heroImages.length]);

  return (
    <div className="relative overflow-hidden bg-secondary/30 py-16 md:py-24">
      <div className="container px-4 md:px-8">
        <div className="grid gap-12 md:grid-cols-2 items-center">
          <div className="flex flex-col gap-6">
            <div className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80 w-fit">
              New Season Arrival
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[1.1]">
              STEP INTO THE <span className="text-primary">FUTURE</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-[500px] font-thin italic">
              Whereas recognition of the inherent dignity
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="rounded-full px-8 h-14 text-base font-bold">
                Shop Now <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="rounded-full px-8 h-14 text-base font-bold">
                View Collection
              </Button>
            </div>
          </div>
          <div className="relative h-[400px] flex items-center justify-center">
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/10 rounded-full blur-3xl" />
            
            {heroImages.map((img, index) => (
              <img 
                key={`${img}-${index}`}
                src={img} 
                alt={`Featured Product ${index + 1}`} 
                className={`absolute w-full h-auto max-h-full object-contain drop-shadow-2xl transition-all duration-1000 ease-in-out ${
                  index === currentImageIndex 
                    ? "opacity-100 scale-100 rotate-[-15deg]" 
                    : "opacity-0 scale-90 rotate-0 pointer-events-none"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;