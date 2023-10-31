"use client";

import RichTextEditor from '@/components/RichTextEditor';
import { ThemeToggler } from '@/components/ui/theme-toggler';

export default function Home() {
  return (
    <main>
      <RichTextEditor onChange={() => { }} />
      <ThemeToggler
        className='bg-transparent hover:bg-muted-focus border-none' />
    </main>
  );
}
