
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { CheckCircle, Clock, DollarSign, FileText, Mail, ArrowLeft, CreditCard } from 'lucide-react';

interface SubmissionPreviewProps {
  service: {
    name: string;
    organization: string;
    price: number;
    currency: string;
    timeRange: string;
  };
  onBack: () => void;
}

const SubmissionPreview = ({ service, onBack }: SubmissionPreviewProps) => {
  const submissionData = {
    fullName: "Rajesh Kumar",
    studentId: "HBS2019-1247",
    email: "rajesh.kumar@email.com",
    graduationYear: "2021",
    program: "Master of Business Administration",
    degreeClassification: "MBA with Distinction",
    reasonForVerification: "Employment Verification",
    deliveryMethod: "Email (PDF)",
    specialInstructions: "Please include digital signature and seal"
  };

  const costBreakdown = {
    verificationFee: service.price,
    platformFee: 50,
    total: service.price + 50
  };

  const estimatedCompletion = new Date();
  estimatedCompletion.setHours(estimatedCompletion.getHours() + 36);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Review & Confirm</h2>
        <p className="text-gray-600">Please review all information before making payment</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Summary */}
        <div className="lg:col-span-2 space-y-6">
          {/* Service Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span>Verification Service</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg text-gray-900">{service.name}</h3>
                  <p className="text-gray-600">{service.organization}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-blue-600" />
                    <span className="text-sm text-gray-600">Expected: {service.timeRange}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-gray-600">Email Delivery</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Submitted Information */}
          <Card>
            <CardHeader>
              <CardTitle>Submitted Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(submissionData).map(([key, value]) => (
                  <div key={key} className="space-y-1">
                    <label className="text-sm font-medium text-gray-600 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </label>
                    <p className="text-gray-900">{value}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Documents */}
          <Card>
            <CardHeader>
              <CardTitle>Attached Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  "Harvard_Official_Transcript.pdf",
                  "Student_ID_Card.jpg", 
                  "Diploma_Certificate.pdf"
                ].map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-5 w-5 text-blue-600" />
                      <span className="font-medium">{doc}</span>
                    </div>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      Verified
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Payment Summary */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <DollarSign className="h-5 w-5 text-green-600" />
                <span>Payment Summary</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Verification Fee</span>
                  <span className="font-medium">₹{costBreakdown.verificationFee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Platform Fee</span>
                  <span className="font-medium">₹{costBreakdown.platformFee}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span className="text-green-600">₹{costBreakdown.total.toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Expected Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                  <div>
                    <p className="font-medium">Payment Confirmation</p>
                    <p className="text-sm text-gray-600">Immediate</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div>
                    <p className="font-medium">Verification Process</p>
                    <p className="text-sm text-gray-600">24-48 hours</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                  <div>
                    <p className="font-medium">Completion</p>
                    <p className="text-sm text-gray-600">
                      {estimatedCompletion.toLocaleDateString('en-IN', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Auto-fill Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Auto-Fill Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Auto-filled fields</span>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">6/9</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Time saved</span>
                  <span className="text-sm font-medium text-green-600">~5 minutes</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Accuracy</span>
                  <span className="text-sm font-medium text-green-600">93%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button onClick={onBack} variant="outline" className="w-full">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Edit
            </Button>
            <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
              <CreditCard className="h-4 w-4 mr-2" />
              Confirm & Pay ₹{costBreakdown.total.toLocaleString()}
            </Button>
          </div>

          <p className="text-xs text-gray-500 text-center">
            Secure payment powered by Razorpay. Your data is encrypted and protected.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SubmissionPreview;
