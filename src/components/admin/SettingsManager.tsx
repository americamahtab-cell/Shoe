"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { 
  Store, 
  Bell, 
  Shield, 
  Globe,
  Save
} from 'lucide-react';
import { showSuccess } from '@/utils/toast';

const SettingsManager = () => {
  const handleSave = () => {
    showSuccess("Settings updated successfully");
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
              <Store className="h-5 w-5 text-primary" />
              <CardTitle>Store Information</CardTitle>
            </div>
            <CardDescription>Update your public store details.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="store-name">Store Name</Label>
                <Input id="store-name" defaultValue="SOLESPHERE" className="rounded-xl" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="store-email">Support Email</Label>
                <Input id="store-email" defaultValue="support@solesphere.com" className="rounded-xl" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="store-desc">Store Description</Label>
              <Input id="store-desc" defaultValue="The ultimate destination for sneakerheads." className="rounded-xl" />
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

        <Card className="border-none bg-card shadow-sm rounded-3xl overflow-hidden">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              <CardTitle>Security</CardTitle>
            </div>
            <CardDescription>Manage your account security.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Two-Factor Authentication</Label>
                <p className="text-sm text-muted-foreground">Add an extra layer of security to your account.</p>
              </div>
              <Switch />
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