
import { useState } from 'react';
import { Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { useNavigate } from 'react-router-dom';

interface PhoneVerificationProps {
  phone: string;
  onBack: () => void;
}

const PhoneVerification = ({ phone, onBack }: PhoneVerificationProps) => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');
  const [codeSent, setCodeSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendCode = async () => {
    if (!phone) return;
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setCodeSent(true);
    setIsLoading(false);
    // Auto-fill OTP after 3 seconds for demo
    setTimeout(() => setOtp('123456'), 3000);
  };

  const handleVerifyPhone = async () => {
    if (otp.length !== 6) return;
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    navigate('/role-selection');
  };

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <Phone className="h-12 w-12 mx-auto mb-3 text-kagzat-green" />
        <h3 className="text-lg font-semibold">Verify Your Phone Number</h3>
        <p className="text-gray-600 text-sm">We'll send you a verification code</p>
      </div>

      {!codeSent ? (
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">
              We'll send a verification code to: <br />
              <span className="font-medium">+91 {phone}</span>
            </p>
          </div>
          <Button
            onClick={handleSendCode}
            disabled={isLoading}
            className="w-full bg-kagzat-green hover:bg-green-600 text-white"
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : (
              'Send Code'
            )}
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-4">
              Enter the 6-digit code sent to +91 {phone}
            </p>
            <InputOTP
              maxLength={6}
              value={otp}
              onChange={(value) => setOtp(value)}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>
          <Button
            onClick={handleVerifyPhone}
            disabled={isLoading || otp.length !== 6}
            className="w-full bg-kagzat-green hover:bg-green-600 text-white"
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : (
              'Verify & Sign In'
            )}
          </Button>
          <Button
            onClick={() => setCodeSent(false)}
            variant="ghost"
            className="w-full text-gray-600"
          >
            Resend Code
          </Button>
        </div>
      )}

      <Button
        onClick={onBack}
        variant="ghost"
        className="w-full text-gray-600"
      >
        ← Back to Sign In Options
      </Button>
    </div>
  );
};

export default PhoneVerification;
