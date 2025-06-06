import { Inter } from 'next/font/google';
import './globals.scss';
import { AppLayout } from '@/components/layout/AppLayout/AppLayout';

const inter = Inter({ subsets: ['latin'] });

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
