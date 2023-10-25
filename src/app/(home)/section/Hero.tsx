import Image from 'next/image';
import { Poppins } from 'next/font/google';
import Cta from '../components/Cta';

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '600'] });

export default function Hero() {
  return (
    <>
      <section className="px-4">
        <div className="grid grid-cols-12 gap-6 lg:gap-10 mx-auto px-4 pt-5">
          <div className="col-span-12 lg:col-span-7 h-[450px] intro-y relative">
            <Image
              src={'/card-product-1.svg'}
              width={255}
              height={366}
              alt="Hero Image"
              className="floating-card-1 absolute left-[-15px] top-[40px] hidden md:block w-auto h-auto"
            />
            <Image
              src={'/card-product-2.svg'}
              width={255}
              height={366}
              alt="Hero Image"
              className="floating-card-4 absolute right-[30px] bottom-[60px] hidden md:block w-auto h-auto"
            />
            <Image
              src={'/arrow-image.svg'}
              width={420}
              height={266}
              alt="Hero Image"
              className="floating-element absolute left-2 md:left-[100px] top-[80px] md:top-[40px] w-auto h-auto"
            />
            <Image
              src={'/card-product-3.svg'}
              width={255}
              height={366}
              alt="Hero Image"
              className="floating-card-2 absolute left-[110px] bottom-[35px] w-auto h-auto"
            />
            <Image
              src={'/card-product-4.svg'}
              width={255}
              height={366}
              alt="Hero Image"
              className="floating-card-3 absolute right-[150px] md:right-[170px] top-[17px] w-auto h-auto"
            />
          </div>
          <div className="flex flex-col justify-center col-span-12 lg:col-span-5">
            <h1 className="mt-1 text-2xl md:text-4xl md:leading-10 tracking-tight font-semibold text-[#07133B]">
              Kembangkan bisnis Anda dengan Solusi Baru Kelola Pesanan
            </h1>
            <p
              className={`${poppins.className} text-base leading-[20px] mt-[30px] text-[#262326]`}
            >
              Cara termudah dan tercepat untuk kelola produk, pesanan, stok, dan
              chat pelanggan dari berbagai tempat. Hemat waktu dan biaya untuk
              tingkatkan keuntungan penjualan
            </p>
          </div>
        </div>
      </section>
      <section className="p-4 mb-[90px] mt-[80px] md:mt-10">
        <div className="grid grid-cols-12 gap-6 items-center mx-auto px-4 justify-between">
          <div className="col-span-12 md:col-span-7 flex justify-between">
            <div className="flex-col text-center flex">
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
            <div className="flex-col text-center flex">
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
            <div className="flex-col text-center flex">
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
          <div className="col-span-12 md:col-span-5 flex justify-between">
            <div className="grid grid-cols-2 grid-flow-col gap-4">
              <Cta href="/auth/signin" label="Gabung Merchant"></Cta>
              <Cta dark href="/auth/signup" label="Daftar Merchant"></Cta>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
