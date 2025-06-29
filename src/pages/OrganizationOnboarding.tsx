
import { useState } from 'react';
import { ArrowLeft, Building, Users, FileText, Shield, DollarSign, Check, Plus, Trash2, Eye, EyeOff, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Link } from 'react-router-dom';

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  permissions: string[];
}

interface DocumentType {
  id: string;
  name: string;
  category: string;
  selected: boolean;
}

const OrganizationOnboarding = () => {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  
  // Step 1: Organization Details
  const [orgName, setOrgName] = useState('Mumbai Institute of Technology');
  const [orgType, setOrgType] = useState('university');
  const [regNumber, setRegNumber] = useState('UGC/2019/12345');
  const [establishedYear, setEstablishedYear] = useState('1995');
  const [website, setWebsite] = useState('https://mit.edu.in');
  const [contactName, setContactName] = useState('Dr. Rajesh Kumar');
  const [contactEmail, setContactEmail] = useState('registrar@mit.edu.in');
  const [orgPhone, setOrgPhone] = useState('+91 22 4567 8900');
  const [address, setAddress] = useState('Andheri West, Mumbai, Maharashtra 400058');

  // Step 2: Validation Capabilities
  const [documentTypes, setDocumentTypes] = useState<DocumentType[]>([
    { id: '1', name: 'Degree certificates', category: 'Educational Institution', selected: true },
    { id: '2', name: 'Transcripts and marksheets', category: 'Educational Institution', selected: true },
    { id: '3', name: 'Student enrollment verification', category: 'Educational Institution', selected: true },
    { id: '4', name: 'Alumni verification', category: 'Educational Institution', selected: false },
    { id: '5', name: 'Account verification', category: 'Financial Institution', selected: false },
    { id: '6', name: 'Income certificates', category: 'Financial Institution', selected: false },
    { id: '7', name: 'Identity document verification', category: 'Government Body', selected: false },
    { id: '8', name: 'Residence certificates', category: 'Government Body', selected: false },
  ]);

  // Step 3: Team Management
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    {
      id: '1',
      name: 'Dr. Sarah Johnson',
      email: 'sarah.johnson@mit.edu.in',
      role: 'Admin',
      department: 'Registrar Office',
      permissions: ['All Educational Documents']
    },
    {
      id: '2',
      name: 'Mike Chen',
      email: 'mike.chen@mit.edu.in',
      role: 'Validator',
      department: 'Academic Affairs',
      permissions: ['Transcripts Only']
    }
  ]);
  const [newMember, setNewMember] = useState({ name: '', email: '', role: 'Validator', department: '', permissions: [] });

  // Step 5: Compliance Documents
  const [uploadedDocs, setUploadedDocs] = useState<string[]>([]);

  // Step 6: Pricing
  const [pricingStrategy, setPricingStrategy] = useState('standard');
  const [customPricing, setCustomPricing] = useState({
    degreeVerification: '350',
    transcriptVerification: '225',
    enrollmentVerification: '150'
  });

  const handleNext = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    
    if (step < 7) {
      setStep(step + 1);
    }
  };

  const handleDocumentToggle = (id: string) => {
    setDocumentTypes(prev => 
      prev.map(doc => 
        doc.id === id ? { ...doc, selected: !doc.selected } : doc
      )
    );
  };

  const addTeamMember = () => {
    if (newMember.name && newMember.email) {
      setTeamMembers([...teamMembers, {
        ...newMember,
        id: Date.now().toString(),
        permissions: ['Basic Validation']
      }]);
      setNewMember({ name: '', email: '', role: 'Validator', department: '', permissions: [] });
    }
  };

  const removeTeamMember = (id: string) => {
    setTeamMembers(teamMembers.filter(member => member.id !== id));
  };

  const documentCategories = ['Educational Institution', 'Financial Institution', 'Government Body'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-kagzat-black">
              Kagzat
            </Link>
            <div className="text-sm text-gray-600">
              Step {step} of 6
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Back Button & Role Badge */}
          <div className="flex items-center justify-between mb-8">
            <Link to="/signup/organization">
              <Button variant="ghost" className="text-gray-600 hover:text-kagzat-black">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </Link>
            <Badge className="bg-kagzat-green text-white">Institution</Badge>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-kagzat-green h-2 rounded-full transition-all duration-300"
                style={{ width: `${(step / 6) * 100}%` }}
              ></div>
            </div>
          </div>

          <Card className="shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-kagzat-black">
                {step === 1 ? 'Tell us about your organization' :
                 step === 2 ? 'What documents does your organization validate?' :
                 step === 3 ? 'Set up your validation team' :
                 step === 4 ? 'Create validation forms for your users' :
                 step === 5 ? 'Upload institutional credentials' :
                 step === 6 ? 'Set institutional pricing' :
                 'Institutional Review in Progress'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {step === 1 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="orgName">Organization Name</Label>
                      <Input
                        id="orgName"
                        value={orgName}
                        onChange={(e) => setOrgName(e.target.value)}
                        placeholder="Enter organization name"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="orgType">Organization Type</Label>
                      <select
                        id="orgType"
                        value={orgType}
                        onChange={(e) => setOrgType(e.target.value)}
                        className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
                      >
                        <option value="university">University/College</option>
                        <option value="school">School</option>
                        <option value="bank">Bank</option>
                        <option value="government">Government Agency</option>
                        <option value="certification">Certification Body</option>
                        <option value="hospital">Hospital/Healthcare</option>
                        <option value="corporation">Corporation</option>
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="regNumber">Registration/License Number</Label>
                      <Input
                        id="regNumber"
                        value={regNumber}
                        onChange={(e) => setRegNumber(e.target.value)}
                        placeholder="Registration number"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="establishedYear">Established Year</Label>
                      <Input
                        id="establishedYear"
                        type="number"
                        value={establishedYear}
                        onChange={(e) => setEstablishedYear(e.target.value)}
                        placeholder="Year established"
                        className="mt-1"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="website">Website URL</Label>
                      <Input
                        id="website"
                        type="url"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                        placeholder="https://your-website.com"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="contactName">Primary Contact Name</Label>
                      <Input
                        id="contactName"
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder="Contact person name"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="contactEmail">Primary Contact Email</Label>
                      <Input
                        id="contactEmail"
                        type="email"
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        placeholder="contact@organization.com"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="orgPhone">Organization Phone</Label>
                      <Input
                        id="orgPhone"
                        type="tel"
                        value={orgPhone}
                        onChange={(e) => setOrgPhone(e.target.value)}
                        placeholder="Organization phone"
                        className="mt-1"
                      />
                    </div>
                  </div>
                  
                  <div className="md:col-span-2">
                    <Label htmlFor="address">Headquarters Address</Label>
                    <Textarea
                      id="address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Complete address"
                      className="mt-1"
                      rows={3}
                    />
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  {documentCategories.map(category => {
                    const categoryDocs = documentTypes.filter(doc => doc.category === category);
                    return (
                      <div key={category} className="space-y-3">
                        <h3 className="text-lg font-semibold text-kagzat-black">{category}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {categoryDocs.map(doc => (
                            <div key={doc.id} className="flex items-center space-x-2 p-3 border rounded-lg">
                              <Checkbox
                                id={doc.id}
                                checked={doc.selected}
                                onCheckedChange={() => handleDocumentToggle(doc.id)}
                              />
                              <Label htmlFor={doc.id} className="text-sm cursor-pointer">
                                {doc.name}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-2">Custom Document Types</h4>
                    <p className="text-sm text-blue-700">
                      Need to validate other document types? We'll help you set up custom validation workflows after onboarding.
                    </p>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="h-5 w-5 text-green-600" />
                      <h4 className="font-medium text-green-900">Current Admin User</h4>
                    </div>
                    <p className="text-sm text-green-700">
                      {contactName} ({contactEmail}) - Organization Administrator
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-4">Team Members</h3>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Role</TableHead>
                          <TableHead>Department</TableHead>
                          <TableHead>Permissions</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {teamMembers.map(member => (
                          <TableRow key={member.id}>
                            <TableCell>{member.name}</TableCell>
                            <TableCell>{member.email}</TableCell>
                            <TableCell>
                              <Badge variant={member.role === 'Admin' ? 'default' : 'secondary'}>
                                {member.role}
                              </Badge>
                            </TableCell>
                            <TableCell>{member.department}</TableCell>
                            <TableCell>{member.permissions.join(', ')}</TableCell>
                            <TableCell>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeTeamMember(member.id)}
                                className="text-red-600 hover:text-red-800"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>

                  <div className="border-t pt-6">
                    <h4 className="font-medium mb-4">Add New Team Member</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <Input
                        placeholder="Full Name"
                        value={newMember.name}
                        onChange={(e) => setNewMember({...newMember, name: e.target.value})}
                      />
                      <Input
                        placeholder="Email"
                        type="email"
                        value={newMember.email}
                        onChange={(e) => setNewMember({...newMember, email: e.target.value})}
                      />
                      <select
                        value={newMember.role}
                        onChange={(e) => setNewMember({...newMember, role: e.target.value})}
                        className="px-3 py-2 border border-gray-300 rounded-md"
                      >
                        <option value="Validator">Validator</option>
                        <option value="Admin">Admin</option>
                        <option value="Viewer">Viewer</option>
                      </select>
                      <Input
                        placeholder="Department"
                        value={newMember.department}
                        onChange={(e) => setNewMember({...newMember, department: e.target.value})}
                      />
                    </div>
                    <Button onClick={addTeamMember} className="mt-4">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Team Member
                    </Button>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-6">
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <FileText className="h-8 w-8 text-blue-600 mb-4" />
                    <h3 className="text-lg font-semibold text-blue-900 mb-2">Form Builder Preview</h3>
                    <p className="text-blue-700 mb-4">
                      Here's a preview of how you'll create custom validation forms for your users.
                    </p>
                  </div>

                  <Card className="border-2 border-dashed border-gray-300">
                    <CardHeader>
                      <CardTitle className="text-lg">Sample Form: Degree Verification Request</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label>Student Name</Label>
                          <Input placeholder="Enter student name" disabled />
                        </div>
                        <div>
                          <Label>Student ID</Label>
                          <Input placeholder="Enter student ID" disabled />
                        </div>
                        <div>
                          <Label>Degree Type</Label>
                          <select disabled className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50">
                            <option>Bachelor's Degree</option>
                            <option>Master's Degree</option>
                            <option>PhD</option>
                          </select>
                        </div>
                        <div>
                          <Label>Graduation Year</Label>
                          <Input type="number" placeholder="2023" disabled />
                        </div>
                      </div>
                      <div>
                        <Label>Document Upload</Label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center bg-gray-50">
                          <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                          <p className="text-gray-500">Drag and drop files here or click to upload</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <p className="text-yellow-800">
                      <strong>Note:</strong> We'll help you set up custom forms after your account is approved. 
                      You can create multiple form templates for different validation types.
                    </p>
                  </div>
                </div>
              )}

              {step === 5 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4 text-red-600">Required Documents</h3>
                      <div className="space-y-3">
                        {[
                          'Business Registration Certificate',
                          'Educational Accreditation',
                          'Professional Licenses',
                          'Insurance Documentation'
                        ].map((doc, index) => (
                          <div key={index} className="border rounded-lg p-4">
                            <div className="flex items-center justify-between">
                              <span className="font-medium">{doc}</span>
                              <Button variant="outline" size="sm">
                                <Upload className="h-4 w-4 mr-2" />
                                Upload
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-4 text-blue-600">Optional Documents</h3>
                      <div className="space-y-3">
                        {[
                          'Institution Brochures',
                          'Sample Certificates',
                          'Validation Process Documentation'
                        ].map((doc, index) => (
                          <div key={index} className="border rounded-lg p-4">
                            <div className="flex items-center justify-between">
                              <span className="font-medium">{doc}</span>
                              <Button variant="outline" size="sm">
                                <Upload className="h-4 w-4 mr-2" />
                                Upload
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {step === 6 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Pricing Strategy</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div className={`border-2 rounded-lg p-4 cursor-pointer ${pricingStrategy === 'standard' ? 'border-kagzat-green bg-green-50' : 'border-gray-200'}`}
                           onClick={() => setPricingStrategy('standard')}>
                        <h4 className="font-medium">Standard Rates</h4>
                        <p className="text-sm text-gray-600">Use industry standard pricing</p>
                      </div>
                      <div className={`border-2 rounded-lg p-4 cursor-pointer ${pricingStrategy === 'custom' ? 'border-kagzat-green bg-green-50' : 'border-gray-200'}`}
                           onClick={() => setPricingStrategy('custom')}>
                        <h4 className="font-medium">Custom Pricing</h4>
                        <p className="text-sm text-gray-600">Set your own rates</p>
                      </div>
                      <div className={`border-2 rounded-lg p-4 cursor-pointer ${pricingStrategy === 'volume' ? 'border-kagzat-green bg-green-50' : 'border-gray-200'}`}
                           onClick={() => setPricingStrategy('volume')}>
                        <h4 className="font-medium">Volume-Based</h4>
                        <p className="text-sm text-gray-600">Tiered pricing for bulk requests</p>
                      </div>
                    </div>
                  </div>

                  {pricingStrategy === 'custom' && (
                    <div>
                      <h4 className="font-medium mb-4">Set Your Pricing</h4>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Document Type</TableHead>
                            <TableHead>Market Range</TableHead>
                            <TableHead>Your Price (₹)</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell>Degree Verification</TableCell>
                            <TableCell className="text-gray-500">₹200 - ₹500</TableCell>
                            <TableCell>
                              <Input
                                type="number"
                                value={customPricing.degreeVerification}
                                onChange={(e) => setCustomPricing({...customPricing, degreeVerification: e.target.value})}
                                className="w-24"
                              />
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Transcript Verification</TableCell>
                            <TableCell className="text-gray-500">₹150 - ₹300</TableCell>
                            <TableCell>
                              <Input
                                type="number"
                                value={customPricing.transcriptVerification}
                                onChange={(e) => setCustomPricing({...customPricing, transcriptVerification: e.target.value})}
                                className="w-24"
                              />
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Enrollment Verification</TableCell>
                            <TableCell className="text-gray-500">₹100 - ₹200</TableCell>
                            <TableCell>
                              <Input
                                type="number"
                                value={customPricing.enrollmentVerification}
                                onChange={(e) => setCustomPricing({...customPricing, enrollmentVerification: e.target.value})}
                                className="w-24"
                              />
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  )}

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-2">Launch Preferences</h4>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input type="radio" name="launch" className="mr-2" defaultChecked />
                        <span className="text-blue-800">Soft launch (invite only) - Recommended</span>
                      </label>
                      <label className="flex items-center">
                        <input type="radio" name="launch" className="mr-2" />
                        <span className="text-blue-800">Public launch</span>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {step === 7 && (
                <div className="text-center space-y-6">
                  <div className="animate-scale-in">
                    <div className="h-16 w-16 mx-auto mb-4 bg-yellow-100 rounded-full flex items-center justify-center">
                      <Shield className="h-8 w-8 text-yellow-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-yellow-600">Under Review</h3>
                    <p className="text-gray-600">We're verifying your institutional credentials</p>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="font-medium mb-4">What happens next?</h4>
                    <div className="space-y-3 text-left">
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-kagzat-green rounded-full flex items-center justify-center">
                          <Check className="h-3 w-3 text-white" />
                        </div>
                        <span className="text-sm">Application submitted</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                          <span className="text-xs text-white">2</span>
                        </div>
                        <span className="text-sm">Document verification (2-3 days)</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
                          <span className="text-xs text-white">3</span>
                        </div>
                        <span className="text-sm">Compliance review (3-4 days)</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
                          <span className="text-xs text-white">4</span>
                        </div>
                        <span className="text-sm">Account manager assignment</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
                          <span className="text-xs text-white">5</span>
                        </div>
                        <span className="text-sm">Training session & launch</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-sm text-gray-600">
                    <p><strong>Estimated review time:</strong> 5-7 business days</p>
                    <p className="mt-2">
                      Questions? Contact our support team at{' '}
                      <a href="mailto:institutions@kagzat.com" className="text-kagzat-green hover:underline">
                        institutions@kagzat.com
                      </a>
                    </p>
                  </div>
                </div>
              )}

              {step < 7 && (
                <div className="flex justify-end mt-8">
                  <Button
                    onClick={handleNext}
                    disabled={isLoading}
                    className="bg-kagzat-green hover:bg-green-600 text-white px-8"
                  >
                    {isLoading ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    ) : (
                      step === 6 ? 'Submit for Review' : 'Continue'
                    )}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default OrganizationOnboarding;
