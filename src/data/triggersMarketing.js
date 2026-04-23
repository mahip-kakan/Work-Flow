// Triggers for the Marketing workspace (editor + templates)

export const marketingTriggerCategories = [
  {
    id: 'schedules',
    name: 'Schedules',
    icon: 'Clock',
    triggers: [
      {
        id: 'on-schedule',
        name: 'On a schedule',
        description: 'Daily, weekly, or monthly marketing ops runs',
        icon: 'Clock',
        color: '#0284C7',
      },
    ],
  },
  {
    id: 'campaign-lifecycle',
    name: 'Campaign lifecycle',
    icon: 'Megaphone',
    triggers: [
      {
        id: 'campaign-ends',
        name: 'When campaign ends',
        description: 'Paid, lifecycle, or nurture campaign reaches end date',
        icon: 'Flag',
        color: '#7C3AED',
      },
      {
        id: 'experiment-concludes',
        name: 'When A/B experiment concludes',
        description: 'Test window closed or significance threshold met',
        icon: 'FlaskConical',
        color: '#7C3AED',
      },
    ],
  },
  {
    id: 'content-brand',
    name: 'Content & brand',
    icon: 'FileText',
    triggers: [
      {
        id: 'content-published',
        name: 'When long-form content is published',
        description: 'Blog, guide, or pillar page goes live in the CMS',
        icon: 'FileText',
        color: '#059669',
      },
      {
        id: 'brief-uploaded',
        name: 'When marketing brief is uploaded',
        description: 'Brief lands in workspace or intake form submitted',
        icon: 'Upload',
        color: '#D97706',
      },
    ],
  },
  {
    id: 'events',
    name: 'Events & field',
    icon: 'Video',
    triggers: [
      {
        id: 'webinar-ends',
        name: 'When webinar or field event ends',
        description: 'Session completed; attendee list finalized',
        icon: 'Video',
        color: '#0284C7',
      },
    ],
  },
];
