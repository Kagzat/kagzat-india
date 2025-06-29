
import { Clock, Users, FileCheck, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const TeamRequests = () => {
  const teamRequests = [
    {
      department: 'Engineering',
      requestCount: 24,
      pending: 18,
      inProgress: 6,
      urgent: 3,
      totalEmployees: 87,
      progress: 75
    },
    {
      department: 'Sales',
      requestCount: 15,
      pending: 8,
      inProgress: 7,
      urgent: 1,
      totalEmployees: 34,
      progress: 47
    },
    {
      department: 'HR',
      requestCount: 8,
      pending: 3,
      inProgress: 5,
      urgent: 0,
      totalEmployees: 12,
      progress: 63
    }
  ];

  const recentRequests = [
    {
      employee: 'Priya Sharma',
      department: 'Engineering',
      document: 'IIT Delhi B.Tech Certificate',
      status: 'In Progress',
      submittedTime: '2 hours ago',
      priority: 'express'
    },
    {
      employee: 'Amit Patel',
      department: 'Sales',
      document: 'MBA Degree Verification',
      status: 'Pending',
      submittedTime: '5 hours ago',
      priority: 'normal'
    },
    {
      employee: 'Kavya Reddy',
      department: 'HR',
      document: 'Previous Employment Letter',
      status: 'Under Review',
      submittedTime: '1 day ago',
      priority: 'normal'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Department Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5" />
            <span>Department Overview</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {teamRequests.map((dept, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <h4 className="font-semibold text-gray-900">{dept.department}</h4>
                    <Badge variant="outline" className="text-xs">
                      {dept.totalEmployees} employees
                    </Badge>
                    {dept.urgent > 0 && (
                      <Badge variant="destructive" className="text-xs">
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        {dept.urgent} urgent
                      </Badge>
                    )}
                  </div>
                  <Button variant="outline" size="sm">View All</Button>
                </div>
                
                <div className="grid grid-cols-3 gap-4 mb-3">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">{dept.requestCount}</p>
                    <p className="text-xs text-gray-600">Total Requests</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-orange-600">{dept.pending}</p>
                    <p className="text-xs text-gray-600">Pending</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">{dept.inProgress}</p>
                    <p className="text-xs text-gray-600">In Progress</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Completion Progress</span>
                    <span>{dept.progress}%</span>
                  </div>
                  <Progress value={dept.progress} className="h-2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Individual Requests */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileCheck className="h-5 w-5" />
            <span>Recent Individual Requests</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentRequests.map((request, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-medium text-gray-900">{request.employee}</h4>
                    <Badge variant="outline" className="text-xs">
                      {request.department}
                    </Badge>
                    {request.priority === 'express' && (
                      <Badge variant="destructive" className="text-xs">Express</Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{request.document}</p>
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <span>Status: {request.status}</span>
                    <span>{request.submittedTime}</span>
                  </div>
                </div>
                <Button variant="outline" size="sm">Manage</Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeamRequests;
