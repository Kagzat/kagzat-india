import { useState } from 'react';
import { Users, FileText, TrendingUp, DollarSign, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import OrganizationSidebar from '@/components/organization/OrganizationSidebar';
import TeamManagement from '@/components/organization/TeamManagement';
import TeamRequests from '@/components/organization/TeamRequests';
import ValidationMetrics from '@/components/organization/ValidationMetrics';
import BulkOperations from '@/components/organization/BulkOperations';
import AddValidatorModal from '@/components/organization/AddValidatorModal';
import FormBuilder from '@/pages/FormBuilder';

const OrganizationDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    {
      title: "Active Validators",
      value: "12",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      change: "+2 this month"
    },
    {
      title: "Pending Requests",
      value: "47",
      icon: FileText,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      change: "+8 today"
    },
    {
      title: "Completion Rate",
      value: "94%",
      icon: TrendingUp,
      color: "text-green-600",
      bgColor: "bg-green-50",
      change: "+2% this week"
    },
    {
      title: "Revenue (This Month)",
      value: "₹2,45,000",
      icon: DollarSign,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      change: "+12% vs last month"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <OrganizationSidebar 
        open={sidebarOpen} 
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      
      <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'} min-w-0`}>
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-4 lg:px-6 py-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
            <div>
              <h1 className="text-xl lg:text-2xl font-bold text-gray-900">Organization Dashboard</h1>
              <p className="text-gray-600 mt-1">Harvard Business School</p>
            </div>
            <AddValidatorModal
              trigger={
                <Button className="w-full sm:w-auto">
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Validator
                </Button>
              }
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="p-4 lg:p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="team">Team</TabsTrigger>
              <TabsTrigger value="requests">Requests</TabsTrigger>
              <TabsTrigger value="forms">Form Builder</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <Card key={index} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4 lg:p-6">
                        <div className="flex items-center justify-between">
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium text-gray-600 truncate">{stat.title}</p>
                            <p className="text-xl lg:text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                            <p className="text-xs text-gray-500 mt-1">{stat.change}</p>
                          </div>
                          <div className={`p-3 rounded-full ${stat.bgColor} flex-shrink-0`}>
                            <Icon className={`h-5 w-5 lg:h-6 lg:w-6 ${stat.color}`} />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {/* Main Dashboard Grid */}
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
                <div className="xl:col-span-2">
                  <ValidationMetrics />
                </div>
                <div>
                  <BulkOperations />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="team">
              <TeamManagement />
            </TabsContent>

            <TabsContent value="requests">
              <TeamRequests />
            </TabsContent>

            <TabsContent value="forms">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <FormBuilder />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default OrganizationDashboard;
