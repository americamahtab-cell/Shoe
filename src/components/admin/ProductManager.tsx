"use client";

import React, { useState, useRef } from 'react';
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
  Edit, 
  Trash2,
  X
} from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Shoe } from '@/data/shoes';
import { useProducts } from '@/context/ProductContext';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { showSuccess } from '@/utils/toast';

const ProductManager = () => {
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  const [searchTerm, setSearchTerm] = useState('');
  const [editingShoe, setEditingShoe] = useState<Partial<Shoe> | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filteredShoes = products.filter(shoe => 
    shoe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    shoe.brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setPreviewImages(prev => [...prev, base64String]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removePreviewImage = (index: number) => {
    setPreviewImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const name = formData.get('name') as string;
    const brand = formData.get('brand') as string;
    const price = Number(formData.get('price'));

    if (editingShoe?.id) {
      updateProduct({ ...editingShoe, name, brand, price, images: previewImages } as Shoe);
      showSuccess("Product updated successfully");
    } else {
      const newShoe: Shoe = {
        id: Math.random().toString(36).substr(2, 9),
        name,
        brand,
        price,
        images: previewImages,
        category: 'Lifestyle',
        color: 'Default'
      };
      addProduct(newShoe);
      showSuccess("New product added");
    }

    setIsDialogOpen(false);
    setEditingShoe(null);
    setPreviewImages([]);
  };

  const openEditDialog = (shoe: Shoe) => {
    setEditingShoe(shoe);
    setPreviewImages(shoe.images || []);
    setIsDialogOpen(true);
  };

  const resetDialog = () => {
    setEditingShoe(null);
    setPreviewImages([]);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black tracking-tight">PRODUCTS</h2>
          <p className="text-muted-foreground">Manage your sneaker inventory and pricing.</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) resetDialog();
        }}>
          <DialogTrigger asChild>
            <Button className="rounded-xl font-bold h-12 px-6" onClick={resetDialog}>
              <Plus className="mr-2 h-5 w-5" /> Add New Product
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] rounded-3xl overflow-hidden p-0 border-none">
            <DialogHeader className="p-6 pb-0">
              <DialogTitle className="text-2xl font-black">
                {editingShoe?.id ? 'EDIT PRODUCT' : 'ADD PRODUCT'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSave} className="p-6 space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Product Images</Label>
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    {previewImages.map((img, index) => (
                      <div key={index} className="relative aspect-square rounded-xl overflow-hidden border bg-secondary/30 group">
                        <img src={img} alt={`Preview ${index}`} className="w-full h-full object-cover" />
                        <Button 
                          type="button"
                          variant="destructive" 
                          size="icon" 
                          className="absolute top-1 right-1 h-6 w-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => removePreviewImage(index)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                    <button 
                      type="button"
                      className="aspect-square rounded-xl border-2 border-dashed border-muted-foreground/25 bg-secondary/30 flex flex-col items-center justify-center hover:border-primary/50 transition-all"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Plus className="h-6 w-6 text-muted-foreground" />
                      <span className="text-[10px] font-bold mt-1">Add Image</span>
                    </button>
                  </div>
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    accept="image/*" 
                    multiple
                    onChange={handleImageUpload}
                  />
                </div>

                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Product Name</Label>
                    <Input 
                      id="name" 
                      name="name"
                      defaultValue={editingShoe?.name} 
                      placeholder="e.g. Air Jordan 1" 
                      className="rounded-xl h-11" 
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="brand">Brand</Label>
                      <Input 
                        id="brand" 
                        name="brand"
                        defaultValue={editingShoe?.brand} 
                        placeholder="Nike" 
                        className="rounded-xl h-11" 
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="price">Price ($)</Label>
                      <Input 
                        id="price" 
                        name="price"
                        type="number" 
                        defaultValue={editingShoe?.price} 
                        placeholder="150" 
                        className="rounded-xl h-11" 
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" className="w-full rounded-xl h-12 font-bold text-base">
                  {editingShoe?.id ? 'Update Product' : 'Create Product'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center gap-4 bg-card p-4 rounded-2xl shadow-sm">
        <Search className="h-5 w-5 text-muted-foreground" />
        <Input 
          placeholder="Search by name or brand..." 
          className="border-none bg-transparent focus-visible:ring-0 p-0"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="rounded-3xl border bg-card overflow-hidden shadow-sm">
        <Table>
          <TableHeader className="bg-secondary/50">
            <TableRow>
              <TableHead className="font-bold">Product</TableHead>
              <TableHead className="font-bold">Category</TableHead>
              <TableHead className="font-bold">Price</TableHead>
              <TableHead className="font-bold">Images</TableHead>
              <TableHead className="text-right font-bold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredShoes.map((shoe) => {
              const hasImages = shoe.images && shoe.images.length > 0;
              const displayImage = hasImages ? shoe.images[0] : '/placeholder.svg';
              
              return (
                <TableRow key={shoe.id} className="hover:bg-secondary/30 transition-colors">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-xl bg-secondary overflow-hidden border shadow-sm">
                        <img src={displayImage} alt={shoe.name} className="h-full w-full object-cover" />
                      </div>
                      <div>
                        <p className="font-bold leading-none">{shoe.name}</p>
                        <p className="text-xs text-muted-foreground mt-1">{shoe.brand}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-semibold">
                      {shoe.category}
                    </span>
                  </TableCell>
                  <TableCell className="font-black">${shoe.price}</TableCell>
                  <TableCell>
                    <span className="text-xs font-bold">{(shoe.images || []).length} photos</span>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="rounded-full">
                          <MoreHorizontal className="h-5 w-5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="rounded-xl">
                        <DropdownMenuItem className="gap-2 cursor-pointer" onClick={() => openEditDialog(shoe)}>
                          <Edit className="h-4 w-4" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="gap-2 cursor-pointer text-destructive focus:text-destructive"
                          onClick={() => deleteProduct(shoe.id)}
                        >
                          <Trash2 className="h-4 w-4" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ProductManager;