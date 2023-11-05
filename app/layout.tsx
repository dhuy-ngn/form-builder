import FormDesignerContextProvider from '@/providers/FormDesignerContextProvider';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { ClerkProvider } from '@clerk/nextjs';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Form Builder',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: 'hsl(206 93% 64%)',
          colorDanger: 'hsl(4 93% 58%)',
          colorSuccess: 'hsl(147 83% 44%)',
          colorWarning: 'hsl(44 100% 62%)',
          colorTextOnPrimaryBackground: 'hsl(0 0% 100%)',
        },
        layout: {
          socialButtonsPlacement: 'bottom',
          socialButtonsVariant: 'iconButton'
        },
      }}>
      <html lang="en">
        <body className={inter.className}>
          <FormDesignerContextProvider>
            <ThemeProvider
              attribute='class'
              defaultTheme='system'
              enableSystem
            >
              {children}
            </ThemeProvider>
          </FormDesignerContextProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
