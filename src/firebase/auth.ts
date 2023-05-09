import firebase_app from './config';
import {
  getAuth,
  signInWithPhoneNumber,
  RecaptchaVerifier,
  ConfirmationResult,
} from 'firebase/auth';
import { setCookie, deleteCookie } from 'cookies-next';

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

export async function requestVerificationCode(phoneNumber: string) {
  const recaptchaVerifier = new RecaptchaVerifier(
    'recaptcha-container',
    {
      size: 'invisible',
    },
    auth
  );

  try {
    const result = await signInWithPhoneNumber(
      auth,
      phoneNumber,
      recaptchaVerifier
    );
    recaptchaVerifier.clear();
    return result;
  } catch (error) {
    recaptchaVerifier.clear();
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

export const signOut = () => auth.signOut();
