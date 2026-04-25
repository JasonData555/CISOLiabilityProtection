// Section 4B: Dot plot — reporting line D&O rates

import { reportingLine } from '../../data/findings';

// Sorted high to low by D&O rate
const sorted = [...reportingLine].sort((a, b) => b.doRate - a.doRate);

export default function ReportingLineDotPlot() {
  const maxDO = 70;

  return (
    <div style={{ width: '100%' }}>
      {/* X-axis labels */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-sm)', paddingLeft: '180px' }} className="dot-plot-axis">
        {[0, 20, 40, 60].map((v) => (
          <span key={v} style={{ fontFamily: 'var(--font-data)', fontSize: '10px', color: 'var(--color-text-muted)', transform: 'translateX(-50%)' }}>
            {v}%
          </span>
        ))}
      </div>

      {sorted.map((row, i) => (
        <div
          key={row.title}
          style={{
            display: 'grid',
            gridTemplateColumns: '180px 1fr 200px',
            gap: 'var(--space-md)',
            alignItems: 'center',
            marginBottom: i < sorted.length - 1 ? 'var(--space-sm)' : 0,
            padding: '10px 0',
            borderBottom: i < sorted.length - 1 ? '1px solid rgba(224,222,216,0.5)' : 'none',
          }}
          className="dot-plot-row"
        >
          {/* Label */}
          <div style={{
            fontFamily: 'var(--font-body)',
            fontSize: '13px',
            fontWeight: row.title === 'VP Engineering' ? 500 : 400,
            color: row.elevated ? 'var(--color-text)' : (row.title === 'VP Engineering' ? 'var(--color-accent)' : 'var(--color-text)'),
            textAlign: 'right',
            paddingRight: 'var(--space-md)',
          }}>
            {row.title}
          </div>

          {/* Track + dot */}
          <div style={{ position: 'relative', height: '20px', display: 'flex', alignItems: 'center' }}>
            {/* Track line */}
            <div style={{
              position: 'absolute',
              left: 0,
              right: 0,
              height: '1px',
              background: 'var(--color-border)',
            }} />
            {/* Dot */}
            <div style={{
              position: 'absolute',
              left: `${(row.doRate / maxDO) * 100}%`,
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              background: row.elevated ? 'var(--color-data-protected)' : 'var(--color-accent)',
              transform: 'translateX(-50%)',
              zIndex: 1,
            }} />
          </div>

          {/* Stats */}
          <div style={{ fontFamily: 'var(--font-data)', fontSize: '11px', lineHeight: 1.6 }}>
            <span style={{ color: row.elevated ? 'var(--color-data-protected)' : 'var(--color-accent)', fontWeight: 500 }}>
              {row.doRate}% D&O
            </span>
            <span style={{ color: 'var(--color-text-muted)' }}>  ·  </span>
            <span style={{ color: row.neither > 50 ? 'var(--color-accent)' : 'var(--color-text-muted)' }}>
              {row.neither}% neither
            </span>
          </div>
        </div>
      ))}

      {/* Elevated vs. subordinated summary */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'var(--space-xl)',
          marginTop: 'var(--space-xl)',
          paddingTop: 'var(--space-xl)',
          borderTop: '1px solid var(--color-border)',
        }}
        className="elevated-summary"
      >
        {[
          { label: 'Elevated Reporting', sublabel: 'CEO / COO / CFO / CRO / GC', doRate: '58.1%', neither: '31.9%', color: 'var(--color-data-protected)' },
          { label: 'Subordinated Reporting', sublabel: 'CIO / CTO / VP Engineering', doRate: '46.3%', neither: '42.3%', color: 'var(--color-accent)' },
        ].map((item) => (
          <div key={item.label} style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-small)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.06em', color: item.color, marginBottom: '8px' }}>
              {item.label}
            </div>
            <div style={{ fontFamily: 'var(--font-data)', fontSize: '11px', color: 'var(--color-text-muted)', marginBottom: '8px' }}>
              {item.sublabel}
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-h2)', fontWeight: 700, color: item.color, lineHeight: 1.1 }}>
              {item.doRate}
            </div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--color-text-muted)', marginTop: '4px' }}>
              D&O coverage · {item.neither} neither
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 767px) {
          .dot-plot-axis { display: none !important; }
          .dot-plot-row { grid-template-columns: 1fr !important; }
          .elevated-summary { grid-template-columns: 1fr !important; gap: var(--space-lg) !important; }
        }
      `}</style>
    </div>
  );
}
