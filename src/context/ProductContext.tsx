"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { shoes as initialShoes, Shoe } from '@/data/shoes';

interface ProductContextType {
  products: Shoe[];
  addProduct: (shoe: Shoe) => void;
  updateProduct: (shoe: Shoe) => void;
  deleteProduct: (id: string) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Shoe[]>([]);

  useEffect(() => {
    const savedProducts = localStorage.getItem('solesphere_products');
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    } else {
      setProducts(initialShoes);
    }
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      localStorage.setItem('solesphere_products', JSON.stringify(products));
    }
  }, [products]);

  const addProduct = (shoe: Shoe) => {
    setProducts((prev) => [shoe, ...prev]);
  };

  const updateProduct = (updatedShoe: Shoe) => {
    setProducts((prev) => prev.map(s => s.id === updatedShoe.id ? updatedShoe : s));
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter(s => s.id !== id));
  };

  return (
    <ProductContext.Provider value={{ products, addProduct, updateProduct, deleteProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};