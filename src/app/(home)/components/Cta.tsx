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
    'w-full rounded-xl px-[38px] py-[28px] group',
    dark ? 'bg-[#07133B] hover:bg-[#0F2057]' : 'bg-[#F54C30] hover:bg-[#FF5F44]'
  );

  return (
    <Link className={className} href={href}>
      <div className='text-white'>
        <span className='text-[16px] font-light leading-4'>Cara</span>
        <h4 className='text-[23px] font-semibold mt-[10px] mb-[30px] leading-6'>
          {label}
        </h4>
        <div className='flex justify-between text-[16px]'>
          <span>Selengkapnya</span>
          <ArrowRightIcon className='w-9 h-6 group-hover:w-6 ease-in-out duration-300' />
        </div>
      </div>
    </Link>
  );
};
export default Cta
