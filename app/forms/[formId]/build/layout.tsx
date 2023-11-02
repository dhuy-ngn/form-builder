import NavBar from '@/components/NavBar';
import { ThemeProvider } from '@/providers/ThemeProvider';
import type { ReactNode } from 'react';

type BuilderLayoutProps = {
  children: ReactNode;
};

function BuilderLayout({ children }: BuilderLayoutProps) {

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

export default BuilderLayout;