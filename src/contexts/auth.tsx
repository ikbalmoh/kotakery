import React, { useState, useEffect, useContext, createContext } from 'react';
import { auth } from '@/firebase/auth';
import { User } from '@firebase/auth';
import { useRouter } from 'next/navigation';

export interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  const handleUser = (user: User | null) => {
    if (!user) {
      router.replace('/auth/signin');
    }
    setTimeout(() => {
      setUser(user);
    }, 500);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(handleUser);
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
