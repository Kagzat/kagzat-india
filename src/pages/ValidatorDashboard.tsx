
import { useState } from 'react';
import { Clock, CheckCircle, TrendingUp, Star, Bell, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ValidatorSidebar from '@/components/validator/ValidatorSidebar';
import PendingValidations from '@/components/validator/PendingValidations';
import RecentCompletions from '@/components/validator/RecentCompletions';
import PerformanceChart from '@/components/validator/PerformanceChart';
import DocumentTypeChart from '@/components/validator/DocumentTypeChart';
import QuickActions from '@/components/validator/QuickActions';
import NotificationCenter from '@/components/validator/NotificationCenter';
import ValidatorFormTemplates from '@/components/validator/ValidatorFormTemplates';

const ValidatorDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    {
      title: "Pending Validations",
      value: "8",
      icon: Clock,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      change: "+3 today"
    },
    {
      title: "Completed This Month",
      value: "47",
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-50",
      change: "+12 vs last month"
    },
    {
      title: "Average Rating",
      value: "4.8★",
      icon: Star,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
      change: "+0.2 this month"
    },
    {
      title: "Response Time",
      value: "2.3h",
      icon: TrendingUp,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      change: "-0.5h improvement"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <ValidatorSidebar 
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
              <h1 className="text-xl lg:text-2xl font-bold text-gray-900">Validator Dashboard</h1>
              <p className="text-gray-600 mt-1">Dr. Sarah Johnson - Harvard MBA Specialist</p>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="icon">
                <Bell className="h-4 w-4" />
              </Button>
              <Button className="w-full sm:w-auto">
                <Plus className="h-4 w-4 mr-2" />
                Quick Validate
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-4 lg:p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="templates">Form Templates</TabsTrigger>
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
                <div className="xl:col-span-2 space-y-6">
                  <PerformanceChart />
                  <PendingValidations />
                </div>
                <div className="space-y-6">
                  <QuickActions />
                  <DocumentTypeChart />
                  <NotificationCenter />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="pending">
              <PendingValidations />
            </TabsContent>

            <TabsContent value="completed">
              <RecentCompletions />
            </TabsContent>

            <TabsContent value="templates">
              <ValidatorFormTemplates />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ValidatorDashboard;
