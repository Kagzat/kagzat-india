
import { Users, UserPlus, Settings, Crown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const TeamManagement = () => {
  const teamStats = {
    totalMembers: 45,
    activeRequests: 127,
    adminUsers: 3,
    departments: 4
  };

  const recentActivity = [
    {
      user: 'HR Admin',
      action: 'Added 5 new employees to Engineering',
      time: '2 hours ago',
      type: 'add'
    },
    {
      user: 'John Smith',
      action: 'Bulk uploaded 12 certificates',
      time: '5 hours ago',
      type: 'upload'
    },
    {
      user: 'Admin',
      action: 'Updated validation workflow',
      time: '1 day ago',
      type: 'settings'
    }
  ];

  const admins = [
    { name: 'Sarah Johnson', role: 'Super Admin', department: 'IT', initial: 'SJ' },
    { name: 'Mike Chen', role: 'HR Admin', department: 'HR', initial: 'MC' },
    { name: 'Priya Sharma', role: 'Dept Admin', department: 'Engineering', initial: 'PS' }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>Team Overview</span>
            </div>
            <Button variant="outline" size="sm">
              <UserPlus className="h-4 w-4 mr-2" />
              Add Members
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <p className="text-2xl font-bold text-blue-600">{teamStats.totalMembers}</p>
              <p className="text-sm text-gray-600">Total Members</p>
            </div>
            <div className="text-center p-3 bg-orange-50 rounded-lg">
              <p className="text-2xl font-bold text-orange-600">{teamStats.activeRequests}</p>
              <p className="text-sm text-gray-600">Active Requests</p>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <p className="text-2xl font-bold text-purple-600">{teamStats.adminUsers}</p>
              <p className="text-sm text-gray-600">Admin Users</p>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <p className="text-2xl font-bold text-green-600">{teamStats.departments}</p>
              <p className="text-sm text-gray-600">Departments</p>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium text-gray-900 flex items-center space-x-2">
              <Crown className="h-4 w-4" />
              <span>Administrator Access</span>
            </h4>
            {admins.map((admin, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="text-xs">{admin.initial}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h5 className="font-medium text-gray-900">{admin.name}</h5>
                    <p className="text-sm text-gray-600">{admin.department}</p>
                  </div>
                </div>
                <Badge variant="outline" className="text-xs">
                  {admin.role}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 border rounded-lg">
                <div className="flex-shrink-0">
                  {activity.type === 'add' && <UserPlus className="h-4 w-4 text-green-600" />}
                  {activity.type === 'upload' && <Users className="h-4 w-4 text-blue-600" />}
                  {activity.type === 'settings' && <Settings className="h-4 w-4 text-purple-600" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.user}</p>
                  <p className="text-sm text-gray-600">{activity.action}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeamManagement;
