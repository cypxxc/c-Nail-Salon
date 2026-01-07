// Staff Types
export interface WorkingHours {
    start: string; // "09:00"
    end: string;   // "18:00"
    isOff: boolean;
}

export interface WeeklySchedule {
    monday: WorkingHours;
    tuesday: WorkingHours;
    wednesday: WorkingHours;
    thursday: WorkingHours;
    friday: WorkingHours;
    saturday: WorkingHours;
    sunday: WorkingHours;
}

export interface Staff {
    id: string;
    userId?: string; // Reference to users collection
    name: string;
    nickname: string;
    phone: string;
    profileImage?: string;
    specialties: string[];
    workingHours: WeeklySchedule;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface StaffFormData {
    name: string;
    nickname: string;
    phone: string;
    profileImage?: string;
    specialties: string[];
    workingHours: WeeklySchedule;
    isActive: boolean;
}

// Default working hours
export const defaultWorkingHours: WorkingHours = {
    start: '09:00',
    end: '18:00',
    isOff: false,
};

export const defaultWeeklySchedule: WeeklySchedule = {
    monday: { ...defaultWorkingHours },
    tuesday: { ...defaultWorkingHours },
    wednesday: { ...defaultWorkingHours },
    thursday: { ...defaultWorkingHours },
    friday: { ...defaultWorkingHours },
    saturday: { ...defaultWorkingHours },
    sunday: { ...defaultWorkingHours, isOff: true },
};
