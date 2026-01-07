// App constants
export const APP_NAME = 'Nail Salon';
export const APP_DESCRIPTION = 'ระบบจองคิวทำเล็บออนไลน์';

// Service categories
export const SERVICE_CATEGORIES = {
    manicure: 'ทำเล็บมือ',
    pedicure: 'ทำเล็บเท้า',
    nail_art: 'เพ้นท์เล็บ',
    treatment: 'ทรีทเมนต์',
    extension: 'ต่อเล็บ',
} as const;

// Booking statuses
export const BOOKING_STATUSES = {
    pending: { label: 'รอยืนยัน', color: 'yellow' },
    confirmed: { label: 'ยืนยันแล้ว', color: 'blue' },
    in_progress: { label: 'กำลังให้บริการ', color: 'purple' },
    completed: { label: 'เสร็จสิ้น', color: 'green' },
    cancelled: { label: 'ยกเลิก', color: 'red' },
} as const;

// Days of the week
export const DAYS_OF_WEEK = {
    monday: 'วันจันทร์',
    tuesday: 'วันอังคาร',
    wednesday: 'วันพุธ',
    thursday: 'วันพฤหัสบดี',
    friday: 'วันศุกร์',
    saturday: 'วันเสาร์',
    sunday: 'วันอาทิตย์',
} as const;

// Time slots (30-minute intervals)
export const TIME_SLOTS = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
    '18:00', '18:30', '19:00', '19:30',
];

// Default shop settings
export const DEFAULT_SHOP_SETTINGS = {
    name: 'Nail Salon',
    address: '',
    phone: '',
    email: '',
    openTime: '09:00',
    closeTime: '20:00',
    slotDuration: 30,
};

// Routes
export const ROUTES = {
    HOME: '/',
    SERVICES: '/services',
    ABOUT: '/about',
    SIGN_IN: '/sign-in',
    SIGN_UP: '/sign-up',

    // Customer routes
    BOOKING: '/booking',
    MY_BOOKINGS: '/my-bookings',
    HISTORY: '/history',
    PROFILE: '/profile',

    // Admin routes
    ADMIN: '/admin',
    ADMIN_SERVICES: '/admin/services',
    ADMIN_BOOKINGS: '/admin/bookings',
    ADMIN_STAFF: '/admin/staff',
    ADMIN_CUSTOMERS: '/admin/customers',
    ADMIN_REVIEWS: '/admin/reviews',
    ADMIN_REPORTS: '/admin/reports',
    ADMIN_SETTINGS: '/admin/settings',

    // Staff routes
    STAFF: '/staff',
    STAFF_SCHEDULE: '/staff/schedule',
} as const;

// Navigation items
export const NAV_ITEMS = [
    { label: 'หน้าแรก', href: ROUTES.HOME },
    { label: 'บริการ', href: ROUTES.SERVICES },
    { label: 'เกี่ยวกับเรา', href: ROUTES.ABOUT },
];

export const CUSTOMER_NAV_ITEMS = [
    { label: 'จองคิว', href: ROUTES.BOOKING },
    { label: 'การจองของฉัน', href: ROUTES.MY_BOOKINGS },
    { label: 'ประวัติ', href: ROUTES.HISTORY },
];

export const ADMIN_NAV_ITEMS = [
    { label: 'Dashboard', href: ROUTES.ADMIN, icon: 'LayoutDashboard' },
    { label: 'บริการ', href: ROUTES.ADMIN_SERVICES, icon: 'Sparkles' },
    { label: 'การจอง', href: ROUTES.ADMIN_BOOKINGS, icon: 'Calendar' },
    { label: 'พนักงาน', href: ROUTES.ADMIN_STAFF, icon: 'Users' },
    { label: 'ลูกค้า', href: ROUTES.ADMIN_CUSTOMERS, icon: 'UserCircle' },
    { label: 'รีวิว', href: ROUTES.ADMIN_REVIEWS, icon: 'Star' },
    { label: 'รายงาน', href: ROUTES.ADMIN_REPORTS, icon: 'BarChart' },
    { label: 'ตั้งค่า', href: ROUTES.ADMIN_SETTINGS, icon: 'Settings' },
];
