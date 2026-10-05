// Poradnik „W co zagrać na imprezie”. Ma odpowiadać na pytanie, które ludzie
// zadają wyszukiwarkom i chatbotom, także wtedy, gdy odpowiedzią jest gra bez
// żadnej aplikacji - strona, która poleca wyłącznie siebie, nie jest cytowana.
export const GUIDE_PATH = '/gry-na-impreze';

export type GuideGame = {
  name: string;
  players: string;
  needs: string;
  text: string;
  /** Wersja w BIFOR, jeśli istnieje. */
  bifor?: { slug: string; note: string };
};

export const GUIDE_INTRO = [
  'Każda domówka ma ten moment: wszyscy już są, jedzenie stoi, a rozmowa zaczyna krążyć w kółko. Wtedy przydaje się gra, którą da się wytłumaczyć w pół minuty.',
  'Poniżej masz dziesięć sprawdzonych gier na imprezę. Część potrzebuje tylko kartek albo niczego, część działa najlepiej na telefonie. Przy każdej piszemy, ile osób jest potrzebnych i co trzeba mieć pod ręką.'
];

export const GUIDE_PICKS = [
  { situation: 'Jest was dwoje', games: 'Czółko, Państwa Miasta, Szybka Trójka' },
  { situation: '4-6 osób, luźny wieczór', games: 'Impostor, Czółko, Kalambury' },
  { situation: 'Dziesięć osób i więcej', games: 'Zakazane w drużynach, Mafia, Sekrety' },
  { situation: 'Ekipa się nie zna', games: 'Sekrety, Dwie prawdy i kłamstwo, Nigdy przenigdy' },
  { situation: 'Nie ma internetu', games: 'Kalambury, Mafia, gry na jednym telefonie w BIFOR' },
  { situation: 'Macie godzinę i chcecie zwycięzcy', games: 'Wieczór BIFOR, czyli kilka gier i jedna tabela' }
];

export const GUIDE_GAMES: GuideGame[] = [
  {
    name: 'Czółko (Kim jestem?)',
    players: '2-8 osób',
    needs: 'karteczki samoprzylepne albo telefon',
    text: 'Każdy ma na czole hasło, które widzą wszyscy oprócz niego, i zgaduje je pytaniami tak albo nie. Klasycznie na karteczkach przyklejonych do czoła, na telefonie bez pisania i z punktami za to, kto zgadnie pierwszy.',
    bifor: { slug: 'czolko', note: 'Czółko w BIFOR: każdy ma własne hasło, pytacie w kółko, bez limitu czasu.' }
  },
  {
    name: 'Kalambury',
    players: '4-12 osób',
    needs: 'nic, ewentualnie kartki z hasłami',
    text: 'Pokazujesz hasło bez słów, drużyna zgaduje. Najstarsza gra imprezowa świata i wciąż działa. Wersja słowna, w której wolno mówić, ale tylko słowami na jedną literę, robi się absurdalna bardzo szybko.',
    bifor: { slug: 'gra-na-p', note: 'Gra na P: opisujesz hasło wyłącznie słowami na P.' }
  },
  {
    name: 'Zakazane słowa (w stylu Tabu)',
    players: '4-10 osób w drużynach',
    needs: 'karty z hasłami i zakazanymi słowami albo telefon',
    text: 'Opisujesz hasło drużynie, ale nie wolno ci użyć kilku najbardziej oczywistych słów. Przeciwnicy pilnują i krzyczą, gdy któreś padnie. Świetna na dużą ekipę, bo wszyscy są w grze przez cały czas.',
    bifor: { slug: 'zakazane', note: 'Zakazane: polskie hasła, przeciwnicy sędziują przyciskiem SPALONE.' }
  },
  {
    name: 'Impostor (szpieg)',
    players: '3-8 osób',
    needs: 'telefon albo karteczki z jednym pustym polem',
    text: 'Wszyscy znają hasło oprócz jednej osoby. Każdy mówi jedno skojarzenie, a potem szukacie, kto blefuje. Na kartkach ktoś musi rozdać role, na telefonie robi to aplikacja i nikt nie zna wyniku z góry.',
    bifor: { slug: 'impostor', note: 'Impostor w BIFOR: jeden, dwóch albo losowa liczba impostorów, opcjonalna podpowiedź.' }
  },
  {
    name: 'Państwa Miasta',
    players: '2-10 osób',
    needs: 'kartki i długopisy albo telefon dla każdego',
    text: 'Losujecie literę i wypełniacie kolumny: państwo, miasto, zwierzę, rzecz. Na kartkach najdłużej trwa liczenie punktów i kłótnie o pismo, na telefonach punkty liczą się same.',
    bifor: { slug: 'panstwa-miasta', note: 'Państwa Miasta w BIFOR: osiem zestawów kolumn, wszystkie za darmo.' }
  },
  {
    name: 'Wymień 3 rzeczy',
    players: '2-10 osób',
    needs: 'lista poleceń i coś do mierzenia czasu',
    text: 'Ktoś czyta „Wymień 3 rzeczy, które…”, a ty masz kilka sekund na trzy odpowiedzi na głos. Banalnie proste i bardzo głośne. Dobra rozgrzewka przed dłuższymi grami.',
    bifor: { slug: 'szybka-trojka', note: 'Szybka Trójka: czas odmierza kulka spadająca przez rurkę na ekranie.' }
  },
  {
    name: 'Nigdy przenigdy',
    players: '3-12 osób',
    needs: 'nic',
    text: 'Ktoś mówi „Nigdy przenigdy nie…”, a kto to robił, przyznaje się. Na nieznajomą ekipę wybierajcie łagodne zdania, ostrzejsze zostawcie na później.',
    bifor: { slug: 'sekrety', note: 'Jedna z dziewięciu rund w Sekretach, z anonimowym głosowaniem.' }
  },
  {
    name: 'Dwie prawdy i kłamstwo',
    players: '3-10 osób',
    needs: 'nic',
    text: 'Każdy mówi trzy rzeczy o sobie, jedna jest kłamstwem, reszta zgaduje którą. Najlepsza gra na poznanie się, bo ludzie sami wybierają, co chcą opowiedzieć.',
    bifor: { slug: 'sekrety', note: 'W Sekretach jako runda Prawda czy kłamstwo, z punktami za zmylenie innych.' }
  },
  {
    name: 'Kto z nas…',
    players: '4-12 osób',
    needs: 'nic',
    text: '„Kto z nas pierwszy zaśnie na imprezie?” Na trzy wszyscy wskazują palcem. Śmiesznie od pierwszego pytania, nie wymaga żadnego przygotowania.',
    bifor: { slug: 'sekrety', note: 'Runda Kto z nas w Sekretach, z głosowaniem na telefonach.' }
  },
  {
    name: 'Mafia (Wilkołak)',
    players: '7-15 osób',
    needs: 'karty ról albo karteczki i jedna osoba prowadząca',
    text: 'Nocą mafia wybiera ofiarę, w dzień miasto głosuje, kogo wyrzucić. Wymaga prowadzącego i trochę czasu na wytłumaczenie, ale przy dużej ekipie daje najlepsze historie wieczoru. W BIFOR jej nie ma, najbliżej jest Impostor.'
  }
];

