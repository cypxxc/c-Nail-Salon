// Booking Types
export type BookingStatus =
    | 'pending'      // รอยืนยัน
    | 'confirmed'    // ยืนยันแล้ว
    | 'in_progress'  // กำลังให้บริการ
    | 'completed'    // เสร็จสิ้น
    | 'cancelled';   // ยกเลิก

export interface Booking {
    id: string;
    customerId: string;
    staffId: string;
    serviceId: string;
    bookingDate: Date;
    startTime: string; // "10:00"
    endTime: string;   // "11:30"
    status: BookingStatus;
    totalPrice: number;
    notes?: string;
    cancelReason?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface BookingFormData {
    serviceId: string;
    staffId: string;
    bookingDate: Date;
    startTime: string;
    notes?: string;
}

// Extended booking with related data
export interface BookingWithDetails extends Booking {
    customer?: {
        firstName: string;
        lastName: string;
        email: string;
        phone?: string;
    };
    staff?: {
        name: string;
        nickname: string;
        profileImage?: string;
    };
    service?: {
        name: string;
        price: number;
        duration: number;
    };
}

// Time slot for booking
export interface TimeSlot {
    time: string;      // "10:00"
    available: boolean;
    staffId?: string;
}
