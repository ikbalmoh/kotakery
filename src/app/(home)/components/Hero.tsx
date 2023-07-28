import Image from 'next/image';
import { Poppins } from 'next/font/google';

const poppins = Poppins({ subsets: ['latin'], weight: '400' });

export default function Hero() {
  return (
    <div className='flex-col lg:max-h-screen lg:min-h-screen mt-5'>
      <section className='overflow-hidden'>
        <div className='container flex items-center mx-auto px-4 max-w-[1244px]'>
          <div className='max-w-[650px] w-[650px] h-[450px] intro-y relative'>
            <Image
              src={'/card-product-1.svg'}
              width={255}
              height={366}
              alt='Hero Image'
              className='floating-card-1 absolute left-[-15px] top-[40px]'
            />
            <Image
              src={'/card-product-2.svg'}
              width={255}
              height={366}
              alt='Hero Image'
              className='floating-card-4 absolute right-[30px] bottom-[60px]'
            />
            <Image
              src={'/arrow-image.svg'}
              width={420}
              height={266}
              alt='Hero Image'
              className='floating-element absolute left-[100px] top-[40px]'
            />
            <Image
              src={'/card-product-3.svg'}
              width={255}
              height={366}
              alt='Hero Image'
              className='floating-card-2 absolute left-[110px] bottom-[35px]'
            />
            <Image
              src={'/card-product-4.svg'}
              width={255}
              height={366}
              alt='Hero Image'
              className='floating-card-3 absolute right-[170px] top-[17px]'
            />
          </div>
          <div className='flex-col w-[486px] ml-[40px]'>
            <h1 className='mt-1 text-[45px] leading-[60px] tracking-tight text-[#07133B]'>
              Kembangkan bisnis Anda dengan Solusi Baru Kelola Pesanan
            </h1>
            <p
              className={`${poppins.className} text-[16px] leading-[20px] mt-[30px] text-[#262326]`}
            >
              Cara termudah dan tercepat untuk kelola produk, pesanan, stok, dan
              chat pelanggan dari berbagai tempat. Hemat waktu dan biaya untuk
              tingkatkan keuntungan penjualan
            </p>
          </div>
        </div>
      </section>
      <section className='overflow-hidden'>
        <div className='container flex items-center mx-auto px-4 max-w-[1244px] justify-between'>
          <div className='flex max-w-[620px] w-[620px] justify-between'>
            <div className='flex-col text-center max-w-[170px]'>
              <h4
                className={`${poppins.className} text-[22px] leading-[34px] font-[600] mb-[16px]`}
              >
                Cepat
              </h4>
              <p
                className={`${poppins.className} text-[14px] leading-[21px] text-[#394262]`}
              >
                Kemudahan pelanggan mengisi pesanan lewat katalog produk
              </p>
            </div>
            <div className='flex-col text-center max-w-[170px]'>
              <h4
                className={`${poppins.className} text-[22px] leading-[34px] font-[600] mb-[16px]`}
              >
                Fleksibel
              </h4>
              <p
                className={`${poppins.className} text-[14px] leading-[21px] text-[#394262]`}
              >
                Fleksibel dalam mengatur setiap pesanan
              </p>
            </div>
            <div className='flex-col text-center max-w-[170px]'>
              <h4
                className={`${poppins.className} text-[22px] leading-[34px] font-[600] mb-[16px]`}
              >
                Promotif
              </h4>
              <p
                className={`${poppins.className} text-[14px] leading-[21px] text-[#394262]`}
              >
                Tampilkan produk-produk terbaik untuk dilihat banyak orang
              </p>
            </div>
          </div>
          <div className='flex justify-between w-[486px] ml-[40px]'>
            <button className='bg-[#F54C30] rounded-xl h-[192px] w-[233px]'>
              <span className='text-white'>Gabung Merchant</span>
            </button>
            <button className='bg-[#07133B] rounded-xl h-[192px] w-[233px]'>
              <span className='text-white'>Gabung Merchant</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
