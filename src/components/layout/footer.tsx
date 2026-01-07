import Link from 'next/link';
import { Sparkles, Phone, Mail, MapPin, Clock } from 'lucide-react';

export function Footer() {
    return (
        <footer className="border-t bg-muted/30">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="space-y-4">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary">
                                <Sparkles className="h-5 w-5 text-primary-foreground" />
                            </div>
                            <span className="text-xl font-bold">Nail Salon</span>
                        </Link>
                        <p className="text-sm text-muted-foreground">
                            บริการทำเล็บมืออาชีพ ดีไซน์สวยทันสมัย
                            การันตีความพึงพอใจ
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-semibold mb-4">ลิงก์ด่วน</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>
                                <Link href="/services" className="hover:text-primary transition-colors">
                                    บริการของเรา
                                </Link>
                            </li>
                            <li>
                                <Link href="/booking" className="hover:text-primary transition-colors">
                                    จองคิวออนไลน์
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="hover:text-primary transition-colors">
                                    เกี่ยวกับเรา
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="font-semibold mb-4">ติดต่อเรา</h3>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li className="flex items-center gap-2">
                                <Phone className="h-4 w-4 text-primary" />
                                <span>02-xxx-xxxx</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Mail className="h-4 w-4 text-primary" />
                                <span>contact@nailsalon.com</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <MapPin className="h-4 w-4 text-primary mt-0.5" />
                                <span>123 ถนนสุขุมวิท แขวงคลองตัน เขตวัฒนา กรุงเทพฯ 10110</span>
                            </li>
                        </ul>
                    </div>

                    {/* Hours */}
                    <div>
                        <h3 className="font-semibold mb-4">เวลาเปิดทำการ</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-primary" />
                                <span>จันทร์ - เสาร์</span>
                            </li>
                            <li className="pl-6">09:00 - 20:00</li>
                            <li className="flex items-center gap-2 mt-2">
                                <Clock className="h-4 w-4 text-primary" />
                                <span>อาทิตย์</span>
                            </li>
                            <li className="pl-6">10:00 - 18:00</li>
                        </ul>
                    </div>
                </div>

                <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
                    <p>© {new Date().getFullYear()} Nail Salon. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
