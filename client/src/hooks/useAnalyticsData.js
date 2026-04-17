import { useState, useEffect } from 'react';

export const useAnalyticsData = () => {
  const [categoryBreakdown, setCategoryBreakdown] = useState([]);
  const [spendingTrend, setSpendingTrend] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAnalyticsData();
  }, []);

  const fetchAnalyticsData = async () => {
    try {
      setLoading(true);
      setError('');

      const [categoryRes, trendRes, summaryRes] = await Promise.all([
        fetch('http://localhost:5000/analytics/category-breakdown'),
        fetch('http://localhost:5000/analytics/spending-trend'),
        fetch('http://localhost:5000/analytics/summary')
      ]);

      const categoryData = categoryRes.ok ? await categoryRes.json() : [];
      const trendData = trendRes.ok ? await trendRes.json() : [];
      const summaryData = summaryRes.ok ? await summaryRes.json() : null;

      if (!categoryRes.ok || !trendRes.ok || !summaryRes.ok) {
        const errors = [];
        if (!categoryRes.ok) errors.push(`Category API: ${categoryRes.statusText}`);
        if (!trendRes.ok) errors.push(`Trend API: ${trendRes.statusText}`);
        if (!summaryRes.ok) errors.push(`Summary API: ${summaryRes.statusText}`);
        throw new Error(errors.join(', '));
      }

      setCategoryBreakdown(categoryData);
      setSpendingTrend(trendData);
      setSummary(summaryData);
    } catch (err) {
      console.error('Analytics error:', err);
      setError(err.message || 'Failed to fetch analytics data. Make sure the server is running.');
    } finally {
      setLoading(false);
    }
  };

  const refetch = () => {
    fetchAnalyticsData();
  };

  return {
    categoryBreakdown,
    spendingTrend,
    summary,
    loading,
    error,
    refetch
  };
};
