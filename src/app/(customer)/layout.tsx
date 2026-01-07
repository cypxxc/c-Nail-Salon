import { ReactNode } from 'react';
import { Header, Footer } from '@/components/layout';

export default function CustomerLayout({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 bg-muted/20">{children}</main>
            <Footer />
        </div>
    );
}
