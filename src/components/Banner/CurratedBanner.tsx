'use client';

import { FaArrowRight } from 'react-icons/fa';

export default function CurratedBanner() {
  return (
    <div
      className="relative rounded-xl overflow-hidden p-6 md:p-10 my-10 text-black bg-[url('/banner.png')] bg-cover bg-no-repeat bg-center"
    >
     

      <div className="relative z-10 text-center max-w-2xl mx-auto space-y-4">
        <h2 className="text-xl md:text-2xl font-bold">
          Events specially curated for you!
        </h2>
        <p className="text-sm md:text-base">
          Get event suggestions tailored to your interests! Don’t let your favorite events slip away.
        </p>

        <button className="inline-flex items-center gap-2 bg-black text-white px-5 py-2 rounded-md hover:bg-gray-800 transition">
          Get Started <FaArrowRight className="text-sm" />
        </button>
      </div>
    </div>
  );
}
