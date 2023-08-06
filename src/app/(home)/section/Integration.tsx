import { Poppins } from 'next/font/google';
import Image from 'next/image';
const poppins = Poppins({ subsets: ['latin'], weight: ['400'] });

export default function Integration() {
  return (
    <section className='px-4'>
      <div className='container mx-auto'>
        <div className='flex items-center mx-auto px-4 pt-5'>
          <div className='flex-1'>
            <div className='max-w-[489px] mb-[230px]'>
              <h2 className='mt-1 mb-6 text-[45px] leading-[60px] tracking-tight font-semibold text-[#07133B]'>
                Integrasi ke Whatsapp
              </h2>
              <p
                className={`${poppins.className} text-[16px] leading-[20px] mt-[30px] text-[#07133B]`}
              >
                Memudahkan pelanggan yang ingin memesan, tinggal liat katalog,
                Rekap pesanan langsung masuk whatsapp
              </p>
            </div>
          </div>
          <div className='flex-1'>
            <Image
              src='/Whatsapp.png'
              alt='whatsapp integrasi'
              width={455}
              height={566}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
