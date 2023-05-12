export interface MerchantData {
  name?: string;
  username?: string;
  address?: string;
  phone?: string;
}

export interface AccountData {
  name?: string;
  email?: string;
  phone?: string;
}

export interface MerchantAccount extends MerchantData {
  owner: AccountData;
}
