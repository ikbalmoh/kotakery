'use client';

import React, { useState } from 'react';
import Button from '@/components/Button';
import SelectCategory from './SelectCategory';
import { CubeIcon } from '@heroicons/react/24/outline';
import AddProductDialog from './AddProductDialog';

type Props = {};

export default function Products({}: Props) {
  const [productDialogVisible, setProductDialogVisible] =
    useState<boolean>(false);

  return (
    <>
      <div className="flex flex-col w-full">
        <div className="flex flex-col md:flex-row items-start md:items-center md:justify-between">
          <div className="w-full md:w-60">
            <SelectCategory />
          </div>
          <Button
            label="Tambah Produk"
            className="w-full md:w-min mt-5 md:mt-0 whitespace-nowrap"
            type="button"
            onClick={() => setProductDialogVisible(true)}
          />
        </div>
        <div className="mt-8">
          <div className="flex flex-col py-52 items-center">
            <CubeIcon className="w-28 h-28 text-slate-300" />
            <div className="text-slate-400 text-lg mt-5">
              Mulai Masukkan Produk
            </div>
          </div>
        </div>
      </div>
      <AddProductDialog
        visible={productDialogVisible}
        onDismiss={() => setProductDialogVisible(false)}
      />
    </>
  );
}
