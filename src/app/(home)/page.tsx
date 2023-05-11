import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center text-slate-600">
      <Image
        src={'/icons/kotakery-icon.png'}
        alt="kotakery logo"
        width={150}
        height={150}
        className="intro-y"
      />
      <h1 className="text-3xl font-bold text-red-500 intro-y mt-5">Kotakery</h1>
      <div className="text-sm text-slate-500 mt-2 intro-y">MERCHANT</div>
      <div className="mt-10 flex items-center">
        <Link
          href={'/auth/signin'}
          className="btn btn-transparent intro-y mx-2"
        >
          MASUK
        </Link>
        <Link
          href={'/auth/signup'}
          className="btn btn-transparent intro-y mx-2"
        >
          DAFTAR
        </Link>
      </div>
    </main>
  );
}
