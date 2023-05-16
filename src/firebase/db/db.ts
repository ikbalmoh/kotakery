import MerchantAccount, { merchantAccountConverter } from '@/@types/account';
import firebase_app from '../config';
import {
  getFirestore,
  doc,
  setDoc,
  collection,
  query,
  where,
  limit,
  getDocs,
  getDoc,
  Timestamp,
  addDoc,
  updateDoc,
  QueryConstraint,
} from 'firebase/firestore';
import Product, { productConverter } from '@/@types/product';
import { getCookie } from 'cookies-next';

export const db = getFirestore(firebase_app);

export default db;
