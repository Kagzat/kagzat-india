
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, DollarSign, FileText, Star, Building2, CheckCircle } from 'lucide-react';

interface ServiceSelectionProps {
  service: {
    name: string;
    organization: string;
    price: number;
    currency: string;
    timeRange: string;
    requiredDocuments: string[];
    requiredFields: string[];
    rating: number;
    reviews: number;
  };
  onNext: () => void;
}

const ServiceSelection = ({ service, onNext }: ServiceSelectionProps) => {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Confirm Your Selection</h2>
        <p className="text-gray-600">Review the verification service details before proceeding</p>
      </div>

      <Card className="shadow-lg">
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-xl text-gray-900">{service.name}</CardTitle>
              <div className="flex items-center mt-2 space-x-2">
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                  <Building2 className="h-3 w-3 mr-1" />
                  Organization
                </Badge>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="ml-1 text-sm font-medium">{service.rating}</span>
                  <span className="ml-1 text-sm text-gray-500">({service.reviews} reviews)</span>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Pricing and Time */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg">
              <div className="bg-green-100 p-2 rounded-full">
                <DollarSign className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Price</p>
                <p className="text-lg font-semibold text-green-700">
                  {service.currency}{service.price.toLocaleString()}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg">
              <div className="bg-blue-100 p-2 rounded-full">
                <Clock className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Expected Time</p>
                <p className="text-lg font-semibold text-blue-700">{service.timeRange}</p>
              </div>
            </div>
          </div>

          {/* Required Documents */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
              <FileText className="h-5 w-5 mr-2" />
              Required Documents
            </h3>
            <div className="space-y-2">
              {service.requiredDocuments.map((doc, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-gray-700">{doc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Required Fields */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Required Information</h3>
            <div className="grid grid-cols-2 gap-2">
              {service.requiredFields.map((field, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-blue-600" />
                  <span className="text-gray-700">{field}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Auto-fill Notice */}
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-lg border border-purple-200">
            <div className="flex items-start space-x-3">
              <div className="bg-purple-100 p-2 rounded-full">
                <FileText className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <h4 className="font-semibold text-purple-900">Smart Auto-Fill Available</h4>
                <p className="text-sm text-purple-700 mt-1">
                  We'll automatically extract and fill information from your uploaded documents, 
                  saving you time and reducing errors.
                </p>
              </div>
            </div>
          </div>

          <Button onClick={onNext} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3">
            Start Verification Request
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ServiceSelection;
