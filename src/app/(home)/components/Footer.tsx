
import { Poppins } from 'next/font/google';

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '600'] });

export default function Footer() {
  return (
    <footer className='container mx-auto px-4 max-w-[1440px]'>
      <div className='items-center justify-between bg-[#07133B] rounded-[20px] pb-[40px] mb-4'>
        <div className='container flex items-center px-10 mx-auto pt-[72px] pb-[35px] max-w-[1244px] justify-between'>
          <div className={`${poppins.className} w-[500px] text-[13px] leading-[20px] text-white`}>
            <img src='/kotakery-footer.svg' alt='Kotakery' className='mb-4' />
            <p>info@kotakery.com</p>
            <p>(941) 867-1761</p>
          </div>
          <div className={`${poppins.className} text-[14px] leading-[21px] text-white flex`}>
            <div className='w-[260px]'>
              <ul className='flex flex-col space-y-3 text-[#83899D]'>
                <li className='text-white'>Kotakery</li>
                <li><a href="#" className="text-[13px] hover:text-white">Tentang</a></li>
                <li><a href="#" className="text-[13px] hover:text-white">Blog</a></li>
              </ul>
            </div>
            <div className='w-[260px]'>
              <ul className='flex flex-col space-y-3 text-[#83899D]'>
                <li className='text-white'>Layanan</li>
                <li><a href="#" className="text-[13px] hover:hover:text-white">Merchan</a></li>
              </ul>
            </div>
            <div className='flex-1'>
              <p className={`${poppins.className} text-[16px] leading-[24px] text-[#83899D]`}>
                Jl. Ahmad Yani Timur No.502, Sucikaler, Kec. Karangpawitan,
                Kabupaten Garut, Jawa Barat 44182
              </p>
            </div>
          </div>
        </div>
        <div className='container flex justify-between px-10 mx-auto max-w-[1244px] pb-[24px] border-b-2 border-[#202B4F]'>
          <span className={`${poppins.className} text-[13px] leading-[20px] text-[#83899D]`}>
            All rights reserved. © 2023 Kotakery
          </span>
          <span className={`${poppins.className} text-[13px] leading-[20px] text-[#83899D] flex`}>
            <a href='#' className='mr-5 hover:text-white'>Terms & Conditions</a>
            <a href='#' className='hover:text-white'>Privacy Policy</a>
          </span>
        </div>
      </div>
    </footer>
  );
}