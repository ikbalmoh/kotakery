import { MerchantAccount } from '@/@types/account';
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
} from 'firebase/firestore';

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

export const storeMerchantAccount = async (
  uid: string,
  merchant: MerchantAccount
) => {
  return setDoc(doc(db, 'merchants', uid), merchant);
};

export const getMerchantAccount = async (uid: string) => {
  const docSnapshot = await getDoc(doc(db, `merchants/${uid}`));
  if (docSnapshot.exists()) {
    const merchant: MerchantAccount = docSnapshot.data() as MerchantAccount;
    return merchant;
  }
  return null;
};

export default db;
