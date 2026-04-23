import React from 'react';
import { BookOpen, Info } from 'lucide-react';

const terms = [
  {
    term: 'Campaign automation',
    definition:
      'Workflows that react to campaign dates, spend caps, or channel signals—debriefs, pacing alerts, and wrap reports.',
  },
  {
    term: 'Content repurposing',
    definition:
      'Taking one canonical asset (blog, webinar, guide) and generating channel-specific variants with consistent messaging.',
  },
  {
    term: 'Brand voice / brand skill',
    definition:
      'Guidelines, examples, and guardrails (often packaged as a skill or prompt pack) so generated copy stays on-brand.',
  },
  {
    term: 'Experiment readout',
    definition:
      'Structured summary of A/B or multivariate tests: metrics, segments, guardrails, and a recommended next action.',
  },
];

const MarketingGlossary = () => (
  <div className="healthcare-glossary">
    <div className="glossary-header">
      <div className="glossary-title-section">
        <BookOpen size={32} className="glossary-icon" />
        <div>
          <h1>Marketing glossary</h1>
          <p>Terms used in the Marketing workspace (separate from healthcare and HR).</p>
        </div>
      </div>
    </div>

    <div className="glossary-content">
      <div className="glossary-category">
        <div className="terms-list">
          {terms.map((row) => (
            <div key={row.term} className="term-item">
              <div className="term-details" style={{ padding: '16px 20px' }}>
                <div className="term-definition">
                  <h3 style={{ margin: '0 0 8px', fontSize: '16px' }}>{row.term}</h3>
                  <p style={{ margin: 0 }}>{row.definition}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

    <div className="glossary-footer">
      <div className="footer-info">
        <Info size={16} />
        <p>
          <strong>Tip:</strong> Switch workspace with Healthcare, HR, or Marketing in the header to see the matching home,
          discover, and glossary content.
        </p>
      </div>
    </div>
  </div>
);

export default MarketingGlossary;
