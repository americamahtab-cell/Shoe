"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

interface StoreContextType {
  storeName: string;
  storeEmail: string;
  storeDescription: string;
  setStoreInfo: (info: { name: string; email: string; description: string }) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [storeName, setStoreName] = useState("SOLESPHERE");
  const [storeEmail, setStoreEmail] = useState("support@solesphere.com");
  const [storeDescription, setStoreDescription] = useState("The ultimate destination for sneakerheads.");

  useEffect(() => {
    const savedStore = localStorage.getItem('solesphere_store_info');
    if (savedStore) {
      try {
        const info = JSON.parse(savedStore);
        setStoreName(info.name || "SOLESPHERE");
        setStoreEmail(info.email || "support@solesphere.com");
        setStoreDescription(info.description || "The ultimate destination for sneakerheads.");
      } catch (e) {
        console.error("Failed to parse store info", e);
      }
    }
  }, []);

  const setStoreInfo = (info: { name: string; email: string; description: string }) => {
    setStoreName(info.name);
    setStoreEmail(info.email);
    setStoreDescription(info.description);
    localStorage.setItem('solesphere_store_info', JSON.stringify(info));
  };

  return (
    <StoreContext.Provider value={{ storeName, storeEmail, storeDescription, setStoreInfo }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error('useStore must be used within a StoreProvider');
  return context;
};