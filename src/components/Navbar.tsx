"use client";

import React from 'react';
import { ShoppingBag, Search, User, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface NavbarProps {
  cartCount: number;
  onCartClick: () => void;
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const Navbar = ({ cartCount, onCartClick, searchTerm, onSearchChange }: NavbarProps) => {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 items-center justify-between px-4 md:px-8 gap-4">
        <div className="flex items-center gap-8 shrink-0">
          <a href="/" className="flex items-center space-x-2">
            <span className="text-xl md:text-2xl font-black tracking-tighter text-primary">SOLESPHERE</span>
          </a>
          <div className="hidden md:flex gap-6 text-sm font-medium">
            <a href="#" className="transition-colors hover:text-primary/70">New Releases</a>
            <a href="#" className="transition-colors hover:text-primary/70">Men</a>
            <a href="#" className="transition-colors hover:text-primary/70">Women</a>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-end gap-2 md:gap-4">
          <div className="relative w-full max-w-[140px] sm:max-w-64">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input 
              placeholder="Search..." 
              className="pl-9 bg-secondary/50 border-none rounded-full h-9 md:h-10 text-sm focus-visible:ring-1"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-1 md:gap-2">
            <Button variant="ghost" size="icon" className="rounded-full h-9 w-9 md:h-10 md:w-10">
              <User className="h-4 w-4 md:h-5 md:w-5" />
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative rounded-full h-9 w-9 md:h-10 md:w-10"
              onClick={onCartClick}
            >
              <ShoppingBag className="h-4 w-4 md:h-5 md:w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 md:h-5 md:w-5 items-center justify-center rounded-full bg-primary text-[8px] md:text-[10px] font-bold text-primary-foreground">
                  {cartCount}
                </span>
              )}
            </Button>
            
            <Button variant="ghost" size="icon" className="md:hidden rounded-full h-9 w-9">
              <Menu className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;