"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Store, 
  Bell, 
  Globe,
  Save,
  Coins
} from 'lucide-react';
import { showSuccess } from '@/utils/toast';
import { useCurrency, currencies } from '@/context/CurrencyContext';
import { useStore } from '@/context/StoreContext';

const SettingsManager = () => {
  const { currency, setCurrencyByCode } = useCurrency();
  const { storeName, storeEmail, storeDescription, setStoreInfo } = useStore();
  
  const [name, setName] = useState(storeName);
  const [email, setEmail] = useState(storeEmail);
  const [description, setDescription] = useState(storeDescription);

  // Update local state if context changes (e.g. on initial load)
  useEffect(() => {
    setName(storeName);
    setEmail(storeEmail);
    setDescription(storeDescription);
  }, [storeName, storeEmail, storeDescription]);

  const handleSave = () => {
    setStoreInfo({
      name: name,
      email: email,
      description: description
    });
    showSuccess("Store settings updated successfully");
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-black tracking-tight">SETTINGS</h2>
        <p className="text-muted-foreground">Configure your store preferences and security.</p>
      </div>

      <div className="grid gap-8">
        <Card className="border-none bg-card shadow-sm rounded-3xl overflow-hidden">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Coins className="h-5 w-5 text-primary" />
              <CardTitle>Localization & Currency</CardTitle>
            </div>
            <CardDescription>Set your store's default currency and region.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="currency">Store Currency</Label>
                <Select 
                  defaultValue={currency.code} 
                  onValueChange={(value) => setCurrencyByCode(value)}
                >
                  <SelectTrigger className="rounded-xl h-11">
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    {Object.values(currencies).map((c) => (
                      <SelectItem key={c.code} value={c.code}>
                        {c.code} ({c.symbol})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="timezone">Timezone</Label>
                <Select defaultValue="UTC+6">
                  <SelectTrigger className="rounded-xl h-11">
                    <SelectValue placeholder="Select timezone" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="UTC+6">Dhaka (UTC+6)</SelectItem>
                    <SelectItem value="UTC+0">London (UTC+0)</SelectItem>
                    <SelectItem value="UTC-5">New York (UTC-5)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none bg-card shadow-sm rounded-3xl overflow-hidden">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Store className="h-5 w-5 text-primary" />
              <CardTitle>Store Information</CardTitle>
            </div>
            <CardDescription>Update your public store details.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="store-name">Store Name</Label>
                <Input 
                  id="store-name" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)}
                  className="rounded-xl" 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="store-email">Support Email</Label>
                <Input 
                  id="store-email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)}
                  className="rounded-xl" 
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="store-desc">Store Description</Label>
              <Input 
                id="store-desc" 
                value={description} 
                onChange={(e) => setDescription(e.target.value)}
                className="rounded-xl" 
              />
            </div>
          </CardContent>
        </Card>

        <Card className="border-none bg-card shadow-sm rounded-3xl overflow-hidden">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" />
              <CardTitle>Notifications</CardTitle>
            </div>
            <CardDescription>Manage how you receive alerts.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Order Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive email when a new order is placed.</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Inventory Alerts</Label>
                <p className="text-sm text-muted-foreground">Notify when products are low in stock.</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button onClick={handleSave} className="rounded-xl font-bold h-12 px-8 gap-2">
            <Save className="h-5 w-5" /> Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SettingsManager;