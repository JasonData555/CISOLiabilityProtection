import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import hitchLogo from '../assets/hitch_logo.png';
import { SectionHeader, Callout, ChartWrapper, BodyText, Divider, FadeInSection } from '../components/design-system';
import ProtectionStackBar from '../components/charts/ProtectionStackBar';
import TierStackVisualization from '../components/charts/TierStackVisualization';
import CohortLadder from '../components/charts/CohortLadder';
import TitleGapComparison from '../components/charts/TitleGapComparison';
import BoardAccessComparison from '../components/charts/BoardAccessComparison';
import ReportingLineDotPlot from '../components/charts/ReportingLineDotPlot';
import StructureSizeToggle from '../components/charts/StructureSizeToggle';
import LACTool from '../components/charts/LACTool';
import YoYComparison from '../components/charts/YoYComparison';

const NAV_ITEMS = [
  { id: 's1',  label: '01 Scale' },
  { id: 's2',  label: '02 Grade' },
  { id: 's3',  label: '03 Title Gap' },
  { id: 's4',  label: '04 Governance' },
  { id: 's5',  label: '05 Structure' },
  { id: 's6',  label: '06 LAC Tool' },
  { id: 's7',  label: '07 Trend' },
  { id: 's8',  label: '08 Implications' },
];

function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const observers = ids.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { rootMargin: '-20% 0px -70% 0px' }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach(o => o && o.disconnect());
  }, [ids]);
  return active;
}

function SectionWrapper({ id, children }) {
  return (
    <section id={id} style={{ padding: 'var(--space-3xl) 0', borderBottom: '1px solid var(--color-border)' }}>
      {children}
    </section>
  );
}

function MethodologyCollapsible() {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ marginTop: 'var(--space-2xl)' }}>
      <button
        onClick={() => setOpen(v => !v)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-sm)',
          fontFamily: 'var(--font-data)',
          fontSize: 'var(--text-small)',
          fontWeight: 500,
          color: 'var(--color-text)',
          cursor: 'pointer',
          background: 'none',
          border: 'none',
          padding: 0,
          letterSpacing: '0.04em',
        }}
      >
        <span style={{ fontSize: '16px', transition: 'transform 0.2s', display: 'inline-block', transform: open ? 'rotate(45deg)' : 'none' }}>+</span>
        Methodology
      </button>

      {open && (
        <div style={{
          marginTop: 'var(--space-lg)',
          padding: 'var(--space-xl)',
          background: 'var(--color-bg)',
          border: '1px solid var(--color-border)',
          borderRadius: '2px',
          fontFamily: 'var(--font-data)',
          fontSize: 'var(--text-label)',
          lineHeight: 1.8,
          color: 'var(--color-text-muted)',
        }}>
          <div style={{ marginBottom: 'var(--space-lg)' }}>
            <div style={{ fontWeight: 500, color: 'var(--color-text)', marginBottom: '6px' }}>Data Source</div>
            Hitch Partners CISO Compensation Survey, 2024 and 2025 annual cycles, North America respondents.
          </div>
          <div style={{ marginBottom: 'var(--space-lg)' }}>
            <div style={{ fontWeight: 500, color: 'var(--color-text)', marginBottom: '6px' }}>Population Filters</div>
            Applied sequentially:<br />
            (1) Title-Level = "CISO / Head Security Level" — excludes NextGen security leaders and unclassified records<br />
            (2) Excludes respondents whose reporting line is "CISO" — removes Deputy CISOs and Directors subordinate to a CISO<br />
            (3) Within-year deduplication by email address — latest submission per respondent per survey year retained
          </div>
          <div style={{ marginBottom: 'var(--space-lg)' }}>
            <div style={{ fontWeight: 500, color: 'var(--color-text)', marginBottom: '6px' }}>Final Population</div>
            n=943, including 109 cross-year panel respondents who participated in both the 2024 and 2025 surveys. Each year's response is treated as an independent observation of employment conditions.
          </div>
          <div style={{ marginBottom: 'var(--space-lg)' }}>
            <div style={{ fontWeight: 500, color: 'var(--color-text)', marginBottom: '6px' }}>Year Distribution</div>
            2024: n=436 · 2025: n=432 · 2026 (partial): n=75
          </div>
          <div style={{ marginBottom: 'var(--space-lg)' }}>
            <div style={{ fontWeight: 500, color: 'var(--color-text)', marginBottom: '6px' }}>Protection Tier Framework</div>
            Six mutually exclusive tiers defined by combination of: D&O insurance policy coverage · Corporate indemnification agreement · Pre-negotiated severance agreement · Accelerated vesting / early termination clause
          </div>
          <div style={{ marginBottom: 'var(--space-lg)' }}>
            <div style={{ fontWeight: 500, color: 'var(--color-text)', marginBottom: '6px' }}>Year-over-Year Caveat</div>
            The "Not Sure" response option was absent from the 2024 survey instrument. The 17.6-point decline in the "Neither" category between 2024 and 2025 should be treated as directional. Some portion may reflect reclassification rather than actual coverage gains. The direction of improvement is real; the magnitude is uncertain.
          </div>
          <div style={{ marginBottom: 'var(--space-lg)' }}>
            <div style={{ fontWeight: 500, color: 'var(--color-text)', marginBottom: '6px' }}>Industry Note</div>
            Industry designations are self-reported and not mutually exclusive. Industry-level analysis reflects CISOs who selected the named industry among their designations.
          </div>
          <div style={{ marginBottom: 'var(--space-lg)' }}>
            <div style={{ fontWeight: 500, color: 'var(--color-text)', marginBottom: '6px' }}>Compensation</div>
            All figures are self-reported. Equity values reflect estimated annual value. Sum of medians methodology is used for total compensation comparisons — this is not equivalent to median total compensation.
          </div>
          <div>
            <div style={{ fontWeight: 500, color: 'var(--color-text)', marginBottom: '6px' }}>Contact</div>
            research@hitchpartners.com
          </div>
        </div>
      )}
    </div>
  );
}

