'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import ProtectedRoute from '@/components/protectedRoute';
import { useAuth } from '@/lib/context/AuthContext';
import axiosInstance from '@/lib/axiosInstance';

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, loading } = useAuth();
  const router = useRouter();

  const [organizerProfile, setOrganizerProfile] = useState<{
    name: string;
    description: string;
    profilePicture: string;
  } | null>(null);

  const [analytics, setAnalytics] = useState({
    totalEvents: 0,
    totalParticipants: 0,
    totalRevenue: 0,
  });

  useEffect(() => {
    if (loading || user?.role !== 'ORGANIZER') return;

    const fetchData = async () => {
      try {
        const profileRes = await axiosInstance.get('/api/organizer/profile');
        setOrganizerProfile(profileRes.data);

        const analyticsRes = await axiosInstance.get(
          `/api/analytics/summary`
        );
        setAnalytics(analyticsRes.data);
      } catch  {
        router.replace('/dashboard/create-profile');
      }
    };

    fetchData();
  }, [loading, user, router]);

  if (loading) return <div>Loading...</div>;

  return (
    <ProtectedRoute allowedRoles={['ORGANIZER']}>
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(false)} />

        <div className="flex-1 flex flex-col min-h-screen">
          <header className="bg-white shadow p-4 flex justify-between items-center md:pl-6">
            <button
              className="md:hidden text-amber-600 text-2xl"
              onClick={() => setSidebarOpen((prev) => !prev)}
            >
              ☰
            </button>
            <h1 className="text-2xl font-semibold text-gray-800">
              Welcome Back, {user?.name}
            </h1>
          </header>

          <div className="flex-1 p-6 overflow-y-auto">
            {organizerProfile && (
              <div className="bg-white rounded-lg p-4 shadow mb-6 flex items-center gap-4">
                <img
                  src={organizerProfile.profilePicture}
                  alt={organizerProfile.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    {organizerProfile.name}
                  </h2>
                  <p className="text-gray-600">{organizerProfile.description}</p>
                </div>
              </div>
            )}

            <main className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              <div className="bg-white rounded-lg p-4 shadow hover:shadow-md transition">
                <h3 className="text-lg font-semibold text-gray-700">Total Events</h3>
                <p className="text-3xl font-bold text-amber-600 mt-2">
                  {analytics.totalEvents}
                </p>
              </div>

              <div className="bg-white rounded-lg p-4 shadow hover:shadow-md transition">
                <h3 className="text-lg font-semibold text-gray-700">Participants</h3>
                <p className="text-3xl font-bold text-amber-600 mt-2">
                  {analytics.totalParticipants}
                </p>
              </div>

              <div className="bg-white rounded-lg p-4 shadow hover:shadow-md transition">
                <h3 className="text-lg font-semibold text-gray-700">Revenue</h3>
                <p className="text-3xl font-bold text-amber-600 mt-2">
                  Rp {analytics.totalRevenue.toLocaleString()}
                </p>
              </div>
            </main>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
