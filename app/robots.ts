import type { MetadataRoute } from 'next';
import { SITE_URL, abs } from './lib/site';

const PRIVATE_PATHS = ['/auth/', '/potwierdz', '/api/'];

const AI_AGENTS = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-User',
  'Claude-SearchBot',
  'anthropic-ai',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'GoogleOther',
  'Applebot',
  'Applebot-Extended',
  'Amazonbot',
  'meta-externalagent',
  'FacebookBot',
  'CCBot',
  'MistralAI-User',
  'cohere-ai',
  'YouBot',
  'DuckAssistBot',
  'Bytespider'
];

const SEARCH_AGENTS = ['Googlebot', 'Googlebot-Image', 'Bingbot', 'DuckDuckBot', 'Seznam'];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: PRIVATE_PATHS },
      { userAgent: SEARCH_AGENTS, allow: '/', disallow: PRIVATE_PATHS },
      { userAgent: AI_AGENTS, allow: '/', disallow: PRIVATE_PATHS }
    ],
    sitemap: abs('/sitemap.xml'),
    host: SITE_URL
  };
}
