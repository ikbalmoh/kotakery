import Link from "next/link";
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  href: string;
}

const Cta = ({ href }: ButtonProps) => {
  return (
    <Link href={href}>
      <span>Cara</span>
      <span>Joint Merchant</span>
      <div className='flex justify-between'>
        <span>Selengkapnya</span>
        <ArrowRightIcon className='w-6 h-6' />
      </div>
    </Link>
  );
};
export default Cta