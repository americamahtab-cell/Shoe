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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Search, 
  Mail, 
  MoreHorizontal, 
  UserPlus,
  MessageSquare
} from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';

const mockCustomers = [
  { id: 1, name: 'Alex Johnson', email: 'alex.j@example.com', orders: 12, spent: 2450, joined: 'Jan 2024' },
  { id: 2, name: 'Sarah Williams', email: 'sarah.w@example.com', orders: 8, spent: 1820, joined: 'Feb 2024' },
  { id: 3, name: 'Michael Chen', email: 'm.chen@example.com', orders: 5, spent: 950, joined: 'Mar 2024' },
  { id: 4, name: 'Emma Davis', email: 'emma.d@example.com', orders: 15, spent: 3100, joined: 'Dec 2023' },
  { id: 5, name: 'James Wilson', email: 'j.wilson@example.com', orders: 3, spent: 420, joined: 'Mar 2024' },
];

const CustomerManager = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCustomers = useMemo(() => {
    return mockCustomers.filter(customer => 
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black tracking-tight">CUSTOMERS</h2>
          <p className="text-muted-foreground">Manage your user base and relationships.</p>
        </div>
        <Button className="rounded-xl font-bold h-12 px-6 gap-2">
          <UserPlus className="h-5 w-5" /> Add Customer
        </Button>
      </div>

      <div className="flex items-center gap-4 bg-card p-4 rounded-2xl shadow-sm">
        <Search className="h-5 w-5 text-muted-foreground" />
        <Input 
          placeholder="Search by name or email..." 
          className="border-none bg-transparent focus-visible:ring-0 p-0"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="rounded-3xl border bg-card overflow-hidden shadow-sm">
        <Table>
          <TableHeader className="bg-secondary/50">
            <TableRow>
              <TableHead className="font-bold">Customer</TableHead>
              <TableHead className="font-bold">Orders</TableHead>
              <TableHead className="font-bold">Total Spent</TableHead>
              <TableHead className="font-bold">Joined</TableHead>
              <TableHead className="text-right font-bold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCustomers.map((customer) => (
              <TableRow key={customer.id} className="hover:bg-secondary/30 transition-colors">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 border-2 border-background shadow-sm">
                      <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${customer.name}`} />
                      <AvatarFallback>{customer.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-bold leading-none">{customer.name}</p>
                      <p className="text-xs text-muted-foreground mt-1">{customer.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="font-medium">{customer.orders} orders</TableCell>
                <TableCell className="font-black">${customer.spent}</TableCell>
                <TableCell className="text-muted-foreground">{customer.joined}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="rounded-full">
                        <MoreHorizontal className="h-5 w-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="rounded-xl">
                      <DropdownMenuItem className="gap-2 cursor-pointer">
                        <Mail className="h-4 w-4" /> Send Email
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2 cursor-pointer">
                        <MessageSquare className="h-4 w-4" /> Message
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

export default CustomerManager;