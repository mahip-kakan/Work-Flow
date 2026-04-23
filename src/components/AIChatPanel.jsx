import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X, Bot, User, Sparkles, Loader } from 'lucide-react';
import { hrGlossaryData } from '../data/glossaryHr';
import { healthcareChatGlossary } from '../data/healthcareChatGlossary.js';
import { HR_FEATURED_FLOWS, hrFeaturedToQuickTemplate } from '../data/hrFeaturedCopilotFlows';
import { MARKETING_FLOW_TEMPLATES, MARKETING_AI_SUGGESTIONS } from '../data/marketingTemplates';

const chatIntroHealthcare =
  "Hi! I'm your AI assistant for Workflow Studio. I can help you:\n• Create healthcare automation agents\n• Explain US healthcare terms\n• Explain automation, interoperability, and AI concepts used in this studio\n\nWhat would you like to do?";

const chatIntroHr =
  "Hi! I'm your AI assistant for Workflow Studio (HR workspace). I can help you:\n• Create HR automation (onboarding, TA, people ops)\n• Explain HR terms like requisitions, HRIS, and provisioning\n• Suggest templates for common HR workflows\n\nWhat would you like to do?";

const chatIntroMarketing =
  "Hi! I'm your AI assistant for Workflow Studio (Marketing workspace). I can help you:\n• Spin up campaign, content, and intel automations\n• Match what you type to marketing recipes (debriefs, repurposing, experiments)\n• Talk through how these flows connect to your stack\n\nWhat would you like to do?";

