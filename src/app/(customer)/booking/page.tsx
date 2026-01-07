'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar, Clock, User, Sparkles, ArrowRight, ArrowLeft, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { SERVICE_CATEGORIES, TIME_SLOTS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { addDays, format, isAfter, isBefore, startOfToday } from 'date-fns';
import { th } from 'date-fns/locale';

// Mock data
const mockServices = [
    { id: '1', name: 'ทำเล็บเจลธรรมดา', price: 499, duration: 60, category: 'manicure' as const },
    { id: '2', name: 'ทำเล็บเจล + เพ้นท์ลาย', price: 699, duration: 90, category: 'nail_art' as const },
    { id: '3', name: 'ต่อเล็บอะคริลิค', price: 899, duration: 120, category: 'extension' as const },
    { id: '4', name: 'สปาเท้า + ทำเล็บเท้า', price: 599, duration: 90, category: 'pedicure' as const },
    { id: '5', name: 'ทรีทเมนต์บำรุงเล็บ', price: 399, duration: 45, category: 'treatment' as const },
];

const mockStaff = [
    { id: '1', name: 'คุณแนน', nickname: 'แนน', specialties: ['nail_art', 'extension'] },
    { id: '2', name: 'คุณมิ้นท์', nickname: 'มิ้นท์', specialties: ['manicure', 'pedicure'] },
    { id: '3', name: 'คุณเบล', nickname: 'เบล', specialties: ['nail_art', 'treatment'] },
];

type BookingStep = 'service' | 'datetime' | 'staff' | 'confirm';

