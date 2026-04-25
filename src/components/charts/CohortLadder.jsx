// Section 2B: Four-cohort ladder — dual bar (navy from left = Tier 1, mint from right = Tier 6)

import { fourCohorts } from '../../data/findings';

export default function CohortLadder() {
  return (
    <div style={{ width: '100%' }}>
      {/* Header row */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '220px 1fr',
          gap: 'var(--space-md)',
          marginBottom: 'var(--space-sm)',
        }}
        className="cohort-row"
      >
        <div />
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            paddingLeft: '0',
            paddingRight: '0',
          }}
        >
          <span style={{ fontFamily: 'var(--font-data)', fontSize: '10px', fontWeight: 500, color: 'var(--color-data-protected)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            ← Tier 1 (fully protected)
          </span>
          <span style={{ fontFamily: 'var(--font-data)', fontSize: '10px', fontWeight: 500, color: 'var(--color-accent)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            Tier 6 (unprotected) →
          </span>
        </div>
      </div>

      {fourCohorts.map((cohort, i) => (
        <div
          key={cohort.label}
          style={{
            display: 'grid',
            gridTemplateColumns: '220px 1fr',
            gap: 'var(--space-md)',
            marginBottom: i < fourCohorts.length - 1 ? 'var(--space-lg)' : 0,
            padding: 'var(--space-md) 0',
            borderBottom: i < fourCohorts.length - 1 ? '1px solid var(--color-border)' : 'none',
          }}
          className="cohort-row"
        >
          {/* Left: label + metrics */}
          <div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 500, color: 'var(--color-text)', marginBottom: '4px' }}>
              {cohort.label}
            </div>
            <div style={{ fontFamily: 'var(--font-data)', fontSize: '11px', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
              n={cohort.n}<br />
              D&O: {cohort.doRate}% · Neither: {cohort.neither}%
            </div>
          </div>

          {/* Right: dual bar + stats */}
          <div>
            {/* Bar track */}
            <div style={{ position: 'relative', height: '32px', background: 'var(--color-border)', borderRadius: '2px', overflow: 'hidden', marginBottom: '8px' }}>
              {/* Tier 1 fill — from left, navy */}
              <div style={{
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
                width: `${cohort.tier1}%`,
                background: 'var(--color-data-protected)',
                borderRadius: '2px 0 0 2px',
              }} />
              {/* Tier 6 fill — from right, mint */}
              <div style={{
                position: 'absolute',
                right: 0,
                top: 0,
                bottom: 0,
                width: `${cohort.tier6}%`,
                background: 'var(--color-accent)',
                borderRadius: '0 2px 2px 0',
              }} />
            </div>

            {/* Inline stats */}
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ fontFamily: 'var(--font-data)', fontSize: '12px', color: 'var(--color-data-protected)', fontWeight: 500 }}>
                {cohort.tier1}% Tier 1
              </div>
              <div style={{ fontFamily: 'var(--font-data)', fontSize: '12px', color: 'var(--color-accent)', fontWeight: 500 }}>
                {cohort.tier6}% Tier 6
              </div>
            </div>
          </div>
        </div>
      ))}

      <style>{`
        @media (max-width: 767px) {
          .cohort-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
