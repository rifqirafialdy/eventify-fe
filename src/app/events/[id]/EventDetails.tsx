'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axiosInstance from '@/lib/axiosInstance';
import { MapPin, CalendarIcon, ClockIcon } from 'lucide-react';
import Navbar from '@/components/Navbar';
import dayjs from 'dayjs';
import PermissionButton from '@/components/PermissionButton';

type Ticket = {
  ticketId: string;
  categoryName: string;
  price: number;
};

type Schedule = {
  cityCode: string;
  startDate: string;
  address1: string;
  address2: string;
  address3: string;
  tickets: Ticket[];
};

type Event = {
  name: string;
  createdAt: string;
  schedules: Schedule[];
};

export default function EventDetailPage() {
  const { id } = useParams();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await axiosInstance.get(`/api/events/${id}`);
        setEvent(res.data);
      } catch (error) {
        console.error('Failed to fetch event:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchEvent();
  }, [id]);

  if (loading) return <div className="p-6">Loading...</div>;
  if (!event) return <div className="p-6">Event not found.</div>;

  const schedule = event.schedules[0];
  const dateFormatted = dayjs(schedule.startDate).format('dddd, D MMMM YYYY');
  const timeFormatted = dayjs(schedule.startDate).format('h:mm A');

  return (
    <>
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 py-8 bg-white mt-6 rounded shadow">
        <img
          src="/img/banner-placeholder.jpg"
          alt="Event Banner"
          className="w-full h-64 object-cover rounded"
        />
        <h1 className="text-3xl font-bold text-gray-900 mt-6">
          {event.name}
        </h1>

        <div className="mt-4 text-gray-700">
          <div className="flex items-center gap-2 mb-1">
            <CalendarIcon size={20} />
            <span>{dateFormatted}</span>
          </div>
          <div className="flex items-center gap-2 mb-1">
            <ClockIcon size={20} />
            <span>{timeFormatted}</span>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <MapPin size={20} />
            <span>{`${schedule.address1}, ${schedule.address2}, ${schedule.address3}`}</span>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Ticket Information</h3>
          <ul className="space-y-2">
            {schedule.tickets.map((ticket) => (
              <li
                key={ticket.ticketId}
                className="flex justify-between border p-3 rounded"
              >
                <span>{ticket.categoryName}</span>
                <span>Rp {ticket.price.toLocaleString('id-ID')}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6">
<PermissionButton
        screen="TICKETS"
        action="BUY"
        className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-6 py-3 rounded-lg"
        onClick={() => alert("Buying ticket...")}
      >            Buy Tickets
          </PermissionButton>
        </div>
      </div>
    </>
  );
}
