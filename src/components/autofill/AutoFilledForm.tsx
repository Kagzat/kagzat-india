
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Edit, FileText, Info, Eye, User, Database } from 'lucide-react';
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

  const profileFields = [
    {
      key: 'fullName',
      label: 'Full Name',
      source: 'Profile: Personal Information',
      required: true
    },
    {
      key: 'studentId',
      label: 'Student ID',
      source: 'Profile: Education Details',
      required: true
    },
    {
      key: 'email',
      label: 'Email Address',
      source: 'Profile: Contact Information',
      required: true
    },
    {
      key: 'graduationYear',
      label: 'Graduation Year',
      source: 'Profile: Education Details',
      required: true
    },
    {
      key: 'program',
      label: 'Program',
      source: 'Profile: Education Details',
      required: true
    },
    {
      key: 'degreeClassification',
      label: 'Degree Classification',
      source: 'Profile: Education Details',
      required: false
    }
  ];

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
          <p className="text-gray-600">Review the auto-populated information from your profile</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-blue-600" />
                  <span>Auto-Populated from Profile</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Profile-populated Fields */}
                {profileFields.map((field) => {
                  const isVerified = verificationStatus[field.key as keyof typeof verificationStatus];
                  
                  return (
                    <div key={field.key} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label className="flex items-center space-x-2">
                          <span>{field.label}</span>
                          {field.required && <span className="text-red-500">*</span>}
                        </Label>
                        <div className="flex items-center space-x-2">
                          <Badge className="bg-blue-100 text-blue-800">
                            Profile Data
                          </Badge>
                          <Tooltip>
                            <TooltipTrigger>
                              <Info className="h-4 w-4 text-gray-400" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Source: {field.source}</p>
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
                          className={`pr-20 ${isVerified ? 'bg-blue-50 border-blue-300' : 'bg-white'}`}
                        />
                        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleVerification(field.key)}
                            className={`p-1 h-6 w-6 ${isVerified ? 'text-blue-600' : 'text-gray-400'}`}
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
                <CardTitle className="text-lg">Linked Documents</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { name: "Harvard_Official_Transcript.pdf", status: "from-profile", icon: FileText },
                  { name: "Student_ID_Card.jpg", status: "from-profile", icon: FileText },
                  { name: "Diploma_Certificate.pdf", status: "from-profile", icon: FileText }
                ].map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <doc.icon className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-800 truncate">{doc.name}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <CheckCircle className="h-4 w-4 text-blue-600" />
                      <Button variant="ghost" size="sm" className="p-1">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Profile Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Profile Auto-Fill Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Fields Auto-Populated</span>
                    <span className="font-semibold">6/9</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Data Source</span>
                    <span className="font-semibold text-blue-600">Your Profile</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Manual Input Required</span>
                    <span className="font-semibold text-orange-600">3 fields</span>
                  </div>
                </div>
                
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <Database className="h-4 w-4 text-green-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-green-800">Profile Benefits</p>
                      <p className="text-xs text-green-600 mt-1">
                        Saved ~5 minutes by using your verified profile information
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
                  <Info className="h-5 w-5 text-blue-500" />
                  <span>How This Works</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-gray-600">
                <p>We use information from your Kagzat profile to automatically fill forms:</p>
                <ul className="mt-2 space-y-1 list-disc list-inside">
                  <li>Personal details from your profile</li>
                  <li>Education records you've added</li>
                  <li>Previously uploaded documents</li>
                  <li>Contact information</li>
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
