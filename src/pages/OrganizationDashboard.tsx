
import { useState } from 'react';
import { Building, Users, FileCheck, TrendingUp, Search, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import OrganizationSidebar from '@/components/organization/OrganizationSidebar';
import TeamRequests from '@/components/organization/TeamRequests';
import ValidationMetrics from '@/components/organization/ValidationMetrics';
import TeamManagement from '@/components/organization/TeamManagement';
import BulkOperations from '@/components/organization/BulkOperations';

const OrganizationDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const quickStats = [
    {
      title: "Team Members",
      value: "45",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "Active Requests",
      value: "127",
      icon: FileCheck,
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    },
    {
      title: "Completed This Month",
      value: "384",
      icon: TrendingUp,
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      title: "Success Rate",
      value: "97.2%",
      icon: Building,
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <OrganizationSidebar open={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'}`}>
        {/* Header Section */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">TechCorp Solutions</h1>
              <Badge variant="secondary" className="mt-1 bg-purple-100 text-purple-800">
                Enterprise Account
              </Badge>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input 
                  placeholder="Search employees, requests..." 
                  className="pl-10 w-80"
                />
              </div>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Bulk Upload
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {quickStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                        <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                      </div>
                      <div className={`p-3 rounded-full ${stat.bgColor}`}>
                        <Icon className={`h-6 w-6 ${stat.color}`} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Team Requests */}
            <div className="lg:col-span-2 space-y-6">
              <TeamRequests />
              <ValidationMetrics />
            </div>

            {/* Right Column - Management Tools */}
            <div className="space-y-6">
              <BulkOperations />
              <TeamManagement />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizationDashboard;
