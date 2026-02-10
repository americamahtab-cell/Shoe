"use client";

import React from 'react';
import { useStore } from '@/context/StoreContext';

const Footer = () => {
  const { storeName, storeDescription } = useStore();
  
  return (
    <footer className="bg-secondary/30 py-16 mt-auto border-t border-border/50">
      <div className="container px-4 md:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <h3 className="text-2xl font-black tracking-tighter text-primary">{storeName}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              {storeDescription}
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4 uppercase text-xs tracking-widest">Shop</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="hover:text-primary cursor-pointer transition-colors">All Products</li>
              <li className="hover:text-primary cursor-pointer transition-colors">New Arrivals</li>
              <li className="hover:text-primary cursor-pointer transition-colors">Featured</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 uppercase text-xs tracking-widest">Support</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="hover:text-primary cursor-pointer transition-colors">Shipping Policy</li>
              <li className="hover:text-primary cursor-pointer transition-colors">Returns & Exchanges</li>
              <li className="hover:text-primary cursor-pointer transition-colors">Contact Us</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 uppercase text-xs tracking-widest">Newsletter</h4>
            <p className="text-sm text-muted-foreground mb-4">Subscribe to get special offers.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Email address" 
                className="bg-background border rounded-xl px-4 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-border/50 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} {storeName}. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;