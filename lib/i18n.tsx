'use client';
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import zhData from '@/data/zh.json';
import enData from '@/data/en.json';

export type Lang = 'zh' | 'en';
const LANG_KEY = 'wh-lang';

export interface ProjectItem {
  title: string;
  tag: string;
  description: string;
  body: string;
  details: string[];
  stack: string;
}

export interface CareerJob {
  company: string;
  role: string;
  period: string;
  text: string;
  tags?: string[];
}

export interface Dict {
  langName: string;
  toggleLabel: string;
  toggleAria: string;
  home: {
    skipLink: string;
    brandAria: string;
    navAria: string;
    railAria: string;
    railCaption: string;
    sections: { id: string; label: string }[];
    topLinks: string[];
    contactTop: string;
    availability: string;
    name: string;
    role: string;
    subtitle: string[];
    description: string[];
    primaryAction: string;
    secondaryAction: string;
    focusLabel: string;
    focus: string[];
    expertise: {
      title: string;
      cards: { name: string; text: string }[];
    };
    experience: {
      title: string;
      currentBadge: string;
      jobs: CareerJob[];
    };
    projects: {
      title: string;
      viewDetails: string;
      items: ProjectItem[];
    };
    about: {
      title: string;
      heading: string[];
      p1: string;
      p2: string;
      school: string;
      major: string;
    };
    contactSection: {
      heading: string[];
      period: string;
      text: string;
      send: string;
      copy: string;
      copied: string;
      copyError: string;
      copySuccess: string;
    };
    footer: {
      tagline: string;
      backTop: string;
    };
  };
  graph: {
    panelAria: string;
    heading: string[];
    sub: string;
    legendAria: string;
    legend: string[];
    placeholderTitle: string;
    placeholderText: string;
    resetAria: string;
    skills: { id: string; label: string; description: string }[];
  };
  resume: {
    back: string;
    print: string;
    role: string;
    meta: string;
    profile: string;
    summary: string;
    work: string;
    jobs: { company: string; period: string; role: string; text?: string; bullets: string[] }[];
    education: string;
    school: string;
    major: string;
    skills: string;
    skillGroups: { name: string; text: string }[];
    areas: string;
    areasText: string;
  };
}

export const dict: Record<Lang, Dict> = {
  zh: zhData,
  en: enData,
};

interface LangContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggle: () => void;
}

const LangContext = createContext<LangContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('zh');
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LANG_KEY);
      if (saved === 'zh' || saved === 'en') setLangState(saved);
    } catch {
      // ignore
    }
  }, []);
  useEffect(() => {
    try {
      localStorage.setItem(LANG_KEY, lang);
    } catch {
      // ignore
    }
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
  }, [lang]);
  const value = {
    lang,
    setLang: (l: Lang) => setLangState(l),
    toggle: () => setLangState((prev) => (prev === 'zh' ? 'en' : 'zh')),
  };
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error('useLang must be used within a LanguageProvider');
  return ctx;
}

export function useT(): Dict {
  const { lang } = useLang();
  return dict[lang];
}
