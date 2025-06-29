
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import SignInHeader from '@/components/signin/SignInHeader';
import SignInForm from '@/components/signin/SignInForm';
import PhoneVerification from '@/components/signin/PhoneVerification';
import TestingSection from '@/components/signin/TestingSection';

const SignIn = () => {
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState('');

  const handlePhoneSignIn = (phoneNumber: string) => {
    setPhone(phoneNumber);
    setStep(2);
  };

  const handleBackToSignIn = () => {
    setStep(1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50">
      <SignInHeader />

      <main className="container mx-auto px-6 py-8">
        <div className="max-w-md mx-auto">
          <Card className="shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-kagzat-black">
                {step === 1 ? 'Welcome Back' : 'Verify Your Phone'}
              </CardTitle>
              {step === 1 && (
                <p className="text-gray-600 text-sm mt-2">
                  Sign in to access your Kagzat account
                </p>
              )}
            </CardHeader>
            <CardContent className="space-y-6">
              {step === 1 && (
                <div className="space-y-4">
                  <SignInForm onPhoneSignIn={handlePhoneSignIn} />
                  <TestingSection />
                </div>
              )}

              {step === 2 && (
                <PhoneVerification
                  phone={phone}
                  onBack={handleBackToSignIn}
                />
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default SignIn;
