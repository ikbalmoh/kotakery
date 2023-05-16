'use client';

import { AuthContext, AuthContextType } from '@/contexts/auth';
import db from '@/firebase/db/db';
import { getSummaries } from '@/firebase/db/product';
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
  { key: 'order', label: 'Pesanan', style: 'bg-gray-50 text-gray-400' },
  { key: 'visit', label: 'Kunjungan Toko', style: 'bg-gray-50 text-gray-400' },
];

export default function Summaries({}: Props) {
  const { user } = useContext(AuthContext) as AuthContextType;
  const [values, setValues] = useState<ValuesType>({
    products: 0,
    categories: 0,
    order: 0,
    visit: 0,
  });

  const fetchSummaries = async () => {
    const { products, categories } = await getSummaries();
    setValues({
      ...values,
      products,
      categories,
    });
  };

  useEffect(() => {
    if (!user) {
      return;
    }

    const productQuery = query(
      collection(db, 'products'),
      where('merchantId', '==', user?.uid)
    );
    const unsubscribeProduct = onSnapshot(productQuery, (querySnapshot) =>
      fetchSummaries()
    );

    const categoryQuery = query(
      collection(db, 'categories'),
      where('merchantId', '==', user?.uid)
    );
    const unsubscribeCategories = onSnapshot(categoryQuery, (querySnapshot) =>
      fetchSummaries()
    );

    return () => {
      unsubscribeProduct();
      unsubscribeCategories();
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
          <div className="font-bold text-3xl">
            {values[s.key as keyof ValuesType]}
          </div>
          <div className="mt-3 truncate">{s.label}</div>
        </div>
      ))}
    </div>
  );
}
