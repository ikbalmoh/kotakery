import '../globals.css';
import { Inter } from 'next/font/google';
import NextTopLoader from 'nextjs-toploader';
import { getMerchantByUsername } from '@/firebase/db/account';
import MerchantAccount from '@/@types/account';
import { Metadata } from 'next';
import React from 'react';
import { classNames } from '@/utils/helpers';

const inter = Inter({ subsets: ['latin'] });

export async function generateMetadata({
  params,
}: {
  params: { username: string };
}): Promise<Metadata> {
  const merchant: MerchantAccount | null = await getMerchantByUsername(
    params.username
  );
  return {
    title: merchant?.name ?? 'Halaman tidak tersedia | Kotakery',
    description: merchant
      ? `Belanja di ${merchant?.name} lebih mudah kini hadir di Kotakery`
      : 'Kotakery',
    authors: { name: 'Kotakery', url: 'https://kotakery.com' },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning={true}
        className={classNames(
          inter.className,
          'mx-auto flex flex-col bg-slate-50'
        )}
      >
        <NextTopLoader color="#f75728" />
        {children}
      </body>
    </html>
  );
}
