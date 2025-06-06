import { Inter } from 'next/font/google';
import './globals.scss';
import type { Metadata } from 'next';
import { AppLayout } from '@/components/layout/AppLayout/AppLayout';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Abelohost Shop',
  description: 'Your one-stop shop for electronics and accessories',
  keywords: 'electronics, gadgets, laptops, smartphones, cameras, accessories',
  authors: [{ name: 'Abelohost Shop Team' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppLayout>
          {children}
        </AppLayout>
      </body>
    </html>
  );
}
