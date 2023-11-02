import NavBar from '@/components/NavBar';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { Inter } from 'next/font/google';
import '../../app/globals.css';

const inter = Inter({ subsets: ['latin'] });

export default function DashboardLayout({
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
      <NavBar />
      {children}
    </ThemeProvider>
  );
}
