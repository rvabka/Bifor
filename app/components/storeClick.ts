import type { MouseEvent } from 'react';

// Kliknięcie z modyfikatorem (nowa karta, nowe okno) zostawiamy przeglądarce.
export const isPlainClick = (e: MouseEvent) =>
  e.button === 0 && !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey;
