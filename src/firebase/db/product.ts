import Product, { productConverter } from '@/@types/product';
import { getCookie } from 'cookies-next';
import {
  QueryConstraint,
  Timestamp,
  addDoc,
  collection,
  doc,
  getCountFromServer,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import db from './db';
import Category from '@/@types/category';

export const getSummaries = async () => {
  const uid = getCookie('uid');

  const categoryQ = query(
    collection(db, 'categories'),
    where('merchantId', '==', uid)
  );
  const categorySnapshot = await getCountFromServer(categoryQ);

  const productQ = query(
    collection(db, 'products'),
    where('merchantId', '==', uid)
  );
  const productSnapshot = await getCountFromServer(productQ);

  return {
    categories: categorySnapshot.data().count,
    products: productSnapshot.data().count,
  };
};

export const storeProduct = async (product: Product) => {
  const uid = getCookie('uid');
  product.merchantId = uid?.toString();
  product.createdAt = Timestamp.fromDate(new Date());
  product.updatedAt = null;
  product.isAvailable = true;

  const productRef = await addDoc(collection(db, 'products'), product);
  return productRef;
};

export const storeCategory = async (name: string) => {
  const uid = getCookie('uid');

  const category: Category = {
    name,
    merchantId: uid?.toString(),
  };

  const categoryRef = await addDoc(collection(db, 'categories'), category);
  return categoryRef.id;
};

export const getCategory = async (uid: string) => {
  try {
    const path = `categories/${uid}`;
    const docSnapshot = await getDoc(doc(db, path));

    const category: Category = {
      id: docSnapshot.id,
      name: docSnapshot.data()?.name,
    };

    return category;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const merchantProducts = async (categoryId?: string | null) => {
  try {
    const uid = getCookie('uid');

    const products: Array<Product> = [];

    const whereQuery: Array<QueryConstraint> = [where('merchantId', '==', uid)];

    if (categoryId) {
      whereQuery.push(where('categoryId', '==', categoryId));
    }

    const q = query(
      collection(db, 'products').withConverter<Product>(productConverter),
      ...whereQuery
    );

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      const product: Product = doc.data();
      product.id = doc.id;

      products.push(product);
    });

    return products;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateProductAvailability = async (
  id: string,
  available: boolean
) => {
  const productRef = doc(db, 'products', id);
  return updateDoc(productRef, {
    isAvailable: available,
  });
};
