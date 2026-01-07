import { Calendar, Users, DollarSign, Clock, TrendingUp, Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Mock data for dashboard
const stats = [
    {
        title: 'การจองวันนี้',
        value: '12',
        change: '+2 จากเมื่อวาน',
        icon: Calendar,
        trend: 'up',
    },
    {
        title: 'รอยืนยัน',
        value: '5',
        change: 'ต้องดำเนินการ',
        icon: Clock,
        trend: 'neutral',
    },
    {
        title: 'รายได้เดือนนี้',
        value: '฿45,600',
        change: '+15% จากเดือนที่แล้ว',
        icon: DollarSign,
        trend: 'up',
    },
    {
        title: 'ลูกค้าทั้งหมด',
        value: '234',
        change: '+12 คนใหม่เดือนนี้',
        icon: Users,
        trend: 'up',
    },
];

const recentBookings = [
    { id: '1', customer: 'คุณสมศรี', service: 'ทำเล็บเจล', time: '10:00', status: 'confirmed' },
    { id: '2', customer: 'คุณวิภา', service: 'เพ้นท์เล็บ', time: '11:30', status: 'pending' },
    { id: '3', customer: 'คุณนภา', service: 'ต่อเล็บ', time: '13:00', status: 'confirmed' },
    { id: '4', customer: 'คุณรัตนา', service: 'สปาเท้า', time: '14:30', status: 'in_progress' },
    { id: '5', customer: 'คุณพิมพ์', service: 'ทำเล็บเจล', time: '16:00', status: 'pending' },
];

const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    confirmed: 'bg-blue-100 text-blue-800',
    in_progress: 'bg-purple-100 text-purple-800',
    completed: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
};

const statusLabels = {
    pending: 'รอยืนยัน',
    confirmed: 'ยืนยันแล้ว',
    in_progress: 'กำลังให้บริการ',
    completed: 'เสร็จสิ้น',
    cancelled: 'ยกเลิก',
};

export default function AdminDashboard() {
    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div>
                <h1 className="text-2xl font-bold">Dashboard</h1>
                <p className="text-muted-foreground">ภาพรวมร้านทำเล็บของคุณ</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                    <Card key={index}>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                                    <p className="text-2xl font-bold mt-1">{stat.value}</p>
                                    <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                                        {stat.trend === 'up' && <TrendingUp className="h-3 w-3 text-green-500" />}
                                        {stat.change}
                                    </p>
                                </div>
                                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                                    <stat.icon className="h-6 w-6 text-primary" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Recent Bookings & Quick Stats */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Bookings */}
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle className="text-lg">การจองวันนี้</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {recentBookings.map((booking) => (
                                <div
                                    key={booking.id}
                                    className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                                            <span className="text-sm font-medium text-primary">
                                                {booking.time}
                                            </span>
                                        </div>
                                        <div>
                                            <p className="font-medium">{booking.customer}</p>
                                            <p className="text-sm text-muted-foreground">{booking.service}</p>
                                        </div>
                                    </div>
                                    <span
                                        className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[booking.status as keyof typeof statusColors]
                                            }`}
                                    >
                                        {statusLabels[booking.status as keyof typeof statusLabels]}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Quick Stats */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">สถิติด่วน</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                            <div className="flex items-center gap-3">
                                <Star className="h-5 w-5 text-yellow-500" />
                                <span>คะแนนรีวิวเฉลี่ย</span>
                            </div>
                            <span className="font-bold">4.8</span>
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                            <div className="flex items-center gap-3">
                                <Users className="h-5 w-5 text-blue-500" />
                                <span>พนักงานทั้งหมด</span>
                            </div>
                            <span className="font-bold">5</span>
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                            <div className="flex items-center gap-3">
                                <Calendar className="h-5 w-5 text-green-500" />
                                <span>การจองเดือนนี้</span>
                            </div>
                            <span className="font-bold">89</span>
                        </div>

                        {/* Popular Services */}
                        <div className="pt-4 border-t">
                            <p className="text-sm font-medium mb-3">บริการยอดนิยม</p>
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">ทำเล็บเจล</span>
                                    <span>45%</span>
                                </div>
                                <div className="w-full bg-muted rounded-full h-2">
                                    <div className="bg-primary h-2 rounded-full" style={{ width: '45%' }} />
                                </div>

                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">เพ้นท์เล็บ</span>
                                    <span>30%</span>
                                </div>
                                <div className="w-full bg-muted rounded-full h-2">
                                    <div className="bg-primary/70 h-2 rounded-full" style={{ width: '30%' }} />
                                </div>

                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">ต่อเล็บ</span>
                                    <span>25%</span>
                                </div>
                                <div className="w-full bg-muted rounded-full h-2">
                                    <div className="bg-primary/50 h-2 rounded-full" style={{ width: '25%' }} />
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
