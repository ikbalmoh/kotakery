import React from 'react';
import Image from 'next/image';
import { classNames } from '@/utils/helpers';
import { Parisienne } from 'next/font/google';

const parisienne = Parisienne({
  weight: '400',
  subsets: ['latin'],
});

type Props = {
  image?: string | null;
  name: string;
  className?: string;
};

export default function ProductImage({ image, name, className }: Props) {
  return image ? (
    <Image
      alt="image"
      fill
      style={{
        objectFit: 'cover',
        width: '100%',
        height: '100%',
      }}
      src={image as string}
      className={className}
    />
  ) : (
    <div
      className={classNames(
        'flex items-center justify-center w-full h-full text-slate-500 text-2xl truncate px-5 select-none',
        parisienne.className,
        className ?? ''
      )}
    >
      {name.split(' ').at(0)?.slice(0, 8)}
    </div>
  );
}
