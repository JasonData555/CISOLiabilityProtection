// Section 2A: Vertical tier stack — proportional fill bars

import { tiers, tierColors } from '../../data/findings';

const MAX_PCT = 100;

export default function TierStackVisualization() {
  return (
    <div style={{ width: '100%' }}>
      {tiers.map((tier) => (
        <div
          key={tier.tier}
          style={{
            display: 'grid',
            gridTemplateColumns: '200px 1fr 64px',
            alignItems: 'center',
            gap: 'var(--space-md)',
            marginBottom: 'var(--space-sm)',
            minHeight: '56px',
          }}
        >
          {/* Left: tier label + definition */}
          <div>
            <div
              style={{
                fontFamily: 'var(--font-data)',
                fontSize: '11px',
                fontWeight: 500,
                color: tier.tier === 6 ? 'var(--color-accent)' : 'var(--color-text)',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                marginBottom: '2px',
              }}
            >
              Tier {tier.tier} · {tier.label}
            </div>
            <div
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '11px',
                fontWeight: 300,
                color: 'var(--color-text-muted)',
                lineHeight: 1.3,
              }}
            >
              {tier.definition}
            </div>
          </div>

          {/* Center: fill bar */}
          <div
            style={{
              background: 'var(--color-border)',
              borderRadius: '1px',
              height: '28px',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: `${(tier.pct / MAX_PCT) * 100}%`,
                height: '100%',
                background: tierColors[tier.tier],
                borderRadius: '1px',
                transition: 'width 0.6s ease',
              }}
            />
          </div>

          {/* Right: percentage */}
          <div
            style={{
              fontFamily: 'var(--font-data)',
              fontSize: '13px',
              fontWeight: 500,
              color: tier.tier === 6 ? 'var(--color-accent)' : 'var(--color-text)',
              textAlign: 'right',
            }}
          >
            {tier.pct}%
          </div>
        </div>
      ))}

      {/* Summary aggregation */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 'var(--space-lg)',
          marginTop: 'var(--space-xl)',
          paddingTop: 'var(--space-xl)',
          borderTop: '1px solid var(--color-border)',
        }}
        className="tier-summary-grid"
      >
        {[
          { value: '16.2%', label: 'PROTECTED',           sublabel: 'Tiers 1+2+3 ·', desc: 'Has both legal instruments',          color: 'var(--color-data-protected)' },
          { value: '46.2%', label: 'PARTIALLY PROTECTED', sublabel: 'Tiers 4+5 ·',   desc: 'One protection or exit terms only',   color: 'var(--color-data-partial)' },
          { value: '37.5%', label: 'UNPROTECTED',          sublabel: 'Tier 6 ·',       desc: 'No protection of any kind',           color: 'var(--color-accent)' },
        ].map((item) => (
          <div key={item.label} style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-hero)', fontWeight: 700, color: item.color, lineHeight: 1.1, marginBottom: '6px' }}>
              {item.value}
            </div>
            <div style={{ fontFamily: 'var(--font-data)', fontSize: '10px', fontWeight: 500, color: item.color, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '4px' }}>
              {item.label}
            </div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 400, color: 'var(--color-text-muted)' }}>
              {item.sublabel} {item.desc}
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 767px) {
          .tier-summary-grid { grid-template-columns: 1fr !important; gap: 28px !important; }
        }
      `}</style>
    </div>
  );
}
