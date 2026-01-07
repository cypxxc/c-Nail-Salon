// Review Types
export interface Review {
    id: string;
    bookingId: string;
    customerId: string;
    staffId: string;
    serviceId: string;
    rating: number; // 1-5
    comment: string;
    images: string[]; // Cloudinary URLs
    isApproved: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface ReviewFormData {
    bookingId: string;
    rating: number;
    comment: string;
    images: string[];
}

// Review with related data
export interface ReviewWithDetails extends Review {
    customer?: {
        firstName: string;
        lastName: string;
        profileImage?: string;
    };
    staff?: {
        name: string;
        nickname: string;
    };
    service?: {
        name: string;
    };
}
