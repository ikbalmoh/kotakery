import { Transaction } from '@/@types/cart';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import db from './db';
import { TRANSACTION_DB } from './const';
import MerchantAccount from '@/@types/account';

export const storeTransaction = async (
  merchant: MerchantAccount,
  transaction: Transaction
) => {
  const prefix: string = merchant
    .name!.split(' ')
    .map((name) => name.charAt(0))
    .join('')
    .toUpperCase();

  const q = query(
    collection(db, 'transactions'),
    where('merchantId', '==', merchant.id)
  );
  const querySnapshot = await getDocs(q);

  const date: Date = new Date();
  let orderNo: string = `${date.getFullYear()}${date.getMonth()}${date.getDay()}${
    querySnapshot.size
  }`;

  orderNo = `${prefix}${orderNo}`;

  transaction.orderNo = orderNo;
  await addDoc(collection(db, TRANSACTION_DB), transaction);

  let message: string = `Halo *${merchant.name}*\n\n`;
  message += 'Saya mau order dengan rincian sebagai berikut:\n';
  message += `No. Order: *${orderNo}*\n`;
  message += `Nama: *${transaction.name}*\n`;
  message += `No. WA: *${transaction.phoneNumber}*\n`;
  message += `Alamat Pengiriman: *${transaction.address}*\n`;
  message += `Pembayaran: *${transaction.paymentMethod}*\n\n`;
  message += `Dafar pesanan:\n`;
  transaction.items.forEach((item) => {
    message += `*${item.qty}* x ${item.name} (${item.unit})\n`;
  });
  message = encodeURIComponent(message);
  const phoneNumber: string = merchant.phone!.replace('+', '');

  return `https://wa.me/${phoneNumber}?text=${message}`;
};
