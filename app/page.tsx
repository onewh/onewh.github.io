'use client';
import { useEffect, useState } from 'react';
import {
  ArrowUpRight,
  ArrowRight,
  Cpu,
  CircuitBoard,
  Code2,
  Mail,
  FileText,
  GraduationCap,
  MoveUpRight,
  Copy,
  Check,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import SkillGraph from '@/components/portfolio/skill-graph';
import { useLang, useT } from '@/lib/i18n';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

const expertiseIcons = [CircuitBoard, Cpu, Code2];

function SectionTitle({
  num,
  title,
  en,
}: {
  num: string;
  title: string;
  en: string;
}) {
  return (
    <div className="section-heading">
      <div>
        <span className="section-number">{num}</span>
        <h2>{title}</h2>
      </div>
      <span className="mono">{en}</span>
    </div>
  );
}

export default function Home() {
  const t = useT();
  const { lang, toggle } = useLang();
  const [active, setActive] = useState('home');
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: '-15% 0px -60% 0px' },
    );
    t.home.sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [t.home.sections]);
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText('408163114@qq.com');
      setCopied(true);
      setCopyError(false);
    } catch {
      setCopied(false);
      setCopyError(true);
    }
  }
  const h = t.home;
  return (
    <div className="site">
      <a className="skip-link" href="#home">
        {h.skipLink}
      </a>
      <header className="topbar">
        <a className="brand" href="#home" aria-label={h.brandAria}>
          <span className="brand-mark">
            WH<span>.</span>
          </span>
          <span className="brand-name">{h.name}</span>
        </a>
        <span className="header-caption mono">FIELD APPLICATION ENGINEER</span>
        <nav className="top-links" aria-label={h.navAria}>
          <a href="#expertise">{h.topLinks[0]}</a>
          <a href="#experience">{h.topLinks[1]}</a>
          <a href="#projects">{h.topLinks[2]}</a>
        </nav>
        <button
          type="button"
          className="lang-toggle"
          onClick={toggle}
          aria-label={t.toggleAria}
        >
          {t.toggleLabel}
        </button>
        <a href="#contact" className="contact-top">
          {h.contactTop} <ArrowUpRight size={16} />
        </a>
      </header>
      <nav className="index-rail" aria-label={h.railAria}>
        <span className="rail-caption mono">{h.railCaption}</span>
        {h.sections.map(({ id, label }, i) => (
          <a
            key={id}
            href={`#${id}`}
            className={active === id ? 'active' : ''}
            aria-current={active === id ? 'location' : undefined}
          >
            <span className="mono">0{i + 1}</span>
            <span>{label}</span>
            {active === id && <span className="rail-dot" />}
          </a>
        ))}
        <div className="rail-bottom">
          <span className="rail-cross">＋</span>
          <span className="mono">
            WANG HAO
            <br />
            PERSONAL PORTFOLIO
          </span>
        </div>
      </nav>
      <main className="workspace">
        <section id="home" className="hero-grid">
          <div className="identity panel">
            <div className="panel-meta">
              <span className="mono">01 / INTRODUCTION</span>
              <span className="availability">
                <i /> {h.availability}
              </span>
            </div>
            <div className="hero-copy">
              <div className="english-name mono">WANG HAO</div>
              <h1>
                {h.name}
                <span className="name-period">.</span>
              </h1>
              <h2>
                FAE <span>/</span> {h.role}
              </h2>
              <p className="hero-subtitle">
                {h.subtitle[0]}
                <br />
                {h.subtitle[1]}
              </p>
              <p className="hero-description">
                {h.description[0]}
                <br className="desktop-break" />
                {h.description[1]}
              </p>
              <div className="hero-actions">
                <a className="primary-action" href="#experience">
                  {h.primaryAction} <ArrowUpRight size={18} />
                </a>
                <a
                  className="secondary-action"
                  href="/resume"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FileText size={16} /> {h.secondaryAction}
                </a>
              </div>
            </div>
            <div className="identity-footer">
              <span className="mono">{h.focusLabel}</span>
              <span>
                {h.focus[0]} <b>/</b> {h.focus[1]} <b>/</b> {h.focus[2]}
              </span>
            </div>
          </div>
          <SkillGraph />
        </section>
        <section id="expertise" className="section-block">
          <SectionTitle num="02" title={h.expertise.title} en="AREAS OF FOCUS" />
          <div className="focus-grid">
            {h.expertise.cards.map((card, i) => {
              const Icon = expertiseIcons[i] ?? CircuitBoard;
              return (
                <article className="focus-card" key={card.name}>
                  <div className="focus-top">
                    <Icon size={25} strokeWidth={1.3} />
                    <span className="mono">
                      {['DISCRETE DEVICES', 'INTEGRATED CIRCUITS', 'SOFTWARE ENGINEERING'][i]}
                    </span>
                  </div>
                  <h3>{card.name}</h3>
                  <p>{card.text}</p>
                </article>
              );
            })}
          </div>
        </section>
        <section id="experience" className="section-block">
          <SectionTitle num="03" title={h.experience.title} en="CAREER TRAJECTORY" />
          <div className="timeline">
            {h.experience.jobs.map((job, i) => (
              <article key={job.company} className={`career${i === 0 ? ' current' : ''}`}>
                <div className="career-date mono">
                  {job.period}
                  {i === 0 && <span>{h.experience.currentBadge}</span>}
                </div>
                <div className="career-main">
                  <div className="career-title">
                    <h3>{job.company}</h3>
                    <span>{job.role}</span>
                  </div>
                  <p>{job.text}</p>
                  {job.tags && (
                    <div className="tags">
                      {job.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                  )}
                </div>
                {i === 0 && <ArrowUpRight size={23} className="career-arrow" />}
              </article>
            ))}
          </div>
        </section>
        <section id="projects" className="section-block">
          <SectionTitle num="04" title={h.projects.title} en="SELECTED SOFTWARE WORK" />
          <div className="project-grid">
            {h.projects.items.map((project, i) => (
              <Dialog key={project.title}>
                <DialogTrigger className="project-card">
                  <div className="project-top">
                    <span className="mono">PROJECT / 0{i + 1}</span>
                    <ArrowUpRight size={20} />
                  </div>
                  <div className="project-symbol" aria-hidden="true">
                    {i === 0 ? (
                      <span>
                        8891<span> AUTO</span>
                      </span>
                    ) : (
                      <span className="city-type">
                        {lang === 'zh' ? (
                          <>
                            春<span>城</span>
                          </>
                        ) : (
                          <>
                            CC<span>SC</span>
                          </>
                        )}
                        <small>NEWS / MOBILE</small>
                      </span>
                    )}
                  </div>
                  <div className="project-content">
                    <span className="project-tag">{project.tag}</span>
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <div className="project-bottom">
                      <span className="mono">{project.stack}</span>
                      <span>
                        {h.projects.viewDetails} <ArrowRight size={15} />
                      </span>
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent className="project-dialog">
                  <span className="mono">PROJECT / 0{i + 1}</span>
                  <DialogTitle>{project.title}</DialogTitle>
                  <DialogDescription>{project.body}</DialogDescription>
                  <ul>
                    {project.details.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <div className="tags">
                    <span>{project.stack}</span>
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </section>
        <section id="about" className="section-block">
          <SectionTitle num="05" title={h.about.title} en="BEYOND THE ROLE" />
          <div className="about-grid">
            <div className="about-copy">
              <h3>
                {h.about.heading[0]}
                <br />
                <span>{h.about.heading[1]}</span>
              </h3>
              <p>{h.about.p1}</p>
              <p>{h.about.p2}</p>
            </div>
            <div className="education panel">
              <GraduationCap size={29} strokeWidth={1.2} />
              <span className="mono">EDUCATION</span>
              <h3>{h.about.school}</h3>
              <p>{h.about.major}</p>
              <span className="mono education-date">2009.08 — 2013.07</span>
            </div>
          </div>
        </section>
        <section id="contact" className="contact-section panel">
          <div>
            <span className="mono">LET’S CONNECT</span>
            <h2>
              {h.contactSection.heading[0]}
              <br />
              {h.contactSection.heading[1]}
              <span>{h.contactSection.period}</span>
            </h2>
            <p>{h.contactSection.text}</p>
          </div>
          <div className="contact-details">
            <a className="email-link" href="mailto:408163114@qq.com">
              408163114@qq.com <MoveUpRight size={23} />
            </a>
            <div className="contact-buttons">
              <a href="mailto:408163114@qq.com">
                <Mail size={16} /> {h.contactSection.send}
              </a>
              <Button variant="ghost" onClick={copyEmail}>
                {copied ? <Check size={16} /> : <Copy size={16} />}{' '}
                {copied ? h.contactSection.copied : h.contactSection.copy}
              </Button>
            </div>
            <output className="copy-status">
              {copyError
                ? h.contactSection.copyError
                : copied
                  ? h.contactSection.copySuccess
                  : ''}
            </output>
          </div>
        </section>
        <footer className="footer">
          <span className="mono">© {new Date().getFullYear()} WANG HAO</span>
          <span>{h.footer.tagline}</span>
          <a href="#home">{h.footer.backTop}</a>
        </footer>
      </main>
    </div>
  );
}
