import { MerchantContext, MerchantContextType } from '@/contexts/merchant';
import { ProductContext, ProductContextType } from '@/contexts/product';
import { classNames } from '@/utils/helpers';
import { useScrollspy } from '@/utils/useScrollspy';
import React, { useContext } from 'react';
import {
  BuildingStorefrontIcon,
  ChatBubbleOvalLeftIcon,
  MapPinIcon,
} from '@heroicons/react/24/outline';
import Button from '@/components/Button';

type Props = {};

export default function Header({}: Props) {
  const { merchant } = useContext(MerchantContext) as MerchantContextType;
  const { categories } = useContext(ProductContext) as ProductContextType;

  const ids: string[] = categories.map((cat) => cat.slug!);

  const activeId = useScrollspy(ids, 100);

  return (
    <>
      <div className="bg-white rounded-t-lg mt-3 md:mt-5 mx-3 md:mx-0 shadow-md">
        <div className="flex p-5">
          <div className="w-20 h-20 bg-slate-200 rounded-md flex items-center justify-center mr-4">
            <BuildingStorefrontIcon className="w-8 h-8 text-gray-600" />
          </div>
          <div className="flex flex-col">
            <div className="font-semibold text-base">{merchant.name}</div>
            <div className="mt-1 text-slate-700 flex items-center">
              <MapPinIcon className="w-4 h-4 text-slate-500 mr-2" />
              <span>{merchant.address}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-3 md:mx-0 flex items-center overflow-x-auto sticky top-16 bg-white px-3 md:px-5 z-30 border-t border-slate-200/60 shadow-md rounded-b-lg scroll-invisible">
        {categories.map((c) => (
          <a
            href={`#${c.slug!}`}
            key={c.id}
            className={classNames(
              'px-3 md:px-5 py-2 md:py-3 text-xs md:text-sm whitespace-nowrap transition-all',
              activeId == c.slug
                ? 'border-b-2 border-red-600 text-gray-900 font-semibold'
                : ' text-gray-600'
            )}
          >
            {c.name}
          </a>
        ))}
      </div>
    </>
  );
}
