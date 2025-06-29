
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, DollarSign, FileText, ArrowRight } from 'lucide-react';
import ServiceSelection from '@/components/autofill/ServiceSelection';
import DocumentAnalysis from '@/components/autofill/DocumentAnalysis';
import AutoFilledForm from '@/components/autofill/AutoFilledForm';
import SubmissionPreview from '@/components/autofill/SubmissionPreview';

const AutoFillDemo = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const serviceData = {
    name: "Harvard Business School - MBA Verification",
    organization: "Harvard Business School",
    price: 2500,
    currency: "₹",
    timeRange: "24-48 hours",
    requiredDocuments: ["Official transcript", "Student ID proof"],
    requiredFields: ["Full name", "Student ID", "Graduation year", "Email"],
    rating: 4.9,
    reviews: 156
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <ServiceSelection 
            service={serviceData} 
            onNext={() => setCurrentStep(2)} 
          />
        );
      case 2:
        return (
          <DocumentAnalysis 
            onComplete={() => setCurrentStep(3)} 
          />
        );
      case 3:
        return (
          <AutoFilledForm 
            onNext={() => setCurrentStep(4)} 
          />
        );
      case 4:
        return (
          <SubmissionPreview 
            service={serviceData}
            onBack={() => setCurrentStep(3)} 
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Progress Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Auto-Fill Demo</h1>
            <div className="flex items-center space-x-4">
              {[1, 2, 3, 4].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    currentStep >= step 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {step}
                  </div>
                  {step < 4 && (
                    <ArrowRight className={`ml-2 h-4 w-4 ${
                      currentStep > step ? 'text-blue-600' : 'text-gray-400'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="mt-2 text-sm text-gray-600">
            {currentStep === 1 && "Service Selection"}
            {currentStep === 2 && "Document Analysis"}
            {currentStep === 3 && "Auto-Filled Form"}
            {currentStep === 4 && "Submission Preview"}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        {renderStep()}
      </div>
    </div>
  );
};

export default AutoFillDemo;
