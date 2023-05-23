'use client';

import MerchantAccount from '@/@types/account';
import { getMerchantByUsername } from '@/firebase/db/account';
import NotFound from '@/components/NotFound';
import { ProductContextProvider } from '@/contexts/product';
import { CartContextProvider } from '@/contexts/cart';
import Navbar from './components/Navbar';
import Image from 'next/image';
import Products from './components/Products';

type Props = {
  params: { username: string };
};

export default async function Page({ params }: Props) {
  const merchant: MerchantAccount | null = await getMerchantByUsername(
    params.username
  );

  if (!merchant) {
    return <NotFound />;
  }

  return (
    <ProductContextProvider id={merchant.id!}>
      <CartContextProvider merchant={merchant!}>
        <Navbar merchant={merchant} />
        <main className="container mx-auto" style={{ minHeight: '85vh' }}>
          <Products />
        </main>
      </CartContextProvider>
    </ProductContextProvider>
  );
}
