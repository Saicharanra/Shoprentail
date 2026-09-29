import type { Metadata } from 'next';
import './globals.css';
import { ClientLayoutWrapper } from '../components/ClientLayoutWrapper';

export const metadata: Metadata = {
  title: 'FreshKart - Everyday Essentials. Better Prices.',
  description: 'FreshKart is India\'s trusted online supermarket for fresh groceries, fruits, vegetables, dairy, staples & household essentials with 2-hour express delivery in Hyderabad.',
  keywords: ['supermarket', 'online grocery hyderabad', 'fresh vegetables', 'aashirvaad atta', 'amul milk', 'freshkart', 'daily essentials'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-white text-neutral-900">
        <ClientLayoutWrapper>
          {children}
        </ClientLayoutWrapper>
      </body>
    </html>
  );
}
