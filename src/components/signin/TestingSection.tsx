
import { User, Shield, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const TestingSection = () => {
  const navigate = useNavigate();

  const handleRoleNavigation = (role: 'user' | 'validator' | 'organization') => {
    const dashboardRoutes = {
      user: '/user-dashboard',
      validator: '/validator-dashboard',
      organization: '/organization-dashboard'
    };
    navigate(dashboardRoutes[role]);
  };

  return (
    <div className="mt-6 pt-4 border-t border-gray-200 bg-gray-50 -mx-6 px-6 pb-6 rounded-b-lg">
      <div className="text-center mb-4">
        <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">
          Testing Mode
        </p>
        <p className="text-xs text-gray-400 mt-1">
          Quick access to dashboards
        </p>
      </div>
      <div className="grid grid-cols-1 gap-2">
        <Button
          onClick={() => handleRoleNavigation('user')}
          variant="outline"
          className="w-full text-left justify-start h-auto py-3 px-4 border-gray-200 hover:bg-gray-100"
        >
          <User className="h-4 w-4 mr-3 text-blue-600" />
          <div className="text-left">
            <div className="text-sm font-medium text-gray-700">User Dashboard</div>
            <div className="text-xs text-gray-500">Document submission & tracking</div>
          </div>
        </Button>
        <Button
          onClick={() => handleRoleNavigation('validator')}
          variant="outline"
          className="w-full text-left justify-start h-auto py-3 px-4 border-gray-200 hover:bg-gray-100"
        >
          <Shield className="h-4 w-4 mr-3 text-green-600" />
          <div className="text-left">
            <div className="text-sm font-medium text-gray-700">Validator Dashboard</div>
            <div className="text-xs text-gray-500">Document validation & approval</div>
          </div>
        </Button>
        <Button
          onClick={() => handleRoleNavigation('organization')}
          variant="outline"
          className="w-full text-left justify-start h-auto py-3 px-4 border-gray-200 hover:bg-gray-100"
        >
          <Building2 className="h-4 w-4 mr-3 text-purple-600" />
          <div className="text-left">
            <div className="text-sm font-medium text-gray-700">Organization Dashboard</div>
            <div className="text-xs text-gray-500">Team & workflow management</div>
          </div>
        </Button>
      </div>
    </div>
  );
};

export default TestingSection;
