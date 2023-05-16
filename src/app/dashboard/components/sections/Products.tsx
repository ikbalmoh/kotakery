'use client';

import React, { useContext, useEffect, useState } from 'react';
import Button from '@/components/Button';
import SelectCategory from './SelectCategory';
import { CubeIcon } from '@heroicons/react/24/outline';
import AddProductDialog from './AddProductDialog';
import Product, { productConverter } from '@/@types/product';
import {
  QueryConstraint,
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import db from '@/firebase/db/db';
import { AuthContext, AuthContextType } from '@/contexts/auth';
import Category from '@/@types/category';
import { getCategory } from '@/firebase/db/product';
import { currency } from '@/utils/formater';

type Props = {};

export default function Products({}: Props) {
  const { user } = useContext(AuthContext) as AuthContextType;

  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [products, setProducts] = useState<Array<Product>>([]);
  const [category, setCategory] = useState<Category | null>(null);

  const [productDialogVisible, setProductDialogVisible] =
    useState<boolean>(false);

  const loadCategory = async (categoryId: string) => {
    const c: Category = await getCategory(categoryId);
    setCategory(c);
  };

  useEffect(() => {
    if (!user) {
      return;
    }
    const condition: Array<QueryConstraint> = [
      where('merchantId', '==', user.uid),
    ];
    if (categoryId) {
      condition.push(where('categoryId', '==', categoryId));
      loadCategory(categoryId);
    } else {
      setCategory(null);
    }
    condition.push(orderBy('name', 'asc'));
    const q = query(
      collection(db, 'products').withConverter(productConverter),
      ...condition
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const _products: Array<Product> = [];
      querySnapshot.forEach((doc) => {
        const product = doc.data();
        product.id = doc.id;
        _products.push(product);
      });
      setProducts(_products);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps

    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId]);

  if (!user) {
    return (
      <div className="w-full flex items-center justify-center h-full">
        <div className="mt-5 text-slate-50 text-center">Memuat Produk ...</div>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col w-full">
        <div className="flex flex-col md:flex-row items-start md:items-center md:justify-between">
          <div className="w-full md:w-60">
            <SelectCategory
              value={categoryId}
              onChange={setCategoryId}
              nullable
            />
          </div>
          <Button
            label="Tambah Produk"
            className="w-full md:w-min mt-5 md:mt-0 whitespace-nowrap"
            type="button"
            onClick={() => setProductDialogVisible(true)}
          />
        </div>
        <div className="mt-8">
          {products.length == 0 ? (
            <div className="flex flex-col py-52 items-center">
              <CubeIcon className="w-28 h-28 text-slate-300" />
              <div className="text-slate-400 text-lg mt-5 flex flex-col items-center">
                <span>
                  {category
                    ? 'Belum ada produk di etalase'
                    : 'Belum ada produk'}
                </span>
                {category && (
                  <span className="font-medium">{category.name}</span>
                )}
              </div>
            </div>
          ) : (
            <table className="table table-report w-full">
              <thead>
                <tr>
                  <th>Nama Produk</th>
                  <th className="text-right">Harga</th>
                  <th>Satuan</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.id}>
                    <td>{p.name}</td>
                    <td className="text-right">Rp {currency(p.price)}</td>
                    <td>{p.unit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
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
