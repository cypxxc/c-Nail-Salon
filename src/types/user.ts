// User/Customer Types
export type UserRole = 'customer' | 'admin' | 'staff';

export interface User {
  id: string;
  clerkId: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  profileImage?: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserMetadata {
  role: UserRole;
  staffId?: string;
}
