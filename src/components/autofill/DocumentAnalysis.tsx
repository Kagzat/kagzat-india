
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, User, FileText, Database, Zap } from 'lucide-react';

interface DocumentAnalysisProps {
  onComplete: () => void;
}

const DocumentAnalysis = ({ onComplete }: DocumentAnalysisProps) => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { icon: User, text: "Loading your profile data", delay: 1000 },
    { icon: Database, text: "Matching with form requirements", delay: 1500 },
    { icon: FileText, text: "Linking stored documents", delay: 1200 },
    { icon: Zap, text: "Preparing auto-population", delay: 800 }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentStep < steps.length) {
        setCurrentStep(prev => prev + 1);
        setProgress(prev => prev + 25);
      } else {
        setTimeout(onComplete, 500);
      }
    }, steps[currentStep]?.delay || 1000);

    return () => clearTimeout(timer);
  }, [currentStep, onComplete]);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Preparing Your Form</h2>
        <p className="text-gray-600">Using your profile information to auto-populate the form</p>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-xl text-gray-900">Auto-Population in Progress</CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-3" />
          </div>

          <div className="space-y-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isCompleted = index < currentStep;
              const isActive = index === currentStep;
              
              return (
                <div key={index} className="flex items-center space-x-4">
                  <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                    isCompleted 
                      ? 'bg-green-100 text-green-600' 
                      : isActive 
                        ? 'bg-blue-100 text-blue-600 animate-pulse'
                        : 'bg-gray-100 text-gray-400'
                  }`}>
                    {isCompleted ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : (
                      <Icon className="h-5 w-5" />
                    )}
                  </div>
                  <div className={`flex-1 ${
                    isCompleted ? 'text-green-700' : isActive ? 'text-blue-700' : 'text-gray-500'
                  }`}>
                    <p className="font-medium">{step.text}</p>
                    {isActive && (
                      <div className="flex space-x-1 mt-1">
                        <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border border-blue-200">
            <div className="flex items-start space-x-3">
              <div className="bg-blue-100 p-2 rounded-full">
                <Database className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h4 className="font-semibold text-blue-900">Smart Auto-Population</h4>
                <p className="text-sm text-blue-700 mt-1">
                  We're using the information from your Kagzat profile to automatically fill out 
                  this form. No AI guesswork - just your verified profile data.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DocumentAnalysis;
