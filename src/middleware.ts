import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

// Public routes - no authentication required
const isPublicRoute = createRouteMatcher([
    '/',
    '/services(.*)',
    '/about',
    '/contact',
    '/sign-in(.*)',
    '/sign-up(.*)',
    '/api/webhooks(.*)',
]);

// Admin routes - admin role required
const isAdminRoute = createRouteMatcher(['/admin(.*)']);

// Staff routes - staff or admin role required
const isStaffRoute = createRouteMatcher(['/staff(.*)']);

export default clerkMiddleware(async (auth, req) => {
    const { userId, sessionClaims } = await auth();

    // Allow public routes
    if (isPublicRoute(req)) {
        return NextResponse.next();
    }

    // Require authentication for all other routes
    if (!userId) {
        const signInUrl = new URL('/sign-in', req.url);
        signInUrl.searchParams.set('redirect_url', req.url);
        return NextResponse.redirect(signInUrl);
    }

    // Get user role from session claims
    const userRole = (sessionClaims?.metadata as { role?: string })?.role || 'customer';

    // Check admin routes
    if (isAdminRoute(req)) {
        if (userRole !== 'admin') {
            return NextResponse.redirect(new URL('/unauthorized', req.url));
        }
    }

    // Check staff routes
    if (isStaffRoute(req)) {
        if (userRole !== 'staff' && userRole !== 'admin') {
            return NextResponse.redirect(new URL('/unauthorized', req.url));
        }
    }

    return NextResponse.next();
});

export const config = {
    matcher: [
        // Skip Next.js internals and all static files
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
    ],
};
