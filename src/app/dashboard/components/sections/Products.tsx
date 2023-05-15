'use client';

import React, { useEffect, useState } from 'react';
import Button from '@/components/Button';
import SelectCategory from './SelectCategory';
import { CubeIcon } from '@heroicons/react/24/outline';
import AddProductDialog from './AddProductDialog';
import { merchantProducts } from '@/firebase/db';
import Product from '@/@types/product';
import { Unsubscribe } from 'firebase/auth';

type Props = {};

export default function Products({}: Props) {
  const [categoryId, setCategoryId] = useState<string | null | undefined>(
    undefined
  );
  const [products, setProducts] = useState<Array<Product>>([]);

  const [productDialogVisible, setProductDialogVisible] =
    useState<boolean>(false);

  const loadProducts = async (categoryId?: string | null) => {
    const products = await merchantProducts(categoryId);
    console.log('Load Products', { categoryId, products });

    setProducts(products);
  };

  useEffect(() => {
    loadProducts(categoryId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId]);

  return (
    <>
      <div className="flex flex-col w-full">
        <div className="flex flex-col md:flex-row items-start md:items-center md:justify-between">
          <div className="w-full md:w-60">
            <SelectCategory value={categoryId} onChange={setCategoryId} />
          </div>
          <Button
            label="Tambah Produk"
            className="w-full md:w-min mt-5 md:mt-0 whitespace-nowrap"
            type="button"
            onClick={() => setProductDialogVisible(true)}
          />
        </div>
        <div className="mt-8">
          {products.length === 0 ? (
            <div className="flex flex-col py-52 items-center">
              <CubeIcon className="w-28 h-28 text-slate-300" />
              <div className="text-slate-400 text-lg mt-5">
                Mulai Masukkan Produk
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-12">
              {products.map((product) => (
                <div className="col-span-12 p-5 rounded-md" key={product.id}>
                  {product.name}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <AddProductDialog
        visible={productDialogVisible}
        onDismiss={() => setProductDialogVisible(false)}
      />
    </>
  );
}
