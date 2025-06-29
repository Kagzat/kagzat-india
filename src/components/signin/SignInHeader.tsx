
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const SignInHeader = () => {
  return (
    <>
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-kagzat-black">
              Kagzat
            </Link>
            <div className="text-sm text-gray-600">
              Sign In
            </div>
          </div>
        </div>
      </header>

      <div className="flex items-center justify-between mb-8">
        <Link to="/">
          <Button variant="ghost" className="text-gray-600 hover:text-kagzat-black">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </Link>
      </div>
    </>
  );
};

export default SignInHeader;