export default function Findings() {
  const activeSection = useActiveSection(NAV_ITEMS.map(n => n.id));

  return (
    <div style={{ background: 'var(--color-bg)', minHeight: '100vh' }}>
      {/* ── Sticky Nav ──────────────────────────────────────── */}
      <nav style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: 'var(--color-bg)',
        borderBottom: '1px solid var(--color-border)',
      }}>
        <div style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: '0 var(--space-lg)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '52px',
        }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
            <img
              src={hitchLogo}
              alt="Hitch Partners"
              style={{
                height: '22px',
                width: 'auto',
                mixBlendMode: 'multiply',
                opacity: 0.7,
              }}
            />
          </Link>

          <div style={{ display: 'flex', gap: 'var(--space-sm)', alignItems: 'center', overflow: 'hidden' }} className="findings-nav-items">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '11px',
                  fontWeight: 400,
                  color: activeSection === item.id ? 'var(--color-accent)' : 'var(--color-text-muted)',
                  padding: '4px 0',
                  borderBottom: activeSection === item.id ? '2px solid var(--color-accent)' : '2px solid transparent',
                  whiteSpace: 'nowrap',
                  transition: 'color 0.2s, border-color 0.2s',
                }}
              >
                {item.label}
              </a>
            ))}
          </div>

          <a
            href="#"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '11px',
              fontWeight: 400,
              color: 'var(--color-text-muted)',
              whiteSpace: 'nowrap',
              opacity: 0.6,
            }}
          >
            Download PDF
          </a>
        </div>
      </nav>

      {/* ── Page header ───────────────────────────────────────── */}
      <div style={{ background: 'var(--color-bg-dark)', padding: 'var(--space-2xl) var(--space-lg)' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ fontFamily: 'var(--font-data)', fontSize: 'var(--text-label)', color: 'var(--color-accent)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 'var(--space-md)' }}>
            Unprotected · Hitch Partners Research
          </div>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-h1)',
            fontWeight: 700,
            color: 'var(--color-text-inverse)',
            lineHeight: 1.15,
            marginBottom: 'var(--space-md)',
          }}>
            Full Analysis — 8 Findings
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-body)', fontWeight: 300, color: 'rgba(247,246,242,0.55)', lineHeight: 1.6, maxWidth: '600px' }}>
            Hitch Partners 2024–2025 CISO Compensation Survey · n=943 · North America
          </p>
        </div>
      </div>

      {/* ── Sections ──────────────────────────────────────────── */}
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 var(--space-lg)' }}>

        {/* Section 1 */}
        <SectionWrapper id="s1">
          <FadeInSection>
            <SectionHeader
              number="01"
              label="Scale"
              headlineStat="43.2%"
              headlineColor="var(--color-accent)"
              title="More than 4 in 10 CISOs are unprotected or uncertain of their own status."
            />
          </FadeInSection>
          <FadeInSection delay={0.1}>
            <ChartWrapper source="Hitch Partners 2024–2025 CISO Compensation Survey · n=943">
              <ProtectionStackBar />
            </ChartWrapper>
          </FadeInSection>
          <FadeInSection delay={0.15}>
            <BodyText>
              More than 4 in 10 CISOs are either unprotected or uncertain of their own status — making them functionally indistinguishable from a governance risk perspective. The 4.5% who do not know their coverage status cannot invoke protection they cannot confirm. In the post-SEC disclosure environment, that uncertainty is itself an exposure.
            </BodyText>
          </FadeInSection>
        </SectionWrapper>

        {/* Section 2 */}
        <SectionWrapper id="s2">
          <FadeInSection>
            <SectionHeader
              number="02"
              label="Governance Grade"
              headlineStat="3.4%"
              headlineColor="var(--color-accent)"
              title="Only 1 in 29 CISOs has comprehensive protection across all four governance dimensions."
            />
          </FadeInSection>
          <FadeInSection delay={0.08}>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-body)', fontWeight: 400, color: 'var(--color-text)', lineHeight: 1.7, marginBottom: 'var(--space-xl)', maxWidth: '680px' }}>
              The <strong>CISO Governance Grade</strong> is Hitch Partners' branded framework for evaluating the completeness of a CISO's legal and employment protection. Six mutually exclusive tiers, defined by the combination of D&O insurance, indemnification, pre-negotiated severance, and accelerated vesting.
            </p>
          </FadeInSection>
          <FadeInSection delay={0.12}>
            <ChartWrapper title="The CISO Governance Grade" source="Hitch Partners 2024–2025 CISO Compensation Survey · n=943">
              <TierStackVisualization />
            </ChartWrapper>
          </FadeInSection>
          <FadeInSection delay={0.15}>
            <ChartWrapper title="Four-Cohort Protection Ladder" source="n=865 across four cohorts">
              <CohortLadder />
            </ChartWrapper>
          </FadeInSection>
          <FadeInSection delay={0.18}>
            <Callout>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-h3)', fontWeight: 700, fontStyle: 'italic', color: 'var(--color-accent)', marginBottom: '8px' }}>
                0.7%
              </div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-body)', fontWeight: 400, color: 'var(--color-text)', lineHeight: 1.6 }}>
                of first-time CISOs at private companies hold Tier 1 protection. 52.8% have no protection of any kind. This is the fastest-growing segment of the CISO market.
              </div>
            </Callout>
          </FadeInSection>
        </SectionWrapper>

        {/* Section 3 */}
        <SectionWrapper id="s3">
          <FadeInSection>
            <SectionHeader
              number="03"
              label="The Title Gap"
              headlineStat="34.4%"
              headlineColor="var(--color-accent)"
              title="More than 1 in 3 CISOs leads the security function without the formal title — and pays a steep protection price for it."
            />
          </FadeInSection>
          <FadeInSection delay={0.08}>
            <BodyText style={{ marginBottom: 'var(--space-xl)' }}>
              The survey population was filtered to include only the top security leader at each organization — respondents who report to a CISO were explicitly excluded. Yet 34.4% of respondents (n=324) do not hold the formal CISO or CSO title. They carry the authority, the accountability, and the legal exposure of the role. The organizational recognition — and the executive-grade protections that follow it — does not.
            </BodyText>
          </FadeInSection>
          <FadeInSection delay={0.12}>
            <ChartWrapper title="Title recognition drives protection" source="Hitch Partners 2024–2025 CISO Compensation Survey · n=943">
              <TitleGapComparison />
            </ChartWrapper>
          </FadeInSection>
          <FadeInSection delay={0.15}>
            <Callout>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-body)', fontWeight: 400, color: 'var(--color-text)', lineHeight: 1.6 }}>
                "Head of Security" is the starkest finding in this category. 49 respondents hold this title as the top security leader at their organization. Only 8.2% have D&O coverage. 79.6% have neither D&O nor indemnification. Their legal exposure is identical to any other CISO. Their protection is not.
              </div>
            </Callout>
          </FadeInSection>
          <FadeInSection delay={0.2}>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-small)', fontWeight: 300, fontStyle: 'italic', color: 'var(--color-text-muted)', lineHeight: 1.6, marginTop: 'var(--space-lg)', maxWidth: '680px' }}>
              Methodology note: Non-CISO title is defined as respondents whose self-reported title does not contain "Chief Information Security Officer" or the abbreviations "CISO" or "CSO."  but who are the most senior security leader within the company.
            </p>
          </FadeInSection>
        </SectionWrapper>

        {/* Section 4 */}
        <SectionWrapper id="s4">
          <FadeInSection>
            <SectionHeader
              number="04"
              label="Governance Signal"
              headlineStat="2×"
              headlineColor="var(--color-text)"
              title="D&O-covered CISOs present to the board quarterly at twice the rate of unprotected peers."
            />
          </FadeInSection>
          <FadeInSection delay={0.08}>
            <ChartWrapper title="Protected CISOs present to boards twice as often" source="Hitch Partners 2024–2025 CISO Compensation Survey · n=882">
              <BoardAccessComparison />
            </ChartWrapper>
          </FadeInSection>
          <FadeInSection delay={0.12}>
            <BodyText style={{ marginBottom: 'var(--space-xl)' }}>
              D&O coverage and board access are not independent — they are downstream of the same organizational decision. Organizations that invest in security governance extend both legal protection and board visibility to the CISO. The inverse is equally true: 1 in 4 unprotected CISOs has no board access at all.
            </BodyText>
          </FadeInSection>
          <FadeInSection delay={0.15}>
            <ChartWrapper title="D&O coverage by reporting line" source="Hitch Partners 2024–2025 CISO Compensation Survey · n=865">
              <ReportingLineDotPlot />
            </ChartWrapper>
          </FadeInSection>
          <FadeInSection delay={0.18}>
            <Callout>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-body)', fontWeight: 400, color: 'var(--color-text)', lineHeight: 1.6 }}>
                CISOs reporting to a VP Engineering have a 64.5% no-board-access rate and 0% Tier 1 protection. When the CISO reports into engineering, the organization is structurally treating security as a technical function rather than a governance one.
              </div>
            </Callout>
          </FadeInSection>
          <FadeInSection delay={0.2}>
            <BodyText>
              Elevated CISO reporting declined from 37.4% in 2024 to 31.9% in 2025. CTO reporting rose from 20.0% to 24.1%. The CISO mandate is expanding while organizational positioning is declining.
            </BodyText>
          </FadeInSection>
        </SectionWrapper>

        {/* Section 5 */}
        <SectionWrapper id="s5">
          <FadeInSection>
            <SectionHeader
              number="05"
              label="Structural Drivers"
              headlineStat="2×"
              headlineColor="var(--color-accent)"
              title="Private company CISOs are twice as likely to have no protection as their public company peers."
            />
          </FadeInSection>
          <FadeInSection delay={0.08}>
            <ChartWrapper source="Hitch Partners 2024–2025 CISO Compensation Survey · n=869">
              <StructureSizeToggle />
            </ChartWrapper>
          </FadeInSection>
          <FadeInSection delay={0.12}>
            <BodyText>
              The public/private gap reflects structural differences, not governance choices. SEC cybersecurity disclosure rules apply only to public companies, creating a compliance-driven floor for D&O adoption. Private company D&O insurance architecture has historically been designed around the public company context. And shareholder litigation risk — which drives much of the demand for director and officer coverage — is largely absent at private companies. The result is a 18.7-point gap in "neither" rates that is structural before it is managerial.
            </BodyText>
          </FadeInSection>
        </SectionWrapper>

        {/* Section 6 */}
        <SectionWrapper id="s6">
          <FadeInSection>
            <SectionHeader
              number="06"
              label="Liability-Adjusted Compensation"
              title="The $241,424 compensation gap between protected and unprotected CISOs is only part of the story."
            />
          </FadeInSection>
          <FadeInSection delay={0.08}>
            <BodyText style={{ marginBottom: 'var(--space-xl)' }}>
              Liability-Adjusted Compensation (LAC) is the correct framework for evaluating CISO offers. A direct comparison of cash and equity between protected and unprotected CISOs understates the true gap — because it ignores the defined value of exit protections that Tier 1 CISOs hold, and the contingent personal liability that Tier 6 CISOs carry. The tool below shows where your offer stands relative to your peers. The contingent liability — for legal defense costs in a covered enforcement or litigation event — is disclosed separately, because it is real but cannot be precisely quantified from survey data alone.
            </BodyText>
          </FadeInSection>
          <FadeInSection delay={0.1}>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-small)', fontWeight: 300, fontStyle: 'italic', color: 'var(--color-text-muted)', marginBottom: 'var(--space-xl)', maxWidth: '680px' }}>
              The $241,424 compensation gap between D&O-covered and unprotected CISOs reflects organizational context, not negotiating failure. Here is where your offer stands relative to the market.
            </p>
          </FadeInSection>
          <FadeInSection delay={0.12}>
            <LACTool />
          </FadeInSection>
        </SectionWrapper>

        {/* Section 7 */}
        <SectionWrapper id="s7">
          <FadeInSection>
            <SectionHeader
              number="07"
              label="Trajectory"
              title="Protection rates are improving — but the fastest-growing CISO segment isn't participating."
            />
          </FadeInSection>
          <FadeInSection delay={0.08}>
            <ChartWrapper source="Hitch Partners 2024–2025 CISO Compensation Survey · 2024: n=436 · 2025: n=432">
              <YoYComparison />
            </ChartWrapper>
          </FadeInSection>
          <FadeInSection delay={0.12}>
            <BodyText>
              D&O coverage improved by 6.2 percentage points year-over-year — directionally real. But the full trifecta rate declined from 8.3% to 6.7%, suggesting organizations are extending basic D&O coverage without committing to comprehensive protection packages. Meanwhile, the fastest-growing CISO market segment — first-time appointments, rising from 25.7% to 29.9% of all CISOs in a single year — is the least protected cohort in the dataset. Aggregate improvement obscures a deteriorating margin.
            </BodyText>
          </FadeInSection>
        </SectionWrapper>

        {/* Section 8 */}
        <SectionWrapper id="s8">
          <FadeInSection>
            <SectionHeader
              number="08"
              label="Implications"
              title="What this means — for CISOs, boards, and the executives who structure these roles."
            />
          </FadeInSection>

          {[
            {
              audience: 'For CISOs',
              text: 'Know your tier. If you are among the 4.5% who do not know their coverage status, that is the first problem to solve — protection you cannot confirm is protection you cannot invoke. Pre-negotiating coverage is substantially easier before an incident than after, and substantially easier at hire than at any subsequent point. The Tier 1 benchmarks in this data represent what comprehensive protection looks like. Anything below Tier 3 leaves legal defense costs as a personal exposure.',
            },
            {
              audience: 'For Boards',
              text: 'D&O coverage of the CISO is a governance decision, not an HR one. The data shows that organizations where the CISO has no board access and no legal protection are making a structural statement about how seriously they treat security governance. That statement is now quantified and visible to the candidates you are trying to hire. The top 3.4% of the CISO market — Tier 1 talent — increasingly evaluate roles against this benchmark.',
            },
            {
              audience: 'For General Counsels and CHROs',
              text: 'The employment term structure for the CISO role has not kept pace with the legal environment the role operates in. The tier framework in this research provides a defensible benchmark for structuring CISO employment agreements. Indemnification and D&O coverage protect against different failure modes and both belong in a complete package. Pre-negotiating severance and accelerated vesting — present in only 17.5% and 16.4% of packages respectively — converts departure risk from a leverage-free negotiation into a defined obligation.',
            },
          ].map((item, i) => (
            <FadeInSection key={item.audience} delay={i * 0.1}>
              <div style={{ marginBottom: 'var(--space-xl)' }}>
                <div style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-small)',
                  fontWeight: 500,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'var(--color-text)',
                  marginBottom: 'var(--space-md)',
                }}>
                  {item.audience}
                </div>
                <BodyText>{item.text}</BodyText>
              </div>
            </FadeInSection>
          ))}

          {/* Hitch Partners close */}
          <FadeInSection delay={0.3}>
            <div style={{
              marginTop: 'var(--space-2xl)',
              paddingTop: 'var(--space-lg)',
              borderTop: '1px solid var(--color-border)',
            }}>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-body)',
                fontWeight: 300,
                fontStyle: 'italic',
                color: 'var(--color-text-muted)',
                lineHeight: 1.7,
                marginBottom: 'var(--space-md)',
                maxWidth: '680px',
              }}>
                Hitch Partners negotiates these terms on behalf of security leadership candidates and advises organizations on the governance structures that attract and retain Tier 1 talent. This research reflects what we see in the market every day.
              </p>
              <div style={{ display: 'flex', gap: 'var(--space-lg)' }}>
                <a href="mailto:research@hitchpartners.com" style={{ fontFamily: 'var(--font-data)', fontSize: 'var(--text-small)', color: 'var(--color-accent)' }}>
                  research@hitchpartners.com
                </a>
                <a href="https://hitchpartners.com" target="_blank" rel="noreferrer" style={{ fontFamily: 'var(--font-data)', fontSize: 'var(--text-small)', color: 'var(--color-text-muted)' }}>
                  hitchpartners.com
                </a>
              </div>
            </div>
          </FadeInSection>
        </SectionWrapper>

        {/* Methodology */}
        <MethodologyCollapsible />

        {/* Footer */}
        <footer style={{ padding: 'var(--space-2xl) 0 var(--space-3xl)', marginTop: 'var(--space-xl)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-md)' }}>
            <Link to="/" style={{ fontFamily: 'var(--font-data)', fontSize: 'var(--text-label)', color: 'var(--color-text-muted)', opacity: 0.6 }}>
              ← Landing Page
            </Link>
            <p style={{ fontFamily: 'var(--font-data)', fontSize: 'var(--text-label)', color: 'var(--color-text-muted)', opacity: 0.5 }}>
              © 2025 Hitch Partners · Unprotected: The CISO Liability Gap
            </p>
          </div>
        </footer>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .findings-nav-items { display: none !important; }
        }
      `}</style>
    </div>
  );
}
