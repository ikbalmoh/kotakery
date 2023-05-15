import { Timestamp } from 'firebase/firestore';

export default interface Product {
  merchantId?: string;
  name: string;
  price: number;
  unit: string;
  description?: string;
  isAvailable?: boolean;
  createdAt?: Timestamp;
  updatedAt?: Timestamp | null;
}
