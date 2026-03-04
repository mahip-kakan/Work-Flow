import React, { useState } from 'react';

export default function InfoTooltip({ term, definition }) {
  const [visible, setVisible] = useState(false);

  return (
    <span className="info-tooltip-wrap">
      <span
        className="info-tooltip-icon"
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        onClick={() => setVisible((v) => !v)}
        role="button"
        tabIndex={0}
        aria-label={`Info: ${term}`}
      >
        i
      </span>
      {visible && (
        <div className="info-tooltip-popover">
          <strong>{term}</strong>
          <p>{definition}</p>
        </div>
      )}
    </span>
  );
}
