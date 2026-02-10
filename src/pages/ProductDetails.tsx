"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useProducts, Product } from '@/context/ProductContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const ProductDetails = () => {
  const { id } = useParams();
  const { products } = useProducts();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const foundProduct = products.find(p => p.id === id);
    if (foundProduct) {
      setProduct(foundProduct);
    }
  }, [id, products]);

  if (!product) return <div className="p-20 text-center">Product not found</div>;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar cartCount={0} onCartClick={() => {}} searchTerm="" onSearchChange={() => {}} />
      <main className="flex-1 container py-12 px-4">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="rounded-3xl overflow-hidden bg-secondary/20">
            <img src={product.image} alt={product.name} className="w-full h-auto" />
          </div>
          <div className="space-y-6">
            <p className="text-primary font-bold uppercase tracking-widest">{product.brand}</p>
            <h1 className="text-4xl font-black">{product.name}</h1>
            <p className="text-2xl font-bold text-primary">${product.price}</p>
            <p className="text-muted-foreground">{product.description}</p>
            <div className="pt-6">
              <p className="font-bold mb-2">Color: {product.color}</p>
              <p className="text-sm text-muted-foreground">Stock: {product.stock} units available</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetails;