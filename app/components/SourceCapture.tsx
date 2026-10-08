'use client';

import { useEffect } from 'react';

import { rememberSource } from '../lib/source';

export default function SourceCapture() {
  useEffect(() => {
    rememberSource();
  }, []);
  return null;
}
