'use client';

import type { ReactNode } from 'react';

import { androidTarget } from '../lib/download';
import { copyRoomCode } from '../lib/room';
import { SITE_SOURCE, currentSource, playUrlFor } from '../lib/source';
import { isPlainClick } from './storeClick';

export default function PlayStoreLink({
  className,
  ariaLabel,
  source = SITE_SOURCE,
  roomCode = null,
  children
}: {
  className?: string;
  ariaLabel?: string;
  source?: string;
  roomCode?: string | null;
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
        const target = playUrlFor(currentSource(source), roomCode);
        void copyRoomCode(roomCode).finally(() => {
          window.location.href = target;
        });
      }}
    >
      {children}
    </a>
  );
}
