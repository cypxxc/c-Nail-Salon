import { SignUp } from '@clerk/nextjs';

export default function SignUpPage() {
    return (
        <div className="min-h-screen flex items-center justify-center gradient-hero py-12">
            <div className="w-full max-w-md">
                <SignUp
                    appearance={{
                        elements: {
                            rootBox: 'mx-auto',
                            card: 'shadow-xl',
                        },
                    }}
                />
            </div>
        </div>
    );
}
