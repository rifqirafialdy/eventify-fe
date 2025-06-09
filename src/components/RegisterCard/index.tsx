'use client';

import Image from 'next/image';

interface Props {
  title: string;
  description: string;
  image: string;
  onClick: () => void;
}

export default function RegisterCard({ title, description, image, onClick }: Props) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer bg-white border rounded-xl p-8 w-72 text-center shadow hover:shadow-md transition"
    >
      <Image src={image} alt={title} width={120} height={120} priority />
      <h3 className="text-xl font-semibold mt-4 mb-2 text-amber-800">{title}</h3>
      <p className="text-gray-500 text-sm mb-4">{description}</p>
      <button className="border px-4 py-2 rounded-md font-medium text-sm text-amber-700 hover:bg-amber-100">
        Choose
      </button>
    </div>
  );
}
