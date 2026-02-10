"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
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
            <p className="text-lg text-muted-foreground max-w-[500px]">
              Discover the latest collection of high-performance sneakers designed for comfort, style, and speed.
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
          <div className="relative">
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/10 rounded-full blur-3xl" />
            <img 
              src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop" 
              alt="Featured Sneaker" 
              className="w-full h-auto object-contain drop-shadow-2xl rotate-[-15deg] hover:rotate-0 transition-transform duration-700 ease-out"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;