import '@/app/globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Kotakery Merchant Authentication',
  description: 'Signin to Kotakery Dashboard',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} min-h-screen flex flex-col bg-slate-100 text-slate-600`}
      >
        <main className="flex flex-col justify-center items-center flex-1 ">
          {children}
        </main>
        <footer className="text-center py-5 text-slate-500 text-xs">
          © Kotakery 2023
        </footer>
        <div id="recaptcha-container"></div>
      </body>
    </html>
  );
}
