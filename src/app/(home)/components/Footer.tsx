import { Poppins } from 'next/font/google';
import Image from 'next/image';

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '600'] });

export default function Footer() {
  return (
    <footer className="container mx-auto px-4 max-w-[1440px]">
      <div className="items-center justify-between bg-[#07133B] rounded-[20px] pb-10 mb-4">
        <div className="container px-10 mx-auto pt-[72px] pb-[35px] max-w-[1244px] grid grid-cols-12">
          <div
            className={`${poppins.className} col-span-12 md:col-span-6 xl:col-span-3 leading-5 text-white`}
          >
            <Image
              src="/kotakery-footer.svg"
              alt="Kotakery"
              className="mb-4"
              width={130}
              height={30}
            />
            <p className="text-xs">info@kotakery.com</p>
            <p className="text-xs">(941) 867-1761</p>
          </div>
          <div className="col-span-12 md:col-span-6 xl:col-span-3">
            <ul className="flex flex-col space-y-3 text-[#83899D]">
              <li className="text-white">Kotakery</li>
              <li>
                <a href="#" className="text-xs hover:text-white">
                  Tentang
                </a>
              </li>
              <li>
                <a href="#" className="text-xs hover:text-white">
                  Blog
                </a>
              </li>
            </ul>
          </div>
          <div className="col-span-12 md:col-span-6 xl:col-span-3">
            <ul className="flex flex-col space-y-3 text-[#83899D]">
              <li className="text-white">Layanan</li>
              <li>
                <a href="#" className="text-xs hover:hover:text-white">
                  Merchan
                </a>
              </li>
            </ul>
          </div>
          <div className="col-span-12 md:col-span-6 xl:col-span-3">
            <p
              className={`${poppins.className} text-sm leading-6 text-[#83899D]`}
            >
              Jl. Ahmad Yani Timur No.502, Sucikaler, Kec. Karangpawitan,
              Kabupaten Garut, Jawa Barat 44182
            </p>
          </div>
        </div>
        <div className="container flex justify-between px-10 mx-auto max-w-[1244px] pb-[24px] border-b-2 border-[#202B4F]">
          <span
            className={`${poppins.className} text-xs leading-5 text-[#83899D]`}
          >
            All rights reserved. © 2023 Kotakery
          </span>
          <span
            className={`${poppins.className} text-xs leading-5 text-[#83899D] flex`}
          >
            <a href="#" className="mr-5 hover:text-white">
              Terms & Conditions
            </a>
            <a href="#" className="hover:text-white">
              Privacy Policy
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
