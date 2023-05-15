import { Timestamp } from 'firebase/firestore';

export interface MerchantData {
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
