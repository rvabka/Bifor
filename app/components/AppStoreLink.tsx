'use client';

import { useState, type ReactNode } from 'react';

import { APP_STORE_URL } from '../lib/download';
import { blocksAppStore } from '../lib/inAppBrowser';
import OpenInSafariSheet from './OpenInSafariSheet';

// Link do App Store, który w przeglądarce TikToka na iPhonie zamiast martwego
// przejścia pokazuje drogę do Safari. Wszędzie indziej zwykły link.
export default function AppStoreLink({
  className,
  ariaLabel,
  children
}: {
  className?: string;
  ariaLabel?: string;
  children: ReactNode;
}) {
  const [sheet, setSheet] = useState(false);

  return (
    <>
      <a
        href={APP_STORE_URL}
        className={className}
        aria-label={ariaLabel}
        onClick={(e) => {
          if (!blocksAppStore(navigator.userAgent)) return;
          e.preventDefault();
          setSheet(true);
        }}
      >
        {children}
      </a>
      {sheet && <OpenInSafariSheet onClose={() => setSheet(false)} />}
    </>
  );
}
