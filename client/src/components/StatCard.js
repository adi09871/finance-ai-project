import React from 'react';
import './StatCard.css';

function StatCard({ icon, label, change, changeType }) {
  return (
    <div className="stat-card">
      <div className="stat-icon-wrapper" style={{ backgroundColor: icon.bgColor }}>
        <span className="stat-icon">{icon.emoji}</span>
      </div>
      <div className="stat-content">
        <p className="stat-label">{label}</p>
        <div className="stat-footer">
          <p className="stat-change" style={{ color: changeType === 'up' ? '#e74c3c' : '#2ecc71' }}>
            {changeType === 'up' ? '📈 +' : '📉 '}{change}
          </p>
        </div>
      </div>
    </div>
  );
}

export default StatCard;
