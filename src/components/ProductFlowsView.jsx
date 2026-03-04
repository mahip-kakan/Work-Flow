import React from 'react';
import * as LucideIcons from 'lucide-react';
import { ArrowLeft, HelpCircle } from 'lucide-react';

// Population Health pre-built agent templates
const populationHealthAgents = [
  {
    id: 'ph-1',
    name: 'Daily Risk Stratification Pipeline',
    description: 'Run risk model every morning, update patient risk scores, and alert care team to high-risk patients',
    trigger: {
      id: 'on-schedule',
      name: 'On a schedule',
      description: 'Every day at 6:00 AM',
      icon: 'Clock',
      color: '#0284C7'
    },
    actions: [
      {
        id: 'run-risk-model',
        name: 'Run Risk Stratification Agent',
        description: 'Execute predictive risk model on patient population',
        icon: 'Activity',
        color: '#7C3AED',
        module: 'AI Studio'
      },
      {
        id: 'update-patient-risk-score',
        name: 'Update patient risk scores',
        description: 'Recalculate risk scores using latest clinical data',
        icon: 'TrendingUp',
        color: '#7C3AED',
        module: 'Population Health'
      },
      {
        id: 'run-data-quality-check',
        name: 'Run data quality check',
        description: 'Validate completeness against quality rules',
        icon: 'CheckSquare',
        color: '#64748b',
        module: null
      },
      {
        id: 'send-teams',
        name: 'Send Teams message',
        description: 'Notify care team leads of high-risk patients',
        icon: 'MessageCircle',
        color: '#5558af',
        module: null
      }
    ],
    isActive: true
  },
  {
    id: 'ph-2',
    name: 'Care Gap HEDIS Alert',
    description: 'Detect HEDIS measure gaps across the patient population and generate prioritized outreach lists',
    trigger: {
      id: 'hedis-gap-detected',
      name: 'When HEDIS measure gap is detected',
      description: 'Quality measure non-compliance identified in cohort',
      icon: 'BarChart2',
      color: '#7C3AED'
    },
    actions: [
      {
        id: 'invoke-care-gap-agent',
        name: 'Invoke Care Gap Agent',
        description: 'Run HMCP Care Gap Agent across patient cohort',
        icon: 'ClipboardList',
        color: '#7C3AED',
        module: 'AI Studio'
      },
      {
        id: 'identify-care-gaps',
        name: 'Identify care gaps',
        description: 'Surface patients with open preventive care gaps',
        icon: 'ClipboardList',
        color: '#7C3AED',
        module: 'Population Health'
      },
      {
        id: 'generate-outreach-list',
        name: 'Generate outreach list',
        description: 'Build prioritized patient list for outreach',
        icon: 'Users',
        color: '#7C3AED',
        module: 'Population Health'
      },
      {
        id: 'send-email',
        name: 'Send email with report',
        description: 'Email gap report to population health team',
        icon: 'Mail',
        color: '#DC2626',
        module: null
      }
    ],
    isActive: true
  },
  {
    id: 'ph-3',
    name: 'Outreach Non-Response Escalation',
    description: 'Escalate patients who have not responded to outreach after configured number of days',
    trigger: {
      id: 'outreach-non-response',
      name: 'When outreach goes unanswered',
      description: 'Patient did not respond within 7 days',
      icon: 'PhoneMissed',
      color: '#7C3AED'
    },
    actions: [
      {
        id: 'invoke-patient-outreach-agent',
        name: 'Invoke Patient Outreach Agent',
        description: 'Run HMCP Outreach Agent to personalize retry message',
        icon: 'PhoneCall',
        color: '#7C3AED',
        module: 'AI Studio'
      },
      {
        id: 'create-care-task',
        name: 'Create care team task',
        description: 'Assign manual outreach task to care coordinator',
        icon: 'ClipboardCheck',
        color: '#DC2626',
        module: 'Clinical Care'
      },
      {
        id: 'in-app-notification',
        name: 'Push in-app notification',
        description: 'Alert care coordinator inside Gravity',
        icon: 'Bell',
        color: '#1B2B5E',
        module: null
      }
    ],
    isActive: true
  },
  {
    id: 'ph-4',
    name: 'New Patient Cohort Setup',
    description: 'Automatically initialize risk scoring and care gaps when a new patient list is uploaded',
    trigger: {
      id: 'patient-list-uploaded',
      name: 'When patient list is uploaded',
      description: 'CSV or Excel patient roster uploaded',
      icon: 'Upload',
      color: '#D97706'
    },
    actions: [
      {
        id: 'refresh-fhir-data',
        name: 'Refresh FHIR data',
        description: 'Pull clinical data for new patient cohort',
        icon: 'RefreshCw',
        color: '#64748b',
        module: null
      },
      {
        id: 'run-risk-model',
        name: 'Run Risk Stratification Agent',
        description: 'Compute initial risk scores for the new cohort',
        icon: 'Activity',
        color: '#7C3AED',
        module: 'AI Studio'
      },
      {
        id: 'identify-care-gaps',
        name: 'Identify care gaps',
        description: 'Surface initial care gaps for new patients',
        icon: 'ClipboardList',
        color: '#7C3AED',
        module: 'Population Health'
      },
      {
        id: 'in-app-notification',
        name: 'Push in-app notification',
        description: 'Notify care team that cohort is ready for review',
        icon: 'Bell',
        color: '#1B2B5E',
        module: null
      }
    ],
    isActive: true
  },
  {
    id: 'ph-5',
    name: 'Weekly Quality Measure Report',
    description: 'Refresh HEDIS measures each Friday and deliver a quality scorecard to leadership',
    trigger: {
      id: 'on-schedule',
      name: 'On a schedule',
      description: 'Every Friday at 5:00 PM',
      icon: 'Clock',
      color: '#0284C7'
    },
    actions: [
      {
        id: 'run-hedis-measure',
        name: 'Run HEDIS measure',
        description: 'Execute quality measure calculation for cohort',
        icon: 'BarChart2',
        color: '#7C3AED',
        module: 'Population Health'
      },
      {
        id: 'run-data-quality-check',
        name: 'Run data quality check',
        description: 'Validate measure numerator and denominator data',
        icon: 'CheckSquare',
        color: '#64748b',
        module: null
      },
      {
        id: 'export-csv',
        name: 'Export to CSV / Excel',
        description: 'Generate downloadable quality scorecard',
        icon: 'Download',
        color: '#64748b',
        module: null
      },
      {
        id: 'send-email',
        name: 'Send email with report',
        description: 'Email weekly quality scorecard to leadership',
        icon: 'Mail',
        color: '#DC2626',
        module: null
      }
    ],
    isActive: false
  },
  {
    id: 'ph-6',
    name: 'SDOH Data Refresh Alert',
    description: 'Alert care teams when social determinants data is updated for high-risk patients',
    trigger: {
      id: 'sdoh-data-updated',
      name: 'When SDOH data is updated',
      description: 'Social determinants of health record refreshed',
      icon: 'Globe',
      color: '#059669'
    },
    actions: [
      {
        id: 'update-patient-risk-score',
        name: 'Update patient risk score',
        description: 'Recalculate risk incorporating new SDOH factors',
        icon: 'Activity',
        color: '#7C3AED',
        module: 'Population Health'
      },
      {
        id: 'update-care-plan',
        name: 'Update care plan',
        description: 'Flag care plan for review with SDOH context',
        icon: 'FileEdit',
        color: '#DC2626',
        module: 'Clinical Care'
      },
      {
        id: 'send-slack',
        name: 'Send Slack message',
        description: 'Notify care team of SDOH-driven risk change',
        icon: 'MessageSquare',
        color: '#4a154b',
        module: null
      }
    ],
    isActive: true
  }
];

