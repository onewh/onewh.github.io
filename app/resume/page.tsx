import ResumePage from '@/components/portfolio/resume-page';
import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  lang: 'zh',
  page: 'resume',
  title: '简历 · 王浩',
  description:
    '王浩的可打印简历：株洲宏达 FAE、比亚迪汽车电子、iOS / Flutter 开发背景，支持打印或另存为 PDF。',
});

export default function Page() {
  return <ResumePage initialLang="zh" />;
}
