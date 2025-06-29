
import { useState } from 'react';
import { 
  LayoutDashboard, 
  Clock, 
  CheckCircle, 
  DollarSign, 
  Settings, 
  HelpCircle,
  Menu,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ValidatorSidebarProps {
  open: boolean;
  onToggle: () => void;
}

const ValidatorSidebar = ({ open, onToggle }: ValidatorSidebarProps) => {
  const [activeItem, setActiveItem] = useState('dashboard');

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, badge: null },
    { id: 'pending', label: 'Pending Validations', icon: Clock, badge: '12' },
    { id: 'completed', label: 'Completed Validations', icon: CheckCircle, badge: null },
    { id: 'earnings', label: 'Earnings & Reports', icon: DollarSign, badge: null },
    { id: 'settings', label: 'Profile Settings', icon: Settings, badge: null },
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
                        <Badge variant="secondary" className="bg-red-100 text-red-800 text-xs">
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

export default ValidatorSidebar;
