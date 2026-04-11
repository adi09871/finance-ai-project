import React from 'react';
import './Sidebar.css';

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="logo">
          <span className="logo-icon">🎯</span>
          <h2>FinanceAI</h2>
        </div>
      </div>

      <nav className="sidebar-nav">
        <div className="nav-item active">
          <span className="nav-icon">📊</span>
          <span className="nav-text">Dashboard</span>
        </div>
        <div className="nav-item">
          <span className="nav-icon">📈</span>
          <span className="nav-text">Activity</span>
        </div>
        <div className="nav-item">
          <span className="nav-icon">🤖</span>
          <span className="nav-text">Insights (AI)</span>
        </div>
        <div className="nav-item">
          <span className="nav-icon">📉</span>
          <span className="nav-text">Analytics</span>
        </div>
        <div className="nav-item">
          <span className="nav-icon">💼</span>
          <span className="nav-text">Budgets</span>
        </div>
        <div className="nav-item">
          <span className="nav-icon">🔮</span>
          <span className="nav-text">Predictions</span>
        </div>
        <div className="nav-item">
          <span className="nav-icon">⚙️</span>
          <span className="nav-text">Settings</span>
        </div>
      </nav>

      <div className="sidebar-footer">
        <div className="user-profile">
          <div className="user-avatar">AM</div>
          <div className="user-info">
            <p className="user-name">Alex Morgan</p>
            <p className="user-status">Premium</p>
          </div>
        </div>
        <div className="logout-btn">
          <span className="logout-icon">🚪</span>
          <span className="logout-text">Logout</span>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
