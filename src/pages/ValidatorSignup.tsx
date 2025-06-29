import { useState } from 'react';
import { ArrowLeft, Phone, Mail, Eye, EyeOff, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Checkbox } from '@/components/ui/checkbox';
import { Link, useNavigate } from 'react-router-dom';

const ValidatorSignup = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Account, 2: Professional Info, 3: Phone, 4: Complete
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [codeSent, setCodeSent] = useState(false);
  const [professionalTitle, setProfessionalTitle] = useState('');
  const [licenseNumber, setLicenseNumber] = useState('');
  const [experience, setExperience] = useState(5);
  const [specializations, setSpecializations] = useState<string[]>([]);

  const handleGoogleSignup = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
    setStep(2);
  };

  const handleEmailSignup = async () => {
    if (!email || !password) return;
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    setStep(2);
  };

  const handleProfessionalInfo = () => {
    if (!professionalTitle || !licenseNumber) return;
    setStep(3);
  };

  const handleSendCode = async () => {
    if (!phone) return;
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setCodeSent(true);
    setIsLoading(false);
    setTimeout(() => setOtp('123456'), 3000);
  };

  const handleVerifyPhone = async () => {
    if (otp.length !== 6) return;
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    setStep(4);
  };

  const handleSpecializationChange = (spec: string, checked: boolean) => {
    if (checked) {
      setSpecializations([...specializations, spec]);
    } else {
      setSpecializations(specializations.filter(s => s !== spec));
    }
  };

  const specializationOptions = ['Legal', 'Educational', 'Financial', 'Medical', 'Government', 'Technical'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-kagzat-black">
              Kagzat
            </Link>
            <div className="text-sm text-gray-600">
              Step {step + 1} of 5
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <div className="max-w-md mx-auto">
          {/* Back Button & Role Badge */}
          <div className="flex items-center justify-between mb-8">
            <Link to="/role-selection">
              <Button variant="ghost" className="text-gray-600 hover:text-kagzat-black">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </Link>
            <Badge className="bg-kagzat-green text-white">Professional Validator</Badge>
          </div>

          <Card className="shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-kagzat-black">
                {step === 1 ? 'Create Your Account' : 
                 step === 2 ? 'Professional Information' :
                 step === 3 ? 'Verify Your Phone' : 'Welcome to Kagzat!'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {step === 1 && (
                <div className="space-y-4">
                  <Button
                    onClick={handleGoogleSignup}
                    disabled={isLoading}
                    className="w-full bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 h-12"
                  >
                    {isLoading ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-kagzat-green"></div>
                    ) : (
                      <>
                        <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                        </svg>
                        Sign up with Google
                      </>
                    )}
                  </Button>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-white px-2 text-gray-500">Or</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="password">Password</Label>
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Create a password"
                          className="mt-1 pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>
                    <Button
                      onClick={handleEmailSignup}
                      disabled={isLoading || !email || !password}
                      className="w-full bg-kagzat-green hover:bg-green-600 text-white"
                    >
                      {isLoading ? (
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      ) : (
                        'Create Account'
                      )}
                    </Button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title">Professional Title</Label>
                    <select
                      id="title"
                      value={professionalTitle}
                      onChange={(e) => setProfessionalTitle(e.target.value)}
                      className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
                    >
                      <option value="">Select your profession</option>
                      <option value="notary">Notary Public</option>
                      <option value="lawyer">Lawyer</option>
                      <option value="accountant">Certified Accountant</option>
                      <option value="doctor">Medical Doctor</option>
                      <option value="engineer">Professional Engineer</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="license">License/Registration Number</Label>
                    <Input
                      id="license"
                      value={licenseNumber}
                      onChange={(e) => setLicenseNumber(e.target.value)}
                      placeholder="Enter your license number"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="experience">Years of Experience: {experience}</Label>
                    <input
                      id="experience"
                      type="range"
                      min="0"
                      max="50"
                      value={experience}
                      onChange={(e) => setExperience(Number(e.target.value))}
                      className="w-full mt-2"
                    />
                  </div>

                  <div>
                    <Label>Specialization Areas</Label>
                    <div className="grid grid-cols-2 gap-3 mt-2">
                      {specializationOptions.map((spec) => (
                        <div key={spec} className="flex items-center space-x-2">
                          <Checkbox
                            id={spec}
                            checked={specializations.includes(spec)}
                            onCheckedChange={(checked) => 
                              handleSpecializationChange(spec, checked as boolean)
                            }
                          />
                          <Label htmlFor={spec} className="text-sm">{spec}</Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button
                    onClick={handleProfessionalInfo}
                    disabled={!professionalTitle || !licenseNumber}
                    className="w-full bg-kagzat-green hover:bg-green-600 text-white"
                  >
                    Continue
                  </Button>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4">
                  <div className="text-center mb-6">
                    <Phone className="h-12 w-12 mx-auto mb-3 text-kagzat-green" />
                    <h3 className="text-lg font-semibold">Verify Your Phone Number</h3>
                    <p className="text-gray-600 text-sm">We'll send you a verification code</p>
                  </div>

                  <div className="flex gap-2">
                    <select className="px-3 py-2 border border-gray-300 rounded-md w-20">
                      <option value="+91">+91</option>
                      <option value="+1">+1</option>
                      <option value="+44">+44</option>
                    </select>
                    <Input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Enter phone number"
                      className="flex-1"
                    />
                  </div>

                  {!codeSent ? (
                    <Button
                      onClick={handleSendCode}
                      disabled={isLoading || !phone}
                      className="w-full bg-kagzat-green hover:bg-green-600 text-white"
                    >
                      {isLoading ? (
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      ) : (
                        'Send Code'
                      )}
                    </Button>
                  ) : (
                    <div className="space-y-4">
                      <div className="text-center">
                        <p className="text-sm text-gray-600 mb-4">
                          Enter the 6-digit code sent to +91 {phone}
                        </p>
                        <InputOTP maxLength={6} value={otp} onChange={(value) => setOtp(value)}>
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
                          'Verify Phone'
                        )}
                      </Button>
                    </div>
                  )}
                </div>
              )}

              {step === 4 && (
                <div className="text-center space-y-4">
                  <div className="animate-scale-in">
                    <div className="h-16 w-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                      <Check className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-green-600">Account Created Successfully!</h3>
                    <p className="text-gray-600">Let's complete your professional profile</p>
                  </div>
                  <Button
                    onClick={() => navigate('/onboarding/validator')}
                    className="w-full bg-kagzat-yellow hover:bg-yellow-500 text-kagzat-black font-semibold"
                  >
                    Complete Profile Setup
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default ValidatorSignup;
