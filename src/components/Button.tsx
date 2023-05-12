import { classNames } from '@/utils/helpers';
import Image from 'next/image';
import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  loading?: boolean;
  transparent?: boolean;
}

export default function Button({
  loading,
  transparent,
  label,
  ...props
}: ButtonProps) {
  let className = classNames(
    'btn',
    props.className ? props.className : '',
    transparent ? 'btn-transparent' : ''
  );

  return (
    <button
      {...props}
      className={className}
      disabled={loading || props.disabled}
      type={props.type ?? 'submit'}
    >
      <span>{label}</span>
      {loading && (
        <Image src={'/spinner-30.svg'} width={15} height={15} alt="loading" />
      )}
    </button>
  );
}
