import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X, Bot, User, Sparkles, Loader } from 'lucide-react';

const AIChatPanel = ({ onClose, onCreateFlow, onSelectTemplate }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: "Hi! I'm your AI assistant for Gravity Flow Studio. I can help you:\n• Create healthcare automation agents\n• Explain US healthcare terms\n• Explain Gravity platform features\n\nWhat would you like to do?",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Glossary data
  const glossaryData = {
    'Insurance & Coverage': [
      { term: 'Health Insurance', definition: 'A contract between you and an insurance company that helps pay for medical expenses. In the US, most people get health insurance through their employer, government programs (like Medicare/Medicaid), or private plans.', example: 'If you have health insurance, the insurance company pays part of your medical bills, and you pay the rest (called copay or deductible).' },
      { term: 'Premium', definition: 'The monthly or yearly amount you pay to keep your health insurance active, regardless of whether you use medical services.', example: 'Like paying a monthly subscription fee - you pay it even if you don\'t go to the doctor that month.' },
      { term: 'Deductible', definition: 'The amount you must pay out of your own pocket for medical services before your insurance starts paying. This resets every year.', example: 'If your deductible is $1,000, you pay the first $1,000 of medical costs yourself, then insurance helps pay the rest.' },
      { term: 'Copay (Copayment)', definition: 'A fixed amount you pay for a specific medical service or prescription, usually paid at the time of service.', example: 'You might pay $20 every time you visit a doctor, regardless of what the visit actually costs.' },
      { term: 'Coinsurance', definition: 'Your share of the cost of a medical service, usually a percentage (like 20%) after you\'ve met your deductible.', example: 'If a procedure costs $1,000 and your coinsurance is 20%, you pay $200 and insurance pays $800.' },
      { term: 'Out-of-Pocket Maximum', definition: 'The maximum amount you\'ll have to pay for covered medical services in a year. After this, insurance pays 100%.', example: 'If your out-of-pocket max is $5,000, once you\'ve paid that much, insurance covers everything else for the year.' },
      { term: 'HMO (Health Maintenance Organization)', definition: 'A type of insurance plan where you must use doctors and hospitals within a specific network. You need a referral from your primary care doctor to see specialists.', example: 'Like having a specific group of doctors you can visit - cheaper but less flexibility.' },
      { term: 'PPO (Preferred Provider Organization)', definition: 'A type of insurance plan that lets you see any doctor, but you pay less if you use doctors in their network. No referrals needed.', example: 'More flexible - you can see any doctor, but it costs more if you go outside their preferred network.' },
      { term: 'Medicare', definition: 'A federal health insurance program for people 65 and older, and some younger people with disabilities.', example: 'Government-provided health insurance for seniors (65+) in the US.' },
      { term: 'Medicaid', definition: 'A joint federal and state program that provides health coverage to people with low income.', example: 'Government health insurance for people who can\'t afford private insurance.' }
    ],
    'Healthcare Providers & Facilities': [
      { term: 'Primary Care Physician (PCP)', definition: 'Your main doctor who provides general healthcare, annual checkups, and refers you to specialists when needed.', example: 'Like a family doctor in India - your first point of contact for health issues.' },
      { term: 'Specialist', definition: 'A doctor who focuses on a specific area of medicine, like cardiology (heart), dermatology (skin), or orthopedics (bones).', example: 'A doctor who is an expert in one particular area of medicine.' },
      { term: 'Urgent Care', definition: 'A walk-in clinic for medical issues that need immediate attention but aren\'t life-threatening emergencies.', example: 'For things like minor injuries, fevers, or infections that need quick treatment but don\'t require the ER.' },
      { term: 'Emergency Room (ER)', definition: 'Hospital department for life-threatening emergencies. Very expensive - only for serious conditions.', example: 'For critical situations like heart attacks, severe injuries, or difficulty breathing.' },
      { term: 'Inpatient', definition: 'When you stay overnight in a hospital for treatment.', example: 'Admitted to the hospital and staying there for treatment.' },
      { term: 'Outpatient', definition: 'Medical care where you don\'t stay overnight - you come in, get treatment, and leave the same day.', example: 'Like a doctor\'s visit, surgery, or procedure where you go home the same day.' },
      { term: 'Hospitalist', definition: 'A doctor who only treats patients while they\'re in the hospital, coordinating their care.', example: 'A doctor who specializes in managing your care during a hospital stay.' }
    ],
    'Medical Terms & Procedures': [
      { term: 'ADT (Admit, Discharge, Transfer)', definition: 'Hospital events that track when a patient is admitted, discharged, or transferred between departments or facilities.', example: 'System messages that notify when a patient enters or leaves the hospital.' },
      { term: 'EHR (Electronic Health Record)', definition: 'Digital version of a patient\'s medical history, maintained by healthcare providers.', example: 'Like a digital medical file that contains all your health information.' },
      { term: 'FHIR (Fast Healthcare Interoperability Resources)', definition: 'A standard format for exchanging healthcare information electronically between different systems.', example: 'A common language that allows different healthcare systems to share patient data.' },
      { term: 'Care Plan', definition: 'A detailed plan outlining a patient\'s medical needs, treatments, medications, and follow-up care.', example: 'A roadmap for a patient\'s treatment and recovery, created by healthcare providers.' },
      { term: 'Medication Reconciliation', definition: 'The process of comparing a patient\'s current medications with new prescriptions to avoid errors and interactions.', example: 'Making sure all your medications work together safely and nothing conflicts.' },
      { term: 'Readmission', definition: 'When a patient returns to the hospital within a certain period (usually 30 days) after being discharged.', example: 'Being admitted to the hospital again shortly after leaving, often indicating the initial treatment wasn\'t fully successful.' },
      { term: 'HEDIS (Healthcare Effectiveness Data and Information Set)', definition: 'Quality measures used to assess the performance of health plans and providers.', example: 'Standards that measure how well healthcare providers are doing their job.' },
      { term: 'Care Gap', definition: 'When a patient is missing recommended preventive care or screenings based on their age, gender, or health conditions.', example: 'For example, if a diabetic patient hasn\'t had their annual eye exam, that\'s a care gap.' },
      { term: 'Prior Authorization', definition: 'Approval from your insurance company before you can receive certain medical services or medications.', example: 'Getting permission from insurance before a procedure - they decide if they\'ll pay for it.' },
      { term: 'SDOH (Social Determinants of Health)', definition: 'Non-medical factors that affect health, like housing, food security, transportation, and education.', example: 'Things outside the hospital that impact your health - like having a safe place to live or access to healthy food.' }
    ],
    'Billing & Claims': [
      { term: 'Medical Bill', definition: 'A statement showing what you owe for medical services. Can be very expensive in the US.', example: 'The invoice you receive after getting medical treatment, showing all charges.' },
      { term: 'Claim', definition: 'A request sent to your insurance company to pay for medical services you received.', example: 'Your doctor sends a bill to your insurance company asking them to pay for your visit.' },
      { term: 'Explanation of Benefits (EOB)', definition: 'A statement from your insurance showing what they paid, what you owe, and why.', example: 'A breakdown showing how your medical bill was processed and what you need to pay.' },
      { term: 'Denial', definition: 'When your insurance refuses to pay for a medical service or procedure.', example: 'Insurance saying "we won\'t cover this" - you can appeal this decision.' },
      { term: 'Appeal', definition: 'The process of asking your insurance to reconsider a denial or decision.', example: 'Challenging an insurance decision you disagree with.' },
      { term: 'In-Network', definition: 'Doctors, hospitals, or providers that have an agreement with your insurance company.', example: 'Providers that work with your insurance - usually cheaper for you.' },
      { term: 'Out-of-Network', definition: 'Providers that don\'t have an agreement with your insurance - costs more or may not be covered.', example: 'Doctors not in your insurance network - you\'ll pay more, sometimes the full cost.' }
    ],
    'Population Health & Care Management': [
      { term: 'Population Health', definition: 'The health outcomes of a group of people, and the distribution of those outcomes within the group.', example: 'Looking at the overall health of a community or patient group, not just individuals.' },
      { term: 'Care Coordinator', definition: 'A healthcare professional who helps manage and coordinate a patient\'s care across different providers.', example: 'Someone who helps you navigate the healthcare system and ensures you get the right care.' },
      { term: 'Case Manager', definition: 'A healthcare professional who manages complex cases, especially for patients with chronic conditions.', example: 'A coordinator who helps manage care for patients with ongoing health issues.' },
      { term: 'Risk Stratification', definition: 'The process of categorizing patients based on their risk of poor health outcomes or high healthcare costs.', example: 'Identifying which patients are most likely to need intensive care or have complications.' },
      { term: 'Value-Based Care (VBC)', definition: 'A healthcare model that rewards providers for quality of care and patient outcomes, not just number of services.', example: 'Paying doctors based on how well they treat patients, not just how many patients they see.' },
      { term: 'ACO (Accountable Care Organization)', definition: 'Groups of doctors, hospitals, and other healthcare providers who work together to give coordinated care.', example: 'A network of healthcare providers working together to improve care quality and reduce costs.' },
      { term: 'Chronic Disease Management', definition: 'Ongoing care and support for long-term health conditions like diabetes, heart disease, or asthma.', example: 'Long-term care plan for conditions that don\'t go away, like managing diabetes over many years.' }
    ],
    'Technology & Systems': [
      { term: 'Patient Portal', definition: 'A secure online website that gives you access to your health information and lets you communicate with your doctor.', example: 'Like a personal health account online where you can see test results, schedule appointments, and message your doctor.' },
      { term: 'Telehealth / Telemedicine', definition: 'Medical care provided remotely through video calls, phone calls, or messaging.', example: 'Seeing a doctor through a video call instead of going to their office - very common now.' },
      { term: 'Epic / Cerner', definition: 'Major EHR (Electronic Health Record) systems used by many US hospitals and clinics.', example: 'The software systems that hospitals use to store and manage patient medical records.' },
      { term: 'MyChart', definition: 'Epic\'s patient portal system that lets patients access their medical records online.', example: 'A popular patient portal app where you can see your test results, appointments, and medical history.' }
    ],
    'Gravity Platform & Tools': [
      { term: 'Gravity AI Studio', definition: 'A low-code studio to build, deploy, and scale healthcare-specific AI agents and workflows. Part of the Gravity platform that lets you create automation without heavy technical lift.', example: 'Use AI Studio to create agents like "Post-Discharge Follow-Up" that automatically notify care teams when patients are discharged.' },
      { term: 'Gravity Developer Studio', definition: 'A platform to design, test, and launch production-ready healthcare applications. Provides tools for developers to build custom solutions on the Gravity platform.', example: 'Developers use Developer Studio to create custom healthcare apps that integrate with EHR systems and other data sources.' },
      { term: 'Gravity Data and Analytics Studio', definition: 'A platform to manage, analyze, and govern healthcare data with ease. Coming soon - will provide self-serve analytics capabilities.', example: 'Analysts will use this to explore healthcare data, create reports, and generate insights without needing deep technical skills.' },
      { term: 'HMCP (Multi-Agent Coordination Protocol)', definition: 'A protocol that lets AI agents share memory, tasks, and governance while maintaining clinical context. Eliminates AI silos by allowing agents to work together and share information.', example: 'When a discharge agent and a readmission risk agent both work on the same patient, HMCP lets them share context so they don\'t duplicate work or miss important information.' },
      { term: 'Data Activation Platform (DAP)', definition: 'The foundation of Innovaccer\'s Healthcare Intelligence Cloud. It unifies and activates healthcare data by integrating data from various sources, normalizing it using a Unified Data Model, and providing AI-powered insights.', example: 'DAP takes data from your EHR, billing systems, and other sources, combines it into one unified view, and makes it ready for AI and analytics.' },
      { term: 'Gravity Shield', definition: 'Enterprise-grade security and compliance built specifically for healthcare. Includes role-based access controls, end-to-end encryption, and comprehensive audit trails. Purpose-built for healthcare, secure by design.', example: 'Gravity Shield ensures patient data is protected with HIPAA compliance, encryption, and strict access controls so only authorized people can see sensitive information.' },
      { term: 'Gravity Search', definition: 'A tool that turns healthcare data into real-time insights through natural language search. Allows you to query healthcare data using plain English instead of complex SQL.', example: 'Instead of writing SQL queries, you can ask "Show me all diabetic patients who haven\'t had their annual eye exam" and get instant results.' },
      { term: 'Unified Data Model', definition: 'A standardized data schema that normalizes healthcare data from different sources (EHRs, billing systems, etc.) into a common format. This eliminates data silos and creates a single source of truth.', example: 'Whether data comes from Epic, Cerner, or another system, the Unified Data Model converts it all to the same format so you can analyze it together.' },
      { term: 'KLAS', definition: 'An independent research firm that evaluates and ranks healthcare technology vendors. "Best in KLAS" is a prestigious award recognizing top-performing healthcare technology solutions.', example: 'Gravity received "Best in KLAS 2026 Data and Analytics for Provider" - meaning healthcare providers rated it as the best data and analytics platform.' },
      { term: 'Innovaccer', definition: 'The company behind the Gravity platform. Innovaccer provides the Healthcare Intelligence Cloud that powers Gravity AI Studio, Developer Studio, and other healthcare technology solutions.', example: 'Innovaccer is the technology company that built Gravity - the platform you\'re using to create healthcare automation agents.' },
      { term: 'FHIR Resources', definition: 'Standardized data formats defined by FHIR (Fast Healthcare Interoperability Resources) for exchanging healthcare information. Gravity provides 100+ FHIR resources for seamless data access.', example: 'FHIR resources are like standardized containers for healthcare data - a "Patient" resource, "Encounter" resource, "Medication" resource, etc. Gravity supports 100+ of these.' },
      { term: 'Gravity Studios', definition: 'A collection of low-code platforms including AI Studio, Developer Studio, and Data and Analytics Studio. These studios provide point-and-click experiences for building healthcare solutions.', example: 'Gravity Studios are the tools you use to build healthcare automation - like the AI Studio where you create agents and workflows.' }
    ]
  };

  // Flatten glossary for easy search
  const allGlossaryTerms = Object.values(glossaryData).flat();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Find glossary term
  const findGlossaryTerm = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Check for question patterns
    const questionPatterns = [
      /what is (.+)/i,
      /what's (.+)/i,
      /explain (.+)/i,
      /tell me about (.+)/i,
      /what does (.+) mean/i,
      /define (.+)/i,
      /(.+) meaning/i,
      /(.+) definition/i
    ];

    let searchTerm = '';
    for (const pattern of questionPatterns) {
      const match = userMessage.match(pattern);
      if (match) {
        searchTerm = match[1].trim();
        break;
      }
    }

    // If no pattern match, search for common healthcare terms in the message
    if (!searchTerm) {
      for (const term of allGlossaryTerms) {
        const termLower = term.term.toLowerCase();
        // Check if the term or its abbreviation is in the message
        if (lowerMessage.includes(termLower) || 
            lowerMessage.includes(termLower.split('(')[0].trim()) ||
            (term.term.includes('(') && lowerMessage.includes(term.term.split('(')[1].split(')')[0].toLowerCase()))) {
          return term;
        }
      }
    } else {
      // Search for the extracted term
      for (const term of allGlossaryTerms) {
        const termLower = term.term.toLowerCase();
        if (termLower.includes(searchTerm.toLowerCase()) || searchTerm.toLowerCase().includes(termLower.split('(')[0].trim())) {
          return term;
        }
      }
    }

    return null;
  };

  // Template matching logic
  const findMatchingTemplate = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();
    
    const templateKeywords = {
      'post-discharge': {
        keywords: ['discharge', 'post-discharge', 'after discharge', 'patient discharge', 'discharge follow'],
        template: {
          id: 'post-discharge-followup',
          name: 'Post-Discharge Follow-Up',
          description: 'Automatically create care tasks and notify care managers after patient discharge',
          trigger: {
            id: 'patient-discharge',
            name: 'When patient is discharged',
            description: 'Discharge ADT event received from EHR',
            icon: 'LogOut',
            color: '#DC2626'
          },
          actions: [
            { id: 'create-care-plan', name: 'Create care plan', icon: 'FileText', color: '#DC2626' },
            { id: 'create-care-task', name: 'Create care team task', icon: 'ClipboardCheck', color: '#DC2626' },
            { id: 'send-teams', name: 'Send Teams message', icon: 'MessageCircle', color: '#5558af' }
          ]
        }
      },
      'readmission': {
        keywords: ['readmission', 'readmit', 'readmission risk', 'prevent readmission', 'readmission alert'],
        template: {
          id: 'readmission-risk-alert',
          name: 'Readmission Risk Alert',
          description: 'Flag high-risk patients at discharge and trigger immediate care team follow-up',
          trigger: {
            id: 'readmission-risk-flagged',
            name: 'When readmission risk is flagged',
            description: '30-day readmission probability > 40%',
            icon: 'AlertTriangle',
            color: '#DC2626'
          },
          actions: [
            { id: 'run-readmission-model', name: 'Run Readmission Risk Model', icon: 'Activity', color: '#7C3AED' },
            { id: 'create-care-plan', name: 'Create enhanced care plan', icon: 'FileText', color: '#DC2626' },
            { id: 'in-app-notification', name: 'Push in-app notification', icon: 'Bell', color: '#1B2B5E' }
          ]
        }
      },
      'appointment': {
        keywords: ['appointment', 'reminder', 'appointment reminder', 'schedule', 'appointment scheduled'],
        template: {
          id: 'appointment-reminder',
          name: 'Appointment Reminder Automation',
          description: 'Send personalized appointment reminders via patient preferred channel',
          trigger: {
            id: 'appointment-scheduled',
            name: 'When appointment is scheduled',
            description: 'New appointment created in scheduling system',
            icon: 'Calendar',
            color: '#D97706'
          },
          actions: [
            { id: 'send-appointment-reminder', name: 'Send appointment reminder', icon: 'Bell', color: '#D97706' },
            { id: 'send-pre-visit-instructions', name: 'Send pre-visit instructions', icon: 'FileText', color: '#D97706' }
          ]
        }
      },
      'care gap': {
        keywords: ['care gap', 'hedis', 'care gaps', 'preventive care', 'quality measure'],
        template: {
          id: 'care-gap-alert',
          name: 'Care Gap HEDIS Alert',
          description: 'Detect HEDIS measure gaps and generate prioritized outreach lists',
          trigger: {
            id: 'hedis-gap-detected',
            name: 'When HEDIS measure gap is detected',
            description: 'Quality measure non-compliance identified',
            icon: 'BarChart2',
            color: '#7C3AED'
          },
          actions: [
            { id: 'identify-care-gaps', name: 'Identify care gaps', icon: 'ClipboardList', color: '#7C3AED' },
            { id: 'generate-outreach-list', name: 'Generate outreach list', icon: 'Users', color: '#7C3AED' },
            { id: 'send-email', name: 'Send email with report', icon: 'Mail', color: '#DC2626' }
          ]
        }
      },
      'medication': {
        keywords: ['medication', 'medication reconciliation', 'prescription', 'drug', 'medication safety'],
        template: {
          id: 'medication-reconciliation',
          name: 'Medication Reconciliation Workflow',
          description: 'Automatically reconcile medications when new prescription is added',
          trigger: {
            id: 'medication-prescribed',
            name: 'When medication is prescribed',
            description: 'New prescription order created in EHR',
            icon: 'Pill',
            color: '#DC2626'
          },
          actions: [
            { id: 'reconcile-medications', name: 'Reconcile medications', icon: 'CheckCircle2', color: '#DC2626' },
            { id: 'check-drug-interactions', name: 'Check drug interactions', icon: 'AlertCircle', color: '#DC2626' },
            { id: 'create-care-task', name: 'Create pharmacist review task', icon: 'ClipboardCheck', color: '#DC2626' }
          ]
        }
      },
      'satisfaction': {
        keywords: ['satisfaction', 'survey', 'patient satisfaction', 'feedback', 'nps', 'cahps'],
        template: {
          id: 'satisfaction-survey',
          name: 'Post-Visit Satisfaction Survey',
          description: 'Automatically send satisfaction survey after appointment completion',
          trigger: {
            id: 'appointment-completed',
            name: 'When appointment is completed',
            description: 'Appointment encounter closed in EHR',
            icon: 'CheckCircle',
            color: '#D97706'
          },
          actions: [
            { id: 'send-satisfaction-survey', name: 'Send satisfaction survey', icon: 'MessageSquare', color: '#D97706' },
            { id: 'analyze-feedback', name: 'Analyze patient feedback', icon: 'TrendingUp', color: '#7C3AED' }
          ]
        }
      }
    };

    // Check for matches
    for (const [key, data] of Object.entries(templateKeywords)) {
      if (data.keywords.some(keyword => lowerMessage.includes(keyword))) {
        return data.template;
      }
    }

    return null;
  };

  const handleSend = async () => {
    if (!inputValue.trim() || isTyping) return;

    const userMessage = inputValue.trim();
    setInputValue('');
    
    // Add user message
    const userMsg = {
      id: Date.now(),
      type: 'user',
      content: userMessage,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    // Simulate AI thinking
    await new Promise(resolve => setTimeout(resolve, 1000));

    // First check if it's a glossary question
    const glossaryTerm = findGlossaryTerm(userMessage);
    
    if (glossaryTerm) {
      // Found a glossary term
      let content = `**${glossaryTerm.term}**\n\n${glossaryTerm.definition}`;
      if (glossaryTerm.example) {
        content += `\n\n*Example:* ${glossaryTerm.example}`;
      }
      
      const botResponse = {
        id: Date.now() + 1,
        type: 'bot',
        content: content,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    } else {
      // Check for template match
      const matchedTemplate = findMatchingTemplate(userMessage);

      if (matchedTemplate) {
        // Found a matching template
        const botResponse = {
          id: Date.now() + 1,
          type: 'bot',
          content: `I found a matching template: **${matchedTemplate.name}**\n\n${matchedTemplate.description}\n\nWould you like me to create this agent for you?`,
          timestamp: new Date(),
          template: matchedTemplate,
          hasAction: true
        };
        setMessages(prev => [...prev, botResponse]);
        } else {
          // Check if it's a general question about healthcare terms
          if (userMessage.toLowerCase().includes('what') || 
              userMessage.toLowerCase().includes('explain') || 
              userMessage.toLowerCase().includes('mean') ||
              userMessage.toLowerCase().includes('definition') ||
              userMessage.toLowerCase().includes('glossary') ||
              userMessage.toLowerCase().includes('term') ||
              userMessage.toLowerCase().includes('gravity') ||
              userMessage.toLowerCase().includes('hmcp') ||
              userMessage.toLowerCase().includes('dap')) {
            const botResponse = {
              id: Date.now() + 1,
              type: 'bot',
              content: `I can explain US healthcare terms and Gravity platform features! Try asking me about:\n\n**Healthcare Terms:**\n• Insurance (deductible, copay, HMO, PPO)\n• Medical terms (EHR, FHIR, ADT, HEDIS)\n• Billing terms (claim, EOB, denial)\n\n**Gravity Platform:**\n• AI Studio, Developer Studio\n• HMCP, DAP, Gravity Shield\n• Unified Data Model, FHIR Resources\n\nFor example: "What is HMCP?" or "Explain Gravity AI Studio" or "What is a deductible?"`,
              timestamp: new Date()
            };
            setMessages(prev => [...prev, botResponse]);
          } else {
          // No exact match - provide helpful response
          const suggestions = [
            'Post-discharge follow-up workflows',
            'Readmission risk alerts',
            'Appointment reminders',
            'Care gap identification',
            'Medication reconciliation',
            'Patient satisfaction surveys'
          ];

          const botResponse = {
            id: Date.now() + 1,
            type: 'bot',
            content: `I can help you create an agent for that! Here are some common workflows I can build:\n\n${suggestions.map(s => `• ${s}`).join('\n')}\n\nCan you tell me more specifically what you'd like to automate? For example: "Create an agent that sends reminders when appointments are scheduled" or "Build a workflow for post-discharge follow-up".\n\nOr ask me about US healthcare terms if you need explanations!`,
            timestamp: new Date()
          };
          setMessages(prev => [...prev, botResponse]);
        }
      }
    }

    setIsTyping(false);
  };

  const handleCreateFromTemplate = (template) => {
    if (onCreateFlow && template) {
      onCreateFlow({
        name: template.name,
        trigger: template.trigger,
        actions: template.actions
      });
      onClose();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="ai-chat-panel-overlay" onClick={onClose}>
      <div className="ai-chat-panel" onClick={(e) => e.stopPropagation()}>
        <div className="chat-header">
          <div className="chat-header-left">
            <div className="chat-bot-avatar">
              <Bot size={20} />
            </div>
            <div>
              <h3>AI Assistant</h3>
              <p>Ask me to create an agent</p>
            </div>
          </div>
          <button className="chat-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="chat-messages">
          {messages.map((message) => (
            <div key={message.id} className={`chat-message ${message.type}`}>
              <div className="message-avatar">
                {message.type === 'bot' ? (
                  <Bot size={18} />
                ) : (
                  <User size={18} />
                )}
              </div>
              <div className="message-content">
                <div className="message-text">
                  {message.content.split('\n').map((line, idx) => (
                    <React.Fragment key={idx}>
                      {line.includes('**') ? (
                        line.split('**').map((part, i) => 
                          i % 2 === 1 ? <strong key={i}>{part}</strong> : part
                        )
                      ) : (
                        line
                      )}
                      {idx < message.content.split('\n').length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </div>
                {message.hasAction && message.template && (
                  <button
                    className="create-agent-btn"
                    onClick={() => handleCreateFromTemplate(message.template)}
                  >
                    <Sparkles size={16} />
                    Create this agent
                  </button>
                )}
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="chat-message bot">
              <div className="message-avatar">
                <Bot size={18} />
              </div>
              <div className="message-content">
                <div className="typing-indicator">
                  <Loader size={16} className="spinning" />
                  <span>Thinking...</span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        <div className="chat-input-container">
          <div className="chat-input-wrapper">
            <input
              ref={inputRef}
              type="text"
              placeholder="Describe the agent you want to create..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              className="chat-input"
            />
            <button
              className="chat-send-btn"
              onClick={handleSend}
              disabled={!inputValue.trim() || isTyping}
            >
              <Send size={18} />
            </button>
          </div>
          <div className="chat-suggestions">
            <span className="suggestion-label">Try:</span>
            <button
              className="suggestion-chip"
              onClick={() => setInputValue('Create a post-discharge follow-up agent')}
            >
              Post-discharge follow-up
            </button>
            <button
              className="suggestion-chip"
              onClick={() => setInputValue('What is HMCP?')}
            >
              What is HMCP?
            </button>
            <button
              className="suggestion-chip"
              onClick={() => setInputValue('Explain Gravity AI Studio')}
            >
              What is AI Studio?
            </button>
            <button
              className="suggestion-chip"
              onClick={() => setInputValue('What is a deductible?')}
            >
              What is deductible?
            </button>
            <button
              className="suggestion-chip"
              onClick={() => setInputValue('What is DAP?')}
            >
              What is DAP?
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChatPanel;
