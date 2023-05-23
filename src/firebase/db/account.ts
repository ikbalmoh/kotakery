import {
  QuerySnapshot,
  Timestamp,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import db from './db';
import MerchantAccount, { merchantAccountConverter } from '@/@types/account';
import { MERCHANT_DB } from './const';

export const isPhoneNumberRegistered = async (phoneNumber: string) => {
  const merchantRef = collection(db, MERCHANT_DB);

  const q = query(
    merchantRef,
    where('owner.phone', '==', phoneNumber.replace(/\s+/g, '')),
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

  const merchantRef = collection(db, MERCHANT_DB);
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
  return setDoc(doc(db, MERCHANT_DB, uid), merchant, { merge: true });
};

export const logMerchantLastActivityTime = async (uid: string) => {
  const merchantRef = doc(db, MERCHANT_DB, uid);
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

export const getMerchantByUsername = async (username: string) => {
  try {
    const merchantRef = collection(db, MERCHANT_DB).withConverter(
      merchantAccountConverter
    );
    const q = query(merchantRef, where('username', '==', username));

    const querySnapshot = await getDocs(q);
    if (querySnapshot.size > 0) {
      return querySnapshot.docs[0].data() as MerchantAccount;
    }
    return null;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
