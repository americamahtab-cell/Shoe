"use client";

import React, { useMemo } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { useProducts } from '@/context/ProductContext';

const categories = ['Lifestyle', 'Running', 'Basketball', 'Training'];

interface FilterSidebarProps {
  selectedCategories: string[];
  setSelectedCategories: (cats: string[]) => void;
  selectedBrands: string[];
  setSelectedBrands: (brands: string[]) => void;
  priceRange: number[];
  setPriceRange: (range: number[]) => void;
}

const FilterSidebar = ({ 
  selectedCategories, 
  setSelectedCategories, 
  selectedBrands, 
  setSelectedBrands,
  priceRange,
  setPriceRange
}: FilterSidebarProps) => {
  const { products } = useProducts();

  const dynamicBrands = useMemo(() => {
    const brandsSet = new Set(products.map(p => p.brand));
    return Array.from(brandsSet).sort();
  }, [products]);

  const toggleCategory = (cat: string) => {
    if (selectedCategories.includes(cat)) {
      setSelectedCategories(selectedCategories.filter(c => c !== cat));
    } else {
      setSelectedCategories([...selectedCategories, cat]);
    }
  };

  const toggleBrand = (brand: string) => {
    if (selectedBrands.includes(brand)) {
      setSelectedBrands(selectedBrands.filter(b => b !== brand));
    } else {
      setSelectedBrands([...selectedBrands, brand]);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h3 className="text-lg font-bold mb-4">Categories</h3>
        <div className="space-y-3">
          {categories.map((cat) => (
            <div key={cat} className="flex items-center space-x-2">
              <Checkbox 
                id={cat} 
                className="rounded-md" 
                checked={selectedCategories.includes(cat)}
                onCheckedChange={() => toggleCategory(cat)}
              />
              <Label htmlFor={cat} className="text-sm font-medium leading-none cursor-pointer">
                {cat}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-bold mb-4">Brands</h3>
        <div className="space-y-3">
          {dynamicBrands.map((brand) => (
            <div key={brand} className="flex items-center space-x-2">
              <Checkbox 
                id={brand} 
                className="rounded-md" 
                checked={selectedBrands.includes(brand)}
                onCheckedChange={() => toggleBrand(brand)}
              />
              <Label htmlFor={brand} className="text-sm font-medium leading-none cursor-pointer">
                {brand}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-bold mb-4">Price Range</h3>
        <Slider 
          value={priceRange} 
          onValueChange={setPriceRange}
          max={1000} 
          step={10} 
          className="mb-4" 
        />
        <div className="flex justify-between text-sm text-muted-foreground font-bold">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;