"use client";

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import Admin from './pages/Admin';
import { CurrencyProvider } from './context/CurrencyContext';
import { StoreProvider } from './context/StoreContext';
import { ProductProvider } from './context/ProductContext';
import ToastProvider from './components/ToastProvider';

function App() {
  return (
    <StoreProvider>
      <CurrencyProvider>
        <ProductProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </Router>
          <ToastProvider />
        </ProductProvider>
      </CurrencyProvider>
    </StoreProvider>
  );
}

export default App;