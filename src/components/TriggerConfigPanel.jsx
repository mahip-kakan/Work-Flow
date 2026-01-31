import React, { useState } from 'react';
import { X, Clock, AlertTriangle, TrendingDown, CheckCircle, Database, Upload, Package } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

const schedulePresets = [
  { id: 'monday-8am', label: 'Monday at 8 AM' },
  { id: 'weekdays-8am', label: 'Weekdays at 8 AM' },
  { id: 'in-5-min', label: 'In 5 minutes' },
];

const repeatOptions = [
  { id: 'none', label: 'Does not repeat' },
  { id: 'daily', label: 'Daily' },
  { id: 'weekly', label: 'Weekly' },
  { id: 'weekly-monday', label: 'Weekly on Monday' },
  { id: 'monthly', label: 'Monthly' },
];

const endOptions = [
  { id: 'never', label: 'Never' },
  { id: '1-month', label: '1 month' },
  { id: '3-months', label: '3 months' },
  { id: '6-months', label: '6 months' },
  { id: '1-year', label: '1 year' },
];

const timezones = [
  { id: 'ist', label: '(GMT+05:30) India Time' },
  { id: 'est', label: '(GMT-05:00) Eastern Time' },
  { id: 'pst', label: '(GMT-08:00) Pacific Time' },
  { id: 'utc', label: '(GMT+00:00) UTC' },
];

const kpiOptions = [
  { id: 'woh', label: 'Weeks of Hand (WOH)' },
  { id: 'wos', label: 'Weeks of Supply (WOS)' },
  { id: 'forecast-accuracy', label: 'Forecast Accuracy' },
  { id: 'sell-through', label: 'Sell-Through Rate' },
  { id: 'inventory-turnover', label: 'Inventory Turnover' },
  { id: 'gross-margin', label: 'Gross Margin' },
];

const conditionOptions = [
  { id: 'less-than', label: 'Less than' },
  { id: 'greater-than', label: 'Greater than' },
  { id: 'equals', label: 'Equals' },
  { id: 'not-equals', label: 'Not equals' },
];

const deviationTypes = [
  { id: 'forecast-vs-actual', label: 'Forecast vs Actual' },
  { id: 'plan-vs-actual', label: 'Plan vs Actual' },
  { id: 'ly-vs-ty', label: 'Last Year vs This Year' },
];

const granularityOptions = [
  { id: 'sku', label: 'SKU' },
  { id: 'style-color', label: 'Style-Color' },
  { id: 'style', label: 'Style' },
  { id: 'class', label: 'Class' },
  { id: 'department', label: 'Department' },
];

