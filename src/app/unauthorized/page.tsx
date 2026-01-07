import Link from 'next/link';
import { ShieldAlert, ArrowLeft, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function UnauthorizedPage() {
    return (
        <div className="min-h-screen flex items-center justify-center gradient-hero py-12">
            <div className="text-center space-y-6 max-w-md px-4">
                <div className="w-20 h-20 mx-auto rounded-full bg-destructive/10 flex items-center justify-center">
                    <ShieldAlert className="h-10 w-10 text-destructive" />
                </div>

                <h1 className="text-3xl font-bold">ไม่มีสิทธิ์เข้าถึง</h1>

                <p className="text-muted-foreground">
                    คุณไม่มีสิทธิ์ในการเข้าถึงหน้านี้
                    กรุณาติดต่อผู้ดูแลระบบหากคุณเชื่อว่านี่เป็นข้อผิดพลาด
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
                    <Link href="/">
                        <Button className="gradient-primary text-white border-0">
                            <Home className="mr-2 h-4 w-4" />
                            กลับหน้าแรก
                        </Button>
                    </Link>
                    <Button variant="outline" onClick={() => window.history.back()}>
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        ย้อนกลับ
                    </Button>
                </div>
            </div>
        </div>
    );
}