// Clinical Care pre-built agent templates
const clinicalCareAgents = [
  {
    id: 'cc-1',
    name: 'Post-Discharge Follow-Up',
    description: 'Automatically create care tasks and notify care managers within minutes of patient discharge',
    trigger: {
      id: 'patient-discharge',
      name: 'When patient is discharged',
      description: 'Discharge ADT event received from EHR',
      icon: 'LogOut',
      color: '#DC2626'
    },
    actions: [
      {
        id: 'create-care-plan',
        name: 'Create care plan',
        description: 'Generate post-discharge care plan with medication reconciliation',
        icon: 'FileText',
        color: '#DC2626',
        module: 'Clinical Care'
      },
      {
        id: 'create-care-task',
        name: 'Create care team task',
        description: 'Assign follow-up call task to care coordinator',
        icon: 'ClipboardCheck',
        color: '#DC2626',
        module: 'Clinical Care'
      },
      {
        id: 'send-teams',
        name: 'Send Teams message',
        description: 'Notify care team of new discharge',
        icon: 'MessageCircle',
        color: '#5558af',
        module: null
      }
    ],
    isActive: true
  },
  {
    id: 'cc-2',
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
      {
        id: 'run-readmission-model',
        name: 'Run Readmission Risk Model',
        description: 'Calculate readmission probability using clinical factors',
        icon: 'Activity',
        color: '#7C3AED',
        module: 'AI Studio'
      },
      {
        id: 'create-care-plan',
        name: 'Create enhanced care plan',
        description: 'Generate comprehensive discharge plan with risk mitigation',
        icon: 'FileText',
        color: '#DC2626',
        module: 'Clinical Care'
      },
      {
        id: 'in-app-notification',
        name: 'Push in-app notification',
        description: 'Alert care coordinator inside Gravity',
        icon: 'Bell',
        color: '#1B2B5E',
        module: null
      }
    ],
    isActive: true
  },
  {
    id: 'cc-3',
    name: 'Medication Reconciliation Workflow',
    description: 'Automatically reconcile medications when new prescription is added or patient is admitted',
    trigger: {
      id: 'medication-prescribed',
      name: 'When medication is prescribed',
      description: 'New prescription order created in EHR',
      icon: 'Pill',
      color: '#DC2626'
    },
    actions: [
      {
        id: 'reconcile-medications',
        name: 'Reconcile medications',
        description: 'Compare current medications with new prescription',
        icon: 'CheckCircle2',
        color: '#DC2626',
        module: 'Clinical Care'
      },
      {
        id: 'check-drug-interactions',
        name: 'Check drug interactions',
        description: 'Identify potential medication conflicts',
        icon: 'AlertCircle',
        color: '#DC2626',
        module: 'Clinical Care'
      },
      {
        id: 'create-care-task',
        name: 'Create pharmacist review task',
        description: 'Flag for clinical pharmacist review if conflicts found',
        icon: 'ClipboardCheck',
        color: '#DC2626',
        module: 'Clinical Care'
      }
    ],
    isActive: true
  },
  {
    id: 'cc-4',
    name: 'Chronic Disease Management',
    description: 'Monitor chronic conditions and trigger care interventions when thresholds are exceeded',
    trigger: {
      id: 'chronic-condition-alert',
      name: 'When chronic condition threshold exceeded',
      description: 'HbA1c > 9%, BP > 140/90, or other clinical thresholds',
      icon: 'Heart',
      color: '#DC2626'
    },
    actions: [
      {
        id: 'update-care-plan',
        name: 'Update care plan',
        description: 'Modify care plan with new clinical targets',
        icon: 'FileEdit',
        color: '#DC2626',
        module: 'Clinical Care'
      },
      {
        id: 'create-care-task',
        name: 'Create provider task',
        description: 'Assign medication adjustment or lifestyle counseling task',
        icon: 'ClipboardCheck',
        color: '#DC2626',
        module: 'Clinical Care'
      },
      {
        id: 'send-teams',
        name: 'Send Teams message',
        description: 'Notify care team of patient needing intervention',
        icon: 'MessageCircle',
        color: '#5558af',
        module: null
      }
    ],
    isActive: true
  },
  {
    id: 'cc-5',
    name: 'Lab Result Follow-Up',
    description: 'Automatically review abnormal lab results and create follow-up tasks for care team',
    trigger: {
      id: 'abnormal-lab-result',
      name: 'When abnormal lab result is received',
      description: 'Lab value outside normal range or critical value',
      icon: 'FlaskConical',
      color: '#DC2626'
    },
    actions: [
      {
        id: 'analyze-lab-result',
        name: 'Analyze lab result',
        description: 'Assess clinical significance of abnormal value',
        icon: 'Microscope',
        color: '#7C3AED',
        module: 'AI Studio'
      },
      {
        id: 'create-care-task',
        name: 'Create provider review task',
        description: 'Assign lab review task to ordering provider',
        icon: 'ClipboardCheck',
        color: '#DC2626',
        module: 'Clinical Care'
      },
      {
        id: 'in-app-notification',
        name: 'Push in-app notification',
        description: 'Alert provider of critical or abnormal result',
        icon: 'Bell',
        color: '#1B2B5E',
        module: null
      }
    ],
    isActive: true
  },
  {
    id: 'cc-6',
    name: 'Care Plan Review Reminder',
    description: 'Schedule periodic care plan reviews for patients with complex conditions',
    trigger: {
      id: 'on-schedule',
      name: 'On a schedule',
      description: 'Every 90 days for high-risk patients',
      icon: 'Clock',
      color: '#0284C7'
    },
    actions: [
      {
        id: 'create-care-task',
        name: 'Create care plan review task',
        description: 'Assign care plan review to primary care provider',
        icon: 'ClipboardCheck',
        color: '#DC2626',
        module: 'Clinical Care'
      },
      {
        id: 'send-email',
        name: 'Send email reminder',
        description: 'Email provider about upcoming care plan review',
        icon: 'Mail',
        color: '#DC2626',
        module: null
      }
    ],
    isActive: false
  }
];

