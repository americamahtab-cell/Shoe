"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Currency = {
  code: string;
  symbol: string;
  rate: number; // Rate relative to USD
};

export const currencies: Record<string, Currency> = {
  USD: { code: 'USD', symbol: '$', rate: 1 },
  BDT: { code: 'BDT', symbol: '৳', rate: 110 },
  EUR: { code: 'EUR', symbol: '€', rate: 0.92 },
  GBP: { code: 'GBP', symbol: '£', rate: 0.79 },
};

interface CurrencyContextType {
  currency: Currency;
  setCurrencyByCode: (code: string) => void;
  formatPrice: (price: number) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrency] = useState<Currency>(currencies.USD);

  useEffect(() => {
    const savedCurrency = localStorage.getItem('solesphere_currency');
    if (savedCurrency && currencies[savedCurrency]) {
      setCurrency(currencies[savedCurrency]);
    }
  }, []);

  const setCurrencyByCode = (code: string) => {
    if (currencies[code]) {
      setCurrency(currencies[code]);
      localStorage.setItem('solesphere_currency', code);
    }
  };

  const formatPrice = (price: number) => {
    const convertedPrice = (price * currency.rate).toFixed(2);
    return `${currency.symbol}${convertedPrice}`;
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