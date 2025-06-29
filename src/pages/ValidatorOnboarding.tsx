
import { useState } from 'react';
import { ArrowLeft, Upload, Clock, MapPin, DollarSign, Check, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const ValidatorOnboarding = () => {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isVerificationPending, setIsVerificationPending] = useState(false);

  // Professional Information
  const [professionalTitle, setProfessionalTitle] = useState('');
  const [licenseNumber, setLicenseNumber] = useState('');
  const [issuingAuthority, setIssuingAuthority] = useState('');
  const [licenseExpiry, setLicenseExpiry] = useState('');
  const [experience, setExperience] = useState([5]);
  const [professionalEmail, setProfessionalEmail] = useState('');
  const [officeAddress, setOfficeAddress] = useState('');
  const [licenseUrl, setLicenseUrl] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');

  // Specialization & Services
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  // Service Area & Availability
  const [serviceCountries, setServiceCountries] = useState<string[]>([]);
  const [serviceStates, setServiceStates] = useState<string[]>([]);
  const [workingHours, setWorkingHours] = useState({ start: '09:00', end: '17:00' });
  const [workingDays, setWorkingDays] = useState<string[]>([]);
  const [responseTime, setResponseTime] = useState('');
  const [languages, setLanguages] = useState<string[]>([]);

  // Pricing Setup
  const [pricing, setPricing] = useState({
    identity: 100,
    educational: 250,
    legal: 500,
    financial: 350
  });
  const [expressSurcharge, setExpressSurcharge] = useState(25);
  const [bulkDiscount, setBulkDiscount] = useState(10);

  // Profile
  const [bio, setBio] = useState('');
  const [bankDetails, setBankDetails] = useState('');

  const handleNext = async () => {
    if (step < 5) {
      setStep(step + 1);
    } else {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsLoading(false);
      setIsVerificationPending(true);
    }
  };

  const handleServiceChange = (service: string, checked: boolean) => {
    if (checked) {
      setSelectedServices([...selectedServices, service]);
    } else {
      setSelectedServices(selectedServices.filter(s => s !== service));
    }
  };

  const handleCountryChange = (country: string, checked: boolean) => {
    if (checked) {
      setServiceCountries([...serviceCountries, country]);
    } else {
      setServiceCountries(serviceCountries.filter(c => c !== country));
    }
  };

  const handleWorkingDayChange = (day: string, checked: boolean) => {
    if (checked) {
      setWorkingDays([...workingDays, day]);
    } else {
      setWorkingDays(workingDays.filter(d => d !== day));
    }
  };

  const handleLanguageChange = (language: string, checked: boolean) => {
    if (checked) {
      setLanguages([...languages, language]);
    } else {
      setLanguages(languages.filter(l => l !== language));
    }
  };

  const services = [
    {
      category: 'Identity Documents',
      items: [
        { name: 'passport_verification', label: 'Passport verification', time: '2-4 hours' },
        { name: 'national_id_verification', label: 'National ID verification', time: '1-2 hours' },
        { name: 'driver_license_verification', label: 'Driver\'s license verification', time: '1-2 hours' }
      ]
    },
    {
      category: 'Educational Documents',
      items: [
        { name: 'degree_authentication', label: 'Degree authentication', time: '4-6 hours' },
        { name: 'transcript_verification', label: 'Transcript verification', time: '3-5 hours' },
        { name: 'certificate_validation', label: 'Certificate validation', time: '2-4 hours' }
      ]
    },
    {
      category: 'Legal Documents',
      items: [
        { name: 'contract_verification', label: 'Contract verification', time: '6-8 hours' },
        { name: 'affidavit_notarization', label: 'Affidavit notarization', time: '2-3 hours' },
        { name: 'power_of_attorney', label: 'Power of attorney', time: '4-6 hours' }
      ]
    },
    {
      category: 'Financial Documents',
      items: [
        { name: 'income_verification', label: 'Income verification', time: '3-5 hours' },
        { name: 'bank_statement_validation', label: 'Bank statement validation', time: '2-4 hours' }
      ]
    }
  ];

  if (isVerificationPending) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white to-gray-50">
        <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm">
          <div className="container mx-auto px-6 py-4">
            <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-kagzat-black">
              Kagzat
            </Link>
          </div>
        </header>

        <main className="container mx-auto px-6 py-8">
          <div className="max-w-2xl mx-auto text-center">
            <Card className="shadow-lg">
              <CardContent className="p-8">
                <div className="animate-scale-in">
                  <div className="h-16 w-16 mx-auto mb-6 bg-yellow-100 rounded-full flex items-center justify-center">
                    <Shield className="h-8 w-8 text-kagzat-yellow" />
                  </div>
                  <h1 className="text-2xl font-bold text-kagzat-black mb-4">Under Review</h1>
                  <p className="text-gray-600 mb-6">We're verifying your credentials and professional information</p>
                  
                  <div className="bg-gray-50 rounded-lg p-6 mb-6">
                    <h3 className="font-semibold mb-4">What happens next:</h3>
                    <div className="space-y-3 text-left">
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-kagzat-green rounded-full flex items-center justify-center">
                          <Check className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-sm">Application submitted</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-kagzat-yellow rounded-full flex items-center justify-center">
                          <Clock className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-sm">Credential verification (1-2 days)</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
                          <Shield className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-sm">Profile review and approval</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-4 mb-6">
                    <p className="text-sm text-blue-800">
                      <strong>Estimated review time:</strong> 2-3 business days
                    </p>
                  </div>

                  <Button variant="outline" className="w-full">
                    Contact Support
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50">
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-kagzat-black">
              Kagzat
            </Link>
            <div className="text-sm text-gray-600">
              Step {step} of 5
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <Link to="/signup/validator">
              <Button variant="ghost" className="text-gray-600 hover:text-kagzat-black">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </Link>
            <Badge className="bg-kagzat-green text-white">Professional Validator</Badge>
          </div>

          <Card className="shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-kagzat-black">
                {step === 1 ? 'Professional Details' :
                 step === 2 ? 'What documents can you validate?' :
                 step === 3 ? 'Where do you provide services?' :
                 step === 4 ? 'Set Your Pricing' :
                 'Complete Your Profile'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {step === 1 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="title">Professional Title</Label>
                      <select
                        id="title"
                        value={professionalTitle}
                        onChange={(e) => setProfessionalTitle(e.target.value)}
                        className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
                      >
                        <option value="">Select profession</option>
                        <option value="notary">Notary Public</option>
                        <option value="lawyer">Lawyer</option>
                        <option value="accountant">Certified Accountant</option>
                        <option value="doctor">Medical Doctor</option>
                        <option value="engineer">Professional Engineer</option>
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="license">License/Registration Number</Label>
                      <Input
                        id="license"
                        value={licenseNumber}
                        onChange={(e) => setLicenseNumber(e.target.value)}
                        placeholder="Enter license number"
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="authority">Issuing Authority</Label>
                      <Input
                        id="authority"
                        value={issuingAuthority}
                        onChange={(e) => setIssuingAuthority(e.target.value)}
                        placeholder="e.g., State Bar Association"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="expiry">License Expiry Date</Label>
                      <Input
                        id="expiry"
                        type="date"
                        value={licenseExpiry}
                        onChange={(e) => setLicenseExpiry(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="experience">Years of Experience: {experience[0]}</Label>
                    <Slider
                      id="experience"
                      min={0}
                      max={50}
                      step={1}
                      value={experience}
                      onValueChange={setExperience}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Professional Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={professionalEmail}
                      onChange={(e) => setProfessionalEmail(e.target.value)}
                      placeholder="your.email@domain.com"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="address">Office Address</Label>
                    <Textarea
                      id="address"
                      value={officeAddress}
                      onChange={(e) => setOfficeAddress(e.target.value)}
                      placeholder="Enter your office address"
                      className="mt-1"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="license-url">Professional License (Google Drive)</Label>
                      <Input
                        id="license-url"
                        value={licenseUrl}
                        onChange={(e) => setLicenseUrl(e.target.value)}
                        placeholder="https://drive.google.com/..."
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="photo-url">Professional Photo (Google Drive)</Label>
                      <Input
                        id="photo-url"
                        value={photoUrl}
                        onChange={(e) => setPhotoUrl(e.target.value)}
                        placeholder="https://drive.google.com/..."
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  {services.map((category) => (
                    <div key={category.category} className="border rounded-lg p-4">
                      <h3 className="font-semibold text-lg mb-3">{category.category}</h3>
                      <div className="space-y-3">
                        {category.items.map((service) => (
                          <div key={service.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                            <div className="flex items-center space-x-3">
                              <Checkbox
                                id={service.name}
                                checked={selectedServices.includes(service.name)}
                                onCheckedChange={(checked) => 
                                  handleServiceChange(service.name, checked as boolean)
                                }
                              />
                              <div>
                                <Label htmlFor={service.name} className="font-medium">
                                  {service.label}
                                </Label>
                                <p className="text-sm text-gray-600">Typical time: {service.time}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6">
                  <div>
                    <Label className="text-lg font-medium mb-3">Service Countries</Label>
                    <div className="grid grid-cols-2 gap-3 mt-2">
                      {['India', 'United States', 'United Kingdom', 'Canada', 'Australia', 'Germany'].map((country) => (
                        <div key={country} className="flex items-center space-x-2">
                          <Checkbox
                            id={country}
                            checked={serviceCountries.includes(country)}
                            onCheckedChange={(checked) => 
                              handleCountryChange(country, checked as boolean)
                            }
                          />
                          <Label htmlFor={country}>{country}</Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label className="text-lg font-medium mb-3">Working Hours</Label>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                      <div>
                        <Label htmlFor="start-time">Start Time</Label>
                        <Input
                          id="start-time"
                          type="time"
                          value={workingHours.start}
                          onChange={(e) => setWorkingHours({...workingHours, start: e.target.value})}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="end-time">End Time</Label>
                        <Input
                          id="end-time"
                          type="time"
                          value={workingHours.end}
                          onChange={(e) => setWorkingHours({...workingHours, end: e.target.value})}
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label className="text-lg font-medium mb-3">Working Days</Label>
                    <div className="grid grid-cols-4 gap-3 mt-2">
                      {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                        <div key={day} className="flex items-center space-x-2">
                          <Checkbox
                            id={day}
                            checked={workingDays.includes(day)}
                            onCheckedChange={(checked) => 
                              handleWorkingDayChange(day, checked as boolean)
                            }
                          />
                          <Label htmlFor={day} className="text-sm">{day.slice(0, 3)}</Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="response-time">Response Time Commitment</Label>
                    <select
                      id="response-time"
                      value={responseTime}
                      onChange={(e) => setResponseTime(e.target.value)}
                      className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
                    >
                      <option value="">Select response time</option>
                      <option value="1-hour">Within 1 hour</option>
                      <option value="2-hours">Within 2 hours</option>
                      <option value="6-hours">Within 6 hours</option>
                      <option value="12-hours">Within 12 hours</option>
                      <option value="24-hours">Within 24 hours</option>
                    </select>
                  </div>

                  <div>
                    <Label className="text-lg font-medium mb-3">Languages Spoken</Label>
                    <div className="grid grid-cols-3 gap-3 mt-2">
                      {['English', 'Hindi', 'Spanish', 'French', 'German', 'Chinese'].map((language) => (
                        <div key={language} className="flex items-center space-x-2">
                          <Checkbox
                            id={language}
                            checked={languages.includes(language)}
                            onCheckedChange={(checked) => 
                              handleLanguageChange(language, checked as boolean)
                            }
                          />
                          <Label htmlFor={language} className="text-sm">{language}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-6">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold mb-4">Document Validation Pricing (₹)</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-medium">Identity Documents</span>
                          <span className="text-sm text-gray-600 block">Range: ₹50 - ₹200</span>
                        </div>
                        <Input
                          type="number"
                          value={pricing.identity}
                          onChange={(e) => setPricing({...pricing, identity: Number(e.target.value)})}
                          className="w-24"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-medium">Educational Documents</span>
                          <span className="text-sm text-gray-600 block">Range: ₹100 - ₹500</span>
                        </div>
                        <Input
                          type="number"
                          value={pricing.educational}
                          onChange={(e) => setPricing({...pricing, educational: Number(e.target.value)})}
                          className="w-24"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-medium">Legal Documents</span>
                          <span className="text-sm text-gray-600 block">Range: ₹200 - ₹1000</span>
                        </div>
                        <Input
                          type="number"
                          value={pricing.legal}
                          onChange={(e) => setPricing({...pricing, legal: Number(e.target.value)})}
                          className="w-24"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-medium">Financial Documents</span>
                          <span className="text-sm text-gray-600 block">Range: ₹150 - ₹750</span>
                        </div>
                        <Input
                          type="number"
                          value={pricing.financial}
                          onChange={(e) => setPricing({...pricing, financial: Number(e.target.value)})}
                          className="w-24"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="express">Express Service Surcharge (%)</Label>
                      <Input
                        id="express"
                        type="number"
                        value={expressSurcharge}
                        onChange={(e) => setExpressSurcharge(Number(e.target.value))}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="bulk">Bulk Discount (%)</Label>
                      <Input
                        id="bulk"
                        type="number"
                        value={bulkDiscount}
                        onChange={(e) => setBulkDiscount(Number(e.target.value))}
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="text-lg font-medium mb-3">Payment Preferences</Label>
                    <div className="grid grid-cols-2 gap-3 mt-2">
                      {['Bank Transfer', 'Digital Wallet', 'UPI', 'Cheque'].map((method) => (
                        <div key={method} className="flex items-center space-x-2">
                          <Checkbox id={method} />
                          <Label htmlFor={method} className="text-sm">{method}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {step === 5 && (
                <div className="space-y-6">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold mb-3">Profile Summary</h3>
                    <div className="text-sm space-y-2">
                      <p><strong>Title:</strong> {professionalTitle}</p>
                      <p><strong>Experience:</strong> {experience[0]} years</p>
                      <p><strong>Services:</strong> {selectedServices.length} selected</p>
                      <p><strong>Countries:</strong> {serviceCountries.join(', ')}</p>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="bio">Professional Bio</Label>
                    <Textarea
                      id="bio"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      placeholder="Tell us about your professional background and expertise..."
                      className="mt-1 min-h-[100px]"
                    />
                  </div>

                  <div>
                    <Label htmlFor="bank">Banking Details for Payouts</Label>
                    <Textarea
                      id="bank"
                      value={bankDetails}
                      onChange={(e) => setBankDetails(e.target.value)}
                      placeholder="Bank name, account number, IFSC code..."
                      className="mt-1"
                    />
                  </div>

                  <div className="bg-blue-50 rounded-lg p-4">
                    <h4 className="font-medium mb-2">Sample Validation Examples</h4>
                    <p className="text-sm text-gray-600">
                      Upload 2-3 sample validations you've completed to showcase your work quality.
                    </p>
                    <div className="mt-3 space-y-2">
                      <Input placeholder="Sample 1 - Google Drive link" />
                      <Input placeholder="Sample 2 - Google Drive link" />
                      <Input placeholder="Sample 3 - Google Drive link (optional)" />
                    </div>
                  </div>
                </div>
              )}

              <Button
                onClick={handleNext}
                disabled={isLoading}
                className="w-full bg-kagzat-green hover:bg-green-600 text-white"
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : step === 5 ? (
                  'Submit for Verification'
                ) : (
                  'Continue'
                )}
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default ValidatorOnboarding;
