"use client";

import React, { useState, useMemo } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import FilterSidebar from '../components/FilterSidebar';
import CartDrawer from '../components/CartDrawer';
import { Shoe } from '../data/shoes';
import { useProducts } from '../context/ProductContext';
import { showSuccess } from '../utils/toast';
import { MadeWithDyad } from "../components/made-with-dyad";
import { Link } from 'react-router-dom';
import { Search, SlidersHorizontal } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useStore } from '../context/StoreContext';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../components/ui/sheet";

const Index = () => {
  const { products } = useProducts();
  const { storeName, storeDescription } = useStore();
  const [cartItems, setCartItems] = useState<Shoe[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);

  const addToCart = (shoe: Shoe) => {
    setCartItems((prev) => [...prev, shoe]);
    showSuccess(`${shoe.name} added to cart!`);
  };

  const removeFromCart = (id: string) => {
    setCartItems((prev) => {
      const index = prev.findIndex(item => item.id === id);
      if (index === -1) return prev;
      const newCart = [...prev];
      newCart.splice(index, 1);
      return newCart;
    });
  };

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.brand.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
      const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand);
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];

      return matchesSearch && matchesCategory && matchesBrand && matchesPrice;
    });
  }, [products, searchTerm, selectedCategories, selectedBrands, priceRange]);

  return (
    <div className="min-h-screen bg-background font-sans selection:bg-primary selection:text-primary-foreground">
      <Navbar 
        cartCount={cartItems.length} 
        onCartClick={() => setIsCartOpen(true)} 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />
      
      <main>
        <Hero />
        
        <div className="container px-4 md:px-8 py-16">
          <div className="flex flex-col md:flex-row gap-12">
            <aside className="hidden md:block w-64 shrink-0">
              <div className="sticky top-28">
                <FilterSidebar 
                  selectedCategories={selectedCategories}
                  setSelectedCategories={setSelectedCategories}
                  selectedBrands={selectedBrands}
                  setSelectedBrands={setSelectedBrands}
                  priceRange={priceRange}
                  setPriceRange={setPriceRange}
                />
              </div>
            </aside>

            <div className="flex-1">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-black tracking-tight uppercase">EXPLORE ALL</h2>
                  <p className="text-muted-foreground font-medium">{filteredProducts.length} Products Found</p>
                </div>
                
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="md:hidden rounded-xl gap-2">
                      <SlidersHorizontal className="h-4 w-4" /> Filters
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                    <SheetHeader className="mb-8">
                      <SheetTitle className="text-2xl font-black">FILTERS</SheetTitle>
                    </SheetHeader>
                    <FilterSidebar 
                      selectedCategories={selectedCategories}
                      setSelectedCategories={setSelectedCategories}
                      selectedBrands={selectedBrands}
                      setSelectedBrands={setSelectedBrands}
                      priceRange={priceRange}
                      setPriceRange={setPriceRange}
                    />
                  </SheetContent>
                </Sheet>
              </div>
              
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredProducts.map((shoe) => (
                    <ProductCard 
                      key={shoe.id} 
                      shoe={shoe} 
                      onAddToCart={addToCart} 
                    />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <div className="rounded-full bg-secondary p-6 mb-4">
                    <Search className="h-12 w-12 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-bold">No products found</h3>
                  <p className="text-muted-foreground">Try adjusting your filters or search term.</p>
                  <Button 
                    variant="link" 
                    className="mt-2 font-bold"
                    onClick={() => {
                      setSelectedCategories([]);
                      setSelectedBrands([]);
                      setPriceRange([0, 1000]);
                      setSearchTerm('');
                    }}
                  >
                    Clear all filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t bg-secondary/10 py-12">
        <div className="container px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-2">
              <span className="text-2xl font-black tracking-tighter text-primary mb-6 block uppercase">{storeName}</span>
              <p className="text-muted-foreground max-w-sm mb-6">
                {storeDescription}
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Shop</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary">New Arrivals</a></li>
                <li><a href="#" className="hover:text-primary">Best Sellers</a></li>
                <li><a href="#" className="hover:text-primary">Release Calendar</a></li>
                <li><a href="#" className="hover:text-primary">Sale</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary">Order Status</a></li>
                <li><a href="#" className="hover:text-primary">Shipping & Delivery</a></li>
                <li><a href="#" className="hover:text-primary">Returns</a></li>
                <li><a href="#" className="hover:text-primary">Contact Us</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-muted-foreground">© 2024 {storeName} Inc. All rights reserved.</p>
            <div className="flex gap-6 text-xs text-muted-foreground">
              <a href="#" className="hover:text-primary">Privacy Policy</a>
              <a href="#" className="hover:text-primary">Terms of Service</a>
            </div>
          </div>
        </div>
        <MadeWithDyad />
      </footer>

      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cartItems}
        onRemove={removeFromCart}
      />
    </div>
  );
};

export default Index;