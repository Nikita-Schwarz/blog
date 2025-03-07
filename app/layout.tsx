import type { Metadata } from 'next';
import { Noto_Sans } from 'next/font/google';
import './globals.css';
import Sidebar from '@/components/sidebar';
import Header from '@/components/header';

const noto = Noto_Sans({
  subsets: ['cyrillic'],
});

export const metadata: Metadata = {
  title: 'Главная',
  description: 'Блог о походах по Краснодарскому краю',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${noto.className} antialiased`}>
        <Sidebar />
        <Header />
        <main className="mt-9 ml-0 lg:ml-52">
          <div className="mx-auto max-w-5xl px-6 pt-6">{children}</div>
        </main>
      </body>
    </html>
  );
}
