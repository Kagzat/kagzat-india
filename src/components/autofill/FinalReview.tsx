
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { CheckCircle, Clock, Star, FileText, ArrowLeft, CreditCard, User, Building, Calculator } from 'lucide-react';

interface FinalReviewProps {
  service: {
    name: string;
    organization: string;
    price: number;
    currency: string;
    timeRange: string;
    rating: number;
    reviews: number;
  };
  onBack: () => void;
  onNext: () => void;
}

const FinalReview = ({ service, onBack, onNext }: FinalReviewProps) => {
  const [expressProcessing, setExpressProcessing] = useState(false);

  const applicantDetails = {
    name: "Rajesh Kumar",
    email: "rajesh.kumar@email.com",
    studentId: "HBS2019-1247",
    graduationYear: "2021"
  };

  const documents = [
    { name: "Harvard_Official_Transcript.pdf", size: "2.3 MB" },
    { name: "Student_ID_Card.jpg", size: "456 KB" },
    { name: "Diploma_Certificate.pdf", size: "1.8 MB" }
  ];

  const calculateTotal = () => {
    const verificationFee = service.price;
    const expressFee = expressProcessing ? 500 : 0;
    const platformFee = 50;
    const subtotal = verificationFee + expressFee + platformFee;
    const gst = Math.round(subtotal * 0.18);
    return subtotal + gst;
  };

  const costBreakdown = {
    verificationFee: service.price,
    expressFee: expressProcessing ? 500 : 0,
    platformFee: 50,
    gst: Math.round((service.price + (expressProcessing ? 500 : 0) + 50) * 0.18),
    total: calculateTotal()
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Final Review</h2>
        <p className="text-gray-600">Please review all details before proceeding to payment</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Form Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span>Harvard MBA Verification Request</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">Applicant Details</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm text-gray-600">Name</Label>
                      <p className="font-medium">{applicantDetails.name}</p>
                    </div>
                    <div>
                      <Label className="text-sm text-gray-600">Email</Label>
                      <p className="font-medium">{applicantDetails.email}</p>
                    </div>
                    <div>
                      <Label className="text-sm text-gray-600">Student ID</Label>
                      <p className="font-medium">{applicantDetails.studentId}</p>
                    </div>
                    <div>
                      <Label className="text-sm text-gray-600">Graduation Year</Label>
                      <p className="font-medium">{applicantDetails.graduationYear}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Documents */}
          <Card>
            <CardHeader>
              <CardTitle>Documents Attached</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {documents.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="font-medium">{doc.name}</p>
                        <p className="text-sm text-gray-500">{doc.size}</p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      Attached
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Validator Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Building className="h-5 w-5 text-blue-600" />
                <span>Validator Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg">{service.organization}</h3>
                  <p className="text-gray-600">Official Verification Service</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4 text-blue-600" />
                    <span className="text-sm">Expected: {service.timeRange}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm">{service.rating}/5 ({service.reviews} reviews)</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Cost Summary */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calculator className="h-5 w-5 text-green-600" />
                <span>Cost Breakdown</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Verification fee</span>
                  <span className="font-medium">₹{costBreakdown.verificationFee.toLocaleString()}</span>
                </div>
                
                <div className="space-y-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="express-processing" className="text-sm font-medium cursor-pointer">
                      Express processing (12 hours)
                    </Label>
                    <Switch 
                      id="express-processing"
                      checked={expressProcessing}
                      onCheckedChange={setExpressProcessing}
                    />
                  </div>
                  {expressProcessing && (
                    <div className="flex justify-between text-sm">
                      <span className="text-blue-700">Express fee</span>
                      <span className="font-medium text-blue-700">₹500</span>
                    </div>
                  )}
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Platform fee</span>
                  <span className="font-medium">₹{costBreakdown.platformFee}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">GST (18%)</span>
                  <span className="font-medium">₹{costBreakdown.gst}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span className="text-green-600">₹{costBreakdown.total.toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button onClick={onBack} variant="outline" className="w-full">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Preview
            </Button>
            <Button onClick={onNext} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              <CreditCard className="h-4 w-4 mr-2" />
              Proceed to Payment
            </Button>
          </div>

          <p className="text-xs text-gray-500 text-center">
            By proceeding, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
};

export default FinalReview;