// Patient Experience pre-built agent templates
const patientExperienceAgents = [
  {
    id: 'px-1',
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
      {
        id: 'send-appointment-reminder',
        name: 'Send appointment reminder',
        description: 'Send SMS, email, or phone call based on patient preference',
        icon: 'Bell',
        color: '#D97706',
        module: 'Patient Experience'
      },
      {
        id: 'send-pre-visit-instructions',
        name: 'Send pre-visit instructions',
        description: 'Deliver preparation instructions and forms',
        icon: 'FileText',
        color: '#D97706',
        module: 'Patient Experience'
      }
    ],
    isActive: true
  },
  {
    id: 'px-2',
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
      {
        id: 'send-satisfaction-survey',
        name: 'Send satisfaction survey',
        description: 'Deliver NPS or CAHPS survey via patient preferred channel',
        icon: 'MessageSquare',
        color: '#D97706',
        module: 'Patient Experience'
      },
      {
        id: 'analyze-feedback',
        name: 'Analyze patient feedback',
        description: 'Process survey responses and identify improvement opportunities',
        icon: 'TrendingUp',
        color: '#7C3AED',
        module: 'AI Studio'
      }
    ],
    isActive: true
  },
  {
    id: 'px-3',
    name: 'Patient Portal Engagement',
    description: 'Encourage patient portal adoption and engagement with targeted outreach',
    trigger: {
      id: 'patient-registered',
      name: 'When patient is registered',
      description: 'New patient account created in system',
      icon: 'UserPlus',
      color: '#D97706'
    },
    actions: [
      {
        id: 'send-portal-invitation',
        name: 'Send portal invitation',
        description: 'Email or SMS invitation to activate patient portal account',
        icon: 'Mail',
        color: '#D97706',
        module: 'Patient Experience'
      },
      {
        id: 'send-portal-tutorial',
        name: 'Send portal tutorial',
        description: 'Deliver onboarding materials and how-to guides',
        icon: 'BookOpen',
        color: '#D97706',
        module: 'Patient Experience'
      }
    ],
    isActive: true
  },
  {
    id: 'px-4',
    name: 'Wait Time Communication',
    description: 'Keep patients informed about appointment delays and wait times',
    trigger: {
      id: 'appointment-delayed',
      name: 'When appointment is delayed',
      description: 'Provider running behind schedule',
      icon: 'Clock',
      color: '#D97706'
    },
    actions: [
      {
        id: 'send-wait-time-update',
        name: 'Send wait time update',
        description: 'Notify patient of delay and estimated wait time',
        icon: 'MessageCircle',
        color: '#D97706',
        module: 'Patient Experience'
      },
      {
        id: 'offer-reschedule',
        name: 'Offer reschedule option',
        description: 'Provide option to reschedule if delay is significant',
        icon: 'Calendar',
        color: '#D97706',
        module: 'Patient Experience'
      }
    ],
    isActive: true
  },
  {
    id: 'px-5',
    name: 'Care Team Communication',
    description: 'Facilitate secure messaging between patients and care team',
    trigger: {
      id: 'patient-message-received',
      name: 'When patient sends message',
      description: 'New secure message from patient in portal',
      icon: 'MessageSquare',
      color: '#D97706'
    },
    actions: [
      {
        id: 'route-message',
        name: 'Route message to care team',
        description: 'Assign message to appropriate provider or care coordinator',
        icon: 'Send',
        color: '#D97706',
        module: 'Patient Experience'
      },
      {
        id: 'send-acknowledgment',
        name: 'Send acknowledgment',
        description: 'Confirm receipt of patient message',
        icon: 'CheckCircle',
        color: '#D97706',
        module: 'Patient Experience'
      },
      {
        id: 'create-care-task',
        name: 'Create response task',
        description: 'Assign message response task to care team member',
        icon: 'ClipboardCheck',
        color: '#DC2626',
        module: 'Clinical Care'
      }
    ],
    isActive: true
  },
  {
    id: 'px-6',
    name: 'Test Results Delivery',
    description: 'Automatically deliver test results to patients via secure portal',
    trigger: {
      id: 'test-result-available',
      name: 'When test result is available',
      description: 'Lab or imaging result finalized and reviewed',
      icon: 'FileCheck',
      color: '#D97706'
    },
    actions: [
      {
        id: 'send-test-result',
        name: 'Send test result',
        description: 'Deliver result via patient portal with provider notes',
        icon: 'FileText',
        color: '#D97706',
        module: 'Patient Experience'
      },
      {
        id: 'send-follow-up-instructions',
        name: 'Send follow-up instructions',
        description: 'Provide next steps based on test results',
        icon: 'Info',
        color: '#D97706',
        module: 'Patient Experience'
      }
    ],
    isActive: true
  }
];

