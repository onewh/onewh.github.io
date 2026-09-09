import ResumePage from '@/components/portfolio/resume-page';
import type { Lang } from '@/lib/i18n';
import type { Metadata } from 'next';

export function generateStaticParams() {
  return [{ lang: 'en' }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (lang === 'en') {
    return {
      title: 'Resume · Wang Hao',
      description:
        'Printable resume of Wang Hao: FAE at Zhuzhou Hongda, automotive electronics at BYD, iOS / Flutter development background.',
    };
  }
  return {
    title: '简历 · 王浩',
    description:
      '王浩的可打印简历：株洲宏达 FAE、比亚迪汽车电子、iOS / Flutter 开发背景。',
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const initialLang: Lang = lang === 'en' ? 'en' : 'zh';
  return <ResumePage initialLang={initialLang} />;
}
