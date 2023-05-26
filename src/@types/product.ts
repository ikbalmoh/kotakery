import {
  DocumentData,
  QueryDocumentSnapshot,
  SnapshotOptions,
  Timestamp,
} from 'firebase/firestore';
import { getDownloadURL } from 'firebase/storage';

export default interface Product {
  id?: string;
  merchantId?: string;
  categoryId: string;
  image?: string | File;
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
      image: data.image ?? undefined,
      name: data.name,
      price: data.price,
      unit: data.unit,
      categoryId: data.categoryId,
      isAvailable: data.isAvailable,
    };
  },
};
