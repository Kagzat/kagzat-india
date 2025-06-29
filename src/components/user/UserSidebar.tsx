
import { useState } from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  Clock, 
  CheckCircle, 
  CreditCard, 
  Settings, 
  HelpCircle,
  Menu,
  X,
  Star
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface UserSidebarProps {
  open: boolean;
  onToggle: () => void;
}

const UserSidebar = ({ open, onToggle }: UserSidebarProps) => {
  const [activeItem, setActiveItem] = useState('dashboard');

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, badge: null },
    { id: 'active', label: 'Active Requests', icon: Clock, badge: '5' },
    { id: 'completed', label: 'Completed', icon: CheckCircle, badge: null },
    { id: 'documents', label: 'My Documents', icon: FileText, badge: null },
    { id: 'payments', label: 'Payments & Billing', icon: CreditCard, badge: null },
    { id: 'reviews', label: 'My Reviews', icon: Star, badge: null },
    { id: 'settings', label: 'Account Settings', icon: Settings, badge: null },
    { id: 'help', label: 'Help & Support', icon: HelpCircle, badge: null },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}
      
      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-full bg-white border-r border-gray-200 z-50 transition-all duration-300 ${
        open ? 'w-64' : 'w-16'
      }`}>
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            {open && (
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">K</span>
                </div>
                <span className="font-semibold text-gray-900">Kagzat</span>
              </div>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggle}
              className="p-2"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4">
          <div className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeItem === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveItem(item.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive 
                      ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  {open && (
                    <>
                      <span className="flex-1 text-left">{item.label}</span>
                      {item.badge && (
                        <Badge variant="secondary" className="bg-blue-100 text-blue-800 text-xs">
                          {item.badge}
                        </Badge>
                      )}
                    </>
                  )}
                </button>
              );
            })}
          </div>
        </nav>
      </div>
    </>
  );
};

export default UserSidebar;
