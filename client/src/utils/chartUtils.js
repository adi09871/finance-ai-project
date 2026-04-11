// Chart utilities and display helpers
export const COLORS = {
  purple: '#6366f1',
  blue: '#3b82f6',
  green: '#10b981',
  pink: '#ec4899',
  orange: '#f97316',
  cyan: '#06b6d4',
  indigo: '#4f46e5'
};

export const CHART_COLORS = [
  '#6366f1', '#8b5cf6', '#06b6d4', '#10b981', 
  '#f97316', '#ec4899', '#0ea5e9'
];

export const getCategoryColor = (category) => {
  const colors = {
    'Food': '#10b981',
    'Transportation': '#3b82f6',
    'Entertainment': '#8b5cf6',
    'Utilities': '#f97316',
    'Health': '#ec4899',
    'Shopping': '#06b6d4',
    'Other': '#6b7280'
  };
  return colors[category] || '#6366f1';
};

export const formatCurrency = (value) => {
  return `$${value.toFixed(2)}`;
};

export const formatChartValue = (value) => {
  return `$${value}`;
};
