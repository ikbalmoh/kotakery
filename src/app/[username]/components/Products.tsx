import { CartContext, CartContextType } from '@/contexts/cart';
import React, { useContext } from 'react';
import { InboxStackIcon } from '@heroicons/react/24/outline';
import { currency } from '@/utils/formater';
import Image from 'next/image';

type Props = {};

export default function Products({}: Props) {
  const { categories, initializing } = useContext(
    CartContext
  ) as CartContextType;

  return (
    <div>
      {initializing && (
        <div className="flex items-center justify-center mt-72 w-full">
          <Image src={'/spinner-30.svg'} width={30} height={30} alt="loading" />
        </div>
      )}
      {categories.map((category) => (
        <div key={category.id} className="">
          <div className="px-5 py-3 sticky top-16 bg-slate-50 flex items-center">
            <InboxStackIcon className="w-6 h-6 text-slate-500 mr-3" />
            <span className="font-semibold text-slate-600 text-lg">
              {category.name}
            </span>
          </div>
          <div className="grid grid-cols-12 gap-3 px-3 pb-3">
            {category.items?.map((product) => (
              <div
                className="col-span-6 md:col-span-3 xl:col-span-2 bg-white p-3 rounded-lg shadow-md border border-transparent hover:border-red-500 transition-all"
                key={product.id}
              >
                <div className="font-medium text-base text-slate-800">
                  {product.name}
                </div>
                <div className="mt-2">
                  <span className="text-slate-800 font-semibold text-sm">
                    Rp{currency(product.price)}
                  </span>
                  <span className="text-xs text-slate-600">
                    /{product.unit}
                  </span>
                </div>
                <div className="flex items-center justify-end mt-3">
                  <button className="text-xs font-medium rounded-md shadow-md px-3 py-1 border border-red-600 text-red-600 hover:bg-red-50">
                    PESAN
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
