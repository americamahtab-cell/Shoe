"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  TrendingUp, 
  ShoppingBag, 
  Users, 
  DollarSign,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

const AdminOverview = () => {
  const stats = [
    { 
      label: 'Total Revenue', 
      value: '$45,231.89', 
      change: '+20.1%', 
      trend: 'up', 
      icon: DollarSign,
      color: 'text-emerald-500'
    },
    { 
      label: 'Orders', 
      value: '+2,350', 
      change: '+180.1%', 
      trend: 'up', 
      icon: ShoppingBag,
      color: 'text-blue-500'
    },
    { 
      label: 'Active Users', 
      value: '+12,234', 
      change: '+19%', 
      trend: 'up', 
      icon: Users,
      color: 'text-purple-500'
    },
    { 
      label: 'Conversion Rate', 
      value: '3.2%', 
      change: '-4.1%', 
      trend: 'down', 
      icon: TrendingUp,
      color: 'text-orange-500'
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-black tracking-tight">DASHBOARD</h2>
        <p className="text-muted-foreground">Welcome back, here's what's happening today.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="border-none bg-card shadow-sm rounded-3xl overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-bold text-muted-foreground uppercase tracking-wider">
                {stat.label}
              </CardTitle>
              <div className={cn("rounded-full p-2 bg-secondary", stat.color)}>
                <stat.icon className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-black">{stat.value}</div>
              <div className="flex items-center gap-1 mt-1">
                {stat.trend === 'up' ? (
                  <ArrowUpRight className="h-3 w-3 text-emerald-500" />
                ) : (
                  <ArrowDownRight className="h-3 w-3 text-destructive" />
                )}
                <span className={cn(
                  "text-xs font-bold",
                  stat.trend === 'up' ? "text-emerald-500" : "text-destructive"
                )}>
                  {stat.change}
                </span>
                <span className="text-xs text-muted-foreground ml-1">from last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-none bg-card shadow-sm rounded-3xl p-6">
          <h3 className="font-bold mb-4">Recent Sales</h3>
          <div className="space-y-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-secondary" />
                  <div>
                    <p className="text-sm font-bold">Customer Name</p>
                    <p className="text-xs text-muted-foreground">customer@example.com</p>
                  </div>
                </div>
                <p className="text-sm font-black">+$250.00</p>
              </div>
            ))}
          </div>
        </Card>
        <Card className="border-none bg-card shadow-sm rounded-3xl p-6">
          <h3 className="font-bold mb-4">Top Products</h3>
          <div className="space-y-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-secondary" />
                  <div>
                    <p className="text-sm font-bold">Air Max Pulse</p>
                    <p className="text-xs text-muted-foreground">124 sales this week</p>
                  </div>
                </div>
                <p className="text-sm font-black">$150.00</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

import { cn } from '@/lib/utils';
export default AdminOverview;