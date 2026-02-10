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
  ExternalLink,
  Upload,
  Image as ImageIcon,
  X
} from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { shoes as initialShoes, Shoe } from '@/data/shoes';
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
  const [shoes, setShoes] = useState<Shoe[]>(initialShoes);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingShoe, setEditingShoe] = useState<Partial<Shoe> | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filteredShoes = shoes.filter(shoe => 
    shoe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    shoe.brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: string) => {
    setShoes(shoes.filter(s => s.id !== id));
    showSuccess("Product deleted successfully");
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setPreviewImage(base64String);
        setEditingShoe(prev => ({ ...prev, image: base64String }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const name = formData.get('name') as string;
    const brand = formData.get('brand') as string;
    const price = Number(formData.get('price'));
    const image = previewImage || (formData.get('image') as string);

    if (editingShoe?.id) {
      setShoes(prev => prev.map(s => s.id === editingShoe.id ? { ...s, name, brand, price, image } as Shoe : s));
      showSuccess("Product updated successfully");
    } else {
      const newShoe: Shoe = {
        id: Math.random().toString(36).substr(2, 9),
        name,
        brand,
        price,
        image,
        category: 'Lifestyle',
        color: 'Default'
      };
      setShoes(prev => [newShoe, ...prev]);
      showSuccess("New product added");
    }

    setIsDialogOpen(false);
    setEditingShoe(null);
    setPreviewImage(null);
  };

  const openEditDialog = (shoe: Shoe) => {
    setEditingShoe(shoe);
    setPreviewImage(shoe.image);
    setIsDialogOpen(true);
  };

  const resetDialog = () => {
    setEditingShoe(null);
    setPreviewImage(null);
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
          <DialogContent className="sm:max-w-[500px] rounded-3xl overflow-hidden p-0 border-none">
            <DialogHeader className="p-6 pb-0">
              <DialogTitle className="text-2xl font-black">
                {editingShoe?.id ? 'EDIT PRODUCT' : 'ADD PRODUCT'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSave} className="p-6 space-y-6">
              <div className="space-y-4">
                {/* Image Upload Section */}
                <div className="space-y-2">
                  <Label>Product Image</Label>
                  <div 
                    className="relative group aspect-video rounded-2xl border-2 border-dashed border-muted-foreground/25 bg-secondary/30 flex flex-col items-center justify-center overflow-hidden transition-all hover:border-primary/50 cursor-pointer"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    {previewImage ? (
                      <>
                        <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <p className="text-white font-bold text-sm flex items-center gap-2">
                            <Upload className="h-4 w-4" /> Change Image
                          </p>
                        </div>
                        <Button 
                          type="button"
                          variant="destructive" 
                          size="icon" 
                          className="absolute top-2 right-2 h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={(e) => {
                            e.stopPropagation();
                            setPreviewImage(null);
                          }}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </>
                    ) : (
                      <div className="text-center p-6">
                        <div className="mx-auto w-12 h-12 rounded-full bg-background flex items-center justify-center mb-3 shadow-sm">
                          <ImageIcon className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <p className="text-sm font-bold">Click to upload image</p>
                        <p className="text-xs text-muted-foreground mt-1">PNG, JPG or WebP (Max 2MB)</p>
                      </div>
                    )}
                  </div>
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    accept="image/*" 
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
                  <div className="grid gap-2">
                    <Label htmlFor="image">Or Image URL</Label>
                    <Input 
                      id="image" 
                      name="image"
                      value={previewImage?.startsWith('data:') ? '' : previewImage || ''} 
                      onChange={(e) => setPreviewImage(e.target.value)}
                      placeholder="https://images.unsplash.com/..." 
                      className="rounded-xl h-11" 
                    />
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
              <TableHead className="font-bold">Stock</TableHead>
              <TableHead className="text-right font-bold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredShoes.map((shoe) => (
              <TableRow key={shoe.id} className="hover:bg-secondary/30 transition-colors">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-xl bg-secondary overflow-hidden border shadow-sm">
                      <img src={shoe.image} alt={shoe.name} className="h-full w-full object-cover" />
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
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-emerald-500" />
                    <span className="text-sm font-medium">In Stock</span>
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
                      <DropdownMenuItem className="gap-2 cursor-pointer" onClick={() => openEditDialog(shoe)}>
                        <Edit className="h-4 w-4" /> Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2 cursor-pointer">
                        <ExternalLink className="h-4 w-4" /> View Store
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="gap-2 cursor-pointer text-destructive focus:text-destructive"
                        onClick={() => handleDelete(shoe.id)}
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