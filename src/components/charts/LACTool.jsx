// Section 6: Liability-Adjusted Compensation Tool
// Outputs are grounded entirely in survey data — no risk-probability calculations

import { useState } from 'react';
import { industryData, cohortData } from '../../data/findings';

// ─── Helpers ────────────────────────────────────────────────────────────────

const fmt = (n) => (n ? `$${Math.round(n).toLocaleString()}` : '—');

function parseDollar(val) {
  const n = parseFloat(String(val).replace(/[^0-9.]/g, ''));
  return isNaN(n) ? 0 : n;
}

function formatDollar(raw) {
  const num = String(raw).replace(/[^0-9]/g, '');
  return num ? '$' + parseInt(num, 10).toLocaleString() : '';
}

// ─── Data ────────────────────────────────────────────────────────────────────

const TIERS = [
  {
    value: '1',
    label: 'Tier 1 — D&O + Indemnification + Severance + Accel. Vesting',
    definition:
      'Full legal and exit protection. Covered defense costs are advanced by the company and its insurer without insolvency risk. Unvested equity accelerates on covered termination. Severance provides a cash bridge on exit.',
  },
  {
    value: '2',
    label: 'Tier 2 — Both legal protections + one exit term',
    definition:
      'D&O and indemnification are both present. You have one exit term — severance OR accelerated vesting, but not both. Strong legal coverage with partial exit protection.',
  },
  {
    value: '3',
    label: 'Tier 3 — Both legal protections, no exit terms',
    definition:
      'D&O and indemnification are both present. No severance or accelerated vesting. Legal defense costs are covered, but cash and equity are not protected on exit.',
  },
  {
    value: '4',
    label: 'Tier 4 — D&O or Indemnification only',
    definition:
      'You have one form of legal protection but not both. You are missing the second legal instrument that provides defense cost advancement (if you have D&O but no indemnification) or third-party coverage in insolvency (if you have indemnification but no D&O).',
  },
  {
    value: '5',
    label: 'Tier 5 — Exit terms only, no legal protection',
    definition:
      'You have severance or accelerated vesting but no legal coverage. Personal defense costs in a covered enforcement or litigation event remain a direct personal liability.',
  },
  {
    value: '6',
    label: 'Tier 6 — No protection of any kind',
    definition:
      'No D&O coverage, no indemnification, no severance, no accelerated vesting. All four dimensions are absent.',
  },
  {
    value: 'ns',
    label: "Not Sure — I don't know my coverage status",
    definition: null, // special handling
  },
];

const INDUSTRY_GROUPS = [
  {
    label: 'Financial',
    options: ['Banking / Financial Services', 'Financial Services', 'FinTech', 'Insurance'],
  },
  {
    label: 'Technology',
    options: [
      'Cloud Infrastructure',
      'Cloud Security',
      'Enterprise Software',
      'Consumer Software',
      'HealthTech',
    ],
  },
  {
    label: 'Other',
    options: ['Healthcare', 'Manufacturing', 'Government', 'Education'],
  },
];

// ─── Sub-components ──────────────────────────────────────────────────────────

function ColLabel({ children }) {
  return (
    <div style={{
      fontFamily: 'var(--font-data)',
      fontSize: '11px',
      fontWeight: 500,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      color: 'var(--color-text-muted)',
      marginBottom: '20px',
    }}>
      {children}
    </div>
  );
}

function FieldLabel({ children, required }) {
  return (
    <div style={{
      fontFamily: 'var(--font-data)',
      fontSize: '11px',
      fontWeight: 500,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: 'var(--color-text-muted)',
      marginBottom: '6px',
    }}>
      {children}{required && <span style={{ color: 'var(--color-accent)', marginLeft: '3px' }}>*</span>}
    </div>
  );
}

function FieldWrap({ children }) {
  return <div style={{ marginBottom: '20px' }}>{children}</div>;
}

function textInput(isFocused) {
  return {
    width: '100%',
    fontFamily: 'var(--font-data)',
    fontSize: '14px',
    color: 'var(--color-text)',
    background: 'var(--color-bg)',
    border: `1px solid ${isFocused ? 'var(--color-text)' : 'var(--color-border)'}`,
    borderRadius: '2px',
    padding: '10px 12px',
    outline: 'none',
    transition: 'border-color 0.15s',
    boxSizing: 'border-box',
  };
}

