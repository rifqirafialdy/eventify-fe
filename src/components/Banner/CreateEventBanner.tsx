'use client';

import { FaRegCalendarAlt } from 'react-icons/fa';

export default function CreateEventBanner() {
  return (
    <div
      className="relative overflow-hidden p-6 md:p-10 my-10 text-amber-300 bg-[url('/CEbanner.png')] bg-cover bg-no-repeat bg-center"
    >
      <div className="relative z-10 max-w-3xl mx-auto flex justify-between items-center text-left gap-6">
        <div className="space-y-2">
          <h3 className="text-xl font-bold">Create an event with Eventify</h3>
          <p className="text-sm">
            Got a show, event, activity or a great experience? Partner with us & get listed on Eventify
          </p>
        </div>

        <button className="inline-flex items-center gap-2 bg-yellow-400 text-black font-medium px-5 py-2 rounded-md hover:bg-yellow-500 transition">
          <FaRegCalendarAlt className="text-lg" />
          Create Event
        </button>
      </div>
    </div>
  );
}