const TriggerConfigPanel = ({ trigger, onClose, onSave }) => {
  const [config, setConfig] = useState({
    // Schedule configs
    selectedPreset: null,
    date: '2026-02-02',
    time: '08:00',
    repeat: 'weekly-monday',
    ends: '1-year',
    timezone: 'ist',
    // KPI configs
    kpi: 'woh',
    condition: 'less-than',
    threshold: '2',
    applyTo: 'all',
    checkFrequency: 'daily-6am',
    // Deviation configs
    deviationType: 'forecast-vs-actual',
    deviationThreshold: '15',
    direction: 'both',
    granularity: 'style-color',
  });

  const IconComponent = LucideIcons[trigger?.icon] || Clock;

  const handlePresetClick = (presetId) => {
    setConfig({ ...config, selectedPreset: presetId });
  };

  const renderScheduleConfig = () => (
    <>
      <div className="config-description">
        Start at a set date and time. Have it run once or repeat on a schedule.
      </div>

      <div className="config-section">
        <label className="config-label">Quick presets</label>
        <div className="preset-buttons">
          {schedulePresets.map(preset => (
            <button
              key={preset.id}
              className={`preset-btn ${config.selectedPreset === preset.id ? 'active' : ''}`}
              onClick={() => handlePresetClick(preset.id)}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      <div className="config-section">
        <label className="config-label">Start date and time</label>
        <div className="datetime-row">
          <div className="input-group">
            <label>Date*</label>
            <input
              type="date"
              value={config.date}
              onChange={(e) => setConfig({ ...config, date: e.target.value })}
            />
          </div>
          <div className="input-group">
            <label>Time*</label>
            <div className="time-input">
              <Clock size={16} />
              <input
                type="time"
                value={config.time}
                onChange={(e) => setConfig({ ...config, time: e.target.value })}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="config-section">
        <label className="config-label">Repeat*</label>
        <select
          value={config.repeat}
          onChange={(e) => setConfig({ ...config, repeat: e.target.value })}
        >
          {repeatOptions.map(opt => (
            <option key={opt.id} value={opt.id}>{opt.label}</option>
          ))}
        </select>
        <span className="config-hint">
          For daily and less frequent repeats, runs start within 3 minutes of the set time
        </span>
      </div>

      <div className="config-section">
        <label className="config-label">Ends</label>
        <select
          value={config.ends}
          onChange={(e) => setConfig({ ...config, ends: e.target.value })}
        >
          {endOptions.map(opt => (
            <option key={opt.id} value={opt.id}>{opt.label}</option>
          ))}
        </select>
      </div>

      <div className="config-section">
        <label className="config-label">Time zone*</label>
        <select
          value={config.timezone}
          onChange={(e) => setConfig({ ...config, timezone: e.target.value })}
          className="timezone-select"
        >
          {timezones.map(tz => (
            <option key={tz.id} value={tz.id}>{tz.label}</option>
          ))}
        </select>
      </div>
    </>
  );

  const renderKPIConfig = () => (
    <>
      <div className="config-description">
        Trigger when a KPI crosses the specified threshold.
      </div>

      <div className="config-section">
        <label className="config-label">Select KPI*</label>
        <select
          value={config.kpi}
          onChange={(e) => setConfig({ ...config, kpi: e.target.value })}
        >
          {kpiOptions.map(opt => (
            <option key={opt.id} value={opt.id}>{opt.label}</option>
          ))}
        </select>
      </div>

      <div className="config-section">
        <label className="config-label">Condition*</label>
        <select
          value={config.condition}
          onChange={(e) => setConfig({ ...config, condition: e.target.value })}
        >
          {conditionOptions.map(opt => (
            <option key={opt.id} value={opt.id}>{opt.label}</option>
          ))}
        </select>
      </div>

      <div className="config-section">
        <label className="config-label">Threshold Value*</label>
        <div className="threshold-input">
          <input
            type="number"
            value={config.threshold}
            onChange={(e) => setConfig({ ...config, threshold: e.target.value })}
          />
          <span className="threshold-unit">weeks</span>
        </div>
      </div>

      <div className="config-section">
        <label className="config-label">Apply to</label>
        <div className="radio-group">
          <label className="radio-option">
            <input
              type="radio"
              name="applyTo"
              value="all"
              checked={config.applyTo === 'all'}
              onChange={(e) => setConfig({ ...config, applyTo: e.target.value })}
            />
            <span>All products</span>
          </label>
          <label className="radio-option">
            <input
              type="radio"
              name="applyTo"
              value="specific"
              checked={config.applyTo === 'specific'}
              onChange={(e) => setConfig({ ...config, applyTo: e.target.value })}
            />
            <span>Specific hierarchy</span>
          </label>
        </div>
        {config.applyTo === 'specific' && (
          <div className="hierarchy-selectors">
            <select><option>Department</option></select>
            <select><option>Category</option></select>
            <select><option>Class</option></select>
          </div>
        )}
      </div>

      <div className="config-section">
        <label className="config-label">Check frequency</label>
        <select value="daily-6am">
          <option value="daily-6am">Daily at 6 AM</option>
          <option value="hourly">Every hour</option>
          <option value="realtime">Real-time</option>
        </select>
      </div>
    </>
  );

  const renderDeviationConfig = () => (
    <>
      <div className="config-description">
        Trigger when forecast deviation exceeds the threshold.
      </div>

      <div className="config-section">
        <label className="config-label">Deviation Type*</label>
        <select
          value={config.deviationType}
          onChange={(e) => setConfig({ ...config, deviationType: e.target.value })}
        >
          {deviationTypes.map(opt => (
            <option key={opt.id} value={opt.id}>{opt.label}</option>
          ))}
        </select>
      </div>

      <div className="config-section">
        <label className="config-label">Threshold*</label>
        <div className="threshold-input">
          <input
            type="number"
            value={config.deviationThreshold}
            onChange={(e) => setConfig({ ...config, deviationThreshold: e.target.value })}
          />
          <span className="threshold-unit">%</span>
        </div>
      </div>

      <div className="config-section">
        <label className="config-label">Direction</label>
        <div className="radio-group">
          <label className="radio-option">
            <input
              type="radio"
              name="direction"
              value="over"
              checked={config.direction === 'over'}
              onChange={(e) => setConfig({ ...config, direction: e.target.value })}
            />
            <span>Over-forecast only</span>
          </label>
          <label className="radio-option">
            <input
              type="radio"
              name="direction"
              value="under"
              checked={config.direction === 'under'}
              onChange={(e) => setConfig({ ...config, direction: e.target.value })}
            />
            <span>Under-forecast only</span>
          </label>
          <label className="radio-option">
            <input
              type="radio"
              name="direction"
              value="both"
              checked={config.direction === 'both'}
              onChange={(e) => setConfig({ ...config, direction: e.target.value })}
            />
            <span>Both directions</span>
          </label>
        </div>
      </div>

      <div className="config-section">
        <label className="config-label">Granularity</label>
        <select
          value={config.granularity}
          onChange={(e) => setConfig({ ...config, granularity: e.target.value })}
        >
          {granularityOptions.map(opt => (
            <option key={opt.id} value={opt.id}>{opt.label}</option>
          ))}
        </select>
      </div>
    </>
  );

  const renderDefaultConfig = () => (
    <div className="config-description">
      Configure the trigger settings for this step.
    </div>
  );

  const getConfigContent = () => {
    if (!trigger) return renderDefaultConfig();
    
    switch (trigger.id) {
      case 'on-schedule':
      case 'fiscal-calendar':
        return renderScheduleConfig();
      case 'kpi-threshold':
        return renderKPIConfig();
      case 'forecast-deviation':
        return renderDeviationConfig();
      default:
        return renderDefaultConfig();
    }
  };

  return (
    <div className="config-panel">
      <div className="config-panel-header">
        <div className="config-step-info">
          <span className="step-label">Step 1</span>
          <div className="config-title-row">
            <div 
              className="config-icon"
              style={{ backgroundColor: (trigger?.color || '#4285f4') + '15', color: trigger?.color || '#4285f4' }}
            >
              <IconComponent size={20} />
            </div>
            <h3>{trigger?.name || 'Configure Trigger'}</h3>
          </div>
        </div>
        <button className="close-btn" onClick={onClose}>
          <X size={20} />
        </button>
      </div>

      <div className="config-panel-content">
        {getConfigContent()}
      </div>

      <div className="config-panel-footer">
        <button className="show-less-btn" onClick={onClose}>
          Show less
        </button>
      </div>
    </div>
  );
};

export default TriggerConfigPanel;
