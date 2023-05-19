'use client';

import { CartItem } from '@/@types/cart';
import Category from '@/@types/category';
import Product from '@/@types/product';
import { merchantCategories, merchantProducts } from '@/firebase/db/product';
import { createContext, useState, useEffect } from 'react';

export interface CartContextType {
  initializing: boolean;
  categories: Array<Category>;
  products: Array<Product>;
  cart: Array<CartItem>;
  addToCart: (item: CartItem) => void;
  changeQty: (id: string, qty: number | string) => void;
}

export const CartContext = createContext<CartContextType | null>(null);

export function CartContextProvider({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  const [categories, setCategories] = useState<Array<Category>>([]);
  const [products, setProducts] = useState<Array<Product>>([]);
  const [initializing, setInitializing] = useState<boolean>(true);

  const [cart, setCart] = useState<Array<CartItem>>([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const _products = await merchantProducts(id);
        setProducts(_products);

        let _categories = await merchantCategories(id);

        _categories = _categories
          .map((category) => {
            const _productCategories = _products.filter(
              (p) => p.categoryId === category.id
            );
            category.items = _productCategories;
            return category;
          })
          .filter((c) => c.items && c.items.length > 0);

        setCategories(_categories);

        const cartStorage = localStorage.getItem('cart');
        if (cartStorage) {
          setCart(JSON.parse(cartStorage));
        }

        setInitializing(false);
      } catch (error) {
        setInitializing(false);
      }
    };

    loadProducts();
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

  return (
    <CartContext.Provider
      value={{ initializing, categories, products, cart, addToCart, changeQty }}
    >
      {children}
    </CartContext.Provider>
  );
}
