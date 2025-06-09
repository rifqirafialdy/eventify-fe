import CreateEventBanner from "@/components/Banner/CreateEventBanner";
import CuratedBanner from "@/components/Banner/CurratedBanner";
import EventCard from "@/components/EventCard";
interface BodyHomeProps {
  id?: string;
}

const categories = [
  { name: "Entertainment", image: "/categories/entertainment.jpg" },
  { name: "Technology", image: "/categories/tech.jpg" },
  { name: "Music & Entertainment", image: "/categories/music.jpg" },
  { name: "Education & Business", image: "/categories/business.jpg" },
  { name: "Sports & Fitness", image: "/categories/sports.jpg" },
  { name: "Travel & Adventure", image: "/categories/travel.jpg" },
];

const filters = ["All", "Today", "Tomorrow", "This Weekend", "Free"];

const mockEvents = [
  {
    id: '1',
    title: 'Bandung Creative Meetup',
    description: 'A creative tech gathering for designers and developers in Bandung.',
    date: 'June 20 2025',
    time: '10:00 AM - 5:00 PM',
    imageUrl: '/event.jpg',
    price: 50000,
    category: 'Technology',
  },
  {
    id: '2',
    title: 'Startup Weekend Jakarta',
    description: 'Join Indonesia’s top startup builders to launch your next idea in 48 hours.',
    date: 'July 15 2025',
    time: '9:00 AM - 6:00 PM',
    imageUrl: '/event.jpg',
    price: 0,
    category: 'Technology',
  },
  {
    id: '3',
    title: 'Green day Live In Jakarta',
    description: 'Legendary rock band live in Jakarta for one explosive night.',
    date: 'July 22 - 28 2025',
    time: '9:00 AM - 6:00 PM',
    imageUrl: '/event.jpg',
    price: 0,
    category: 'Music & Entertainment',
  },
];

export default function BodyHome({ id }: BodyHomeProps) {
  return (
    <div id={id || "home"}>

    <section className="max-w-7xl xl:mx-36 px-4 mt-12">
  <h2 className="text-xl font-semibold mb-4">Explore Categories</h2>
  <div className="sm:overflow-x-visible overflow-x-auto scrollbar-hide">
    <div className="flex gap-6 sm:flex-wrap sm:justify-start lg:justify-between">
      {categories.map((cat) => (
        <div key={cat.name} className="flex flex-col items-center shrink-0">
          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-200">
            <img
              src={cat.image}
              alt={cat.name}
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-xs mt-2 text-center w-20">{cat.name}</p>
        </div>
      ))}
    </div>
  </div>
</section>



      <section className="max-w-7xl xl:mx-36 px-4 mt-12">
        <h2 className="text-xl font-semibold mb-4">Popular Events</h2>
        <div className="flex gap-2 mb-6 flex-wrap">
          {filters.map((f) => (
            <button
              key={f}
              className="px-4 py-1 border text-sm rounded-full hover:bg-gray-100 transition"
            >
              {f}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {mockEvents.map((event) => (
            <EventCard key={event.id} {...event} />
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <button className="px-6 py-2 border rounded-md hover:bg-gray-100 text-sm">
            See More
          </button>
        </div>
      <CuratedBanner/>
              <h2 className="text-xl font-semibold mb-4">Discover Online Events</h2>
       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {mockEvents.map((event) => (
            <EventCard key={event.id} {...event} />
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <button className="px-6 py-2 border rounded-md hover:bg-gray-100 text-sm">
            See More
          </button>
        </div>
      </section>
      <CreateEventBanner/>
      <section className="bg-yellow-400 text-black py-10 px-6 md:px-16 mt-20">
  <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
    <div>
      <h4 className="text-lg font-semibold">Subscribe to our Newsletter</h4>
      <p className="text-sm mt-1">
        Receive our weekly newsletter & updates with new events from your favourite organizers & venues.
      </p>
    </div>
    <form className="flex w-full max-w-md  ">
      <input
        type="email"
        placeholder="Enter your e-mail   address"
        className="flex-1 px-4 py-2  border border-gray-300 bg-amber-50 focus:outline-none rounded-l-md"
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
