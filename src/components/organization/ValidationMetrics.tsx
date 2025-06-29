
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LineChart, Line } from 'recharts';

const ValidationMetrics = () => {
  const weeklyData = [
    { day: 'Mon', completed: 45, pending: 23 },
    { day: 'Tue', completed: 52, pending: 18 },
    { day: 'Wed', completed: 38, pending: 31 },
    { day: 'Thu', completed: 61, pending: 15 },
    { day: 'Fri', completed: 49, pending: 27 },
  ];

  const departmentData = [
    { department: 'Engineering', success: 94, avg_time: 2.1 },
    { department: 'Sales', success: 98, avg_time: 1.8 },
    { department: 'HR', success: 96, avg_time: 2.3 },
    { department: 'Finance', success: 92, avg_time: 2.7 },
  ];

  const chartConfig = {
    completed: {
      label: "Completed",
      color: "hsl(var(--chart-1))",
    },
    pending: {
      label: "Pending",
      color: "hsl(var(--chart-2))",
    },
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Weekly Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData}>
                <XAxis dataKey="day" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="completed" fill="var(--color-completed)" radius={4} />
                <Bar dataKey="pending" fill="var(--color-pending)" radius={4} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Department Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {departmentData.map((dept, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">{dept.department}</h4>
                  <p className="text-sm text-gray-600">Avg. completion: {dept.avg_time} days</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-green-600">{dept.success}%</p>
                  <p className="text-xs text-gray-500">Success rate</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ValidationMetrics;
