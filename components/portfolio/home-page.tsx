'use client';
import { LanguageProvider, type Lang } from '@/lib/i18n';
import HomeContent from './home-content';

export default function HomePage({ initialLang }: { initialLang: Lang }) {
  return (
    <LanguageProvider
      initialLang={initialLang}
      altPath={initialLang === 'zh' ? '/en' : '/'}
    >
      <HomeContent />
    </LanguageProvider>
  );
}
