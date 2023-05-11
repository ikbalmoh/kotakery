export interface merchantData {
  name?: string;
  username?: string;
  address?: string;
  phone?: string;
}

export interface accountData {
  name?: string;
  email?: string;
  phone?: string;
}

export interface merchantAccount extends merchantData {
  owner: accountData;
}
