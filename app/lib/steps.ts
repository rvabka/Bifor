export type StartStep = {
  name: string;
  text: string;
  clock: number;
  tint: string;
  shot?: string;
};

export const START_STEPS: StartStep[] = [
  {
    name: 'Wybierasz grę',
    text: 'Siedem gier na jednym ekranie. Stukasz w kafelek i wybierasz kategorię haseł.',
    clock: 2,
    tint: '#FFB200',
    shot: '/screens/biblioteka.webp'
  },
  {
    name: 'Ekipa wchodzi',
    text: 'Jeden telefon krąży po stole albo każdy skanuje kod pokoju. Bez zakładania konta.',
    clock: 14,
    tint: '#6EA8FF',
    shot: '/screens/pokoj.webp'
  },
  {
    name: 'Gracie',
    text: 'Apka trzyma czas, losuje hasła i liczy punkty. Wy tylko krzyczycie.',
    clock: 30,
    tint: '#C084FC'
  }
];
