import Link from 'next/link';
import { Sparkles, Clock, ArrowRight } from 'lucide-react';
import { Header, Footer } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SERVICE_CATEGORIES } from '@/lib/constants';

// Mock data - จะถูกแทนที่ด้วยข้อมูลจาก Firestore
const mockServices = [
    {
        id: '1',
        name: 'ทำเล็บเจลธรรมดา',
        description: 'ทำเล็บเจลสีพื้น เคลือบเงา ทนทาน ติดนาน 2-3 สัปดาห์',
        price: 499,
        duration: 60,
        category: 'manicure' as const,
        images: [],
        isActive: true,
    },
    {
        id: '2',
        name: 'ทำเล็บเจล + เพ้นท์ลาย',
        description: 'ทำเล็บเจลพร้อมเพ้นท์ลายสวยงาม ออกแบบได้ตามต้องการ',
        price: 699,
        duration: 90,
        category: 'nail_art' as const,
        images: [],
        isActive: true,
    },
    {
        id: '3',
        name: 'ต่อเล็บอะคริลิค',
        description: 'ต่อเล็บอะคริลิค ทนทาน ยาวสวย รูปทรงตามต้องการ',
        price: 899,
        duration: 120,
        category: 'extension' as const,
        images: [],
        isActive: true,
    },
    {
        id: '4',
        name: 'สปาเท้า + ทำเล็บเท้า',
        description: 'สปาเท้าผ่อนคลาย ขัดส้นเท้า พร้อมทำเล็บเท้าสวยงาม',
        price: 599,
        duration: 90,
        category: 'pedicure' as const,
        images: [],
        isActive: true,
    },
    {
        id: '5',
        name: 'ทรีทเมนต์บำรุงเล็บ',
        description: 'บำรุงเล็บเปราะบาง ให้เล็บแข็งแรง สุขภาพดี',
        price: 399,
        duration: 45,
        category: 'treatment' as const,
        images: [],
        isActive: true,
    },
    {
        id: '6',
        name: 'ถอดเล็บเจล',
        description: 'ถอดเล็บเจลอย่างปลอดภัย พร้อมบำรุงเล็บ',
        price: 199,
        duration: 30,
        category: 'treatment' as const,
        images: [],
        isActive: true,
    },
];

export default function ServicesPage() {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-1">
                {/* Hero Section */}
                <section className="gradient-hero py-16">
                    <div className="container mx-auto px-4 text-center">
                        <h1 className="text-3xl md:text-4xl font-bold mb-4">บริการของเรา</h1>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            บริการทำเล็บหลากหลายรูปแบบ ตอบโจทย์ทุกสไตล์
                            ด้วยผลิตภัณฑ์คุณภาพสูงและช่างผู้เชี่ยวชาญ
                        </p>
                    </div>
                </section>

                {/* Services Grid */}
                <section className="py-16">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {mockServices.map((service) => (
                                <Card key={service.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                                    {/* Image Placeholder */}
                                    <div className="aspect-video bg-gradient-to-br from-primary/10 to-accent/10 relative">
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <Sparkles className="h-12 w-12 text-primary/30" />
                                        </div>
                                        <Badge
                                            variant="secondary"
                                            className="absolute top-3 left-3"
                                        >
                                            {SERVICE_CATEGORIES[service.category]}
                                        </Badge>
                                    </div>

                                    <CardContent className="p-5">
                                        <h3 className="font-semibold text-lg mb-2">{service.name}</h3>
                                        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                                            {service.description}
                                        </p>

                                        <div className="flex items-center justify-between">
                                            <span className="text-xl font-bold text-primary">
                                                ฿{service.price.toLocaleString()}
                                            </span>
                                            <div className="flex items-center text-sm text-muted-foreground">
                                                <Clock className="h-4 w-4 mr-1" />
                                                <span>{service.duration} นาที</span>
                                            </div>
                                        </div>
                                    </CardContent>

                                    <CardFooter className="p-5 pt-0">
                                        <Link href={`/booking?service=${service.id}`} className="w-full">
                                            <Button className="w-full gradient-primary text-white border-0">
                                                จองบริการนี้
                                                <ArrowRight className="ml-2 h-4 w-4" />
                                            </Button>
                                        </Link>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-16 bg-muted/30">
                    <div className="container mx-auto px-4 text-center">
                        <div className="max-w-2xl mx-auto space-y-6">
                            <h2 className="text-2xl md:text-3xl font-bold">ไม่แน่ใจว่าจะเลือกบริการไหน?</h2>
                            <p className="text-muted-foreground">
                                ติดต่อเราเพื่อรับคำปรึกษา หรือเข้ามาที่ร้านเพื่อให้ช่างช่วยแนะนำบริการที่เหมาะกับคุณ
                            </p>
                            <Link href="/booking">
                                <Button size="lg" className="gradient-primary text-white border-0">
                                    จองคิวปรึกษา
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
