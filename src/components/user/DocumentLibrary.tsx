import { useState } from 'react';
import { FileText, Upload, Trash2, Download, Eye, Shield, Clock, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const DocumentLibrary = () => {
  const [selectedDocument, setSelectedDocument] = useState<any>(null);

  const documents = [
    {
      name: 'Harvard_MBA_Certificate.pdf',
      type: 'Educational',
      size: '2.3 MB',
      uploadDate: '2 weeks ago',
      used: 3,
      validationTrail: [
        {
          id: 'VAL-001',
          validator: 'Harvard Business School',
          validatorType: 'Institution',
          date: '2024-06-15',
          status: 'Verified',
          purpose: 'Job Application - TCS',
          fee: 2500,
          validatorRating: 4.9,
          validatorBadge: 'Official Institution'
        },
        {
          id: 'VAL-002',
          validator: 'Educational Credentials Evaluators',
          validatorType: 'Organization',
          date: '2024-06-20',
          status: 'Verified',
          purpose: 'Immigration - Canada PR',
          fee: 1800,
          validatorRating: 4.7,
          validatorBadge: 'Certified Organization'
        },
        {
          id: 'VAL-003',
          validator: 'Dr. Michael Roberts',
          validatorType: 'Professional',
          date: '2024-06-25',
          status: 'Verified',
          purpose: 'University Application - MIT',
          fee: 2200,
          validatorRating: 4.8,
          validatorBadge: 'Education Expert'
        }
      ]
    },
    {
      name: 'Passport_Copy.jpg',
      type: 'Identity',
      size: '456 KB',
      uploadDate: '1 month ago',
      used: 5,
      validationTrail: [
        {
          id: 'VAL-004',
          validator: 'Government Authority',
          validatorType: 'Government',
          date: '2024-05-30',
          status: 'Verified',
          purpose: 'Bank Account Opening',
          fee: 400,
          validatorRating: 5.0,
          validatorBadge: 'Government Verified'
        },
        {
          id: 'VAL-005',
          validator: 'Identity Verification Services',
          validatorType: 'Organization',
          date: '2024-06-10',
          status: 'Verified',
          purpose: 'Online Trading Account',
          fee: 350,
          validatorRating: 4.6,
          validatorBadge: 'KYC Specialist'
        }
      ]
    },
    {
      name: 'Experience_Letter.pdf',
      type: 'Professional',
      size: '890 KB',
      uploadDate: '3 weeks ago',
      used: 2,
      validationTrail: [
        {
          id: 'VAL-006',
          validator: 'HR Professional Network',
          validatorType: 'Organization',
          date: '2024-06-12',
          status: 'Verified',
          purpose: 'Job Application - Infosys',
          fee: 600,
          validatorRating: 4.5,
          validatorBadge: 'HR Certified'
        },
        {
          id: 'VAL-007',
          validator: 'Ms. Priya Gupta',
          validatorType: 'Professional',
          date: '2024-06-18',
          status: 'Verified',
          purpose: 'Loan Application',
          fee: 800,
          validatorRating: 4.9,
          validatorBadge: 'Employment Expert'
        }
      ]
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Educational': return 'bg-blue-100 text-blue-800';
      case 'Identity': return 'bg-green-100 text-green-800';
      case 'Professional': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getValidatorTypeIcon = (type: string) => {
    switch (type) {
      case 'Institution': return <Shield className="h-4 w-4 text-blue-600" />;
      case 'Government': return <Shield className="h-4 w-4 text-green-600" />;
      case 'Organization': return <Shield className="h-4 w-4 text-purple-600" />;
      case 'Professional': return <Shield className="h-4 w-4 text-orange-600" />;
      default: return <Shield className="h-4 w-4 text-gray-600" />;
    }
  };

  const getValidatorTypeColor = (type: string) => {
    switch (type) {
      case 'Institution': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'Government': return 'bg-green-100 text-green-800 border-green-300';
      case 'Organization': return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'Professional': return 'bg-orange-100 text-orange-800 border-orange-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FileText className="h-5 w-5 flex-shrink-0" />
            <span className="truncate">Document Library</span>
          </div>
          <Button variant="outline" size="sm" className="flex-shrink-0">
            <Upload className="h-4 w-4 mr-2" />
            Upload
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-3">
          {documents.map((doc, index) => (
            <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 min-w-0">
              <div className="flex-1 min-w-0 pr-3">
                <div className="flex items-center space-x-2 mb-1 flex-wrap">
                  <h4 className="font-medium text-gray-900 text-sm truncate min-w-0">{doc.name}</h4>
                  <Badge variant="outline" className={`text-xs flex-shrink-0 ${getTypeColor(doc.type)}`}>
                    {doc.type}
                  </Badge>
                  {doc.validationTrail.length > 1 && (
                    <Badge variant="outline" className="text-xs bg-yellow-100 text-yellow-800 border-yellow-300 flex-shrink-0">
                      {doc.validationTrail.length} validations
                    </Badge>
                  )}
                </div>
                <div className="flex items-center space-x-4 text-xs text-gray-500 flex-wrap">
                  <span className="flex-shrink-0">{doc.size}</span>
                  <span className="flex-shrink-0">Added {doc.uploadDate}</span>
                  <span className="flex-shrink-0">Used {doc.used} times</span>
                </div>
              </div>
              <div className="flex items-center space-x-1 flex-shrink-0">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="sm" onClick={() => setSelectedDocument(doc)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">
                    <DialogHeader className="flex-shrink-0">
                      <DialogTitle className="flex items-center space-x-2 pr-8">
                        <FileText className="h-5 w-5 flex-shrink-0" />
                        <span className="truncate">{selectedDocument?.name}</span>
                      </DialogTitle>
                    </DialogHeader>
                    
                    <div className="flex-1 overflow-y-auto">
                      {selectedDocument && (
                        <div className="space-y-6 pr-2">
                          {/* Document Info */}
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="font-semibold text-gray-900 mb-3">Document Information</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div>
                                <p className="text-sm text-gray-600 mb-1">Type</p>
                                <Badge variant="outline" className={`text-xs ${getTypeColor(selectedDocument.type)}`}>
                                  {selectedDocument.type}
                                </Badge>
                              </div>
                              <div>
                                <p className="text-sm text-gray-600 mb-1">Size</p>
                                <p className="text-sm font-medium">{selectedDocument.size}</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-600 mb-1">Upload Date</p>
                                <p className="text-sm font-medium">{selectedDocument.uploadDate}</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-600 mb-1">Total Validations</p>
                                <p className="text-sm font-medium">{selectedDocument.validationTrail.length}</p>
                              </div>
                            </div>
                          </div>

                          {/* Validation Trail */}
                          <div>
                            <h3 className="font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                              <Clock className="h-5 w-5 flex-shrink-0" />
                              <span>Validation Trail</span>
                            </h3>
                            
                            <div className="space-y-4">
                              {selectedDocument.validationTrail.map((validation: any, idx: number) => (
                                <div key={validation.id} className="border rounded-lg p-4 bg-white">
                                  <div className="flex flex-col lg:flex-row lg:items-start justify-between mb-3 space-y-3 lg:space-y-0">
                                    <div className="flex-1 min-w-0">
                                      <div className="flex items-center space-x-2 mb-2 flex-wrap">
                                        {getValidatorTypeIcon(validation.validatorType)}
                                        <h4 className="font-semibold text-gray-900 truncate">{validation.validator}</h4>
                                        <Badge variant="outline" className={`text-xs flex-shrink-0 ${getValidatorTypeColor(validation.validatorType)}`}>
                                          {validation.validatorBadge}
                                        </Badge>
                                      </div>
                                      
                                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                                        <div>
                                          <p className="text-gray-600 mb-1">Validation ID</p>
                                          <p className="font-mono text-gray-900 text-xs break-all">{validation.id}</p>
                                        </div>
                                        <div>
                                          <p className="text-gray-600 mb-1">Date</p>
                                          <p className="text-gray-900">{new Date(validation.date).toLocaleDateString()}</p>
                                        </div>
                                        <div>
                                          <p className="text-gray-600 mb-1">Purpose</p>
                                          <p className="text-gray-900 break-words">{validation.purpose}</p>
                                        </div>
                                        <div>
                                          <p className="text-gray-600 mb-1">Fee Paid</p>
                                          <p className="text-gray-900">₹{validation.fee.toLocaleString()}</p>
                                        </div>
                                      </div>
                                    </div>
                                    
                                    <div className="flex flex-row lg:flex-col items-start lg:items-end space-x-2 lg:space-x-0 lg:space-y-2 flex-shrink-0">
                                      <Badge className="bg-green-100 text-green-800 border-green-300 flex-shrink-0">
                                        <CheckCircle className="h-3 w-3 mr-1" />
                                        {validation.status}
                                      </Badge>
                                      <div className="flex items-center space-x-1 text-sm text-gray-600 flex-shrink-0">
                                        <span>⭐ {validation.validatorRating}</span>
                                      </div>
                                    </div>
                                  </div>
                                  
                                  {idx < selectedDocument.validationTrail.length - 1 && (
                                    <div className="border-l-2 border-gray-200 ml-2 h-4"></div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Summary Stats */}
                          <div className="bg-blue-50 p-4 rounded-lg">
                            <h4 className="font-semibold text-blue-900 mb-3">Validation Summary</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                              <div>
                                <p className="text-blue-700 mb-1">Total Spent</p>
                                <p className="font-bold text-blue-900 break-words">
                                  ₹{selectedDocument.validationTrail.reduce((sum: number, v: any) => sum + v.fee, 0).toLocaleString()}
                                </p>
                              </div>
                              <div>
                                <p className="text-blue-700 mb-1">Average Rating</p>
                                <p className="font-bold text-blue-900">
                                  {(selectedDocument.validationTrail.reduce((sum: number, v: any) => sum + v.validatorRating, 0) / selectedDocument.validationTrail.length).toFixed(1)} ⭐
                                </p>
                              </div>
                              <div>
                                <p className="text-blue-700 mb-1">Success Rate</p>
                                <p className="font-bold text-blue-900">100%</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </DialogContent>
                </Dialog>
                
                <Button variant="ghost" size="sm">
                  <Download className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DocumentLibrary;
