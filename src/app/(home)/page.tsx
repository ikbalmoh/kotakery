import Image from 'next/image';
import Link from 'next/link';
import Hero from './components/Hero';

export default function Home() {
  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center text-slate-600">
      <Hero/>
    </main>
  );
}
