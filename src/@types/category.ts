import {
  DocumentData,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from 'firebase/firestore';
import Product from './product';

export default interface Category {
  id?: string | null;
  merchantId?: string;
  name: string;
  items?: Array<Product>;
  slug?: string;
}

export const categoryConverter = {
  toFirestore(category: Category): DocumentData {
    return { name: category.name, merchantId: category.merchantId };
  },

  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): Category {
    const data = snapshot.data(options)!;
    return {
      id: snapshot.id,
      name: data.name,
      merchantId: data.merchantId,
      slug: data.name.toLowerCase().replaceAll(' ', '-'),
    };
  },
};
