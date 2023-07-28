import Link from 'next/link'
import Image from 'next/image'
import Button from '@/components/Button';

export default function Navbar() {
  return (
    <nav className='bg-white sticky top-0 z-10'>
      <div className='container mx-auto px-4 max-w-[1244px]'>
        <div className='flex items-center justify-between h-16'>
          <div className='flex items-center'>
            <Link href='#' className='text-white text-lg font-semibold'>
              <Image
                src={'/kotakery-logo-with-text.svg'}
                height={130}
                width={130}
                alt='Kotakery'
                className='mr-3'
              />
            </Link>
          </div>
          <div className='flex items-center'>
            <div className='hidden md:block'>
              <Link
                href={'/auth/signin'}
                className='btn btn-transparent intro-y mx-2'
              >
                MASUK
              </Link>
              <Link
                href={'/auth/signup'}
                className='btn btn-transparent intro-y mx-2'
              >
                DAFTAR
              </Link>
              <Button transparent danger label='Masuk' formTarget={'/auth/signin'}/>
            </div>
          </div>
          <div className='-mr-2 flex md:hidden'>
            <button className='text-gray-400 hover:text-white focus:outline-none focus:text-white'>
              <svg
                className='h-6 w-6'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                stroke-width='2'
                stroke-linecap='round'
                stroke-linejoin='round'
              >
                <path d='M4 6h16M4 12h16M4 18h16'></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}