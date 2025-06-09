type MetricsProps = {
  totalEvents: number;
  totalParticipants: number;
  totalRevenue: number;
};

export default function MetricsCards({ totalEvents, totalParticipants, totalRevenue }: MetricsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-gray-700">Total Events</h3>
        <p className="text-3xl font-bold text-amber-600 mt-2">{totalEvents}</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-gray-700">Participants</h3>
        <p className="text-3xl font-bold text-amber-600 mt-2">{totalParticipants}</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-gray-700">Revenue</h3>
        <p className="text-3xl font-bold text-amber-600 mt-2">Rp {totalRevenue.toLocaleString()}</p>
      </div>
    </div>
  );
}
