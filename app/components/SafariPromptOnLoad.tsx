'use client';

import { useState, useSyncExternalStore } from 'react';

import { SAFARI_PROMPT_PARAM, blocksAppStore } from '../lib/inAppBrowser';
import { SITE_SOURCE, currentSource } from '../lib/source';
import OpenInSafariSheet from './OpenInSafariSheet';

const noSubscription = () => () => {};
const shouldPrompt = () =>
  new URLSearchParams(window.location.search).has(SAFARI_PROMPT_PARAM) && blocksAppStore(navigator.userAgent);

// /pobierz/ios odsyła tu przeglądarkę TikToka z parametrem - instrukcja wyjeżdża
// od razu, bo ktoś stuknął już „pobierz” w bio i nie powinien szukać przycisku.
export default function SafariPromptOnLoad() {
  const prompt = useSyncExternalStore(noSubscription, shouldPrompt, () => false);
  const [dismissed, setDismissed] = useState(false);

  if (!prompt || dismissed) return null;
  return <OpenInSafariSheet source={currentSource(SITE_SOURCE)} onClose={() => setDismissed(true)} />;
}
