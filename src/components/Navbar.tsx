"use client";

import React from 'react';
import { ShoppingBag, Search, User, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface NavbarProps {
  cartCount: number;
  onCartClick: () => void;
}

const Navbar = ({ cartCount, onCartClick }: NavbarProps) => {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 items-center justify-between px-4 md:px-8">
        <div className="flex items-center gap-8">
          <a href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-black tracking-tighter text-primary">SOLESPHERE</span>
          </a>
          <div className="hidden md:flex gap-6 text-sm font-medium">
            <a href="#" className="transition-colors hover:text-primary/70">New Releases</a>
            <a href="#" className="transition-colors hover:text-primary/70">Men</a>
            <a href="#" className="transition-colors hover:text-primary/70">Women</a>
            <a href="#" className="transition-colors hover:text-primary/70">Sale</a>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden lg:flex relative w-64">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input 
              placeholder="Search sneakers..." 
              className="pl-10 bg-secondary/50 border-none rounded-full focus-visible:ring-1"
            />
          </div>
          
          <Button variant="ghost" size="icon" className="rounded-full">
            <User className="h-5 w-5" />
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="relative rounded-full"
            onClick={onCartClick}
          >
            <ShoppingBag className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                {cartCount}
              </span>
            )}
          </Button>
          
          <Button variant="ghost" size="icon" className="md:hidden rounded-full">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;