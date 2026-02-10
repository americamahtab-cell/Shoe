"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

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
    // Now it just shows the symbol + the exact price you entered
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