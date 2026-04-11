import React from 'react';
import './RecentActivity.css';

function RecentActivity() {
  const activities = [
    {
      id: 1,
      title: 'Whole Foods Market',
      category: 'Groceries',
      time: 'Today, 2:45 PM',
      amount: '-$142.38',
    },
    {
      id: 2,
      title: 'Netflix Subscription',
      category: 'Entertainment',
      time: 'Today, 10:00 AM',
      amount: '-$15.99',
    },
    {
      id: 3,
      title: 'Uber',
      category: 'Transportation',
      time: 'Yesterday, 6:30 PM',
      amount: '-$24.50',
    },
    {
      id: 4,
      title: 'Salary Deposit',
      category: 'Income',
      time: 'Apr 1, 9:00 AM',
      amount: '+$5,200.00',
      isIncome: true,
    },
  ];

  return (
    <div className="recent-activity">
      <div className="activity-header">
        <h3>Recent Activity</h3>
        <a href="#" className="view-all-link">View All</a>
      </div>
      <div className="activity-list">
        {activities.map((activity) => (
          <div key={activity.id} className="activity-item">
            <div className="activity-details">
              <p className="activity-title">{activity.title}</p>
              <p className="activity-meta">{activity.category} • {activity.time}</p>
            </div>
            <p className={`activity-amount ${activity.isIncome ? 'income' : 'expense'}`}>
              {activity.amount}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentActivity;
