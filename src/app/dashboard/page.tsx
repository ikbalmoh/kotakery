'use client';

import { auth } from '@/firebase/auth';
import { User } from 'firebase/auth';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const router = useRouter();

  auth.onAuthStateChanged((user: User | null) => {
    if (!user) {
      router.replace('/auth/signin');
    }
  });

  return <div>Dashboard</div>;
}
