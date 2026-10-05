// Wieczór BIFOR - dane zgodne z apką (lib/party/ w repo aplikacji): presety,
// punkty za miejsce i tytuły gali. Czas presetu apka liczy jako 8 minut na grę,
// zaokrąglone do pięciu.
export const PARTY_PATH = '/wieczor';

export const PARTY_PRESETS = [
  { id: 'quick', name: 'Szybki set', games: 3, time: 'około 25 minut', art: '/wieczor/quick.webp' },
  { id: 'evening', name: 'Wieczór', games: 5, time: 'około 40 minut', art: '/wieczor/evening.webp' },
  { id: 'marathon', name: 'Maraton', games: 8, time: 'około 65 minut', art: '/wieczor/marathon.webp' },
  { id: 'custom', name: 'Układamy sami', games: 0, time: 'tyle gier, ile chcecie', art: '/wieczor/custom.webp' }
] as const;

export const PARTY_POINTS = [10, 7, 5, 4, 3, 2, 1];

export const PARTY_TITLES = [
  { name: 'Czarny koń', text: 'Zaczyna z tyłu tabeli, a kończy dużo wyżej.' },
  { name: 'Bohater jednej gry', text: 'Wygrywa co najmniej jedną grę wieczoru.' },
  { name: 'Wiecznie drugi', text: 'Kilka razy o włos od wygranej.' },
  { name: 'Równa forma', text: 'W każdej grze mniej więcej to samo miejsce.' },
  { name: 'Pechowiec wieczoru', text: 'Kilka razy na ostatnim miejscu.' }
];