// VBC pre-built agent templates
const vbcAgents = [
  {
    id: 'vbc-1',
    name: 'ACO Performance Dashboard Refresh',
    description: 'Recalculate ACO shared savings and quality scores after each payer data sync',
    trigger: {
      id: 'payer-data-sync-complete',
      name: 'When payer data sync completes',
      description: 'Eligibility and benefit data synced from payer',
      icon: 'Link',
      color: '#059669'
    },
    actions: [
      {
        id: 'calculate-aco-performance',
        name: 'Calculate ACO performance',
        description: 'Compute shared savings and quality scores',
        icon: 'TrendingUp',
        color: '#059669',
        module: 'Value-Based Care'
      },
      {
        id: 'generate-contract-report',
        name: 'Generate contract report',
        description: 'Export VBC contract performance summary',
        icon: 'FileSpreadsheet',
        color: '#059669',
        module: 'Value-Based Care'
      },
      {
        id: 'send-email',
        name: 'Send email with report',
        description: 'Email performance report to VBC leadership',
        icon: 'Mail',
        color: '#DC2626',
        module: null
      }
    ],
    isActive: true
  },
  {
    id: 'vbc-2',
    name: 'Quality Measure Tracking',
    description: 'Monitor and track quality measures for VBC contracts in real-time',
    trigger: {
      id: 'on-schedule',
      name: 'On a schedule',
      description: 'Daily at 8:00 AM',
      icon: 'Clock',
      color: '#0284C7'
    },
    actions: [
      {
        id: 'run-quality-measures',
        name: 'Run quality measures',
        description: 'Calculate current performance on all contract quality metrics',
        icon: 'BarChart2',
        color: '#059669',
        module: 'Value-Based Care'
      },
      {
        id: 'identify-gaps',
        name: 'Identify quality gaps',
        description: 'Flag measures below target thresholds',
        icon: 'AlertTriangle',
        color: '#DC2626',
        module: 'Value-Based Care'
      },
      {
        id: 'update-dashboard',
        name: 'Update quality dashboard',
        description: 'Refresh VBC quality scorecard with latest data',
        icon: 'TrendingUp',
        color: '#059669',
        module: 'Value-Based Care'
      }
    ],
    isActive: true
  },
  {
    id: 'vbc-3',
    name: 'Shared Savings Calculation',
    description: 'Calculate shared savings and losses for ACO contracts quarterly',
    trigger: {
      id: 'on-schedule',
      name: 'On a schedule',
      description: 'Quarterly on first day of quarter',
      icon: 'Calendar',
      color: '#059669'
    },
    actions: [
      {
        id: 'calculate-shared-savings',
        name: 'Calculate shared savings',
        description: 'Compute savings based on benchmark and actual costs',
        icon: 'DollarSign',
        color: '#059669',
        module: 'Value-Based Care'
      },
      {
        id: 'generate-savings-report',
        name: 'Generate savings report',
        description: 'Create detailed shared savings analysis report',
        icon: 'FileSpreadsheet',
        color: '#059669',
        module: 'Value-Based Care'
      },
      {
        id: 'notify-stakeholders',
        name: 'Notify stakeholders',
        description: 'Send savings report to ACO leadership and partners',
        icon: 'Mail',
        color: '#DC2626',
        module: null
      }
    ],
    isActive: true
  },
  {
    id: 'vbc-4',
    name: 'Risk Adjustment Factor Update',
    description: 'Update risk adjustment factors when new diagnosis codes are identified',
    trigger: {
      id: 'new-diagnosis-codes',
      name: 'When new diagnosis codes are identified',
      description: 'New HCC codes or chronic conditions documented',
      icon: 'FileText',
      color: '#059669'
    },
    actions: [
      {
        id: 'calculate-risk-scores',
        name: 'Calculate risk scores',
        description: 'Recalculate patient risk adjustment factors',
        icon: 'Activity',
        color: '#059669',
        module: 'Value-Based Care'
      },
      {
        id: 'update-patient-risk',
        name: 'Update patient risk profile',
        description: 'Refresh patient risk stratification with new factors',
        icon: 'TrendingUp',
        color: '#059669',
        module: 'Value-Based Care'
      },
      {
        id: 'validate-codes',
        name: 'Validate diagnosis codes',
        description: 'Verify code accuracy and completeness',
        icon: 'CheckCircle',
        color: '#64748b',
        module: null
      }
    ],
    isActive: true
  },
  {
    id: 'vbc-5',
    name: 'Contract Performance Alert',
    description: 'Alert when contract performance metrics fall below thresholds',
    trigger: {
      id: 'performance-threshold-breached',
      name: 'When performance threshold is breached',
      description: 'Quality or cost metric below contract target',
      icon: 'AlertTriangle',
      color: '#DC2626'
    },
    actions: [
      {
        id: 'analyze-performance',
        name: 'Analyze performance gap',
        description: 'Identify root causes of performance decline',
        icon: 'TrendingDown',
        color: '#DC2626',
        module: 'Value-Based Care'
      },
      {
        id: 'create-action-plan',
        name: 'Create improvement action plan',
        description: 'Generate targeted intervention recommendations',
        icon: 'ClipboardList',
        color: '#059669',
        module: 'Value-Based Care'
      },
      {
        id: 'notify-team',
        name: 'Notify care team',
        description: 'Alert care management team of performance issues',
        icon: 'Bell',
        color: '#1B2B5E',
        module: null
      }
    ],
    isActive: true
  },
  {
    id: 'vbc-6',
    name: 'Member Attribution Update',
    description: 'Update patient attribution when membership changes occur',
    trigger: {
      id: 'membership-change',
      name: 'When membership changes',
      description: 'Patient joins or leaves ACO or health plan',
      icon: 'Users',
      color: '#059669'
    },
    actions: [
      {
        id: 'update-attribution',
        name: 'Update patient attribution',
        description: 'Refresh attribution lists for affected contracts',
        icon: 'UserCheck',
        color: '#059669',
        module: 'Value-Based Care'
      },
      {
        id: 'recalculate-benchmarks',
        name: 'Recalculate benchmarks',
        description: 'Adjust performance benchmarks for new member counts',
        icon: 'BarChart2',
        color: '#059669',
        module: 'Value-Based Care'
      }
    ],
    isActive: false
  },
  {
    id: 'vbc-7',
    name: 'Cost Trend Analysis',
    description: 'Analyze cost trends and identify opportunities for cost reduction',
    trigger: {
      id: 'on-schedule',
      name: 'On a schedule',
      description: 'Monthly on the 1st',
      icon: 'Clock',
      color: '#0284C7'
    },
    actions: [
      {
        id: 'analyze-cost-trends',
        name: 'Analyze cost trends',
        description: 'Identify cost drivers and utilization patterns',
        icon: 'TrendingUp',
        color: '#059669',
        module: 'Value-Based Care'
      },
      {
        id: 'identify-opportunities',
        name: 'Identify cost reduction opportunities',
        description: 'Flag high-cost areas for intervention',
        icon: 'Target',
        color: '#DC2626',
        module: 'Value-Based Care'
      },
      {
        id: 'generate-report',
        name: 'Generate cost analysis report',
        description: 'Create monthly cost trend report for leadership',
        icon: 'FileSpreadsheet',
        color: '#059669',
        module: 'Value-Based Care'
      }
    ],
    isActive: true
  },
  {
    id: 'vbc-8',
    name: 'Provider Network Performance',
    description: 'Track and report provider network performance against VBC goals',
    trigger: {
      id: 'on-schedule',
      name: 'On a schedule',
      description: 'Weekly on Monday',
      icon: 'Clock',
      color: '#0284C7'
    },
    actions: [
      {
        id: 'calculate-provider-metrics',
        name: 'Calculate provider metrics',
        description: 'Compute quality and cost metrics by provider',
        icon: 'BarChart2',
        color: '#059669',
        module: 'Value-Based Care'
      },
      {
        id: 'rank-providers',
        name: 'Rank provider performance',
        description: 'Identify top and bottom performing providers',
        icon: 'TrendingUp',
        color: '#059669',
        module: 'Value-Based Care'
      },
      {
        id: 'send-provider-reports',
        name: 'Send provider reports',
        description: 'Distribute performance reports to network providers',
        icon: 'Mail',
        color: '#DC2626',
        module: null
      }
    ],
    isActive: true
  },
  {
    id: 'vbc-9',
    name: 'HEDIS Measure Refresh',
    description: 'Refresh HEDIS quality measures after each EHR data ingestion',
    trigger: {
      id: 'ehr-data-ingested',
      name: 'When EHR data is ingested',
      description: 'New clinical data received from EHR systems',
      icon: 'Database',
      color: '#059669'
    },
    actions: [
      {
        id: 'run-hedis-measures',
        name: 'Run HEDIS measures',
        description: 'Calculate all HEDIS quality measures for attributed population',
        icon: 'BarChart2',
        color: '#059669',
        module: 'Value-Based Care'
      },
      {
        id: 'update-quality-scores',
        name: 'Update quality scores',
        description: 'Refresh contract quality performance scores',
        icon: 'TrendingUp',
        color: '#059669',
        module: 'Value-Based Care'
      }
    ],
    isActive: true
  }
];

