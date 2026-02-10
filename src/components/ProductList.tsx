"use client";

import React from 'react';

const ProductList = () => {
  return (
    <section className="py-16 container px-4 md:px-8">
      <div className="flex flex-col gap-2 mb-10">
        <h2 className="text-4xl font-black tracking-tight">OUR COLLECTION</h2>
        <div className="h-1.5 w-20 bg-primary rounded-full" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Product items will be rendered here */}
        <div className="aspect-[4/5] bg-secondary/20 rounded-3xl animate-pulse flex items-center justify-center">
          <p className="text-muted-foreground font-medium">Loading products...</p>
        </div>
        <div className="aspect-[4/5] bg-secondary/20 rounded-3xl animate-pulse hidden sm:flex items-center justify-center">
          <p className="text-muted-foreground font-medium">Loading products...</p>
        </div>
        <div className="aspect-[4/5] bg-secondary/20 rounded-3xl animate-pulse hidden lg:flex items-center justify-center">
          <p className="text-muted-foreground font-medium">Loading products...</p>
        </div>
      </div>
    </section>
  );
};

export default ProductList;