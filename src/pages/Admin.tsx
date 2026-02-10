"use client";

import React, { useState } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminOverview from '@/components/admin/AdminOverview';
import ProductManager from '@/components/admin/ProductManager';
import { ShoppingBag, Users } from 'lucide-react';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const handleLogout = () => {
    // Redirect to home since there's no password anymore
    window.location.href = '/';
  };

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