import { ThemeProvider } from '@/components/ThemeProvider';
import { Inter } from 'next/font/google';
import '../../app/globals.css';

const inter = Inter({ subsets: ['latin'] });

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider
      attribute='class'
      defaultTheme='system'
      enableSystem
    >
      {children}
    </ThemeProvider>
  );
}
