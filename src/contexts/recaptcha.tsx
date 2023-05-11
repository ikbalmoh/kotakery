import React, {
  useState,
  createContext,
  useRef,
  useEffect,
  LegacyRef,
} from 'react';
import { RecaptchaVerifier } from 'firebase/auth';
import { auth } from '@/firebase/auth';

export interface RecaptchaContextType {
  recaptcha: RecaptchaVerifier | undefined;
  resetRecaptcha: () => Promise<void>;
  clearRecaptcha: () => void;
  ref: LegacyRef<HTMLDivElement>;
}

export const RecaptchaContext = createContext<RecaptchaContextType | null>(
  null
);

export function RecaptchaProvider({ children }: { children: React.ReactNode }) {
  const [recaptcha, setRecaptcha] = useState<RecaptchaVerifier | undefined>(
    undefined
  );

  const ref = useRef<HTMLDivElement>(null);

  const clearRecaptcha = () => {
    if (recaptcha) {
      recaptcha.clear();
      setRecaptcha(undefined);
    }
    if (ref.current) {
      ref.current.innerHTML = `<div id="recaptcha-container"></div>`;
    }
  };

  const resetRecaptcha: () => Promise<void> = () =>
    new Promise(async (resolve, reject) => {
      clearRecaptcha();
      const verifier: RecaptchaVerifier = new RecaptchaVerifier(
        'recaptcha-container',
        { size: 'invisible' },
        auth
      );
      const captcha = verifier
        .verify()
        .then(() => {
          setRecaptcha(verifier);
          return resolve();
        })
        .catch((e) => reject(e));
    });

  useEffect(() => {
    if (ref.current) {
      resetRecaptcha();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref]);

  return (
    <RecaptchaContext.Provider
      value={{ ref, recaptcha, resetRecaptcha, clearRecaptcha }}
    >
      {children}
    </RecaptchaContext.Provider>
  );
}

export default RecaptchaContext;
