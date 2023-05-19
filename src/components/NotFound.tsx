import { BuildingStorefrontIcon } from '@heroicons/react/24/outline';
import React from 'react';

type Props = {};

export default function NotFound({}: Props) {
  return (
    <div
      className="w-full flex flex-col items-center justify-center text-slate-500"
      style={{ height: 'calc(100vh - 100px)' }}
    >
      <BuildingStorefrontIcon className="w-10 h-10" />
      <div className="mt-5">Halaman tidak tersedia</div>
    </div>
  );
}
