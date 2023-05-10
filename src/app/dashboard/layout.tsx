'use client';

import '../globals.css';
import { Inter } from 'next/font/google';
import Navbar from './components/Navbar';
import AuthProvider from '@/contexts/auth';

const inter = Inter({ subsets: ['latin'] });

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <AuthProvider>
      <html lang="en">
        <body className={inter.className}>
          <Navbar />
          <main className="container mx-auto py-10">{children}</main>
        </body>
      </html>
    </AuthProvider>
  );
}
