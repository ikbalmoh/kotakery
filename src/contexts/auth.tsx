import React, { useState, useEffect, createContext } from 'react';
import { auth } from '@/firebase/auth';
import { User } from '@firebase/auth';
import { useRouter } from 'next/navigation';
import MerchantAccount from '@/@types/account';
import { getMerchantAccount } from '@/firebase/db/account';
import { DocumentData } from 'firebase/firestore';

export interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  merchant: MerchantAccount | undefined;
}

export const AuthContext = createContext<AuthContextType | null>(null);

function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [merchant, setMerchant] = useState<MerchantAccount | undefined>(
    undefined
  );

  const loadMerchanAccount = async (uid: string) => {
    const _merchant: MerchantAccount | undefined = await getMerchantAccount(
      uid
    );
    if (!_merchant) {
      router.replace('/auth/signin');
    } else {
      setMerchant(_merchant);
    }
  };

  const handleUser = async (user: User | null) => {
    setUser(user);
    if (!user) {
      router.replace('/auth/signin');
    }
  };

  useEffect(() => {
    if (user) {
      loadMerchanAccount(user.uid);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(handleUser);
    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, merchant }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
