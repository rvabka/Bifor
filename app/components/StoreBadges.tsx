/* eslint-disable @next/next/no-img-element */
import { PLAY_URL } from '../lib/download';
import { SITE_SOURCE } from '../lib/source';
import AppStoreLink from './AppStoreLink';
import PlayStoreLink from './PlayStoreLink';

/* Oficjalne przyciski sklepów w polskiej wersji (Apple i Google wymagają ich
   grafik, własnych rysować nie wolno). PNG Google ma w sobie przezroczysty
   margines, więc jest wyższy niż SVG Apple - ujemny margines zrównuje
   widoczne przyciski do jednej wysokości. */
export default function StoreBadges({
  className = '',
  center = false,
  source = SITE_SOURCE
}: {
  className?: string;
  center?: boolean;
  source?: string;
}) {
  return (
    <div
      className={`flex flex-wrap items-center gap-x-3 gap-y-2 ${center ? 'justify-center' : ''} ${className}`}
    >
      <AppStoreLink
        className="block transition-transform duration-200 hover:-translate-y-0.5"
        ariaLabel="Pobierz BIFOR z App Store"
        source={source}
      >
        <img src="/sklepy/app-store-pl.svg" alt="Pobierz z App Store" width={144} height={48} className="h-12 w-auto" />
      </AppStoreLink>
      {PLAY_URL && (
        <PlayStoreLink
          className="block transition-transform duration-200 hover:-translate-y-0.5"
          ariaLabel="Pobierz BIFOR z Google Play"
          source={source}
        >
          <img
            src="/sklepy/google-play-pl.png"
            alt="Pobierz z Google Play"
            width={163}
            height={63}
            className="-my-[7.5px] h-[63px] w-auto"
          />
        </PlayStoreLink>
      )}
    </div>
  );
}
