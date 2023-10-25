import { ButtonHTMLAttributes } from 'react';
import { classNames } from '@/utils/helpers';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  href: string;
  label: string;
  dark?: boolean;
}

const Cta = ({ href, label, dark }: ButtonProps) => {
  let className = classNames(
    'w-full rounded-xl p-5 md:p-8 group transition-transform scale-100 hover:scale-105',
    dark ? 'bg-[#07133B] hover:bg-[#0F2057]' : 'bg-[#F54C30] hover:bg-[#FF5F44]'
  );

  return (
    <Link className={className} href={href}>
      <div className="text-white">
        <span className="text-base font-light leading-4">Cara</span>
        <h4 className="text-2xl font-semibold mt-[10px] mb-[30px] leading-6">
          {label}
        </h4>
        <div className="flex justify-between text-sm">
          <span>Selengkapnya</span>
          <ArrowRightIcon className="ml-2 w-9 h-6 group-hover:w-6 ease-in-out duration-300" />
        </div>
      </div>
    </Link>
  );
};
export default Cta;
