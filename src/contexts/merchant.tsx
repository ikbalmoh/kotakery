import React, { useState, createContext } from 'react';
import MerchantAccount from '@/@types/account';

export interface MerchantContextType {
  merchant: MerchantAccount;
}

export const MerchantContext = createContext<MerchantContextType | null>(null);

export function MerchantProvider({
  children,
  merchant,
}: {
  children: React.ReactNode;
  merchant: MerchantAccount;
}) {
  return (
    <MerchantContext.Provider value={{ merchant }}>
      {children}
    </MerchantContext.Provider>
  );
}

export default MerchantProvider;
