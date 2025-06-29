
import { Clock, AlertTriangle, CheckCircle, Eye } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const ActiveRequests = () => {
  const activeRequests = [
    {
      id: 'SUB-HBS-240629-001',
      document: 'Harvard MBA Certificate',
      validator: 'Harvard Business School',
      submittedDate: '2 hours ago',
      status: 'Under Review',
      progress: 65,
      fee: 2500,
      priority: 'normal',
      estimatedCompletion: 'July 1, 2025, 6:00 PM'
    },
    {
      id: 'SUB-IIT-240629-002',
      document: 'IIT Delhi Engineering Degree',
      validator: 'Dr. Sarah Johnson',
      submittedDate: '5 hours ago',
      status: 'Document Analysis',
      progress: 30,
      fee: 1800,
      priority: 'express',
      estimatedCompletion: 'Today, 11:30 PM'
    },
    {
      id: 'SUB-MAR-240629-003',
      document: 'Marriage Certificate',
      validator: 'Government Registry',
      submittedDate: '1 day ago',
      status: 'Awaiting Additional Info',
      progress: 10,
      fee: 800,
      priority: 'normal',
      estimatedCompletion: 'July 2, 2025, 2:00 PM'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Under Review': return 'bg-blue-100 text-blue-800';
      case 'Document Analysis': return 'bg-yellow-100 text-yellow-800';
      case 'Awaiting Additional Info': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Clock className="h-5 w-5" />
          <span>Active Verification Requests ({activeRequests.length})</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activeRequests.map((request) => (
            <div key={request.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-xs font-mono text-gray-500">{request.id}</span>
                    {request.priority === 'express' && (
                      <Badge variant="destructive" className="text-xs">
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        Express
                      </Badge>
                    )}
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-1">{request.document}</h4>
                  <p className="text-sm text-gray-600 mb-2">Validator: {request.validator}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>Submitted {request.submittedDate}</span>
                    <span>₹{request.fee.toLocaleString()}</span>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  View Details
                </Button>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className={getStatusColor(request.status)}>
                    {request.status}
                  </Badge>
                  <span className="text-sm text-gray-600">{request.progress}% complete</span>
                </div>
                <Progress value={request.progress} className="h-2" />
                <p className="text-xs text-gray-500">
                  Expected completion: {request.estimatedCompletion}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ActiveRequests;
