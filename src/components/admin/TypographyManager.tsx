"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Type, Save } from 'lucide-react';
import { showSuccess } from '@/utils/toast';
import { useFont, FontOption } from '@/context/FontContext';

const TypographyManager = () => {
  const { fontFamily, setFontFamily } = useFont();

  const handleSave = () => {
    showSuccess("Typography settings updated");
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-black tracking-tight">TYPOGRAPHY</h2>
        <p className="text-muted-foreground">Customize the look and feel of your store's text.</p>
      </div>

      <Card className="border-none bg-card shadow-sm rounded-3xl overflow-hidden">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Type className="h-5 w-5 text-primary" />
            <CardTitle>Font Settings</CardTitle>
          </div>
          <CardDescription>Choose the primary font family for your website.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="max-w-md space-y-2">
            <Label htmlFor="font-family">Primary Font Family</Label>
            <Select 
              value={fontFamily} 
              onValueChange={(value) => setFontFamily(value as FontOption)}
            >
              <SelectTrigger className="rounded-xl h-11">
                <SelectValue placeholder="Select font" />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                <SelectItem value="font-sans">Sans Serif (Modern)</SelectItem>
                <SelectItem value="font-serif">Serif (Classic)</SelectItem>
                <SelectItem value="font-mono">Monospace (Technical)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="p-6 rounded-2xl bg-secondary/30 border border-dashed">
            <p className="text-xs font-bold text-muted-foreground mb-2 uppercase tracking-widest">Preview</p>
            <h3 className="text-2xl font-black mb-2">The quick brown fox jumps over the lazy dog.</h3>
            <p className="text-muted-foreground">
              This is how your store's content will look with the selected font. 
              Typography plays a crucial role in your brand's identity.
            </p>
          </div>

          <div className="flex justify-end">
            <Button onClick={handleSave} className="rounded-xl font-bold h-12 px-8 gap-2">
              <Save className="h-5 w-5" /> Save Changes
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TypographyManager;