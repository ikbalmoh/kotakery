'use client';

import Link from 'next/link';
import Image from 'next/image';
import { HeartIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function Navbar() {
  return (
    <nav className="border-b border-slate-200 bg-white sticky top-0 z-30">
      <div className="container px-4 md:px-0 mx-auto flex items-center h-16">
        <Link href={'/'} className=" mr-auto select-none flex items-center">
          <Image
            src={'/icons/icon.png'}
            width={25}
            height={25}
            alt="icon"
            className="mr-3"
          />
          <span className="text-base text-slate-700 font-semibold">
            Kotakery
          </span>
        </Link>
        <div className="ml-auto flex items-center">
          <button type="button" className="mr-3">
            <MagnifyingGlassIcon className="w-6 h-6" />
          </button>
          <button type="button">
            <HeartIcon className="w-6 h-6" />
          </button>
        </div>
      </div>
    </nav>
  );
}
