
import { AlertTriangle, Clock, FileText, User } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const PendingValidations = () => {
  const urgentValidation = {
    id: 'URG-001',
    document: 'IIT Delhi Engineering Degree',
    submitter: 'Priya Sharma',
    fee: 1200,
    dueIn: '2 hours',
    type: 'Express Validation'
  };

  const pendingQueue = [
    {
      id: 'SUB-HBS-240629-001',
      document: 'Harvard MBA Certificate',
      submitter: 'Rajesh Kumar',
      submittedTime: '2 hours ago',
      fee: 2500,
      autoPopulated: 85,
      status: 'Documents uploaded'
    },
    {
      id: 'SUB-MAR-240629-002',
      document: 'Marriage Certificate',
      submitter: 'Amit & Sunita Patel',
      submittedTime: '5 hours ago',
      fee: 800,
      autoPopulated: 0,
      status: 'Documents uploaded'
    },
    {
      id: 'SUB-EXP-240629-003',
      document: 'Experience Letter',
      submitter: 'Kavya Reddy',
      submittedTime: '1 day ago',
      fee: 600,
      autoPopulated: 0,
      status: 'Awaiting review'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Urgent Validations */}
      <Card className="border-red-200 bg-red-50">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center space-x-2 text-red-800">
            <AlertTriangle className="h-5 w-5" />
            <span>Urgent Validation</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-white rounded-lg p-4 border border-red-200">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <Badge variant="destructive" className="text-xs">
                    Due in {urgentValidation.dueIn}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {urgentValidation.type}
                  </Badge>
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">
                  {urgentValidation.document}
                </h4>
                <div className="flex items-center text-sm text-gray-600 space-x-4">
                  <div className="flex items-center space-x-1">
                    <User className="h-4 w-4" />
                    <span>{urgentValidation.submitter}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="font-medium">₹{urgentValidation.fee.toLocaleString()}</span>
                  </div>
                </div>
              </div>
              <Button variant="destructive" size="sm">
                Review Now
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pending Queue */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="h-5 w-5" />
            <span>Pending Queue ({pendingQueue.length} items)</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pendingQueue.map((item, index) => (
              <div key={item.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-xs font-mono text-gray-500">
                        {item.id}
                      </span>
                      {item.autoPopulated > 0 && (
                        <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                          {item.autoPopulated}% auto-populated
                        </Badge>
                      )}
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      {item.document}
                    </h4>
                    <div className="flex items-center text-sm text-gray-600 space-x-4 mb-2">
                      <div className="flex items-center space-x-1">
                        <User className="h-4 w-4" />
                        <span>{item.submitter}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{item.submittedTime}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span className="font-medium">₹{item.fee.toLocaleString()}</span>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {item.status}
                    </Badge>
                  </div>
                  <Button variant="outline" size="sm">
                    Start Validation
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PendingValidations;
