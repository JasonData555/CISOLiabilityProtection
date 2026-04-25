import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

// ─── Animation variants ───────────────────────────────────────────────────────

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
};

// ─── FadeInWhenVisible wrapper ────────────────────────────────────────────────

export function FadeInSection({ children, className = '', delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={{
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay } },
      }}
    >
      {children}
    </motion.div>
  );
}

// ─── StatCard ─────────────────────────────────────────────────────────────────
// Large numeral + uppercase label + two-line explanation

export function StatCard({ number, label, description, numberColor = 'var(--color-text)', className = '' }) {
  return (
    <div className={`stat-card ${className}`} style={{ textAlign: 'center', padding: '0 var(--space-lg)' }}>
      <div
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'var(--text-hero)',
          fontWeight: 700,
          color: numberColor,
          lineHeight: 1.05,
          marginBottom: '8px',
        }}
      >
        {number}
      </div>
      <div
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--text-small)',
          fontWeight: 500,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: 'var(--color-text)',
          marginBottom: '6px',
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--text-small)',
          fontWeight: 300,
          color: 'var(--color-text-muted)',
          lineHeight: 1.5,
          maxWidth: '220px',
          margin: '0 auto',
        }}
      >
        {description}
      </div>
    </div>
  );
}

// ─── SectionHeader ────────────────────────────────────────────────────────────
// Section number label + headline stat + finding title

export function SectionHeader({ number, label, headlineStat, headlineColor = 'var(--color-text)', title, className = '' }) {
  return (
    <div className={`section-header ${className}`} style={{ marginBottom: 'var(--space-xl)' }}>
      <div
        style={{
          fontFamily: 'var(--font-data)',
          fontSize: 'var(--text-label)',
          fontWeight: 500,
          color: 'var(--color-accent)',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          marginBottom: 'var(--space-md)',
        }}
      >
        {number} · {label}
      </div>
      {headlineStat && (
        <div
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-hero)',
            fontWeight: 700,
            color: headlineColor,
            lineHeight: 1.05,
            marginBottom: 'var(--space-sm)',
          }}
        >
          {headlineStat}
        </div>
      )}
      <h2
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--text-h3)',
          fontWeight: 500,
          color: 'var(--color-text)',
          lineHeight: 1.35,
          letterSpacing: '-0.01em',
          maxWidth: '680px',
        }}
      >
        {title}
      </h2>
    </div>
  );
}

// ─── Callout ──────────────────────────────────────────────────────────────────
// Highlighted finding block — light mint background, 3px mint left border

export function Callout({ children, className = '' }) {
  return (
    <div
      className={`callout ${className}`}
      style={{
        background: 'var(--color-bg-tint)',
        borderLeft: '3px solid var(--color-accent)',
        padding: 'var(--space-lg) var(--space-xl)',
        margin: 'var(--space-xl) 0',
        borderRadius: '0 2px 2px 0',
      }}
    >
      {children}
    </div>
  );
}

// ─── ChartWrapper ─────────────────────────────────────────────────────────────
// Consistent chart container with title, optional subtitle, source line

export function ChartWrapper({ title, subtitle, source, children, className = '' }) {
  return (
    <div
      className={`chart-wrapper ${className}`}
      style={{
        background: 'var(--color-bg-surface)',
        padding: 'var(--space-xl)',
        margin: 'var(--space-xl) 0',
        borderRadius: '2px',
      }}
    >
      {title && (
        <div style={{ marginBottom: 'var(--space-lg)' }}>
          <div
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-small)',
              fontWeight: 500,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: 'var(--color-text)',
              marginBottom: subtitle ? '6px' : 0,
            }}
          >
            {title}
          </div>
          {subtitle && (
            <div
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-small)',
                fontWeight: 300,
                color: 'var(--color-text-muted)',
              }}
            >
              {subtitle}
            </div>
          )}
        </div>
      )}
      {children}
      {source && (
        <div
          style={{
            fontFamily: 'var(--font-data)',
            fontSize: 'var(--text-label)',
            fontWeight: 400,
            color: 'var(--color-text-muted)',
            marginTop: 'var(--space-lg)',
            borderTop: '1px solid var(--color-border)',
            paddingTop: 'var(--space-sm)',
          }}
        >
          {source}
        </div>
      )}
    </div>
  );
}

// ─── BodyText ─────────────────────────────────────────────────────────────────
// Styled prose paragraph

export function BodyText({ children, className = '', style = {} }) {
  return (
    <p
      className={`body-text ${className}`}
      style={{
        fontFamily: 'var(--font-body)',
        fontSize: 'var(--text-body)',
        fontWeight: 400,
        color: 'var(--color-text)',
        lineHeight: 1.7,
        maxWidth: '680px',
        ...style,
      }}
    >
      {children}
    </p>
  );
}

// ─── Divider ──────────────────────────────────────────────────────────────────

export function Divider({ style = {} }) {
  return (
    <hr
      style={{
        border: 'none',
        borderTop: '1px solid var(--color-border)',
        margin: 'var(--space-2xl) 0',
        ...style,
      }}
    />
  );
}

// ─── Mono ─────────────────────────────────────────────────────────────────────
// IBM Plex Mono inline span

export function Mono({ children, size = 'var(--text-label)', color = 'var(--color-text-muted)', weight = 400, style = {} }) {
  return (
    <span
      style={{
        fontFamily: 'var(--font-data)',
        fontSize: size,
        fontWeight: weight,
        color,
        ...style,
      }}
    >
      {children}
    </span>
  );
}
