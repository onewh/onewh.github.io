import type { Metadata, Viewport } from 'next';
import { SITE_NAME, SITE_URL } from '@/lib/seo';
import './globals.css';

const description =
  '王浩的个人网站。现任株洲宏达 FAE，负责分立器件与集成电路产品技术支持，拥有电子科学与技术专业背景及移动端软件开发经验。';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: '王浩 · FAE / 半导体技术支持',
  description,
  applicationName: SITE_NAME,
  authors: [{ name: '王浩', url: SITE_URL }],
  creator: '王浩',
  category: 'technology',
  keywords: [
    '王浩',
    'FAE',
    '现场应用工程师',
    '半导体技术支持',
    '分立器件',
    '集成电路',
    '汽车电子',
    'iOS 开发',
    'Flutter',
    'Wang Hao',
  ],
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
    shortcut: '/favicon.svg',
  },
  manifest: '/manifest.webmanifest',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
};

export const viewport: Viewport = {
  themeColor: '#0b0f13',
  colorScheme: 'dark',
};

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: '王浩',
  alternateName: 'Wang Hao',
  url: SITE_URL,
  email: 'mailto:408163114@qq.com',
  jobTitle: 'Field Application Engineer',
  worksFor: {
    '@type': 'Organization',
    name: '株洲宏达电子有限公司',
  },
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: '西安电子科技大学',
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: '昆明',
    addressCountry: 'CN',
  },
  knowsAbout: [
    '半导体分立器件',
    '集成电路',
    'FAE 技术支持',
    '汽车电子',
    'iOS 开发',
    'Flutter',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" className="dark">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
