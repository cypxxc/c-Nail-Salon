'use client';

import { useState } from 'react';
import { Search, MoreHorizontal, Check, X, Clock, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BOOKING_STATUSES } from '@/lib/constants';

// Mock bookings data
const mockBookings = [
    {
        id: '1',
        customer: 'คุณสมศรี ใจดี',
        phone: '081-xxx-xxxx',
        service: 'ทำเล็บเจล',
        staff: 'คุณแนน',
        date: '2026-01-08',
        time: '10:00',
        status: 'pending',
        price: 499,
    },
    {
        id: '2',
        customer: 'คุณวิภา รักสวย',
        phone: '082-xxx-xxxx',
        service: 'เพ้นท์เล็บ',
        staff: 'คุณมิ้นท์',
        date: '2026-01-08',
        time: '11:30',
        status: 'confirmed',
        price: 699,
    },
    {
        id: '3',
        customer: 'คุณนภา สดใส',
        phone: '083-xxx-xxxx',
        service: 'ต่อเล็บ',
        staff: 'คุณเบล',
        date: '2026-01-08',
        time: '13:00',
        status: 'in_progress',
        price: 899,
    },
    {
        id: '4',
        customer: 'คุณรัตนา งามตา',
        phone: '084-xxx-xxxx',
        service: 'สปาเท้า',
        staff: 'คุณมิ้นท์',
        date: '2026-01-07',
        time: '14:30',
        status: 'completed',
        price: 599,
    },
    {
        id: '5',
        customer: 'คุณพิมพ์ พิมลดา',
        phone: '085-xxx-xxxx',
        service: 'ทำเล็บเจล',
        staff: 'คุณแนน',
        date: '2026-01-07',
        time: '16:00',
        status: 'cancelled',
        price: 499,
    },
];

const statusColors: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    confirmed: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    in_progress: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    completed: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    cancelled: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
};

export default function AdminBookingsPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    const filteredBookings = mockBookings.filter((booking) => {
        const matchesSearch = booking.customer.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div>
                <h1 className="text-2xl font-bold">จัดการการจอง</h1>
                <p className="text-muted-foreground">ดูและจัดการการจองทั้งหมด</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {Object.entries(BOOKING_STATUSES).map(([key, value]) => {
                    const count = mockBookings.filter((b) => b.status === key).length;
                    return (
                        <Card key={key} className="cursor-pointer hover:shadow-md transition-shadow">
                            <CardContent className="pt-4 pb-4">
                                <p className="text-2xl font-bold">{count}</p>
                                <p className="text-sm text-muted-foreground">{value.label}</p>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            {/* Search & Filters */}
            <Card>
                <CardContent className="pt-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="ค้นหาชื่อลูกค้า..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                            <SelectTrigger className="w-full sm:w-[180px]">
                                <SelectValue placeholder="สถานะทั้งหมด" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">สถานะทั้งหมด</SelectItem>
                                {Object.entries(BOOKING_STATUSES).map(([key, value]) => (
                                    <SelectItem key={key} value={key}>
                                        {value.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>

            {/* Bookings Table */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">รายการจอง ({filteredBookings.length})</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>ลูกค้า</TableHead>
                                    <TableHead>บริการ</TableHead>
                                    <TableHead>ช่าง</TableHead>
                                    <TableHead>วันที่</TableHead>
                                    <TableHead>เวลา</TableHead>
                                    <TableHead>สถานะ</TableHead>
                                    <TableHead className="text-right">ราคา</TableHead>
                                    <TableHead className="text-right">จัดการ</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredBookings.map((booking) => (
                                    <TableRow key={booking.id}>
                                        <TableCell>
                                            <div>
                                                <p className="font-medium">{booking.customer}</p>
                                                <p className="text-sm text-muted-foreground">{booking.phone}</p>
                                            </div>
                                        </TableCell>
                                        <TableCell>{booking.service}</TableCell>
                                        <TableCell>{booking.staff}</TableCell>
                                        <TableCell>{booking.date}</TableCell>
                                        <TableCell>{booking.time}</TableCell>
                                        <TableCell>
                                            <Badge className={statusColors[booking.status]}>
                                                {BOOKING_STATUSES[booking.status as keyof typeof BOOKING_STATUSES]?.label}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">฿{booking.price.toLocaleString()}</TableCell>
                                        <TableCell className="text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem>
                                                        <Eye className="mr-2 h-4 w-4" />
                                                        ดูรายละเอียด
                                                    </DropdownMenuItem>
                                                    {booking.status === 'pending' && (
                                                        <>
                                                            <DropdownMenuSeparator />
                                                            <DropdownMenuItem className="text-green-600">
                                                                <Check className="mr-2 h-4 w-4" />
                                                                ยืนยันการจอง
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem className="text-destructive">
                                                                <X className="mr-2 h-4 w-4" />
                                                                ยกเลิกการจอง
                                                            </DropdownMenuItem>
                                                        </>
                                                    )}
                                                    {booking.status === 'confirmed' && (
                                                        <>
                                                            <DropdownMenuSeparator />
                                                            <DropdownMenuItem>
                                                                <Clock className="mr-2 h-4 w-4" />
                                                                เลื่อนเวลา
                                                            </DropdownMenuItem>
                                                        </>
                                                    )}
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
