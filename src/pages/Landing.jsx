import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import hitchLogo from '../assets/hitch_logo.png';
import { StatCard, BodyText, Divider, FadeInSection } from '../components/design-system';

// Count-up hook — runs once when shouldStart is true
function useCountUp(target, duration = 1200, shouldStart = true) {
  const [count, setCount] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!shouldStart || started.current) return;
    started.current = true;
    const startTime = performance.now();
    const step = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOut cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
      else setCount(target);
    };
    requestAnimationFrame(step);
  }, [target, duration, shouldStart]);

  return count;
}

export default function Landing() {
  const heroCount = useCountUp(38, 1200, true);

  return (
    <div style={{ background: 'var(--color-bg)' }}>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section
        style={{
          background: 'var(--color-bg-dark)',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          padding: '0 var(--space-lg)',
        }}
      >
        {/* Nav */}
        <nav
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 'var(--space-lg) var(--space-xl)',
            maxWidth: '1200px',
            width: '100%',
            margin: '0 auto',
          }}
        >
          <img
            src={hitchLogo}
            alt="Hitch Partners"
            style={{
              height: '26px',
              width: 'auto',
              filter: 'invert(1)',
              mixBlendMode: 'screen',
              opacity: 0.8,
            }}
          />
          <Link
            to="/findings"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-small)',
              fontWeight: 400,
              color: 'var(--color-text-inverse)',
              opacity: 0.8,
              transition: 'opacity 0.2s',
            }}
            onMouseEnter={e => (e.target.style.opacity = 1)}
            onMouseLeave={e => (e.target.style.opacity = 0.8)}
          >
            Read the Research →
          </Link>
        </nav>

        {/* Hero content */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: 'var(--space-2xl) var(--space-lg)',
            maxWidth: '900px',
            margin: '0 auto',
            width: '100%',
          }}
        >
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              fontFamily: 'var(--font-data)',
              fontSize: 'var(--text-label)',
              fontWeight: 400,
              color: 'var(--color-accent)',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              marginBottom: 'var(--space-lg)',
            }}
          >
            CISO Governance Research · 2024–2025
          </motion.div>

          {/* UNPROTECTED */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-display)',
              fontWeight: 700,
              color: 'var(--color-text-inverse)',
              lineHeight: 0.95,
              letterSpacing: '-0.02em',
              textTransform: 'uppercase',
              marginBottom: 'var(--space-sm)',
            }}
          >
            Unprotected
          </motion.div>

          {/* Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-h3)',
              fontWeight: 300,
              color: 'rgba(247,246,242,0.65)',
              marginBottom: 'var(--space-2xl)',
              letterSpacing: '0.01em',
            }}
          >
            The CISO Liability Gap
          </motion.div>

          {/* Rule */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            style={{
              width: '48px',
              height: '1px',
              background: 'rgba(247,246,242,0.25)',
              marginBottom: 'var(--space-2xl)',
            }}
          />

          {/* 38% numeral */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            style={{ marginBottom: 'var(--space-md)' }}
          >
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-display)',
                fontWeight: 700,
                color: 'var(--color-text-inverse)',
                lineHeight: 1,
              }}
            >
              {heroCount}
            </span>
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: `calc(var(--text-display) * 0.6)`,
                fontWeight: 400,
                color: 'var(--color-text-inverse)',
                lineHeight: 1,
                marginLeft: '2px',
              }}
            >
              %
            </span>
          </motion.div>

          {/* Descriptor */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-h3)',
              fontWeight: 300,
              color: 'var(--color-text-inverse)',
              marginBottom: 'var(--space-sm)',
            }}
          >
            of CISOs operate with no legal protection.
          </motion.div>

          {/* Stakes line */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-body)',
              fontWeight: 300,
              color: 'rgba(247,246,242,0.55)',
              marginBottom: 'var(--space-xl)',
            }}
          >
            In an environment where personal liability is no longer theoretical.
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.95 }}
            style={{ marginBottom: 'var(--space-2xl)' }}
          >
            <Link
              to="/findings"
              style={{
                display: 'inline-block',
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-small)',
                fontWeight: 400,
                letterSpacing: '0.04em',
                color: 'var(--color-text-inverse)',
                border: '1px solid var(--color-accent)',
                padding: '12px 28px',
                borderRadius: '2px',
                transition: 'background 0.2s, color 0.2s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'var(--color-accent)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'transparent';
              }}
            >
              Read the Full Analysis →
            </Link>
          </motion.div>

          {/* Source line */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.1 }}
            style={{
              fontFamily: 'var(--font-data)',
              fontSize: 'var(--text-label)',
              fontWeight: 400,
              color: 'rgba(247,246,242,0.35)',
              letterSpacing: '0.06em',
            }}
          >
            Hitch Partners · 2024–2025 CISO Compensation Survey · n=943
          </motion.div>
        </div>
      </section>

      {/* ── Three Supporting Stats ────────────────────────── */}
      <section style={{ background: 'var(--color-bg)', padding: 'var(--space-3xl) var(--space-lg)' }}>
        <div
          style={{
            maxWidth: '900px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 'var(--space-xl)',
          }}
          className="stats-grid"
        >
          <FadeInSection delay={0}>
            <StatCard
              number="3.4%"
              label="Fully Protected"
              description={<>Only 1 in 29 CISOs has comprehensive coverage across all four protections.</>}
              numberColor="var(--color-accent)"
            />
          </FadeInSection>
          <FadeInSection delay={0.1}>
            <StatCard
              number="2×"
              label="Board Access"
              description={<>D&O-covered CISOs present quarterly at double the rate of unprotected peers.</>}
              numberColor="var(--color-text)"
            />
          </FadeInSection>
          <FadeInSection delay={0.2}>
            <StatCard
              number="0.7%"
              label="Private / First-Time"
              description={<>Of first-time CISOs at private companies are fully protected. 52.8% have no protection at all.</>}
              numberColor="var(--color-accent)"
            />
          </FadeInSection>
        </div>
      </section>

      {/* ── Prose ────────────────────────────────────────── */}
      <section style={{ background: 'var(--color-bg)', padding: '0 var(--space-lg) var(--space-3xl)' }}>
        <div style={{ maxWidth: '680px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
          <FadeInSection>
            <BodyText>
              The SEC's December 2023 cybersecurity disclosure rules formalized what practitioners had long understood: the CISO role now carries material personal legal exposure. The SolarWinds enforcement action — in which the SEC brought charges directly against CISO Timothy Brown — established that individual accountability is not theoretical. State regulatory enforcement, FTC authority, and breach litigation have extended that exposure beyond public companies.
            </BodyText>
          </FadeInSection>
          <FadeInSection delay={0.1}>
            <BodyText>
              The private company cohort remains critically exposed. The enforcement environment that created CISO personal liability risk was built around public company obligations — but the breach litigation, state regulatory enforcement, and FTC authority that followed it do not stop at the public/private line.
            </BodyText>
          </FadeInSection>
          <FadeInSection delay={0.15}>
            <div style={{ marginTop: 'var(--space-xl)' }}>
              <Link
                to="/findings"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-small)',
                  fontWeight: 500,
                  color: 'var(--color-accent)',
                  letterSpacing: '0.02em',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-accent-dark)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-accent)')}
              >
                Read the Full Analysis — 8 Findings →
              </Link>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* ── Methodology footnote ─────────────────────────── */}
      <footer style={{ background: 'var(--color-bg)', borderTop: '1px solid var(--color-border)', padding: 'var(--space-xl) var(--space-lg)' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <p
            style={{
              fontFamily: 'var(--font-data)',
              fontSize: 'var(--text-label)',
              fontWeight: 400,
              color: 'var(--color-text-muted)',
              lineHeight: 1.7,
            }}
          >
            Methodology: 2024–2025 Hitch Partners CISO Compensation Survey (NA) · CISO/Head Security Level respondents only ·
            Excludes respondents reporting to a CISO · Within-year deduplication by email address ·
            Cross-year panel respondents (n=109) retained as independent observations · Final population: n=943
          </p>
          <p
            style={{
              fontFamily: 'var(--font-data)',
              fontSize: 'var(--text-label)',
              fontWeight: 400,
              color: 'rgba(92,104,120,0.5)',
              marginTop: 'var(--space-md)',
            }}
          >
            © 2025 Hitch Partners · Unprotected: The CISO Liability Gap
          </p>
        </div>
      </footer>

      {/* Mobile grid fix */}
      <style>{`
        @media (max-width: 767px) {
          .stats-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
      `}</style>
    </div>
  );
}
