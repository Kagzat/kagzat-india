import { useState } from 'react';
import { Bell, Calendar, Clock, DollarSign, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import ValidatorSidebar from '@/components/validator/ValidatorSidebar';
import PendingValidations from '@/components/validator/PendingValidations';
import PerformanceChart from '@/components/validator/PerformanceChart';
import RecentCompletions from '@/components/validator/RecentCompletions';
import QuickActions from '@/components/validator/QuickActions';
import DocumentTypeChart from '@/components/validator/DocumentTypeChart';
import NotificationCenter from '@/components/validator/NotificationCenter';

const ValidatorDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const quickStats = [
    {
      title: "Pending Validations",
      value: "12",
      icon: Clock,
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    },
    {
      title: "Completed This Week",
      value: "28",
      icon: TrendingUp,
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      title: "Average Response Time",
      value: "3.2 hours",
      icon: Calendar,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "Earnings This Month",
      value: "₹45,600",
      icon: DollarSign,
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <ValidatorSidebar open={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'} min-w-0`}>
        {/* Header Section */}
        <div className="bg-white border-b border-gray-200 px-4 lg:px-6 py-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
            <div className="min-w-0">
              <h1 className="text-xl lg:text-2xl font-bold text-gray-900 truncate">Welcome back, Dr. Sarah Johnson</h1>
              <Badge variant="secondary" className="mt-1 bg-green-100 text-green-800">
                Verified Professional Validator
              </Badge>
            </div>
            <NotificationCenter />
          </div>
        </div>

        {/* Quick Stats */}
        <div className="p-4 lg:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
            {quickStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4 lg:p-6">
                    <div className="flex items-center justify-between">
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-gray-600 truncate">{stat.title}</p>
                        <p className="text-xl lg:text-2xl font-bold text-gray-900 mt-1 break-words">{stat.value}</p>
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
            {/* Left Column - Pending Work */}
            <div className="xl:col-span-2 space-y-6">
              <PendingValidations />
            </div>

            {/* Right Column - Overview & Tools */}
            <div className="space-y-6">
              <PerformanceChart />
              <RecentCompletions />
              <QuickActions />
              <DocumentTypeChart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValidatorDashboard;
