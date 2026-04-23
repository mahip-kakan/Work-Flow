// Trigger configurations for Health Flow — healthcare-oriented demo workflows
import { hrTriggerCategories } from './triggersHr.js';
import { marketingTriggerCategories } from './triggersMarketing.js';

export const triggerCategories = [
  {
    id: 'schedule',
    name: 'Schedule',
    icon: 'Clock',
    triggers: [
      {
        id: 'on-schedule',
        name: 'On a schedule',
        description: 'Run at specific times (daily, weekly, monthly)',
        icon: 'Clock',
        color: '#0284C7'
      },
      {
        id: 'fiscal-quarter',
        name: 'Fiscal quarter event',
        description: 'Trigger at start or end of fiscal quarter',
        icon: 'Calendar',
        color: '#0284C7'
      },
      {
        id: 'contract-period',
        name: 'Contract performance period start',
        description: 'Trigger when a new VBC contract period begins',
        icon: 'FileText',
        color: '#0284C7'
      }
    ]
  },
  {
    id: 'clinical-events',
    name: 'Clinical Events',
    icon: 'Heart',
    triggers: [
      {
        id: 'patient-admission',
        name: 'When patient is admitted',
        description: 'ADT admission event received from EHR (Epic/Cerner)',
        icon: 'LogIn',
        color: '#DC2626'
      },
      {
        id: 'patient-discharge',
        name: 'When patient is discharged',
        description: 'Discharge ADT event received from EHR',
        icon: 'LogOut',
        color: '#DC2626'
      },
      {
        id: 'lab-result-received',
        name: 'When lab result is received',
        description: 'Critical or abnormal lab result delivered via FHIR',
        icon: 'Microscope',
        color: '#DC2626'
      },
      {
        id: 'medication-adherence-alert',
        name: 'When medication adherence alert fires',
        description: 'Patient missed medication refill or dose threshold',
        icon: 'Pill',
        color: '#DC2626'
      },
      {
        id: 'care-plan-updated',
        name: 'When care plan is updated',
        description: 'Care plan modified or approved in clinical system',
        icon: 'ClipboardCheck',
        color: '#DC2626'
      }
    ]
  },
  {
    id: 'population-health-alerts',
    name: 'Population Health Alerts',
    icon: 'Users',
    triggers: [
      {
        id: 'care-gap-identified',
        name: 'When care gap is identified',
        description: 'HEDIS measure gap detected for a patient cohort',
        icon: 'ClipboardList',
        color: '#7C3AED'
      },
      {
        id: 'risk-score-threshold',
        name: 'When risk score threshold is breached',
        description: 'Patient risk score exceeds configured high-risk threshold',
        icon: 'AlertTriangle',
        color: '#7C3AED'
      },
      {
        id: 'readmission-risk-flagged',
        name: 'When readmission risk is flagged',
        description: '30-day readmission probability exceeds threshold',
        icon: 'TrendingUp',
        color: '#7C3AED'
      },
      {
        id: 'hedis-gap-detected',
        name: 'When HEDIS measure gap is detected',
        description: 'Quality measure non-compliance identified in cohort',
        icon: 'BarChart2',
        color: '#7C3AED'
      },
      {
        id: 'outreach-non-response',
        name: 'When outreach goes unanswered',
        description: 'Patient did not respond to outreach within configured days',
        icon: 'PhoneMissed',
        color: '#7C3AED'
      }
    ]
  },
  {
    id: 'data-events',
    name: 'Data Events',
    icon: 'Database',
    triggers: [
      {
        id: 'ehr-data-ingested',
        name: 'When EHR data is ingested',
        description: 'FHIR data pipeline completes for Epic, Cerner, or MEDITECH',
        icon: 'Database',
        color: '#059669'
      },
      {
        id: 'claims-data-received',
        name: 'When claims data is received',
        description: 'Payer claims batch delivered and processed',
        icon: 'FileSpreadsheet',
        color: '#059669'
      },
      {
        id: 'quality-measure-refresh',
        name: 'When quality measure refresh completes',
        description: 'HEDIS or Star Rating measure recalculation finishes',
        icon: 'RefreshCw',
        color: '#059669'
      },
      {
        id: 'payer-data-sync-complete',
        name: 'When payer data sync completes',
        description: 'Eligibility and benefit data synced from payer',
        icon: 'Link',
        color: '#059669'
      },
      {
        id: 'sdoh-data-updated',
        name: 'When SDOH data is updated',
        description: 'Social determinants of health record refreshed',
        icon: 'Globe',
        color: '#059669'
      }
    ]
  },
  {
    id: 'user-actions',
    name: 'User Actions',
    icon: 'User',
    triggers: [
      {
        id: 'care-plan-approved',
        name: 'When care plan is approved',
        description: 'Care team lead approves patient care plan',
        icon: 'ClipboardCheck',
        color: '#D97706'
      },
      {
        id: 'patient-list-uploaded',
        name: 'When patient list is uploaded',
        description: 'CSV or Excel patient roster uploaded by care coordinator',
        icon: 'Upload',
        color: '#D97706'
      },
      {
        id: 'quality-report-submitted',
        name: 'When quality report is submitted',
        description: 'Quality measure report submitted for review',
        icon: 'Send',
        color: '#D97706'
      },
      {
        id: 'contract-milestone-reached',
        name: 'When contract milestone is reached',
        description: 'VBC contract target or milestone manually marked achieved',
        icon: 'Award',
        color: '#D97706'
      }
    ]
  }
];

export const getAllTriggers = () => {
  return triggerCategories.flatMap(category => category.triggers);
};

/** @param {'healthcare' | 'hr' | 'marketing'} vertical */
export const getTriggerCategories = (vertical) => {
  if (vertical === 'hr') return hrTriggerCategories;
  if (vertical === 'marketing') return marketingTriggerCategories;
  return triggerCategories;
};
