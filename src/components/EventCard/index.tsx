'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FaTicketAlt } from 'react-icons/fa';
import dayjs from 'dayjs';

type EventCardProps = {
  id: string;
  title: string;
  description: string;
  date: string; // full date string
  time: string; // full time string
  imageUrl: string;
  price: number;
  category?: string;
};

export default function EventCard({
  id,
  title,
  description,
  date,
  time,
  imageUrl,
  price,
  category = "Event",
}: EventCardProps) {
  const formattedDate = dayjs(date);
  const month = formattedDate.format('MMM');
  const day = formattedDate.format('D');

  return (
    <Link href={`/events/${id}`} className="block">
      <div className="rounded-2xl bg-white shadow-sm hover:shadow-xl hover:scale-[1.02] transition-transform duration-300 ease-in-out overflow-hidden max-w-sm">
        <div className="relative w-full h-48">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute bottom-0 left-0 bg-yellow-400 text-black text-xs font-semibold px-3 py-1 shadow-md rounded-tr-md">
            {category}
          </div>
        </div>

        <div className="flex gap-4 p-4">
          <div className="flex flex-col items-center min-w-[60px]">
            <span className="text-xl text-blue-500 font-bold uppercase">{month}</span>
            <span className="text-lg font-bold">{day}</span>
          </div>

          <div className="flex-1 space-y-1">
            <h3 className="text-md font-semibold line-clamp-1">{title}</h3>
            <p className="text-sm text-gray-500 line-clamp-2">{description}</p>
            <p className="text-sm text-gray-500">{time}</p>
            <div className="flex items-center text-sm text-gray-600 gap-2 pt-1">
              <FaTicketAlt className="text-gray-500" />
              <span>{price > 0 ? `Rp${price.toLocaleString('id-ID')}` : 'Free'}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
