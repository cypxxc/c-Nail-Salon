import Link from 'next/link';
import { Sparkles, Calendar, Clock, Star, Users, Shield, ArrowRight } from 'lucide-react';
import { Header, Footer } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const features = [
  {
    icon: Calendar,
    title: 'จองคิวง่ายๆ',
    description: 'เลือกวันเวลาที่สะดวก จองคิวออนไลน์ได้ตลอด 24 ชั่วโมง',
  },
  {
    icon: Users,
    title: 'เลือกช่างได้',
    description: 'เลือกช่างทำเล็บที่คุณชื่นชอบ ดูผลงานและรีวิวก่อนจอง',
  },
  {
    icon: Clock,
    title: 'ไม่ต้องรอคิว',
    description: 'มาถึงร้านตามเวลานัด ไม่ต้องเสียเวลารอคิว',
  },
  {
    icon: Star,
    title: 'บริการระดับพรีเมียม',
    description: 'ผลิตภัณฑ์คุณภาพสูง บริการประทับใจ',
  },
];

const services = [
  {
    name: 'ทำเล็บเจล',
    price: 'เริ่มต้น ฿499',
    image: '/images/gel-nails.jpg',
    duration: '60-90 นาที',
  },
  {
    name: 'เพ้นท์เล็บ',
    price: 'เริ่มต้น ฿299',
    image: '/images/nail-art.jpg',
    duration: '45-60 นาที',
  },
  {
    name: 'ต่อเล็บ',
    price: 'เริ่มต้น ฿799',
    image: '/images/extension.jpg',
    duration: '90-120 นาที',
  },
  {
    name: 'สปาเท้า',
    price: 'เริ่มต้น ฿599',
    image: '/images/pedicure.jpg',
    duration: '60-90 นาที',
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden gradient-hero py-20 md:py-32">
          {/* Decorative elements */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <Sparkles className="h-4 w-4" />
                <span>ยินดีต้อนรับสู่ Nail Salon</span>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                เติมเต็มความสวยงาม
                <span className="block text-primary">ให้ปลายนิ้วของคุณ</span>
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                บริการทำเล็บมืออาชีพ ดีไซน์ทันสมัย ผลิตภัณฑ์คุณภาพสูง
                จองคิวออนไลน์ สะดวก รวดเร็ว ไม่ต้องรอคิว
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Link href="/booking">
                  <Button size="lg" className="gradient-primary text-white border-0 text-lg px-8 h-12">
                    จองคิวเลย
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/services">
                  <Button size="lg" variant="outline" className="text-lg px-8 h-12">
                    ดูบริการทั้งหมด
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">ทำไมต้องเลือกเรา?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                เราใส่ใจทุกรายละเอียด เพื่อให้คุณได้รับประสบการณ์ที่ดีที่สุด
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Services Preview Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">บริการยอดนิยม</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                บริการทำเล็บหลากหลายรูปแบบ ตอบโจทย์ทุกสไตล์
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service, index) => (
                <Card key={index} className="overflow-hidden group cursor-pointer hover:shadow-xl transition-all duration-300">
                  <div className="aspect-square bg-gradient-to-br from-primary/20 to-accent/20 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Sparkles className="h-16 w-16 text-primary/30" />
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-1">{service.name}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-primary font-medium">{service.price}</span>
                      <span className="text-sm text-muted-foreground">{service.duration}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-8">
              <Link href="/services">
                <Button variant="outline" size="lg">
                  ดูบริการทั้งหมด
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 gradient-primary text-white">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-2xl mx-auto space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">พร้อมให้บริการแล้ววันนี้!</h2>
              <p className="text-lg text-white/90">
                จองคิวออนไลน์ได้ง่ายๆ เลือกวันเวลาที่สะดวก
                และช่างที่คุณชื่นชอบ
              </p>
              <Link href="/booking">
                <Button size="lg" variant="secondary" className="text-lg px-8 h-12 mt-4">
                  จองคิวเลย
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
