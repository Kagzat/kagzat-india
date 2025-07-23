import { useState } from "react";
import { Phone, Mail, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";

import { useAuthStore } from "../../store/authStore";
import { validateEmailAndPassword } from "@/lib/validate";
import { toast } from "../../hooks/use-toast";

interface SignInFormProps {
  onPhoneSignIn: (phone: string) => void;
}

const SignInForm = ({ onPhoneSignIn }: SignInFormProps) => {
  const navigate = useNavigate();
  const [signInMethod, setSignInMethod] = useState<"email" | "phone">("email");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const { loading, error, loginWithEmail, loginWithGoogle } = useAuthStore();

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    const result = await loginWithGoogle();
    setIsLoading(false);
    if (result?.success) {
      toast({
        title: "Success!",
        description: "Login successful",
      });
      navigate("/role-selection");
    } else {
      toast({
        title: "Error!",
        description: result?.error || "Google sign-in failed",
      });
    }
  };

  const handleEmailSignIn = async () => {
    const { isValid, isEmailValid, isPasswordValid } = validateEmailAndPassword(
      email,
      password
    );
    if (!isEmailValid) {
      toast({
        title: "Error in Email",
        description: "Please enter a valid email address",
      });
      return;
    } else if (!isPasswordValid) {
      toast({
        title: "Error in password",
        description:
          "The password must contain: min 8 characters, atleast one upper and lower case letters, atleast one digit and atleast one special character",
      });
      return;
    }

    setIsLoading(true);
    const result = await loginWithEmail(email, password);
    setIsLoading(false);
    if (result?.success) {
      toast({
        title: "Welcome back!",
        description: "Login successful",
      });
      navigate("/role-selection");
    } else {
      toast({
        title: "Error!",
        description: result?.error || "Email sign-in failed",
      });
    }
  };

  return (
    <div className="space-y-4">
      {/* Google Sign In */}
      <Button
        onClick={handleGoogleSignIn}
        disabled={isLoading}
        className="w-full bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 h-12"
      >
        {isLoading ? (
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-kagzat-green"></div>
        ) : (
          <>
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
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

      {/* Sign In Method Tabs */}
      <div className="flex bg-gray-100 rounded-lg p-1">
        <button
          onClick={() => setSignInMethod("email")}
          className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-md transition-colors ${
            signInMethod === "email"
              ? "bg-white text-kagzat-black shadow-sm"
              : "text-gray-600"
          }`}
        >
          <Mail className="h-4 w-4" />
          Email
        </button>
        <button
          onClick={() => setSignInMethod("phone")}
          className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-md transition-colors ${
            signInMethod === "phone"
              ? "bg-white text-kagzat-black shadow-sm"
              : "text-gray-600"
          }`}
        >
          <Phone className="h-4 w-4" />
          Phone
        </button>
      </div>

      {/* Email Sign In */}
      {signInMethod === "email" && (
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
                placeholder="Enter your password"
                className="mt-1 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>
          <Button
            onClick={handleEmailSignIn}
            disabled={isLoading || !email || !password}
            className="w-full bg-kagzat-green hover:bg-green-600 text-white"
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : (
              "Sign In"
            )}
          </Button>
        </div>
      )}

      {/* Phone Sign In */}
      {signInMethod === "phone" && (
        <div className="space-y-4">
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
          <Button
            onClick={() => onPhoneSignIn(phone)}
            disabled={!phone}
            className="w-full bg-kagzat-green hover:bg-green-600 text-white"
          >
            Continue with Phone
          </Button>
        </div>
      )}

      {/* Sign Up Link */}
      <div className="text-center pt-4 border-t border-gray-200">
        <p className="text-sm text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/role-selection"
            className="text-kagzat-green hover:underline font-medium"
          >
            Sign up now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignInForm;
