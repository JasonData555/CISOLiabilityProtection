// Section 1: Single full-width horizontal segmented bar

const SEGMENTS = [
  { key: 'doOnly',    label: 'D&O Only',      pct: 34.1, color: '#0A1628' },
  { key: 'both',      label: 'D&O + Indem',   pct: 16.2, color: '#1A3A52' },
  { key: 'indemnOnly',label: 'Indem Only',     pct: 6.0,  color: '#8A9BAE' },
  { key: 'notSure',   label: 'Not Sure',       pct: 4.5,  color: '#B8B5AE' },
  { key: 'neither',   label: 'Neither',        pct: 38.7, color: '#00897B' },
];

export default function ProtectionStackBar() {
  return (
    <div style={{ width: '100%' }}>
      {/* Labels above bar */}
      <div
        style={{
          display: 'flex',
          width: '100%',
          marginBottom: '10px',
        }}
      >
        {SEGMENTS.map((seg) => (
          <div
            key={seg.key}
            style={{
              width: `${seg.pct}%`,
              textAlign: 'center',
              paddingBottom: '6px',
              borderBottom: `2px solid ${seg.color}`,
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-data)',
                fontSize: seg.key === 'neither' ? '15px' : '12px',
                fontWeight: seg.key === 'neither' ? 500 : 400,
                color: seg.key === 'neither' ? 'var(--color-accent)' : 'var(--color-text)',
                lineHeight: 1.2,
              }}
            >
              {seg.pct}%
            </div>
            <div
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: seg.key === 'neither' ? '12px' : '10px',
                fontWeight: seg.key === 'neither' ? 500 : 400,
                color: seg.key === 'neither' ? 'var(--color-accent)' : 'var(--color-text-muted)',
                marginTop: '2px',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {seg.label}
            </div>
          </div>
        ))}
      </div>

      {/* The bar */}
      <div
        style={{
          display: 'flex',
          height: '64px',
          borderRadius: '2px',
          overflow: 'hidden',
        }}
      >
        {SEGMENTS.map((seg) => (
          <div
            key={seg.key}
            style={{
              width: `${seg.pct}%`,
              background: seg.color,
              transition: 'opacity 0.2s',
            }}
            title={`${seg.label}: ${seg.pct}%`}
          />
        ))}
      </div>

      {/* Secondary callout stats */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 'var(--space-lg)',
          marginTop: 'var(--space-xl)',
          paddingTop: 'var(--space-xl)',
          borderTop: '1px solid var(--color-border)',
        }}
        className="protection-stack-stats"
      >
        {[
          { value: '38.7%', label: 'Unprotected', color: 'var(--color-accent)' },
          { value: '56.4%', label: 'Have any form of protection', color: 'var(--color-data-protected)' },
          { value: '16.2%', label: 'Have both D&O and indemnification', color: 'var(--color-text-muted)' },
        ].map((stat) => (
          <div key={stat.label} style={{ textAlign: 'center' }}>
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-hero)',
                fontWeight: 700,
                color: stat.color,
                lineHeight: 1.1,
                marginBottom: '6px',
              }}
            >
              {stat.value}
            </div>
            <div
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-small)',
                fontWeight: 300,
                color: 'var(--color-text-muted)',
                lineHeight: 1.4,
              }}
            >
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 767px) {
          .protection-stack-stats {
            grid-template-columns: 1fr !important;
            gap: 28px !important;
          }
        }
      `}</style>
    </div>
  );
}
