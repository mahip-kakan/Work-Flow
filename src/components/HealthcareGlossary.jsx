import React, { useState } from 'react';
import { Search, BookOpen, ChevronDown, ChevronRight, Info } from 'lucide-react';

const HealthcareGlossary = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [expandedTerm, setExpandedTerm] = useState(null);

  const glossaryData = {
    'Insurance & Coverage': [
      {
        term: 'Health Insurance',
        definition: 'A contract between you and an insurance company that helps pay for medical expenses. In the US, most people get health insurance through their employer, government programs (like Medicare/Medicaid), or private plans.',
        example: 'If you have health insurance, the insurance company pays part of your medical bills, and you pay the rest (called copay or deductible).'
      },
      {
        term: 'Premium',
        definition: 'The monthly or yearly amount you pay to keep your health insurance active, regardless of whether you use medical services.',
        example: 'Like paying a monthly subscription fee - you pay it even if you don\'t go to the doctor that month.'
      },
      {
        term: 'Deductible',
        definition: 'The amount you must pay out of your own pocket for medical services before your insurance starts paying. This resets every year.',
        example: 'If your deductible is $1,000, you pay the first $1,000 of medical costs yourself, then insurance helps pay the rest.'
      },
      {
        term: 'Copay (Copayment)',
        definition: 'A fixed amount you pay for a specific medical service or prescription, usually paid at the time of service.',
        example: 'You might pay $20 every time you visit a doctor, regardless of what the visit actually costs.'
      },
      {
        term: 'Coinsurance',
        definition: 'Your share of the cost of a medical service, usually a percentage (like 20%) after you\'ve met your deductible.',
        example: 'If a procedure costs $1,000 and your coinsurance is 20%, you pay $200 and insurance pays $800.'
      },
      {
        term: 'Out-of-Pocket Maximum',
        definition: 'The maximum amount you\'ll have to pay for covered medical services in a year. After this, insurance pays 100%.',
        example: 'If your out-of-pocket max is $5,000, once you\'ve paid that much, insurance covers everything else for the year.'
      },
      {
        term: 'HMO (Health Maintenance Organization)',
        definition: 'A type of insurance plan where you must use doctors and hospitals within a specific network. You need a referral from your primary care doctor to see specialists.',
        example: 'Like having a specific group of doctors you can visit - cheaper but less flexibility.'
      },
      {
        term: 'PPO (Preferred Provider Organization)',
        definition: 'A type of insurance plan that lets you see any doctor, but you pay less if you use doctors in their network. No referrals needed.',
        example: 'More flexible - you can see any doctor, but it costs more if you go outside their preferred network.'
      },
      {
        term: 'Medicare',
        definition: 'A federal health insurance program for people 65 and older, and some younger people with disabilities.',
        example: 'Government-provided health insurance for seniors (65+) in the US.'
      },
      {
        term: 'Medicaid',
        definition: 'A joint federal and state program that provides health coverage to people with low income.',
        example: 'Government health insurance for people who can\'t afford private insurance.'
      }
    ],
    'Healthcare Providers & Facilities': [
      {
        term: 'Primary Care Physician (PCP)',
        definition: 'Your main doctor who provides general healthcare, annual checkups, and refers you to specialists when needed.',
        example: 'Like a family doctor in India - your first point of contact for health issues.'
      },
      {
        term: 'Specialist',
        definition: 'A doctor who focuses on a specific area of medicine, like cardiology (heart), dermatology (skin), or orthopedics (bones).',
        example: 'A doctor who is an expert in one particular area of medicine.'
      },
      {
        term: 'Urgent Care',
        definition: 'A walk-in clinic for medical issues that need immediate attention but aren\'t life-threatening emergencies.',
        example: 'For things like minor injuries, fevers, or infections that need quick treatment but don\'t require the ER.'
      },
      {
        term: 'Emergency Room (ER)',
        definition: 'Hospital department for life-threatening emergencies. Very expensive - only for serious conditions.',
        example: 'For critical situations like heart attacks, severe injuries, or difficulty breathing.'
      },
      {
        term: 'Inpatient',
        definition: 'When you stay overnight in a hospital for treatment.',
        example: 'Admitted to the hospital and staying there for treatment.'
      },
      {
        term: 'Outpatient',
        definition: 'Medical care where you don\'t stay overnight - you come in, get treatment, and leave the same day.',
        example: 'Like a doctor\'s visit, surgery, or procedure where you go home the same day.'
      },
      {
        term: 'Hospitalist',
        definition: 'A doctor who only treats patients while they\'re in the hospital, coordinating their care.',
        example: 'A doctor who specializes in managing your care during a hospital stay.'
      }
    ],
    'Medical Terms & Procedures': [
      {
        term: 'ADT (Admit, Discharge, Transfer)',
        definition: 'Hospital events that track when a patient is admitted, discharged, or transferred between departments or facilities.',
        example: 'System messages that notify when a patient enters or leaves the hospital.'
      },
      {
        term: 'EHR (Electronic Health Record)',
        definition: 'Digital version of a patient\'s medical history, maintained by healthcare providers.',
        example: 'Like a digital medical file that contains all your health information.'
      },
      {
        term: 'FHIR (Fast Healthcare Interoperability Resources)',
        definition: 'A standard format for exchanging healthcare information electronically between different systems.',
        example: 'A common language that allows different healthcare systems to share patient data.'
      },
      {
        term: 'Care Plan',
        definition: 'A detailed plan outlining a patient\'s medical needs, treatments, medications, and follow-up care.',
        example: 'A roadmap for a patient\'s treatment and recovery, created by healthcare providers.'
      },
      {
        term: 'Medication Reconciliation',
        definition: 'The process of comparing a patient\'s current medications with new prescriptions to avoid errors and interactions.',
        example: 'Making sure all your medications work together safely and nothing conflicts.'
      },
      {
        term: 'Readmission',
        definition: 'When a patient returns to the hospital within a certain period (usually 30 days) after being discharged.',
        example: 'Being admitted to the hospital again shortly after leaving, often indicating the initial treatment wasn\'t fully successful.'
      },
      {
        term: 'HEDIS (Healthcare Effectiveness Data and Information Set)',
        definition: 'Quality measures used to assess the performance of health plans and providers.',
        example: 'Standards that measure how well healthcare providers are doing their job.'
      },
      {
        term: 'Care Gap',
        definition: 'When a patient is missing recommended preventive care or screenings based on their age, gender, or health conditions.',
        example: 'For example, if a diabetic patient hasn\'t had their annual eye exam, that\'s a care gap.'
      },
      {
        term: 'Prior Authorization',
        definition: 'Approval from your insurance company before you can receive certain medical services or medications.',
        example: 'Getting permission from insurance before a procedure - they decide if they\'ll pay for it.'
      },
      {
        term: 'SDOH (Social Determinants of Health)',
        definition: 'Non-medical factors that affect health, like housing, food security, transportation, and education.',
        example: 'Things outside the hospital that impact your health - like having a safe place to live or access to healthy food.'
      }
    ],
    'Billing & Claims': [
      {
        term: 'Medical Bill',
        definition: 'A statement showing what you owe for medical services. Can be very expensive in the US.',
        example: 'The invoice you receive after getting medical treatment, showing all charges.'
      },
      {
        term: 'Claim',
        definition: 'A request sent to your insurance company to pay for medical services you received.',
        example: 'Your doctor sends a bill to your insurance company asking them to pay for your visit.'
      },
      {
        term: 'Explanation of Benefits (EOB)',
        definition: 'A statement from your insurance showing what they paid, what you owe, and why.',
        example: 'A breakdown showing how your medical bill was processed and what you need to pay.'
      },
      {
        term: 'Denial',
        definition: 'When your insurance refuses to pay for a medical service or procedure.',
        example: 'Insurance saying "we won\'t cover this" - you can appeal this decision.'
      },
      {
        term: 'Appeal',
        definition: 'The process of asking your insurance to reconsider a denial or decision.',
        example: 'Challenging an insurance decision you disagree with.'
      },
      {
        term: 'In-Network',
        definition: 'Doctors, hospitals, or providers that have an agreement with your insurance company.',
        example: 'Providers that work with your insurance - usually cheaper for you.'
      },
      {
        term: 'Out-of-Network',
        definition: 'Providers that don\'t have an agreement with your insurance - costs more or may not be covered.',
        example: 'Doctors not in your insurance network - you\'ll pay more, sometimes the full cost.'
      }
    ],
    'Population Health & Care Management': [
      {
        term: 'Population Health',
        definition: 'The health outcomes of a group of people, and the distribution of those outcomes within the group.',
        example: 'Looking at the overall health of a community or patient group, not just individuals.'
      },
      {
        term: 'Care Coordinator',
        definition: 'A healthcare professional who helps manage and coordinate a patient\'s care across different providers.',
        example: 'Someone who helps you navigate the healthcare system and ensures you get the right care.'
      },
      {
        term: 'Case Manager',
        definition: 'A healthcare professional who manages complex cases, especially for patients with chronic conditions.',
        example: 'A coordinator who helps manage care for patients with ongoing health issues.'
      },
      {
        term: 'Risk Stratification',
        definition: 'The process of categorizing patients based on their risk of poor health outcomes or high healthcare costs.',
        example: 'Identifying which patients are most likely to need intensive care or have complications.'
      },
      {
        term: 'Value-Based Care (VBC)',
        definition: 'A healthcare model that rewards providers for quality of care and patient outcomes, not just number of services.',
        example: 'Paying doctors based on how well they treat patients, not just how many patients they see.'
      },
      {
        term: 'ACO (Accountable Care Organization)',
        definition: 'Groups of doctors, hospitals, and other healthcare providers who work together to give coordinated care.',
        example: 'A network of healthcare providers working together to improve care quality and reduce costs.'
      },
      {
        term: 'Chronic Disease Management',
        definition: 'Ongoing care and support for long-term health conditions like diabetes, heart disease, or asthma.',
        example: 'Long-term care plan for conditions that don\'t go away, like managing diabetes over many years.'
      }
    ],
    'Technology & Systems': [
      {
        term: 'Patient Portal',
        definition: 'A secure online website that gives you access to your health information and lets you communicate with your doctor.',
        example: 'Like a personal health account online where you can see test results, schedule appointments, and message your doctor.'
      },
      {
        term: 'Telehealth / Telemedicine',
        definition: 'Medical care provided remotely through video calls, phone calls, or messaging.',
        example: 'Seeing a doctor through a video call instead of going to their office - very common now.'
      },
      {
        term: 'Epic / Cerner',
        definition: 'Major EHR (Electronic Health Record) systems used by many US hospitals and clinics.',
        example: 'The software systems that hospitals use to store and manage patient medical records.'
      },
      {
        term: 'MyChart',
        definition: 'Epic\'s patient portal system that lets patients access their medical records online.',
        example: 'A popular patient portal app where you can see your test results, appointments, and medical history.'
      }
    ],
    'Gravity Platform & Tools': [
      {
        term: 'Gravity AI Studio',
        definition: 'A low-code studio to build, deploy, and scale healthcare-specific AI agents and workflows. Part of the Gravity platform that lets you create automation without heavy technical lift.',
        example: 'Use AI Studio to create agents like "Post-Discharge Follow-Up" that automatically notify care teams when patients are discharged.'
      },
      {
        term: 'Gravity Developer Studio',
        definition: 'A platform to design, test, and launch production-ready healthcare applications. Provides tools for developers to build custom solutions on the Gravity platform.',
        example: 'Developers use Developer Studio to create custom healthcare apps that integrate with EHR systems and other data sources.'
      },
      {
        term: 'Gravity Data and Analytics Studio',
        definition: 'A platform to manage, analyze, and govern healthcare data with ease. Coming soon - will provide self-serve analytics capabilities.',
        example: 'Analysts will use this to explore healthcare data, create reports, and generate insights without needing deep technical skills.'
      },
      {
        term: 'HMCP (Healthcare Model Context Protocol)',
        definition: 'Innovaccer\'s open standard for connecting AI agents, tools, and healthcare data sources so they can exchange context securely and compliantly. It extends the Model Context Protocol (MCP) with healthcare-specific controls—policy-driven access, auditability, encryption, and safeguards around PHI—so multiple agents can coordinate clinical workflows without unsafe silos or one-off integrations.',
        example: 'A care-gap agent and an outreach agent working the same patient can use HMCP for governed handoffs: they share the right clinical context through interoperable agent communication instead of duplicating queries or missing important information.'
      },
      {
        term: 'MCP (Model Context Protocol)',
        definition: 'An open standard for how applications expose context, data, and tools to large language models, so assistants can retrieve information and take actions in a consistent, structured way. Innovaccer\'s HMCP (Healthcare Model Context Protocol) adapts this pattern for regulated healthcare—multi-agent coordination on Gravity and AI Studio with compliance-minded guardrails.',
        example: 'Like a common plug pattern between an AI assistant and back-end systems; HMCP is the healthcare-specialized version for clinical and operational agents.'
      },
      {
        term: 'Data Activation Platform (DAP)',
        definition: 'The foundation of Innovaccer\'s Healthcare Intelligence Cloud. It unifies and activates healthcare data by integrating data from various sources, normalizing it using a Unified Data Model, and providing AI-powered insights.',
        example: 'DAP takes data from your EHR, billing systems, and other sources, combines it into one unified view, and makes it ready for AI and analytics.'
      },
      {
        term: 'Gravity Shield',
        definition: 'Enterprise-grade security and compliance built specifically for healthcare. Includes role-based access controls, end-to-end encryption, and comprehensive audit trails. Purpose-built for healthcare, secure by design.',
        example: 'Gravity Shield ensures patient data is protected with HIPAA compliance, encryption, and strict access controls so only authorized people can see sensitive information.'
      },
      {
        term: 'Gravity Search',
        definition: 'A tool that turns healthcare data into real-time insights through natural language search. Allows you to query healthcare data using plain English instead of complex SQL.',
        example: 'Instead of writing SQL queries, you can ask "Show me all diabetic patients who haven\'t had their annual eye exam" and get instant results.'
      },
      {
        term: 'Unified Data Model',
        definition: 'A standardized data schema that normalizes healthcare data from different sources (EHRs, billing systems, etc.) into a common format. This eliminates data silos and creates a single source of truth.',
        example: 'Whether data comes from Epic, Cerner, or another system, the Unified Data Model converts it all to the same format so you can analyze it together.'
      },
      {
        term: 'KLAS',
        definition: 'An independent research firm that evaluates and ranks healthcare technology vendors. "Best in KLAS" is a prestigious award recognizing top-performing healthcare technology solutions.',
        example: 'Gravity received "Best in KLAS 2026 Data and Analytics for Provider" - meaning healthcare providers rated it as the best data and analytics platform.'
      },
      {
        term: 'Innovaccer',
        definition: 'The company behind the Gravity platform. Innovaccer provides the Healthcare Intelligence Cloud that powers Gravity AI Studio, Developer Studio, and other healthcare technology solutions.',
        example: 'Innovaccer is the technology company that built Gravity - the platform you\'re using to create healthcare automation agents.'
      },
      {
        term: 'FHIR Resources',
        definition: 'Standardized data formats defined by FHIR (Fast Healthcare Interoperability Resources) for exchanging healthcare information. Gravity provides 100+ FHIR resources for seamless data access.',
        example: 'FHIR resources are like standardized containers for healthcare data - a "Patient" resource, "Encounter" resource, "Medication" resource, etc. Gravity supports 100+ of these.'
      },
      {
        term: 'Gravity Studios',
        definition: 'A collection of low-code platforms including AI Studio, Developer Studio, and Data and Analytics Studio. These studios provide point-and-click experiences for building healthcare solutions.',
        example: 'Gravity Studios are the tools you use to build healthcare automation - like the AI Studio where you create agents and workflows.'
      }
    ]
  };

  const categories = Object.keys(glossaryData);

  const filteredData = categories.reduce((acc, category) => {
    const terms = glossaryData[category].filter(item =>
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
            <h1>US Healthcare Glossary</h1>
            <p>A simple guide to US healthcare terms for newcomers</p>
          </div>
        </div>
      </div>

      <div className="glossary-search">
        <Search size={20} />
        <input
          type="text"
          placeholder="Search for terms (e.g., deductible, HMO, copay)..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="glossary-content">
        {Object.keys(filteredData).length === 0 ? (
          <div className="glossary-empty">
            <Info size={48} />
            <p>No terms found matching "{searchTerm}"</p>
            <p className="empty-hint">Try searching for: insurance, doctor, hospital, or billing</p>
          </div>
        ) : (
          Object.entries(filteredData).map(([category, terms]) => (
            <div key={category} className="glossary-category">
              <button
                className="category-header"
                onClick={() => toggleCategory(category)}
              >
                {expandedCategory === category ? (
                  <ChevronDown size={20} />
                ) : (
                  <ChevronRight size={20} />
                )}
                <h2>{category}</h2>
                <span className="term-count">{terms.length} terms</span>
              </button>

              {expandedCategory === category && (
                <div className="terms-list">
                  {terms.map((item, index) => {
                    const termId = `${category}-${index}`;
                    return (
                      <div key={termId} className="term-item">
                        <button
                          className="term-header"
                          onClick={() => toggleTerm(termId)}
                        >
                          <div className="term-title-section">
                            <h3>{item.term}</h3>
                          </div>
                          {expandedTerm === termId ? (
                            <ChevronDown size={18} />
                          ) : (
                            <ChevronRight size={18} />
                          )}
                        </button>

                        {expandedTerm === termId && (
                          <div className="term-details">
                            <div className="term-definition">
                              <strong>Definition:</strong>
                              <p>{item.definition}</p>
                            </div>
                            {item.example && (
                              <div className="term-example">
                                <strong>Simple Example:</strong>
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
            <strong>Tip:</strong> This glossary explains US healthcare terms in simple language. 
            If you're new to US healthcare, start with "Insurance & Coverage" and "Healthcare Providers & Facilities" categories.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HealthcareGlossary;
