
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
    <Card className="overflow-hidden">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg truncate">Weekly Performance</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="w-full overflow-hidden">
          <ChartContainer config={chartConfig} className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
                <XAxis 
                  dataKey="day" 
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis 
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                  width={30}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ReferenceLine y={6} stroke="#ef4444" strokeDasharray="5 5" label="Target" />
                <Bar dataKey="validations" fill="var(--color-validations)" radius={4} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default PerformanceChart;
