'use client';

import { useState, type ReactNode } from 'react';

import { APP_STORE_URL } from '../lib/download';
import { blocksAppStore } from '../lib/inAppBrowser';
import { SITE_SOURCE, appStoreUrlFor, currentSource } from '../lib/source';
import { copyRoomCode } from '../lib/room';
import OpenInSafariSheet from './OpenInSafariSheet';
import { isPlainClick } from './storeClick';

// Link do App Store, który w przeglądarce TikToka na iPhonie zamiast martwego
// przejścia pokazuje drogę do Safari. Wszędzie indziej zwykły link, tylko z
// oznaczeniem źródła doklejanym w chwili kliknięcia - `href` zostaje czysty dla
// robotów i podglądów linku.
export default function AppStoreLink({
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
  const [sheetSource, setSheetSource] = useState<string | null>(null);

  return (
    <>
      <a
        href={APP_STORE_URL}
        className={className}
        aria-label={ariaLabel}
        onClick={(e) => {
          if (!isPlainClick(e)) return;
          e.preventDefault();
          const from = currentSource(source);
          const copied = copyRoomCode(roomCode);
          if (blocksAppStore(navigator.userAgent)) {
            setSheetSource(from);
            return;
          }
          void copied.finally(() => {
            window.location.href = appStoreUrlFor(from);
          });
        }}
      >
        {children}
      </a>
      {sheetSource !== null && <OpenInSafariSheet source={sheetSource} onClose={() => setSheetSource(null)} />}
    </>
  );
}
