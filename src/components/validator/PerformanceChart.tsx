
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, ReferenceLine } from 'recharts';

const PerformanceChart = () => {
  const weeklyData = [
    { day: 'Mon', validations: 4, target: 6 },
    { day: 'Tue', validations: 6, target: 6 },
    { day: 'Wed', validations: 8, target: 6 },
    { day: 'Thu', validations: 5, target: 6 },
    { day: 'Fri', validations: 7, target: 6 },
  ];

  const chartConfig = {
    validations: {
      label: "Validations",
      color: "hsl(var(--chart-1))",
    },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Weekly Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyData}>
              <XAxis dataKey="day" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ReferenceLine y={6} stroke="#ef4444" strokeDasharray="5 5" label="Target" />
              <Bar dataKey="validations" fill="var(--color-validations)" radius={4} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default PerformanceChart;
