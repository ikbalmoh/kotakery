'use client';

import '../globals.css';
import { Inter } from 'next/font/google';
import Navbar from './components/Navbar';
import AuthProvider from '@/contexts/auth';
import NextTopLoader from 'nextjs-toploader';
import { Toaster } from 'react-hot-toast';
import Image from 'next/image';

const inter = Inter({ subsets: ['latin'] });

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <AuthProvider>
      <html lang="en">
        <body className={inter.className} suppressHydrationWarning={true}>
          <NextTopLoader color="#f75728" />
          <Navbar />
          <main className="container mx-auto py-4 md:py-10 px-4 md:px-0">
            {children}
          </main>
          <Toaster toastOptions={{ duration: 1000 }} />
        </body>
      </html>
    </AuthProvider>
  );
}
