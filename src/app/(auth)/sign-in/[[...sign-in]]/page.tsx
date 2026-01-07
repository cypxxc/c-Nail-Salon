import { SignIn } from '@clerk/nextjs';

export default function SignInPage() {
    return (
        <div className="min-h-screen flex items-center justify-center gradient-hero py-12">
            <div className="w-full max-w-md">
                <SignIn
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
