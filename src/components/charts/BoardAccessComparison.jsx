// Section 4A: Two-column typographic board access comparison (no chart library)

export default function BoardAccessComparison() {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1px 1fr',
        gap: '0 var(--space-xl)',
        padding: 'var(--space-xl) 0',
      }}
      className="board-access-columns"
    >
      {/* Left — With D&O */}
      <div style={{ textAlign: 'center', paddingRight: 'var(--space-lg)' }}>
        <div style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--text-label)',
          fontWeight: 500,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: 'var(--color-text)',
          marginBottom: 'var(--space-xl)',
        }}>
          With D&O Coverage
        </div>

        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'var(--text-hero)',
          fontWeight: 700,
          color: 'var(--color-data-protected)',
          lineHeight: 1.05,
          marginBottom: '8px',
        }}>
          62.9%
        </div>
        <div style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--text-small)',
          fontWeight: 300,
          color: 'var(--color-text-muted)',
          marginBottom: 'var(--space-2xl)',
        }}>
          present to the board quarterly or more
        </div>

        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'var(--text-h2)',
          fontWeight: 700,
          color: 'var(--color-data-protected)',
          lineHeight: 1.1,
          marginBottom: '8px',
        }}>
          5.7%
        </div>
        <div style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--text-small)',
          fontWeight: 300,
          color: 'var(--color-text-muted)',
        }}>
          have no board access at all
        </div>
      </div>

      {/* Vertical rule */}
      <div style={{ background: 'var(--color-border)', width: '1px' }} />

      {/* Right — Without Coverage */}
      <div style={{ textAlign: 'center', paddingLeft: 'var(--space-lg)' }}>
        <div style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--text-label)',
          fontWeight: 500,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: 'var(--color-accent)',
          marginBottom: 'var(--space-xl)',
        }}>
          Without Coverage
        </div>

        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'var(--text-hero)',
          fontWeight: 700,
          color: 'var(--color-accent)',
          lineHeight: 1.05,
          marginBottom: '8px',
        }}>
          32.9%
        </div>
        <div style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--text-small)',
          fontWeight: 300,
          color: 'var(--color-text-muted)',
          marginBottom: 'var(--space-2xl)',
        }}>
          present to the board quarterly or more
        </div>

        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'var(--text-h2)',
          fontWeight: 700,
          color: 'var(--color-accent)',
          lineHeight: 1.1,
          marginBottom: '8px',
        }}>
          23.3%
        </div>
        <div style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--text-small)',
          fontWeight: 300,
          color: 'var(--color-text-muted)',
        }}>
          have no board access at all
        </div>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .board-access-columns {
            grid-template-columns: 1fr !important;
            gap: var(--space-xl) 0 !important;
          }
        }
      `}</style>
    </div>
  );
}
