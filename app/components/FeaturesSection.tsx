export default function FeaturesSection() {
  return (
    <section className="py-16 bg-background">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div className="space-y-8 pt-10">
            <h2 className="text-5xl md:text-7xl font-light tracking-tight leading-[0.95]">
              Graj razem,
              <br />
              gdziekolwiek jesteś
            </h2>
            <p className="text-on-surface-variant text-xl font-extralight max-w-md leading-relaxed">
              Dołącz do znajomych jednym kodem PIN. Zero konfiguracji, zero
              czekania — czysta zabawa na wyciągnięcie ręki.
            </p>
            <button className="flex items-center gap-3 bg-surface-bright px-4 py-4 rounded-full font-medium text-sm hover:bg-surface-variant transition-colors border border-white/5 cursor-pointer">
              Pobierz
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                />
              </svg>
            </button>

            <div className="relative rounded-[2.5rem] overflow-hidden group aspect-[4/5] mt-12 bg-surface-container-low flex items-start md:items-center justify-center">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute bottom-0 -right-12 md:-right-16 w-60 md:w-80 pointer-events-none drop-shadow-[0_0_30px_rgba(255,178,0,0.2)] z-10"
              >
                <source src="/handrising.webm" type="video/webm" />
                <source src="/handrising.mov" type="video/quicktime" />
              </video>
              <div className="text-center pt-8 px-12 pb-40 md:p-8 space-y-6">
                <div className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center mx-auto">
                  <svg
                    className="w-10 h-10 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
                    />
                  </svg>
                </div>
                <h3 className="text-3xl md:text-4xl font-light tracking-tight">
                  Lobby w sekundę
                </h3>
                <p className="text-on-surface-variant font-extralight text-lg md:text-xl leading-relaxed max-w-sm">
                  Stwórz pokój, udostępnij kod PIN znajomym i zacznijcie grać.
                  Bez rejestracji, bez komplikacji.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-12">
            <div className="relative rounded-[2.5rem] overflow-hidden group aspect-[4/5] bg-surface-container-low flex items-start md:items-center justify-center">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute bottom-0 -left-12 md:-left-16 w-60 md:w-80 pointer-events-none drop-shadow-[0_0_25px_rgba(255,178,0,0.2)] z-10"
              >
                <source src="/jump.webm" type="video/webm" />
                <source src="/jump.mov" type="video/quicktime" />
              </video>
              <div className="text-center pt-8 px-12 pb-40 md:p-8 space-y-6">
                <div className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center mx-auto">
                  <svg
                    className="w-10 h-10 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 0 1-.657.643 48.39 48.39 0 0 1-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 0 1-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 0 0-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 0 1-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 0 0 .657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 0 1-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 0 0 5.427-.63 48.05 48.05 0 0 0 .582-4.717.532.532 0 0 0-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.959.401v0a.656.656 0 0 0 .658-.663 48.422 48.422 0 0 0-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 0 1-.61-.58v0Z"
                    />
                  </svg>
                </div>
                <h3 className="text-3xl md:text-4xl font-light tracking-tight">
                  Twoje ulubione gry
                </h3>
                <p className="text-on-surface-variant font-extralight text-lg md:text-xl leading-relaxed max-w-sm">
                  Zakazane słowa, Czółko, Impostor i więcej w planach. Wybierz
                  grę, ustaw zasady i baw się po swojemu.
                </p>
              </div>
            </div>

            <div className="glass-card p-12 rounded-[2.5rem] border border-white/5 relative">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-8">
                <svg
                  className="w-7 h-7 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.348 14.652a3.75 3.75 0 0 1 0-5.304m5.304 0a3.75 3.75 0 0 1 0 5.304m-7.425 2.121a6.75 6.75 0 0 1 0-9.546m9.546 0a6.75 6.75 0 0 1 0 9.546M5.106 18.894c-3.808-3.807-3.808-9.98 0-13.788m13.788 0c3.808 3.807 3.808 9.98 0 13.788M12 12h.008v.008H12V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                  />
                </svg>
              </div>
              <h3 className="text-3xl font-light mb-6 tracking-tight">
                Synchronizacja w czasie rzeczywistym
              </h3>
              <p className="text-on-surface-variant font-extralight text-lg leading-relaxed">
                Każdy gracz widzi to, co powinien — na swoim telefonie, w
                idealnym momencie. Żadnych opóźnień, żadnych kompromisów.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
