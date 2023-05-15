import MerchantAccount, { merchantAccountConverter } from '@/@types/account';
import firebase_app from './config';
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
  onSnapshot,
  QuerySnapshot,
  Unsubscribe,
  updateDoc,
  QueryConstraint,
} from 'firebase/firestore';
import Product, { productConverter } from '@/@types/product';
import { getCookie } from 'cookies-next';

export const db = getFirestore(firebase_app);

export const isPhoneNumberRegistered = async (phoneNumber: string) => {
  const merchantRef = collection(db, 'merchants');
  const q = query(
    merchantRef,
    where('owner.phone', '==', phoneNumber),
    limit(1)
  );

  const querySnapshot = await getDocs(q);
  return querySnapshot.size > 0 ? true : false;
};

export const isUsernameAvailable = async (username: string) => {
  const forbidden: Array<string> = ['kotakery', 'cart'];
  if (forbidden.includes(username)) {
    return Promise.resolve(false);
  }

  const merchantRef = collection(db, 'merchants');
  const q = query(merchantRef, where('username', '==', username));

  const querySnapshot = await getDocs(q);
  return Promise.resolve(querySnapshot.size < 1);
};

export const registerMerchantAccount = async (
  uid: string,
  merchant: MerchantAccount
) => {
  merchant.joinedAt = Timestamp.fromDate(new Date());
  merchant.lastActivity = Timestamp.fromDate(new Date());
  return setDoc(doc(db, 'merchants', uid), merchant, { merge: true });
};

export const logMerchantLastActivityTime = async (uid: string) => {
  const merchantRef = doc(db, 'merchants', uid);
  return updateDoc(merchantRef, {
    lastActivity: Timestamp.fromDate(new Date()),
  });
};

export const getMerchantAccount = async (uid: string) => {
  try {
    const path = `merchants/${uid}`;
    const docSnapshot = await getDoc(
      doc(db, path).withConverter<MerchantAccount>(merchantAccountConverter)
    );

    const account = docSnapshot.data();

    return account;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const storeProduct = async (product: Product) => {
  const uid = getCookie('uid');
  product.merchantId = uid?.toString();
  product.createdAt = Timestamp.fromDate(new Date());
  product.updatedAt = null;
  product.isAvailable = true;

  const productRef = await addDoc(collection(db, 'products'), product);
  return productRef;
};

export const merchantProducts = async (categoryId?: string | null) => {
  try {
    const uid = getCookie('uid');

    const products: Array<Product> = [];

    const whereQuery: Array<QueryConstraint> = [where('merchantId', '==', uid)];

    if (categoryId) {
      whereQuery.push(where('categoryId', '==', categoryId));
    }

    const q = query(
      collection(db, 'products').withConverter<Product>(productConverter),
      ...whereQuery
    );

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      const product: Product = doc.data();
      product.id = doc.id;

      products.push(product);
    });

    return products;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default db;
