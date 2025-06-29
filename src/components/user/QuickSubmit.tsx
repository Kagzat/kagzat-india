
import { Plus, Zap, FileText, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const QuickSubmit = () => {
  const quickOptions = [
    {
      title: 'Educational Documents',
      description: 'Degrees, Transcripts, Certificates',
      icon: FileText,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Identity Verification',
      description: 'Passport, Aadhar, Driving License',
      icon: Shield,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Express Verification',
      description: 'Get verified within 24 hours',
      icon: Zap,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Plus className="h-5 w-5" />
          <span>Quick Submit</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {quickOptions.map((option, index) => {
            const Icon = option.icon;
            return (
              <Button
                key={index}
                variant="outline"
                className="w-full justify-start h-auto p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${option.bgColor}`}>
                    <Icon className={`h-5 w-5 ${option.color}`} />
                  </div>
                  <div className="text-left">
                    <h4 className="font-medium text-gray-900">{option.title}</h4>
                    <p className="text-sm text-gray-600">{option.description}</p>
                  </div>
                </div>
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickSubmit;
