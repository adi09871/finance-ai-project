import React from 'react';
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { CHART_COLORS, formatChartValue } from '../utils/chartUtils';

export const CategoryBreakdownChart = ({ data }) => (
  <div className="chart-container">
    <h3>Category Breakdown</h3>
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis dataKey="category" />
        <YAxis />
        <Tooltip 
          formatter={(value) => formatChartValue(value)}
          contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '4px' }}
        />
        <Bar dataKey="amount" fill="#6366f1" radius={[8, 8, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

export const SpendingTrendChart = ({ data }) => (
  <div className="chart-container">
    <h3>Spending Trend</h3>
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip 
          formatter={(value) => formatChartValue(value)}
          contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '4px' }}
        />
        <Line 
          type="monotone" 
          dataKey="amount" 
          stroke="#6366f1" 
          strokeWidth={2}
          dot={{ fill: '#6366f1', r: 5 }}
          activeDot={{ r: 7 }}
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

export const SpendingDistributionChart = ({ data }) => (
  <div className="chart-container pie-chart">
    <h3>Spending Distribution</h3>
    <ResponsiveContainer width="100%" height={250}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ category, percent }) => `${category} ${(percent * 100).toFixed(0)}%`}
          outerRadius={80}
          fill="#8884d8"
          dataKey="amount"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
          ))}
        </Pie>
        <Tooltip 
          formatter={(value) => formatChartValue(value)}
          contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '4px' }}
        />
      </PieChart>
    </ResponsiveContainer>
  </div>
);

export const StatCard = ({ label, value, change, icon }) => (
  <div className="stat-card">
    <div className="stat-content">
      <p className="stat-label">{label}</p>
      <p className="stat-value">{value}</p>
      {change && (
        <p className={`stat-change ${change.includes('+') ? 'positive' : 'negative'}`}>
          {change}
        </p>
      )}
    </div>
    {icon && <div className="stat-icon">{icon}</div>}
  </div>
);
