// Service Types
export type ServiceCategory = 'manicure' | 'pedicure' | 'nail_art' | 'treatment' | 'extension';

export interface Service {
    id: string;
    name: string;
    description: string;
    price: number;
    duration: number; // in minutes
    category: ServiceCategory;
    images: string[]; // Cloudinary URLs
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface ServiceFormData {
    name: string;
    description: string;
    price: number;
    duration: number;
    category: ServiceCategory;
    images: string[];
    isActive: boolean;
}
