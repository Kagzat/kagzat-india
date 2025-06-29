
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { CheckCircle, Download, Eye, LayoutDashboard, CreditCard, Building, Clock, Mail } from 'lucide-react';

interface PaymentSuccessProps {
  onNext: () => void;
}

const PaymentSuccess = ({ onNext }: PaymentSuccessProps) => {
  const transactionDetails = {
    transactionId: "TXN123456789",
    amount: 3599,
    paymentMethod: "UPI - Google Pay",
    submissionId: "SUB-HBS-240629-001",
    submittedTo: "Harvard Business School",
    expectedCompletion: "July 1, 2025, 6:00 PM",
    status: "Submitted for verification",
    email: "rajesh.kumar@email.com"
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="h-10 w-10 text-green-600" />
        </div>
        <h2 className="text-3xl font-bold text-green-600 mb-4">Payment Successful!</h2>
        <p className="text-gray-600">Your verification request has been submitted successfully</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Transaction Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CreditCard className="h-5 w-5 text-green-600" />
                <span>Payment Details</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Transaction ID</label>
                  <p className="text-gray-900 font-mono">{transactionDetails.transactionId}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Amount Paid</label>
                  <p className="text-gray-900 font-semibold">₹{transactionDetails.amount.toLocaleString()}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Payment Method</label>
                  <p className="text-gray-900">{transactionDetails.paymentMethod}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Date & Time</label>
                  <p className="text-gray-900">{new Date().toLocaleString('en-IN')}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Submission Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Building className="h-5 w-5 text-blue-600" />
                <span>Verification Request Details</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Submission ID</label>
                    <p className="text-gray-900 font-mono">{transactionDetails.submissionId}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Submitted To</label>
                    <p className="text-gray-900">{transactionDetails.submittedTo}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Expected Completion</label>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-blue-600" />
                      <p className="text-gray-900">{transactionDetails.expectedCompletion}</p>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Status</label>
                    <Badge className="bg-blue-100 text-blue-800">
                      {transactionDetails.status}
                    </Badge>
                  </div>
                </div>
                
                <Separator />
                
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <div className="flex items-start space-x-3">
                    <Mail className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-blue-900">Email Confirmation Sent</h4>
                      <p className="text-sm text-blue-700 mt-1">
                        A confirmation email has been sent to{' '}
                        <span className="font-medium">{transactionDetails.email}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Panel */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                <Download className="h-4 w-4 mr-2" />
                Download Receipt
              </Button>
              <Button variant="outline" className="w-full">
                <Eye className="h-4 w-4 mr-2" />
                Track Status
              </Button>
              <Button variant="outline" className="w-full">
                <LayoutDashboard className="h-4 w-4 mr-2" />
                Go to Dashboard
              </Button>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card>
            <CardHeader>
              <CardTitle>What's Next?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                    <span className="text-xs font-bold text-blue-600">1</span>
                  </div>
                  <div>
                    <p className="font-medium text-sm">Verification in Progress</p>
                    <p className="text-xs text-gray-600">Your request is being processed by Harvard Business School</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center mt-0.5">
                    <span className="text-xs font-bold text-gray-400">2</span>
                  </div>
                  <div>
                    <p className="font-medium text-sm text-gray-600">Verification Complete</p>
                    <p className="text-xs text-gray-500">You'll receive an email notification once complete</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center mt-0.5">
                    <span className="text-xs font-bold text-gray-400">3</span>
                  </div>
                  <div>
                    <p className="font-medium text-sm text-gray-600">Download Certificate</p>
                    <p className="text-xs text-gray-500">Access your verified document</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Continue Demo */}
          <Button onClick={onNext} variant="outline" className="w-full">
            Continue Demo - View Notifications
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
