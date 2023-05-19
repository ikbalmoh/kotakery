import {
  DocumentData,
  QueryDocumentSnapshot,
  SnapshotOptions,
  Timestamp,
} from 'firebase/firestore';

export interface MerchantData {
  id?: string;
  name?: string;
  username?: string;
  address?: string;
  phone?: string;
  description?: string;
}

export interface AccountData {
  name?: string;
  email?: string;
  phone?: string;
}

export default interface MerchantAccount extends MerchantData {
  owner: AccountData;
  joinedAt?: Timestamp;
  lastActivity?: Timestamp;
}

export const merchantAccountConverter = {
  toFirestore(product: MerchantAccount): DocumentData {
    return { name: product.name };
  },

  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): MerchantAccount {
    const data = snapshot.data(options)!;
    return {
      id: snapshot.id,
      name: data.name,
      username: data.username,
      address: data.address,
      phone: data.phone,
      owner: data.owner,
      lastActivity: data.lastActivity?.toDate(),
      joinedAt: data.joinedAt?.toDate(),
    };
  },
};
