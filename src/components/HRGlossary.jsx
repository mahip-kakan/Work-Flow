import React, { useState } from 'react';
import { Search, BookOpen, ChevronDown, ChevronRight, Info } from 'lucide-react';
import { hrGlossaryData } from '../data/glossaryHr';

const HRGlossary = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [expandedTerm, setExpandedTerm] = useState(null);

  const glossaryData = hrGlossaryData;

  const categories = Object.keys(glossaryData);

  const filteredData = categories.reduce((acc, category) => {
    const terms = glossaryData[category].filter(
      (item) =>
        item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.definition.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (terms.length > 0) {
      acc[category] = terms;
    }
    return acc;
  }, {});

  const toggleCategory = (category) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };

  const toggleTerm = (termId) => {
    setExpandedTerm(expandedTerm === termId ? null : termId);
  };

  return (
    <div className="healthcare-glossary">
      <div className="glossary-header">
        <div className="glossary-title-section">
          <BookOpen size={32} className="glossary-icon" />
          <div>
            <h1>HR Glossary</h1>
            <p>Practical definitions for HRBP, talent, and people ops workflows (educational only, not legal advice)</p>
          </div>
        </div>
      </div>

      <div className="glossary-search">
        <Search size={20} />
        <input
          type="text"
          placeholder="Search (e.g. requisition, HRIS, onboarding, HRBP)..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="glossary-content">
        {Object.keys(filteredData).length === 0 ? (
          <div className="glossary-empty">
            <Info size={48} />
            <p>No terms found matching &quot;{searchTerm}&quot;</p>
            <p className="empty-hint">Try: HRIS, ATS, requisition, provisioning</p>
          </div>
        ) : (
          Object.entries(filteredData).map(([category, terms]) => (
            <div key={category} className="glossary-category">
              <button type="button" className="category-header" onClick={() => toggleCategory(category)}>
                {expandedCategory === category ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                <h2>{category}</h2>
                <span className="term-count">{terms.length} terms</span>
              </button>

              {expandedCategory === category && (
                <div className="terms-list">
                  {terms.map((item, index) => {
                    const termId = `${category}-${index}`;
                    return (
                      <div key={termId} className="term-item">
                        <button type="button" className="term-header" onClick={() => toggleTerm(termId)}>
                          <div className="term-title-section">
                            <h3>{item.term}</h3>
                          </div>
                          {expandedTerm === termId ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                        </button>

                        {expandedTerm === termId && (
                          <div className="term-details">
                            <div className="term-definition">
                              <strong>Definition:</strong>
                              <p>{item.definition}</p>
                            </div>
                            {item.example && (
                              <div className="term-example">
                                <strong>Example:</strong>
                                <p>{item.example}</p>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ))
        )}
      </div>

      <div className="glossary-footer">
        <div className="footer-info">
          <Info size={16} />
          <p>
            <strong>Tip:</strong> Use this glossary alongside HR automations in Workflow Studio. For legal or regulatory
            decisions, consult qualified counsel and your internal policies.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HRGlossary;
