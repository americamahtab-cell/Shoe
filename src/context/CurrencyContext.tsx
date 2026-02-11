"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export type Currency = {
  code: string;
  symbol: string;
};

export const currencies: Record<string, Currency> = {
  USD: { code: 'USD', symbol: '$' },
  BDT: { code: 'BDT', symbol: '৳' },
  EUR: { code: 'EUR', symbol: '€' },
  GBP: { code: 'GBP', symbol: '£' },
};

interface CurrencyContextType {
  currency: Currency;
  setCurrencyByCode: (code: string) => Promise<void>;
  formatPrice: (price: number) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrency] = useState<Currency>(currencies.USD);

  useEffect(() => {
    const fetchCurrency = async () => {
      const { data, error } = await supabase
        .from('settings')
        .select('value')
        .eq('key', 'currency_code')
        .single();

      if (data && currencies[data.value as string]) {
        setCurrency(currencies[data.value as string]);
      }
    };
    fetchCurrency();
  }, []);

  const setCurrencyByCode = async (code: string) => {
    if (currencies[code]) {
      const { error } = await supabase
        .from('settings')
        .upsert({ key: 'currency_code', value: code });

      if (error) {
        console.error('Error saving currency:', error);
        throw error;
      }
      setCurrency(currencies[code]);
    }
  };

  const formatPrice = (price: number) => {
    return `${currency.symbol}${price.toLocaleString()}`;
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrencyByCode, formatPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};