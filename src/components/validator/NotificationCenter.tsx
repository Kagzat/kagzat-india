
import { useState } from 'react';
import { Bell, Star, DollarSign, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

const NotificationCenter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications] = useState([
    {
      id: 1,
      type: 'new_request',
      icon: FileText,
      title: 'New validation request received',
      message: 'Harvard MBA Certificate verification from Rajesh Kumar',
      time: '5 minutes ago',
      unread: true
    },
    {
      id: 2,
      type: 'payment',
      icon: DollarSign,
      title: 'Payment processed for SUB-001',
      message: '₹2,500 has been credited to your account',
      time: '2 hours ago',
      unread: true
    },
    {
      id: 3,
      type: 'rating',
      icon: Star,
      title: 'User rated your service 5 stars',
      message: 'Priya Sharma left a positive review',
      time: '1 day ago',
      unread: false
    }
  ]);

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="relative"
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <Badge 
            variant="destructive" 
            className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs"
          >
            {unreadCount}
          </Badge>
        )}
      </Button>

      {isOpen && (
        <Card className="absolute right-0 top-full mt-2 w-80 z-50 shadow-lg">
          <CardContent className="p-0">
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-semibold text-gray-900">Notifications</h3>
            </div>
            <div className="max-h-96 overflow-y-auto">
              {notifications.map((notification) => {
                const Icon = notification.icon;
                return (
                  <div
                    key={notification.id}
                    className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
                      notification.unread ? 'bg-blue-50' : ''
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        <Icon className="h-5 w-5 text-gray-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm text-gray-900">
                          {notification.title}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          {notification.message}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {notification.time}
                        </p>
                      </div>
                      {notification.unread && (
                        <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0 mt-2" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default NotificationCenter;
