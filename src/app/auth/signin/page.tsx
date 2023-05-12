import SigninForm from './form';
import Image from 'next/image';

export const metadata = {
  title: 'Masuk | Kotakery Merchant',
  description: 'Masuk ke Akun Kotakery Anda',
};

export default function Signin() {
  return (
    <div className="flex flex-col md:flex-row items-center rounded-lg shadow-lg w-10/12 md:w-9/12 lg:w-7/12 xl:w-6/12 border border-slate-200 bg-white text-slate-600">
      <div className="w-full md:w-2/5 p-5 flex flex-col items-center h-full px-7 -intro-x py-10">
        <Image
          src={'/icons/kotakery-icon.png'}
          alt="kotakery logo"
          width={150}
          height={150}
          priority={false}
        />
        <h1 className="text-3xl font-bold text-red-500 intro-x mt-5">
          Kotakery
        </h1>
        <div className="text-sm text-slate-500 mt-2">MERCHANT</div>
      </div>
      <div className="w-full md:w-3/5 p-10 border-l-0 md:border-l border-slate-200">
        <SigninForm />
      </div>
    </div>
  );
}
