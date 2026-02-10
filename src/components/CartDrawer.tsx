"use client";

import React from 'react';
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetFooter 
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Shoe } from '@/data/shoes';
import { Trash2, ShoppingBag } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: Shoe[];
  onRemove: (id: string) => void;
}

const CartDrawer = ({ isOpen, onClose, items, onRemove }: CartDrawerProps) => {
  const total = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-md flex flex-col">
        <SheetHeader className="pb-6">
          <SheetTitle className="flex items-center gap-2 text-2xl font-black">
            <ShoppingBag className="h-6 w-6" /> YOUR CART
          </SheetTitle>
        </SheetHeader>
        
        <div className="flex-1 overflow-hidden">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
              <div className="rounded-full bg-secondary p-6">
                <ShoppingBag className="h-12 w-12 text-muted-foreground" />
              </div>
              <p className="text-lg font-medium text-muted-foreground">Your cart is empty</p>
              <Button onClick={onClose} variant="outline" className="rounded-full">
                Start Shopping
              </Button>
            </div>
          ) : (
            <ScrollArea className="h-full pr-4">
              <div className="flex flex-col gap-6">
                {items.map((item, index) => (
                  <div key={`${item.id}-${index}`} className="flex gap-4">
                    <div className="h-24 w-24 shrink-0 overflow-hidden rounded-2xl bg-secondary">
                      <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                    </div>
                    <div className="flex flex-1 flex-col justify-between py-1">
                      <div>
                        <h4 className="font-bold leading-tight">{item.name}</h4>
                        <p className="text-xs text-muted-foreground">{item.category}</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="font-black">${item.price}</p>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-destructive hover:bg-destructive/10"
                          onClick={() => onRemove(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}
        </div>

        {items.length > 0 && (
          <div className="pt-6">
            <Separator className="mb-6" />
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between text-lg font-bold">
                <span>Total</span>
                <span>${total}</span>
              </div>
              <Button className="w-full h-14 rounded-2xl text-base font-bold">
                Checkout Now
              </Button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;