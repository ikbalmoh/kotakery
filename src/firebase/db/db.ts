import firebase_app from '../config';
import { getFirestore } from 'firebase/firestore';

export const db = getFirestore(firebase_app);

export default db;