function Toggle({ value, onChange, options }) {
  return (
    <div style={{
      display: 'flex',
      border: '1px solid var(--color-border)',
      borderRadius: '2px',
      overflow: 'hidden',
    }}>
      {options.map(opt => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          style={{
            flex: 1,
            padding: '10px 8px',
            fontFamily: 'var(--font-body)',
            fontSize: '13px',
            fontWeight: value === opt.value ? 500 : 400,
            background: value === opt.value ? 'var(--color-text)' : 'transparent',
            color: value === opt.value ? 'var(--color-text-inverse)' : 'var(--color-text-muted)',
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.15s',
          }}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

function InvBadge({ label, status }) {
  // status: 'PRESENT' | 'ABSENT' | 'AT RISK' | 'PROTECTED'
  const isPositive = status === 'PRESENT' || status === 'PROTECTED';
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px 0',
      borderBottom: '1px solid rgba(255,255,255,0.08)',
    }}>
      <span style={{
        fontFamily: 'var(--font-body)',
        fontSize: '13px',
        color: 'rgba(255,255,255,0.75)',
      }}>
        {label}
      </span>
      <span style={{
        fontFamily: 'var(--font-data)',
        fontSize: '11px',
        fontWeight: 500,
        letterSpacing: '0.08em',
        color: isPositive ? '#4CAF7D' : 'var(--color-accent)',
      }}>
        {status}
      </span>
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default function LACTool() {
  // Form inputs
  const [base, setBase] = useState('');
  const [bonus, setBonus] = useState('');
  const [equity, setEquity] = useState('');
  const [equityGrant, setEquityGrant] = useState('');
  const [tier, setTier] = useState('');
  const [cisoExperience, setCisoExperience] = useState('repeat');
  const [yearsInRole, setYearsInRole] = useState(3);
  const [companyType, setCompanyType] = useState('private');
  const [industry, setIndustry] = useState('');
  const [focused, setFocused] = useState('');

  // Display values for dollar inputs (formatted on blur, raw on focus)
  const [displayBase, setDisplayBase] = useState('');
  const [displayBonus, setDisplayBonus] = useState('');
  const [displayEquity, setDisplayEquity] = useState('');
  const [displayEquityGrant, setDisplayEquityGrant] = useState('');

  // Calculate-on-press
  const [calculated, setCalculated] = useState(false);
  const [snapshot, setSnapshot] = useState(null);

  // ── Dollar input handlers ──
  function makeDollarHandlers(raw, setRaw, display, setDisplay, fieldKey) {
    return {
      value: focused === fieldKey ? raw : display,
      onChange: (e) => {
        const val = e.target.value;
        setRaw(val);
        setDisplay(formatDollar(val));
      },
      onFocus: () => {
        setFocused(fieldKey);
        // show raw digits for editing
        setDisplay(raw.replace(/[^0-9]/g, ''));
      },
      onBlur: () => {
        setFocused('');
        const formatted = formatDollar(raw);
        setDisplay(formatted);
        setRaw(formatted); // keep raw in formatted state after blur
      },
    };
  }

  const baseHandlers = makeDollarHandlers(base, setBase, displayBase, setDisplayBase, 'base');
  const bonusHandlers = makeDollarHandlers(bonus, setBonus, displayBonus, setDisplayBonus, 'bonus');
  const equityHandlers = makeDollarHandlers(equity, setEquity, displayEquity, setDisplayEquity, 'equity');
  const grantHandlers = makeDollarHandlers(equityGrant, setEquityGrant, displayEquityGrant, setDisplayEquityGrant, 'equityGrant');

  // ── Required field validation ──
  const canCalculate = parseDollar(base) > 0 && tier !== '' && cisoExperience !== '' && companyType !== '';

  // ── Calculate handler ──
  function handleCalculate() {
    if (!canCalculate) return;
    setCalculated(true);
    setSnapshot({
      base: parseDollar(base),
      bonus: parseDollar(bonus),
      equity: parseDollar(equity),
      equityGrant: parseDollar(equityGrant),
      tier,
      cisoExperience,
      yearsInRole,
      companyType,
      industry,
    });
  }

  // ── Derived values (from snapshot when calculated) ──
  const s = snapshot;
  const tierNum = s ? (parseInt(s.tier) || null) : null;
  const hasDO = tierNum && tierNum <= 4;
  const hasIndem = tierNum && tierNum <= 3;
  const hasAccelVest = tierNum && (tierNum === 1 || tierNum === 2);
  const hasSeverance = tierNum === 1;
  const isFullyProtected = tierNum && tierNum <= 3;

  const totalComp = s ? s.base + s.bonus + s.equity : 0;

  const cohortKey = s
    ? (s.companyType === 'public' && s.cisoExperience === 'repeat' ? 'Public / Repeat'
      : s.companyType === 'public' && s.cisoExperience === 'first' ? 'Public / First-Time'
      : s.companyType === 'private' && s.cisoExperience === 'repeat' ? 'Private / Repeat'
      : 'Private / First-Time')
    : null;

  const cohort = cohortKey ? cohortData[cohortKey] : null;
  const tier1Cohort = cohort; // same cohort — comparison is about protection structure
  const industryInfo = s && s.industry ? industryData[s.industry] : null;

  const compDiff = cohort ? totalComp - cohort.totalMedian : 0;

  const vestedFraction = s ? Math.min(s.yearsInRole / 4, 1.0) : 0;
  const unvested = s && s.equityGrant > 0 ? s.equityGrant * (1 - vestedFraction) : 0;

  const tierObj = TIERS.find(t => t.value === (s ? s.tier : tier));
  const currentTierObj = TIERS.find(t => t.value === tier);

  const lacRiskColor = (risk) => {
    if (risk === 'HIGH') return 'var(--color-accent)';
    if (risk === 'MEDIUM') return '#C17D00';
    if (risk === 'LOW') return '#4CAF7D';
    return 'rgba(255,255,255,0.5)';
  };

  // ─── Render ───────────────────────────────────────────────────────────────

  return (
    <div style={{ width: '100%' }}>

      {/* ══ ZONE 1: INPUTS ══════════════════════════════════════════════════ */}
      <div style={{
        background: 'var(--color-bg-tint)',
        border: '1px solid var(--color-border)',
        borderRadius: '4px',
        padding: '40px',
        marginBottom: '24px',
      }}>
        <div
          className="lac-zone1-cols"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: '0',
          }}
        >
          {/* ── Column A: Compensation ── */}
          <div style={{ paddingRight: '32px', borderRight: '1px solid var(--color-border)' }}>
            <ColLabel>Compensation</ColLabel>

            <FieldWrap>
              <FieldLabel required>Base Salary</FieldLabel>
              <input
                type="text"
                placeholder="$000,000"
                style={textInput(focused === 'base')}
                {...baseHandlers}
              />
            </FieldWrap>

            <FieldWrap>
              <FieldLabel>Annual Bonus</FieldLabel>
              <input
                type="text"
                placeholder="$000,000"
                style={textInput(focused === 'bonus')}
                {...bonusHandlers}
              />
            </FieldWrap>

            <FieldWrap>
              <FieldLabel>Equity / RSU (annual)</FieldLabel>
              <input
                type="text"
                placeholder="$000,000"
                style={textInput(focused === 'equity')}
                {...equityHandlers}
              />
            </FieldWrap>

            <FieldWrap>
              <FieldLabel>Equity Grant — Total</FieldLabel>
              <input
                type="text"
                placeholder="$0,000,000"
                style={textInput(focused === 'equityGrant')}
                {...grantHandlers}
              />
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'var(--color-text-muted)', marginTop: '5px' }}>
                For unvested equity calculation
              </div>
            </FieldWrap>
          </div>

          {/* ── Column B: Protection & Experience ── */}
          <div style={{ padding: '0 32px', borderRight: '1px solid var(--color-border)' }}>
            <ColLabel>Protection &amp; Experience</ColLabel>

            <FieldWrap>
              <FieldLabel required>Your Protection Tier</FieldLabel>
              <div style={{ position: 'relative' }}>
                <select
                  value={tier}
                  onChange={e => setTier(e.target.value)}
                  style={{
                    ...textInput(focused === 'tier'),
                    appearance: 'none',
                    WebkitAppearance: 'none',
                    paddingRight: '32px',
                    cursor: 'pointer',
                  }}
                  onFocus={() => setFocused('tier')}
                  onBlur={() => setFocused('')}
                >
                  <option value="">Select tier...</option>
                  {TIERS.map(t => (
                    <option key={t.value} value={t.value}>{t.label}</option>
                  ))}
                </select>
                <div style={{
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  pointerEvents: 'none',
                  color: 'var(--color-text-muted)',
                  fontSize: '10px',
                }}>▾</div>
              </div>
              {/* Tier definition helper */}
              {tier && currentTierObj && (
                <div style={{
                  marginTop: '8px',
                  padding: '8px 0',
                  fontFamily: 'var(--font-body)',
                  fontSize: '12px',
                  color: 'var(--color-text-muted)',
                  lineHeight: 1.6,
                }}>
                  {tier === 'ns' ? (
                    <span style={{ color: 'var(--color-accent)', fontStyle: 'italic' }}>
                      Treating as Tier 6 for calculation purposes. Protection you cannot confirm is protection you cannot invoke.
                    </span>
                  ) : currentTierObj.definition}
                </div>
              )}
            </FieldWrap>

            <FieldWrap>
              <FieldLabel required>CISO Experience</FieldLabel>
              <Toggle
                value={cisoExperience}
                onChange={setCisoExperience}
                options={[
                  { value: 'repeat', label: 'Repeat CISO' },
                  { value: 'first', label: 'First-Time CISO' },
                ]}
              />
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'var(--color-text-muted)', marginTop: '6px' }}>
                Have you held a prior CISO or Head of Security role?
              </div>
            </FieldWrap>

            <FieldWrap>
              <FieldLabel>Years in Current Role</FieldLabel>
              <input
                type="range"
                min={0}
                max={15}
                value={yearsInRole}
                onChange={e => setYearsInRole(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--color-text)', marginBottom: '6px' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontFamily: 'var(--font-data)', fontSize: '11px', color: 'var(--color-text-muted)' }}>
                  0 · 5 · 10 · 15
                </div>
                <div style={{ fontFamily: 'var(--font-data)', fontSize: '13px', fontWeight: 500, color: 'var(--color-text)' }}>
                  {yearsInRole} {yearsInRole === 1 ? 'year' : 'years'}
                </div>
              </div>
            </FieldWrap>
          </div>

          {/* ── Column C: Context ── */}
          <div style={{ paddingLeft: '32px' }}>
            <ColLabel>Context</ColLabel>

            <FieldWrap>
              <FieldLabel required>Company Type</FieldLabel>
              <Toggle
                value={companyType}
                onChange={setCompanyType}
                options={[
                  { value: 'public', label: 'Public' },
                  { value: 'private', label: 'Private' },
                ]}
              />
            </FieldWrap>

            <FieldWrap>
              <FieldLabel>Industry</FieldLabel>
              <div style={{ position: 'relative' }}>
                <select
                  value={industry}
                  onChange={e => setIndustry(e.target.value)}
                  style={{
                    ...textInput(focused === 'industry'),
                    appearance: 'none',
                    WebkitAppearance: 'none',
                    paddingRight: '32px',
                    cursor: 'pointer',
                  }}
                  onFocus={() => setFocused('industry')}
                  onBlur={() => setFocused('')}
                >
                  <option value="">Select industry...</option>
                  {INDUSTRY_GROUPS.map(group => (
                    <optgroup key={group.label} label={group.label}>
                      {group.options.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </optgroup>
                  ))}
                </select>
                <div style={{
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  pointerEvents: 'none',
                  color: 'var(--color-text-muted)',
                  fontSize: '10px',
                }}>▾</div>
              </div>
            </FieldWrap>
          </div>
        </div>

        {/* ── Calculate Button ── */}
        <div style={{ marginTop: '32px' }}>
          <button
            onClick={handleCalculate}
            disabled={!canCalculate}
            style={{
              width: '100%',
              padding: '16px',
              fontFamily: 'var(--font-body)',
              fontSize: '16px',
              fontWeight: 500,
              letterSpacing: '0.04em',
              background: canCalculate ? 'var(--color-text)' : 'var(--color-border)',
              color: canCalculate ? 'var(--color-text-inverse)' : 'var(--color-text-muted)',
              border: 'none',
              borderRadius: '2px',
              cursor: canCalculate ? 'pointer' : 'not-allowed',
              transition: 'background 0.15s',
            }}
            onMouseEnter={e => { if (canCalculate) e.target.style.background = 'var(--color-data-partial, #5C6878)'; }}
            onMouseLeave={e => { if (canCalculate) e.target.style.background = 'var(--color-text)'; }}
          >
            Analyze My Offer
          </button>
          {!canCalculate && (
            <div style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'var(--color-text-muted)', textAlign: 'center', marginTop: '8px' }}>
              Required: Base Salary, Protection Tier, and Company Type
            </div>
          )}
        </div>
      </div>

      {/* ══ ZONE 2: PRIMARY OUTPUTS ═════════════════════════════════════════ */}
      <div
        className="lac-zone2-cols"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '24px',
          marginBottom: '24px',
          opacity: calculated ? 1 : 1,
          transition: 'opacity 0.3s',
        }}
      >
        {/* ── Left: Your Position ── */}
        <div style={{
          background: calculated ? 'var(--color-bg)' : 'var(--color-bg-tint)',
          border: calculated ? '1px solid var(--color-border)' : '1px dashed var(--color-border)',
          borderRadius: '2px',
          padding: '40px',
        }}>
          {!calculated ? (
            /* Placeholder */
            <>
              <div style={{ fontFamily: 'var(--font-data)', fontSize: '11px', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
                Your Position
              </div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--color-text-muted)', lineHeight: 1.7 }}>
                Complete the inputs above to see your total package and cohort comparison.
              </div>
            </>
          ) : (
            /* Output */
            <>
              <div style={{ fontFamily: 'var(--font-data)', fontSize: '11px', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
                Your Total Package
              </div>

              <div style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-hero)', fontWeight: 700, color: 'var(--color-text)', lineHeight: 1.1, marginBottom: '6px' }}>
                {fmt(totalComp)}
              </div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--color-text-muted)', marginBottom: '32px' }}>
                Base + Bonus + Equity
              </div>

              <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '24px' }}>
                <div style={{ fontFamily: 'var(--font-data)', fontSize: '11px', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
                  Cohort Comparison
                </div>

                {cohort && (
                  <>
                    <div style={{ fontFamily: 'var(--font-data)', fontSize: '11px', color: 'var(--color-text-muted)', marginBottom: '16px', letterSpacing: '0.04em' }}>
                      {cohortKey} · n={cohort.n}
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
                      {[
                        { label: 'Your package', value: fmt(totalComp), color: 'var(--color-text)', weight: 500 },
                        { label: 'Cohort median', value: fmt(cohort.totalMedian), color: 'var(--color-text-muted)', weight: 400 },
                        {
                          label: 'Difference',
                          value: (compDiff >= 0 ? '+' : '') + fmt(Math.abs(compDiff)),
                          color: compDiff < 0 ? 'var(--color-accent)' : 'var(--color-text)',
                          weight: 500,
                        },
                      ].map(row => (
                        <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                          <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--color-text-muted)' }}>{row.label}</span>
                          <span style={{ fontFamily: 'var(--font-data)', fontSize: '14px', fontWeight: row.weight, color: row.color }}>{row.value}</span>
                        </div>
                      ))}
                    </div>

                    <div style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--color-text-muted)', fontStyle: 'italic', lineHeight: 1.6 }}>
                      {compDiff < 0
                        ? `Your total package is below the median for ${cohortKey} in ${s.industry || 'your industry'} (${fmt(cohort.totalMedian)} · n=${cohort.n}).`
                        : `Your total package exceeds the median for your cohort (${fmt(cohort.totalMedian)} · n=${cohort.n}).`}
                    </div>
                  </>
                )}
              </div>
            </>
          )}
        </div>

        {/* ── Right: Defined Value Gap ── */}
        <div style={{
          background: calculated ? 'var(--color-bg)' : 'var(--color-bg-tint)',
          border: calculated ? '1px solid var(--color-border)' : '1px dashed var(--color-border)',
          borderRadius: '2px',
          padding: '40px',
        }}>
          {!calculated ? (
            /* Placeholder */
            <>
              <div style={{ fontFamily: 'var(--font-data)', fontSize: '11px', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
                Defined Value Gap
              </div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--color-text-muted)', lineHeight: 1.7 }}>
                See how your offer compares to a Tier 1 peer in your cohort — cash, equity, severance, and unvested equity.
              </div>
            </>
          ) : (
            /* Output */
            <>
              <div style={{ fontFamily: 'var(--font-data)', fontSize: '11px', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: '20px' }}>
                Defined Value Comparison
              </div>

              {/* Table header */}
              <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr', gap: '8px', paddingBottom: '10px', borderBottom: '1px solid var(--color-border)' }}>
                <div style={{ fontFamily: 'var(--font-data)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-text-muted)' }} />
                <div style={{ fontFamily: 'var(--font-data)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-text-muted)' }}>
                  You (Tier {s.tier === 'ns' ? '6*' : s.tier})
                </div>
                <div style={{ fontFamily: 'var(--font-data)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-text-muted)', lineHeight: 1.3 }}>
                  Tier 1 Protection<br />
                  <span style={{ opacity: 0.7, fontSize: '9px' }}>{cohortKey}</span>
                </div>
              </div>

              {/* Base / Bonus / Equity rows */}
              {[
                { label: 'Base Salary', user: s.base, peer: tier1Cohort?.baseMedian },
                { label: 'Annual Bonus', user: s.bonus, peer: tier1Cohort?.bonusMedian },
                { label: 'Equity', user: s.equity, peer: tier1Cohort?.equityMedian },
              ].map(row => (
                <div key={row.label} style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr', gap: '8px', padding: '9px 0', borderBottom: '1px solid rgba(224,222,216,0.5)' }}>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--color-text-muted)' }}>{row.label}</span>
                  <span style={{ fontFamily: 'var(--font-data)', fontSize: '13px', color: 'var(--color-text)' }}>{fmt(row.user)}</span>
                  <span style={{ fontFamily: 'var(--font-data)', fontSize: '13px', color: 'var(--color-text)' }}>{fmt(row.peer)}</span>
                </div>
              ))}

              {/* Cash + Equity subtotal */}
              <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr', gap: '8px', padding: '10px 0', borderTop: '2px solid var(--color-border)', borderBottom: '2px solid var(--color-border)', margin: '4px 0' }}>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 500, color: 'var(--color-text)' }}>Cash + Equity</span>
                <span style={{ fontFamily: 'var(--font-data)', fontSize: '14px', fontWeight: 500, color: 'var(--color-text)' }}>{fmt(totalComp)}</span>
                <span style={{ fontFamily: 'var(--font-data)', fontSize: '14px', fontWeight: 500, color: 'var(--color-text)' }}>{fmt(tier1Cohort?.totalMedian)}</span>
              </div>

              {/* Severance */}
              <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr', gap: '8px', padding: '9px 0', borderBottom: '1px solid rgba(224,222,216,0.5)' }}>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--color-text-muted)' }}>Severance Value</span>
                <span style={{ fontFamily: 'var(--font-data)', fontSize: '12px', color: hasSeverance ? 'var(--color-text)' : 'var(--color-accent)' }}>
                  {hasSeverance ? `${fmt(s.base * 0.25)}–${fmt(s.base)}` : 'None'}
                </span>
                <span style={{ fontFamily: 'var(--font-data)', fontSize: '12px', color: 'var(--color-text)' }}>
                  {fmt(tier1Cohort?.baseMedian * 0.25)}–{fmt(tier1Cohort?.baseMedian)}
                  <span style={{ color: 'var(--color-text-muted)', fontSize: '10px' }}> est.</span>
                </span>
              </div>

              {/* Unvested equity */}
              {s.equityGrant > 0 && (
                <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr', gap: '8px', padding: '9px 0', borderBottom: '1px solid rgba(224,222,216,0.5)' }}>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--color-text-muted)' }}>Unvested Equity</span>
                  <span style={{ fontFamily: 'var(--font-data)', fontSize: '12px', color: hasAccelVest ? 'var(--color-text)' : 'var(--color-accent)' }}>
                    {hasAccelVest ? 'Protected' : `${fmt(unvested)} at risk`}
                  </span>
                  <span style={{ fontFamily: 'var(--font-data)', fontSize: '12px', color: 'var(--color-text)' }}>Protected</span>
                </div>
              )}

              {/* Defined gap total */}
              {tier1Cohort && (
                <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr', gap: '8px', padding: '12px 0 0' }}>
                  <span style={{ fontFamily: 'var(--font-data)', fontSize: '11px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-text-muted)' }}>
                    Defined Gap
                  </span>
                  <span style={{ fontFamily: 'var(--font-data)', fontSize: '13px', color: 'var(--color-text-muted)' }}>—</span>
                  <div>
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: '15px', fontWeight: 600, color: 'var(--color-text)' }}>
                      {totalComp < tier1Cohort.totalMedian
                        ? `+${fmt(tier1Cohort.totalMedian - totalComp)}`
                        : fmt(0)}
                    </div>
                    {!hasSeverance && (
                      <div style={{ fontFamily: 'var(--font-data)', fontSize: '10px', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                        + est. severance
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div style={{ marginTop: '20px', fontFamily: 'var(--font-body)', fontSize: '12px', fontStyle: 'italic', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                This comparison reflects defined, calculable differences in compensation structure. The contingent liability below represents additional exposure not reflected in these figures.
              </div>
            </>
          )}
        </div>
      </div>

      {/* ══ ZONE 3: DISCLOSURE ROW ══════════════════════════════════════════ */}
      <div
        className="lac-zone3-cols"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: '0',
          background: 'var(--color-bg-dark)',
          borderRadius: '4px',
          padding: '48px',
          opacity: calculated ? 1 : 0.55,
        }}
      >
        {/* ── Col A: Legal Coverage Status ── */}
        <div style={{ paddingRight: '40px', borderRight: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{
            fontFamily: 'var(--font-data)',
            fontSize: '11px',
            fontWeight: 500,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--color-accent)',
            marginBottom: '20px',
          }}>
            Legal Coverage Status
          </div>

          {!calculated ? (
            <div style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>
              Your D&O, indemnification, and equity protection status.
            </div>
          ) : (
            <>
              <InvBadge label="D&O Insurance" status={hasDO ? 'PRESENT' : 'ABSENT'} />
              <InvBadge label="Indemnification" status={hasIndem ? 'PRESENT' : 'ABSENT'} />
              <InvBadge label="Equity on Exit" status={hasAccelVest ? 'PROTECTED' : 'AT RISK'} />

              <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '20px', marginTop: '8px' }}>
                <div style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '13px',
                  color: 'rgba(255,255,255,0.75)',
                  lineHeight: 1.7,
                }}>
                  {isFullyProtected
                    ? 'Your coverage transfers covered legal defense costs and equity risk to the company and its insurer.'
                    : 'Without D&O coverage and indemnification, personal legal defense costs in a covered enforcement or litigation event are a direct personal liability — not a corporate one.'}
                </div>
              </div>
            </>
          )}
        </div>

        {/* ── Col B: Defense Cost Reference ── */}
        <div style={{ padding: '0 40px', borderRight: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{
            fontFamily: 'var(--font-data)',
            fontSize: '11px',
            fontWeight: 500,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--color-accent)',
            marginBottom: '20px',
          }}>
            Reference: Defense Costs
          </div>

          {!calculated ? (
            <div style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>
              What personal legal defense costs look like when borne personally.
            </div>
          ) : (
            <>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, marginBottom: '20px' }}>
                What covered defense costs look like when borne personally:
              </div>

              {[
                { label: 'Regulatory enforcement (SEC / FTC)', value: '$500K – $5M' },
                { label: 'Class action / securities litigation', value: '$200K – $2M' },
              ].map(item => (
                <div key={item.label} style={{ marginBottom: '20px' }}>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'rgba(255,255,255,0.55)', marginBottom: '4px', lineHeight: 1.5 }}>
                    {item.label}
                  </div>
                  <div style={{ fontFamily: 'var(--font-data)', fontSize: '15px', fontWeight: 500, color: 'rgba(255,255,255,0.9)' }}>
                    {item.value}
                  </div>
                </div>
              ))}

              <div style={{
                borderTop: '1px solid rgba(255,255,255,0.08)',
                paddingTop: '16px',
                fontFamily: 'var(--font-data)',
                fontSize: '10px',
                color: 'rgba(255,255,255,0.4)',
                lineHeight: 1.7,
              }}>
                Source: Published case records and legal industry data. Defense costs only — not judgments or settlements.
              </div>
            </>
          )}
        </div>

        {/* ── Col C: Industry Context ── */}
        <div style={{ paddingLeft: '40px' }}>
          <div style={{
            fontFamily: 'var(--font-data)',
            fontSize: '11px',
            fontWeight: 500,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--color-accent)',
            marginBottom: '20px',
          }}>
            Your Industry
          </div>

          {!calculated || !industryInfo ? (
            <div style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>
              {!calculated
                ? 'Protection rates and comp benchmarks for your industry.'
                : 'Select an industry in the inputs above to see protection rates and benchmarks.'}
            </div>
          ) : (
            <>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '18px', fontWeight: 500, color: 'rgba(255,255,255,0.95)', marginBottom: '20px', lineHeight: 1.3 }}>
                {s.industry}
              </div>

              {[
                { label: 'D&O coverage rate', value: `${industryInfo.doRate}%`, highlight: false },
                { label: 'Tier 6 rate', value: `${industryInfo.neither}%`, highlight: true },
                { label: 'Median total comp', value: fmt(industryInfo.totalMedian), highlight: false },
                { label: 'Private companies', value: `${industryInfo.privatePct}%`, highlight: false },
              ].map(stat => (
                <div key={stat.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'rgba(255,255,255,0.55)' }}>{stat.label}</span>
                  <span style={{ fontFamily: 'var(--font-data)', fontSize: '14px', fontWeight: 500, color: stat.highlight ? 'var(--color-accent)' : 'rgba(255,255,255,0.9)' }}>
                    {stat.value}
                  </span>
                </div>
              ))}

              <div style={{ marginTop: '20px' }}>
                <div style={{ fontFamily: 'var(--font-data)', fontSize: '11px', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.5)', marginBottom: '4px' }}>
                  LAC Risk Profile
                </div>
                <div style={{ fontFamily: 'var(--font-data)', fontSize: '13px', fontWeight: 500, letterSpacing: '0.06em', color: lacRiskColor(industryInfo.lacRisk) }}>
                  {industryInfo.lacRisk}
                </div>
                {industryInfo.lacRisk === 'HIGH' && (
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'rgba(255,255,255,0.6)', fontStyle: 'italic', lineHeight: 1.6, marginTop: '8px' }}>
                    High-equity industries with below-average protection rates represent the widest gap between stated compensation and defined value.
                  </div>
                )}
                {industryInfo.note && (
                  <div style={{ fontFamily: 'var(--font-data)', fontSize: '11px', color: 'rgba(255,255,255,0.4)', fontStyle: 'italic', lineHeight: 1.6, marginTop: '8px' }}>
                    {industryInfo.note}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {/* ── Mobile + hover styles ── */}
      <style>{`
        @media (max-width: 767px) {
          .lac-zone1-cols {
            grid-template-columns: 1fr !important;
          }
          .lac-zone1-cols > div {
            padding: 0 !important;
            border-right: none !important;
            border-bottom: 1px solid var(--color-border);
            padding-bottom: 24px !important;
            margin-bottom: 24px;
          }
          .lac-zone1-cols > div:last-child {
            border-bottom: none;
            margin-bottom: 0;
          }
          .lac-zone2-cols {
            grid-template-columns: 1fr !important;
          }
          .lac-zone3-cols {
            grid-template-columns: 1fr !important;
            padding: 32px !important;
          }
          .lac-zone3-cols > div {
            padding: 0 !important;
            border-right: none !important;
            border-bottom: 1px solid rgba(255,255,255,0.1);
            padding-bottom: 32px !important;
            margin-bottom: 32px;
          }
          .lac-zone3-cols > div:last-child {
            border-bottom: none;
            margin-bottom: 0;
            padding-bottom: 0 !important;
          }
        }
      `}</style>
    </div>
  );
}
