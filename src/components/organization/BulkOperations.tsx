
import { Upload, Download, FileSpreadsheet, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const BulkOperations = () => {
  const bulkOptions = [
    {
      title: 'Bulk Employee Upload',
      description: 'Upload CSV with employee details',
      icon: Users,
      action: 'Upload CSV',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Mass Document Submit',
      description: 'Submit multiple documents at once',
      icon: Upload,
      action: 'Start Upload',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Export Reports',
      description: 'Download validation reports',
      icon: Download,
      action: 'Generate Report',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  const recentOperations = [
    {
      operation: 'Employee Onboarding - Engineering',
      status: 'Completed',
      count: 24,
      time: '2 hours ago'
    },
    {
      operation: 'Certificate Verification - Sales',
      status: 'In Progress',
      count: 15,
      time: '5 hours ago'
    }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileSpreadsheet className="h-5 w-5" />
            <span>Bulk Operations</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {bulkOptions.map((option, index) => {
              const Icon = option.icon;
              return (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${option.bgColor}`}>
                      <Icon className={`h-5 w-5 ${option.color}`} />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{option.title}</h4>
                      <p className="text-sm text-gray-600">{option.description}</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    {option.action}
                  </Button>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Operations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentOperations.map((op, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{op.operation}</h4>
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge 
                      variant="outline"
                      className={op.status === 'Completed' 
                        ? 'bg-green-100 text-green-800 border-green-300' 
                        : 'bg-blue-100 text-blue-800 border-blue-300'
                      }
                    >
                      {op.status}
                    </Badge>
                    <span className="text-sm text-gray-600">{op.count} items</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{op.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BulkOperations;
