'use client';

import MerchantAccount from '@/@types/account';
import { getMerchantByUsername } from '@/firebase/db/account';
import NotFound from '@/components/NotFound';
import { ProductContextProvider } from '@/contexts/product';
import { CartContextProvider } from '@/contexts/cart';
import Products from './components/Products';
import Header from './components/Header';
import { MerchantProvider } from '@/contexts/merchant';

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
    <MerchantProvider merchant={merchant}>
      <ProductContextProvider>
        <CartContextProvider>
          <main className="container mx-auto" style={{ minHeight: '85vh' }}>
            <Header />
            <div className="h-5"></div>
            <Products />
            <div className="h-96"></div>
          </main>
        </CartContextProvider>
      </ProductContextProvider>
    </MerchantProvider>
  );
}
