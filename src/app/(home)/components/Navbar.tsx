import Link from 'next/link'
import Image from 'next/image'

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
                href='/auth/signin'
                className='bg-transparent border rounded border-[#F54C30] text-[#F54C30] shadow-none w-min whitespace-nowrap hover:bg-[#ffebe8] px-5 py-[5px] font-medium transition-all'
              >
                <span>Masuk</span>
              </Link>
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