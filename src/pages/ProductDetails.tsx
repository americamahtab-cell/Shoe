"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProducts } from '@/context/ProductContext';
import { useCurrency } from '@/context/CurrencyContext';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ShoppingBag, ArrowLeft, Star, Truck, ShieldCheck, RotateCcw } from 'lucide-react';
import { showSuccess } from '@/utils/toast';
import CartDrawer from '@/components/CartDrawer';
import { Shoe } from '@/data/shoes';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products } = useProducts();
  const { formatPrice } = useCurrency();
  const [product, setProduct] = useState<Shoe | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [cartItems, setCartItems] = useState<Shoe[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const foundProduct = products.find(p => p.id === id);
    if (foundProduct) {
      setProduct(foundProduct);
    }
  }, [id, products]);

  if (!product) return <div className="flex h-screen items-center justify-center">Loading...</div>;

  const addToCart = () => {
    setCartItems(prev => [...prev, product]);
    showSuccess(`${product.name} added to cart!`);
  };

  const removeFromCart = (id: string) => {
    setCartItems(prev => {
      const index = prev.findIndex(item => item.id === id);
      if (index === -1) return prev;
      const newCart = [...prev];
      newCart.splice(index, 1);
      return newCart;
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar 
        cartCount={cartItems.length} 
        onCartClick={() => setIsCartOpen(true)} 
        searchTerm=""
        onSearchChange={() => {}}
      />

      <main className="container px-4 md:px-8 py-12">
        <Button 
          variant="ghost" 
          className="mb-8 gap-2 rounded-full" 
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-4 w-4" /> Back to Shop
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-3xl bg-secondary/30 border">
              <img 
                src={product.images[selectedImage] || '/placeholder.svg'} 
                alt={product.name} 
                className="h-full w-full object-cover transition-all duration-500"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((img, index) => (
                <button 
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${selectedImage === index ? 'border-primary' : 'border-transparent opacity-60 hover:opacity-100'}`}
                >
                  <img src={img} alt={`${product.name} ${index}`} className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col gap-6">
            <div>
              <Badge variant="secondary" className="mb-4 rounded-full px-4 py-1 font-bold uppercase tracking-wider">
                {product.brand}
              </Badge>
              <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-2">{product.name}</h1>
              <div className="flex items-center gap-4">
                <p className="text-3xl font-black text-primary">{formatPrice(product.price)}</p>
                <div className="flex items-center gap-1 text-amber-500">
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <span className="text-sm font-bold text-muted-foreground ml-1">(124 Reviews)</span>
                </div>
              </div>
            </div>

            <p className="text-lg text-muted-foreground leading-relaxed">
              Experience ultimate comfort and style with the {product.name}. Designed for {product.category.toLowerCase()} enthusiasts, this pair features premium materials and cutting-edge technology to keep you moving all day long.
            </p>

            <div className="space-y-4">
              <h3 className="font-bold">Select Size</h3>
              <div className="flex flex-wrap gap-3">
                {['US 7', 'US 8', 'US 9', 'US 10', 'US 11', 'US 12'].map((size) => (
                  <button 
                    key={size}
                    className="h-12 w-20 rounded-xl border-2 font-bold hover:border-primary hover:bg-primary/5 transition-all"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                size="lg" 
                className="flex-1 h-14 rounded-2xl font-bold text-lg gap-2"
                onClick={addToCart}
              >
                <ShoppingBag className="h-5 w-5" /> Add to Cart
              </Button>
              <Button size="lg" variant="outline" className="flex-1 h-14 rounded-2xl font-bold text-lg">
                Buy Now
              </Button>
            </div>

            <Separator className="my-4" />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-secondary p-2">
                  <Truck className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-bold">Free Delivery</p>
                  <p className="text-[10px] text-muted-foreground">Orders over $100</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-secondary p-2">
                  <RotateCcw className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-bold">30 Days Return</p>
                  <p className="text-[10px] text-muted-foreground">Easy exchanges</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-secondary p-2">
                  <ShieldCheck className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-bold">Authentic</p>
                  <p className="text-[10px] text-muted-foreground">100% Original</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cartItems}
        onRemove={removeFromCart}
      />
    </div>
  );
};

export default ProductDetails;