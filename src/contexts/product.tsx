import { createContext, useContext, useEffect, useState } from 'react';
import Category from '@/@types/category';
import Product from '@/@types/product';
import { merchantCategories, merchantProducts } from '@/firebase/db/product';
import { MerchantContext, MerchantContextType } from './merchant';

export interface ProductContextType {
  initializing: boolean;
  categories: Array<Category>;
  products: Array<Product>;
}

export const ProductContext = createContext<ProductContextType | null>(null);

export function ProductContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { merchant } = useContext(MerchantContext) as MerchantContextType;

  const [initializing, setInitializing] = useState<boolean>(true);
  const [categories, setCategories] = useState<Array<Category>>([]);
  const [products, setProducts] = useState<Array<Product>>([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const _products = await merchantProducts(merchant.id!);
        setProducts(_products);

        let _categories = await merchantCategories(merchant.id!);

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
  }, [merchant]);

  return (
    <ProductContext.Provider
      value={{
        initializing,
        categories,
        products,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}
