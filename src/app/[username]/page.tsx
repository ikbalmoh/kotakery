import { redirect } from 'next/navigation';
import { getMerchantByUsername } from '@/firebase/db/account';
import MerchantAccount from '@/@types/account';
import type { Metadata } from 'next';

type Props = {
  params: { username: string };
};

async function getMerchant(username: string) {
  const merchant = await getMerchantByUsername(username);
  return merchant;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const merchant: MerchantAccount | null = await getMerchant(params.username);
  return {
    title: `${merchant?.name} | Kotakery`,
    description: `Belanja di ${merchant?.name} lebih mudah kini hadir di Kotakery`,
  };
}

export default async function Page({ params }: Props) {
  const { username } = params;

  const merchant: MerchantAccount | null = await getMerchant(username);

  if (!merchant) {
    redirect('/404');
  }

  return <h1>{merchant.name}</h1>;
}
