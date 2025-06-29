
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { FileCheck, CheckCircle, Users, Clock, Bell, ArrowLeft, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Link } from 'react-router-dom';

const formSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  role: z.enum(['user', 'validator', 'organization'], {
    required_error: 'Please select your role',
  }),
  agreeToTerms: z.boolean().refine(val => val === true, {
    message: 'You must agree to the terms and conditions',
  }),
  agreeToPrivacy: z.boolean().refine(val => val === true, {
    message: 'You must agree to the privacy policy',
  }),
});

type FormData = z.infer<typeof formSchema>;

const Waitlist = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState('');

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      role: undefined,
      agreeToTerms: false,
      agreeToPrivacy: false,
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    setSubmittedEmail(data.email);
    
    // Simulate API call with 2-second delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsLoading(false);
    setIsSubmitted(true);
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setSubmittedEmail('');
    form.reset();
  };

  const shareOnTwitter = () => {
    const text = "I just joined the waitlist for @kagzat_protocol - the future of document validation! 🚀";
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const shareOnLinkedIn = () => {
    const text = "Excited to be on the waitlist for Kagzat Protocol - transforming document workflows forever!";
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.origin)}`;
    window.open(url, '_blank');
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white to-gray-50">
        {/* Header */}
        <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm">
          <div className="container mx-auto px-6 py-4">
            <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-kagzat-black hover:opacity-80 transition-opacity">
              <FileCheck className="h-8 w-8 text-kagzat-yellow" />
              Kagzat
            </Link>
          </div>
        </header>

        {/* Success Content */}
        <main className="container mx-auto px-6 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <div className="animate-scale-in mb-8">
              <CheckCircle className="h-24 w-24 text-kagzat-green mx-auto mb-6" />
              <h1 className="text-4xl md:text-5xl font-bold text-kagzat-black mb-4">
                Welcome to the Future!
              </h1>
              <p className="text-xl text-gray-600 mb-2">
                Thank you for joining the Kagzat waitlist
              </p>
              <p className="text-lg text-gray-500">
                Check your email at <span className="font-semibold text-kagzat-black">{submittedEmail}</span> for confirmation
              </p>
            </div>

            {/* Social Sharing */}
            <div className="mb-12 animate-fade-in">
              <p className="text-gray-600 mb-4">Share the revolution with your network:</p>
              <div className="flex justify-center gap-4">
                <Button
                  onClick={shareOnTwitter}
                  variant="outline"
                  className="hover:bg-blue-50 hover:border-blue-300 transition-colors"
                >
                  Share on Twitter
                </Button>
                <Button
                  onClick={shareOnLinkedIn}
                  variant="outline"
                  className="hover:bg-blue-50 hover:border-blue-300 transition-colors"
                >
                  Share on LinkedIn
                </Button>
              </div>
            </div>

            {/* What's Next Timeline */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 animate-slide-in-left">
              <h2 className="text-2xl font-bold text-kagzat-black mb-6">What happens next?</h2>
              <div className="space-y-6 text-left">
                <div className="flex items-start gap-4">
                  <div className="bg-kagzat-yellow rounded-full p-2 mt-1">
                    <Bell className="h-4 w-4 text-kagzat-black" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-kagzat-black">Email Confirmation</h3>
                    <p className="text-gray-600">You'll receive a confirmation email within the next few minutes</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-kagzat-green rounded-full p-2 mt-1">
                    <Users className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-kagzat-black">Early Access</h3>
                    <p className="text-gray-600">Get exclusive access to Kagzat before the public launch</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-gray-300 rounded-full p-2 mt-1">
                    <Clock className="h-4 w-4 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-kagzat-black">Beta Testing</h3>
                    <p className="text-gray-600">Help us perfect the platform with your feedback</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/">
                <Button variant="outline" className="w-full sm:w-auto">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Homepage
                </Button>
              </Link>
              <Button onClick={resetForm} variant="outline" className="w-full sm:w-auto">
                Join Another Email
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-kagzat-black hover:opacity-80 transition-opacity">
              <FileCheck className="h-8 w-8 text-kagzat-yellow" />
              Kagzat
            </Link>
            <Link to="/" className="text-gray-600 hover:text-kagzat-black transition-colors">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-16">
        <div className="max-w-lg mx-auto">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold text-kagzat-black mb-4">
              Be Among the First
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              Get early access to Kagzat and transform your document workflows
            </p>
            <div className="bg-kagzat-yellow/10 rounded-lg p-4 inline-flex items-center gap-2">
              <Users className="h-5 w-5 text-kagzat-black" />
              <span className="font-semibold text-kagzat-black">Join 1,247 others on the waitlist</span>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8 animate-scale-in">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Email Field */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-kagzat-black font-semibold">Email Address</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="you@example.com"
                          {...field}
                          className="h-12 text-lg focus:ring-kagzat-yellow focus:border-kagzat-yellow"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Role Selection */}
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-kagzat-black font-semibold">I am a...</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          value={field.value}
                          className="space-y-3"
                        >
                          <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-gray-50 transition-colors">
                            <RadioGroupItem value="user" id="user" />
                            <Label htmlFor="user" className="flex-1 cursor-pointer">
                              <div>
                                <div className="font-medium">User</div>
                                <div className="text-sm text-gray-500">Individual looking to validate documents</div>
                              </div>
                            </Label>
                          </div>
                          <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-gray-50 transition-colors">
                            <RadioGroupItem value="validator" id="validator" />
                            <Label htmlFor="validator" className="flex-1 cursor-pointer">
                              <div>
                                <div className="font-medium">Validator</div>
                                <div className="text-sm text-gray-500">Professional who validates documents</div>
                              </div>
                            </Label>
                          </div>
                          <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-gray-50 transition-colors">
                            <RadioGroupItem value="organization" id="organization" />
                            <Label htmlFor="organization" className="flex-1 cursor-pointer">
                              <div>
                                <div className="font-medium">Organization</div>
                                <div className="text-sm text-gray-500">Institution or company</div>
                              </div>
                            </Label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Checkboxes */}
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="agreeToTerms"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-sm text-gray-700">
                            I agree to the{' '}
                            <a href="#" className="text-kagzat-green hover:underline">
                              Terms and Conditions
                            </a>
                          </FormLabel>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="agreeToPrivacy"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-sm text-gray-700">
                            I agree to the{' '}
                            <a href="#" className="text-kagzat-green hover:underline">
                              Privacy Policy
                            </a>
                          </FormLabel>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 text-lg bg-kagzat-yellow hover:bg-yellow-500 text-kagzat-black font-semibold transition-all duration-200 hover:scale-105 disabled:hover:scale-100"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                      Joining Waitlist...
                    </>
                  ) : (
                    'Join Waitlist'
                  )}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Waitlist;