// RCM pre-built agent templates
const rcmAgents = [
  {
    id: 'rcm-1',
    name: 'Prior Authorization Automation',
    description: 'Automatically submit and track prior authorization requests',
    trigger: {
      id: 'prior-auth-requested',
      name: 'When prior authorization is requested',
      description: 'Provider requests authorization for procedure or medication',
      icon: 'FileCheck',
      color: '#0284C7'
    },
    actions: [
      {
        id: 'submit-prior-auth',
        name: 'Submit prior authorization',
        description: 'Automatically submit PA request to payer',
        icon: 'Send',
        color: '#0284C7',
        module: 'RCM'
      },
      {
        id: 'track-pa-status',
        name: 'Track PA status',
        description: 'Monitor authorization status and deadlines',
        icon: 'Clock',
        color: '#0284C7',
        module: 'RCM'
      },
      {
        id: 'notify-provider',
        name: 'Notify provider',
        description: 'Alert provider when authorization is approved or denied',
        icon: 'Bell',
        color: '#1B2B5E',
        module: null
      }
    ],
    isActive: true
  },
  {
    id: 'rcm-2',
    name: 'Claim Denial Prevention',
    description: 'Identify and prevent potential claim denials before submission',
    trigger: {
      id: 'claim-ready-to-submit',
      name: 'When claim is ready to submit',
      description: 'Claim prepared and ready for payer submission',
      icon: 'FileText',
      color: '#0284C7'
    },
    actions: [
      {
        id: 'validate-claim',
        name: 'Validate claim data',
        description: 'Check claim for common denial reasons',
        icon: 'CheckCircle',
        color: '#0284C7',
        module: 'RCM'
      },
      {
        id: 'check-eligibility',
        name: 'Verify patient eligibility',
        description: 'Confirm patient coverage and benefits',
        icon: 'UserCheck',
        color: '#0284C7',
        module: 'RCM'
      },
      {
        id: 'flag-issues',
        name: 'Flag potential issues',
        description: 'Alert billing team of potential denial risks',
        icon: 'AlertTriangle',
        color: '#DC2626',
        module: 'RCM'
      }
    ],
    isActive: true
  },
  {
    id: 'rcm-3',
    name: 'Denial Management Workflow',
    description: 'Automatically process and route denied claims for appeal',
    trigger: {
      id: 'claim-denied',
      name: 'When claim is denied',
      description: 'Payer denies claim submission',
      icon: 'XCircle',
      color: '#DC2626'
    },
    actions: [
      {
        id: 'analyze-denial',
        name: 'Analyze denial reason',
        description: 'Identify root cause of claim denial',
        icon: 'Search',
        color: '#DC2626',
        module: 'RCM'
      },
      {
        id: 'create-appeal',
        name: 'Create appeal task',
        description: 'Assign appeal to appropriate team member',
        icon: 'ClipboardCheck',
        color: '#DC2626',
        module: 'RCM'
      },
      {
        id: 'gather-documentation',
        name: 'Gather supporting documentation',
        description: 'Collect medical records and documentation for appeal',
        icon: 'FileText',
        color: '#0284C7',
        module: 'RCM'
      }
    ],
    isActive: true
  },
  {
    id: 'rcm-4',
    name: 'Eligibility Verification',
    description: 'Automatically verify patient eligibility before appointments',
    trigger: {
      id: 'appointment-scheduled',
      name: 'When appointment is scheduled',
      description: 'New appointment created in scheduling system',
      icon: 'Calendar',
      color: '#0284C7'
    },
    actions: [
      {
        id: 'verify-eligibility',
        name: 'Verify patient eligibility',
        description: 'Check patient insurance coverage and benefits',
        icon: 'UserCheck',
        color: '#0284C7',
        module: 'RCM'
      },
      {
        id: 'check-benefits',
        name: 'Check benefit details',
        description: 'Verify copay, deductible, and coverage limits',
        icon: 'Info',
        color: '#0284C7',
        module: 'RCM'
      },
      {
        id: 'alert-if-issues',
        name: 'Alert if issues found',
        description: 'Notify front desk if eligibility problems detected',
        icon: 'Bell',
        color: '#DC2626',
        module: null
      }
    ],
    isActive: true
  },
  {
    id: 'rcm-5',
    name: 'Payment Posting Automation',
    description: 'Automatically post payments and reconcile remittances',
    trigger: {
      id: 'payment-received',
      name: 'When payment is received',
      description: 'Payment or remittance advice received from payer',
      icon: 'DollarSign',
      color: '#059669'
    },
    actions: [
      {
        id: 'post-payment',
        name: 'Post payment',
        description: 'Record payment in billing system',
        icon: 'CheckCircle',
        color: '#059669',
        module: 'RCM'
      },
      {
        id: 'reconcile-remittance',
        name: 'Reconcile remittance',
        description: 'Match payment to claims and identify adjustments',
        icon: 'FileSpreadsheet',
        color: '#0284C7',
        module: 'RCM'
      },
      {
        id: 'update-account-balance',
        name: 'Update account balance',
        description: 'Refresh patient account with payment information',
        icon: 'RefreshCw',
        color: '#0284C7',
        module: 'RCM'
      }
    ],
    isActive: true
  },
  {
    id: 'rcm-6',
    name: 'Aging Report Generation',
    description: 'Generate and distribute accounts receivable aging reports',
    trigger: {
      id: 'on-schedule',
      name: 'On a schedule',
      description: 'Weekly on Monday at 8:00 AM',
      icon: 'Clock',
      color: '#0284C7'
    },
    actions: [
      {
        id: 'generate-aging-report',
        name: 'Generate aging report',
        description: 'Create accounts receivable aging analysis',
        icon: 'FileSpreadsheet',
        color: '#0284C7',
        module: 'RCM'
      },
      {
        id: 'identify-delinquent',
        name: 'Identify delinquent accounts',
        description: 'Flag accounts over 90 days past due',
        icon: 'AlertTriangle',
        color: '#DC2626',
        module: 'RCM'
      },
      {
        id: 'send-to-billing',
        name: 'Send to billing team',
        description: 'Distribute aging report to collections team',
        icon: 'Mail',
        color: '#DC2626',
        module: null
      }
    ],
    isActive: true
  },
  {
    id: 'rcm-7',
    name: 'Charge Capture Automation',
    description: 'Automatically capture and submit charges from clinical encounters',
    trigger: {
      id: 'encounter-completed',
      name: 'When encounter is completed',
      description: 'Clinical encounter closed in EHR',
      icon: 'CheckCircle',
      color: '#0284C7'
    },
    actions: [
      {
        id: 'extract-charges',
        name: 'Extract charges',
        description: 'Pull procedure and diagnosis codes from encounter',
        icon: 'FileText',
        color: '#0284C7',
        module: 'RCM'
      },
      {
        id: 'create-claim',
        name: 'Create claim',
        description: 'Generate claim with appropriate codes and modifiers',
        icon: 'FileCheck',
        color: '#0284C7',
        module: 'RCM'
      },
      {
        id: 'validate-codes',
        name: 'Validate codes',
        description: 'Verify CPT and ICD codes are valid and current',
        icon: 'CheckCircle',
        color: '#64748b',
        module: null
      }
    ],
    isActive: true
  }
];

