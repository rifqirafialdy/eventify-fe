'use client';

import { useState } from 'react';
import RegisterFormCustomer from './CustomerForm';
import RegisterFormOrganizer from './OrganizerForm';
import RegisterCard from '@/components/RegisterCard';
export default function RoleSelector() {
  const [role, setRole] = useState<'CUSTOMER' | 'ORGANIZER' | null>(null);

  if (role === 'CUSTOMER') return <RegisterFormCustomer onBack={() => setRole(null)} />;
  if (role === 'ORGANIZER') return <RegisterFormOrganizer onBack={() => setRole(null)} />;

  return (
    <div className="min-h-screen bg-amber-50 flex flex-col justify-center items-center px-6 py-12">
      <h1 className="text-4xl font-extrabold text-center text-amber-600 mb-2">Welcome to Eventify!</h1>
      <p className="text-lg text-gray-600 text-center mb-10">We’re glad you’re here! What can we help you with first?</p>
      <div className="flex flex-col md:flex-row gap-6">
        <RegisterCard
          title="Find an experience"
          description="Tell us what you love"
          image="/ballet-dancer.svg"
          onClick={() => setRole('CUSTOMER')}
        />
        <RegisterCard
          title="Organize an event"
          description="Plan your best event ever"
          image="/explaining-analytical-chart.svg"
          onClick={() => setRole('ORGANIZER')}
        />
      </div>
    </div>
  );
}
