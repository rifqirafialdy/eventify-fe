'use client';

import { FC } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Hero: FC = () => {
  return (
    <section className="relative text-center py-32 mt-2 text-white rounded-lg shadow-lg overflow-hidden">
      <div className="absolute inset-0 bg-[url('/event.jpg')] bg-cover bg-center brightness-50 z-0" />

      <div className="relative z-10 p-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Don’t miss out! Explore the vibrant events happening locally and globally.
        </h1>
        <p className="text-gray-200 max-w-2xl mx-auto mb-8">
          Explore live experiences, book tickets, and create your own events with ease.
        </p>

        {/* Search Bar */}
        <div className="max-w-md mx-auto flex gap-2">
          <Input
            type="text"
            placeholder="Search for events"
            className="rounded-lg bg-white text-black"
          />
          <Button variant="secondary" className="bg-yellow-400 hover:bg-yellow-300 text-black font-semibold">
            Search
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
