'use client';
import { Button } from '@/components/ui/button';
import { useLang, useT } from '@/lib/i18n';
import './resume.css';

export default function Resume() {
  const t = useT();
  const { toggle } = useLang();
  const r = t.resume;
  return (
    <main className="resume-page">
      <div className="resume-tools">
        <a href="/">{r.back}</a>
        <div className="resume-tools-group">
          <Button variant="ghost" className="lang-toggle" onClick={toggle} aria-label={t.toggleAria}>
            {t.toggleLabel}
          </Button>
          <Button onClick={() => window.print()}>{r.print}</Button>
        </div>
      </div>
      <article className="resume-sheet">
        <header>
          <h1>{t.home.name}</h1>
          <p className="resume-role">{r.role}</p>
          <a href="mailto:408163114@qq.com">408163114@qq.com</a>
          <p className="resume-meta">{r.meta}</p>
        </header>
        <section>
          <h2>{r.profile}</h2>
          <p>{r.summary}</p>
        </section>
        <section>
          <h2>{r.work}</h2>
          {r.jobs.map((job) => (
            <div className="resume-job" key={job.company}>
              <h3>
                {job.company} <span>{job.period}</span>
              </h3>
              <h4>{job.role}</h4>
              {job.text && <p>{job.text}</p>}
              {job.bullets.length > 0 && (
                <ul>
                  {job.bullets.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>
        <section>
          <h2>{r.education}</h2>
          <h3>
            {r.school} <span>2009.08 — 2013.07</span>
          </h3>
          <p>{r.major}</p>
        </section>
        <section>
          <h2>{r.skills}</h2>
          {r.skillGroups.map((group) => (
            <div className="resume-job" key={group.name}>
              <h3>{group.name}</h3>
              <p>{group.text}</p>
            </div>
          ))}
        </section>
        <section>
          <h2>{r.areas}</h2>
          <p>{r.areasText}</p>
        </section>
      </article>
    </main>
  );
}
