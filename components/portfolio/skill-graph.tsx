'use client';

import { useState } from 'react';
import { RotateCcw, Network } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useT } from '@/lib/i18n';
import './skill-graph.css';

type Group = 'core' | 'hardware' | 'auto' | 'software';

interface SkillPos {
  id: string;
  x: number;
  y: number;
  group: Group;
}

const positions: SkillPos[] = [
  { id: 'wang', x: 49, y: 48, group: 'core' },
  { id: 'fae', x: 29, y: 29, group: 'hardware' },
  { id: 'discrete', x: 13, y: 17, group: 'hardware' },
  { id: 'ic', x: 44, y: 12, group: 'hardware' },
  { id: 'support', x: 14, y: 43, group: 'hardware' },
  { id: 'auto', x: 72, y: 27, group: 'auto' },
  { id: 'can', x: 86, y: 12, group: 'auto' },
  { id: 'bcm', x: 87, y: 41, group: 'auto' },
  { id: 'c', x: 64, y: 10, group: 'auto' },
  { id: 'software', x: 48, y: 72, group: 'software' },
  { id: 'ios', x: 22, y: 68, group: 'software' },
  { id: 'swift', x: 13, y: 88, group: 'software' },
  { id: 'flutter', x: 70, y: 70, group: 'software' },
  { id: 'components', x: 45, y: 92, group: 'software' },
  { id: 'tools', x: 84, y: 89, group: 'software' },
];

const edges = [
  ['wang', 'fae'],
  ['wang', 'auto'],
  ['wang', 'software'],
  ['fae', 'discrete'],
  ['fae', 'ic'],
  ['fae', 'support'],
  ['auto', 'can'],
  ['auto', 'bcm'],
  ['auto', 'c'],
  ['software', 'ios'],
  ['ios', 'swift'],
  ['software', 'flutter'],
  ['software', 'components'],
  ['flutter', 'components'],
  ['flutter', 'tools'],
  ['software', 'tools'],
  ['fae', 'auto'],
  ['ios', 'components'],
];

const byPos = new Map(positions.map((p) => [p.id, p]));

export default function SkillGraph() {
  const t = useT();
  const g = t.graph;
  const skills = g.skills.map((s) => ({
    ...s,
    ...byPos.get(s.id)!,
  }));
  const [selected, setSelected] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const highlighted = hovered ?? selected;
  const related = new Set(
    highlighted
      ? [
          highlighted,
          ...edges.filter((edge) => edge.includes(highlighted)).flat(),
        ]
      : [],
  );
  const detail = selected ? skills.find((s) => s.id === selected) : null;

  return (
    <section className="skill-panel panel" aria-label={g.panelAria}>
      <div className="panel-meta">
        <span className="mono">KNOWLEDGE GRAPH</span>
        <Network size={17} strokeWidth={1.3} aria-hidden="true" />
      </div>
      <div className="graph-heading">
        <h2>
          {g.heading[0]}
          <span>.</span>
        </h2>
        <p>{g.sub}</p>
      </div>
      <div className="skill-network" onMouseLeave={() => setHovered(null)}>
        <svg
          className="skill-edges"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {edges.map(([a, b]) => {
            const from = byPos.get(a)!;
            const to = byPos.get(b)!;
            const lit = highlighted === a || highlighted === b;
            return (
              <line
                key={`${a}-${b}`}
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                className={highlighted ? (lit ? 'edge-lit' : 'edge-dim') : ''}
              />
            );
          })}
        </svg>
        {skills.map((skill) => (
          <button
            key={skill.id}
            type="button"
            className={`skill-node group-${skill.group} ${highlighted && !related.has(skill.id) ? 'node-dim' : ''} ${selected === skill.id ? 'node-selected' : ''}`}
            style={{ left: `${skill.x}%`, top: `${skill.y}%` }}
            aria-pressed={selected === skill.id}
            aria-controls="skill-description"
            onMouseEnter={() => setHovered(skill.id)}
            onFocus={() => setHovered(skill.id)}
            onBlur={() => setHovered(null)}
            onClick={() => setSelected(selected === skill.id ? null : skill.id)}
          >
            <span className="node-dot" aria-hidden="true" />
            <span className="node-label">{skill.label}</span>
          </button>
        ))}
      </div>
      <div className="graph-legend" aria-label={g.legendAria}>
        <span className="legend-hardware">{g.legend[0]}</span>
        <span className="legend-auto">{g.legend[1]}</span>
        <span className="legend-software">{g.legend[2]}</span>
      </div>
      <div className="graph-detail" id="skill-description" aria-live="polite">
        <div>
          <strong>{detail?.label ?? g.placeholderTitle}</strong>
          <p>{detail?.description ?? g.placeholderText}</p>
        </div>
        <Button
          variant="ghost"
          className="graph-reset"
          aria-label={g.resetAria}
          onClick={() => {
            setSelected(null);
            setHovered(null);
          }}
          disabled={!selected}
        >
          <RotateCcw size={15} />
        </Button>
      </div>
    </section>
  );
}
