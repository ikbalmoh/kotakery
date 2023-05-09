'use client';

import { signOut } from '@/firebase/auth';

export default function Navbar() {
  const onSignout = async () => {
    await signOut();
  };
  return (
    <nav className="border-b dark:border-b-gray-400/50">
      <div className="container mx-auto py-5 flex items-center">
        <h1 className="font-semibold text-base text-red-500">Kotakery</h1>
        <button
          className="btn btn-transparent ml-auto"
          type="button"
          onClick={onSignout}
        >
          Keluar
        </button>
      </div>
    </nav>
  );
}
