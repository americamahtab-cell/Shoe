"use client";

import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';

const categories = ['Lifestyle', 'Running', 'Basketball', 'Training'];
const brands = ['Nike', 'Adidas', 'Jordan'];

const FilterSidebar = () => {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h3 className="text-lg font-bold mb-4">Categories</h3>
        <div className="space-y-3">
          {categories.map((cat) => (
            <div key={cat} className="flex items-center space-x-2">
              <Checkbox id={cat} className="rounded-md" />
              <Label htmlFor={cat} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {cat}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-bold mb-4">Brands</h3>
        <div className="space-y-3">
          {brands.map((brand) => (
            <div key={brand} className="flex items-center space-x-2">
              <Checkbox id={brand} className="rounded-md" />
              <Label htmlFor={brand} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {brand}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-bold mb-4">Price Range</h3>
        <Slider defaultValue={[0, 300]} max={500} step={10} className="mb-4" />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>$0</span>
          <span>$500</span>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;