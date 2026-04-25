// Section 6: Liability-Adjusted Compensation Tool
// Outputs are grounded entirely in survey data — no risk-probability calculations

import { useState, useMemo } from 'react';
import { industryData, cohortData } from '../../data/findings';

const fmt = (n) => n ? `$${Math.round(n).toLocaleString()}` : '—';

const INDUSTRIES = Object.keys(industryData);

const TIERS = [
  { value: '1', label: 'Tier 1 — D&O + Indemnification + Severance + Accel. Vesting' },
  { value: '2', label: 'Tier 2 — Both legal protections + one exit term' },
  { value: '3', label: 'Tier 3 — Both legal protections, no exit terms' },
  { value: '4', label: 'Tier 4 — D&O only OR Indemnification only' },
  { value: '5', label: 'Tier 5 — Exit terms only, no legal protection' },
  { value: '6', label: 'Tier 6 — No protection of any kind' },
  { value: 'ns', label: 'Not Sure — I don\'t know my coverage status' },
];

function inputStyle(focused) {
  return {
    width: '100%',
    fontFamily: 'var(--font-data)',
    fontSize: '14px',
    fontWeight: 400,
    color: 'var(--color-text)',
    background: 'var(--color-bg)',
    border: `1px solid ${focused ? 'var(--color-text)' : 'var(--color-border)'}`,
    borderRadius: '2px',
    padding: '10px 12px',
    outline: 'none',
    transition: 'border-color 0.15s',
  };
}

function Label({ children }) {
  return (
    <div style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-small)', fontWeight: 500, color: 'var(--color-text)', marginBottom: '6px', letterSpacing: '0.02em' }}>
      {children}
    </div>
  );
}

function InputGroup({ children }) {
  return <div style={{ marginBottom: 'var(--space-lg)' }}>{children}</div>;
}

function StatusBadge({ status }) {
  const present = status === 'PRESENT';
  return (
    <span style={{
      fontFamily: 'var(--font-data)',
      fontSize: '11px',
      fontWeight: 500,
      letterSpacing: '0.08em',
      color: present ? 'var(--color-data-protected)' : 'var(--color-accent)',
      background: present ? 'rgba(10,22,40,0.06)' : 'var(--color-bg-tint)',
      padding: '3px 8px',
      borderRadius: '2px',
    }}>
      {status}
    </span>
  );
}

function parseDollar(val) {
  const n = parseFloat(String(val).replace(/[^0-9.]/g, ''));
  return isNaN(n) ? 0 : n;
}