export const GUIDE_PLAN = [
  {
    when: 'Na start',
    what: 'Coś krótkiego, co nie wymaga myślenia: Czółko albo Wymień 3 rzeczy. Ludzie się rozkręcają, a spóźnieni dołączają w trakcie.'
  },
  {
    when: 'Gdy wszyscy już są',
    what: 'Gra drużynowa albo na blef: Zakazane słowa, Impostor. Tu robi się najgłośniej.'
  },
  {
    when: 'Później',
    what: 'Gry o was samych: Nigdy przenigdy, Dwie prawdy i kłamstwo, Kto z nas. Najlepiej działają, gdy wszyscy czują się już swobodnie.'
  }
];

export const GUIDE_FAQ = [
  {
    question: 'Jakie gry na imprezę nie wymagają niczego?',
    answer:
      'Kalambury, Nigdy przenigdy, Dwie prawdy i kłamstwo oraz Kto z nas. Wystarczą ludzie i ktoś, kto zacznie.'
  },
  {
    question: 'W co zagrać we dwoje?',
    answer:
      'W Czółko, Państwa Miasta albo Wymień 3 rzeczy. W BIFOR wszystkie trzy działają od dwóch osób.'
  },
  {
    question: 'Jakie są dobre gry imprezowe na telefon po polsku?',
    answer:
      'BIFOR ma siedem gier w jednej aplikacji: Czółko, Zakazane, Impostor, Sekrety, Państwa Miasta, Grę na P i Szybką Trójkę. Jest za darmo na iPhone i Androida, a w pięć z tych gier gra się na jednym telefonie.'
  },
  {
    question: 'Jak zorganizować wieczór gier, żeby nikt się nie nudził?',
    answer:
      'Zacznijcie od krótkich gier, przejdźcie do drużynowych, a gry o was samych zostawcie na później. Jeśli chcecie zwycięzcy całego wieczoru, liczcie miejsca w każdej grze albo włączcie Wieczór BIFOR, który robi to za was.'
  }
];
