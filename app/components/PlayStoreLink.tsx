'use client';

import type { ReactNode } from 'react';

import { androidTarget } from '../lib/download';
import { SITE_SOURCE, currentSource, playUrlFor } from '../lib/source';
import { isPlainClick } from './storeClick';

export default function PlayStoreLink({
  className,
  ariaLabel,
  source = SITE_SOURCE,
  children
}: {
  className?: string;
  ariaLabel?: string;
  source?: string;
  children: ReactNode;
}) {
  return (
    <a
      href={androidTarget}
      className={className}
      aria-label={ariaLabel}
      onClick={(e) => {
        if (!isPlainClick(e)) return;
        e.preventDefault();
        window.location.href = playUrlFor(currentSource(source));
      }}
    >
      {children}
    </a>
  );
}
