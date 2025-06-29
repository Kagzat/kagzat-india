
import { useState } from 'react';
import { 
  X, 
  FileText, 
  User, 
  Calendar, 
  Clock, 
  Download, 
  ExternalLink,
  CheckCircle,
  AlertTriangle,
  MessageSquare,
  DollarSign,
  Star,
  Eye
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface RequestDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  requestId: string;
}

const RequestDetailsModal = ({ isOpen, onClose, requestId }: RequestDetailsModalProps) => {
  const [additionalInfoResponse, setAdditionalInfoResponse] = useState('');

  // Mock data based on the request ID
  const requestData = {
    'SUB-HBS-240629-001': {
      id: 'SUB-HBS-240629-001',
      document: 'Harvard MBA Certificate',
      validator: 'Harvard Business School',
      submittedDate: '2 hours ago',
      status: 'Under Review',
      progress: 65,
      fee: 2500,
      priority: 'normal',
      estimatedCompletion: 'July 1, 2025, 6:00 PM',
      submittedDocuments: [
        { name: 'MBA Certificate.pdf', size: '2.4 MB', status: 'verified' },
        { name: 'Academic Transcript.pdf', size: '1.8 MB', status: 'verified' },
        { name: 'Student ID Card.jpg', size: '0.5 MB', status: 'pending' }
      ],
      submittedData: {
        fullName: 'Rajesh Kumar',
        email: 'rajesh.kumar@email.com',
        graduationYear: '2019',
        studentId: 'HBS-2017-0456',
        program: 'Master of Business Administration'
      },
      timeline: [
        { date: '2 hours ago', event: 'Request submitted', status: 'completed' },
        { date: '1 hour ago', event: 'Documents uploaded', status: 'completed' },
        { date: '30 mins ago', event: 'Validator assigned', status: 'completed' },
        { date: 'Now', event: 'Under review', status: 'current' }
      ]
    },
    'SUB-IIT-240629-002': {
      id: 'SUB-IIT-240629-002',
      document: 'IIT Delhi Engineering Degree',
      validator: 'Dr. Sarah Johnson',
      submittedDate: '5 hours ago',
      status: 'Document Analysis',
      progress: 30,
      fee: 1800,
      priority: 'express',
      estimatedCompletion: 'Today, 11:30 PM',
      submittedDocuments: [
        { name: 'Engineering Degree.pdf', size: '3.1 MB', status: 'verified' },
        { name: 'Grade Sheet.pdf', size: '2.2 MB', status: 'under_review' }
      ],
      submittedData: {
        fullName: 'Amit Sharma',
        email: 'amit.sharma@email.com',
        graduationYear: '2018',
        studentId: 'IIT-2014-1234',
        program: 'Bachelor of Technology - Computer Science'
      },
      timeline: [
        { date: '5 hours ago', event: 'Request submitted', status: 'completed' },
        { date: '4 hours ago', event: 'Documents uploaded', status: 'completed' },
        { date: '3 hours ago', event: 'Validator assigned', status: 'completed' },
        { date: '1 hour ago', event: 'Document analysis started', status: 'current' }
      ]
    },
    'SUB-MAR-240629-003': {
      id: 'SUB-MAR-240629-003',
      document: 'Marriage Certificate',
      validator: 'Government Registry',
      submittedDate: '1 day ago',
      status: 'Awaiting Additional Info',
      progress: 10,
      fee: 800,
      priority: 'normal',
      estimatedCompletion: 'July 2, 2025, 2:00 PM',
      submittedDocuments: [
        { name: 'Marriage Certificate.pdf', size: '1.5 MB', status: 'verified' }
      ],
      submittedData: {
        spouseName1: 'Amit Patel',
        spouseName2: 'Sunita Patel',
        marriageDate: '2020-02-14',
        registrationNumber: 'MAR-2020-0789'
      },
      timeline: [
        { date: '1 day ago', event: 'Request submitted', status: 'completed' },
        { date: '22 hours ago', event: 'Documents uploaded', status: 'completed' },
        { date: '20 hours ago', event: 'Validator assigned', status: 'completed' },
        { date: '18 hours ago', event: 'Additional information requested', status: 'current' }
      ],
      additionalInfoRequest: 'Please provide witness signatures and addresses as mentioned in the original certificate.'
    }
  };

  const request = requestData[requestId as keyof typeof requestData];

  if (!request) {
    return null;
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Under Review': return 'bg-blue-100 text-blue-800';
      case 'Document Analysis': return 'bg-yellow-100 text-yellow-800';
      case 'Awaiting Additional Info': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDocumentStatusIcon = (status: string) => {
    switch (status) {
      case 'verified': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'under_review': return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'pending': return <AlertTriangle className="h-4 w-4 text-gray-400" />;
      default: return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const handleAdditionalInfoSubmit = () => {
    console.log('Additional info response:', additionalInfoResponse);
    setAdditionalInfoResponse('');
    // Here you would typically send the response to the backend
  };

  // Type guard to check if request has additionalInfoRequest
  const hasAdditionalInfoRequest = (req: any): req is typeof request & { additionalInfoRequest: string } => {
    return 'additionalInfoRequest' in req && typeof req.additionalInfoRequest === 'string';
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">Request Details</h2>
              <p className="text-sm text-gray-600 font-normal">ID: {request.id}</p>
            </div>
            <div className="flex items-center gap-2">
              {request.priority === 'express' && (
                <Badge variant="destructive" className="text-xs">
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  Express
                </Badge>
              )}
              <Badge className={getStatusColor(request.status)}>
                {request.status}
              </Badge>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Request Overview */}
          <div className="lg:col-span-1 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Request Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm font-medium text-gray-600">Document</Label>
                  <p className="font-semibold">{request.document}</p>
                </div>
                
                <div>
                  <Label className="text-sm font-medium text-gray-600">Validator</Label>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-gray-400" />
                    <span>{request.validator}</span>
                  </div>
                </div>
                
                <div>
                  <Label className="text-sm font-medium text-gray-600">Submitted</Label>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span>{request.submittedDate}</span>
                  </div>
                </div>
                
                <div>
                  <Label className="text-sm font-medium text-gray-600">Expected Completion</Label>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span className="text-sm">{request.estimatedCompletion}</span>
                  </div>
                </div>
                
                <div>
                  <Label className="text-sm font-medium text-gray-600">Fee Paid</Label>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-gray-400" />
                    <span className="font-semibold text-green-600">₹{request.fee.toLocaleString()}</span>
                  </div>
                </div>
                
                <div>
                  <Label className="text-sm font-medium text-gray-600 mb-2 block">Progress</Label>
                  <Progress value={request.progress} className="h-2" />
                  <p className="text-xs text-gray-500 mt-1">{request.progress}% complete</p>
                </div>
              </CardContent>
            </Card>

            {/* Timeline */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {request.timeline.map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                        item.status === 'completed' ? 'bg-green-500' : 
                        item.status === 'current' ? 'bg-blue-500' : 'bg-gray-300'
                      }`} />
                      <div>
                        <p className="text-sm font-medium">{item.event}</p>
                        <p className="text-xs text-gray-500">{item.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Documents and Data */}
          <div className="lg:col-span-2 space-y-4">
            {/* Submitted Documents */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Submitted Documents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {request.submittedDocuments.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-gray-400" />
                        <div>
                          <p className="font-medium">{doc.name}</p>
                          <p className="text-sm text-gray-500">{doc.size}</p>
                        </div>
                        {getDocumentStatusIcon(doc.status)}
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Submitted Data */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Submitted Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(request.submittedData).map(([key, value]) => (
                    <div key={key}>
                      <Label className="text-sm font-medium text-gray-600 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </Label>
                      <p className="font-medium">{value}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Additional Info Request (if applicable) */}
            {hasAdditionalInfoRequest(request) && (
              <Card className="border-orange-200 bg-orange-50">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2 text-orange-800">
                    <MessageSquare className="h-5 w-5" />
                    Additional Information Required
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-white p-4 rounded-lg border border-orange-200 mb-4">
                    <p className="text-gray-700">{request.additionalInfoRequest}</p>
                  </div>
                  
                  <div className="space-y-3">
                    <Label>Your Response</Label>
                    <Textarea
                      value={additionalInfoResponse}
                      onChange={(e) => setAdditionalInfoResponse(e.target.value)}
                      placeholder="Please provide the requested information..."
                      rows={4}
                    />
                    <Button onClick={handleAdditionalInfoSubmit} className="w-full">
                      Submit Response
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        <Separator className="my-4" />

        {/* Footer Actions */}
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <MessageSquare className="h-4 w-4 mr-2" />
              Contact Support
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Download Receipt
            </Button>
          </div>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RequestDetailsModal;
