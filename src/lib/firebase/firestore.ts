import {
    collection,
    doc,
    getDocs,
    getDoc,
    addDoc,
    updateDoc,
    deleteDoc,
    query,
    where,
    orderBy,
    limit,
    DocumentData,
    QueryConstraint,
    Timestamp,
} from 'firebase/firestore';
import { db } from './config';

// Collection names
export const COLLECTIONS = {
    USERS: 'users',
    SERVICES: 'services',
    STAFF: 'staff',
    BOOKINGS: 'bookings',
    REVIEWS: 'reviews',
    HOLIDAYS: 'holidays',
    SETTINGS: 'settings',
} as const;

// Helper to convert Firestore Timestamp to Date
export function timestampToDate(timestamp: Timestamp | Date | undefined): Date | undefined {
    if (!timestamp) return undefined;
    if (timestamp instanceof Date) return timestamp;
    return timestamp.toDate();
}

// Helper to convert Date to Firestore Timestamp
export function dateToTimestamp(date: Date | undefined): Timestamp | undefined {
    if (!date) return undefined;
    return Timestamp.fromDate(date);
}

// Generic get all documents from a collection
export async function getDocuments<T extends DocumentData>(
    collectionName: string,
    constraints: QueryConstraint[] = []
): Promise<T[]> {
    const collectionRef = collection(db, collectionName);
    const q = query(collectionRef, ...constraints);
    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    } as unknown as T));
}

// Get a single document by ID
export async function getDocumentById<T extends DocumentData>(
    collectionName: string,
    documentId: string
): Promise<T | null> {
    const docRef = doc(db, collectionName, documentId);
    const snapshot = await getDoc(docRef);

    if (!snapshot.exists()) return null;

    return {
        id: snapshot.id,
        ...snapshot.data(),
    } as unknown as T;
}

// Create a new document
export async function createDocument<T extends DocumentData>(
    collectionName: string,
    data: Omit<T, 'id'>
): Promise<string> {
    const collectionRef = collection(db, collectionName);
    const docRef = await addDoc(collectionRef, {
        ...data,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
    });

    return docRef.id;
}

// Update a document
export async function updateDocument<T extends DocumentData>(
    collectionName: string,
    documentId: string,
    data: Partial<T>
): Promise<void> {
    const docRef = doc(db, collectionName, documentId);
    await updateDoc(docRef, {
        ...data,
        updatedAt: Timestamp.now(),
    });
}

// Delete a document
export async function deleteDocument(
    collectionName: string,
    documentId: string
): Promise<void> {
    const docRef = doc(db, collectionName, documentId);
    await deleteDoc(docRef);
}

// Export query helpers
export { query, where, orderBy, limit, collection, doc };