export default function LACTool() {
  const [base, setBase] = useState('');
  const [bonus, setBonus] = useState('');
  const [equity, setEquity] = useState('');
  const [tier, setTier] = useState('');
  const [industry, setIndustry] = useState('');
  const [companyType, setCompanyType] = useState('private');
  const [yearsInRole, setYearsInRole] = useState(2);
  const [equityGrant, setEquityGrant] = useState('');
  const [focused, setFocused] = useState('');

  const tierNum = parseInt(tier) || null;
  const hasDO = tierNum && (tierNum <= 4);
  const hasIndem = tierNum && (tierNum <= 3 || tierNum === 4);
  const hasLegalProtection = tierNum && tierNum <= 4 && tierNum !== 5;
  const hasDOAndIndem = tierNum && tierNum <= 3;
  const hasAccelVest = tierNum && (tierNum === 1 || tierNum === 2);
  const hasSeverance = tierNum === 1;

  const baseVal = parseDollar(base);
  const bonusVal = parseDollar(bonus);
  const equityVal = parseDollar(equity);
  const totalComp = baseVal + bonusVal + equityVal;

  const equityGrantVal = parseDollar(equityGrant);
  const vestedFraction = Math.min(yearsInRole / 4, 1.0);
  const unvested = equityGrantVal * (1 - vestedFraction);

  const cohortKey = companyType === 'public'
    ? (tier === '1' || tier === '2' || tier === '3' ? 'Public / Repeat' : 'Public / First-Time')
    : (tier === '1' || tier === '2' || tier === '3' ? 'Private / Repeat' : 'Private / First-Time');

  const cohort = cohortData[cohortKey];
  const industryInfo = industry ? industryData[industry] : null;

  const tier1Cohort = companyType === 'public' ? cohortData['Public / Repeat'] : cohortData['Private / Repeat'];

  const lacRiskColor = (risk) => {
    if (risk === 'HIGH') return 'var(--color-accent)';
    if (risk === 'MEDIUM') return '#C17D00';
    if (risk === 'LOW') return 'var(--color-data-protected)';
    return 'var(--color-text-muted)';
  };

  const hasInputs = baseVal > 0;

  return (
    <div style={{ width: '100%' }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'var(--space-xl)',
          alignItems: 'start',
        }}
        className="lac-panels"
      >
        {/* ── LEFT PANEL — Inputs ── */}
        <div style={{
          background: 'var(--color-bg)',
          border: '1px solid var(--color-border)',
          borderRadius: '2px',
          padding: 'var(--space-xl)',
        }}>
          <div style={{ fontFamily: 'var(--font-data)', fontSize: '11px', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-text)', marginBottom: 'var(--space-xl)' }}>
            Your Current Offer
          </div>

          <InputGroup>
            <Label>Base Salary</Label>
            <input
              type="text"
              placeholder="$000,000"
              value={base}
              onChange={e => setBase(e.target.value)}
              onFocus={() => setFocused('base')}
              onBlur={() => setFocused('')}
              style={inputStyle(focused === 'base')}
            />
          </InputGroup>

          <InputGroup>
            <Label>Annual Bonus (estimated)</Label>
            <input
              type="text"
              placeholder="$000,000"
              value={bonus}
              onChange={e => setBonus(e.target.value)}
              onFocus={() => setFocused('bonus')}
              onBlur={() => setFocused('')}
              style={inputStyle(focused === 'bonus')}
            />
          </InputGroup>

          <InputGroup>
            <Label>Equity / RSU Value (annual)</Label>
            <input
              type="text"
              placeholder="$000,000"
              value={equity}
              onChange={e => setEquity(e.target.value)}
              onFocus={() => setFocused('equity')}
              onBlur={() => setFocused('')}
              style={inputStyle(focused === 'equity')}
            />
          </InputGroup>

          <InputGroup>
            <Label>Your Protection Tier</Label>
            <select
              value={tier}
              onChange={e => setTier(e.target.value)}
              style={{ ...inputStyle(focused === 'tier'), appearance: 'none' }}
              onFocus={() => setFocused('tier')}
              onBlur={() => setFocused('')}
            >
              <option value="">Select tier...</option>
              {TIERS.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
            </select>
          </InputGroup>

          <InputGroup>
            <Label>Industry</Label>
            <select
              value={industry}
              onChange={e => setIndustry(e.target.value)}
              style={{ ...inputStyle(focused === 'industry'), appearance: 'none' }}
              onFocus={() => setFocused('industry')}
              onBlur={() => setFocused('')}
            >
              <option value="">Select industry...</option>
              {INDUSTRIES.map(ind => <option key={ind} value={ind}>{ind}</option>)}
            </select>
          </InputGroup>

          <InputGroup>
            <Label>Company Type</Label>
            <div style={{ display: 'flex', gap: 0, border: '1px solid var(--color-border)', borderRadius: '2px', overflow: 'hidden' }}>
              {['public', 'private'].map(ct => (
                <button
                  key={ct}
                  onClick={() => setCompanyType(ct)}
                  style={{
                    flex: 1,
                    padding: '10px',
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-small)',
                    fontWeight: 400,
                    background: companyType === ct ? 'var(--color-text)' : 'transparent',
                    color: companyType === ct ? 'var(--color-text-inverse)' : 'var(--color-text-muted)',
                    border: 'none',
                    cursor: 'pointer',
                    textTransform: 'capitalize',
                    transition: 'all 0.15s',
                  }}
                >
                  {ct}
                </button>
              ))}
            </div>
          </InputGroup>

          <InputGroup>
            <Label>Years in Current Role: {yearsInRole}</Label>
            <input
              type="range"
              min={0}
              max={10}
              value={yearsInRole}
              onChange={e => setYearsInRole(Number(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--color-text)' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-data)', fontSize: '10px', color: 'var(--color-text-muted)', marginTop: '4px' }}>
              <span>0</span><span>5</span><span>10</span>
            </div>
          </InputGroup>

          <InputGroup>
            <Label>Approximate Equity Grant — total (optional)</Label>
            <input
              type="text"
              placeholder="$0,000,000 — for unvested equity calculation"
              value={equityGrant}
              onChange={e => setEquityGrant(e.target.value)}
              onFocus={() => setFocused('equityGrant')}
              onBlur={() => setFocused('')}
              style={inputStyle(focused === 'equityGrant')}
            />
          </InputGroup>
        </div>

        {/* ── RIGHT PANEL — Outputs ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>

          {!hasInputs && (
            <div style={{
              padding: 'var(--space-xl)',
              border: '1px solid var(--color-border)',
              borderRadius: '2px',
              background: 'var(--color-bg)',
              textAlign: 'center',
            }}>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-small)', fontWeight: 300, color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                Enter your base salary to see where your offer stands relative to your cohort.
              </div>
            </div>
          )}

          {hasInputs && (
            <>
              {/* Output Block A — Defined Compensation */}
              <div style={{ padding: 'var(--space-xl)', border: '1px solid var(--color-border)', borderRadius: '2px', background: 'var(--color-bg)' }}>
                <div style={{ fontFamily: 'var(--font-data)', fontSize: '10px', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: 'var(--space-lg)' }}>
                  Your Total Package
                </div>

                <div style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-hero)', fontWeight: 700, color: 'var(--color-text)', lineHeight: 1.1, marginBottom: '8px' }}>
                  {fmt(totalComp)}
                </div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-small)', fontWeight: 300, color: 'var(--color-text-muted)', marginBottom: 'var(--space-lg)' }}>
                  Base + Bonus + Equity
                </div>

                {cohort && (
                  <>
                    {/* Percentile bar */}
                    <div style={{ marginBottom: 'var(--space-md)' }}>
                      <div style={{ background: 'var(--color-border)', height: '6px', borderRadius: '3px', position: 'relative', marginBottom: '6px' }}>
                        <div style={{
                          position: 'absolute',
                          left: `${Math.min((totalComp / (cohort.totalMedian * 2)) * 100, 98)}%`,
                          top: '-5px',
                          width: '16px',
                          height: '16px',
                          background: 'var(--color-text)',
                          borderRadius: '50%',
                          transform: 'translateX(-50%)',
                        }} />
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-data)', fontSize: '10px', color: 'var(--color-text-muted)' }}>
                        <span>$0</span>
                        <span>Cohort median: {fmt(cohort.totalMedian)}</span>
                      </div>
                    </div>

                    <div style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-small)', fontWeight: 300, color: 'var(--color-text-muted)' }}>
                      Peer cohort ({cohortKey}): {fmt(cohort.totalMedian)} median · n={cohort.n}
                    </div>
                  </>
                )}
              </div>

              {/* Output Block B — Defined Value Gap vs. Tier 1 */}
              <div style={{ padding: 'var(--space-xl)', border: '1px solid var(--color-border)', borderRadius: '2px', background: 'var(--color-bg)' }}>
                <div style={{ fontFamily: 'var(--font-data)', fontSize: '10px', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: 'var(--space-lg)' }}>
                  Defined Value Comparison
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 'var(--space-sm)', marginBottom: 'var(--space-md)' }}>
                  {['', `You (Tier ${tier || '—'})`, `Tier 1 Peer`].map((h, i) => (
                    <div key={i} style={{ fontFamily: 'var(--font-data)', fontSize: '10px', fontWeight: 500, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', paddingBottom: '8px', borderBottom: '1px solid var(--color-border)' }}>
                      {h}
                    </div>
                  ))}
                </div>

                {[
                  { label: 'Base Salary', user: baseVal, peer: tier1Cohort.baseMedian },
                  { label: 'Annual Bonus', user: bonusVal, peer: tier1Cohort.bonusMedian },
                  { label: 'Equity', user: equityVal, peer: tier1Cohort.equityMedian },
                ].map((row) => (
                  <div key={row.label} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 'var(--space-sm)', padding: '8px 0', borderBottom: '1px solid rgba(224,222,216,0.5)' }}>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--color-text-muted)' }}>{row.label}</span>
                    <span style={{ fontFamily: 'var(--font-data)', fontSize: '12px', color: 'var(--color-text)', fontWeight: 500 }}>{fmt(row.user)}</span>
                    <span style={{ fontFamily: 'var(--font-data)', fontSize: '12px', color: 'var(--color-data-protected)', fontWeight: 500 }}>{fmt(row.peer)}</span>
                  </div>
                ))}

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 'var(--space-sm)', padding: '10px 0', borderTop: '2px solid var(--color-border)', marginTop: '4px' }}>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 500, color: 'var(--color-text)' }}>Cash + Equity</span>
                  <span style={{ fontFamily: 'var(--font-data)', fontSize: '13px', fontWeight: 500, color: 'var(--color-text)' }}>{fmt(totalComp)}</span>
                  <span style={{ fontFamily: 'var(--font-data)', fontSize: '13px', fontWeight: 500, color: 'var(--color-data-protected)' }}>{fmt(tier1Cohort.totalMedian)}</span>
                </div>

                {/* Severance and vesting */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 'var(--space-sm)', padding: '8px 0', borderBottom: '1px solid rgba(224,222,216,0.5)' }}>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--color-text-muted)' }}>Severance Value</span>
                  <span style={{ fontFamily: 'var(--font-data)', fontSize: '11px', color: hasSeverance ? 'var(--color-data-protected)' : 'var(--color-accent)' }}>
                    {hasSeverance ? `${fmt(baseVal * 0.25)}–${fmt(baseVal)}` : 'None pre-negotiated'}
                  </span>
                  <span style={{ fontFamily: 'var(--font-data)', fontSize: '11px', color: 'var(--color-data-protected)' }}>
                    {fmt(tier1Cohort.baseMedian * 0.25)}–{fmt(tier1Cohort.baseMedian)} (est.)
                  </span>
                </div>

                {equityGrantVal > 0 && (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 'var(--space-sm)', padding: '8px 0' }}>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--color-text-muted)' }}>Unvested Equity</span>
                    <span style={{ fontFamily: 'var(--font-data)', fontSize: '11px', color: hasAccelVest ? 'var(--color-data-protected)' : 'var(--color-accent)' }}>
                      {hasAccelVest ? 'Protected (accel. vesting)' : `${fmt(unvested)} at risk`}
                    </span>
                    <span style={{ fontFamily: 'var(--font-data)', fontSize: '11px', color: 'var(--color-data-protected)' }}>Protected</span>
                  </div>
                )}
              </div>

              {/* Output Block C — Contingent Liability Disclosure */}
              <div style={{ padding: 'var(--space-xl)', border: '1px solid var(--color-border)', borderRadius: '2px', background: 'var(--color-bg)' }}>
                <div style={{ fontFamily: 'var(--font-data)', fontSize: '10px', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: 'var(--space-lg)' }}>
                  Contingent Liability Status
                </div>

                {[
                  { label: 'Legal defense coverage (D&O)', present: !!(tierNum && tierNum <= 4 && tierNum !== 5) || (tierNum === 4) },
                  { label: 'Defense cost advancement (Indemnification)', present: !!(hasDOAndIndem) },
                  { label: 'Equity protection on exit', present: !!(hasAccelVest) },
                ].map((item) => (
                  <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid rgba(224,222,216,0.5)' }}>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 400, color: 'var(--color-text)' }}>{item.label}</span>
                    <StatusBadge status={item.present ? 'PRESENT' : 'ABSENT'} />
                  </div>
                ))}

                {(!(tierNum && tierNum <= 3) || tier === 'ns') && (
                  <div style={{
                    marginTop: 'var(--space-lg)',
                    padding: 'var(--space-md)',
                    background: 'var(--color-bg-tint)',
                    borderLeft: '3px solid var(--color-accent)',
                    borderRadius: '0 2px 2px 0',
                  }}>
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 400, color: 'var(--color-text)', lineHeight: 1.6, marginBottom: 'var(--space-md)' }}>
                      In the absence of D&O coverage and indemnification, personal legal defense costs in a covered regulatory or litigation event are a direct personal liability.
                    </div>
                    <div style={{ fontFamily: 'var(--font-data)', fontSize: '11px', color: 'var(--color-text-muted)', lineHeight: 1.8 }}>
                      Industry reference range for covered defense matters:<br />
                      Regulatory enforcement (SEC/FTC): $500,000 – $5,000,000<br />
                      Class action / securities litigation: $200,000 – $2,000,000<br />
                      <span style={{ opacity: 0.7 }}>Source: Published case records and legal industry data. Defense costs only — not judgments or settlements.</span>
                    </div>
                  </div>
                )}

                {tierNum && tierNum <= 3 && (
                  <div style={{ marginTop: 'var(--space-lg)', fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 300, color: 'var(--color-data-protected)', fontStyle: 'italic' }}>
                    Your coverage transfers these contingent liabilities to the company and its insurer.
                  </div>
                )}
              </div>

              {/* Industry context */}
              {industryInfo && (
                <div style={{ padding: 'var(--space-xl)', border: '1px solid var(--color-border)', borderRadius: '2px', background: 'var(--color-bg)' }}>
                  <div style={{ fontFamily: 'var(--font-data)', fontSize: '10px', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: 'var(--space-lg)' }}>
                    Your Industry: {industry}
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-md)' }}>
                    {[
                      { label: 'D&O coverage rate', value: `${industryInfo.doRate}%`, color: 'var(--color-data-protected)' },
                      { label: 'Tier 6 rate', value: `${industryInfo.neither}%`, color: industryInfo.neither > 30 ? 'var(--color-accent)' : 'var(--color-text)' },
                      { label: 'Median total comp', value: fmt(industryInfo.totalMedian), color: 'var(--color-text)' },
                      { label: 'Private company', value: `${industryInfo.privatePct}%`, color: 'var(--color-text-muted)' },
                    ].map(item => (
                      <div key={item.label}>
                        <div style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'var(--color-text-muted)', marginBottom: '2px' }}>{item.label}</div>
                        <div style={{ fontFamily: 'var(--font-data)', fontSize: '14px', fontWeight: 500, color: item.color }}>{item.value}</div>
                      </div>
                    ))}
                  </div>

                  <div style={{ marginTop: 'var(--space-lg)', display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--color-text-muted)' }}>LAC Risk:</span>
                    <span style={{ fontFamily: 'var(--font-data)', fontSize: '12px', fontWeight: 500, color: lacRiskColor(industryInfo.lacRisk), letterSpacing: '0.06em' }}>
                      {industryInfo.lacRisk}
                    </span>
                  </div>

                  {industryInfo.lacRisk === 'HIGH' && (
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 300, color: 'var(--color-text-muted)', marginTop: '6px', fontStyle: 'italic' }}>
                      High-equity industries with lower protection rates represent the widest gap between stated compensation and defined value.
                    </div>
                  )}

                  {industryInfo.note && (
                    <div style={{ fontFamily: 'var(--font-data)', fontSize: '11px', color: 'var(--color-text-muted)', marginTop: 'var(--space-md)', fontStyle: 'italic', lineHeight: 1.6 }}>
                      Note: {industryInfo.note}
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .lac-panels { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
