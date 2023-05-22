'use client';

import MerchantAccount from '@/@types/account';
import { CartItem } from '@/@types/cart';
import { createContext, useState, useEffect } from 'react';

interface OrderForm {
  name: string;
  phoneNumber: string;
  address: string;
  paymentMethod: string;
}
export interface CartContextType {
  cart: Array<CartItem>;
  addToCart: (item: CartItem) => void;
  checkout: (values: OrderForm) => void;
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

  const deleteFromCart = (id: string) =>
    setCart(cart.filter((c) => c.id !== id));

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

  const checkout = (orderForm: OrderForm) => {
    let message: string = `Halo *${merchant.name}*\n\n`;
    message += 'Saya mau order dengan rincian sebagai berikut:\n';
    message += `Nama: *${orderForm.name}*\n`;
    message += `No. WA: *${orderForm.phoneNumber}*\n`;
    message += `Alamat Pengiriman: *${orderForm.address}*\n`;
    message += `Pembayaran: *${orderForm.paymentMethod}*\n\n`;
    message += `Dafar pesanan:\n`;
    cart.forEach((item) => {
      message += `*${item.qty}* x ${item.name} (${item.unit})\n`;
    });
    message = encodeURIComponent(message);
    const phoneNumber: string = merchant.phone!.replace('+', '');
    let url = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(url, '_blank');
  };

  const totalItems: number = cart.reduce((a, b) => a + b.qty, 0);
  const subtotal: number = cart.reduce((a, b) => a + b.price * b.qty, 0);

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
