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
  art: string;
  glow: string;
  keywords: string[];
  steps: GameStep[];
  scoring: string;
  tips: string[];
  faq: GameFaq[];
};

export const GAMES: Game[] = [
  {
    slug: 'czolko',
    title: 'Czółko',
    tagline: 'Zgadnij kim jesteś, zanim czas minie.',
    summary:
      'Czółko to gra imprezowa typu heads up: trzymasz telefon na czole, wszyscy dookoła widzą Twoje hasło i podpowiadają, a Ty zgadujesz, kim albo czym jesteś.',
    intro: [
      'Czółko to najprostszy sposób, żeby rozkręcić towarzystwo. Telefon leci na czoło, na ekranie pojawia się hasło, którego jako jedyny nie widzisz, a reszta ekipy opisuje je na wszystkie sposoby - byle nie wprost.',
      'W Bifor każdy gracz dostaje własne hasło, a telefon krąży po grupie w kółko. Dzięki temu nie ma jednej osoby, która "prowadzi" całą grę - w każdej rundzie zgaduje ktoś inny, a punkty zależą od tego, kto trafi jako pierwszy.'
    ],
    genre: 'Gra imprezowa typu heads up (zgadywanka z hasłem na czole)',
    alsoKnownAs: ['heads up', 'gra w hasła na czole', 'zgadywanka z telefonem na czole'],
    players: '2-8 graczy',
    minPlayers: 2,
    maxPlayers: 8,
    duration: '10-20 minut',
    local: true,
    online: true,
    modeLabel: 'Na jednym telefonie lub każdy na swoim',
    bestFor: 'rozgrzewka na start wieczoru, gdy ekipa dopiero się schodzi',
    art: '/games/czolko.webp',
    glow: '#F59E0B',
    keywords: [
      'czółko gra',
      'heads up po polsku',
      'gra w hasła na czole',
      'gra imprezowa na telefon'
    ],
    steps: [
      {
        name: 'Wybierzcie kategorię i ustawienia',
        text: 'Host wybiera kategorię haseł oraz długość rundy. Kategoria "Klasyczne" jest darmowa i działa bez internetu.'
      },
      {
        name: 'Przyłóż telefon do czoła',
        text: 'Ekran ustawiasz w stronę grupy. Hasło widzą wszyscy poza Tobą.'
      },
      {
        name: 'Reszta opisuje hasło',
        text: 'Grupa podpowiada, opisuje, gra scenkę lub udaje dźwięki. Nie wolno powiedzieć hasła ani jego części.'
      },
      {
        name: 'Zgaduj, aż czas się skończy',
        text: 'Trafione hasło zalicza punkt, a telefon wędruje do następnej osoby w kółku.'
      },
      {
        name: 'Zbierzcie punkty i sprawdźcie wyniki',
        text: 'Po ostatniej rundzie aplikacja pokazuje klasyfikację i zwycięzcę.'
      }
    ],
    scoring:
      'Punkty zależą od kolejności zgadnięcia w rundzie: pierwszy dostaje 3 punkty, drugi 2, trzeci 1. Wygrywa osoba z najwyższą sumą po wszystkich rundach.',
    tips: [
      'Opisujcie skojarzeniami, nie definicjami ze słownika - szybciej trafia.',
      'Ustawcie krótsze rundy, jeśli gracie w większej grupie, żeby telefon szybciej krążył.',
      'W trybie online każdy trzyma swój telefon, więc gra działa też wtedy, gdy siedzicie w kilku pokojach.'
    ],
    faq: [
      {
        question: 'Ile osób potrzeba do gry w Czółko?',
        answer:
          'Od 2 do 8 osób. Przy dwóch graczach jedna osoba zgaduje, a druga opisuje; im większa grupa, tym więcej pomysłów na podpowiedzi.'
      },
      {
        question: 'Czy Czółko działa bez internetu?',
        answer:
          'Tak. Tryb na jednym telefonie z darmową kategorią haseł działa w pełni offline. Internet jest potrzebny tylko w trybie online, gdy każdy gra na swoim telefonie.'
      },
      {
        question: 'Czym Czółko w Bifor różni się od zwykłego heads up?',
        answer:
          'Każdy gracz ma własne hasło, a telefon krąży po grupie, więc nikt nie czeka bezczynnie. Punkty przyznawane są za kolejność zgadnięcia, a nie tylko za sam fakt trafienia.'
      }
    ]
  },
  {
    slug: 'zakazane',
    title: 'Zakazane',
    tagline: 'Opisz hasło bez używania zakazanych słów.',
    summary:
      'Zakazane to polska gra imprezowa w stylu tabu: opisujesz hasło swojej drużynie, ale nie wolno Ci użyć kilku najbardziej oczywistych słów, a przeciwnicy czekają z palcem na buzzerze.',
    intro: [
      'Zasada jest prosta i dlatego działa: masz hasło, masz listę słów, których nie wolno wypowiedzieć, i masz kilkadziesiąt sekund. Reszta to nerwy, śmiech i kreatywne omijanie tematu.',
      'W Bifor drużyna przeciwna nie siedzi bezczynnie - pełni rolę sędziów. Jedno zakazane słowo i lecą z przyciskiem "SPALONE", a punkt przepada.'
    ],
    genre: 'Gra imprezowa typu tabu (opisywanie haseł w drużynach)',
    alsoKnownAs: ['tabu', 'gra w zakazane słowa', 'taboo po polsku'],
    players: '4-10 graczy',
    minPlayers: 4,
    maxPlayers: 10,
    duration: '15-30 minut',
    local: true,
    online: true,
    modeLabel: 'Na jednym telefonie lub każdy na swoim',
    bestFor: 'ekipa, która lubi rywalizację drużynową i gadanie na czas',
    art: '/games/zakazane.webp',
    glow: '#22C55E',
    keywords: [
      'zakazane słowa gra',
      'tabu gra imprezowa',
      'gra w opisywanie haseł',
      'gry drużynowe na imprezę'
    ],
    steps: [
      {
        name: 'Podzielcie się na drużyny',
        text: 'Aplikacja pomaga rozdzielić graczy na dwie lub więcej drużyn.'
      },
      {
        name: 'Opisujący dostaje hasło i listę zakazanych słów',
        text: 'Na ekranie widzi hasło do zgadnięcia oraz słowa, których nie wolno użyć w opisie.'
      },
      {
        name: 'Drużyna zgaduje na czas',
        text: 'Opisujący mówi wszystko poza zakazanymi słowami, a jego drużyna rzuca odpowiedziami.'
      },
      {
        name: 'Przeciwnicy pilnują zasad',
        text: 'Drużyna przeciwna słucha i naciska "SPALONE", gdy padnie zakazane słowo. Hasło wtedy przepada.'
      },
      {
        name: 'Zamiana ról',
        text: 'Po upływie czasu tura przechodzi do kolejnej drużyny, a punkty sumują się do końca gry.'
      }
    ],
    scoring:
      'Każde poprawnie zgadnięte hasło to punkt dla drużyny. Użycie zakazanego słowa unieważnia hasło. Wygrywa drużyna z największą liczbą punktów po ustalonej liczbie tur.',
    tips: [
      'Zaczynaj od kategorii nadrzędnej ("to jest sport"), potem zawężaj - drużyna szybciej wchodzi na trop.',
      'Nie bój się pomijać trudnych haseł, jeśli tracisz na nie za dużo czasu.',
      'W trybie online sędziowanie jest automatyczne po stronie przeciwników, więc nikt nie musi pilnować kartek.'
    ],
    faq: [
      {
        question: 'Ile osób potrzeba do gry w Zakazane?',
        answer:
          'Od 4 do 10 osób, czyli minimum dwie drużyny po dwie osoby. Im więcej graczy, tym więcej sędziów po stronie przeciwnej.'
      },
      {
        question: 'Czy Zakazane to to samo co Tabu?',
        answer:
          'Mechanika jest z tej samej rodziny - opisujesz hasło bez używania zakazanych słów. Zakazane to polska gra na telefon z własnymi hasłami i rolą sędziego z buzzerem dla drużyny przeciwnej.'
      },
      {
        question: 'Czy da się grać na jednym telefonie?',
        answer:
          'Tak. Telefon podajecie opisującemu z każdej drużyny po kolei. Jest też tryb online, w którym każdy widzi swoją rolę na własnym ekranie.'
      }
    ]
  },
  {
    slug: 'impostor',
    title: 'Impostor',
    tagline: 'Odkryj zdrajcę wśród przyjaciół.',
    summary:
      'Impostor to gra imprezowa typu social deduction: wszyscy dostają to samo hasło poza jedną osobą, która musi blefować i nie dać się wykryć w głosowaniu.',
    intro: [
      'Każdy widzi hasło na swoim ekranie - poza impostorem, który dostaje pustkę i musi udawać, że wie, o co chodzi. Potem kolejno rzucacie podpowiedziami, po jednym słowie, na tyle konkretnymi, żeby udowodnić swoją niewinność, i na tyle ogólnymi, żeby nie zdradzić hasła zdrajcy.',
      'Na koniec głosowanie. Jeśli grupa wskaże impostora, wygrywa reszta. Jeśli nie, albo jeśli impostor zgadnie hasło, wygrywa on.'
    ],
    genre: 'Gra imprezowa typu social deduction (wykrywanie oszusta)',
    alsoKnownAs: ['gra w zdrajcę', 'social deduction po polsku', 'gra typu impostor'],
    players: '3-8 graczy',
    minPlayers: 3,
    maxPlayers: 8,
    duration: '10-25 minut',
    local: true,
    online: true,
    modeLabel: 'Na jednym telefonie lub każdy na swoim',
    bestFor: 'grupy, które lubią blefować, oskarżać i śmiać się z własnych teorii',
    art: '/games/impostor.webp',
    glow: '#EF4444',
    keywords: [
      'impostor gra na telefon',
      'gra w zdrajcę',
      'gry dedukcyjne na imprezę',
      'gra w blefowanie'
    ],
    steps: [
      {
        name: 'Rozdanie ról',
        text: 'Aplikacja losuje hasło i przydziela role. Wszyscy widzą hasło poza impostorem.'
      },
      {
        name: 'Runda podpowiedzi',
        text: 'Po kolei każdy mówi jedno słowo kojarzące się z hasłem. Impostor improwizuje na podstawie tego, co usłyszał.'
      },
      {
        name: 'Dyskusja',
        text: 'Grupa porównuje podpowiedzi i szuka osoby, która brzmi zbyt ogólnie albo zbyt pewnie.'
      },
      {
        name: 'Głosowanie',
        text: 'Wszyscy wskazują podejrzanego. Aplikacja odsłania wynik i prawdziwą rolę.'
      },
      {
        name: 'Ostatnia szansa impostora',
        text: 'Wykryty impostor może jeszcze spróbować zgadnąć hasło i uratować rundę.'
      }
    ],
    scoring:
      'Grupa wygrywa rundę, gdy poprawnie wskaże impostora. Impostor wygrywa, gdy przetrwa głosowanie albo trafi hasło po wykryciu. Punkty sumują się przez kolejne rundy.',
    tips: [
      'Podpowiedź zbyt oczywista pomaga impostorowi - podpowiedź zbyt ogólna czyni z Ciebie podejrzanego.',
      'Zwracaj uwagę na osoby, które odzywają się dopiero po kilku podpowiedziach.',
      'Role są przydzielane przez serwer i nie są rozsyłane po urządzeniach, więc nikt nie podejrzy cudzej karty.'
    ],
    faq: [
      {
        question: 'Ile osób potrzeba do gry w Impostora?',
        answer:
          'Od 3 do 8 osób. Przy trzech graczach dedukcja jest błyskawiczna, przy sześciu i więcej robi się z tego pełnoprawna dyskusja.'
      },
      {
        question: 'Czy Impostor działa na jednym telefonie?',
        answer:
          'Tak. Telefon krąży po grupie i każdy po kolei sprawdza swoją rolę na osobnym ekranie. Jest też tryb online, w którym każdy widzi rolę u siebie.'
      },
      {
        question: 'Czy impostor może wygrać, gdy zostanie wykryty?',
        answer:
          'Tak. Po wskazaniu przez grupę dostaje ostatnią szansę na odgadnięcie hasła - trafienie ratuje mu rundę.'
      }
    ]
  },
  {
    slug: 'sekrety',
    title: 'Sekrety',
    tagline: 'Poznajcie się lepiej, zanim impreza się rozkręci.',
    summary:
      'Sekrety to imprezowy ice breaker online, w którym dziewięć typów rund - od anonimowych sekretów, przez "kto z nas", po selfie na żądanie - tasuje się jak talia kart i nikt nie wie, co będzie dalej.',
    intro: [
      'Sekrety nie mają jednej mechaniki. To zestaw krótkich rund, które lecą jedna po drugiej: anonimowy sekret, prawda czy kłamstwo, "kto z nas", nigdy przenigdy, gorące krzesło, uszereguj nas, twarz na żądanie, jak dobrze cię znamy i riposta.',
      'Odpowiedzi są anonimowe, a między rundami wpadają ukryte modyfikatory - mnożniki punktów, sojusze i konsekwencje - które odsłaniają się dopiero w trakcie. Dzięki temu każda partia wygląda inaczej.'
    ],
    genre: 'Imprezowy ice breaker online z losowanymi typami rund',
    alsoKnownAs: ['gra w sekrety', 'ice breaker na imprezę', 'gra typu prawda czy wyzwanie'],
    players: '3-10 graczy',
    minPlayers: 3,
    maxPlayers: 10,
    duration: '20-40 minut',
    local: false,
    online: true,
    modeLabel: 'Online - każdy na swoim telefonie',
    bestFor: 'ekipa, która się dopiero poznaje, oraz każdy before, który wymaga przełamania lodów',
    art: '/games/sekrety.webp',
    glow: '#A855F7',
    keywords: [
      'gry na przełamanie lodów',
      'gra w sekrety',
      'gry na poznanie się',
      'gry imprezowe online ze znajomymi'
    ],
    steps: [
      {
        name: 'Host tworzy pokój',
        text: 'Gracze dołączają kodem pokoju lub kodem QR, każdy na swoim telefonie.'
      },
      {
        name: 'Wybierzcie poziom treści',
        text: 'Do wyboru są trzy tiery: Na luzie, Impreza oraz Bez hamulców dla dorosłych.'
      },
      {
        name: 'Losuje się typ rundy',
        text: 'Talia rund tasuje się przed grą, więc nie wiadomo, czy trafi się sekret, głosowanie czy selfie.'
      },
      {
        name: 'Wszyscy odpowiadają anonimowo',
        text: 'Odpowiedzi trafiają na wspólny ekran bez podpisu, a grupa zgaduje, kto co napisał.'
      },
      {
        name: 'Odsłona i punkty',
        text: 'Aplikacja odkrywa autorów, dolicza punkty i ujawnia aktywne modyfikatory.'
      }
    ],
    scoring:
      'Punkty przyznawane są za trafne typowanie autorów oraz za wygrane głosowania w poszczególnych rundach. Ukryte modyfikatory potrafią je mnożyć, więc wynik do końca nie jest przesądzony.',
    tips: [
      'Zacznijcie od poziomu "Na luzie", jeśli w ekipie są osoby, które widzą się pierwszy raz.',
      'Tier "Bez hamulców" jest przeznaczony dla dorosłych - warto ustalić to przed startem.',
      'Runda z selfie działa najlepiej, gdy wszyscy siedzą w jednym pomieszczeniu.'
    ],
    faq: [
      {
        question: 'Czy w Sekrety można grać na jednym telefonie?',
        answer:
          'Nie. Sekrety wymagają, żeby każdy grał na swoim telefonie, bo odpowiedzi są anonimowe i nie mogą być widoczne dla reszty przed odsłoną.'
      },
      {
        question: 'Jakie typy rund są w Sekretach?',
        answer:
          'Dziewięć: Sekret, Prawda-Kłamstwo, Kto z nas, Nigdy przenigdy, Gorące krzesło, Uszereguj nas, Twarz na żądanie, Jak dobrze cię znamy oraz Riposta.'
      },
      {
        question: 'Czy Sekrety są odpowiednie dla każdej grupy?',
        answer:
          'Poziomy Na luzie i Impreza są bezpieczne dla mieszanych ekip. Poziom Bez hamulców zawiera treści dla dorosłych i jest oznaczony jako 18+.'
      }
    ]
  },
  {
    slug: 'panstwa-miasta',
    title: 'Państwa Miasta',
    tagline: 'Litera, kolumny i walka o punkty.',
    summary:
      'Państwa Miasta to cyfrowa wersja klasycznej gry na kartkę: losuje się litera, wszyscy jednocześnie wypełniają kolumny kategorii, a potem wzajemnie oceniają odpowiedzi i liczą punkty.',
    intro: [
      'Ta sama gra, którą znasz z zeszytu w kratkę, tylko bez sporów o pismo i bez ręcznego liczenia punktów. Aplikacja losuje literę, pilnuje czasu i sama zbiera odpowiedzi wszystkich graczy.',
      'Najciekawsza jest faza oceny: odpowiedzi trafiają pod głosowanie grupy, a wątpliwe hasła można obronić jokerem. Punktacja idzie po klasycznych zasadach - 15 punktów za odpowiedź unikalną, mniej za powtórzoną.'
    ],
    genre: 'Klasyczna gra słowna na literę, w wersji na telefon',
    alsoKnownAs: ['państwa miasta online', 'gra na kartkę', 'scattergories po polsku'],
    players: '2-10 graczy',
    minPlayers: 2,
    maxPlayers: 10,
    duration: '15-30 minut',
    local: false,
    online: true,
    modeLabel: 'Online - każdy na swoim telefonie',
    bestFor: 'mieszane grupy i rodziny, gdzie każdy zna zasady od dziecka',
    art: '/games/panstwa.webp',
    glow: '#3B82F6',
    keywords: [
      'państwa miasta online',
      'państwa miasta na telefon',
      'gra słowna na literę',
      'gry ze znajomymi online'
    ],
    steps: [
      {
        name: 'Ustalcie kategorie',
        text: 'Host wybiera kolumny, na przykład państwo, miasto, imię, rzecz, roślina, zwierzę.'
      },
      {
        name: 'Losowanie litery',
        text: 'Aplikacja losuje literę dla całej rundy i startuje odliczanie.'
      },
      {
        name: 'Wszyscy piszą jednocześnie',
        text: 'Każdy wypełnia swoje kolumny na własnym telefonie, dopóki nie skończy się czas.'
      },
      {
        name: 'Wzajemna ocena',
        text: 'Odpowiedzi trafiają pod głosowanie. Wątpliwe hasła można obronić jokerem obrony.'
      },
      {
        name: 'Podliczenie punktów',
        text: 'Aplikacja sumuje wynik i pokazuje klasyfikację po każdej rundzie.'
      }
    ],
    scoring:
      'Klasyczna punktacja: 15 punktów za unikalną poprawną odpowiedź, 10 za odpowiedź powtórzoną przez innych, 5 za odpowiedź częściowo uznaną i 0 za brak lub odrzucenie. Do tego dochodzą mnożniki i joker obrony.',
    tips: [
      'Nie zostawiaj pustej kolumny - nawet ryzykowna odpowiedź może zostać uznana w głosowaniu.',
      'Trzymaj jokera obrony na hasło, o które na pewno wybuchnie kłótnia.',
      'Krótszy czas rundy oznacza więcej rund i mniej czasu na szukanie w pamięci.'
    ],
    faq: [
      {
        question: 'Czy w Państwa Miasta można grać przez internet?',
        answer:
          'Tak, to gra wyłącznie online. Każdy gracz wypełnia kolumny na swoim telefonie, a wyniki liczą się automatycznie.'
      },
      {
        question: 'Ile punktów daje odpowiedź w Państwa Miasta?',
        answer:
          'Unikalna poprawna odpowiedź to 15 punktów, powtórzona przez innych 10, częściowo uznana 5, a brak lub odrzucona odpowiedź 0 punktów.'
      },
      {
        question: 'Czy trzeba być w tej samej sieci Wi-Fi?',
        answer:
          'Nie. Wystarczy, że każdy ma internet i kod pokoju. Gracze mogą być w różnych miejscach.'
      }
    ]
  },
  {
    slug: 'gra-na-p',
    title: 'Gra na P',
    tagline: 'Opisz hasło tylko słowami na literę P.',
    summary:
      'Gra na P to kalambury słowne z jednym absurdalnym ograniczeniem: hasło możesz opisywać wyłącznie słowami zaczynającymi się na literę P.',
    intro: [
      'Brzmi jak żart, działa jak najlepsza gra wieczoru. Masz hasło i możesz powiedzieć o nim wszystko, pod warunkiem że każde Twoje słowo zaczyna się na P. "Prostokątne pudło, przenosi pasażerów, potrzebuje paliwa" - i ekipa zgaduje.',
      'Punkty dostaje zarówno zgadujący, jak i opisujący, więc opłaca się kombinować, a nie kalkulować. Zamiast rund gra liczy kółka, w których każdy raz opisuje.'
    ],
    genre: 'Kalambury słowne z ograniczeniem na jedną literę',
    alsoKnownAs: ['kalambury na P', 'gra w słowa na P', 'gra słowna na imprezę'],
    players: '2-10 graczy',
    minPlayers: 2,
    maxPlayers: 10,
    duration: '10-25 minut',
    local: true,
    online: true,
    modeLabel: 'Na jednym telefonie lub każdy na swoim',
    bestFor: 'moment, w którym ekipa jest już rozkręcona i chce czegoś absurdalnego',
    art: '/games/granap.webp',
    glow: '#F97316',
    keywords: [
      'kalambury na p',
      'gra na literę p',
      'gry słowne na imprezę',
      'gra w opisywanie słowami na p'
    ],
    steps: [
      {
        name: 'Opisujący dostaje hasło',
        text: 'Hasło widzi tylko osoba, która w danym kółku opisuje.'
      },
      {
        name: 'Mów wyłącznie słowami na P',
        text: 'Każde słowo w opisie musi zaczynać się na literę P. Gesty i dźwięki nie liczą się jako słowa.'
      },
      {
        name: 'Reszta zgaduje bez ograniczeń',
        text: 'Zgadujący mogą rzucać dowolnymi odpowiedziami, ile razy chcą.'
      },
      {
        name: 'Punkt dla dwóch stron',
        text: 'Trafienie daje punkt zgadującemu i punkt opisującemu.'
      },
      {
        name: 'Kolejne kółko',
        text: 'Rola opisującego przechodzi dalej, aż każdy zaliczy swoją kolejkę.'
      }
    ],
    scoring:
      'Za każde trafione hasło punkt dostaje osoba, która zgadła, oraz osoba, która opisywała. Gra liczona jest w kółkach, więc każdy ma tyle samo okazji do zdobycia punktów.',
    tips: [
      'Zaczynaj od kategorii: "przedmiot", "postać", "potrawa" - to wszystko słowa na P.',
      'Przymiotniki na P ratują życie: prostokątny, przezroczysty, pluszowy, popularny.',
      'Nie przerywaj, gdy się pomylisz - lepiej mówić dalej niż tracić czas na tłumaczenia.'
    ],
    faq: [
      {
        question: 'Na czym polega Gra na P?',
        answer:
          'Opisujesz wylosowane hasło swojej ekipie, ale każde słowo, którego użyjesz, musi zaczynać się na literę P. Zgadujący nie mają żadnych ograniczeń.'
      },
      {
        question: 'Ile osób może grać w Grę na P?',
        answer:
          'Od 2 do 10 osób, zarówno na jednym telefonie, jak i online, gdzie każdy gra na swoim.'
      },
      {
        question: 'Czy gesty są dozwolone?',
        answer:
          'Zasada dotyczy słów, więc mimika i gesty przechodzą - ale to właśnie słowa na P dają najwięcej śmiechu.'
      }
    ]
  },
  {
    slug: 'szybka-trojka',
    title: 'Szybka Trójka',
    tagline: 'Wymień trzy rzeczy, zanim kulka doleci do końca.',
    summary:
      'Szybka Trójka to błyskawiczna gra na skojarzenia: słyszysz polecenie "wymień 3 rzeczy...", a kulka spadająca przez rurkę na ekranie odmierza Ci czas na trzy odpowiedzi na głos.',
    intro: [
      'Zasada jest banalnie prosta i właśnie dlatego działa na każdej imprezie: pytanie typu "wymień 3 zwierzęta na safari" albo "wymień 3 rzeczy, które chowasz przed rodzicami", a Ty masz odpowiedzieć na głos, zanim kulka dotrze do końca krętej rurki.',
      'Telefon puszcza czas osoba, która czyta polecenie - nie Ty. Dzięki temu nie masz ani sekundy na spokojne myślenie, a reszta ekipy patrzy, jak kulka przyspiesza w ostatnim zakręcie.'
    ],
    genre: 'Gra imprezowa na skojarzenia i refleks pod presją czasu',
    alsoKnownAs: ['gra w trójki', 'wymień 3 rzeczy', 'gra na czas ze znajomymi'],
    players: '2-10 graczy',
    minPlayers: 2,
    maxPlayers: 10,
    duration: '10-20 minut',
    local: true,
    online: true,
    modeLabel: 'Na jednym telefonie lub każdy na swoim',
    bestFor: 'szybkie tury między innymi grami, gdy ekipa chce czegoś na refleks',
    art: '/games/trojka.webp',
    glow: '#06B6D4',
    keywords: [
      'gra wymień 3 rzeczy',
      'szybka trójka gra',
      'gra na skojarzenia na telefon',
      'gra imprezowa na czas'
    ],
    steps: [
      {
        name: 'Polecenie czyta sąsiad',
        text: 'Osoba obok odpowiadającego czyta na głos "wymień 3 rzeczy..." - odpowiadający go jeszcze nie widzi.'
      },
      {
        name: 'Puszczenie kulki startuje czas',
        text: 'Czytający puszcza kulkę w rurce dopiero po przeczytaniu polecenia na głos.'
      },
      {
        name: 'Trzy odpowiedzi na głos',
        text: 'Odpowiadający wymienia trzy rzeczy zanim kulka doleci na dół krętej rurki.'
      },
      {
        name: 'Host ocenia werdykt',
        text: 'Host jednym tapnięciem potwierdza, czy padły trzy odpowiedzi, zanim kulka wylądowała.'
      },
      {
        name: 'Przejęcie albo kolejna osoba',
        text: 'Gdy się nie uda, to samo polecenie przejmuje następny gracz - bez powtarzania tego, co już padło.'
      }
    ],
    scoring:
      'Nie ma punktów za wynik liczbowy - gra liczy udane tury i przejęcia. Kto nie zdąży z trzema odpowiedziami, oddaje polecenie następnej osobie w kolejce.',
    tips: [
      'Odpowiadaj pierwszą rzeczą, która przyjdzie do głowy - zastanawianie się kosztuje najwięcej czasu.',
      'Jako czytający nie zdradzaj tempa głosem - kulka i tak nie zwolni.',
      'Dobra rozgrzewka przed cięższymi grami dedukcyjnymi w tym samym wieczorze.'
    ],
    faq: [
      {
        question: 'Ile osób potrzeba do Szybkiej Trójki?',
        answer:
          'Od 2 do 10 osób, zarówno na jednym telefonie podawanym z rąk do rąk, jak i online, gdzie każdy gra na swoim.'
      },
      {
        question: 'Kto ocenia, czy odpowiedzi się zaliczają?',
        answer:
          'Host - jedno tapnięcie po wylądowaniu kulki. Reszta ekipy widzi w tym czasie ekran oczekiwania.'
      },
      {
        question: 'Co się dzieje, gdy ktoś nie zdąży?',
        answer:
          'To samo polecenie przechodzi do następnego gracza w kolejce, bez powtarzania odpowiedzi, które już padły.'
      }
    ]
  }
];

export const getGame = (slug: string) => GAMES.find((g) => g.slug === slug);

export const gamePath = (slug: string) => `/gry/${slug}`;

export const modeSummary = (game: Game) =>
  game.local && game.online
    ? 'lokalnie na jednym telefonie i online'
    : game.online
      ? 'online, każdy na swoim telefonie'
      : 'lokalnie na jednym telefonie';
