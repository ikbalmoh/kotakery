import { classNames } from '@/utils/helpers';
import React from 'react';

type Props = {};

const summaries: Array<{ key: string; label: string; style: string }> = [
  { key: 'products', label: 'Produk', style: 'bg-green-50 text-green-600' },
  {
    key: 'categories',
    label: 'Kategori Produk',
    style: 'bg-blue-50 text-blue-600',
  },
  { key: 'order', label: 'Pesanan', style: 'bg-gray-50 text-gray-400' },
  { key: 'visit', label: 'Kunjungan Toko', style: 'bg-gray-50 text-gray-400' },
];

export default function Summaries({}: Props) {
  const values: any = {
    products: 0,
    categories: 0,
    order: 0,
    visit: 0,
  };
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
          <div className="font-bold text-3xl">{values[s.key]}</div>
          <div className="mt-3 truncate">{s.label}</div>
        </div>
      ))}
    </div>
  );
}
