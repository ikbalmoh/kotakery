import {
  DocumentData,
  QueryDocumentSnapshot,
  SnapshotOptions,
  Timestamp,
} from 'firebase/firestore';

export default interface Product {
  id?: string;
  merchantId?: string;
  categoryId: string;
  name: string;
  price: number;
  unit: string;
  description?: string;
  isAvailable?: boolean;
  createdAt?: Timestamp;
  updatedAt?: Timestamp | null;
}

export const productConverter = {
  toFirestore(product: Product): DocumentData {
    return { name: product.name };
  },

  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): Product {
    const data = snapshot.data(options)!;
    return {
      id: snapshot.id,
      name: data.name,
      price: data.price,
      unit: data.unit,
      categoryId: data.categoryId,
      isAvailable: data.isAvailable,
    };
  },
};
