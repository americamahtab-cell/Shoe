"use client";

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ProductList from '@/components/ProductList';
import Footer from '@/components/Footer';

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [cartCount, setCartCount] = useState(0);

  const handleCartClick = () => {
    console.log("Cart clicked");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar 
        cartCount={cartCount}
        onCartClick={handleCartClick}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />
      <main className="flex-1">
        <Hero />
        <div id="products-section">
          <ProductList />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;