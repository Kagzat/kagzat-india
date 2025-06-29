
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, FileSearch, Database, Zap, FileText } from 'lucide-react';

interface DocumentAnalysisProps {
  onComplete: () => void;
}

const DocumentAnalysis = ({ onComplete }: DocumentAnalysisProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const steps = [
    { 
      id: 1, 
      label: "Scanning uploaded documents", 
      icon: FileSearch,
      detail: "Processing 3 documents..." 
    },
    { 
      id: 2, 
      label: "Extracting information", 
      icon: Database,
      detail: "Using AI to read document contents..." 
    },
    { 
      id: 3, 
      label: "Matching with form fields", 
      icon: Zap,
      detail: "Mapping extracted data to form..." 
    },
    { 
      id: 4, 
      label: "Preparing auto-fill", 
      icon: FileText,
      detail: "Finalizing auto-population..." 
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 2;
        
        // Update current step based on progress
        if (newProgress >= 25 && currentStep < 1) setCurrentStep(1);
        if (newProgress >= 50 && currentStep < 2) setCurrentStep(2);
        if (newProgress >= 75 && currentStep < 3) setCurrentStep(3);
        if (newProgress >= 100 && currentStep < 4) {
          setCurrentStep(4);
          setTimeout(() => onComplete(), 1000);
        }
        
        return newProgress > 100 ? 100 : newProgress;
      });
    }, 100);

    return () => clearInterval(timer);
  }, [currentStep, onComplete]);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Analyzing Your Documents</h2>
        <p className="text-gray-600">Our AI is processing your documents to auto-fill the form</p>
      </div>

      <Card className="shadow-lg">
        <CardContent className="p-8">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">Processing Progress</span>
              <span className="text-sm font-medium text-blue-600">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-3" />
          </div>

          {/* Document Animation */}
          <div className="text-center mb-8">
            <div className="relative inline-block">
              <div className="w-20 h-24 bg-blue-100 rounded-lg border-2 border-blue-300 flex items-center justify-center mb-4">
                <FileText className={`h-8 w-8 text-blue-600 ${progress > 0 ? 'animate-pulse' : ''}`} />
              </div>
              {progress > 50 && (
                <div className="absolute -top-2 -right-2">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center animate-bounce">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                </div>
              )}
            </div>
            <p className="text-sm text-gray-600">Processing documents: Harvard_Transcript.pdf, Student_ID.jpg, Diploma.pdf</p>
          </div>

          {/* Step Progress */}
          <div className="space-y-4">
            {steps.map((step, index) => {
              const isCompleted = currentStep > index;
              const isActive = currentStep === index;
              const IconComponent = step.icon;

              return (
                <div key={step.id} className={`flex items-center space-x-4 p-4 rounded-lg transition-all ${
                  isCompleted ? 'bg-green-50 border border-green-200' :
                  isActive ? 'bg-blue-50 border border-blue-200' :
                  'bg-gray-50 border border-gray-200'
                }`}>
                  <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                    isCompleted ? 'bg-green-500' :
                    isActive ? 'bg-blue-500' :
                    'bg-gray-300'
                  }`}>
                    {isCompleted ? (
                      <CheckCircle className="h-5 w-5 text-white" />
                    ) : (
                      <IconComponent className={`h-5 w-5 ${
                        isActive ? 'text-white animate-pulse' : 'text-gray-600'
                      }`} />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-medium ${
                      isCompleted ? 'text-green-800' :
                      isActive ? 'text-blue-800' :
                      'text-gray-600'
                    }`}>
                      {step.label}
                    </h3>
                    <p className={`text-sm ${
                      isCompleted ? 'text-green-600' :
                      isActive ? 'text-blue-600' :
                      'text-gray-500'
                    }`}>
                      {isActive ? step.detail : isCompleted ? 'Completed' : 'Pending'}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Processing Stats */}
          <div className="mt-8 grid grid-cols-3 gap-4 text-center">
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-2xl font-bold text-blue-600">3</p>
              <p className="text-sm text-gray-600">Documents</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-2xl font-bold text-green-600">12</p>
              <p className="text-sm text-gray-600">Fields Found</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-2xl font-bold text-purple-600">94%</p>
              <p className="text-sm text-gray-600">Confidence</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DocumentAnalysis;
