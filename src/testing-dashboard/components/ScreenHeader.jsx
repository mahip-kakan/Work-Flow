import React from 'react';
import { ArrowLeft } from 'lucide-react';

export default function ScreenHeader({ title, onBack }) {
  return (
    <div className="screen-header">
      <button type="button" className="screen-back" onClick={onBack} aria-label="Back to dashboard">
        <ArrowLeft size={20} />
        Back
      </button>
      <h2 className="screen-title">{title}</h2>
    </div>
  );
}
