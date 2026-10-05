export type GameStep = { name: string; text: string };
export type GameFaq = { question: string; answer: string };

export type Game = {
  slug: string;
  title: string;
  tagline: string;
  summary: string;
  intro: string[];
  genre: string;
  alsoKnownAs: string[];
  players: string;
  minPlayers: number;
  maxPlayers: number;
  duration: string;
  local: boolean;
  online: boolean;
  modeLabel: string;
  bestFor: string;
  /** Plakat z serii kart biblioteki w apce, z tytułem wypalonym na grafice. */
  art: string;
  /** Plakaty trybów z ekranu „Jak gracie?” w apce - tylko gry z oboma trybami. */
  modeArt?: { local: string; online: string };
  glow: string;
  categories: { free: string[]; premium: string[] };
  keywords: string[];
  steps: GameStep[];
  scoring: string;
  tips: string[];
  faq: GameFaq[];
};

// Fakty sprawdzone z kodem apki (październik 2026). Kategorie, liczby graczy,
// czasy i punktacja mają się zgadzać z tym, co gracz zobaczy w aplikacji -
// ten plik trafia też do llms.txt, więc każda nieścisłość wraca w odpowiedziach
// chatbotów.
export const GAMES: Game[] = [
  {
    slug: 'czolko',
    title: 'Czółko',
    tagline: 'Hasło na czole, pytania tak albo nie.',
    summary:
      'Czółko w BIFOR to zgadywanka „Kim jestem?”: przykładasz telefon do czoła, reszta widzi twoje hasło, a ty pytasz o nie tak albo nie. Każdy ma własne hasło, pytacie po kolei w kółko i nie ma limitu czasu.',
    intro: [
      'Każdy dostaje swoje hasło, na przykład „Shrek” albo „wiertarka”. Przykładasz telefon do czoła, żeby widzieli je wszyscy oprócz ciebie, i pytasz: „Czy jestem zwierzęciem?”. Ekipa odpowiada tylko tak albo nie.',
      'Potem pyta następna osoba, o swoje hasło, i tak w kółko, aż ktoś trafi. Nie ma zegara, więc nikt nie gada na wyścigi. Wygrywa ten, kto zadaje pytania, które najwięcej odcinają.',
      'Na jednym telefonie każdy najpierw po kolei pokazuje swoje hasło reszcie, a potem zaczyna się pytanie. W trybie online każdy ma hasło na swoim telefonie i chowa je stuknięciem.'
    ],
    genre: 'Zgadywanka „Kim jestem?” z hasłem na czole',
    alsoKnownAs: ['Kim jestem', 'gra w hasła na czole', 'zgadywanka w stylu Heads Up'],
    players: '2-8 osób',
    minPlayers: 2,
    maxPlayers: 8,
    duration: '10-20 minut',
    local: true,
    online: true,
    modeLabel: 'Na jednym telefonie albo każdy na swoim',
    bestFor: 'ekipa dopiero się schodzi i trzeba czegoś na rozgrzewkę',
    art: '/plakaty/czolko.webp',
    modeArt: { local: '/tryby/czolko-local.webp', online: '/tryby/czolko-online.webp' },
    glow: '#F59E0B',
    categories: {
      free: ['Klasyczne'],
      premium: ['Piłkarze', 'Telewizja', 'Film', 'Twarze internetu', 'Muzyka', 'Zwierzęta']
    },
    keywords: ['czółko gra', 'kim jestem gra', 'gra w hasła na czole', 'gra imprezowa na telefon'],
    steps: [
      {
        name: 'Wybierzcie kategorię',
        text: 'Klasyczne są za darmo i działają bez internetu. Z BIFOR+ dochodzą między innymi Film, Muzyka, Piłkarze i Twarze internetu.'
      },
      {
        name: 'Telefon na czoło',
        text: 'Ekranem do ekipy. Masz pięć sekund, żeby go przyłożyć, zanim hasło się pokaże.'
      },
      {
        name: 'Pytaj tak albo nie',
        text: '„Czy jestem człowiekiem?”, „Czy da się mnie zjeść?”. Ekipa odpowiada tylko tak albo nie, bez podpowiadania.'
      },
      {
        name: 'Kolejka idzie w kółko',
        text: 'Po twoim pytaniu pyta następna osoba, o swoje hasło. Gracie, aż wszyscy zgadną albo uznacie rundę za skończoną.'
      },
      {
        name: 'Punkty za kolejność',
        text: 'Kto zgadnie pierwszy, ma 3 punkty, drugi 2, każdy następny 1. Po rundzie decydujecie: kolejna runda albo koniec.'
      }
    ],
    scoring:
      'Liczy się kolejność: pierwsza osoba, która zgadnie swoje hasło, dostaje 3 punkty, druga 2, każda następna 1. Punkty sumują się przez kolejne rundy. Liczby rund nie ustalacie z góry, po każdej klasyfikacji decydujecie, czy gracie dalej.',
    tips: [
      'Zacznij od pytań, które dzielą świat na pół: „Czy istnieję naprawdę?”, „Czy jestem człowiekiem?”.',
      'Odpowiadajcie uczciwie, nawet przy wrednym haśle. Jedno złe „tak” potrafi zepsuć komuś całą rundę.',
      'Online każdy chowa swoje hasło stuknięciem, więc telefon można odłożyć na stół między pytaniami.'
    ],
    faq: [
      {
        question: 'Ile osób potrzeba do Czółka?',
        answer:
          'Od 2 do 8. Na jednym telefonie gracie wszyscy na zmianę, online każdy ma hasło na swoim telefonie.'
      },
      {
        question: 'Czy w Czółku jest limit czasu?',
        answer:
          'Nie. Zgadujecie pytaniami tak albo nie, kolejka idzie w kółko i nikt nie goni zegara. Jedyne odliczanie to pięć sekund na przyłożenie telefonu do czoła.'
      },
      {
        question: 'Czym Czółko w BIFOR różni się od Heads Up?',
        answer:
          'W klasycznym Heads Up jedna osoba zgaduje na czas kilka haseł, a reszta je opisuje. W BIFOR każdy ma własne hasło, pyta o nie tak albo nie, a punkty zależą od tego, kto zgadnie pierwszy.'
      },
      {
        question: 'Czy Czółko działa bez internetu?',
        answer:
          'Tak, na jednym telefonie z kategorią Klasyczne. Internet jest potrzebny w trybie online i do pierwszego pobrania płatnych kategorii.'
      }
    ]
  },
  {
    slug: 'zakazane',
    title: 'Zakazane',
    tagline: 'Opisz hasło bez słów, które same cisną się na usta.',
    summary:
      'Zakazane to drużynowa gra w opisywanie haseł w stylu Tabu: masz kilkadziesiąt sekund, żeby twoja drużyna zgadła jak najwięcej haseł, a przy każdym są słowa, których nie wolno ci powiedzieć. Online przeciwnicy widzą hasło i pilnują cię przyciskiem SPALONE.',
    intro: [
      'Hasło: „sushi”. Nie wolno: ryż, ryba, Japonia, pałeczki, rolka. Masz 90 sekund i drużynę, która krzyczy wszystko oprócz sushi.',
      'Na jednym telefonie opisujący trzyma telefon i przesuwa karty: w prawo dobrze, w lewo źle. Online przeciwnicy widzą to samo hasło razem z zakazanymi słowami, a gdy któreś padnie, stukają SPALONE i hasło przepada.'
    ],
    genre: 'Drużynowa gra w opisywanie haseł (w stylu Tabu)',
    alsoKnownAs: ['gra w zakazane słowa', 'tabu po polsku', 'gra w opisywanie haseł w drużynach'],
    players: '4-10 osób, 2-4 drużyny',
    minPlayers: 4,
    maxPlayers: 10,
    duration: '20-30 minut',
    local: true,
    online: true,
    modeLabel: 'Na jednym telefonie albo każdy na swoim',
    bestFor: 'ekipa lubi rywalizację drużynową i gadanie na czas',
    art: '/plakaty/zakazane.webp',
    modeArt: { local: '/tryby/zakazane-local.webp', online: '/tryby/zakazane-online.webp' },
    glow: '#22C55E',
    categories: {
      free: ['Klasyczne'],
      premium: ['Piłka nożna', 'Polska', 'Popkultura', 'Impreza', 'Pikantne 18+']
    },
    keywords: ['zakazane słowa gra', 'tabu na telefon', 'gra w opisywanie haseł', 'gry drużynowe na imprezę'],
    steps: [
      {
        name: 'Podzielcie się na drużyny',
        text: 'Od 2 do 4 drużyn. Online apka rozdziela graczy sama, a host może przetasować składy.'
      },
      {
        name: 'Opisujący dostaje hasło',
        text: 'Widzi hasło i słowa, których nie wolno mu użyć. Jego drużyna zgaduje na głos.'
      },
      {
        name: 'Czas leci',
        text: '60, 90 albo 120 sekund na turę. Trudne hasło można spasować, pasów na turę jest od 1 do 5.'
      },
      {
        name: 'Przeciwnicy pilnują',
        text: 'Online widzą to samo co opisujący i stukają SPALONE, gdy padnie zakazane słowo.'
      },
      {
        name: 'Tura przechodzi dalej',
        text: 'Gra kolejna drużyna, a opisujący zmienia się co rundę. Gracie 3, 5 albo 8 rund.'
      }
    ],
    scoring:
      'Każde zgadnięte hasło to punkt dla drużyny. Spalone hasło przepada, a przy włączonej karze za spalone drużyna traci jeszcze punkt. Wygrywa drużyna z najwyższym wynikiem po ostatniej rundzie.',
    tips: [
      'Zacznij od najszerszego: „to jedzenie”, „to sport”, i dopiero potem zawężaj.',
      'Pas to nie porażka. Hasło, nad którym siedzisz 20 sekund, kosztuje cię dwa łatwe.',
      'Uważajcie na formy zakazanych słów. „Rybny” przy zakazanej „rybie” to dobry powód do SPALONE.'
    ],
    faq: [
      {
        question: 'Ile osób potrzeba do gry w Zakazane?',
        answer:
          'Co najmniej cztery, czyli dwie drużyny po dwie osoby. Drużyn może być do czterech, a graczy online do dziesięciu.'
      },
      {
        question: 'Czy Zakazane to to samo co Tabu?',
        answer:
          'Zasada jest z tej samej rodziny: opisujesz hasło bez zakazanych słów. Zakazane ma własne, polskie hasła, a w trybie online przeciwnicy sędziują przyciskiem SPALONE.'
      },
      {
        question: 'Czy da się grać na jednym telefonie?',
        answer:
          'Tak. Telefon dostaje opisujący z każdej drużyny po kolei. Jest też tryb online, w którym każdy widzi swoją rolę na swoim ekranie.'
      },
      {
        question: 'Jakie są kategorie haseł?',
        answer:
          'Klasyczne są za darmo. Z BIFOR+ dochodzą Piłka nożna, Polska, Popkultura, Impreza i Pikantne 18+.'
      }
    ]
  },
  {
    slug: 'impostor',
    title: 'Impostor',
    tagline: 'Wszyscy znają hasło. Prawie wszyscy.',
    summary:
      'Impostor to gra w blefowanie: wszyscy dostają to samo hasło oprócz impostora, który musi udawać, że wie, o czym mowa. Każdy mówi jedno słowo skojarzenia, a potem ekipa szuka, kto kłamie. Impostorów może być jeden, dwóch albo losowo.',
    intro: [
      'Hasło: „plaża”. Ty mówisz „ręcznik”, ktoś „parawan”, a ktoś inny „ciepło”. Ciepło? Trochę za ogólne. I tak zaczyna się dyskusja.',
      'Impostor nie zna hasła, ale jeśli macie włączoną podpowiedź, dostaje jedno słowo, które go naprowadza. Impostorów może być jeden, dwóch albo losowo. Przy losowaniu nikt nie wie, ilu ich jest w tej rundzie.',
      'Wskazujecie podejrzanego na żywo, palcem. Apka nie liczy głosów, tylko zapisuje wynik rundy: wygrali niewinni albo impostor.'
    ],
    genre: 'Gra w blefowanie i dedukcję (social deduction)',
    alsoKnownAs: ['gra w impostora', 'gra w zdrajcę', 'gra w szpiega'],
    players: '3-8 osób',
    minPlayers: 3,
    maxPlayers: 8,
    duration: '15-25 minut',
    local: true,
    online: true,
    modeLabel: 'Na jednym telefonie albo każdy na swoim',
    bestFor: 'ekipa lubi blefować, oskarżać i bronić się do ostatniego słowa',
    art: '/plakaty/impostor.webp',
    modeArt: { local: '/tryby/impostor-local.webp', online: '/tryby/impostor-online.webp' },
    glow: '#EF4444',
    categories: {
      free: ['Klasyczne'],
      premium: [
        'Jedzenie i kuchnia',
        'Typy ludzkie',
        'Praca i biuro',
        'Szkoła i dzieciństwo',
        'Marki',
        'Pokolenie Z',
        'Dookoła świata',
        'Znani sportowcy',
        'Pikantne 18+'
      ]
    },
    keywords: ['impostor gra', 'gra w impostora na telefon', 'gra w zdrajcę', 'gra w blefowanie'],
    steps: [
      {
        name: 'Sprawdźcie role',
        text: 'Każdy po kolei patrzy na swoją kartę. Niewinni widzą hasło, impostor widzi, że jest impostorem, i ewentualnie podpowiedź.'
      },
      {
        name: 'Jedno słowo na osobę',
        text: 'Apka losuje, kto zaczyna. Każdy mówi jedno skojarzenie z hasłem.'
      },
      {
        name: 'Dyskusja',
        text: 'Bez zegara. Rozmawiacie, aż ktoś rzuci oskarżenie, którego reszta nie umie obalić.'
      },
      {
        name: 'Wskazujecie',
        text: 'Na trzy palcem w podejrzanego. Potem odsłaniacie, kto naprawdę był impostorem.'
      },
      {
        name: 'Zapisujecie wynik',
        text: 'W apce zaznaczacie, kto wygrał rundę. Gracie 3, 5, 7 albo 10 rund.'
      }
    ],
    scoring:
      'Gdy impostor przetrwa, dostaje 3 punkty (przy dwóch impostorach każdy z nich). Gdy wygrają niewinni, każdy niewinny dostaje punkt. Na koniec apka pokazuje klasyfikację i najlepszego impostora.',
    tips: [
      'Skojarzenie ma być na tyle konkretne, żeby obronić ciebie, i na tyle ogólne, żeby nie podać hasła impostorowi.',
      'Jako impostor słuchaj pierwszych osób i idź w ich stronę. Najgorzej wypada oryginalność.',
      'Przy „Losowo” nie zakładajcie, że po złapaniu jednego impostora jest po wszystkim.'
    ],
    faq: [
      {
        question: 'Ile osób potrzeba do gry w Impostora?',
        answer: 'Od 3 do 8. Dwóch impostorów da się ustawić od czterech graczy.'
      },
      {
        question: 'Czy Impostor działa na jednym telefonie?',
        answer:
          'Tak. Telefon krąży po ekipie i każdy po kolei sprawdza swoją rolę. Online każdy widzi rolę na swoim telefonie.'
      },
      {
        question: 'Czy impostor dostaje podpowiedź?',
        answer:
          'Jeśli podpowiedź jest włączona (domyślnie tak), impostor widzi jedno słowo, które naprowadza na hasło, ale go nie zdradza.'
      },
      {
        question: 'Czy w apce się głosuje?',
        answer:
          'Nie. Wskazujecie podejrzanego na żywo, a w apce zaznaczacie tylko, czy wygrali niewinni, czy impostor. Online robi to host.'
      }
    ]
  },
  {
    slug: 'sekrety',
    title: 'Sekrety',
    tagline: 'Dziewięć rund, w których dowiadujecie się o sobie za dużo.',
    summary:
      'Sekrety to gra na poznanie się lepiej: dziewięć typów rund, od anonimowych sekretów, przez „Kto z nas”, po selfie na zawołanie, przemieszanych jak talia kart. Każdy gra na swoim telefonie, a odpowiedzi są anonimowe do odsłony.',
    intro: [
      'Na start każdy pisze anonimowo jeden sekret i trzy zdania o sobie, z których jedno jest kłamstwem. Potem lecą rundy: zgadujecie, czyj to sekret, kto skłamał i kto z was najpewniej zgubi klucze w drodze na imprezę.',
      'Typ rundy poznajecie dopiero, gdy wyskoczy karta. Po drodze trafiają się niespodzianki: podwójne punkty w drugiej połowie gry, sojusze par i konsekwencje w formie pytania albo wyzwania.'
    ],
    genre: 'Gra na poznanie się (ice breaker) z losowymi typami rund',
    alsoKnownAs: ['gra w sekrety', 'kto z nas', 'nigdy przenigdy na telefon', 'gra na przełamanie lodów'],
    players: '3-10 osób',
    minPlayers: 3,
    maxPlayers: 10,
    duration: '25-45 minut',
    local: false,
    online: true,
    modeLabel: 'Każdy na swoim telefonie',
    bestFor: 'ekipa dopiero się poznaje albo trzeba przełamać lody',
    art: '/plakaty/sekrety.webp',
    glow: '#A855F7',
    categories: { free: ['Na luzie', 'Impreza'], premium: ['Rozkminy'] },
    keywords: ['gra w sekrety', 'kto z nas gra', 'gry na przełamanie lodów', 'nigdy przenigdy na telefon'],
    steps: [
      {
        name: 'Ktoś zakłada pokój',
        text: 'Reszta dołącza kodem albo kodem QR. Każdy potrzebuje swojego telefonu.'
      },
      {
        name: 'Wybieracie klimat i długość',
        text: 'Na luzie, Impreza albo Rozkminy (w BIFOR+). Gra trwa 10, 15 albo 20 rund.'
      },
      {
        name: 'Piszecie sekrety',
        text: 'Jeden sekret i trzy zdania o sobie, w tym jedno kłamstwo. Anonimowo. W połowie gry dopisujecie drugą porcję.'
      },
      {
        name: 'Lecą rundy',
        text: 'Sekret, Prawda czy kłamstwo, Kto z nas, Nigdy przenigdy, Gorące krzesło, Uszereguj nas, Twarz na żądanie, Jak dobrze cię znamy i Riposta.'
      },
      {
        name: 'Odsłona',
        text: 'Gdy wszyscy zagłosują, apka pokazuje wynik i autora. Po ostatniej rundzie jest klasyfikacja.'
      }
    ],
    scoring:
      'Za trafienie autora sekretu albo kłamstwa dostajesz punkt, a autor dostaje punkt za każdą osobę, którą zmylił, najwyżej trzy. W „Kto z nas” 2 punkty idą do osoby z największą liczbą głosów, w Riposcie i selfie liczą się głosy na twoją odpowiedź. Gorączka punktów potrafi podwoić wszystko w drugiej połowie gry.',
    tips: [
      'Na luzie sprawdza się w ekipie, która widzi się pierwszy raz. Rozkminy to pytania na późniejszą godzinę.',
      'Pisz sekrety prawdziwe, ale takie, z którymi przeżyjesz następny dzień.',
      'Twarz na żądanie najlepiej działa, gdy wszyscy siedzą w jednym pokoju i widzą swoje miny.'
    ],
    faq: [
      {
        question: 'Czy w Sekrety można grać na jednym telefonie?',
        answer:
          'Nie. Każdy gra na swoim telefonie, bo odpowiedzi są anonimowe i nikt nie może ich zobaczyć przed odsłoną.'
      },
      {
        question: 'Jakie rundy są w Sekretach?',
        answer:
          'Dziewięć: Sekret, Prawda czy kłamstwo, Kto z nas, Nigdy przenigdy, Gorące krzesło, Uszereguj nas, Twarz na żądanie, Jak dobrze cię znamy i Riposta.'
      },
      {
        question: 'Czy Sekrety mają wersję z piciem?',
        answer:
          'Jest opcjonalna „Wersja z drinkiem”, domyślnie wyłączona. Mówi, kto pije łyk po rundzie, i nie wpływa na punkty.'
      },
      {
        question: 'Które kategorie są darmowe?',
        answer: 'Na luzie i Impreza. Rozkminy są w BIFOR+.'
      }
    ]
  },
  {
    slug: 'panstwa-miasta',
    title: 'Państwa Miasta',
    tagline: 'Ta z zeszytu, tylko nikt nie liczy punktów ręcznie.',
    summary:
      'Państwa Miasta w BIFOR to klasyczna gra na literę online: apka losuje literę, wszyscy jednocześnie wypełniają kolumny na swoich telefonach, potem oceniacie swoje odpowiedzi, a apka sama liczy punkty. Wszystkie zestawy kategorii są za darmo.',
    intro: [
      'Litera K. Państwo: Kenia. Miasto: Kraków. Zwierzę: kret. Ktoś kończy pierwszy i przytrzymuje GOTOWE, a reszta ma wtedy 15 sekund na dopisanie.',
      'Potem przegląd. Każdy widzi odpowiedzi innych i może zagłosować przeciw: „Kaczor Donald to nie zwierzę”. Żeby hasło odpadło, przeciw musi być zdecydowana większość pozostałych, a jedno wątpliwe hasło na grę można obronić jokerem.',
      'Kolumny wybieracie z ośmiu gotowych zestawów: Klasyczne, Impreza i Popkultura, Geografia, Sport, Dorosłość, Szkoła, Dom i sąsiedzi oraz Absurd.'
    ],
    genre: 'Klasyczna gra słowna na literę, w wersji online',
    alsoKnownAs: ['państwa miasta online', 'gra na kartkę w państwa miasta', 'gra słowna na literę'],
    players: '2-10 osób',
    minPlayers: 2,
    maxPlayers: 10,
    duration: '15-30 minut',
    local: false,
    online: true,
    modeLabel: 'Każdy na swoim telefonie',
    bestFor: 'przy stole siedzą bardzo różni ludzie, a zasady zna każdy',
    art: '/plakaty/panstwa-miasta.webp',
    glow: '#3B82F6',
    categories: {
      free: [
        'Klasyczne',
        'Impreza i Popkultura',
        'Geografia',
        'Sport',
        'Dorosłość',
        'Szkoła',
        'Dom i sąsiedzi',
        'Absurd'
      ],
      premium: []
    },
    keywords: ['państwa miasta online', 'państwa miasta na telefon', 'gra słowna na literę', 'gry ze znajomymi online'],
    steps: [
      {
        name: 'Ktoś zakłada pokój',
        text: 'Wybiera zestaw kolumn, liczbę rund (3, 5 albo 8) i czas na rundę (60, 90 albo 120 sekund).'
      },
      {
        name: 'Losowanie litery',
        text: 'Apka losuje literę dla wszystkich naraz.'
      },
      {
        name: 'Piszecie jednocześnie',
        text: 'Każdy na swoim telefonie. Kto skończy pierwszy, przytrzymuje GOTOWE, a reszta ma 15 sekund.'
      },
      {
        name: 'Oceniacie',
        text: 'Głos przeciw przy hasłach, które wam nie pasują. Jeden joker na grę chroni hasło przed odrzuceniem.'
      },
      {
        name: 'Punkty',
        text: 'Apka liczy wynik i pokazuje klasyfikację po każdej rundzie.'
      }
    ],
    scoring:
      'W każdej kolumnie: 15 punktów, gdy tylko ty masz poprawną odpowiedź, 10, gdy twoja jest unikalna, ale inni też coś wpisali, 5 za odpowiedź, którą ma ktoś jeszcze, i 0 za pustą, na złą literę albo odrzuconą. Trudne litery F, G i H liczą się podwójnie, jedna tajna kolumna w rundzie też, a kto skończy pierwszy bez odrzuconych haseł, dostaje 5 punktów bonusu. Każdą z tych zasad można wyłączyć.',
    tips: [
      'Pusta kolumna to zawsze zero. Lepiej wpisać coś ryzykownego i liczyć na łaskę ekipy.',
      'Jokera masz jednego na grę. Trzymaj go na hasło, o które na pewno będzie kłótnia.',
      'Szybkie GOTOWE zabiera innym czas, ale bonus dostaniesz tylko wtedy, gdy nic ci nie odrzucą.'
    ],
    faq: [
      {
        question: 'Czy w Państwa Miasta można grać przez internet?',
        answer:
          'Tak, w BIFOR to gra wyłącznie online. Każdy wypełnia kolumny na swoim telefonie, nie musicie być w tej samej sieci Wi-Fi.'
      },
      {
        question: 'Ile punktów daje odpowiedź w Państwa Miasta?',
        answer:
          '15 punktów, gdy tylko ty masz poprawną odpowiedź w kolumnie, 10 za unikalną odpowiedź, 5 za powtórzoną i 0 za pustą albo odrzuconą.'
      },
      {
        question: 'Czy można wpisać własne kategorie?',
        answer:
          'Na razie nie. Wybieracie jeden z ośmiu gotowych zestawów kolumn, wszystkie są za darmo.'
      },
      {
        question: 'Czy Państwa Miasta są darmowe?',
        answer: 'Tak, w całości. To jedyna gra w BIFOR bez płatnych kategorii.'
      }
    ]
  },
  {
    slug: 'gra-na-p',
    title: 'Gra na P',
    tagline: 'Opisz hasło. Ale tylko słowami na P.',
    summary:
      'Gra na P to kalambury słowne z jedną zasadą: hasło opisujesz wyłącznie słowami zaczynającymi się na literę P. Samo hasło nie musi być na P. Kto zgadnie, dostaje punkt, a opisujący też.',
    intro: [
      'Hasło: „rower”. „Pojazd. Pedały. Pedałujesz. Pojedynczy pasażer…”. Przy „pedałujesz” ktoś krzyczy „rower!” i obie strony mają punkt.',
      'Opisujący stuka w awatar osoby, która zgadła. Każdy opisuje raz na kółko, a po każdym kółku jest klasyfikacja.'
    ],
    genre: 'Kalambury słowne z ograniczeniem do jednej litery',
    alsoKnownAs: ['kalambury na P', 'gra w słowa na P', 'gra słowna na imprezę'],
    players: '2-10 osób',
    minPlayers: 2,
    maxPlayers: 10,
    duration: '15-25 minut',
    local: true,
    online: true,
    modeLabel: 'Na jednym telefonie albo każdy na swoim',
    bestFor: 'ekipa jest już rozkręcona i chce czegoś absurdalnego',
    art: '/plakaty/gra-na-p.webp',
    modeArt: { local: '/tryby/gra-na-p-local.webp', online: '/tryby/gra-na-p-online.webp' },
    glow: '#F97316',
    categories: {
      free: ['Klasyczne'],
      premium: ['Dom', 'Jedzenie', 'Zwierzaki', 'Natura', 'Groza', 'Fantazja', 'Pikantne 18+']
    },
    keywords: ['kalambury na p', 'gra na literę p', 'gry słowne na imprezę', 'gra w opisywanie słowami na p'],
    steps: [
      {
        name: 'Ustawcie grę',
        text: 'Liczba kółek od 2 do 6, czas tury 60, 75 albo 90 sekund, od 1 do 5 pasów na turę.'
      },
      {
        name: 'Opisujący widzi hasło',
        text: 'Hasło widzi tylko osoba, która w tej turze opisuje.'
      },
      {
        name: 'Tylko słowa na P',
        text: 'Każde słowo w opisie zaczyna się na P. Zgadujący mówią, co chcą.'
      },
      {
        name: 'Stuknij, kto zgadł',
        text: 'Punkt dla osoby, która zgadła, i punkt dla ciebie.'
      },
      {
        name: 'Następna osoba',
        text: 'Opisuje kolejna osoba w kółku. Po każdym kółku jest klasyfikacja.'
      }
    ],
    scoring:
      'Trafione hasło daje punkt zgadującemu i opisującemu. Możecie włączyć karę za spalone: kto powie słowo na inną literę, traci punkt.',
    tips: [
      'Przymiotniki na P ratują życie: prostokątny, puszysty, popularny, pyszny.',
      'Słowa-wytrychy też są na P: „podobne do”, „prawie”, „przeciwieństwo”.',
      'Pomyłka nie zatrzymuje gry. Mów dalej, tłumaczenie się zjada czas.'
    ],
    faq: [
      {
        question: 'Na czym polega Gra na P?',
        answer:
          'Opisujesz hasło, ale każde słowo, którego używasz, musi zaczynać się na P. Hasło może być na dowolną literę, a zgadujący nie mają żadnych ograniczeń.'
      },
      {
        question: 'Ile osób może grać w Grę na P?',
        answer: 'Od 2 do 10, na jednym telefonie albo online, każdy na swoim.'
      },
      {
        question: 'Czy za słowo na inną literę jest kara?',
        answer:
          'Tylko jeśli ją włączycie. Wtedy za słowo na inną literę opisujący stuka SPALONE na swoim ekranie i traci punkt.'
      }
    ]
  },
  {
    slug: 'szybka-trojka',
    title: 'Szybka Trójka',
    tagline: 'Trzy odpowiedzi, zanim kulka spadnie.',
    summary:
      'Szybka Trójka to gra na refleks: ktoś czyta polecenie „Wymień 3…”, puszcza kulkę w rurce na ekranie, a ty masz podać trzy odpowiedzi na głos, zanim kulka dotoczy się na dół. Polecenia nie widzisz, tylko je słyszysz.',
    intro: [
      '„Wymień 3 rzeczy, które zabierasz na kemping”. Namiot, śpiwór i… kulka jest już na ostatnim zakręcie.',
      'Polecenie czyta i kulkę puszcza osoba przed tobą w kolejce, i to ona ocenia, czy padły trzy odpowiedzi. Na odpowiedź masz 5 albo 7 sekund.'
    ],
    genre: 'Gra na skojarzenia i refleks pod presją czasu',
    alsoKnownAs: ['wymień 3 rzeczy', 'gra w trójki', 'gra na czas ze znajomymi'],
    players: '2-10 osób',
    minPlayers: 2,
    maxPlayers: 10,
    duration: '10-20 minut',
    local: true,
    online: true,
    modeLabel: 'Na jednym telefonie albo każdy na swoim',
    bestFor: 'potrzebujecie szybkiego kółka na refleks między innymi grami',
    art: '/plakaty/szybka-trojka.webp',
    modeArt: { local: '/tryby/szybka-trojka-local.webp', online: '/tryby/szybka-trojka-online.webp' },
    glow: '#06B6D4',
    categories: {
      free: ['Klasyczne'],
      premium: ['Dzieciństwo i podwórko', 'Internet i telefon', 'Geografia i podróże', 'Pikantne 18+']
    },
    keywords: ['gra wymień 3 rzeczy', 'szybka trójka gra', 'gra na skojarzenia', 'gra imprezowa na czas'],
    steps: [
      {
        name: 'Ktoś czyta polecenie',
        text: 'Osoba przed tobą w kolejce czyta na głos „Wymień 3…”. Ty polecenia nie widzisz.'
      },
      {
        name: 'Kulka rusza',
        text: 'Czytający puszcza kulkę dopiero po przeczytaniu polecenia. Czas to 5 albo 7 sekund.'
      },
      {
        name: 'Trzy odpowiedzi na głos',
        text: 'Wymieniasz trzy rzeczy, zanim kulka spadnie na dół rurki.'
      },
      {
        name: 'Czytający ocenia',
        text: 'Jednym stuknięciem zalicza albo nie. Za udaną turę jest punkt.'
      },
      {
        name: 'Kolejka idzie dalej',
        text: 'Następna osoba dostaje nowe polecenie. Gracie od 2 do 6 kółek.'
      }
    ],
    scoring:
      'Udana tura to punkt. Gracie od 2 do 6 kółek, po każdym jest klasyfikacja, a na koniec wygrywa osoba z największą liczbą punktów.',
    tips: [
      'Mów pierwsze, co przyjdzie do głowy. Szukanie lepszej odpowiedzi kosztuje najwięcej czasu.',
      'Jako czytający czytaj równym tempem. Kulka i tak nie zwolni.',
      'Dobra rozgrzewka przed grami, w których trzeba dłużej myśleć, jak Impostor.'
    ],
    faq: [
      {
        question: 'Ile osób potrzeba do Szybkiej Trójki?',
        answer: 'Od 2 do 10, na jednym telefonie podawanym w kółko albo online.'
      },
      {
        question: 'Kto ocenia, czy odpowiedzi się liczą?',
        answer: 'Osoba, która przeczytała polecenie i puściła kulkę. Jednym stuknięciem po tym, jak kulka spadnie.'
      },
      {
        question: 'Co się dzieje, gdy ktoś nie zdąży?',
        answer: 'Nie dostaje punktu, a kolejka idzie dalej. Następna osoba dostaje nowe polecenie.'
      }
    ]
  }
];

export const getGame = (slug: string) => GAMES.find((g) => g.slug === slug);

export const gamePath = (slug: string) => `/gry/${slug}`;

export const modeSummary = (game: Game) =>
  game.local && game.online
    ? 'na jednym telefonie albo każdy na swoim'
    : game.online
      ? 'każdy na swoim telefonie'
      : 'na jednym telefonie';
