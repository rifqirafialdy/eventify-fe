'use client';

import { useEffect, useState } from 'react';
import CreateEventBanner from '@/components/Banner/CreateEventBanner';
import CuratedBanner from '@/components/Banner/CurratedBanner';
import EventCard from '@/components/EventCard';
import axiosInstance from '@/lib/axiosInstance';

interface BodyHomeProps {
  id?: string;
}

interface Ticket {
  ticketId: string;
  categoryName: string;
  price: number;
}

interface Schedule {
  scheduleId: string;
  startDate: string;
  address1: string;
  address2: string;
  address3: string;
  channelCode: string;
  tickets: Ticket[];
}

interface Event {
  id: string;
  name: string;
  schedules: Schedule[];
}

const categories = [
  { name: 'Entertainment', image: '/categories/entertainment.jpg' },
  { name: 'Technology', image: '/categories/tech.jpg' },
  { name: 'Music & Entertainment', image: '/categories/music.jpg' },
  { name: 'Education & Business', image: '/categories/business.jpg' },
  { name: 'Sports & Fitness', image: '/categories/sports.jpg' },
  { name: 'Travel & Adventure', image: '/categories/travel.jpg' },
];

const filters = ['All', 'Today', 'Tomorrow', 'This Weekend', 'Free'];

export default function BodyHome({ id }: BodyHomeProps) {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axiosInstance.get<Event[]>('/api/events');
        setEvents(res.data);
      } catch (err) {
        console.error('Failed to fetch events:', err);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div id={id || 'home'}>
      {/* Categories */}
      <section className="max-w-7xl xl:mx-36 px-4 mt-12">
        <h2 className="text-xl font-semibold mb-4">Explore Categories</h2>
        <div className="sm:overflow-x-visible overflow-x-auto scrollbar-hide">
          <div className="flex gap-6 sm:flex-wrap sm:justify-start lg:justify-between">
            {categories.map((cat) => (
              <div key={cat.name} className="flex flex-col items-center shrink-0">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-200">
                  <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
                </div>
                <p className="text-xs mt-2 text-center w-20">{cat.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Events */}
      <section className="max-w-7xl xl:mx-36 px-4 mt-12">
        <h2 className="text-xl font-semibold mb-4">Popular Events</h2>
        <div className="flex gap-2 mb-6 flex-wrap">
          {filters.map((f) => (
            <button key={f} className="px-4 py-1 border text-sm rounded-full hover:bg-gray-100 transition">
              {f}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {events.map((event) => {
            const schedule = event.schedules[0];
            const ticket = schedule?.tickets[0];

            return (
              <EventCard
                key={event.id}
                id={event.id}
                title={event.name}
                description={`${schedule?.address2 || ''}, ${schedule?.address3 || ''}`}
                date={new Date(schedule?.startDate).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
                time={new Date(schedule?.startDate).toLocaleTimeString('en-US', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
                price={ticket?.price || 0}
                imageUrl="/event.jpg"
                category={ticket?.categoryName || 'General'}
              />
            );
          })}
        </div>

        <div className="flex justify-center mt-8">
          <button className="px-6 py-2 border rounded-md hover:bg-gray-100 text-sm">See More</button>
        </div>

        <CuratedBanner />

        {/* Online Events */}
        <h2 className="text-xl font-semibold mb-4 mt-12">Discover Online Events</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {events
            .filter((event) => event.schedules[0]?.channelCode === 'ONLINE')
            .map((event) => {
              const schedule = event.schedules[0];
              const ticket = schedule?.tickets[0];

              return (
                <EventCard
                  key={event.id}
                  id={event.id}
                  title={event.name}
                  description={`${schedule?.address2 || ''}, ${schedule?.address3 || ''}`}
                  date={new Date(schedule?.startDate).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                  time={new Date(schedule?.startDate).toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                  price={ticket?.price || 0}
                  imageUrl="/event.jpg"
                  category={ticket?.categoryName || 'General'}
                />
              );
            })}
        </div>

        <div className="flex justify-center mt-8">
          <button className="px-6 py-2 border rounded-md hover:bg-gray-100 text-sm">See More</button>
        </div>
      </section>

      <CreateEventBanner />

      {/* Newsletter */}
      <section className="bg-yellow-400 text-black py-10 px-6 md:px-16 mt-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h4 className="text-lg font-semibold">Subscribe to our Newsletter</h4>
            <p className="text-sm mt-1">
              Receive our weekly newsletter & updates with new events from your favourite organizers & venues.
            </p>
          </div>
          <form className="flex w-full max-w-md">
            <input
              type="email"
              placeholder="Enter your e-mail address"
              className="flex-1 px-4 py-2 border border-gray-300 bg-amber-50 focus:outline-none rounded-l-md"
            />
            <button
              type="submit"
              className="bg-black text-amber-300 px-5 py-2 rounded-r-md hover:bg-gray-800 transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
