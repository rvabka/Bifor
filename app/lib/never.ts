import type { GameFaq } from './games';

// Pytania do Nigdy przenigdy - ta sama darmowa pula co w rundzie Nigdy przenigdy w
// Sekretach (BIFOR, lib/games/sekrety/data/prompts/never-prompts.ts). Zmieniasz
// treść w apce - przenieś ją tutaj, żeby strona i gra mówiły to samo.

export const NEVER_PATH = '/pytania-nigdy-przenigdy';

export const NEVER_TITLE = 'Pytania do Nigdy przenigdy: 60 zdań na imprezę i domówkę';
export const NEVER_DESCRIPTION =
  '60 gotowych pytań do Nigdy przenigdy: 30 łagodnych na początek imprezy i 30 odważniejszych, gdy ekipa się rozkręci. Do tego zasady gry i wersja na telefon.';

export const NEVER_INTRO = [
  'Nigdy przenigdy to najprostsza gra na imprezę: ktoś czyta zdanie, a kto to robił, musi się przyznać. Poniżej 60 gotowych zdań z naszej gry Sekrety, w dwóch częściach.',
  'Na luzie nadaje się na początek wieczoru i na ekipę, która dopiero się poznaje. Impreza jest na później, kiedy wszyscy czują się swobodnie, a część zdań dotyczy ludzi w pokoju.'
];

export const NEVER_RULES = [
  { name: 'Ktoś czyta zdanie', text: 'Jedna osoba czyta zdanie na głos, potem kolejna. Każdy zaczyna z dziesięcioma wyciągniętymi palcami.' },
  { name: 'Kto to robił, przyznaje się', text: 'Zgina palec. Reszta ma prawo dopytać o szczegóły i zwykle z tego prawa korzysta.' },
  { name: 'Pierwszy bez palców przegrywa', text: 'Albo grajcie bez przegranych - w tej grze i tak chodzi o historie, które padną przy okazji.' }
];

export type NeverSet = { id: string; title: string; note: string; questions: string[] };

