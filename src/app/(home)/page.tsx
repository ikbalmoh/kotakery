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
      />
      <h1 className="text-3xl font-bold text-red-500 intro-x mt-5">Kotakery</h1>
      <div className="text-sm text-slate-500 mt-2">MERCHANT</div>
      <div className="mt-10">
        <Link href={'/auth/signin'} className="btn btn-transparent">
          MASUK
        </Link>
      </div>
    </main>
  );
}
