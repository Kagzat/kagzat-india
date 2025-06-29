import { useState } from 'react';
import { FileText, Clock, CheckCircle, Star, Search, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import UserSidebar from '@/components/user/UserSidebar';
import ActiveRequests from '@/components/user/ActiveRequests';
import RecentSubmissions from '@/components/user/RecentSubmissions';
import DocumentLibrary from '@/components/user/DocumentLibrary';
import QuickSubmit from '@/components/user/QuickSubmit';

const UserDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const quickStats = [
    {
      title: "Active Requests",
      value: "5",
      icon: Clock,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "Completed Verifications",
      value: "18",
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      title: "Documents Stored",
      value: "24",
      icon: FileText,
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      title: "Average Rating",
      value: "4.8★",
      icon: Star,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <UserSidebar open={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'} min-w-0`}>
        {/* Header Section */}
        <div className="bg-white border-b border-gray-200 px-4 lg:px-6 py-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
            <div className="min-w-0">
              <h1 className="text-xl lg:text-2xl font-bold text-gray-900 truncate">Welcome back, Rajesh Kumar</h1>
              <Badge variant="secondary" className="mt-1 bg-blue-100 text-blue-800">
                Premium Member
              </Badge>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input 
                  placeholder="Search documents, requests..." 
                  className="pl-10 w-full sm:w-80"
                />
              </div>
              <Button className="w-full sm:w-auto flex-shrink-0">
                <Plus className="h-4 w-4 mr-2" />
                New Request
              </Button>
            </div>
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
                        <p className="text-xl lg:text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
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
            {/* Left Column - Active Requests */}
            <div className="xl:col-span-2 space-y-6">
              <ActiveRequests />
              <RecentSubmissions />
            </div>

            {/* Right Column - Tools & Library */}
            <div className="space-y-6">
              <QuickSubmit />
              <DocumentLibrary />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
