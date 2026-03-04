import React, { useState } from 'react';
import { X, HelpCircle, MessageCircle, BookOpen, Info, ChevronRight, CheckCircle2 } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

const FlowHelpPanel = ({ flow, onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');

  if (!flow) return null;

  const getFlowDocumentation = (flowId) => {
    const docs = {
      'cc-1': {
        overview: {
          title: 'Post-Discharge Follow-Up Workflow',
          description: 'This automated workflow ensures seamless care transitions by automatically creating care tasks and notifying care managers immediately after a patient is discharged from the hospital.',
          useCases: [
            'Reduce readmission rates by ensuring timely follow-up',
            'Improve care coordination between hospital and ambulatory settings',
            'Ensure medication reconciliation is completed promptly',
            'Maintain continuity of care for high-risk patients'
          ],
          benefits: [
            'Reduces 30-day readmission rates by up to 25%',
            'Improves patient satisfaction scores',
            'Ensures care team is notified within minutes of discharge',
            'Automates manual care coordination tasks'
          ]
        },
        howItWorks: {
          steps: [
            {
              step: 1,
              title: 'Trigger: Patient Discharge Event',
              description: 'The workflow is automatically triggered when a discharge ADT (Admit, Discharge, Transfer) event is received from your EHR system. This event contains critical information including discharge date, time, discharge diagnosis, and discharge disposition.',
              technicalDetails: 'The system monitors FHIR ADT messages (specifically ADT^A03 for discharge) in real-time. When a discharge event is detected, the workflow immediately begins processing.',
              dataPoints: ['Patient ID', 'Discharge Date/Time', 'Discharge Diagnosis', 'Discharge Disposition', 'Attending Physician', 'Primary Care Provider']
            },
            {
              step: 2,
              title: 'Action 1: Create Care Plan',
              description: 'The system automatically generates a comprehensive post-discharge care plan that includes medication reconciliation, follow-up appointment scheduling, and patient education materials.',
              technicalDetails: 'The care plan is created using FHIR CarePlan resources. It pulls medication lists from the discharge summary, identifies potential drug interactions, and creates structured care plan activities.',
              dataPoints: ['Medication List', 'Allergies', 'Discharge Instructions', 'Follow-up Requirements', 'Dietary Restrictions', 'Activity Limitations']
            },
            {
              step: 3,
              title: 'Action 2: Create Care Team Task',
              description: 'A task is automatically assigned to the appropriate care coordinator or case manager for follow-up. The task includes patient information, discharge summary, and recommended follow-up actions.',
              technicalDetails: 'Tasks are created using FHIR Task resources and assigned based on patient risk level, care team assignments, and workload balancing algorithms.',
              dataPoints: ['Assigned Care Coordinator', 'Task Priority', 'Due Date (typically 24-48 hours post-discharge)', 'Patient Risk Score', 'Required Actions']
            },
            {
              step: 4,
              title: 'Action 3: Send Teams Notification',
              description: 'The care team receives an immediate notification via Microsoft Teams with a summary of the discharge, patient information, and a direct link to the care plan in Gravity.',
              technicalDetails: 'Notifications are sent via Microsoft Teams Graph API. The message includes an adaptive card with actionable buttons to view patient details, access care plan, and acknowledge receipt.',
              dataPoints: ['Notification Recipients (care team members)', 'Message Content', 'Deep Links to Gravity', 'Patient Summary']
            }
          ],
          executionFlow: 'The workflow executes sequentially: Trigger → Action 1 → Action 2 → Action 3. Each action must complete successfully before the next begins. If any action fails, the system retries up to 3 times with exponential backoff, and sends an alert to system administrators.',
          timing: 'Total execution time is typically 2-5 seconds. The care team receives notification within 30 seconds of discharge event.',
          errorHandling: 'If any step fails, the system logs the error, retries the failed action, and sends an alert. Critical failures trigger escalation to the care team lead.'
        },
        configuration: {
          triggerSettings: [
            { setting: 'EHR Integration', value: 'Configure which EHR systems to monitor (Epic, Cerner, etc.)' },
            { setting: 'Event Types', value: 'Select which ADT event types to process (standard discharge, AMA, etc.)' },
            { setting: 'Patient Filters', value: 'Optionally filter by patient demographics, insurance, or risk level' }
          ],
          actionSettings: [
            { setting: 'Care Plan Template', value: 'Select or customize the care plan template to use' },
            { setting: 'Task Assignment Rules', value: 'Configure how tasks are assigned (round-robin, by specialty, by workload)' },
            { setting: 'Notification Recipients', value: 'Define which care team members receive notifications' },
            { setting: 'Notification Channels', value: 'Choose notification methods (Teams, Email, SMS, In-app)' }
          ]
        },
        monitoring: {
          metrics: [
            'Number of discharges processed per day',
            'Average time from discharge to care team notification',
            'Task completion rates',
            'Readmission rates for patients in workflow'
          ],
          alerts: [
            'Workflow execution failures',
            'Delayed task assignments',
            'Unacknowledged notifications'
          ]
        }
      },
      'cc-2': {
        overview: {
          title: 'Readmission Risk Alert Workflow',
          description: 'This intelligent workflow uses predictive analytics to identify patients at high risk for readmission and automatically triggers enhanced care interventions.',
          useCases: [
            'Prevent avoidable readmissions',
            'Identify high-risk patients before discharge',
            'Allocate care resources to patients who need them most',
            'Improve quality metrics and reduce penalties'
          ],
          benefits: [
            'Reduces readmission rates by 15-30%',
            'Improves risk stratification accuracy',
            'Enables proactive care management',
            'Reduces healthcare costs'
          ]
        },
        howItWorks: {
          steps: [
            {
              step: 1,
              title: 'Trigger: Readmission Risk Flagged',
              description: 'The workflow triggers when a patient\'s calculated 30-day readmission probability exceeds 40%. This calculation happens in real-time using clinical data, social determinants, and historical patterns.',
              technicalDetails: 'The risk model analyzes over 50 variables including: diagnosis codes, length of stay, number of medications, previous admissions, social determinants of health, and comorbidities. The model runs continuously and updates risk scores as new data arrives.',
              dataPoints: ['Risk Score (0-100%)', 'Risk Factors Identified', 'Model Confidence Level', 'Last Updated Timestamp']
            },
            {
              step: 2,
              title: 'Action 1: Run Readmission Risk Model',
              description: 'The AI-powered risk stratification model performs a comprehensive analysis using machine learning algorithms trained on historical readmission data.',
              technicalDetails: 'Uses gradient boosting (XGBoost) model trained on 3+ years of historical data. The model is retrained monthly with new data. Feature engineering includes temporal patterns, medication complexity scores, and social risk factors.',
              dataPoints: ['Model Version', 'Feature Importance Scores', 'Predicted Readmission Probability', 'Top Risk Factors', 'Model Confidence Interval']
            },
            {
              step: 3,
              title: 'Action 2: Create Enhanced Care Plan',
              description: 'An enhanced discharge care plan is automatically generated with specific interventions tailored to the identified risk factors.',
              technicalDetails: 'The care plan is dynamically generated based on risk factors. For example, if medication non-adherence is a risk factor, the plan includes medication management support. If transportation is an issue, it includes transportation assistance.',
              dataPoints: ['Risk-Specific Interventions', 'Follow-up Schedule', 'Resource Requirements', 'Patient Education Materials']
            },
            {
              step: 4,
              title: 'Action 3: Push In-App Notification',
              description: 'Care coordinators receive an immediate in-app notification in Gravity with patient details, risk score, and recommended actions.',
              technicalDetails: 'Notifications use Firebase Cloud Messaging for real-time delivery. The notification includes deep links to patient record, care plan, and risk assessment details.',
              dataPoints: ['Notification Priority', 'Patient Summary', 'Risk Score', 'Recommended Actions', 'Deep Links']
            }
          ],
          executionFlow: 'Trigger → Risk Model Execution (1-3 seconds) → Care Plan Generation (2-4 seconds) → Notification Delivery (< 1 second). Total time: 3-8 seconds.',
          timing: 'The workflow executes within seconds of risk threshold being exceeded. Notifications are delivered in real-time.',
          errorHandling: 'If the risk model fails, the system falls back to a simplified risk calculation. All errors are logged and monitored.'
        },
        configuration: {
          triggerSettings: [
            { setting: 'Risk Threshold', value: 'Configure the readmission probability threshold (default: 40%)' },
            { setting: 'Risk Model Version', value: 'Select which risk model version to use' },
            { setting: 'Update Frequency', value: 'How often to recalculate risk scores' }
          ],
          actionSettings: [
            { setting: 'Care Plan Templates', value: 'Define care plan templates for different risk levels' },
            { setting: 'Notification Rules', value: 'Configure who receives notifications based on risk score' },
            { setting: 'Escalation Rules', value: 'Define escalation paths for very high-risk patients' }
          ]
        },
        monitoring: {
          metrics: [
            'Number of high-risk patients identified',
            'Model accuracy and calibration',
            'Care plan adherence rates',
            'Actual readmission rates vs predicted'
          ],
          alerts: [
            'Model performance degradation',
            'High false positive/negative rates',
            'Care plan non-adherence'
          ]
        }
      },
      'px-1': {
        overview: {
          title: 'Appointment Reminder Automation',
          description: 'This patient engagement workflow automatically sends personalized appointment reminders through patients\' preferred communication channels, reducing no-shows and improving patient satisfaction.',
          useCases: [
            'Reduce appointment no-show rates',
            'Improve patient engagement',
            'Reduce manual reminder workload',
            'Increase appointment adherence'
          ],
          benefits: [
            'Reduces no-show rates by 20-40%',
            'Improves patient satisfaction scores',
            'Saves staff time on manual reminders',
            'Increases revenue through better appointment utilization'
          ]
        },
        howItWorks: {
          steps: [
            {
              step: 1,
              title: 'Trigger: Appointment Scheduled',
              description: 'The workflow triggers immediately when a new appointment is created in your scheduling system, whether through the patient portal, phone scheduling, or provider-initiated booking.',
              technicalDetails: 'Monitors scheduling system via API integration (Epic MyChart, Cerner HealtheLife, or custom scheduling system). Captures appointment details including date, time, provider, location, appointment type, and patient contact preferences.',
              dataPoints: ['Appointment Date/Time', 'Provider Name', 'Location', 'Appointment Type', 'Patient Contact Preferences', 'Patient Phone/Email']
            },
            {
              step: 2,
              title: 'Action 1: Send Appointment Reminder',
              description: 'A personalized reminder is sent via the patient\'s preferred channel (SMS, email, or automated phone call) 24-48 hours before the appointment.',
              technicalDetails: 'Uses Twilio for SMS, SendGrid for email, and Amazon Connect for phone calls. Messages are personalized with patient name, appointment details, and provider information. Includes calendar file attachments for email reminders.',
              dataPoints: ['Reminder Content', 'Delivery Channel', 'Delivery Status', 'Patient Response (if applicable)']
            },
            {
              step: 3,
              title: 'Action 2: Send Pre-Visit Instructions',
              description: 'Patients receive preparation instructions, required forms, and any special instructions (fasting requirements, medication adjustments, etc.) based on appointment type.',
              technicalDetails: 'Instructions are pulled from appointment type templates. For lab appointments, includes fasting instructions. For procedures, includes preparation requirements. Forms are pre-filled with known patient information when possible.',
              dataPoints: ['Instruction Template', 'Required Forms', 'Special Instructions', 'Patient Preparation Checklist']
            }
          ],
          executionFlow: 'Appointment Created → Immediate: Schedule Reminder (24-48h before) → Immediate: Send Pre-Visit Instructions → Reminder Sent at Scheduled Time → Track Delivery Status',
          timing: 'Initial actions (scheduling reminders) happen immediately. Actual reminders are sent 24-48 hours before appointment based on configuration.',
          errorHandling: 'If primary communication channel fails, system automatically tries backup channel. All delivery failures are logged and can trigger manual follow-up.'
        },
        configuration: {
          triggerSettings: [
            { setting: 'Scheduling System Integration', value: 'Configure which scheduling systems to monitor' },
            { setting: 'Appointment Type Filters', value: 'Select which appointment types trigger reminders' },
            { setting: 'Patient Filters', value: 'Optionally exclude certain patient groups' }
          ],
          actionSettings: [
            { setting: 'Reminder Timing', value: 'Configure when to send reminders (24h, 48h, or both)' },
            { setting: 'Communication Channels', value: 'Set patient communication preferences and fallback options' },
            { setting: 'Message Templates', value: 'Customize reminder message content and tone' },
            { setting: 'Pre-Visit Instructions', value: 'Configure instruction templates by appointment type' }
          ]
        },
        monitoring: {
          metrics: [
            'Reminder delivery success rate',
            'No-show rate reduction',
            'Patient engagement rates',
            'Cost per reminder'
          ],
          alerts: [
            'High delivery failure rates',
            'Unusual no-show patterns',
            'Communication channel issues'
          ]
        }
      },
      'cc-3': {
        overview: {
          title: 'Medication Reconciliation Workflow',
          description: 'This safety-focused workflow ensures medication accuracy by automatically reconciling medications when new prescriptions are added, preventing medication errors and adverse drug events.',
          useCases: [
            'Prevent medication errors during care transitions',
            'Identify drug-drug interactions before prescribing',
            'Ensure medication continuity across care settings',
            'Reduce adverse drug events'
          ],
          benefits: [
            'Reduces medication errors by 40-60%',
            'Prevents adverse drug events',
            'Improves medication adherence',
            'Ensures continuity of medication management'
          ]
        },
        howItWorks: {
          steps: [
            {
              step: 1,
              title: 'Trigger: Medication Prescribed',
              description: 'The workflow triggers when a new prescription order is created in the EHR system, whether during an office visit, hospital admission, or discharge.',
              technicalDetails: 'Monitors FHIR MedicationRequest resources in real-time. Captures prescription details including medication name, dosage, frequency, route, and prescribing provider.',
              dataPoints: ['Medication Name', 'Dosage', 'Frequency', 'Route', 'Prescribing Provider', 'Order Date/Time']
            },
            {
              step: 2,
              title: 'Action 1: Reconcile Medications',
              description: 'The system automatically compares the new prescription with the patient\'s current medication list from multiple sources including EHR, pharmacy records, and patient-reported medications.',
              technicalDetails: 'Uses FHIR MedicationStatement and MedicationRequest resources. Performs semantic matching of medication names, normalizes dosages, and identifies duplicates, discontinuations, and additions.',
              dataPoints: ['Current Medication List', 'New Prescription', 'Medication History', 'Allergies', 'Previous Reactions']
            },
            {
              step: 3,
              title: 'Action 2: Check Drug Interactions',
              description: 'The system checks for potential drug-drug interactions, drug-allergy interactions, and contraindications using clinical decision support databases.',
              technicalDetails: 'Integrates with drug interaction databases (e.g., Micromedex, First Databank). Uses machine learning models to assess interaction severity and clinical significance.',
              dataPoints: ['Interaction Severity', 'Interaction Type', 'Clinical Significance', 'Recommended Actions', 'Alternative Medications']
            },
            {
              step: 4,
              title: 'Action 3: Create Pharmacist Review Task',
              description: 'If conflicts or significant interactions are detected, a task is automatically created for clinical pharmacist review with all relevant medication information.',
              technicalDetails: 'Creates FHIR Task resource with high priority. Includes medication reconciliation report, interaction details, and recommended actions.',
              dataPoints: ['Task Priority', 'Assigned Pharmacist', 'Reconciliation Report', 'Interaction Details', 'Due Date']
            }
          ],
          executionFlow: 'Prescription Created → Medication Reconciliation (1-2 seconds) → Drug Interaction Check (2-3 seconds) → Task Creation (if needed) (< 1 second). Total time: 3-6 seconds.',
          timing: 'Workflow executes within seconds of prescription creation. Pharmacist receives task immediately if conflicts detected.',
          errorHandling: 'If reconciliation fails, system falls back to manual reconciliation flag. All errors are logged and trigger alerts to pharmacy team.'
        },
        configuration: {
          triggerSettings: [
            { setting: 'EHR Integration', value: 'Configure which EHR systems to monitor for prescriptions' },
            { setting: 'Prescription Types', value: 'Select which prescription types to process (new, renewal, change)' },
            { setting: 'Patient Filters', value: 'Optionally filter by patient demographics or conditions' }
          ],
          actionSettings: [
            { setting: 'Interaction Database', value: 'Select drug interaction database to use' },
            { setting: 'Interaction Severity Threshold', value: 'Configure minimum severity level to trigger pharmacist review' },
            { setting: 'Task Assignment Rules', value: 'Define how pharmacist tasks are assigned' },
            { setting: 'Reconciliation Sources', value: 'Configure which medication sources to reconcile' }
          ]
        },
        monitoring: {
          metrics: [
            'Number of medications reconciled',
            'Drug interaction detection rate',
            'Pharmacist review task completion time',
            'Medication error reduction rate'
          ],
          alerts: [
            'High interaction detection rates',
            'Reconciliation failures',
            'Delayed pharmacist reviews'
          ]
        }
      },
      'px-2': {
        overview: {
          title: 'Post-Visit Satisfaction Survey',
          description: 'This patient experience workflow automatically captures patient feedback immediately after appointments, enabling real-time monitoring of patient satisfaction and identification of improvement opportunities.',
          useCases: [
            'Monitor patient satisfaction in real-time',
            'Identify areas for service improvement',
            'Demonstrate commitment to patient-centered care',
            'Track patient experience metrics'
          ],
          benefits: [
            'Improves patient satisfaction scores',
            'Enables proactive issue resolution',
            'Provides actionable feedback for care teams',
            'Supports quality improvement initiatives'
          ]
        },
        howItWorks: {
          steps: [
            {
              step: 1,
              title: 'Trigger: Appointment Completed',
              description: 'The workflow triggers when an appointment encounter is closed in the EHR, indicating the visit has been completed.',
              technicalDetails: 'Monitors FHIR Encounter resources for status changes to "finished". Captures encounter details including provider, appointment type, duration, and location.',
              dataPoints: ['Encounter ID', 'Provider Name', 'Appointment Type', 'Visit Date/Time', 'Location', 'Patient ID']
            },
            {
              step: 2,
              title: 'Action 1: Send Satisfaction Survey',
              description: 'A satisfaction survey (NPS or CAHPS) is automatically delivered via the patient\'s preferred communication channel within hours of visit completion.',
              technicalDetails: 'Uses Twilio for SMS, SendGrid for email. Surveys are personalized with patient name, provider name, and visit date. Includes survey link or embedded questions based on channel.',
              dataPoints: ['Survey Type', 'Delivery Channel', 'Survey Content', 'Delivery Status', 'Response Rate']
            },
            {
              step: 3,
              title: 'Action 2: Analyze Patient Feedback',
              description: 'Survey responses are automatically processed using AI-powered sentiment analysis to identify themes, trends, and specific improvement opportunities.',
              technicalDetails: 'Uses natural language processing to analyze free-text responses. Categorizes feedback by theme (wait time, communication, care quality, etc.). Calculates sentiment scores and identifies actionable insights.',
              dataPoints: ['Sentiment Score', 'Feedback Themes', 'Improvement Opportunities', 'Trend Analysis', 'Provider-Specific Insights']
            }
          ],
          executionFlow: 'Appointment Completed → Survey Scheduled (immediate) → Survey Sent (within 2-4 hours) → Response Received → Analysis Performed (automatic) → Insights Delivered to Care Team',
          timing: 'Survey is sent within 2-4 hours of appointment completion. Analysis happens automatically when responses are received.',
          errorHandling: 'If primary communication channel fails, system tries backup channel. Survey delivery failures are logged and can trigger manual follow-up.'
        },
        configuration: {
          triggerSettings: [
            { setting: 'Encounter Types', value: 'Select which encounter types trigger surveys (office visits, procedures, etc.)' },
            { setting: 'Timing', value: 'Configure when to send survey (immediate, 2 hours, 4 hours, next day)' },
            { setting: 'Patient Filters', value: 'Optionally exclude certain patient groups or conditions' }
          ],
          actionSettings: [
            { setting: 'Survey Type', value: 'Select survey type (NPS, CAHPS, custom)' },
            { setting: 'Communication Channels', value: 'Configure patient communication preferences' },
            { setting: 'Analysis Rules', value: 'Define sentiment analysis and categorization rules' },
            { setting: 'Reporting Recipients', value: 'Configure who receives survey insights and reports' }
          ]
        },
        monitoring: {
          metrics: [
            'Survey response rate',
            'Average satisfaction scores',
            'Sentiment trends over time',
            'Provider-specific satisfaction scores'
          ],
          alerts: [
            'Low response rates',
            'Negative sentiment trends',
            'Specific patient complaints requiring follow-up'
          ]
        }
      }
    };

    // Return default documentation if specific flow not found
    return docs[flowId] || {
      overview: {
        title: flow.name || 'Flow Documentation',
        description: flow.description || 'Detailed information about this workflow.',
        useCases: ['Use case information will be available soon'],
        benefits: ['Benefit information will be available soon']
      },
      howItWorks: {
        steps: [
          {
            step: 1,
            title: 'Trigger',
            description: flow.trigger?.description || 'Workflow trigger information',
            technicalDetails: 'Technical details will be available soon',
            dataPoints: ['Data point information']
          }
        ],
        executionFlow: 'Execution flow details will be available soon',
        timing: 'Timing information will be available soon',
        errorHandling: 'Error handling information will be available soon'
      }
    };
  };

  const documentation = getFlowDocumentation(flow.id);
  const TriggerIcon = flow.trigger ? LucideIcons[flow.trigger.icon] : null;

  return (
    <div className="flow-help-panel-overlay" onClick={onClose}>
      <div className="flow-help-panel" onClick={(e) => e.stopPropagation()}>
        <div className="help-panel-header">
          <div className="help-panel-title">
            <HelpCircle size={24} />
            <h2>Flow Documentation & Help</h2>
          </div>
          <button className="help-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="help-panel-content">
          <div className="help-flow-summary">
            {TriggerIcon && (
              <div 
                className="help-flow-icon"
                style={{ backgroundColor: flow.trigger.color + '15', color: flow.trigger.color }}
              >
                <TriggerIcon size={32} />
              </div>
            )}
            <div className="help-flow-info">
              <h3>{flow.name}</h3>
              <p>{flow.description}</p>
            </div>
          </div>

          <div className="help-tabs">
            <button 
              className={`help-tab ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              <BookOpen size={16} />
              Overview
            </button>
            <button 
              className={`help-tab ${activeTab === 'howItWorks' ? 'active' : ''}`}
              onClick={() => setActiveTab('howItWorks')}
            >
              <Info size={16} />
              How It Works
            </button>
            <button 
              className={`help-tab ${activeTab === 'configuration' ? 'active' : ''}`}
              onClick={() => setActiveTab('configuration')}
            >
              <CheckCircle2 size={16} />
              Configuration
            </button>
          </div>

          <div className="help-content">
            {activeTab === 'overview' && (
              <div className="help-section">
                <h4>Overview</h4>
                <p className="help-description">{documentation.overview.description}</p>
                
                <div className="help-subsection">
                  <h5>Use Cases</h5>
                  <ul>
                    {documentation.overview.useCases.map((useCase, idx) => (
                      <li key={idx}>{useCase}</li>
                    ))}
                  </ul>
                </div>

                <div className="help-subsection">
                  <h5>Benefits</h5>
                  <ul>
                    {documentation.overview.benefits.map((benefit, idx) => (
                      <li key={idx}>{benefit}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'howItWorks' && (
              <div className="help-section">
                <h4>How This Flow Works</h4>
                
                {documentation.howItWorks.steps.map((step, idx) => (
                  <div key={idx} className="help-step">
                    <div className="help-step-header">
                      <span className="help-step-number">{step.step}</span>
                      <h5>{step.title}</h5>
                    </div>
                    <p className="help-step-description">{step.description}</p>
                    
                    <div className="help-step-details">
                      <strong>Technical Details:</strong>
                      <p>{step.technicalDetails}</p>
                    </div>

                    <div className="help-step-details">
                      <strong>Data Points Captured:</strong>
                      <ul>
                        {step.dataPoints.map((point, pIdx) => (
                          <li key={pIdx}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}

                <div className="help-subsection">
                  <h5>Execution Flow</h5>
                  <p>{documentation.howItWorks.executionFlow}</p>
                </div>

                <div className="help-subsection">
                  <h5>Timing</h5>
                  <p>{documentation.howItWorks.timing}</p>
                </div>

                <div className="help-subsection">
                  <h5>Error Handling</h5>
                  <p>{documentation.howItWorks.errorHandling}</p>
                </div>
              </div>
            )}

            {activeTab === 'configuration' && (
              <div className="help-section">
                <h4>Configuration Options</h4>
                
                <div className="help-subsection">
                  <h5>Trigger Settings</h5>
                  <ul>
                    {documentation.configuration.triggerSettings.map((setting, idx) => (
                      <li key={idx}>
                        <strong>{setting.setting}:</strong> {setting.value}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="help-subsection">
                  <h5>Action Settings</h5>
                  <ul>
                    {documentation.configuration.actionSettings.map((setting, idx) => (
                      <li key={idx}>
                        <strong>{setting.setting}:</strong> {setting.value}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="help-subsection">
                  <h5>Monitoring & Metrics</h5>
                  <ul>
                    {documentation.monitoring.metrics.map((metric, idx) => (
                      <li key={idx}>{metric}</li>
                    ))}
                  </ul>
                </div>

                <div className="help-subsection">
                  <h5>Alerts</h5>
                  <ul>
                    {documentation.monitoring.alerts.map((alert, idx) => (
                      <li key={idx}>{alert}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlowHelpPanel;
