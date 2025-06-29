
import { Settings, User, Download, Moon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';

const QuickActions = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Moon className="h-4 w-4 text-gray-600" />
            <span className="text-sm font-medium">Set Away Status</span>
          </div>
          <Switch />
        </div>
        
        <Button variant="outline" size="sm" className="w-full justify-start">
          <Settings className="h-4 w-4 mr-2" />
          Update Pricing
        </Button>
        
        <Button variant="outline" size="sm" className="w-full justify-start">
          <User className="h-4 w-4 mr-2" />
          View Public Profile
        </Button>
        
        <Button variant="outline" size="sm" className="w-full justify-start">
          <Download className="h-4 w-4 mr-2" />
          Download Tax Report
        </Button>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
