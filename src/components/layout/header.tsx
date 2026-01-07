'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { Menu, X, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { NAV_ITEMS, ROUTES } from '@/lib/constants';
import { cn } from '@/lib/utils';

export function Header() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-lg">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary">
                        <Sparkles className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <span className="text-xl font-bold bg-gradient-to-r from-primary to-pink-500 bg-clip-text text-transparent">
                        Nail Salon
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-6">
                    {NAV_ITEMS.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                'text-sm font-medium transition-colors hover:text-primary',
                                pathname === item.href
                                    ? 'text-primary'
                                    : 'text-muted-foreground'
                            )}
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>

                {/* Auth Buttons */}
                <div className="hidden md:flex items-center gap-4">
                    <SignedOut>
                        <Link href={ROUTES.SIGN_IN}>
                            <Button variant="ghost" size="sm">
                                เข้าสู่ระบบ
                            </Button>
                        </Link>
                        <Link href={ROUTES.SIGN_UP}>
                            <Button size="sm" className="gradient-primary text-white border-0">
                                สมัครสมาชิก
                            </Button>
                        </Link>
                    </SignedOut>
                    <SignedIn>
                        <Link href={ROUTES.BOOKING}>
                            <Button size="sm" className="gradient-primary text-white border-0">
                                จองคิว
                            </Button>
                        </Link>
                        <UserButton
                            afterSignOutUrl="/"
                            appearance={{
                                elements: {
                                    avatarBox: 'h-9 w-9',
                                },
                            }}
                        />
                    </SignedIn>
                </div>

                {/* Mobile Menu */}
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild className="md:hidden">
                        <Button variant="ghost" size="icon">
                            <Menu className="h-5 w-5" />
                            <span className="sr-only">Toggle menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="w-[280px] sm:w-[320px]">
                        <nav className="flex flex-col gap-4 mt-8">
                            {NAV_ITEMS.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setIsOpen(false)}
                                    className={cn(
                                        'text-lg font-medium py-2 transition-colors hover:text-primary',
                                        pathname === item.href
                                            ? 'text-primary'
                                            : 'text-muted-foreground'
                                    )}
                                >
                                    {item.label}
                                </Link>
                            ))}

                            <div className="border-t pt-4 mt-4 space-y-3">
                                <SignedOut>
                                    <Link href={ROUTES.SIGN_IN} onClick={() => setIsOpen(false)}>
                                        <Button variant="outline" className="w-full">
                                            เข้าสู่ระบบ
                                        </Button>
                                    </Link>
                                    <Link href={ROUTES.SIGN_UP} onClick={() => setIsOpen(false)}>
                                        <Button className="w-full gradient-primary text-white border-0">
                                            สมัครสมาชิก
                                        </Button>
                                    </Link>
                                </SignedOut>
                                <SignedIn>
                                    <Link href={ROUTES.BOOKING} onClick={() => setIsOpen(false)}>
                                        <Button className="w-full gradient-primary text-white border-0">
                                            จองคิว
                                        </Button>
                                    </Link>
                                    <Link href={ROUTES.MY_BOOKINGS} onClick={() => setIsOpen(false)}>
                                        <Button variant="outline" className="w-full">
                                            การจองของฉัน
                                        </Button>
                                    </Link>
                                </SignedIn>
                            </div>
                        </nav>
                    </SheetContent>
                </Sheet>
            </div>
        </header>
    );
}
