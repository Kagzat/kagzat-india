
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, Loader, CreditCard, Shield, Send } from 'lucide-react';

interface PaymentProcessingProps {
  onComplete: () => void;
}

const PaymentProcessing = ({ onComplete }: PaymentProcessingProps) => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { icon: Shield, text: "Verifying payment details", delay: 1500 },
    { icon: CreditCard, text: "Contacting payment gateway", delay: 2000 },
    { icon: CheckCircle, text: "Confirming transaction", delay: 1800 },
    { icon: Send, text: "Sending to validator", delay: 1200 }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentStep < steps.length) {
        setCurrentStep(prev => prev + 1);
        setProgress(prev => prev + 25);
      } else {
        setTimeout(onComplete, 500);
      }
    }, steps[currentStep]?.delay || 1500);

    return () => clearTimeout(timer);
  }, [currentStep, onComplete]);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Processing Payment</h2>
        <p className="text-gray-600">Please wait while we process your payment securely</p>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-xl text-gray-900 flex items-center justify-center space-x-2">
            <Loader className="h-6 w-6 animate-spin text-blue-600" />
            <span>Processing your payment...</span>
          </CardTitle>
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

          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg border border-green-200">
            <div className="flex items-start space-x-3">
              <div className="bg-green-100 p-2 rounded-full">
                <Shield className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h4 className="font-semibold text-green-900">Secure Payment Processing</h4>
                <p className="text-sm text-green-700 mt-1">
                  Your payment is being processed through encrypted channels. 
                  Please do not close this window or press the back button.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentProcessing;
