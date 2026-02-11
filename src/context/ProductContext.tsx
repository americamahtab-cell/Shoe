"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Shoe } from '@/data/shoes';
import { supabase } from '@/integrations/supabase/client';

interface ProductContextType {
  products: Shoe[];
  addProduct: (shoe: Omit<Shoe, 'id'>) => Promise<void>;
  updateProduct: (shoe: Shoe) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  isLoading: boolean;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Shoe[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProducts = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching products:', error);
    } else {
      setProducts(data || []);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addProduct = async (shoe: Omit<Shoe, 'id'>) => {
    const { data, error } = await supabase
      .from('products')
      .insert([shoe])
      .select();

    if (error) {
      console.error('Error adding product:', error);
      throw error;
    }
    if (data) {
      setProducts(prev => [data[0], ...prev]);
    }
  };

  const updateProduct = async (updatedShoe: Shoe) => {
    const { error } = await supabase
      .from('products')
      .update(updatedShoe)
      .eq('id', updatedShoe.id);

    if (error) {
      console.error('Error updating product:', error);
      throw error;
    }
    setProducts(prev => prev.map(s => s.id === updatedShoe.id ? updatedShoe : s));
  };

  const deleteProduct = async (id: string) => {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
    setProducts(prev => prev.filter(s => s.id !== id));
  };

  return (
    <ProductContext.Provider value={{ products, addProduct, updateProduct, deleteProduct, isLoading }}>
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