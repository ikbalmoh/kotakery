import { CartContext, CartContextType } from '@/contexts/cart';
import React, { useContext, useState } from 'react';
import { InboxStackIcon } from '@heroicons/react/24/outline';
import { currency } from '@/utils/formater';
import Image from 'next/image';
import Product from '@/@types/product';
import { CartItem } from '@/@types/cart';
import { classNames } from '@/utils/helpers';
import Button from '@/components/Button';
import Cart from './Cart';

type Props = {};

export default function Products({}: Props) {
  const [cartVisible, setCartVisible] = useState<boolean>(false);

  const {
    categories,
    initializing,
    addToCart,
    cart,
    changeQty,
    totalItems,
    subtotal,
  } = useContext(CartContext) as CartContextType;

  const onAddToCart = (product: Product) => {
    const item: CartItem = {
      id: product.id!,
      name: product.name,
      price: product.price,
      qty: 1,
    };
    addToCart(item);
  };

  const onCart = (id: string) => cart.find((c) => c.id === id);

  return (
    <div className="pb-28">
      {initializing && (
        <div className="flex items-center justify-center mt-72 w-full">
          <Image src={'/spinner-30.svg'} width={30} height={30} alt="loading" />
        </div>
      )}
      {categories.map((category) => (
        <div key={category.id} className="">
          <div className="px-5 py-3 sticky top-16 bg-slate-50 flex items-center">
            <InboxStackIcon className="w-5 h-5 text-slate-500 mr-3" />
            <span className="font-semibold text-slate-600 text-base">
              {category.name}
            </span>
          </div>
          <div className="grid grid-cols-12 gap-3 px-3 pb-3">
            {category.items?.map((product) => (
              <div
                className={classNames(
                  'col-span-6 md:col-span-3 xl:col-span-2 bg-white rounded-lg transition-all border border-slate-200/60'
                )}
                key={product.id}
              >
                <div className="w-full bg-gray-200 h-32 rounded-t-lg"></div>
                <div className="p-3">
                  <div className="font-medium text-base text-slate-800">
                    {product.name}
                  </div>
                  <div className="mt-1 flex items-end">
                    <span className="text-red-600 font-semibold text-sm">
                      Rp{currency(product.price)}
                    </span>
                    <span className="text-xs text-slate-500">
                      /{product.unit}
                    </span>
                  </div>
                  <div className="flex items-center justify-end mt-5">
                    {onCart(product.id!) ? (
                      <div className="rounded-md shadow-md border border-red-600 h-8 flex items-center font-medium bg-white">
                        <button
                          className="pl-3 pr-1 text-red-600 h-full text-base"
                          onClick={() => changeQty(product.id!, '-')}
                        >
                          -
                        </button>
                        <input
                          type="text"
                          value={onCart(product.id!)?.qty}
                          onChange={(e) =>
                            changeQty(
                              product.id!,
                              e.target.value ? parseInt(e.target.value) : 1
                            )
                          }
                          className="px-3 text-xs outline-none w-10 text-center"
                        />
                        <button
                          className="pr-3 pk-1 text-red-600 h-full text-base"
                          onClick={() => changeQty(product.id!, '+')}
                        >
                          +
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => onAddToCart(product)}
                        className="text-xs font-medium rounded-md px-3 border border-red-600 text-red-600 hover:bg-red-50 h-8"
                      >
                        PESAN
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      {totalItems > 0 && (
        <div className="p-5 bg-white flex items-center fixed bottom-0 left-0 right-0 intro-y border-t border-red-500">
          <div className="flex-1 mr-3 flex flex-col">
            <span className="text-sm text-slate-600">{totalItems} produk</span>
            <div className="font-bold text-base">Rp{currency(subtotal)}</div>
          </div>
          <Button
            type="button"
            label="Keranjang Belanja"
            danger
            onClick={() => setCartVisible(true)}
          />
        </div>
      )}
      <Cart isOpen={cartVisible} onDismiss={() => setCartVisible(false)} />
    </div>
  );
}
