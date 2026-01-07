'use client';

import { ReactNode, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { UserButton } from '@clerk/nextjs';
import {
    LayoutDashboard,
    Sparkles,
    Calendar,
    Users,
    UserCircle,
    Star,
    BarChart,
    Settings,
    Menu,
    X,
    ChevronLeft,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { ADMIN_NAV_ITEMS, ROUTES } from '@/lib/constants';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    LayoutDashboard,
    Sparkles,
    Calendar,
    Users,
    UserCircle,
    Star,
    BarChart,
    Settings,
};

export default function AdminLayout({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const NavLinks = () => (
        <>
            {ADMIN_NAV_ITEMS.map((item) => {
                const Icon = iconMap[item.icon] || LayoutDashboard;
                const isActive = pathname === item.href ||
                    (item.href !== ROUTES.ADMIN && pathname.startsWith(item.href));

                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                            'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors',
                            isActive
                                ? 'bg-primary text-primary-foreground'
                                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                        )}
                    >
                        <Icon className="h-5 w-5 shrink-0" />
                        <span className={cn(!isSidebarOpen && 'lg:hidden')}>{item.label}</span>
                    </Link>
                );
            })}
        </>
    );

    return (
        <div className="min-h-screen bg-muted/30">
            {/* Desktop Sidebar */}
            <aside
                className={cn(
                    'fixed left-0 top-0 z-40 h-screen bg-card border-r transition-all duration-300 hidden lg:block',
                    isSidebarOpen ? 'w-64' : 'w-20'
                )}
            >
                <div className="flex h-16 items-center justify-between border-b px-4">
                    <Link href={ROUTES.ADMIN} className="flex items-center gap-2">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary shrink-0">
                            <Sparkles className="h-5 w-5 text-primary-foreground" />
                        </div>
                        {isSidebarOpen && (
                            <span className="text-lg font-bold">Admin</span>
                        )}
                    </Link>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="shrink-0"
                    >
                        <ChevronLeft className={cn('h-5 w-5 transition-transform', !isSidebarOpen && 'rotate-180')} />
                    </Button>
                </div>

                <ScrollArea className="h-[calc(100vh-4rem)] py-4 px-3">
                    <nav className="space-y-1">
                        <NavLinks />
                    </nav>
                </ScrollArea>
            </aside>

            {/* Mobile Header */}
            <header className="fixed top-0 left-0 right-0 z-50 h-16 border-b bg-card lg:hidden">
                <div className="flex h-full items-center justify-between px-4">
                    <div className="flex items-center gap-3">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon">
                                    <Menu className="h-5 w-5" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="w-64 p-0">
                                <div className="flex h-16 items-center border-b px-4">
                                    <Link href={ROUTES.ADMIN} className="flex items-center gap-2">
                                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary">
                                            <Sparkles className="h-5 w-5 text-primary-foreground" />
                                        </div>
                                        <span className="text-lg font-bold">Admin</span>
                                    </Link>
                                </div>
                                <ScrollArea className="h-[calc(100vh-4rem)] py-4 px-3">
                                    <nav className="space-y-1">
                                        <NavLinks />
                                    </nav>
                                </ScrollArea>
                            </SheetContent>
                        </Sheet>

                        <Link href={ROUTES.ADMIN} className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
                                <Sparkles className="h-4 w-4 text-primary-foreground" />
                            </div>
                            <span className="font-bold">Admin</span>
                        </Link>
                    </div>

                    <UserButton afterSignOutUrl="/" />
                </div>
            </header>

            {/* Desktop Header Bar */}
            <header
                className={cn(
                    'fixed top-0 right-0 z-40 h-16 border-b bg-card hidden lg:flex items-center justify-between px-6 transition-all duration-300',
                    isSidebarOpen ? 'left-64' : 'left-20'
                )}
            >
                <div>
                    <Link href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                        ← กลับไปหน้าเว็บไซต์
                    </Link>
                </div>
                <UserButton afterSignOutUrl="/" />
            </header>

            {/* Main Content */}
            <main
                className={cn(
                    'pt-16 min-h-screen transition-all duration-300',
                    isSidebarOpen ? 'lg:pl-64' : 'lg:pl-20'
                )}
            >
                <div className="p-6">{children}</div>
            </main>
        </div>
    );
}
