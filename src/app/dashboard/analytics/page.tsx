'use client';

import { useEffect, useState, useCallback } from 'react';
import dayjs from 'dayjs';
import DailyTicketChart from '@/components/Analytics/DailyTicketChart';
import { useAuth } from '@/lib/context/AuthContext';
import { getDailyTicketSales } from '@/lib/analytics';
import Sidebar from '@/components/Sidebar';

export default function AnalyticsPage() {
  const { user, loading } = useAuth();
  const [data, setData] = useState<{ [key: string]: number }>({});
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filterType, setFilterType] = useState<'daily' | 'monthly' | 'yearly'>('daily');

  const today = dayjs();
  const [startDate, setStartDate] = useState(today.subtract(14, 'day').format('YYYY-MM-DD'));
  const [endDate, setEndDate] = useState(today.format('YYYY-MM-DD'));

  const fetchAnalytics = useCallback(async () => {
    if (!user) return;

    try {
      const res = await getDailyTicketSales(user.id, startDate, endDate);

      const grouped: { [key: string]: number } = {};

      for (const dateStr in res) {
        const date = dayjs(dateStr);
        let key = '';

        if (filterType === 'daily') key = date.format('YYYY-MM-DD');
        else if (filterType === 'monthly') key = date.format('YYYY-MM');
        else if (filterType === 'yearly') key = date.format('YYYY');

        grouped[key] = (grouped[key] || 0) + res[dateStr];
      }

      setData(grouped);
    } catch (err) {
      console.error('Error fetching analytics:', err);
    }
  }, [user, startDate, endDate, filterType]);

  useEffect(() => {
    if (!loading && user) {
      fetchAnalytics();
    }
  }, [fetchAnalytics, loading, user]);

  const handleApply = () => {
    fetchAnalytics();
  };

  if (loading) return <p className="text-center mt-8">Loading...</p>;

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(false)} />

      <div className="flex-1 p-6">
        <h2 className="text-xl font-bold mb-4">Ticket Sales Analytics</h2>

        <div className="mb-4 flex gap-4 items-end flex-wrap">
          <div>
            <label className="block text-sm text-gray-700 mb-1">Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="border rounded p-2"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="border rounded p-2"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">View By</label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as 'daily' | 'monthly' | 'yearly')}
              className="border rounded p-2"
            >
              <option value="daily">Daily</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>
          <button
            onClick={handleApply}
            className="bg-amber-600 text-white px-4 py-2 rounded hover:bg-amber-700"
          >
            Apply
          </button>
        </div>

        <DailyTicketChart data={data} />
      </div>
    </div>
  );
}