export default function BookingPage() {
    const router = useRouter();
    const [step, setStep] = useState<BookingStep>('service');
    const [selectedService, setSelectedService] = useState<string | null>(null);
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [selectedStaff, setSelectedStaff] = useState<string | null>(null);
    const [notes, setNotes] = useState('');

    const service = mockServices.find(s => s.id === selectedService);
    const staff = mockStaff.find(s => s.id === selectedStaff);

    const today = startOfToday();
    const maxDate = addDays(today, 30); // สามารถจองล่วงหน้าได้ 30 วัน

    const steps = [
        { id: 'service', label: 'เลือกบริการ', icon: Sparkles },
        { id: 'datetime', label: 'เลือกวันเวลา', icon: Calendar },
        { id: 'staff', label: 'เลือกช่าง', icon: User },
        { id: 'confirm', label: 'ยืนยัน', icon: Check },
    ];

    const currentStepIndex = steps.findIndex(s => s.id === step);

    const canProceed = () => {
        switch (step) {
            case 'service':
                return selectedService !== null;
            case 'datetime':
                return selectedDate !== undefined && selectedTime !== null;
            case 'staff':
                return selectedStaff !== null;
            default:
                return true;
        }
    };

    const handleNext = () => {
        const stepOrder: BookingStep[] = ['service', 'datetime', 'staff', 'confirm'];
        const currentIndex = stepOrder.indexOf(step);
        if (currentIndex < stepOrder.length - 1) {
            setStep(stepOrder[currentIndex + 1]);
        }
    };

    const handleBack = () => {
        const stepOrder: BookingStep[] = ['service', 'datetime', 'staff', 'confirm'];
        const currentIndex = stepOrder.indexOf(step);
        if (currentIndex > 0) {
            setStep(stepOrder[currentIndex - 1]);
        }
    };

    const handleSubmit = async () => {
        // TODO: Submit booking to Firestore
        alert('จองคิวสำเร็จ! (Mock)');
        router.push('/my-bookings');
    };

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Progress Steps */}
            <div className="mb-8">
                <div className="flex justify-between items-center max-w-2xl mx-auto">
                    {steps.map((s, index) => (
                        <div key={s.id} className="flex items-center">
                            <div
                                className={cn(
                                    'w-10 h-10 rounded-full flex items-center justify-center transition-colors',
                                    index <= currentStepIndex
                                        ? 'bg-primary text-primary-foreground'
                                        : 'bg-muted text-muted-foreground'
                                )}
                            >
                                <s.icon className="h-5 w-5" />
                            </div>
                            {index < steps.length - 1 && (
                                <div
                                    className={cn(
                                        'h-1 w-16 md:w-24 mx-2 transition-colors',
                                        index < currentStepIndex ? 'bg-primary' : 'bg-muted'
                                    )}
                                />
                            )}
                        </div>
                    ))}
                </div>
                <div className="flex justify-between max-w-2xl mx-auto mt-2 text-sm">
                    {steps.map((s, index) => (
                        <span
                            key={s.id}
                            className={cn(
                                'text-center',
                                index <= currentStepIndex ? 'text-primary font-medium' : 'text-muted-foreground'
                            )}
                        >
                            {s.label}
                        </span>
                    ))}
                </div>
            </div>

            {/* Step Content */}
            <div className="max-w-4xl mx-auto">
                {/* Step 1: Select Service */}
                {step === 'service' && (
                    <div className="space-y-6">
                        <div className="text-center mb-8">
                            <h1 className="text-2xl font-bold">เลือกบริการ</h1>
                            <p className="text-muted-foreground">เลือกบริการที่คุณต้องการ</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {mockServices.map((svc) => (
                                <Card
                                    key={svc.id}
                                    className={cn(
                                        'cursor-pointer transition-all hover:shadow-md',
                                        selectedService === svc.id && 'ring-2 ring-primary'
                                    )}
                                    onClick={() => setSelectedService(svc.id)}
                                >
                                    <CardContent className="p-4">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="font-semibold">{svc.name}</h3>
                                                <Badge variant="secondary" className="mt-1">
                                                    {SERVICE_CATEGORIES[svc.category]}
                                                </Badge>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-bold text-primary">฿{svc.price}</p>
                                                <p className="text-sm text-muted-foreground">{svc.duration} นาที</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                )}

                {/* Step 2: Select Date & Time */}
                {step === 'datetime' && (
                    <div className="space-y-6">
                        <div className="text-center mb-8">
                            <h1 className="text-2xl font-bold">เลือกวันและเวลา</h1>
                            <p className="text-muted-foreground">เลือกวันและเวลาที่สะดวก</p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg flex items-center gap-2">
                                        <Calendar className="h-5 w-5 text-primary" />
                                        เลือกวันที่
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CalendarComponent
                                        mode="single"
                                        selected={selectedDate}
                                        onSelect={setSelectedDate}
                                        disabled={(date) =>
                                            isBefore(date, today) || isAfter(date, maxDate)
                                        }
                                        locale={th}
                                        className="rounded-md border"
                                    />
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg flex items-center gap-2">
                                        <Clock className="h-5 w-5 text-primary" />
                                        เลือกเวลา
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                                        {TIME_SLOTS.map((time) => (
                                            <Button
                                                key={time}
                                                variant={selectedTime === time ? 'default' : 'outline'}
                                                size="sm"
                                                onClick={() => setSelectedTime(time)}
                                                className={cn(
                                                    selectedTime === time && 'gradient-primary text-white border-0'
                                                )}
                                            >
                                                {time}
                                            </Button>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                )}

                {/* Step 3: Select Staff */}
                {step === 'staff' && (
                    <div className="space-y-6">
                        <div className="text-center mb-8">
                            <h1 className="text-2xl font-bold">เลือกช่างทำเล็บ</h1>
                            <p className="text-muted-foreground">เลือกช่างที่คุณต้องการ</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {mockStaff.map((st) => (
                                <Card
                                    key={st.id}
                                    className={cn(
                                        'cursor-pointer transition-all hover:shadow-md',
                                        selectedStaff === st.id && 'ring-2 ring-primary'
                                    )}
                                    onClick={() => setSelectedStaff(st.id)}
                                >
                                    <CardContent className="p-6 text-center">
                                        <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4">
                                            <User className="h-10 w-10 text-primary/50" />
                                        </div>
                                        <h3 className="font-semibold">{st.name}</h3>
                                        <div className="flex flex-wrap gap-1 justify-center mt-2">
                                            {st.specialties.map((spec) => (
                                                <Badge key={spec} variant="secondary" className="text-xs">
                                                    {SERVICE_CATEGORIES[spec as keyof typeof SERVICE_CATEGORIES]}
                                                </Badge>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                )}

                {/* Step 4: Confirmation */}
                {step === 'confirm' && (
                    <div className="space-y-6">
                        <div className="text-center mb-8">
                            <h1 className="text-2xl font-bold">ยืนยันการจอง</h1>
                            <p className="text-muted-foreground">ตรวจสอบรายละเอียดการจอง</p>
                        </div>

                        <Card className="max-w-xl mx-auto">
                            <CardContent className="p-6 space-y-4">
                                <div className="flex justify-between items-center pb-4 border-b">
                                    <span className="text-muted-foreground">บริการ</span>
                                    <span className="font-medium">{service?.name}</span>
                                </div>
                                <div className="flex justify-between items-center pb-4 border-b">
                                    <span className="text-muted-foreground">วันที่</span>
                                    <span className="font-medium">
                                        {selectedDate && format(selectedDate, 'EEEE d MMMM yyyy', { locale: th })}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center pb-4 border-b">
                                    <span className="text-muted-foreground">เวลา</span>
                                    <span className="font-medium">{selectedTime} น.</span>
                                </div>
                                <div className="flex justify-between items-center pb-4 border-b">
                                    <span className="text-muted-foreground">ช่างทำเล็บ</span>
                                    <span className="font-medium">{staff?.name}</span>
                                </div>
                                <div className="flex justify-between items-center pb-4 border-b">
                                    <span className="text-muted-foreground">ระยะเวลา</span>
                                    <span className="font-medium">{service?.duration} นาที</span>
                                </div>
                                <div className="flex justify-between items-center text-lg">
                                    <span className="font-semibold">ราคารวม</span>
                                    <span className="font-bold text-primary">฿{service?.price.toLocaleString()}</span>
                                </div>

                                <div className="pt-4">
                                    <Label htmlFor="notes">หมายเหตุ (ถ้ามี)</Label>
                                    <Textarea
                                        id="notes"
                                        placeholder="เช่น ต้องการสีโทนพาสเทล, แพ้สารเคมีบางชนิด"
                                        value={notes}
                                        onChange={(e) => setNotes(e.target.value)}
                                        className="mt-2"
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8 max-w-xl mx-auto">
                    <Button
                        variant="outline"
                        onClick={handleBack}
                        disabled={step === 'service'}
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        ย้อนกลับ
                    </Button>

                    {step === 'confirm' ? (
                        <Button
                            onClick={handleSubmit}
                            className="gradient-primary text-white border-0"
                        >
                            ยืนยันการจอง
                            <Check className="ml-2 h-4 w-4" />
                        </Button>
                    ) : (
                        <Button
                            onClick={handleNext}
                            disabled={!canProceed()}
                            className="gradient-primary text-white border-0"
                        >
                            ถัดไป
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}
