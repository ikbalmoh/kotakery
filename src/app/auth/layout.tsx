'use client';

import { RecaptchaProvider, RecaptchaContext } from '@/contexts/recaptcha';
import { Inter } from 'next/font/google';
import NextTopLoader from 'nextjs-toploader';

import '@/app/globals.css';
import { Toaster } from 'react-hot-toast';
const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RecaptchaProvider>
      <html lang="en">
        <body
          suppressHydrationWarning={true}
          className={`${inter.className} min-h-screen flex flex-col bg-slate-100 text-slate-600`}
        >
          <NextTopLoader color="#f75728" />
          <main className="flex flex-col justify-center items-center flex-1 py-8">
            {children}
          </main>
          <footer className="text-center py-5 text-slate-500 text-xs">
            © Kotakery 2023
          </footer>
          <RecaptchaContext.Consumer>
            {(context) => {
              return (
                <div ref={context?.ref}>
                  <div id="recaptcha-container"></div>
                </div>
              );
            }}
          </RecaptchaContext.Consumer>
          <Toaster toastOptions={{ duration: 3000 }} />
        </body>
      </html>
    </RecaptchaProvider>
  );
}
