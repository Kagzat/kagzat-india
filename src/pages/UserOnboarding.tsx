
import { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Save, Check, Link as LinkIcon, FileText, Calendar, Globe, MapPin, User, GraduationCap, Briefcase, CreditCard, Home } from 'lucide-react';
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
import { formFieldLibrary, documentLibrary, formatFieldName, formatDocumentName, validateField } from '@/lib/formLibrary';

interface UserData {
  // Basic info
  fullName: string;
  email: string;
  phone: string;
  
  // Category data
  selectedCategories: string[];
  
  // Field data by category
  Identity: Record<string, string>;
  Address: Record<string, string>;
  Education: Record<string, string>;
  Work: Record<string, string>;
  Finances: Record<string, string>;
  Property: Record<string, string>;
  Miscellaneous: Record<string, string>;
  
  // Document links
  documentLinks: Array<{
    category: string;
    type: string;
    url: string;
    filename: string;
  }>;
  
  // Preferences
  emailNotifications: boolean;
  smsNotifications: boolean;
  whatsappNotifications: boolean;
  preferredValidators: string;
  expressValidation: boolean;
}

const documentCategoryConfig = [
  {
    id: 'Identity',
    title: 'Identity Documents',
    description: 'Passport, National ID, Driving License, Birth Certificate',
    icon: User
  },
  {
    id: 'Address',
    title: 'Address Proof Documents',
    description: 'Utility Bills, Bank Statements, Lease Agreements',
    icon: MapPin
  },
  {
    id: 'Education',
    title: 'Educational Documents',
    description: 'Degrees, Certificates, Transcripts, Mark Sheets',
    icon: GraduationCap
  },
  {
    id: 'Work',
    title: 'Work Documents',
    description: 'Employment Letters, Experience Certificates, Salary Slips',
    icon: Briefcase
  },
  {
    id: 'Finances',
    title: 'Financial Documents',
    description: 'Bank Statements, Tax Returns, Income Certificates',
    icon: CreditCard
  },
  {
    id: 'Property',
    title: 'Property Documents',
    description: 'Property Deeds, Tax Receipts, Registration Documents',
    icon: Home
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
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [userData, setUserData] = useState<UserData>({
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+91 9876543210',
    selectedCategories: [],
    Identity: {},
    Address: {},
    Education: {},
    Work: {},
    Finances: {},
    Property: {},
    Miscellaneous: {},
    documentLinks: [],
    emailNotifications: true,
    smsNotifications: false,
    whatsappNotifications: true,
    preferredValidators: '',
    expressValidation: false
  });
  const [newDocumentUrl, setNewDocumentUrl] = useState('');
  const [selectedDocumentType, setSelectedDocumentType] = useState('');
  const [addingToCategory, setAddingToCategory] = useState('');
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
    setStep(6); // Success screen
  };

  const handleCategoryToggle = (categoryId: string) => {
    setUserData(prev => ({
      ...prev,
      selectedCategories: prev.selectedCategories.includes(categoryId)
        ? prev.selectedCategories.filter(id => id !== categoryId)
        : [...prev.selectedCategories, categoryId]
    }));
  };

  const handleFieldChange = (category: keyof typeof formFieldLibrary, fieldName: string, value: string) => {
    setUserData(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [fieldName]: value
      }
    }));

    // Clear error when user starts typing
    const errorKey = `${category}.${fieldName}`;
    if (errors[errorKey]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[errorKey];
        return newErrors;
      });
    }
  };

  const validateCategory = (category: keyof typeof formFieldLibrary): boolean => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    formFieldLibrary[category].forEach(field => {
      const value = userData[category][field.name] || '';
      const error = validateField(field.name, value, category);
      if (error) {
        newErrors[`${category}.${field.name}`] = error;
        isValid = false;
      }
    });

    setErrors(prev => ({ ...prev, ...newErrors }));
    return isValid;
  };

  const handleAddDocument = (categoryId: string) => {
    if (!newDocumentUrl || !selectedDocumentType) return;
    
    const filename = formatDocumentName(selectedDocumentType);
    
    setUserData(prev => ({
      ...prev,
      documentLinks: [...prev.documentLinks, {
        category: categoryId,
        type: selectedDocumentType,
        url: newDocumentUrl,
        filename: filename + '.pdf'
      }]
    }));
    
    setNewDocumentUrl('');
    setSelectedDocumentType('');
    setAddingToCategory('');
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-kagzat-black mb-2">Select Document Categories</h2>
        <p className="text-gray-600">Choose the types of documents you have</p>
      </div>

      <div className="grid gap-4">
        {documentCategoryConfig.map((category) => {
          const Icon = category.icon;
          return (
            <Card
              key={category.id}
              className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                userData.selectedCategories.includes(category.id)
                  ? 'border-kagzat-green bg-kagzat-green/5'
                  : 'border-gray-200'
              }`}
              onClick={() => handleCategoryToggle(category.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <Checkbox
                    checked={userData.selectedCategories.includes(category.id)}
                    onChange={() => handleCategoryToggle(category.id)}
                    className="mt-1"
                  />
                  <Icon className="h-6 w-6 text-kagzat-green mt-1" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-kagzat-black mb-1">{category.title}</h3>
                    <p className="text-gray-600 text-sm mb-2">{category.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {documentLibrary[category.id as keyof typeof documentLibrary].slice(0, 3).map((type, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {formatDocumentName(type)}
                        </Badge>
                      ))}
                      {documentLibrary[category.id as keyof typeof documentLibrary].length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{documentLibrary[category.id as keyof typeof documentLibrary].length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );

  const renderCategoryFields = (category: keyof typeof formFieldLibrary) => {
    const fields = formFieldLibrary[category];
    const categoryConfig = documentCategoryConfig.find(c => c.id === category);
    const Icon = categoryConfig?.icon || FileText;

    return (
      <Card key={category} className="border-gray-200">
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Icon className="h-5 w-5 text-kagzat-green" />
            {categoryConfig?.title || category} Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            {fields.map((field) => (
              <div key={field.name}>
                <Label htmlFor={`${category}.${field.name}`}>
                  {formatFieldName(field.name)}
                  {field.min_length > 0 && <span className="text-red-500 ml-1">*</span>}
                </Label>
                {field.name.includes('date') ? (
                  <Input
                    id={`${category}.${field.name}`}
                    type="date"
                    value={userData[category][field.name] || ''}
                    onChange={(e) => handleFieldChange(category, field.name, e.target.value)}
                    className="mt-1"
                  />
                ) : field.name.includes('email') ? (
                  <Input
                    id={`${category}.${field.name}`}
                    type="email"
                    value={userData[category][field.name] || ''}
                    onChange={(e) => handleFieldChange(category, field.name, e.target.value)}
                    className="mt-1"
                  />
                ) : field.name.includes('phone') || field.name.includes('contact') ? (
                  <Input
                    id={`${category}.${field.name}`}
                    type="tel"
                    value={userData[category][field.name] || ''}
                    onChange={(e) => handleFieldChange(category, field.name, e.target.value)}
                    className="mt-1"
                  />
                ) : field.max_length > 100 ? (
                  <Textarea
                    id={`${category}.${field.name}`}
                    value={userData[category][field.name] || ''}
                    onChange={(e) => handleFieldChange(category, field.name, e.target.value)}
                    className="mt-1"
                    rows={3}
                  />
                ) : (
                  <Input
                    id={`${category}.${field.name}`}
                    value={userData[category][field.name] || ''}
                    onChange={(e) => handleFieldChange(category, field.name, e.target.value)}
                    className="mt-1"
                  />
                )}
                {errors[`${category}.${field.name}`] && (
                  <p className="text-red-500 text-sm mt-1">{errors[`${category}.${field.name}`]}</p>
                )}
                <p className="text-xs text-gray-500 mt-1">
                  {field.min_length === 0 ? 'Optional' : `Required`} • {field.min_length}-{field.max_length} characters
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  };

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-kagzat-black mb-2">Fill Your Information</h2>
        <p className="text-gray-600">Complete the details for your selected categories</p>
      </div>

      {userData.selectedCategories.map((categoryId) => 
        renderCategoryFields(categoryId as keyof typeof formFieldLibrary)
      )}
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-kagzat-black mb-2">Share Your Document Links</h2>
        <p className="text-gray-600">Provide Google Drive links for your documents</p>
      </div>

      {userData.selectedCategories.map((categoryId) => {
        const categoryConfig = documentCategoryConfig.find(c => c.id === categoryId);
        const categoryDocs = userData.documentLinks.filter(doc => doc.category === categoryId);
        const Icon = categoryConfig?.icon || FileText;

        return (
          <Card key={categoryId} className="border-gray-200">
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Icon className="h-5 w-5 text-kagzat-green" />
                {categoryConfig?.title || categoryId}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {categoryDocs.map((doc, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-kagzat-green/10 rounded-lg flex items-center justify-center">
                      <LinkIcon className="h-5 w-5 text-kagzat-green" />
                    </div>
                    <div>
                      <p className="font-medium text-kagzat-black">{doc.filename}</p>
                      <p className="text-sm text-gray-600">Google Drive Link</p>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-700">
                    <Check className="h-3 w-3 mr-1" />
                    Linked
                  </Badge>
                </div>
              ))}
              
              {addingToCategory === categoryId ? (
                <div className="border-2 border-dashed border-kagzat-green rounded-lg p-4 space-y-3">
                  <div>
                    <Label>Document Type</Label>
                    <Select value={selectedDocumentType} onValueChange={setSelectedDocumentType}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select document type" />
                      </SelectTrigger>
                      <SelectContent>
                        {documentLibrary[categoryId as keyof typeof documentLibrary].map(type => (
                          <SelectItem key={type} value={type}>
                            {formatDocumentName(type)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Google Drive Link</Label>
                    <Input
                      value={newDocumentUrl}
                      onChange={(e) => setNewDocumentUrl(e.target.value)}
                      placeholder="https://drive.google.com/file/d/..."
                      className="mt-1"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      onClick={() => handleAddDocument(categoryId)}
                      disabled={!newDocumentUrl || !selectedDocumentType}
                      className="bg-kagzat-green hover:bg-green-600 text-white"
                    >
                      <LinkIcon className="h-4 w-4 mr-2" />
                      Add Document
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => setAddingToCategory('')}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <LinkIcon className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-600 mb-4">Add {categoryConfig?.title.toLowerCase() || categoryId.toLowerCase()}</p>
                  <Button 
                    variant="outline" 
                    onClick={() => setAddingToCategory(categoryId)}
                  >
                    <LinkIcon className="h-4 w-4 mr-2" />
                    Share Google Drive Link
                  </Button>
                </div>
              )}
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
            <span className="text-gray-600">Documents Linked:</span>
            <span className="font-medium">{userData.documentLinks.length}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Categories Completed:</span>
            <span className="font-medium">{userData.selectedCategories.length}</span>
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

  const totalSteps = 5;
  const stepTitles = [
    'Document Categories',
    'Personal Information',
    'Document Links',
    'Preferences',
    'Complete'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-kagzat-black">
              Kagzat
            </Link>
            {step < 6 && (
              <div className="text-sm text-gray-600">
                Step {step} of {totalSteps} - {stepTitles[step - 1]}
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Progress Bar */}
          {step < 6 && (
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Progress</span>
                <span className="text-sm text-gray-500">{Math.round((step / totalSteps) * 100)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-kagzat-green h-2 rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${(step / totalSteps) * 100}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* Back Button */}
          {step > 1 && step < 6 && (
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
