
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Mail, MessageSquare, ArrowLeft, Bell, CheckCircle } from 'lucide-react';

interface NotificationDemoProps {
  onBack: () => void;
}

const NotificationDemo = ({ onBack }: NotificationDemoProps) => {
  const emailContent = {
    subject: "Verification Request Submitted - SUB-HBS-240629-001",
    from: "notifications@kagzat.com",
    to: "rajesh.kumar@email.com",
    content: `Dear Rajesh Kumar,

Your Harvard MBA verification request has been successfully submitted and payment has been confirmed.

Submission Details:
• Submission ID: SUB-HBS-240629-001
• Transaction ID: TXN123456789
• Amount Paid: ₹3,599
• Submitted To: Harvard Business School
• Expected Completion: July 1, 2025, 6:00 PM

You can track the status of your verification request using the link below:
https://kagzat.com/track/SUB-HBS-240629-001

If you have any questions, please contact our support team at support@kagzat.com

Best regards,
Team Kagzat`
  };

  const smsContent = "Kagzat: Your Harvard MBA verification request has been submitted. Track status: kagzat.com/track/SUB-HBS-240629-001";

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Bell className="h-10 w-10 text-blue-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Notification Demo</h2>
        <p className="text-gray-600">Here's how users receive confirmation notifications</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Email Notification */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Mail className="h-5 w-5 text-blue-600" />
              <span>Email Confirmation</span>
              <Badge className="bg-green-100 text-green-800 ml-2">
                <CheckCircle className="h-3 w-3 mr-1" />
                Sent
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg border">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">From:</span>
                    <span className="text-gray-900">{emailContent.from}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">To:</span>
                    <span className="text-gray-900">{emailContent.to}</span>
                  </div>
                  <div className="flex justify-between items-start">
                    <span className="font-medium text-gray-600">Subject:</span>
                    <span className="text-gray-900 text-right flex-1 ml-2">
                      {emailContent.subject}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg border max-h-64 overflow-y-auto">
                <pre className="text-sm text-gray-700 whitespace-pre-wrap font-sans">
                  {emailContent.content}
                </pre>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* SMS Notification */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MessageSquare className="h-5 w-5 text-green-600" />
              <span>SMS Notification</span>
              <Badge className="bg-green-100 text-green-800 ml-2">
                <CheckCircle className="h-3 w-3 mr-1" />
                Delivered
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg border">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">To:</span>
                    <span className="text-gray-900">+91 98765 43210</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Time:</span>
                    <span className="text-gray-900">{new Date().toLocaleTimeString('en-IN')}</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <MessageSquare className="h-4 w-4 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-green-800 font-medium">SMS Message</p>
                    <p className="text-sm text-green-700 mt-1">{smsContent}</p>
                  </div>
                </div>
              </div>
              
              {/* Mobile Preview */}
              <div className="bg-gray-100 p-4 rounded-lg">
                <p className="text-xs text-gray-600 mb-2">Mobile Preview:</p>
                <div className="bg-white rounded-lg p-3 border shadow-sm max-w-xs">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-xs font-medium">Kagzat</span>
                    <span className="text-xs text-gray-500 ml-auto">now</span>
                  </div>
                  <p className="text-xs text-gray-800">{smsContent}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Features */}
      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Notification Features</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Mail className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-medium text-gray-900 mb-2">Email Notifications</h3>
                <p className="text-sm text-gray-600">
                  Detailed confirmation emails with tracking links and receipt attachments
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <MessageSquare className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-medium text-gray-900 mb-2">SMS Updates</h3>
                <p className="text-sm text-gray-600">
                  Instant SMS notifications for important status updates and completions
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Bell className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-medium text-gray-900 mb-2">Real-time Tracking</h3>
                <p className="text-sm text-gray-600">
                  Live status updates and progress notifications throughout the verification process
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Demo Controls */}
      <div className="mt-8 text-center">
        <Button onClick={onBack} variant="outline" className="mr-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Restart Demo
        </Button>
        <Badge variant="secondary" className="px-4 py-2">
          Demo Complete - Full Workflow Shown
        </Badge>
      </div>
    </div>
  );
};

export default NotificationDemo;
