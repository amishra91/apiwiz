import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';

import { siteConfig } from '@/config/site';

const roboto = Roboto({
  subsets: ['latin'],
  weight: '400',
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`bg-body ${roboto.className}`}>{children}</body>
    </html>
  );
}
