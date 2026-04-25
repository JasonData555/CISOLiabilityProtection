// Section 5: Toggle between Company Structure and Company Size views

import { useState } from 'react';
import { structureData, sizeData } from '../../data/findings';

const fmt = (n) => `$${n.toLocaleString()}`;

export default function StructureSizeToggle() {
  const [view, setView] = useState('structure');

  return (
    <div style={{ width: '100%' }}>
      {/* Toggle */}
      <div style={{ display: 'flex', gap: 0, marginBottom: 'var(--space-xl)', border: '1px solid var(--color-border)', borderRadius: '2px', width: 'fit-content' }}>
        {[
          { key: 'structure', label: 'Company Structure' },
          { key: 'size',      label: 'Company Size' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setView(tab.key)}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-small)',
              fontWeight: 400,
              padding: '8px 20px',
              background: view === tab.key ? 'var(--color-text)' : 'transparent',
              color: view === tab.key ? 'var(--color-text-inverse)' : 'var(--color-text-muted)',
              cursor: 'pointer',
              border: 'none',
              transition: 'all 0.15s',
              letterSpacing: '0.02em',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Structure view */}
      {view === 'structure' && (
        <div
          style={{ display: 'grid', gridTemplateColumns: '1fr 1px 1fr', gap: '0 var(--space-xl)' }}
          className="structure-columns"
        >
          {[
            { label: 'Public Company', n: structureData.public.n, doRate: structureData.public.doRate, neither: structureData.public.neither, adverse: false },
            { label: 'Private Company', n: structureData.private.n, doRate: structureData.private.doRate, neither: structureData.private.neither, adverse: true },
          ].map((col, i) => (
            <>
              <div key={col.label} style={{ textAlign: 'center', padding: i === 0 ? '0 var(--space-lg) 0 0' : '0 0 0 var(--space-lg)' }}>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-small)', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: col.adverse ? 'var(--color-accent)' : 'var(--color-text)', marginBottom: 'var(--space-md)' }}>
                  {col.label}
                </div>
                <div style={{ fontFamily: 'var(--font-data)', fontSize: '11px', color: 'var(--color-text-muted)', marginBottom: 'var(--space-lg)' }}>n={col.n}</div>

                <div style={{ marginBottom: 'var(--space-xl)' }}>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-small)', fontWeight: 400, color: 'var(--color-text-muted)', marginBottom: '4px' }}>D&O Coverage</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-h1)', fontWeight: 700, color: 'var(--color-data-protected)', lineHeight: 1.1 }}>{col.doRate}%</div>
                </div>

                <div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-small)', fontWeight: 400, color: 'var(--color-text-muted)', marginBottom: '4px' }}>Neither</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-h1)', fontWeight: 700, color: col.adverse ? 'var(--color-accent)' : 'var(--color-text)', lineHeight: 1.1 }}>{col.neither}%</div>
                </div>
              </div>
              {i === 0 && <div key="divider" style={{ background: 'var(--color-border)', width: '1px' }} />}
            </>
          ))}
        </div>
      )}

      {/* Size view */}
      {view === 'size' && (
        <div
          style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--space-xl)' }}
          className="size-grid"
        >
          {sizeData.map((s) => (
            <div
              key={s.label}
              style={{
                padding: 'var(--space-lg)',
                background: 'var(--color-bg)',
                border: '1px solid var(--color-border)',
                borderRadius: '2px',
              }}
            >
              <div style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-small)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-text)', marginBottom: '4px' }}>
                {s.label}
              </div>
              <div style={{ fontFamily: 'var(--font-data)', fontSize: '11px', color: 'var(--color-text-muted)', marginBottom: 'var(--space-lg)' }}>
                {s.description} · n={s.n}
              </div>

              <div style={{ display: 'flex', gap: 'var(--space-xl)', flexWrap: 'wrap' }}>
                <div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'var(--color-text-muted)', marginBottom: '2px' }}>D&O</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-h2)', fontWeight: 700, color: 'var(--color-data-protected)', lineHeight: 1.1 }}>{s.doRate}%</div>
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'var(--color-text-muted)', marginBottom: '2px' }}>Neither</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-h2)', fontWeight: 700, color: s.neither > 40 ? 'var(--color-accent)' : 'var(--color-text)', lineHeight: 1.1 }}>{s.neither}%</div>
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'var(--color-text-muted)', marginBottom: '2px' }}>Base Median</div>
                  <div style={{ fontFamily: 'var(--font-data)', fontSize: '14px', fontWeight: 500, color: 'var(--color-text)', lineHeight: 1.1 }}>{fmt(s.baseMedian)}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 767px) {
          .structure-columns { grid-template-columns: 1fr !important; gap: var(--space-xl) 0 !important; }
          .size-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
