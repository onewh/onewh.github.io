import HomePage from '@/components/portfolio/home-page';
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
      title: 'Wang Hao · FAE / Semiconductor Technical Support',
      description:
        "Wang Hao's portfolio. FAE at Zhuzhou Hongda supporting discrete devices and integrated circuits, with an electronics background and mobile development experience.",
    };
  }
  return {
    title: '王浩 · FAE / 半导体技术支持',
    description:
      '王浩的个人网站。现任株洲宏达 FAE，负责分立器件与集成电路产品技术支持，拥有电子科学与技术专业背景及移动端软件开发经验。',
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const initialLang: Lang = lang === 'en' ? 'en' : 'zh';
  return <HomePage initialLang={initialLang} />;
}
