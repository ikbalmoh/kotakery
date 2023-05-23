import {
  DocumentData,
  QueryDocumentSnapshot,
  SnapshotOptions,
  Timestamp,
} from 'firebase/firestore';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  qty: number;
  note?: string;
  unit: string;
}

export interface OrderForm {
  name: string;
  phoneNumber: string;
  address: string;
  paymentMethod: string;
}

export interface Transaction extends OrderForm {
  orderNo?: string;
  merchantId: string;
  items: Array<CartItem>;
  createdAt: Timestamp;
  total: number;
}

export const transactionConverter = {
  toFirestore(transaction: Transaction): DocumentData {
    return {
      merchantId: transaction.merchantId,
      createdAt: transaction.createdAt,
      name: transaction.name,
      phoneNumber: transaction.phoneNumber,
      address: transaction.address,
      paymentMethod: transaction.paymentMethod,
      total: transaction.total,
    };
  },

  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): Transaction {
    const data = snapshot.data(options)!;
    return {
      merchantId: data.merchantId,
      createdAt: data.createdAt.toDate(),
      name: data.name,
      phoneNumber: data.phoneNumber,
      address: data.address,
      paymentMethod: data.paymentMethod,
      total: data.total,
      items: data.items,
    };
  },
};
