
import { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Save, Check, Upload, FileText, Calendar, Globe, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { Link, useNavigate } from 'react-router-dom';

interface UserData {
  fullName: string;
  email: string;
  phone: string;
  dateOfBirth: Date | undefined;
  gender: string;
  nationality: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  documentCategories: string[];
  uploadedDocuments: Array<{
    category: string;
    type: string;
    filename: string;
    source: string;
  }>;
  emailNotifications: boolean;
  smsNotifications: boolean;
  whatsappNotifications: boolean;
  preferredValidators: string;
  expressValidation: boolean;
}

const documentCategories = [
  {
    id: 'identity',
    title: 'Identity Documents',
    description: 'Passport, Aadhaar, Driver\'s License, Voter ID',
    types: ['Passport', 'Aadhaar Card', 'Driver\'s License', 'Voter ID', 'PAN Card']
  },
  {
    id: 'educational',
    title: 'Educational Documents',
    description: 'Degrees, Certificates, Transcripts, Mark Sheets',
    types: ['Degree Certificate', 'Diploma', 'Transcript', 'Mark Sheet', 'Course Certificate']
  },
  {
    id: 'work',
    title: 'Work Documents',
    description: 'Employment Letters, Experience Certificates, Salary Slips',
    types: ['Employment Letter', 'Experience Certificate', 'Salary Slip', 'Appointment Letter', 'Relieving Letter']
  },
  {
    id: 'financial',
    title: 'Financial Documents',
    description: 'Bank Statements, Tax Returns, Income Certificates',
    types: ['Bank Statement', 'Tax Return', 'Income Certificate', 'Form 16', 'Investment Certificate']
  },
  {
    id: 'property',
    title: 'Property Documents',
    description: 'Property Deeds, Tax Receipts, Registration Documents',
    types: ['Property Deed', 'Tax Receipt', 'Registration Document', 'Sale Agreement', 'NOC']
  }
];

const countries = [
  { code: 'IN', name: 'India', flag: '🇮🇳' },
  { code: 'US', name: 'United States', flag: '🇺🇸' },
  { code: 'UK', name: 'United Kingdom', flag: '🇬🇧' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦' },
  { code: 'AU', name: 'Australia', flag: '🇦🇺' }
];

const UserOnboarding = () => {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState<UserData>({
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+91 9876543210',
    dateOfBirth: undefined,
    gender: '',
    nationality: '',
    address: '',
    city: '',
    state: '',
    country: '',
    postalCode: '',
    documentCategories: [],
    uploadedDocuments: [
      { category: 'identity', type: 'Passport', filename: 'Passport.pdf', source: 'Google Drive' },
      { category: 'educational', type: 'Degree Certificate', filename: 'MBA_Certificate.pdf', source: 'Google Drive' },
      { category: 'work', type: 'Experience Certificate', filename: 'Experience_Letter.pdf', source: 'Google Drive' }
    ],
    emailNotifications: true,
    smsNotifications: false,
    whatsappNotifications: true,
    preferredValidators: '',
    expressValidation: false
  });
  const navigate = useNavigate();

  // Auto-save functionality
  useEffect(() => {
    const saveData = () => {
      localStorage.setItem('kagzat-onboarding-data', JSON.stringify(userData));
    };
    const timer = setTimeout(saveData, 1000);
    return () => clearTimeout(timer);
  }, [userData]);

  const handleNext = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    setIsLoading(false);
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleComplete = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
    setStep(5); // Success screen
  };

  const handleCategoryToggle = (categoryId: string) => {
    setUserData(prev => ({
      ...prev,
      documentCategories: prev.documentCategories.includes(categoryId)
        ? prev.documentCategories.filter(id => id !== categoryId)
        : [...prev.documentCategories, categoryId]
    }));
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-kagzat-black mb-2">Personal Information</h2>
        <p className="text-gray-600">Tell us about yourself to get started</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            value={userData.fullName}
            onChange={(e) => setUserData(prev => ({ ...prev, fullName: e.target.value }))}
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={userData.email}
            disabled
            className="mt-1 bg-gray-50"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            value={userData.phone}
            disabled
            className="mt-1 bg-gray-50"
          />
        </div>
        <div>
          <Label>Date of Birth</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-left font-normal mt-1">
                <Calendar className="mr-2 h-4 w-4" />
                {userData.dateOfBirth ? format(userData.dateOfBirth, "PPP") : "Select date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarComponent
                mode="single"
                selected={userData.dateOfBirth}
                onSelect={(date) => setUserData(prev => ({ ...prev, dateOfBirth: date }))}
                disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label>Gender</Label>
          <Select value={userData.gender} onValueChange={(value) => setUserData(prev => ({ ...prev, gender: value }))}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="other">Other</SelectItem>
              <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Nationality</Label>
          <Select value={userData.nationality} onValueChange={(value) => setUserData(prev => ({ ...prev, nationality: value }))}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select nationality" />
            </SelectTrigger>
            <SelectContent>
              {countries.map(country => (
                <SelectItem key={country.code} value={country.code}>
                  <span className="flex items-center gap-2">
                    <span>{country.flag}</span>
                    {country.name}
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="address">Address</Label>
        <Textarea
          id="address"
          value={userData.address}
          onChange={(e) => setUserData(prev => ({ ...prev, address: e.target.value }))}
          placeholder="Enter your full address"
          className="mt-1"
          rows={3}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="city">City</Label>
          <Input
            id="city"
            value={userData.city}
            onChange={(e) => setUserData(prev => ({ ...prev, city: e.target.value }))}
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="state">State</Label>
          <Input
            id="state"
            value={userData.state}
            onChange={(e) => setUserData(prev => ({ ...prev, state: e.target.value }))}
            className="mt-1"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="country">Country</Label>
          <Input
            id="country"
            value={userData.country}
            onChange={(e) => setUserData(prev => ({ ...prev, country: e.target.value }))}
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="postalCode">Postal Code</Label>
          <Input
            id="postalCode"
            value={userData.postalCode}
            onChange={(e) => setUserData(prev => ({ ...prev, postalCode: e.target.value }))}
            className="mt-1"
          />
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-kagzat-black mb-2">Document Categories</h2>
        <p className="text-gray-600">Select the types of documents you have</p>
      </div>

      <div className="grid gap-4">
        {documentCategories.map((category) => (
          <Card
            key={category.id}
            className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
              userData.documentCategories.includes(category.id)
                ? 'border-kagzat-green bg-kagzat-green/5'
                : 'border-gray-200'
            }`}
            onClick={() => handleCategoryToggle(category.id)}
          >
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <Checkbox
                  checked={userData.documentCategories.includes(category.id)}
                  onChange={() => handleCategoryToggle(category.id)}
                  className="mt-1"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-kagzat-black mb-1">{category.title}</h3>
                  <p className="text-gray-600 text-sm mb-2">{category.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {category.types.slice(0, 3).map((type, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {type}
                      </Badge>
                    ))}
                    {category.types.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{category.types.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-kagzat-black mb-2">Upload Your Documents</h2>
        <p className="text-gray-600">Add documents from your selected categories</p>
      </div>

      {userData.documentCategories.map((categoryId) => {
        const category = documentCategories.find(cat => cat.id === categoryId);
        if (!category) return null;

        const categoryDocs = userData.uploadedDocuments.filter(doc => doc.category === categoryId);

        return (
          <Card key={categoryId} className="border-gray-200">
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <FileText className="h-5 w-5 text-kagzat-green" />
                {category.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {categoryDocs.map((doc, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-kagzat-green/10 rounded-lg flex items-center justify-center">
                      <FileText className="h-5 w-5 text-kagzat-green" />
                    </div>
                    <div>
                      <p className="font-medium text-kagzat-black">{doc.filename}</p>
                      <p className="text-sm text-gray-600">Uploaded via {doc.source}</p>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-700">
                    <Check className="h-3 w-3 mr-1" />
                    Uploaded
                  </Badge>
                </div>
              ))}
              
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-600 mb-4">Add more {category.title.toLowerCase()}</p>
                <Button variant="outline" className="mb-2">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload from Device
                </Button>
                <Button variant="outline" className="ml-2">
                  Link Google Drive
                </Button>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-kagzat-black mb-2">Set Your Preferences</h2>
        <p className="text-gray-600">Customize your Kagzat experience</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Notification Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Email Notifications</Label>
              <p className="text-sm text-gray-600">Get updates about your validations via email</p>
            </div>
            <Switch
              checked={userData.emailNotifications}
              onCheckedChange={(checked) => setUserData(prev => ({ ...prev, emailNotifications: checked }))}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label>SMS Notifications</Label>
              <p className="text-sm text-gray-600">Receive important updates via SMS</p>
            </div>
            <Switch
              checked={userData.smsNotifications}
              onCheckedChange={(checked) => setUserData(prev => ({ ...prev, smsNotifications: checked }))}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label>WhatsApp Notifications</Label>
              <p className="text-sm text-gray-600">Get notifications on WhatsApp</p>
            </div>
            <Switch
              checked={userData.whatsappNotifications}
              onCheckedChange={(checked) => setUserData(prev => ({ ...prev, whatsappNotifications: checked }))}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Validation Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Preferred Validator Types</Label>
            <Select value={userData.preferredValidators} onValueChange={(value) => setUserData(prev => ({ ...prev, preferredValidators: value }))}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select preference" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="individual">Individual Professionals</SelectItem>
                <SelectItem value="organization">Organizations Only</SelectItem>
                <SelectItem value="both">Both Individual & Organizations</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Express Validation</Label>
              <p className="text-sm text-gray-600">Willing to pay extra for faster validation</p>
            </div>
            <Switch
              checked={userData.expressValidation}
              onCheckedChange={(checked) => setUserData(prev => ({ ...prev, expressValidation: checked }))}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderStep5 = () => (
    <div className="text-center space-y-6 animate-scale-in">
      <div className="h-20 w-20 mx-auto mb-6 bg-kagzat-green/10 rounded-full flex items-center justify-center">
        <span className="text-4xl">🎉</span>
      </div>
      
      <h2 className="text-3xl font-bold text-kagzat-black">Welcome to Kagzat!</h2>
      <p className="text-xl text-gray-600">Your account is ready to use</p>
      
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-lg">Account Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Documents Uploaded:</span>
            <span className="font-medium">{userData.uploadedDocuments.length}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Categories Selected:</span>
            <span className="font-medium">{userData.documentCategories.length}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Profile Completion:</span>
            <span className="font-medium text-kagzat-green">100%</span>
          </div>
        </CardContent>
      </Card>
      
      <Button
        size="lg"
        className="bg-kagzat-yellow hover:bg-yellow-500 text-kagzat-black font-semibold px-8"
        onClick={() => navigate('/dashboard')}
      >
        Go to Dashboard
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-kagzat-black">
              Kagzat
            </Link>
            {step < 5 && (
              <div className="text-sm text-gray-600">
                Step {step} of 4 - {step === 1 ? 'Personal Details' : step === 2 ? 'Document Categories' : step === 3 ? 'Document Upload' : 'Preferences'}
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Progress Bar */}
          {step < 5 && (
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Progress</span>
                <span className="text-sm text-gray-500">{Math.round((step / 4) * 100)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-kagzat-green h-2 rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${(step / 4) * 100}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* Back Button */}
          {step > 1 && step < 5 && (
            <div className="mb-6">
              <Button variant="ghost" onClick={handleBack} className="text-gray-600 hover:text-kagzat-black">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </div>
          )}

          {/* Step Content */}
          <Card className="shadow-lg">
            <CardContent className="p-8">
              {step === 1 && renderStep1()}
              {step === 2 && renderStep2()}
              {step === 3 && renderStep3()}
              {step === 4 && renderStep4()}
              {step === 5 && renderStep5()}
            </CardContent>
          </Card>

          {/* Navigation Buttons */}
          {step < 5 && (
            <div className="flex items-center justify-between mt-8">
              <Button variant="outline" className="text-gray-600">
                <Save className="h-4 w-4 mr-2" />
                Save & Continue Later
              </Button>
              
              <Button
                onClick={step === 4 ? handleComplete : handleNext}
                disabled={isLoading}
                className="bg-kagzat-green hover:bg-green-600 text-white px-8"
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  <>
                    {step === 4 ? 'Complete Setup' : 'Continue'}
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </>
                )}
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default UserOnboarding;
