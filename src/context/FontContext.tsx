"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export type FontOption = 'font-sans' | 'font-serif' | 'font-mono';

interface FontContextType {
  fontFamily: FontOption;
  setFontFamily: (font: FontOption) => Promise<void>;
}

const FontContext = createContext<FontContextType | undefined>(undefined);

export const FontProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [fontFamily, setFontFamilyState] = useState<FontOption>('font-sans');

  useEffect(() => {
    const fetchFont = async () => {
      const { data, error } = await supabase
        .from('settings')
        .select('value')
        .eq('key', 'font_family')
        .single();

      if (data) {
        setFontFamilyState(data.value as FontOption);
      }
    };
    fetchFont();
  }, []);

  const setFontFamily = async (font: FontOption) => {
    const { error } = await supabase
      .from('settings')
      .upsert({ key: 'font_family', value: font });

    if (error) {
      console.error('Error saving font:', error);
      throw error;
    }
    setFontFamilyState(font);
  };

  return (
    <FontContext.Provider value={{ fontFamily, setFontFamily }}>
      <div className={fontFamily}>
        {children}
      </div>
    </FontContext.Provider>
  );
};

export const useFont = () => {
  const context = useContext(FontContext);
  if (!context) throw new Error('useFont must be used within a FontProvider');
  return context;
};