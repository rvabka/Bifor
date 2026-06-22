export function smoothScrollTo(target: string) {
  if (typeof window === 'undefined') return;
  const behavior = 'instant' as ScrollBehavior;
  if (target === 'top') {
    window.scrollTo({ top: 0, behavior });
  } else {
    document.getElementById(target)?.scrollIntoView({ behavior, block: 'start' });
  }
}
