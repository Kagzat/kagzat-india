
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { 
  X, 
  FileText, 
  User, 
  Calendar, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  Download,
  ExternalLink,
  Clock,
  Save,
  Send
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ValidationWorkflowProps {
  requestId: string;
  onClose: () => void;
}

const ValidationWorkflow = ({ requestId, onClose }: ValidationWorkflowProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [validationStatus, setValidationStatus] = useState<'pending' | 'approved' | 'rejected' | 'needs_info'>('pending');
  const [validationNotes, setValidationNotes] = useState('');
  const [rejectionReason, setRejectionReason] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const { toast } = useToast();

  // Mock data for the validation request
  const requestData = {
    id: requestId,
    document: 'Harvard MBA Certificate',
    submitter: 'Rajesh Kumar',
    submittedTime: '2 hours ago',
    fee: 2500,
    autoPopulated: 85,
    status: 'Documents uploaded',
    documents: [
      { name: 'Harvard MBA Certificate.pdf', url: '#', verified: false },
      { name: 'Academic Transcript.pdf', url: '#', verified: false },
      { name: 'Student ID.jpg', url: '#', verified: false }
    ],
    submittedData: {
      fullName: 'Rajesh Kumar',
      email: 'rajesh.kumar@email.com',
      graduationYear: '2019',
      studentId: 'HBS-2017-0456',
      program: 'Master of Business Administration',
      specialization: 'Finance and Strategic Management'
    }
  };

  const validationSteps = [
    { id: 1, title: 'Document Review', description: 'Review submitted documents' },
    { id: 2, title: 'Data Verification', description: 'Verify provided information' },
    { id: 3, title: 'Final Decision', description: 'Make validation decision' },
    { id: 4, title: 'Report Generation', description: 'Generate validation report' }
  ];

  const handleDocumentVerification = (docIndex: number, verified: boolean) => {
    // Mock document verification logic
    console.log(`Document ${docIndex} verification status: ${verified}`);
  };

  const handleStepComplete = () => {
    if (currentStep < validationSteps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleValidationSubmit = () => {
    toast({
      title: "Validation Completed",
      description: `Request ${requestId} has been ${validationStatus} and submitted.`,
    });
    onClose();
  };

  const progress = (currentStep / validationSteps.length) * 100;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Validation Workflow</h2>
            <p className="text-gray-600">Request ID: {requestId}</p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Progress Bar */}
        <div className="p-6 bg-gray-50 border-b">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              Step {currentStep} of {validationSteps.length}: {validationSteps[currentStep - 1]?.title}
            </span>
            <span className="text-sm text-gray-500">{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between mt-4">
            {validationSteps.map((step) => (
              <div key={step.id} className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step.id <= currentStep 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {step.id < currentStep ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    step.id
                  )}
                </div>
                <p className="text-xs text-gray-600 mt-1 text-center max-w-20">
                  {step.title}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Request Info */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Request Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Document Type</Label>
                    <p className="font-semibold">{requestData.document}</p>
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Submitter</Label>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-gray-400" />
                      <span>{requestData.submitter}</span>
                    </div>
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Submitted</Label>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span>{requestData.submittedTime}</span>
                    </div>
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Validation Fee</Label>
                    <p className="font-semibold text-green-600">₹{requestData.fee.toLocaleString()}</p>
                  </div>
                  
                  {requestData.autoPopulated > 0 && (
                    <div>
                      <Label className="text-sm font-medium text-gray-600">Auto-populated</Label>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        {requestData.autoPopulated}% complete
                      </Badge>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Submitted Data */}
              <Card className="mt-4">
                <CardHeader>
                  <CardTitle>Submitted Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {Object.entries(requestData.submittedData).map(([key, value]) => (
                    <div key={key}>
                      <Label className="text-sm text-gray-600 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </Label>
                      <p className="font-medium">{value}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Validation Content */}
            <div className="lg:col-span-2">
              {currentStep === 1 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Document Review</CardTitle>
                    <p className="text-gray-600">Review and verify each submitted document</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {requestData.documents.map((doc, index) => (
                        <div key={index} className="border rounded-lg p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <FileText className="h-5 w-5 text-gray-400" />
                              <div>
                                <p className="font-medium">{doc.name}</p>
                                <p className="text-sm text-gray-500">Click to view document</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button variant="outline" size="sm">
                                <Download className="h-4 w-4 mr-1" />
                                Download
                              </Button>
                              <Button variant="outline" size="sm">
                                <ExternalLink className="h-4 w-4 mr-1" />
                                View
                              </Button>
                            </div>
                          </div>
                          
                          <div className="mt-3 flex items-center gap-2">
                            <Button
                              size="sm"
                              variant={doc.verified ? 'default' : 'outline'}
                              onClick={() => handleDocumentVerification(index, true)}
                            >
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Verified
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDocumentVerification(index, false)}
                            >
                              <XCircle className="h-4 w-4 mr-1" />
                              Reject
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {currentStep === 2 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Data Verification</CardTitle>
                    <p className="text-gray-600">Verify the accuracy of submitted information</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <Label>Institution Verification Status</Label>
                        <Select defaultValue="verified">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="verified">Verified with Institution</SelectItem>
                            <SelectItem value="pending">Verification Pending</SelectItem>
                            <SelectItem value="failed">Verification Failed</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label>Program Details Match</Label>
                        <Select defaultValue="match">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="match">Details Match</SelectItem>
                            <SelectItem value="partial">Partial Match</SelectItem>
                            <SelectItem value="no-match">No Match</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label>Verification Notes</Label>
                        <Textarea
                          value={validationNotes}
                          onChange={(e) => setValidationNotes(e.target.value)}
                          placeholder="Add any notes about the verification process..."
                          rows={4}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {currentStep === 3 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Final Decision</CardTitle>
                    <p className="text-gray-600">Make your final validation decision</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <Label>Validation Decision</Label>
                        <Select value={validationStatus} onValueChange={(value: any) => setValidationStatus(value)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="approved">Approve</SelectItem>
                            <SelectItem value="rejected">Reject</SelectItem>
                            <SelectItem value="needs_info">Request Additional Information</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      {validationStatus === 'rejected' && (
                        <div>
                          <Label>Rejection Reason</Label>
                          <Select value={rejectionReason} onValueChange={setRejectionReason}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select reason" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="invalid_documents">Invalid or Fake Documents</SelectItem>
                              <SelectItem value="insufficient_info">Insufficient Information</SelectItem>
                              <SelectItem value="unverifiable">Cannot Verify with Institution</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                      
                      {validationStatus === 'needs_info' && (
                        <div>
                          <Label>Additional Information Required</Label>
                          <Textarea
                            value={additionalInfo}
                            onChange={(e) => setAdditionalInfo(e.target.value)}
                            placeholder="Specify what additional information or documents are needed..."
                            rows={3}
                          />
                        </div>
                      )}
                      
                      <div>
                        <Label>Final Comments</Label>
                        <Textarea
                          placeholder="Add any final comments for the validation report..."
                          rows={4}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {currentStep === 4 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Validation Report</CardTitle>
                    <p className="text-gray-600">Review and finalize the validation report</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2">Validation Summary</h4>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-600">Document:</span>
                            <span className="ml-2 font-medium">{requestData.document}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Status:</span>
                            <Badge className="ml-2" variant={validationStatus === 'approved' ? 'default' : 'destructive'}>
                              {validationStatus.charAt(0).toUpperCase() + validationStatus.slice(1)}
                            </Badge>
                          </div>
                          <div>
                            <span className="text-gray-600">Validator:</span>
                            <span className="ml-2 font-medium">Dr. Sarah Johnson</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Date:</span>
                            <span className="ml-2 font-medium">{new Date().toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <Label>Report will be sent to:</Label>
                        <p className="text-gray-600">{requestData.submitter} ({requestData.submittedData.email})</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex justify-between items-center p-6 border-t bg-gray-50">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          
          <div className="flex gap-2">
            <Button variant="outline">
              <Save className="h-4 w-4 mr-2" />
              Save Progress
            </Button>
            
            {currentStep < validationSteps.length ? (
              <Button onClick={handleStepComplete}>
                Continue to Next Step
              </Button>
            ) : (
              <Button onClick={handleValidationSubmit}>
                <Send className="h-4 w-4 mr-2" />
                Submit Validation
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValidationWorkflow;
