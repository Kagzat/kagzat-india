
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
      
      <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'}`}>
        {/* Header Section */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Welcome back, Dr. Sarah Johnson</h1>
              <Badge variant="secondary" className="mt-1 bg-green-100 text-green-800">
                Verified Professional Validator
              </Badge>
            </div>
            <NotificationCenter />
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
            {/* Left Column - Pending Work */}
            <div className="lg:col-span-2 space-y-6">
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
