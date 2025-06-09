// app/dashboard/page.tsx (or wherever your dashboard lives)
'use client';

import { useEffect, useState } from 'react';
import DailyTicketChart from '@/components/Analytics/DailyTicketChart';
import { getDailyTicketSales } from '@/lib/analytics';
import { useAuth } from '@/lib/context/AuthContext';

export default function AnalyticsPage() {
  const { user, loading } = useAuth();
  const [data, setData] = useState<{ [key: string]: number }>({});

 useEffect(() => {
  if (!user || loading) return; // wait until user is available

  const fetchAnalytics = async () => {
    const organizerId = user.id;
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - 14); // last 14 days

    const startStr = start.toISOString().split('T')[0];
    const endStr = end.toISOString().split('T')[0];

    try {
      const res = await getDailyTicketSales(organizerId, startStr, endStr);
      setData(res);
    } catch (err) {
      console.error('Error fetching analytics:', err);
    }
  };

  fetchAnalytics();
}, [user, loading]); // watch for user change
  if (loading) return <p className="text-center mt-8">Loading...</p>;
  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Daily Ticket Sales</h2>
      <DailyTicketChart data={data} />
    </div>
  );
}
