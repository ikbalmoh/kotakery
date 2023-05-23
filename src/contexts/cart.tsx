'use client';

import MerchantAccount from '@/@types/account';
import { CartItem, OrderForm, Transaction } from '@/@types/cart';
import { storeTransaction } from '@/firebase/db/transaction';
import { Timestamp } from 'firebase/firestore';
import { createContext, useState, useEffect } from 'react';

export interface CartContextType {
  cart: Array<CartItem>;
  addToCart: (item: CartItem) => void;
  checkout: (values: OrderForm) => Promise<void>;
  changeQty: (id: string, qty: number | string) => void;
  subtotal: number;
  totalItems: number;
}

export const CartContext = createContext<CartContextType | null>(null);

export function CartContextProvider({
  merchant,
  children,
}: {
  merchant: MerchantAccount;
  children: React.ReactNode;
}) {
  const [cart, setCart] = useState<Array<CartItem>>([]);

  const totalItems: number = cart.reduce((a, b) => a + b.qty, 0);
  const subtotal: number = cart.reduce((a, b) => a + b.price * b.qty, 0);

  useEffect(() => {
    const cartStorage = localStorage.getItem('cart');
    if (cartStorage) {
      setCart(JSON.parse(cartStorage));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addToCart = (item: CartItem) => {
    const _items = [...cart, item];
    setCart(_items);

    localStorage.setItem('cart', JSON.stringify(_items));
  };

  const deleteFromCart = (id: string) => {
    const _cart = cart.filter((c) => c.id !== id);
    setCart(_cart);
    localStorage.setItem('cart', JSON.stringify(_cart));
  };

  const changeQty = (id: string, qty: number | string) => {
    const item: CartItem | undefined = cart.find((c) => c.id === id);

    if (!item) {
      return;
    }

    let _qty = item.qty;
    if (qty === '+') {
      _qty++;
    } else if (qty === '-') {
      _qty--;
    } else if (qty) {
      _qty = qty as number;
    }

    if (!qty || _qty < 1) {
      // Delete item
      deleteFromCart(id);
      return;
    }

    setCart(
      cart.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            qty: _qty,
          };
        }
        return item;
      })
    );
  };

  const checkout = async (orderForm: OrderForm) => {
    try {
      const transaction: Transaction = {
        ...orderForm,
        createdAt: Timestamp.fromDate(new Date()),
        items: cart,
        merchantId: merchant.id!,
        total: subtotal,
      };

      const message: string = await storeTransaction(merchant, transaction);
      window.open(message, '_blank');
      setCart([]);
      localStorage.removeItem('cart');
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        changeQty,
        subtotal,
        totalItems,
        checkout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
