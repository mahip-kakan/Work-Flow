import React from 'react';
import { X } from 'lucide-react';

export default function DetailPanel({ title, children, onClose }) {
  return (
    <div className="overlay-backdrop" onClick={onClose}>
      <div className="overlay-panel" onClick={(e) => e.stopPropagation()}>
        <div className="panel-header">
          <h3>{title}</h3>
          <button type="button" className="panel-close" onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>
        </div>
        <div className="panel-body">{children}</div>
      </div>
    </div>
  );
}
