// Section 7: Two-column typographic before/after (2024 vs 2025)

import { yoyTrend } from '../../data/findings';

const [y2024, y2025] = yoyTrend;

export default function YoYComparison() {
  return (
    <div style={{ width: '100%' }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 48px 1fr',
          gap: 0,
          alignItems: 'start',
        }}
        className="yoy-columns"
      >
        {/* 2024 */}
        <div style={{ paddingRight: 'var(--space-xl)' }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-h1)', fontWeight: 700, color: 'var(--color-text)', marginBottom: '4px' }}>
            2024
          </div>
          <div style={{ fontFamily: 'var(--font-data)', fontSize: '11px', color: 'var(--color-text-muted)', marginBottom: 'var(--space-xl)' }}>
            n={y2024.n}
          </div>

          {[
            { label: 'Neither', value: `${y2024.neither}%`, color: 'var(--color-accent)', large: true },
            { label: 'D&O', value: `${y2024.doRate}%`, color: 'var(--color-data-protected)', large: false },
            { label: 'First-Time CISOs', value: `${y2024.firstTime}%`, color: 'var(--color-text-muted)', large: false },
            { label: 'Tier 1 (Fully Protected)', value: `${y2024.tier1}%`, color: 'var(--color-text)', large: false },
          ].map((row) => (
            <div key={row.label} style={{ marginBottom: 'var(--space-lg)', paddingBottom: 'var(--space-lg)', borderBottom: '1px solid var(--color-border)' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: row.large ? 'var(--text-hero)' : 'var(--text-h2)', fontWeight: 700, color: row.color, lineHeight: 1.1 }}>
                {row.value}
              </div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-small)', fontWeight: 300, color: 'var(--color-text-muted)', marginTop: '4px' }}>
                {row.label}
              </div>
            </div>
          ))}
        </div>

        {/* Arrow */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '80px' }}>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '20px', color: 'var(--color-text-muted)' }}>→</span>
        </div>

        {/* 2025 */}
        <div style={{ paddingLeft: 'var(--space-xl)', borderLeft: '1px solid var(--color-border)' }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-h1)', fontWeight: 700, color: 'var(--color-text)', marginBottom: '4px' }}>
            2025
          </div>
          <div style={{ fontFamily: 'var(--font-data)', fontSize: '11px', color: 'var(--color-text-muted)', marginBottom: 'var(--space-xl)' }}>
            n={y2025.n}
          </div>

          {[
            { label: 'Neither', value: `${y2025.neither}%`, color: 'var(--color-accent)', large: true, change: '↓ 17.6pts, treat as directional' },
            { label: 'D&O', value: `${y2025.doRate}%`, color: 'var(--color-data-protected)', large: false, change: '↑ 6.2pts' },
            { label: 'First-Time CISOs', value: `${y2025.firstTime}%`, color: 'var(--color-accent)', large: false, change: '↑ 4.2pts, growing, least protected' },
            { label: 'Tier 1 (Fully Protected)', value: `${y2025.tier1}%`, color: 'var(--color-text)', large: false, change: '↑ 0.2pts' },
          ].map((row) => (
            <div key={row.label} style={{ marginBottom: 'var(--space-lg)', paddingBottom: 'var(--space-lg)', borderBottom: '1px solid var(--color-border)' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: row.large ? 'var(--text-hero)' : 'var(--text-h2)', fontWeight: 700, color: row.color, lineHeight: 1.1 }}>
                {row.value}
              </div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-small)', fontWeight: 300, color: 'var(--color-text-muted)', marginTop: '4px' }}>
                {row.label}
              </div>
              {row.change && (
                <div style={{ fontFamily: 'var(--font-data)', fontSize: '10px', color: 'rgba(92,104,120,0.7)', marginTop: '3px' }}>
                  {row.change}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* YoY Caveat */}
      <div style={{
        fontFamily: 'var(--font-data)',
        fontSize: 'var(--text-label)',
        color: 'var(--color-text-muted)',
        marginTop: 'var(--space-xl)',
        padding: 'var(--space-md)',
        background: 'rgba(247,246,242,0.8)',
        border: '1px solid var(--color-border)',
        borderRadius: '2px',
        lineHeight: 1.6,
      }}>
        ⚠ The "Not Sure" response option was absent from the 2024 survey instrument. The 17.6-point decline in "Neither" should be treated as directional; some portion may reflect reclassification rather than actual coverage gains.
      </div>

      <style>{`
        @media (max-width: 767px) {
          .yoy-columns {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
