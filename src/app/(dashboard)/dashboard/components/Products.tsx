'use client';

import React, { useContext, useEffect, useState } from 'react';
import Button from '@/components/Button';
import SelectCategory from './SelectCategory';
import {
  ArchiveBoxIcon,
  PencilIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
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
import { getCategory, updateProductAvailability } from '@/firebase/db/product';
import { currency } from '@/utils/formater';
import { Switch } from '@headlessui/react';
import { classNames } from '@/utils/helpers';
import DeleteProductDialog from './DeleteProductDialog';
import ProductImage from '@/components/ProductImage';

type Props = {};

export default function Products({}: Props) {
  const { user } = useContext(AuthContext) as AuthContextType;

  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [products, setProducts] = useState<Array<Product>>([]);
  const [category, setCategory] = useState<Category | null>(null);
  const [editProduct, setEditProduct] = useState<Product>();
  const [deleteProduct, setDeleteProduct] = useState<Product | undefined>(
    undefined
  );

  const [productDialogVisible, setProductDialogVisible] =
    useState<boolean>(false);

  const loadCategory = async (categoryId: string) => {
    const c: Category = await getCategory(categoryId);
    setCategory(c);
  };

  const onNewProduct = () => {
    setEditProduct(undefined);
    setProductDialogVisible(true);
  };

  const onEditProduct = (product: Product) => {
    setEditProduct(product);
    setProductDialogVisible(true);
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

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId, user]);

  return (
    <>
      <div className="flex flex-col w-full">
        <div className="flex flex-col-reverse  md:flex-row items-start md:items-center md:justify-between">
          <div className="w-full md:w-60 mt-5 md:mt-0">
            <SelectCategory
              value={categoryId}
              onChange={setCategoryId}
              nullable
            />
          </div>
          <Button
            label="Tambah Produk"
            className="w-full md:w-min whitespace-nowrap"
            type="button"
            onClick={onNewProduct}
          />
        </div>
        <div className="mt-8 overflow-x-auto w-full">
          {products.length == 0 ? (
            <div className="flex flex-col py-52 items-center">
              <ArchiveBoxIcon className="w-28 h-28 text-slate-300" />
              <div className="text-slate-400 text-lg mt-5 flex flex-col items-center">
                <span>
                  {category ? 'Etalase masih kosong' : 'Belum ada produk'}
                </span>
              </div>
            </div>
          ) : (
            <table className="table table-hover w-full">
              <thead>
                <tr>
                  <th>Produk</th>
                  <th>Tersedia</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {products.map((p, idx) => (
                  <tr key={p.id} className={p.isAvailable ? '' : 'disabled'}>
                    <td>
                      <div className="flex flex-col md:flex-row">
                        <div className="w-20 h-20 md:w-16 md:h-16 rounded-md relative md:mr-3 bg-gray-200">
                          <ProductImage
                            image={p.image ? (p.image as string) : null}
                            name={p.name}
                            className="rounded-md"
                          />
                        </div>
                        <div className="flex flex-col mt-3 md:mt-0">
                          <div>{p.name}</div>
                          <div className="mt-0.5 md:mt-1">
                            <span className="font-semibold text-slate-700 text-sm">
                              Rp {currency(p.price)}
                            </span>
                            <span className="text-xs text-slate-500">
                              /{p.unit}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="text-center w-[50px]">
                      <Switch
                        checked={p.isAvailable}
                        onChange={(status) =>
                          updateProductAvailability(p.id!, status)
                        }
                        className={classNames(
                          p.isAvailable ? 'bg-green-500 ' : 'bg-gray-300',
                          'relative inline-flex h-[22px] w-[46px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75'
                        )}
                      >
                        <span
                          aria-hidden="true"
                          className={classNames(
                            p.isAvailable ? 'translate-x-6' : 'translate-x-0',
                            'bg-white pointer-events-none inline-block h-[18px] w-[18px] transform rounded-full shadow-lg ring-0 transition duration-200 ease-in-out'
                          )}
                        />
                      </Switch>
                    </td>
                    <td className="text-center w-8">
                      <div className="flex items-center justify-center w-min">
                        <button
                          className="mr-3"
                          onClick={() => onEditProduct(p)}
                          type="button"
                        >
                          <PencilIcon className="w-4 h-4 text-slate-600" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteProduct(p)}
                        >
                          <TrashIcon className="w-4 h-4 text-red-600" />
                        </button>
                      </div>
                    </td>
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
        initialValues={editProduct}
      />
      <DeleteProductDialog
        product={deleteProduct}
        onDismiss={() => setDeleteProduct(undefined)}
      />
    </>
  );
}
