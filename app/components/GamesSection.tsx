'use client';

import { useState } from 'react';

const games = [
  {
    title: 'Zakazane słowa',
    emoji: '🚫',
    description:
      'Opisz hasło, ale uważaj — niektóre słowa są zakazane! Klasyczna gra imprezowa w nowym, mobilnym wydaniu.',
    players: '4–16 graczy',
    time: '~2 min / runda',
    color: 'from-amber-500/20 to-orange-600/10'
  },
  {
    title: 'Czółko',
    emoji: '🤔',
    description:
      'Zgadnij, co masz „na czole" — zadawaj pytania, a znajomi odpowiadają tak lub nie. Kto odgadnie pierwszy?',
    players: '3–12 graczy',
    time: '~3 min / runda',
    color: 'from-purple-500/20 to-pink-500/10'
  },
  {
    title: 'Impostor',
    emoji: '🕵️',
    description:
      'Jeden z was jest oszustem! Rozmawiajcie, podejrzewajcie i głosujcie — kto jest impostorem na imprezie?',
    players: '5–16 graczy',
    time: '~5 min / runda',
    color: 'from-red-500/20 to-rose-600/10'
  },
  {
    title: 'Sekrety',
    emoji: '💬',
    description:
      'Apka zadaje pytanie, każdy odpowiada anonimowo. Przeczytajcie odpowiedzi, serduszkujcie najlepsze i zgadnijcie — kto jest autorem?',
    players: '4–16 graczy',
    time: '~3 min / runda',
    color: 'from-cyan-500/20 to-blue-500/10'
  }
];

export default function GamesSection() {
  const [activeGame, setActiveGame] = useState(0);

  return (
    <section className="py-24 bg-background">
      <div className="max-w-360 mx-auto px-4 md:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-5xl md:text-7xl font-light tracking-tight leading-none">
            Nasze <span className="text-primary font-normal">gry</span>
          </h2>
          <p className="text-on-surface-variant text-lg md:text-xl font-extralight max-w-xl mx-auto">
            Cztery gry na start — każda przetestowana na dziesiątkach imprez.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {games.map((game, i) => (
            <button
              key={game.title}
              onClick={() => setActiveGame(i)}
              className={`group text-left p-8 rounded-4xl border transition-all duration-500 cursor-pointer ${
                activeGame === i
                  ? 'bg-surface-container-high border-primary/30 scale-[1.02] shadow-[0_0_40px_rgba(255,178,0,0.1)]'
                  : 'bg-surface-container border-white/5 hover:border-white/15 hover:bg-surface-container-high'
              }`}
            >
              <div
                className={`w-16 h-16 rounded-2xl bg-linear-to-br ${game.color} flex items-center justify-center text-3xl mb-6`}
              >
                {game.emoji}
              </div>
              <h3 className="text-xl font-medium mb-3 tracking-tight">
                {game.title}
              </h3>
              <p className="text-on-surface-variant font-extralight text-sm leading-relaxed mb-6">
                {game.description}
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="text-[10px] uppercase tracking-[0.15em] text-primary/80 bg-primary/10 px-3 py-1 rounded-full">
                  {game.players}
                </span>
                <span className="text-[10px] uppercase tracking-[0.15em] text-on-surface-variant bg-white/5 px-3 py-1 rounded-full">
                  {game.time}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
