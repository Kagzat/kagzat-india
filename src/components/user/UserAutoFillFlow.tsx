
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import ServiceSelection from '@/components/autofill/ServiceSelection';
import DocumentAnalysis from '@/components/autofill/DocumentAnalysis';
import AutoFilledForm from '@/components/autofill/AutoFilledForm';
import SubmissionPreview from '@/components/autofill/SubmissionPreview';
import FinalReview from '@/components/autofill/FinalReview';
import PaymentGateway from '@/components/autofill/PaymentGateway';
import PaymentProcessing from '@/components/autofill/PaymentProcessing';
import PaymentSuccess from '@/components/autofill/PaymentSuccess';
import NotificationDemo from '@/components/autofill/NotificationDemo';

interface UserAutoFillFlowProps {
  onComplete: () => void;
}

const UserAutoFillFlow = ({ onComplete }: UserAutoFillFlowProps) => {
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
            onBack={onComplete}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">New Verification Request</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onComplete}
            className="h-8 w-8"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6">
          {renderStep()}
        </div>
      </div>
    </div>
  );
};

export default UserAutoFillFlow;
