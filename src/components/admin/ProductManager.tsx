"use client";

import React, { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Plus, 
  Search, 
  MoreHorizontal, 
  Edit2, 
  Trash2,
  Package
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useProducts } from '@/context/ProductContext';
import { useCurrency } from '@/context/CurrencyContext';
import { showSuccess } from '@/utils/toast';

const ProductManager = () => {
  const { products, deleteProduct } = useProducts();
  const { formatPrice } = useCurrency();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: string) => {
    deleteProduct(id);
    showSuccess("Product deleted successfully");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black tracking-tight">PRODUCTS</h2>
          <p className="text-muted-foreground">Manage your inventory and product details.</p>
        </div>
        <Button className="rounded-xl font-bold h-11 gap-2">
          <Plus className="h-5 w-5" /> Add Product
        </Button>
      </div>

      <div className="flex items-center gap-4 bg-card p-4 rounded-2xl border border-border/50">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search products..." 
            className="pl-10 rounded-xl border-none bg-secondary/50 focus-visible:ring-primary/20"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-card rounded-3xl border border-border/50 overflow-hidden">
        <Table>
          <TableHeader className="bg-secondary/30">
            <TableRow className="hover:bg-transparent border-border/50">
              <TableHead className="font-bold">Product</TableHead>
              <TableHead className="font-bold">Category</TableHead>
              <TableHead className="font-bold">Price</TableHead>
              <TableHead className="font-bold">Stock</TableHead>
              <TableHead className="text-right font-bold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.map((product) => (
              <TableRow key={product.id} className="hover:bg-secondary/10 border-border/50">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-xl bg-secondary/50 overflow-hidden">
                      <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                    </div>
                    <span className="font-bold">{product.name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                    {product.category}
                  </span>
                </TableCell>
                <TableCell className="font-medium">{formatPrice(product.price)}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Package className="h-4 w-4 text-muted-foreground" />
                    <span className={product.stock < 10 ? "text-destructive font-bold" : ""}>
                      {product.stock} in stock
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="rounded-full">
                        <MoreHorizontal className="h-5 w-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="rounded-xl">
                      <DropdownMenuItem className="gap-2 cursor-pointer">
                        <Edit2 className="h-4 w-4" /> Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="gap-2 text-destructive cursor-pointer"
                        onClick={() => handleDelete(product.id)}
                      >
                        <Trash2 className="h-4 w-4" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ProductManager;