
import { FileCheck, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="pt-24 pb-16 bg-gradient-to-br from-white via-gray-50 to-green-50">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Content */}
          <div className="flex-1 text-center lg:text-left animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold text-kagzat-black mb-6 leading-tight">
              1000% more efficient document and data exchange protocol.
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-4 max-w-2xl">
              A document/data validation and exchange platform that eliminates fraud and creates exponential efficiencies.
            </p>
            
            <p className="text-lg md:text-xl text-kagzat-green font-semibold mb-8">
              Made in India. Built for the world.
            </p>

            <div className="flex justify-center lg:justify-start">
              <Link to="/waitlist">
                <Button 
                  className="bg-kagzat-yellow hover:bg-yellow-500 text-kagzat-black font-semibold px-8 py-4 rounded-lg text-lg transition-all duration-200 hover:scale-105 flex items-center gap-2"
                >
                  Join Waitlist
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-8 mt-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-kagzat-green">50,000+</div>
                <div className="text-gray-600">Documents Validated</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-kagzat-green">99.9%</div>
                <div className="text-gray-600">Accuracy Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-kagzat-green">2min</div>
                <div className="text-gray-600">Average Processing</div>
              </div>
            </div>
          </div>

          {/* Visual */}
          <div className="flex-1 flex justify-center animate-slide-in-left">
            <div className="relative">
              <div className="w-80 h-80 bg-gradient-to-br from-kagzat-yellow/20 to-kagzat-green/20 rounded-full flex items-center justify-center">
                <div className="w-64 h-64 bg-white rounded-full shadow-2xl flex items-center justify-center">
                  <FileCheck className="h-32 w-32 text-kagzat-green" />
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-kagzat-yellow rounded-full animate-bounce"></div>
              <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-kagzat-green rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
