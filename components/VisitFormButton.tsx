"use client";

import { ExternalLink } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from './ui/button';

type VisitFormButtonProps = {
  shareUrl: string;
};
export default function VisitFormButton({
  shareUrl
}: VisitFormButtonProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const shareLink = `${window.location.origin}/submit/${shareUrl}`;
  return (
    <Button
      className="w-[200px] flex flex-row gap-2"
      onClick={() => {
        window.open(shareLink, "_blank");
      }}
    >
      View Form details
      <ExternalLink className='h-4 w-4' />
    </Button>
  );
}
