/** HR glossary categories for HRGlossary + AIChatPanel (vendor-neutral, not legal advice) */
export const hrGlossaryData = {
  'HRBP & employee lifecycle': [
    {
      term: 'HRBP (HR Business Partner)',
      definition: 'An HR professional aligned to a business unit who helps leaders with workforce planning, employee relations topics, policy interpretation, and people programs.',
      example: 'An HRBP might partner with sales leadership on headcount planning and manager coaching.'
    },
    {
      term: 'Employee lifecycle',
      definition: 'The stages an employee moves through from attract/hire to onboard, develop, perform, transfer/promote, and eventually exit.',
      example: 'Automation often spans hire date, role changes, and offboarding tasks across teams.'
    },
    {
      term: 'Case management (HR)',
      definition: 'Tracking employee or manager requests through a defined process with ownership, SLAs, and audit history.',
      example: 'A workplace accommodation request routed to HRBP with tasks and approvals.'
    },
    {
      term: 'Policy acknowledgment',
      definition: 'Employees confirm they have read or completed required policies or training; systems record who acknowledged and when.',
      example: 'Annual code of conduct refresh with tracked completion before a deadline.'
    }
  ],
  'Talent acquisition': [
    {
      term: 'Requisition (req)',
      definition: 'An approved request to hire for a specific role, budget, and location before recruiting sources candidates.',
      example: 'Finance approves a req for a senior analyst before the recruiter opens the job post.'
    },
    {
      term: 'ATS (Applicant Tracking System)',
      definition: 'Software used to post jobs, track candidates through stages, collect feedback, and manage offers.',
      example: 'Moving a candidate from "phone screen" to "onsite" when the panel is scheduled.'
    },
    {
      term: 'Scorecard / interview feedback',
      definition: 'Structured feedback after interviews so hiring decisions are consistent and documented.',
      example: 'Reminder nudges when a panelist has not submitted feedback 24 hours after an interview.'
    },
    {
      term: 'Offer contingencies',
      definition: 'Conditions that must be satisfied before employment starts, such as background check or right-to-work verification.',
      example: 'Workflow pauses onboarding tasks until background status returns clear.'
    }
  ],
  'People ops & systems': [
    {
      term: 'HRIS (Human Resources Information System)',
      definition: 'System of record for employee data: job, manager, compensation fields, dates, and org structure.',
      example: 'Start date changes in HRIS trigger provisioning and welcome-task automation.'
    },
    {
      term: 'Provisioning (access)',
      definition: 'Creating or updating user accounts and application roles so people have the right access on day one and lose access on exit.',
      example: 'IT tickets created automatically from an onboarding template when hire is confirmed.'
    },
    {
      term: 'Effective dating',
      definition: 'Recording when a data change is valid in HRIS so payroll and reporting reflect the correct state over time.',
      example: 'A promotion effective next pay period should not change reporting until that date.'
    },
    {
      term: 'Data quality exception',
      definition: 'A record failed validation or integration rules (duplicate employee, missing cost center, invalid manager ID).',
      example: 'Route exceptions to People ops with suggested fixes and owner assignment.'
    }
  ],
  'Compliance & data (overview)': [
    {
      term: 'I-9 (US context)',
      definition: 'A US form used to verify employment eligibility; processes often include deadlines and secure storage requirements.',
      example: 'Remind managers and new hires to complete verification within the required timeframe.'
    },
    {
      term: 'Audit trail',
      definition: 'A chronological record of who changed what in HR systems—important for investigations and compliance reviews.',
      example: 'Salary change captured with approver, timestamp, and reason code.'
    }
  ]
};
