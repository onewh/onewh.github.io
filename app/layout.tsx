import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
  title: '王浩 · FAE / 半导体技术支持',
  description: '王浩的个人网站。现任株洲宏达 FAE，负责分立器件与集成电路产品技术支持，拥有电子科学与技术专业背景及移动端软件开发经验。',
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" className="dark">
      <body>{children}</body>
    </html>
  );
}
