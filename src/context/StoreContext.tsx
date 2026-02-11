"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface StoreInfo {
  name: string;
  email: string;
  description: string;
}

interface StoreContextType {
  storeName: string;
  storeEmail: string;
  storeDescription: string;
  setStoreInfo: (info: StoreInfo) => Promise<void>;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [info, setInfo] = useState<StoreInfo>({
    name: "SOLESPHERE",
    email: "support@solesphere.com",
    description: "The ultimate destination for sneakerheads."
  });

  useEffect(() => {
    const fetchStoreInfo = async () => {
      const { data, error } = await supabase
        .from('settings')
        .select('value')
        .eq('key', 'store_info')
        .single();

      if (data) {
        setInfo(data.value as StoreInfo);
      }
    };
    fetchStoreInfo();
  }, []);

  const setStoreInfo = async (newInfo: StoreInfo) => {
    const { error } = await supabase
      .from('settings')
      .upsert({ key: 'store_info', value: newInfo });

    if (error) {
      console.error('Error saving store info:', error);
      throw error;
    }
    setInfo(newInfo);
  };

  return (
    <StoreContext.Provider value={{ 
      storeName: info.name, 
      storeEmail: info.email, 
      storeDescription: info.description, 
      setStoreInfo 
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error('useStore must be used within a StoreProvider');
  return context;
};