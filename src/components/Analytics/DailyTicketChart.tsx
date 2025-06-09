'use client';

import {
  ChartContainer,
  ChartConfig,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';

type Props = {
  data: Record<string, number>;
};

export default function DailyTicketChart({ data }: Props) {
  const chartData = Object.entries(data)
    .sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime())
    .map(([date, value]) => ({ date, value }));

  const config = {
    value: { label: 'Tickets Sold', color: 'var(--chart-1)' },
  } satisfies ChartConfig;

  return (
    <ChartContainer
      config={config}
      className="bg-white p-4 shadow rounded-md h-[400px]"
    >
      <LineChart data={chartData} accessibilityLayer>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="date" />
        <YAxis allowDecimals={false} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Line
          dataKey="value"
          stroke="var(--chart-1)"
          strokeWidth={2}
          fill="var(--chart-1)"
        />
      </LineChart>
    </ChartContainer>
  );
}
