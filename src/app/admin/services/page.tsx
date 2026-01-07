'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Plus, Search, MoreHorizontal, Pencil, Trash2, Eye } from 'lucide-react';
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
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SERVICE_CATEGORIES } from '@/lib/constants';

// Mock data
const mockServices = [
    { id: '1', name: 'ทำเล็บเจลธรรมดา', price: 499, duration: 60, category: 'manicure', isActive: true },
    { id: '2', name: 'ทำเล็บเจล + เพ้นท์ลาย', price: 699, duration: 90, category: 'nail_art', isActive: true },
    { id: '3', name: 'ต่อเล็บอะคริลิค', price: 899, duration: 120, category: 'extension', isActive: true },
    { id: '4', name: 'สปาเท้า + ทำเล็บเท้า', price: 599, duration: 90, category: 'pedicure', isActive: true },
    { id: '5', name: 'ทรีทเมนต์บำรุงเล็บ', price: 399, duration: 45, category: 'treatment', isActive: false },
    { id: '6', name: 'ถอดเล็บเจล', price: 199, duration: 30, category: 'treatment', isActive: true },
];

export default function AdminServicesPage() {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredServices = mockServices.filter((service) =>
        service.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold">จัดการบริการ</h1>
                    <p className="text-muted-foreground">เพิ่ม แก้ไข หรือลบบริการทำเล็บ</p>
                </div>
                <Link href="/admin/services/new">
                    <Button className="gradient-primary text-white border-0">
                        <Plus className="mr-2 h-4 w-4" />
                        เพิ่มบริการใหม่
                    </Button>
                </Link>
            </div>

            {/* Search & Filters */}
            <Card>
                <CardContent className="pt-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="ค้นหาบริการ..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Services Table */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">รายการบริการทั้งหมด ({filteredServices.length})</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>ชื่อบริการ</TableHead>
                                    <TableHead>หมวดหมู่</TableHead>
                                    <TableHead className="text-right">ราคา</TableHead>
                                    <TableHead className="text-right">ระยะเวลา</TableHead>
                                    <TableHead>สถานะ</TableHead>
                                    <TableHead className="text-right">จัดการ</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredServices.map((service) => (
                                    <TableRow key={service.id}>
                                        <TableCell className="font-medium">{service.name}</TableCell>
                                        <TableCell>
                                            <Badge variant="secondary">
                                                {SERVICE_CATEGORIES[service.category as keyof typeof SERVICE_CATEGORIES]}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">฿{service.price.toLocaleString()}</TableCell>
                                        <TableCell className="text-right">{service.duration} นาที</TableCell>
                                        <TableCell>
                                            <Badge variant={service.isActive ? 'default' : 'secondary'}>
                                                {service.isActive ? 'เปิดใช้งาน' : 'ปิดใช้งาน'}
                                            </Badge>
                                        </TableCell>
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
                                                    <DropdownMenuItem>
                                                        <Pencil className="mr-2 h-4 w-4" />
                                                        แก้ไข
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="text-destructive">
                                                        <Trash2 className="mr-2 h-4 w-4" />
                                                        ลบ
                                                    </DropdownMenuItem>
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