const AIChatPanel = ({ vertical = 'healthcare', onClose, onCreateFlow, onSelectTemplate }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: vertical === 'hr' ? chatIntroHr : vertical === 'marketing' ? chatIntroMarketing : chatIntroHealthcare,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const glossaryData =
    vertical === 'hr' ? hrGlossaryData : vertical === 'marketing' ? {} : healthcareChatGlossary;

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
      const normSearch = searchTerm.replace(/[?.!,;:]+$/g, '').trim().toLowerCase();
      const scored = [];
      for (const t of allGlossaryTerms) {
        const termLower = t.term.toLowerCase();
        const base = t.term.split('(')[0].trim().toLowerCase();
        const parenMatch = t.term.match(/\(([^)]+)\)\s*$/);
        const tailAbbrev =
          parenMatch && !/\s/.test(parenMatch[1]) ? parenMatch[1].trim().toLowerCase() : null;

        let score = 0;
        if (base === normSearch) score = 100;
        else if (tailAbbrev === normSearch) score = 95;
        else if (termLower.startsWith(`${normSearch} `) || termLower.startsWith(`${normSearch}(`)) score = 85;
        else if (termLower.includes(normSearch)) score = 50;
        else if (normSearch.includes(base)) score = 40;

        if (score) scored.push({ term: t, score, baseLen: base.length });
      }
      scored.sort((a, b) => b.score - a.score || b.baseLen - a.baseLen);
      if (scored[0]) return scored[0].term;
    }

    return null;
  };

  // Template matching logic
  const findMatchingTemplate = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();

    if (vertical === 'hr') {
      const featuredChatMatchers = [
        { keywords: ['jd', 'job description', 'jira', 'hcm'], id: 'hr-flow-jd-generator' },
        {
          keywords: ['interview complete', 'debrief', 'scorecard', 'panel notes', 'interview debrief'],
          id: 'hr-flow-interview-debrief'
        },
        { keywords: ['30-60-90', 'resource kit', 'onboarding plan'], id: 'hr-flow-onboarding-plan' },
        { keywords: ['policy bot', 'policy qa', 'employee question', 'handbook question'], id: 'hr-flow-policy-qa' }
      ];
      for (const row of featuredChatMatchers) {
        if (row.keywords.some((k) => lowerMessage.includes(k))) {
          const f = HR_FEATURED_FLOWS.find((x) => x.id === row.id);
          if (f) {
            const q = hrFeaturedToQuickTemplate(f);
            return {
              id: q.id,
              name: q.title,
              description: q.description,
              trigger: q.trigger,
              actions: q.actions
            };
          }
        }
      }

      const hrTemplateKeywords = {
        onboarding: {
          keywords: ['onboard', 'onboarding', 'new hire', 'start date', 'day one', 'provisioning'],
          template: {
            id: 'hr-onboarding',
            name: 'New hire onboarding runbook',
            description: 'T-minus tasks for IT, facilities, and manager when start date is confirmed',
            trigger: {
              id: 'start-date-set',
              name: 'When start date is set',
              description: 'Confirmed start date in HRIS; kick off provisioning checklist',
              icon: 'CalendarCheck',
              color: '#D97706'
            },
            actions: [
              { id: 'create-care-task-hr-onboarding', name: 'Create onboarding checklist', icon: 'ClipboardCheck', color: '#D97706' },
              { id: 'send-teams', name: 'Send Teams message', icon: 'MessageCircle', color: '#5558af' },
              { id: 'send-email', name: 'Send welcome email', icon: 'Mail', color: '#D97706' }
            ]
          }
        },
        offer: {
          keywords: ['offer', 'accepted', 'handoff', 'talent', 'recruit'],
          template: {
            id: 'hr-offer-handoff',
            name: 'Offer accepted — onboarding handoff',
            description: 'Notify People ops and IT when a candidate accepts an offer',
            trigger: {
              id: 'offer-accepted',
              name: 'When offer is accepted',
              description: 'Candidate signed offer; handoff to People ops for onboarding',
              icon: 'UserCheck',
              color: '#059669'
            },
            actions: [
              { id: 'send-hr-offer-email', name: 'Send welcome email', icon: 'Mail', color: '#059669' },
              { id: 'create-care-task-hr-onboarding', name: 'Create People ops task', icon: 'ClipboardCheck', color: '#D97706' },
              { id: 'send-teams', name: 'Notify IT provisioning', icon: 'MessageCircle', color: '#5558af' }
            ]
          }
        },
        manager: {
          keywords: ['manager', 'hrbp', 'triage', 'headcount', 'backfill'],
          template: {
            id: 'hr-manager-triage',
            name: 'Manager request triage',
            description: 'Route manager requests to HRBP with Teams summary and follow-up task',
            trigger: {
              id: 'manager-request-submitted',
              name: 'When manager request is submitted',
              description: 'Headcount change, backfill, or org change request from manager',
              icon: 'UserPlus',
              color: '#7C3AED'
            },
            actions: [
              { id: 'create-care-task-hr-onboarding', name: 'Create HRBP task', icon: 'ClipboardCheck', color: '#7C3AED' },
              { id: 'send-teams', name: 'Send Teams message', icon: 'MessageCircle', color: '#5558af' },
              { id: 'in-app-notification', name: 'Push in-app notification', icon: 'Bell', color: '#1B2B5E' }
            ]
          }
        },
        hris: {
          keywords: ['hris', 'duplicate', 'data quality', 'exception', 'integration'],
          template: {
            id: 'hr-hris-exception',
            name: 'HRIS data exception remediation',
            description: 'Validate, export, and assign owner when HRIS integration finds bad records',
            trigger: {
              id: 'hris-data-exception',
              name: 'When HRIS data exception is detected',
              description: 'Duplicate profile, missing manager, or invalid job code in integration',
              icon: 'AlertTriangle',
              color: '#D97706'
            },
            actions: [
              { id: 'run-data-quality-check', name: 'Run HRIS data quality check', icon: 'CheckSquare', color: '#64748b' },
              { id: 'export-csv', name: 'Export exception list', icon: 'Download', color: '#64748b' },
              { id: 'create-care-task-hr-onboarding', name: 'Assign remediation owner', icon: 'ClipboardCheck', color: '#D97706' }
            ]
          }
        }
      };
      for (const data of Object.values(hrTemplateKeywords)) {
        if (data.keywords.some((keyword) => lowerMessage.includes(keyword))) {
          return data.template;
        }
      }
      return null;
    }

    if (vertical === 'marketing') {
      for (const s of MARKETING_AI_SUGGESTIONS) {
        if (lowerMessage.includes(s.query)) {
          const t = MARKETING_FLOW_TEMPLATES.find((x) => x.id === s.template);
          if (t) {
            return {
              id: t.id,
              name: t.title,
              description: t.description,
              trigger: t.trigger,
              actions: t.actions,
            };
          }
        }
      }
      return null;
    }

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
          const lm = userMessage.toLowerCase();
          const healthcareGlossaryMatch =
            lm.includes('what') ||
            lm.includes('explain') ||
            lm.includes('mean') ||
            lm.includes('definition') ||
            lm.includes('glossary') ||
            lm.includes('term') ||
            lm.includes('mcp') ||
            lm.includes('fhir') ||
            lm.includes('health flow') ||
            lm.includes('workflow studio');

          const hrGlossaryMatch =
            lm.includes('what') ||
            lm.includes('explain') ||
            lm.includes('mean') ||
            lm.includes('definition') ||
            lm.includes('glossary') ||
            lm.includes('term') ||
            lm.includes('health flow') ||
            lm.includes('workflow studio') ||
            lm.includes('hris') ||
            lm.includes('requisition') ||
            lm.includes('onboard') ||
            lm.includes('ats') ||
            lm.includes('hrbp') ||
            lm.includes('provisioning') ||
            lm.includes('talent') ||
            lm.includes('offer');

          if (vertical === 'hr' && hrGlossaryMatch) {
            const botResponse = {
              id: Date.now() + 1,
              type: 'bot',
              content: `I can explain HR terms and how Workflow Studio automations fit together. Try:\n\n**HR concepts:**\n• HRBP, employee lifecycle, requisitions, ATS\n• HRIS, provisioning, effective dating, data quality\n\n**Examples:**\n• "What is a requisition?"\n• "What is HRIS?"\n• "Explain provisioning"`,
              timestamp: new Date()
            };
            setMessages(prev => [...prev, botResponse]);
          } else if (vertical === 'marketing' && healthcareGlossaryMatch) {
            const botResponse = {
              id: Date.now() + 1,
              type: 'bot',
              content: `I can help you wire marketing recipes in Workflow Studio. Try phrases like **campaign debrief**, **competitor monitoring**, **repurpose content**, **brief to copy**, **A/B test readout**, or **webinar follow-up**—I'll match a template you can deploy.\n\nYou can also ask how these automations connect to analytics, CRM, and brand guidelines.`,
              timestamp: new Date()
            };
            setMessages(prev => [...prev, botResponse]);
          } else if (vertical !== 'hr' && vertical !== 'marketing' && healthcareGlossaryMatch) {
            const botResponse = {
              id: Date.now() + 1,
              type: 'bot',
              content: `I can explain US healthcare terms and how automation fits together in Workflow Studio. Try asking me about:\n\n**Healthcare terms:**\n• Insurance (deductible, copay, HMO, PPO)\n• Clinical and data terms (EHR, FHIR, ADT, HEDIS)\n• Billing (claim, EOB, denial)\n\n**Automation and interoperability:**\n• Low-code workflow studio, MCP\n• Healthcare data integration, unified data model\n• Security and compliance in healthcare IT\n\nFor example: "What is MCP?" or "What is FHIR?" or "Explain low-code workflow studio" or "What is a deductible?"`,
              timestamp: new Date()
            };
            setMessages(prev => [...prev, botResponse]);
          } else {
            const suggestions =
              vertical === 'hr'
                ? [
                    'New hire onboarding runbooks',
                    'Offer accepted handoff to People ops',
                    'Manager request triage for HRBP',
                    'Interview feedback SLA nudges',
                    'HRIS duplicate / data exception routing',
                    'Quarterly access review campaigns'
                  ]
                : vertical === 'marketing'
                  ? [
                      'Post-campaign debrief deck',
                      'Weekly competitor intel brief',
                      'Repurpose a pillar blog for social',
                      'Brief → on-brand copy pack',
                      'Experiment readout with recommendation',
                      'Webinar nurture and recap emails'
                    ]
                  : [
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
              content:
                vertical === 'hr'
                  ? `I can help you create an HR automation! Common examples:\n\n${suggestions.map((s) => `• ${s}`).join('\n')}\n\nTry: "Create onboarding when start date is set" or "What is a requisition?" or ask about HRIS data quality.`
                  : vertical === 'marketing'
                    ? `I can help you create a marketing automation! Examples:\n\n${suggestions.map((s) => `• ${s}`).join('\n')}\n\nTry: "post-campaign debrief" or "repurpose content" or "A/B test readout".`
                    : `I can help you create an agent for that! Here are some common workflows I can build:\n\n${suggestions.map((s) => `• ${s}`).join('\n')}\n\nCan you tell me more specifically what you'd like to automate? For example: "Create an agent that sends reminders when appointments are scheduled" or "Build a workflow for post-discharge follow-up".\n\nOr ask me about US healthcare terms if you need explanations!`,
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
              placeholder={
                vertical === 'hr'
                  ? 'Describe the HR workflow you want to automate...'
                  : vertical === 'marketing'
                    ? 'Describe the marketing workflow you want to automate...'
                    : 'Describe the agent you want to create...'
              }
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
            {vertical === 'hr' ? (
              <>
                <button
                  className="suggestion-chip"
                  onClick={() => setInputValue('Create onboarding when start date is set')}
                >
                  Start date onboarding
                </button>
                <button
                  className="suggestion-chip"
                  onClick={() => setInputValue('What is a requisition?')}
                >
                  What is a requisition?
                </button>
                <button
                  className="suggestion-chip"
                  onClick={() => setInputValue('Offer accepted handoff to People ops')}
                >
                  Offer accepted handoff
                </button>
                <button
                  className="suggestion-chip"
                  onClick={() => setInputValue('HRIS duplicate record remediation')}
                >
                  HRIS data exception
                </button>
                <button
                  className="suggestion-chip"
                  onClick={() => setInputValue('What is HRIS?')}
                >
                  What is HRIS?
                </button>
                <button
                  className="suggestion-chip"
                  onClick={() => setInputValue('Manager request triage for HRBP')}
                >
                  Manager triage
                </button>
              </>
            ) : vertical === 'marketing' ? (
              <>
                <button
                  className="suggestion-chip"
                  onClick={() => setInputValue('post-campaign debrief when the campaign ends')}
                >
                  Post-campaign debrief
                </button>
                <button
                  className="suggestion-chip"
                  onClick={() => setInputValue('weekly competitor monitoring brief')}
                >
                  Competitor monitoring
                </button>
                <button
                  className="suggestion-chip"
                  onClick={() => setInputValue('repurpose long-form content for social')}
                >
                  Content repurposing
                </button>
                <button
                  className="suggestion-chip"
                  onClick={() => setInputValue('marketing brief to on-brand copy')}
                >
                  Brief to copy
                </button>
                <button
                  className="suggestion-chip"
                  onClick={() => setInputValue('A/B test readout when experiment concludes')}
                >
                  A/B test readout
                </button>
              </>
            ) : (
              <>
                <button
                  className="suggestion-chip"
                  onClick={() => setInputValue('Create a post-discharge follow-up agent')}
                >
                  Post-discharge follow-up
                </button>
                <button
                  className="suggestion-chip"
                  onClick={() => setInputValue('What is MCP in regulated healthcare?')}
                >
                  MCP in healthcare
                </button>
                <button
                  className="suggestion-chip"
                  onClick={() => setInputValue('What is MCP?')}
                >
                  What is MCP?
                </button>
                <button
                  className="suggestion-chip"
                  onClick={() => setInputValue('Explain low-code workflow studio')}
                >
                  Low-code studio
                </button>
                <button
                  className="suggestion-chip"
                  onClick={() => setInputValue('What is a deductible?')}
                >
                  What is deductible?
                </button>
                <button
                  className="suggestion-chip"
                  onClick={() => setInputValue('What is FHIR?')}
                >
                  What is FHIR?
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChatPanel;
