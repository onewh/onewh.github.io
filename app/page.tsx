import HomePage from '@/components/portfolio/home-page';
import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  lang: 'zh',
  page: 'home',
  title: '王浩 · FAE / 半导体技术支持',
  description:
    '王浩的个人网站。现任株洲宏达 FAE，负责分立器件与集成电路产品技术支持，拥有电子科学与技术专业背景及移动端软件开发经验。',
});

export default function Page() {
  return <HomePage initialLang="zh" />;
}
