'use client';

import { AuthContext, AuthContextType } from '@/contexts/auth';
import db from '@/firebase/db/db';
import { classNames } from '@/utils/helpers';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react';

type Props = {};

interface ValuesType {
  products: number;
  categories: number;
  order: number;
  visit: number;
}

const summaries: Array<{ key: string; label: string; style: string }> = [
  {
    key: 'categories',
    label: 'Etalase',
    style: 'bg-blue-50 text-blue-600',
  },
  { key: 'products', label: 'Produk', style: 'bg-green-50 text-green-600' },
  { key: 'order', label: 'Pesanan', style: 'bg-red-50 text-red-400' },
  { key: 'visit', label: 'Kunjungan Toko', style: 'bg-gray-50 text-gray-400' },
];

export default function Summaries({}: Props) {
  const { user } = useContext(AuthContext) as AuthContextType;
  const [totalProducts, setTotalProducts] = useState<number>(0);
  const [totalCategories, setTotalCategories] = useState<number>(0);
  const [totalOrder, setTotalOrders] = useState<number>(0);
  const [totalVisit, setTotalVisit] = useState<number>(0);

  const summaryTotal: { [key: string]: number } = {
    categories: totalCategories,
    products: totalProducts,
    order: totalOrder,
    visit: totalVisit,
  };

  useEffect(() => {
    if (!user) {
      return;
    }

    const unsubscribeProduct = onSnapshot(
      query(collection(db, 'products'), where('merchantId', '==', user?.uid)),
      (querySnapshot) => setTotalProducts(querySnapshot.size)
    );

    const unsubscribeCategories = onSnapshot(
      query(collection(db, 'categories'), where('merchantId', '==', user?.uid)),
      (querySnapshot) => setTotalCategories(querySnapshot.size)
    );

    const unsubscribeOrders = onSnapshot(
      query(
        collection(db, 'transactions'),
        where('merchantId', '==', user?.uid)
      ),
      (querySnapshot) => setTotalOrders(querySnapshot.size)
    );

    return () => {
      unsubscribeProduct();
      unsubscribeCategories();
      unsubscribeOrders();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div className="grid grid-cols-12 gap-6">
      {summaries.map((s) => (
        <div
          key={s.key}
          className={classNames(
            'col-span-6 md:col-span-3 flex flex-col rounded-lg border border-slate-200 p-5',
            s.style
          )}
        >
          <div className="font-bold text-3xl">{summaryTotal[s.key]}</div>
          <div className="mt-3 truncate">{s.label}</div>
        </div>
      ))}
    </div>
  );
}
