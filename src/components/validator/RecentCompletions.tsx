
import { CheckCircle, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const RecentCompletions = () => {
  const recentCompletions = [
    {
      document: 'Stanford MS Computer Science',
      completedTime: '1 hour ago',
      fee: 1800
    },
    {
      document: 'ICAI CA Certificate',
      completedTime: '3 hours ago',
      fee: 1500
    },
    {
      document: 'Passport Verification',
      completedTime: '5 hours ago',
      fee: 400
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <CheckCircle className="h-5 w-5 text-green-600" />
          <span>Recent Completions</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {recentCompletions.map((completion, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 text-sm">
                  {completion.document}
                </h4>
                <div className="flex items-center space-x-1 text-xs text-gray-500 mt-1">
                  <Clock className="h-3 w-3" />
                  <span>{completion.completedTime}</span>
                </div>
              </div>
              <div className="text-sm font-semibold text-green-700">
                ₹{completion.fee.toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentCompletions;
