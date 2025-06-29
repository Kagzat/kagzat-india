import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { CheckCircle, XCircle, AlertTriangle, Shield, Zap, Globe, Home, Briefcase, DollarSign, Handshake, Copy, Download, ExternalLink, CreditCard, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

const DocumentVerification = () => {
  const [verificationStep, setVerificationStep] = useState<'input' | 'payment' | 'processing' | 'result'>('input');
  const [verificationResult, setVerificationResult] = useState<'success' | 'failed' | 'partial' | null>(null);
  const [formData, setFormData] = useState({
    driveLink: '',
    ownerDetails: '',
    documentType: '',
    purpose: '',
    expressVerification: false
  });
  const [paymentData, setPaymentData] = useState({
    email: '',
    phone: '',
    upiId: '',
    selectedMethod: 'upi'
  });

  const useCases = [
    {
      icon: <Home className="h-8 w-8 text-blue-600" />,
      title: "PROPERTY TRANSACTIONS",
      description: "Verify seller's property documents before purchase",
      example: "Check land deed authenticity before buying property"
    },
    {
      icon: <Briefcase className="h-8 w-8 text-green-600" />,
      title: "EMPLOYMENT VERIFICATION",
      description: "Verify candidate credentials during hiring",
      example: "Confirm applicant's degree before job offer"
    },
    {
      icon: <DollarSign className="h-8 w-8 text-yellow-600" />,
      title: "LOAN APPLICATIONS",
      description: "Banks verify borrower documents for loan approval",
      example: "Validate income certificates for home loans"
    },
    {
      icon: <Handshake className="h-8 w-8 text-purple-600" />,
      title: "BUSINESS PARTNERSHIPS",
      description: "Verify partner credentials before signing agreements",
      example: "Confirm business registration before partnership"
    }
  ];

  const documentTypes = [
    "Property deed", "Degree certificate", "Income certificate", "Business registration",
    "Identity proof", "Address proof", "Medical certificate", "Legal document", "Other"
  ];

  const purposes = [
    "Property purchase", "Employment check", "Loan application", "Business verification",
    "Legal proceeding", "Personal verification", "Due diligence", "Other"
  ];

  const handleProceedToPayment = () => {
    if (!formData.driveLink || !formData.ownerDetails) {
      toast.error("Please fill in all required fields");
      return;
    }
    setVerificationStep('payment');
  };

  const handlePayment = () => {
    if (!paymentData.email || (!paymentData.upiId && paymentData.selectedMethod === 'upi')) {
      toast.error("Please fill in all payment details");
      return;
    }
    
    toast.success("Payment processing...");
    
    // Simulate payment processing
    setTimeout(() => {
      toast.success("Payment successful! Starting verification...");
      setVerificationStep('processing');
      
      // Start verification after payment
      setTimeout(() => {
        setVerificationStep('result');
        const results = ['success', 'failed', 'partial'];
        setVerificationResult(results[Math.floor(Math.random() * results.length)] as any);
      }, 3000);
    }, 2000);
  };

  const loadExample = () => {
    setFormData({
      driveLink: 'https://drive.google.com/file/d/1a2b3c4d5e6f7g8h9i0/land_deed_mumbai_2024.pdf',
      ownerDetails: 'ramesh.seller@email.com',
      documentType: 'Property deed',
      purpose: 'Property purchase',
      expressVerification: false
    });
    toast.success("Example data loaded!");
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  if (verificationStep === 'payment') {
    const amount = formData.expressVerification ? 150 : 75;
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-yellow-100 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Complete Payment</h1>
            <p className="text-gray-600">Secure payment to proceed with document verification</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Payment Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Email Address *</label>
                    <Input
                      type="email"
                      placeholder="your.email@example.com"
                      value={paymentData.email}
                      onChange={(e) => setPaymentData({ ...paymentData, email: e.target.value })}
                    />
                    <p className="text-xs text-gray-500 mt-1">For payment receipt and verification updates</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Phone Number</label>
                    <Input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={paymentData.phone}
                      onChange={(e) => setPaymentData({ ...paymentData, phone: e.target.value })}
                    />
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="font-medium">Payment Method</h3>
                    
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <input
                          type="radio"
                          id="upi"
                          name="paymentMethod"
                          value="upi"
                          checked={paymentData.selectedMethod === 'upi'}
                          onChange={(e) => setPaymentData({ ...paymentData, selectedMethod: e.target.value })}
                          className="h-4 w-4 text-blue-600"
                        />
                        <label htmlFor="upi" className="font-medium">UPI Payment</label>
                      </div>
                      
                      {paymentData.selectedMethod === 'upi' && (
                        <div className="ml-7">
                          <Input
                            placeholder="yourname@paytm"
                            value={paymentData.upiId}
                            onChange={(e) => setPaymentData({ ...paymentData, upiId: e.target.value })}
                          />
                          <div className="flex gap-2 mt-2">
                            <Badge variant="outline">🟢 Google Pay</Badge>
                            <Badge variant="outline">🟣 PhonePe</Badge>
                            <Badge variant="outline">🔵 Paytm</Badge>
                          </div>
                        </div>
                      )}

                      <div className="flex items-center space-x-3">
                        <input
                          type="radio"
                          id="card"
                          name="paymentMethod"
                          value="card"
                          checked={paymentData.selectedMethod === 'card'}
                          onChange={(e) => setPaymentData({ ...paymentData, selectedMethod: e.target.value })}
                          className="h-4 w-4 text-blue-600"
                        />
                        <label htmlFor="card" className="font-medium">Credit/Debit Card</label>
                      </div>

                      <div className="flex items-center space-x-3">
                        <input
                          type="radio"
                          id="netbanking"
                          name="paymentMethod"
                          value="netbanking"
                          checked={paymentData.selectedMethod === 'netbanking'}
                          onChange={(e) => setPaymentData({ ...paymentData, selectedMethod: e.target.value })}
                          className="h-4 w-4 text-blue-600"
                        />
                        <label htmlFor="netbanking" className="font-medium">Net Banking</label>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button variant="outline" onClick={() => setVerificationStep('input')} className="flex-1">
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back
                    </Button>
                    <Button onClick={handlePayment} className="flex-1 bg-yellow-600 hover:bg-yellow-700">
                      <CreditCard className="mr-2 h-4 w-4" />
                      Pay ₹{amount}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">₹{amount}</div>
                      <p className="text-sm text-gray-600">Total Amount</p>
                    </div>
                    <Separator />
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Base verification</span>
                        <span>₹75</span>
                      </div>
                      {formData.expressVerification && (
                        <div className="flex justify-between">
                          <span>Express processing</span>
                          <span>₹75</span>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Verification Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div><strong>Document:</strong> {formData.documentType || 'Not specified'}</div>
                  <div><strong>Purpose:</strong> {formData.purpose || 'Not specified'}</div>
                  <div><strong>Processing:</strong> {formData.expressVerification ? 'Express (5 min)' : 'Standard (30 min)'}</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (verificationStep === 'processing') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-yellow-100 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600 mx-auto mb-4"></div>
            <h3 className="text-lg font-semibold mb-2">Verifying Document...</h3>
            <p className="text-gray-600">Checking blockchain records and validation trail</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (verificationStep === 'result') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-yellow-100 p-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Verification Results</h1>
            <Button variant="outline" onClick={() => setVerificationStep('input')} className="mb-4">
              ← Verify Another Document
            </Button>
          </div>

          {/* Verification Status */}
          <Card className="mb-6">
            <CardContent className="p-8 text-center">
              {verificationResult === 'success' && (
                <>
                  <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-green-600 mb-2">DOCUMENT VERIFIED</h2>
                  <p className="text-lg text-gray-600 mb-2">96% verification confidence</p>
                  <p className="text-sm text-gray-500">Last validated: June 25, 2025</p>
                </>
              )}
              {verificationResult === 'failed' && (
                <>
                  <XCircle className="h-16 w-16 text-red-600 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-red-600 mb-2">DOCUMENT NOT VERIFIED</h2>
                  <p className="text-lg text-gray-600 mb-2">Document not found in Kagzat validation network</p>
                  <p className="text-sm text-gray-500">This doesn't necessarily mean the document is fake</p>
                </>
              )}
              {verificationResult === 'partial' && (
                <>
                  <AlertTriangle className="h-16 w-16 text-yellow-600 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-yellow-600 mb-2">PARTIAL VERIFICATION</h2>
                  <p className="text-lg text-gray-600 mb-2">Document found but requires attention</p>
                  <p className="text-sm text-gray-500">Document hash partially matches (78% similarity)</p>
                </>
              )}
            </CardContent>
          </Card>

          {verificationResult === 'success' && (
            <>
              {/* Document Details */}
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Document Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <span className="font-medium">Document type:</span>
                      <p className="text-gray-600">Property Sale Deed</p>
                    </div>
                    <div>
                      <span className="font-medium">Owner:</span>
                      <p className="text-gray-600">Ramesh Kumar Sharma ✅ Verified identity</p>
                    </div>
                    <div>
                      <span className="font-medium">Document hash:</span>
                      <div className="flex items-center gap-2">
                        <code className="text-xs bg-gray-100 px-2 py-1 rounded">a1b2c3d4e5f6...</code>
                        <Button size="sm" variant="ghost" onClick={() => copyToClipboard('a1b2c3d4e5f6g7h8i9j0')}>
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div>
                      <span className="font-medium">File details:</span>
                      <p className="text-gray-600">Land_Deed_Plot_47_Sector_12.pdf (2.3 MB)</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Property Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <span className="font-medium">Property address:</span>
                      <p className="text-gray-600">Plot 47, Sector 12, Navi Mumbai</p>
                    </div>
                    <div>
                      <span className="font-medium">Survey number:</span>
                      <p className="text-gray-600">Survey No. 123/4A</p>
                    </div>
                    <div>
                      <span className="font-medium">Registration date:</span>
                      <p className="text-gray-600">March 15, 2020</p>
                    </div>
                    <div>
                      <span className="font-medium">Encumbrance status:</span>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">Clear title</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Validation Trail */}
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Blockchain Validation Trail</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-blue-100 p-2 rounded-full">
                        <span className="text-lg">📤</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold">Document Submitted</h4>
                        <p className="text-gray-600 text-sm">June 20, 2025, 10:30 AM</p>
                        <p className="text-gray-600">By: Ramesh Kumar Sharma</p>
                        <p className="text-gray-600">Action: Initial upload and hash generation</p>
                      </div>
                    </div>
                    <Separator />
                    <div className="flex items-start gap-4">
                      <div className="bg-green-100 p-2 rounded-full">
                        <span className="text-lg">🏛️</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold">Government Verification</h4>
                        <p className="text-gray-600 text-sm">June 22, 2025, 2:15 PM</p>
                        <p className="text-gray-600">Validator: Mumbai Sub-Registrar Office ✅ Official Authority</p>
                        <Badge variant="secondary" className="bg-green-100 text-green-800 my-1">Verified authentic</Badge>
                        <p className="text-gray-600">Comments: Property deed matches government records</p>
                      </div>
                    </div>
                    <Separator />
                    <div className="flex items-start gap-4">
                      <div className="bg-yellow-100 p-2 rounded-full">
                        <span className="text-lg">⚖️</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold">Legal Verification</h4>
                        <p className="text-gray-600 text-sm">June 25, 2025, 11:45 AM</p>
                        <p className="text-gray-600">Validator: Advocate Priya Mehta ✅ Legal Expert</p>
                        <Badge variant="secondary" className="bg-green-100 text-green-800 my-1">Cross-verified</Badge>
                        <p className="text-gray-600">Comments: No legal disputes, clear title</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Download Certificate */}
              <Card>
                <CardHeader>
                  <CardTitle>Verification Certificate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button className="flex-1">
                      <Download className="mr-2 h-4 w-4" />
                      Download Certificate
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Share Verification
                    </Button>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    Certificate includes complete validation trail, QR code for re-verification, and legal disclaimer.
                  </p>
                </CardContent>
              </Card>
            </>
          )}

          {verificationResult === 'failed' && (
            <Card>
              <CardHeader>
                <CardTitle>Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-600">
                  <li>• Ask the document owner to validate through Kagzat</li>
                  <li>• Request additional verification from official sources</li>
                  <li>• Consider professional document verification services</li>
                </ul>
              </CardContent>
            </Card>
          )}

          {verificationResult === 'partial' && (
            <Card>
              <CardHeader>
                <CardTitle>Issues Found & Recommended Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <h4 className="font-semibold mb-2">Issues:</h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>• Document hash partially matches (78% similarity)</li>
                    <li>• Owner information doesn't fully match</li>
                    <li>• Last validation was 6 months ago</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Recommended Actions:</h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>• Contact document owner for clarification</li>
                    <li>• Request fresh validation from owner</li>
                    <li>• Consider additional verification sources</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-yellow-100">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Verify Any Document Instantly</h1>
          <p className="text-xl text-gray-600 mb-6">Check document authenticity for property deals, job verification, loan applications, and more</p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            <Badge variant="secondary" className="bg-green-100 text-green-800 px-4 py-2">
              <Shield className="mr-2 h-4 w-4" />
              Secure
            </Badge>
            <Badge variant="secondary" className="bg-blue-100 text-blue-800 px-4 py-2">
              <Zap className="mr-2 h-4 w-4" />
              Instant
            </Badge>
            <Badge variant="secondary" className="bg-purple-100 text-purple-800 px-4 py-2">
              <Globe className="mr-2 h-4 w-4" />
              Public Access
            </Badge>
          </div>
          
          <p className="text-sm text-gray-500">No account needed - verify any document</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Use Cases */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-center mb-8">Common Verification Scenarios</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {useCases.map((useCase, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-center mb-2">{useCase.icon}</div>
                  <CardTitle className="text-sm font-bold">{useCase.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-2">{useCase.description}</p>
                  <p className="text-xs text-gray-500 italic">Example: {useCase.example}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Verification Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Document Verification</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Google Drive Link */}
                <div>
                  <label className="block text-sm font-medium mb-2">Google Drive Link *</label>
                  <Input
                    placeholder="https://drive.google.com/file/d/1a2b3c4..."
                    value={formData.driveLink}
                    onChange={(e) => setFormData({ ...formData, driveLink: e.target.value })}
                    className="text-sm"
                  />
                  <p className="text-xs text-gray-500 mt-1">Ensure the link is publicly accessible or shared with view permissions</p>
                  {formData.driveLink && formData.driveLink.includes('drive.google.com') && (
                    <div className="flex items-center gap-2 mt-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-xs text-green-600">Valid Google Drive link</span>
                    </div>
                  )}
                </div>

                {/* Owner Details */}
                <div>
                  <label className="block text-sm font-medium mb-2">Document Owner Details *</label>
                  <Input
                    placeholder="rajesh.kumar@email.com or @rajeshkumar"
                    value={formData.ownerDetails}
                    onChange={(e) => setFormData({ ...formData, ownerDetails: e.target.value })}
                  />
                  <p className="text-xs text-gray-500 mt-1">Document owner's Kagzat username or email</p>
                </div>

                {/* Document Type */}
                <div>
                  <label className="block text-sm font-medium mb-2">Document Type (Optional)</label>
                  <Select value={formData.documentType} onValueChange={(value) => setFormData({ ...formData, documentType: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select document type (helps with faster verification)" />
                    </SelectTrigger>
                    <SelectContent>
                      {documentTypes.map((type) => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Purpose */}
                <div>
                  <label className="block text-sm font-medium mb-2">Verification Purpose</label>
                  <Select value={formData.purpose} onValueChange={(value) => setFormData({ ...formData, purpose: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="What is this verification for?" />
                    </SelectTrigger>
                    <SelectContent>
                      {purposes.map((purpose) => (
                        <SelectItem key={purpose} value={purpose}>{purpose}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Express Option */}
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="express"
                    checked={formData.expressVerification}
                    onChange={(e) => setFormData({ ...formData, expressVerification: e.target.checked })}
                    className="rounded"
                  />
                  <label htmlFor="express" className="text-sm">Express verification (5 minutes) - ₹150</label>
                </div>

                <Button onClick={handleProceedToPayment} className="w-full bg-yellow-600 hover:bg-yellow-700">
                  Proceed to Payment - ₹{formData.expressVerification ? '150' : '75'}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Pricing */}
            <Card>
              <CardHeader>
                <CardTitle>Verification Cost</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Base fee:</span>
                  <span className="font-semibold">₹75</span>
                </div>
                <div className="flex justify-between">
                  <span>Express (5 min):</span>
                  <span className="font-semibold">₹150</span>
                </div>
                <div className="text-sm text-gray-600">
                  <p>• Bulk discount: 5+ verifications get 20% off</p>
                  <p>• Payment: UPI, Cards, Net Banking</p>
                </div>
              </CardContent>
            </Card>

            {/* Example Demo */}
            <Card>
              <CardHeader>
                <CardTitle>🏠 Try Example</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Example: Verifying seller's land documents for property purchase
                </p>
                <Button variant="outline" onClick={loadExample} className="w-full">
                  Load Example Data
                </Button>
              </CardContent>
            </Card>

            {/* Privacy */}
            <Card>
              <CardHeader>
                <CardTitle>Privacy & Security</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• We don't store document content</li>
                  <li>• Only verification status checked</li>
                  <li>• Owner privacy settings respected</li>
                  <li>• No personal data retained</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentVerification;
