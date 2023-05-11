import firebase_app from './config';
import {
  getAuth,
  signInWithPhoneNumber,
  RecaptchaVerifier,
  ConfirmationResult,
  User,
  updateProfile,
} from 'firebase/auth';
import { setCookie, deleteCookie } from 'cookies-next';
import { merchantAccount } from '@/@types/account';
import { storeMerchantData } from './db';

export const auth = getAuth(firebase_app);
auth.useDeviceLanguage();

auth.onAuthStateChanged(async (user) => {
  if (user) {
    setCookie('uid', user.uid);
    const token: string | undefined = await user?.getIdToken();
    if (token) {
      setCookie('id_token', token);
    } else {
      deleteCookie('id_token');
    }
  } else {
    deleteCookie('uid');
    deleteCookie('id_token');
  }
});

let recaptchaVerifier: RecaptchaVerifier | null;

export const initializeRecaptcha = () => {
  recaptchaVerifier?.clear();
  recaptchaVerifier = new RecaptchaVerifier(
    'recaptcha-container',
    {
      size: 'invisible',
    },
    auth
  );

  return Promise.resolve(recaptchaVerifier);
};

export async function requestVerificationCode(
  phoneNumber: string,
  appVerifier: RecaptchaVerifier
) {
  try {
    const result = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
    return result;
  } catch (error) {
    throw error;
  }
}

export async function verifyVerificationCode(
  code: string,
  confirmationResult: ConfirmationResult
) {
  try {
    const result = await confirmationResult.confirm(code);
    return result.user;
  } catch (error) {
    throw error;
  }
}

export const registerMerchant = async (
  merchant: merchantAccount,
  code: string,
  confirmationResult: ConfirmationResult
) => {
  try {
    const authenticatedUser: User = await verifyVerificationCode(
      code,
      confirmationResult
    );
    await storeMerchantData(authenticatedUser.uid, merchant);
    updateProfile(authenticatedUser, { displayName: merchant.name });
    return;
  } catch (error) {
    throw error;
  }
};

export const signOut = () => auth.signOut();
