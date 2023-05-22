import { createContext, useEffect, useState } from 'react';
import Category from '@/@types/category';
import Product from '@/@types/product';
import { merchantCategories, merchantProducts } from '@/firebase/db/product';

export interface ProductContextType {
  initializing: boolean;
  categories: Array<Category>;
  products: Array<Product>;
  favorites: Array<string>;
}

export const ProductContext = createContext<ProductContextType | null>(null);

export function ProductContextProvider({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  const [initializing, setInitializing] = useState<boolean>(true);
  const [categories, setCategories] = useState<Array<Category>>([]);
  const [products, setProducts] = useState<Array<Product>>([]);
  const [favorites, setFavorites] = useState<Array<string>>([]);

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
        setInitializing(false);
      } catch (error) {
        setInitializing(false);
      }
    };

    loadProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ProductContext.Provider
      value={{
        initializing,
        categories,
        products,
        favorites,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}
