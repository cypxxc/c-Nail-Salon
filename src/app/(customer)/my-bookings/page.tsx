'use client';

import Link from 'next/link';
import { Calendar, Clock, User, MapPin, MoreHorizontal, X, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BOOKING_STATUSES } from '@/lib/constants';

// Mock data
const mockBookings = [
    {
        id: '1',
        service: 'ทำเล็บเจล',
        staff: 'คุณแนน',
        date: '2026-01-10',
        time: '10:00',
        status: 'confirmed',
        price: 499,
    },
    {
        id: '2',
        service: 'เพ้นท์เล็บ',
        staff: 'คุณมิ้นท์',
        date: '2026-01-15',
        time: '14:00',
        status: 'pending',
        price: 699,
    },
];

const pastBookings = [
    {
        id: '3',
        service: 'สปาเท้า',
        staff: 'คุณเบล',
        date: '2026-01-05',
        time: '11:00',
        status: 'completed',
        price: 599,
        hasReview: false,
    },
    {
        id: '4',
        service: 'ทำเล็บเจล',
        staff: 'คุณแนน',
        date: '2026-01-02',
        time: '15:00',
        status: 'completed',
        price: 499,
        hasReview: true,
    },
];

const statusColors: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-800',
    confirmed: 'bg-blue-100 text-blue-800',
    in_progress: 'bg-purple-100 text-purple-800',
    completed: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
};

export default function MyBookingsPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-3xl mx-auto">
                {/* Page Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-2xl font-bold">การจองของฉัน</h1>
                        <p className="text-muted-foreground">ดูและจัดการการจองของคุณ</p>
                    </div>
                    <Link href="/booking">
                        <Button className="gradient-primary text-white border-0">
                            จองคิวใหม่
                        </Button>
                    </Link>
                </div>

                <Tabs defaultValue="upcoming" className="space-y-6">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="upcoming">การจองที่กำลังจะมาถึง</TabsTrigger>
                        <TabsTrigger value="past">ประวัติการจอง</TabsTrigger>
                    </TabsList>

                    {/* Upcoming Bookings */}
                    <TabsContent value="upcoming" className="space-y-4">
                        {mockBookings.length === 0 ? (
                            <Card>
                                <CardContent className="py-12 text-center">
                                    <Calendar className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
                                    <p className="text-muted-foreground">ยังไม่มีการจอง</p>
                                    <Link href="/booking">
                                        <Button className="mt-4 gradient-primary text-white border-0">
                                            จองคิวเลย
                                        </Button>
                                    </Link>
                                </CardContent>
                            </Card>
                        ) : (
                            mockBookings.map((booking) => (
                                <Card key={booking.id} className="hover:shadow-md transition-shadow">
                                    <CardContent className="p-6">
                                        <div className="flex items-start justify-between">
                                            <div className="space-y-3 flex-1">
                                                <div className="flex items-center gap-3">
                                                    <h3 className="font-semibold text-lg">{booking.service}</h3>
                                                    <Badge className={statusColors[booking.status]}>
                                                        {BOOKING_STATUSES[booking.status as keyof typeof BOOKING_STATUSES]?.label}
                                                    </Badge>
                                                </div>

                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-muted-foreground">
                                                    <div className="flex items-center gap-2">
                                                        <Calendar className="h-4 w-4" />
                                                        <span>{booking.date}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Clock className="h-4 w-4" />
                                                        <span>{booking.time} น.</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <User className="h-4 w-4" />
                                                        <span>{booking.staff}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-medium text-foreground">
                                                            ฿{booking.price.toLocaleString()}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

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
                                                    <DropdownMenuItem className="text-destructive">
                                                        <X className="mr-2 h-4 w-4" />
                                                        ยกเลิกการจอง
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))
                        )}
                    </TabsContent>

                    {/* Past Bookings */}
                    <TabsContent value="past" className="space-y-4">
                        {pastBookings.map((booking) => (
                            <Card key={booking.id} className="hover:shadow-md transition-shadow">
                                <CardContent className="p-6">
                                    <div className="flex items-start justify-between">
                                        <div className="space-y-3 flex-1">
                                            <div className="flex items-center gap-3">
                                                <h3 className="font-semibold text-lg">{booking.service}</h3>
                                                <Badge className={statusColors[booking.status]}>
                                                    {BOOKING_STATUSES[booking.status as keyof typeof BOOKING_STATUSES]?.label}
                                                </Badge>
                                            </div>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-muted-foreground">
                                                <div className="flex items-center gap-2">
                                                    <Calendar className="h-4 w-4" />
                                                    <span>{booking.date}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Clock className="h-4 w-4" />
                                                    <span>{booking.time} น.</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <User className="h-4 w-4" />
                                                    <span>{booking.staff}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <span className="font-medium text-foreground">
                                                        ฿{booking.price.toLocaleString()}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {!booking.hasReview && (
                                            <Link href={`/reviews/${booking.id}`}>
                                                <Button variant="outline" size="sm">
                                                    เขียนรีวิว
                                                </Button>
                                            </Link>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
