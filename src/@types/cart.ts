export interface CartItem {
  id: string;
  name: string;
  price: number;
  qty: number;
  note?: string;
  unit: string;
}

export interface Customer {
  name: string;
  phoneNumber: string;
  address: string;
}
