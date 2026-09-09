'use client';
import { LanguageProvider, type Lang } from '@/lib/i18n';
import ResumeContent from './resume-content';

export default function ResumePage({ initialLang }: { initialLang: Lang }) {
  return (
    <LanguageProvider
      initialLang={initialLang}
      altPath={initialLang === 'zh' ? '/en/resume' : '/resume'}
    >
      <ResumeContent />
    </LanguageProvider>
  );
}
