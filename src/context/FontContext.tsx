"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

export type FontOption = 'font-sans' | 'font-serif' | 'font-mono';

interface FontContextType {
  fontFamily: FontOption;
  setFontFamily: (font: FontOption) => void;
}

const FontContext = createContext<FontContextType | undefined>(undefined);

export const FontProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [fontFamily, setFontFamily] = useState<FontOption>('font-sans');

  useEffect(() => {
    const savedFont = localStorage.getItem('solesphere_font');
    if (savedFont) {
      setFontFamily(savedFont as FontOption);
    }
  }, []);

  const updateFont = (font: FontOption) => {
    setFontFamily(font);
    localStorage.setItem('solesphere_font', font);
  };

  return (
    <FontContext.Provider value={{ fontFamily, setFontFamily: updateFont }}>
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