export const NEVER_SETS: NeverSet[] = [
  {
    id: 'na-luzie',
    title: 'Na luzie',
    note: 'Na początek imprezy i na ekipę, która dopiero się poznaje.',
    questions: [
      'Nigdy nie zdarzyło mi się zasnąć w kinie.',
      'Nigdy nie zdarzyło mi się udawać rozmowy przez telefon, żeby kogoś uniknąć.',
      'Nigdy nie zdarzyło mi się odpowiedzieć „nawzajem” kelnerowi, który życzył smacznego.',
      'Nigdy nie zdarzyło mi się zatrzasnąć kluczy w domu.',
      'Nigdy nie zdarzyło mi się założyć słuchawek bez muzyki, żeby nikt mnie nie zagadał.',
      'Nigdy nie zdarzyło mi się otworzyć i zacząć jeść czegoś w sklepie przed zapłaceniem.',
      'Nigdy nie zdarzyło mi się oddać komuś dalej prezentu, który był dla mnie.',
      'Nigdy nie zdarzyło mi się przez roztargnienie wyjść ze sklepu bez płacenia.',
      'Nigdy nie zdarzyło mi się skłamać, ile mam lat.',
      'Nigdy nie zdarzyło mi się powiedzieć do nauczyciela „mamo” albo „tato”.',
      'Nigdy nie zdarzyło mi się pożyczyć czegoś i „zapomnieć” to oddać.',
      'Nigdy nie zdarzyło mi się wysłać komuś zrzutu ekranu rozmowy właśnie z tą osobą.',
      'Nigdy nie zdarzyło mi się płakać na bajce dla dzieci.',
      'Nigdy nie zdarzyło mi się dać złapać na ściąganiu.',
      'Nigdy nie zdarzyło mi się zjeść obiadu na stojąco nad zlewem.',
      'Nigdy nie zdarzyło mi się podrobić podpisu rodzica.',
      'Nigdy nie zdarzyło mi się skoczyć na bungee albo ze spadochronem.',
      'Nigdy nie zdarzyło mi się trafić na dywanik do dyrektora.',
      'Nigdy nie zdarzyło mi się udawać obcokrajowca, żeby uniknąć rozmowy.',
      'Nigdy nie zdarzyło mi się wejść na dach albo do opuszczonego budynku.',
      'Nigdy nie zdarzyło mi się dostać mandatu.',
      'Nigdy nie zdarzyło mi się stłuc czegoś w sklepie i po cichu ulotnić.',
      'Nigdy nie zdarzyło mi się skłamać w CV.',
      'Nigdy nie zdarzyło mi się przypadkiem podpalić czegoś w kuchni.',
      'Nigdy nie zdarzyło mi się zjeść czegoś obrzydliwego na zakład.',
      'Nigdy nie zdarzyło mi się podać przez telefon za kogoś innego.',
      'Nigdy nie zdarzyło mi się tłumaczyć przed policją.',
      'Nigdy nie zdarzyło mi się złamać kości w naprawdę głupi sposób.',
      'Nigdy nie zdarzyło mi się wystąpić przed publicznością większą niż sto osób.',
      'Nigdy nie zdarzyło mi się jechać karetką na sygnale.',
    ]
  },
  {
    id: 'impreza',
    title: 'Impreza',
    note: 'Gdy wszyscy czują się już swobodnie. Część zdań dotyczy ludzi w pokoju.',
    questions: [
      'Nigdy nie zdarzyło mi się napisać do osoby, która mi się podoba, i od razu tego skasować.',
      'Nigdy nie zdarzyło mi się wejść na imprezę bez zaproszenia.',
      'Nigdy nie zdarzyło mi się niechcący polubić czyjegoś zdjęcia sprzed lat.',
      'Nigdy nie zdarzyło mi się udawać choroby, żeby wymigać się ze spotkania.',
      'Nigdy nie zdarzyło mi się podkochiwać w kimś z tego pokoju.',
      'Nigdy nie zdarzyło mi się zmyślić drugiej połówki, żeby ktoś dał mi spokój.',
      'Nigdy nie zdarzyło mi się dać komuś fałszywego numeru telefonu.',
      'Nigdy nie zdarzyło mi się zmienić planów, bo miała tam być osoba, która mi się podoba.',
      'Nigdy nie zdarzyło mi się wylecieć z grupowego czatu.',
      'Nigdy nie zdarzyło mi się zakochać w kimś, kto był już zajęty.',
      'Nigdy nie zdarzyło mi się skłamać rodzicom, u kogo nocuję.',
      'Nigdy nie zdarzyło mi się wrzucić relacji tylko dla jednej konkretnej osoby.',
      'Nigdy nie zdarzyło mi się wylądować na imprezie u zupełnie obcych ludzi.',
      'Nigdy nie zdarzyło mi się poprosić kogoś o „ratunkowy” telefon w trakcie randki.',
      'Nigdy nie zdarzyło mi się celowo zwlekać z odpisaniem, żeby nie było widać, że mi zależy.',
      'Nigdy nie zdarzyło mi się całować z kimś z tego pokoju.',
      'Nigdy nie zdarzyło mi się wejść gdzieś przez okno, bo drzwi były zamknięte.',
      'Nigdy nie zdarzyło mi się wylecieć z klubu albo z imprezy.',
      'Nigdy nie zdarzyło mi się spotykać z kimś, kogo nie znosili moi przyjaciele.',
      'Nigdy nie zdarzyło mi się założyć tajnego konta, żeby kogoś obserwować.',
      'Nigdy nie zdarzyło mi się spontanicznie pojechać w nocy do innego miasta.',
      'Nigdy nie zdarzyło mi się wydać całej wypłaty w jeden weekend.',
      'Nigdy nie zdarzyło mi się, że szef przyłapał mnie na ściemie.',
      'Nigdy nie zdarzyło mi się iść prosto z imprezy do pracy albo na zajęcia.',
      'Nigdy nie zdarzyło mi się śnić o kimś z tego pokoju.',
      'Nigdy nie zdarzyło mi się przejrzeć całego profilu byłej albo byłego mojej drugiej połówki.',
      'Nigdy nie zdarzyło mi się, że ktoś z tego pokoju przyłapał mnie na kłamstwie.',
      'Nigdy nie zdarzyło mi się wysłać komuś screena rozmowy z kimś z tego pokoju.',
      'Nigdy nie zdarzyło mi się wygadać komuś z tego pokoju cudzego sekretu.',
      'Nigdy nie zdarzyło mi się mieć z kimś z tego pokoju sekretu, o którym reszta nie wie.',
    ]
  }
];

export const NEVER_FAQ: GameFaq[] = [
  {
    question: 'Jak grać w Nigdy przenigdy?',
    answer:
      'Ktoś czyta zdanie zaczynające się od „Nigdy nie zdarzyło mi się”, a każdy, komu się to zdarzyło, zgina palec. Na start każdy ma dziesięć palców, przegrywa ten, kto pierwszy zegnie wszystkie.'
  },
  {
    question: 'Ile osób potrzeba do Nigdy przenigdy?',
    answer: 'Wystarczą trzy osoby, najlepiej gra się w grupie od czterech do dziesięciu.'
  },
  {
    question: 'Jak zagrać w Nigdy przenigdy na telefonie?',
    answer:
      'W BIFOR Nigdy przenigdy jest jedną z dziewięciu rund w grze Sekrety. Każdy odpowiada na swoim telefonie, a wynik pokazuje się dopiero, gdy odpowie cała ekipa. Punkt dostaje mniejszość: jeśli przyzna się garstka, punkty idą do niej, a jeśli większość - do tych, którym się to nie zdarzyło.'
  },
  {
    question: 'Skąd wziąć więcej pytań do Nigdy przenigdy?',
    answer:
      'W aplikacji BIFOR zdania losują się same i nie powtarzają między kolejnymi grami. Kategoria Rozkminy w BIFOR+ dokłada 20 kolejnych.'
  }
];