const moduleConfigs = {
  'Population Health': {
    icon: 'Users',
    color: '#7C3AED',
    description: 'Manage patient populations, close care gaps, and drive HEDIS measure performance',
    agents: populationHealthAgents
  },
  'Value-Based Care': {
    icon: 'TrendingUp',
    color: '#059669',
    description: 'Track ACO performance, manage VBC contracts, and optimize quality metrics',
    agents: vbcAgents
  },
  'RCM': {
    icon: 'DollarSign',
    color: '#0284C7',
    description: 'Automate claims management, denial prevention, and prior authorization workflows',
    agents: rcmAgents
  },
  'Clinical Care': {
    icon: 'Heart',
    color: '#DC2626',
    description: 'Streamline clinical workflows, care planning, and post-discharge follow-up',
    agents: clinicalCareAgents
  },
  'Provider Engagement': {
    icon: 'UserCheck',
    color: '#0891b2',
    description: 'Drive provider performance, coding accuracy, and network optimization',
    agents: []
  },
  'Patient Experience': {
    icon: 'Smile',
    color: '#D97706',
    description: 'Improve patient satisfaction, access, and consumer engagement',
    agents: patientExperienceAgents
  }
};

const ProductFlowsView = ({ productName, onBack, onSelectFlow, onCreateFromTemplate, onShowHelp }) => {
  const config = moduleConfigs[productName] || moduleConfigs['Population Health'];
  const IconComponent = LucideIcons[config.icon];

  return (
    <div className="product-flows-view">
      <button className="back-link" onClick={onBack}>
        <ArrowLeft size={20} />
        <span>Back to Discover</span>
      </button>

      <div className="product-header">
        <div
          className="product-header-icon"
          style={{ backgroundColor: config.color + '15', color: config.color }}
        >
          <IconComponent size={32} />
        </div>
        <div className="product-header-info">
          <h1>{productName}</h1>
          <p>{config.description}</p>
        </div>
      </div>

      <div className="product-flows-section">
        <div className="section-header">
          <h2>Agent Templates</h2>
          <span className="flow-count">{config.agents.length} templates</span>
        </div>

        {config.agents.length === 0 ? (
          <div className="empty-product-flows">
            <p>No templates available for this domain yet.</p>
            <p>Click "New agent" to build your own automation.</p>
          </div>
        ) : (
          <div className="product-flow-list">
            {config.agents.map(agent => {
              const TriggerIcon = LucideIcons[agent.trigger.icon] || LucideIcons.Circle;

              return (
                <div key={agent.id} className="product-flow-card">
                  <div className="flow-card-header">
                    <div
                      className="flow-trigger-badge"
                      style={{ backgroundColor: agent.trigger.color + '15', color: agent.trigger.color }}
                    >
                      <TriggerIcon size={16} />
                      <span>{agent.trigger.name}</span>
                    </div>
                    {agent.isActive && (
                      <span className="recommended-badge">Recommended</span>
                    )}
                  </div>

                  <h3>{agent.name}</h3>
                  <p className="flow-description">{agent.description}</p>

                  <div className="flow-actions-preview">
                    <span className="actions-label">Actions:</span>
                    <div className="action-icons">
                      {agent.actions.map((action, idx) => {
                        const ActionIcon = LucideIcons[action.icon] || LucideIcons.Circle;
                        return (
                          <div
                            key={idx}
                            className="action-icon-small"
                            style={{ backgroundColor: action.color + '15', color: action.color }}
                            title={action.name}
                          >
                            <ActionIcon size={14} />
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="flow-card-actions">
                    {onShowHelp && (
                      <button
                        className="help-template-btn"
                        onClick={() => onShowHelp(agent)}
                        title="View detailed documentation"
                      >
                        <HelpCircle size={16} />
                        Help
                      </button>
                    )}
                    <button
                      className="use-template-btn"
                      onClick={() => onCreateFromTemplate(agent)}
                    >
                      Use this template
                    </button>
                    <button
                      className="preview-btn"
                      onClick={() => onSelectFlow(agent)}
                    >
                      Preview
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductFlowsView;
