import React, { useState, useEffect, createContext } from 'react';
import { auth } from '@/firebase/auth';
import { User } from '@firebase/auth';
import { useRouter } from 'next/navigation';
import { MerchantAccount } from '@/@types/account';
import { getMerchantAccount } from '@/firebase/db';

export interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  merchant: MerchantAccount | null;
}

export const AuthContext = createContext<AuthContextType | null>(null);

function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [merchant, setMerchant] = useState<MerchantAccount | null>(null);

  const handleUser = async (user: User | null) => {
    if (!user) {
      router.replace('/auth/signin');
    } else {
      const _merchant: MerchantAccount | null = await getMerchantAccount(
        user.uid
      );
      setMerchant(_merchant);
      setUser(user);
    }
  };

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
