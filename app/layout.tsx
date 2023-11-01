import { ThemeProvider } from '@/components/ThemeProvider';
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
        elements: {
          formButtonPrimary: 'bg-primary hover:bg-primary-focus text-primary-foreground normal-case text-sm',
          formFieldErrorText: 'text-error',
          formFieldWarningText: 'text-warning',
          formFieldSuccessText: 'text-success',
          footerActionLink: 'text-primary hover:text-primary-focus',
          identityPreviewEditButton: 'text-primary hover:text-primary-focus',
          formResendCodeLink: 'text-primary hover:text-primary-focus',
          profileSectionPrimaryButton: 'text-primary',
          badge: 'bg-primary text-primary-foreground',
          avatarImageActionsUpload: 'text-primary',
          avatarImageActionsRemove: 'text-error',
          formButtonReset: 'hover:bg-primary text-primary hover:text-primary-foreground normal-case',
          userPreviewMainIdentifier: "text-muted-focus",
        },
        layout: {
          socialButtonsPlacement: 'bottom',
          socialButtonsVariant: 'iconButton'
        },
      }}>
      <html lang="en">
        <body className={inter.className}>
          <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
