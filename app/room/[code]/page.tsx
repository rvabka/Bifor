import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';

import StoreBadges from '../../components/StoreBadges';
import PageShell from '../../components/ui/PageShell';
import { normalizeRoomCode } from '../../lib/room';
import { INVITE_SOURCE } from '../../lib/source';
import { abs } from '../../lib/site';
import RoomActions from './RoomActions';

type Props = { params: Promise<{ code: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const code = normalizeRoomCode((await params).code);
  if (!code) return {};
  const title = `Dołącz do pokoju ${code}`;
  const description = 'Ekipa czeka na ciebie w pokoju. Otwórz BIFOR i dołącz jednym stuknięciem.';
  return {
    title,
    description,
    robots: { index: false, follow: false },
    openGraph: {
      title: `Dołącz do pokoju ${code}`,
      description,
      url: abs(`/room/${code}`),
      siteName: 'BIFOR',
      locale: 'pl_PL'
    },
    twitter: {
      card: 'summary_large_image',
      title: `Dołącz do pokoju ${code}`,
      description
    }
  };
}

export default async function RoomInvitePage({ params }: Props) {
  const code = normalizeRoomCode((await params).code);
  if (!code) notFound();

  return (
    <PageShell>
      <div className="mx-auto flex max-w-xl flex-col items-center gap-10 px-6 pt-28 pb-24 text-center md:pt-36">
        <Image
          src="/cards/dolacz.webp"
          alt="Dołącz do pokoju w BIFOR"
          width={900}
          height={600}
          priority
          className="w-full max-w-md rounded-[1.75rem] shadow-[0_30px_80px_-40px_rgba(0,0,0,0.9)]"
        />

        <div>
          <p className="text-primary text-[11px] font-semibold tracking-[0.3em] uppercase">
            Zaproszenie do pokoju
          </p>
          <h1 className="font-display mt-4 text-[clamp(2rem,7vw,3rem)] leading-[1] font-extrabold tracking-[-0.03em] text-balance">
            Ekipa czeka na Ciebie
          </h1>
        </div>

        <RoomActions code={code} />

        <div className="w-full border-t border-white/10 pt-10">
          <h2 className="font-display text-xl font-extrabold tracking-tight sm:text-2xl">
            Nie masz jeszcze BIFOR?
          </h2>
          <p className="text-on-surface-variant mx-auto mt-3 max-w-md text-sm leading-relaxed text-pretty sm:text-base">
            Pobierz za darmo, stuknij plus na dole ekranu, wybierz Dołącz i wpisz kod {code}.
          </p>
          <StoreBadges center className="mt-8" source={INVITE_SOURCE} />
        </div>
      </div>
    </PageShell>
  );
}
