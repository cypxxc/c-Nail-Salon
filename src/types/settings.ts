// Shop Settings Types
export interface ShopSettings {
    name: string;
    address: string;
    phone: string;
    email: string;
    lineId?: string;
    openTime: string;  // "09:00"
    closeTime: string; // "20:00"
    logo?: string;     // Cloudinary URL
    slotDuration: number; // minutes per slot (e.g., 30)
    updatedAt: Date;
}

// Holiday Types
export interface Holiday {
    id: string;
    date: Date;
    title: string;
    description?: string;
    createdAt: Date;
}

// Dashboard Stats
export interface DashboardStats {
    todayBookings: number;
    pendingBookings: number;
    completedToday: number;
    totalRevenue: number;
    totalCustomers: number;
    averageRating: number;
}
