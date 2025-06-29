
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, DollarSign, FileText, ArrowRight } from 'lucide-react';
import ServiceSelection from '@/components/autofill/ServiceSelection';
import DocumentAnalysis from '@/components/autofill/DocumentAnalysis';
import AutoFilledForm from '@/components/autofill/AutoFilledForm';
import SubmissionPreview from '@/components/autofill/SubmissionPreview';
import FinalReview from '@/components/autofill/FinalReview';
import PaymentGateway from '@/components/autofill/PaymentGateway';
import PaymentProcessing from '@/components/autofill/PaymentProcessing';
import PaymentSuccess from '@/components/autofill/PaymentSuccess';
import NotificationDemo from '@/components/autofill/NotificationDemo';

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
            onNext={() => setCurrentStep(5)}
          />
        );
      case 5:
        return (
          <FinalReview 
            service={serviceData}
            onBack={() => setCurrentStep(4)}
            onNext={() => setCurrentStep(6)}
          />
        );
      case 6:
        return (
          <PaymentGateway 
            amount={3599}
            onBack={() => setCurrentStep(5)}
            onNext={() => setCurrentStep(7)}
          />
        );
      case 7:
        return (
          <PaymentProcessing 
            onComplete={() => setCurrentStep(8)}
          />
        );
      case 8:
        return (
          <PaymentSuccess 
            onNext={() => setCurrentStep(9)}
          />
        );
      case 9:
        return (
          <NotificationDemo 
            onBack={() => setCurrentStep(1)}
          />
        );
      default:
        return null;
    }
  };

  const getStepName = () => {
    const stepNames = [
      "Service Selection",
      "Document Analysis", 
      "Auto-Filled Form",
      "Submission Preview",
      "Final Review",
      "Payment Gateway",
      "Payment Processing",
      "Payment Success",
      "Notifications"
    ];
    return stepNames[currentStep - 1] || "";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Progress Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Auto-Fill Demo</h1>
            <div className="flex items-center space-x-2">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                    currentStep >= step 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {step}
                  </div>
                  {step < 9 && (
                    <ArrowRight className={`ml-1 mr-1 h-3 w-3 ${
                      currentStep > step ? 'text-blue-600' : 'text-gray-400'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="mt-2 text-sm text-gray-600">
            Step {currentStep} of 9: {getStepName()}
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
