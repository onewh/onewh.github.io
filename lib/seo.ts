import type { Metadata } from 'next';

export const SITE_URL = 'https://onewh.github.io';
export const SITE_NAME = '王浩 · FAE';

export type PageKey = 'home' | 'resume';

const routes: Record<PageKey, Record<'zh' | 'en', string>> = {
  home: { zh: '/', en: '/en' },
  resume: { zh: '/resume', en: '/en/resume' },
};

const ogImage = {
  url: '/og-image.jpg',
  width: 1200,
  height: 630,
  alt: '王浩 · FAE / 半导体技术支持',
};

export function createPageMetadata({
  lang,
  page,
  title,
  description,
}: {
  lang: 'zh' | 'en';
  page: PageKey;
  title: string;
  description: string;
}): Metadata {
  const path = routes[page][lang];

  return {
    title,
    description,
    alternates: {
      canonical: path,
      languages: {
        'zh-CN': routes[page].zh,
        en: routes[page].en,
        'x-default': routes[page].zh,
      },
    },
    openGraph: {
      type: 'website',
      url: path,
      siteName: SITE_NAME,
      title,
      description,
      locale: lang === 'zh' ? 'zh_CN' : 'en_US',
      alternateLocale: [lang === 'zh' ? 'en_US' : 'zh_CN'],
      images: [{ ...ogImage, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/og-image.jpg'],
    },
  };
}
