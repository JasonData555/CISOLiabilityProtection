// Section 3: Two-column typographic comparison + horizontal bar chart

import { titleGap } from '../../data/findings';

const fmt = (n) => `$${n.toLocaleString()}`;

export default function TitleGapComparison() {
  const maxDO = 100;
  const formalBenchmark = titleGap.formalCISOBenchmarkDO;

  return (
    <div style={{ width: '100%' }}>
      {/* Two-column typographic comparison */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1px 1fr',
          gap: '0 var(--space-xl)',
          marginBottom: 'var(--space-xl)',
        }}
        className="title-gap-columns"
      >
        {/* Left — Formal CISO */}
        <div style={{ paddingRight: 'var(--space-lg)' }}>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-label)', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-text)', marginBottom: 'var(--space-md)' }}>
            Formal CISO / CSO Title
          </div>
          <div style={{ fontFamily: 'var(--font-data)', fontSize: '11px', color: 'var(--color-text-muted)', marginBottom: 'var(--space-lg)' }}>
            n={titleGap.formalCISO.n} · {titleGap.formalCISO.pct}% of population
          </div>
          {[
            { label: 'D&O Coverage', value: `${titleGap.formalCISO.doRate}%`, color: 'var(--color-data-protected)' },
            { label: 'Neither', value: `${titleGap.formalCISO.neither}%`, color: 'var(--color-text)' },
            { label: 'Tier 6', value: `${titleGap.formalCISO.tier6}%`, color: 'var(--color-text)' },
            { label: 'Board Quarterly', value: `${titleGap.formalCISO.boardQtrly}%`, color: 'var(--color-text)' },
            { label: 'No Board Access', value: `${titleGap.formalCISO.noAccess}%`, color: 'var(--color-text)' },
            { label: 'Total Comp Median', value: fmt(titleGap.formalCISO.totalMedian), color: 'var(--color-text)' },
          ].map((row) => (
            <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '6px 0', borderBottom: '1px solid var(--color-border)' }}>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-small)', fontWeight: 400, color: 'var(--color-text-muted)' }}>{row.label}</span>
              <span style={{ fontFamily: 'var(--font-data)', fontSize: 'var(--text-small)', fontWeight: 500, color: row.color }}>{row.value}</span>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div style={{ background: 'var(--color-border)', width: '1px' }} />

        {/* Right — Non-CISO */}
        <div style={{ paddingLeft: 'var(--space-lg)' }}>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-label)', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-accent)', marginBottom: 'var(--space-md)' }}>
            No CISO / CSO Title
          </div>
          <div style={{ fontFamily: 'var(--font-data)', fontSize: '11px', color: 'var(--color-text-muted)', marginBottom: 'var(--space-lg)' }}>
            n={titleGap.nonCISO.n} · {titleGap.nonCISO.pct}% of population
          </div>
          {[
            { label: 'D&O Coverage', value: `${titleGap.nonCISO.doRate}%`, color: 'var(--color-accent)' },
            { label: 'Neither', value: `${titleGap.nonCISO.neither}%`, color: 'var(--color-accent)' },
            { label: 'Tier 6', value: `${titleGap.nonCISO.tier6}%`, color: 'var(--color-accent)' },
            { label: 'Board Quarterly', value: `${titleGap.nonCISO.boardQtrly}%`, color: 'var(--color-text)' },
            { label: 'No Board Access', value: `${titleGap.nonCISO.noAccess}%`, color: 'var(--color-accent)' },
            { label: 'Total Comp Median', value: fmt(titleGap.nonCISO.totalMedian), color: 'var(--color-text)' },
          ].map((row) => (
            <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '6px 0', borderBottom: '1px solid var(--color-border)' }}>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-small)', fontWeight: 400, color: 'var(--color-text-muted)' }}>{row.label}</span>
              <span style={{ fontFamily: 'var(--font-data)', fontSize: 'var(--text-small)', fontWeight: 500, color: row.color }}>{row.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Horizontal bar chart — D&O rate by non-CISO title group */}
      <div style={{ marginTop: 'var(--space-xl)' }}>
        <div style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-small)', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--color-text)', marginBottom: 'var(--space-lg)' }}>
          The lower the title recognition, the lower the protection
        </div>

        {/* Reference line label */}
        <div style={{ position: 'relative', marginBottom: 'var(--space-md)' }}>
          <div style={{
            position: 'absolute',
            left: `${formalBenchmark}%`,
            top: '-20px',
            transform: 'translateX(-50%)',
            fontFamily: 'var(--font-data)',
            fontSize: '10px',
            color: 'var(--color-text-muted)',
            whiteSpace: 'nowrap',
          }}>
            Formal CISO: {formalBenchmark}%
          </div>
        </div>

        {titleGap.byTitleGroup.map((group) => (
          <div key={group.group} style={{ marginBottom: 'var(--space-md)', position: 'relative' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 400, color: 'var(--color-text)' }}>
                {group.group} <span style={{ fontFamily: 'var(--font-data)', fontSize: '10px', color: 'var(--color-text-muted)' }}>(n={group.n})</span>
              </span>
              <span style={{ fontFamily: 'var(--font-data)', fontSize: '12px', fontWeight: 500, color: group.doRate < 40 ? 'var(--color-accent)' : 'var(--color-text)' }}>
                {group.doRate}% D&O · {group.neither}% neither
              </span>
            </div>
            {/* Bar track with reference line */}
            <div style={{ position: 'relative', height: '20px', background: 'var(--color-border)', borderRadius: '1px' }}>
              <div style={{
                height: '100%',
                width: `${group.doRate}%`,
                background: group.doRate < 40 ? 'var(--color-accent)' : 'var(--color-data-partial)',
                borderRadius: '1px',
              }} />
              {/* Reference line at formal CISO D&O rate */}
              <div style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: `${formalBenchmark}%`,
                width: '1px',
                background: 'var(--color-text)',
                opacity: 0.3,
              }} />
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 767px) {
          .title-gap-columns {
            grid-template-columns: 1fr !important;
            gap: var(--space-xl) 0 !important;
          }
        }
      `}</style>
    </div>
  );
}
