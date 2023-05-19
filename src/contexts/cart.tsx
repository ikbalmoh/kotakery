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
        setInitializing(false);
      } catch (error) {
        setInitializing(false);
      }
    };

    loadProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addToCart = (item: CartItem) => {
    setCart([...cart, item]);
  };

  return (
    <CartContext.Provider
      value={{ initializing, categories, products, cart, addToCart }}
    >
      {children}
    </CartContext.Provider>
  );
}
