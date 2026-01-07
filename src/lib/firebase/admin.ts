import { initializeApp, getApps, cert, App } from 'firebase-admin/app';
import { getFirestore, Firestore } from 'firebase-admin/firestore';

let app: App | undefined;
let adminDb: Firestore | undefined;

function getFirebaseAdmin(): App {
    if (app) return app;

    const apps = getApps();
    if (apps.length > 0) {
        app = apps[0];
        return app;
    }

    // Initialize with service account
    app = initializeApp({
        credential: cert({
            projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
            clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
            privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        }),
    });

    return app;
}

export function getAdminDb(): Firestore {
    if (adminDb) return adminDb;

    const admin = getFirebaseAdmin();
    adminDb = getFirestore(admin);

    return adminDb;
}

export { getFirebaseAdmin };
