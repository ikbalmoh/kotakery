import Image from 'next/image';
import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  loading?: boolean;
}

export default function Button({ loading, label, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className="btn intro-y"
      disabled={loading || props.disabled}
    >
      <span>{label}</span>
      {loading && (
        <Image src={'/spinner-30.svg'} width={15} height={15} alt="loading" />
      )}
    </button>
  );
}
