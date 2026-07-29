import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Potwierdzenie zapisu',
  robots: { index: false, follow: false }
};

export default function ConfirmLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
