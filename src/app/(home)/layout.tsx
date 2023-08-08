import '../globals.css';
import { Inter } from 'next/font/google';
import NextTopLoader from 'nextjs-toploader';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Kotakery',
  description: 'Kotakery',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Navbar />
        <NextTopLoader color='#f75728' />
        <img
          src='/background.png'
          loading='lazy'
          width='1000'
          height='1200'
          alt=''
          className='absolute bottom-0 z-[-1] w-full top-0 h-[1200px]'
        />
        {children}
      </body>
      <Footer />
    </html>
  );
}
