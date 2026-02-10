"use client";

import React, { useState, useEffect } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminOverview from '@/components/admin/AdminOverview';
import ProductManager from '@/components/admin/ProductManager';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Lock, ShieldCheck, ShoppingBag, Users } from 'lucide-react';
import { showError, showSuccess } from '@/utils/toast';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('overview');

  // Simple mock auth check
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsAuthenticated(true);
      showSuccess("Welcome to the Admin Panel");
      localStorage.setItem('isAdmin', 'true');
    } else {
      showError("Invalid admin password");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAdmin');
  };

  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin');
    if (isAdmin === 'true') setIsAuthenticated(true);
  }, []);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-secondary/30 p-4">
        <div className="w-full max-w-md bg-card rounded-[2.5rem] shadow-2xl p-10 border">
          <div className="flex flex-col items-center text-center mb-8">
            <div className="h-16 w-16 bg-primary rounded-3xl flex items-center justify-center mb-6 shadow-xl shadow-primary/20">
              <ShieldCheck className="h-8 w-8 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-black tracking-tight mb-2">ADMIN ACCESS</h1>
            <p className="text-muted-foreground">Please enter your credentials to continue.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input 
                  type="password" 
                  placeholder="Admin Password" 
                  className="pl-12 h-14 rounded-2xl bg-secondary/50 border-none focus-visible:ring-2"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <Button type="submit" className="w-full h-14 rounded-2xl font-black text-lg shadow-lg shadow-primary/20">
              AUTHENTICATE
            </Button>
          </form>
          
          <div className="mt-8 text-center">
            <a href="/" className="text-sm font-bold text-muted-foreground hover:text-primary transition-colors">
              Return to Storefront
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-secondary/10">
      <AdminSidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onLogout={handleLogout} 
      />
      
      <main className="flex-1 p-8 md:p-12 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          {activeTab === 'overview' && <AdminOverview />}
          {activeTab === 'products' && <ProductManager />}
          {activeTab === 'orders' && (
            <div className="flex flex-col items-center justify-center h-[60vh] text-center">
              <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4 opacity-20" />
              <h2 className="text-2xl font-black">ORDERS MANAGEMENT</h2>
              <p className="text-muted-foreground">Order tracking system is coming soon.</p>
            </div>
          )}
          {activeTab === 'customers' && (
            <div className="flex flex-col items-center justify-center h-[60vh] text-center">
              <Users className="h-16 w-16 text-muted-foreground mb-4 opacity-20" />
              <h2 className="text-2xl font-black">CUSTOMER DATABASE</h2>
              <p className="text-muted-foreground">Customer management is coming soon.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Admin;