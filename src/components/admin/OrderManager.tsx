"use client";

import React, { useState, useMemo } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Eye, 
  MoreHorizontal, 
  Download,
  Filter
} from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';

const mockOrders = [
  { id: 'ORD-7281', customer: 'Alex Johnson', date: '2024-03-20', total: 210, status: 'Delivered', items: 1 },
  { id: 'ORD-7282', customer: 'Sarah Williams', date: '2024-03-19', total: 450, status: 'Processing', items: 3 },
  { id: 'ORD-7283', customer: 'Michael Chen', date: '2024-03-19', total: 150, status: 'Shipped', items: 1 },
  { id: 'ORD-7284', customer: 'Emma Davis', date: '2024-03-18', total: 320, status: 'Pending', items: 2 },
  { id: 'ORD-7285', customer: 'James Wilson', date: '2024-03-18', total: 190, status: 'Cancelled', items: 1 },
];

const OrderManager = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredOrders = useMemo(() => {
    return mockOrders.filter(order => 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered': return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
      case 'Processing': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'Shipped': return 'bg-purple-500/10 text-purple-500 border-purple-500/20';
      case 'Pending': return 'bg-orange-500/10 text-orange-500 border-orange-500/20';
      case 'Cancelled': return 'bg-destructive/10 text-destructive border-destructive/20';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black tracking-tight">ORDERS</h2>
          <p className="text-muted-foreground">Track and manage customer purchases.</p>
        </div>
        <Button variant="outline" className="rounded-xl font-bold h-12 px-6 gap-2">
          <Download className="h-5 w-5" /> Export CSV
        </Button>
      </div>

      <div className="flex items-center gap-4 bg-card p-4 rounded-2xl shadow-sm">
        <Search className="h-5 w-5 text-muted-foreground" />
        <Input 
          placeholder="Search by order ID or customer..." 
          className="border-none bg-transparent focus-visible:ring-0 p-0"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button variant="ghost" size="icon" className="rounded-xl">
          <Filter className="h-5 w-5" />
        </Button>
      </div>

      <div className="rounded-3xl border bg-card overflow-hidden shadow-sm">
        <Table>
          <TableHeader className="bg-secondary/50">
            <TableRow>
              <TableHead className="font-bold">Order ID</TableHead>
              <TableHead className="font-bold">Customer</TableHead>
              <TableHead className="font-bold">Date</TableHead>
              <TableHead className="font-bold">Total</TableHead>
              <TableHead className="font-bold">Status</TableHead>
              <TableHead className="text-right font-bold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.map((order) => (
              <TableRow key={order.id} className="hover:bg-secondary/30 transition-colors">
                <TableCell className="font-bold">{order.id}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell className="text-muted-foreground">{order.date}</TableCell>
                <TableCell className="font-black">${order.total}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={getStatusColor(order.status)}>
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="rounded-full">
                        <MoreHorizontal className="h-5 w-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="rounded-xl">
                      <DropdownMenuItem className="gap-2 cursor-pointer">
                        <Eye className="h-4 w-4" /> View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2 cursor-pointer">
                        <Download className="h-4 w-4" /> Invoice
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default OrderManager;