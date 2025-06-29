
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Edit, FileText, Info, Eye, AlertTriangle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface AutoFilledFormProps {
  onNext: () => void;
}

const AutoFilledForm = ({ onNext }: AutoFilledFormProps) => {
  const [formData, setFormData] = useState({
    fullName: "Rajesh Kumar",
    studentId: "HBS2019-1247",
    email: "rajesh.kumar@email.com",
    graduationYear: "2021",
    program: "Master of Business Administration",
    degreeClassification: "MBA with Distinction",
    reasonForVerification: "",
    deliveryMethod: "",
    specialInstructions: ""
  });

  const [verificationStatus, setVerificationStatus] = useState({
    fullName: true,
    studentId: true,
    email: true,
    graduationYear: true,
    program: true,
    degreeClassification: true
  });

  const autoFilledFields = [
    {
      key: 'fullName',
      label: 'Full Name',
      confidence: 95,
      source: 'Harvard_Transcript.pdf, page 1',
      required: true
    },
    {
      key: 'studentId',
      label: 'Student ID',
      confidence: 98,
      source: 'Student_ID_Card.jpg',
      required: true
    },
    {
      key: 'email',
      label: 'Email Address',
      confidence: 92,
      source: 'Harvard_Transcript.pdf, page 1',
      required: true
    },
    {
      key: 'graduationYear',
      label: 'Graduation Year',
      confidence: 100,
      source: 'Diploma_Certificate.pdf',
      required: true
    },
    {
      key: 'program',
      label: 'Program',
      confidence: 96,
      source: 'Diploma_Certificate.pdf',
      required: true
    },
    {
      key: 'degreeClassification',
      label: 'Degree Classification',
      confidence: 78,
      source: 'Harvard_Transcript.pdf, page 2',
      required: false
    }
  ];

  const getConfidenceBadge = (confidence: number) => {
    if (confidence >= 90) return { color: 'bg-green-100 text-green-800', label: 'High' };
    if (confidence >= 70) return { color: 'bg-yellow-100 text-yellow-800', label: 'Medium' };
    return { color: 'bg-red-100 text-red-800', label: 'Low' };
  };

  const toggleVerification = (field: string) => {
    setVerificationStatus(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  return (
    <TooltipProvider>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Harvard MBA Verification Request</h2>
          <p className="text-gray-600">Review and verify the auto-filled information before submission</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span>Auto-Filled Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Auto-filled Fields */}
                {autoFilledFields.map((field) => {
                  const confidenceBadge = getConfidenceBadge(field.confidence);
                  const isVerified = verificationStatus[field.key as keyof typeof verificationStatus];
                  
                  return (
                    <div key={field.key} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label className="flex items-center space-x-2">
                          <span>{field.label}</span>
                          {field.required && <span className="text-red-500">*</span>}
                        </Label>
                        <div className="flex items-center space-x-2">
                          <Badge className={confidenceBadge.color}>
                            {field.confidence}% {confidenceBadge.label}
                          </Badge>
                          <Tooltip>
                            <TooltipTrigger>
                              <Info className="h-4 w-4 text-gray-400" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Extracted from: {field.source}</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                      </div>
                      
                      <div className="relative">
                        <Input
                          value={formData[field.key as keyof typeof formData]}
                          onChange={(e) => setFormData(prev => ({
                            ...prev,
                            [field.key]: e.target.value
                          }))}
                          className={`pr-20 ${isVerified ? 'bg-green-50 border-green-300' : 'bg-white'}`}
                        />
                        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleVerification(field.key)}
                            className={`p-1 h-6 w-6 ${isVerified ? 'text-green-600' : 'text-gray-400'}`}
                          >
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="p-1 h-6 w-6 text-blue-600"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* Manual Fields */}
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Information Required</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="reason">Reason for Verification *</Label>
                      <Select onValueChange={(value) => setFormData(prev => ({ ...prev, reasonForVerification: value }))}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select reason" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="employment">Employment Verification</SelectItem>
                          <SelectItem value="immigration">Immigration Process</SelectItem>
                          <SelectItem value="further-education">Further Education</SelectItem>
                          <SelectItem value="personal">Personal Records</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="delivery">Delivery Method *</Label>
                      <Select onValueChange={(value) => setFormData(prev => ({ ...prev, deliveryMethod: value }))}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select delivery method" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="email">Email (PDF)</SelectItem>
                          <SelectItem value="courier">Courier (Physical Copy)</SelectItem>
                          <SelectItem value="pickup">Self Pickup</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="instructions">Special Instructions (Optional)</Label>
                      <Textarea
                        id="instructions"
                        value={formData.specialInstructions}
                        onChange={(e) => setFormData(prev => ({ ...prev, specialInstructions: e.target.value }))}
                        placeholder="Any specific requirements or notes..."
                        className="mt-1"
                        rows={3}
                      />
                    </div>
                  </div>
                </div>

                <Button onClick={onNext} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3">
                  Verify & Submit
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Document Attachments */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Document Attachments</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { name: "Harvard_Official_Transcript.pdf", status: "auto-attached", icon: FileText },
                  { name: "Student_ID_Card.jpg", status: "auto-attached", icon: FileText },
                  { name: "Diploma_Certificate.pdf", status: "auto-attached", icon: FileText }
                ].map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <doc.icon className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium text-green-800 truncate">{doc.name}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <Button variant="ghost" size="sm" className="p-1">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Confidence Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Auto-Fill Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Fields Auto-Filled</span>
                    <span className="font-semibold">6/9</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Average Confidence</span>
                    <span className="font-semibold text-green-600">93%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Manual Review</span>
                    <span className="font-semibold text-yellow-600">1 field</span>
                  </div>
                </div>
                
                <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <Info className="h-4 w-4 text-blue-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-blue-800">Auto-Fill Benefits</p>
                      <p className="text-xs text-blue-600 mt-1">
                        Saved ~5 minutes of manual entry with 93% accuracy
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Help */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5 text-amber-500" />
                  <span>Need Help?</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-gray-600">
                <p>If any auto-filled information seems incorrect, you can:</p>
                <ul className="mt-2 space-y-1 list-disc list-inside">
                  <li>Click the edit button to modify</li>
                  <li>Uncheck verification boxes</li>
                  <li>Upload additional documents</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default AutoFilledForm;
