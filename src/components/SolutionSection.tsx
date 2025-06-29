
import { Key, UserCheck, Zap } from 'lucide-react';

const SolutionSection = () => {
  const solutions = [
    {
      icon: Key,
      title: "Digital Keys",
      description: "Link files to unique cryptographic identifiers, ensuring authenticity and preventing tampering"
    },
    {
      icon: UserCheck,
      title: "Controlled Access",
      description: "Share only what's needed, when needed, with granular permissions and time-bound access"
    },
    {
      icon: Zap,
      title: "Instant Verification",
      description: "Validators confirm authenticity in minutes, not weeks, using blockchain-powered protocols"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-kagzat-black mb-4">
            The Kagzat Protocol
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Revolutionary document validation technology that transforms how we share, verify, and trust digital documents
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {solutions.map((solution, index) => (
            <div 
              key={solution.title}
              className="bg-gradient-to-br from-green-50 to-yellow-50 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-green-100"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="w-16 h-16 bg-kagzat-green rounded-full flex items-center justify-center mb-6">
                <solution.icon className="h-8 w-8 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold text-kagzat-black mb-4">
                {solution.title}
              </h3>
              
              <p className="text-gray-700 leading-relaxed">
                {solution.description}
              </p>
            </div>
          ))}
        </div>

        {/* Process Flow */}
        <div className="mt-20">
          <h3 className="text-3xl font-bold text-center text-kagzat-black mb-12">
            How It Works
          </h3>
          
          <div className="flex flex-col md:flex-row items-center justify-between max-w-4xl mx-auto">
            <div className="flex flex-col items-center text-center mb-8 md:mb-0">
              <div className="w-12 h-12 bg-kagzat-yellow rounded-full flex items-center justify-center text-black font-bold text-xl mb-4">
                1
              </div>
              <h4 className="font-semibold text-lg text-kagzat-black mb-2">Upload</h4>
              <p className="text-gray-600 max-w-xs">Securely upload your document to the Kagzat protocol</p>
            </div>
            
            <div className="hidden md:block w-16 h-1 bg-kagzat-green"></div>
            
            <div className="flex flex-col items-center text-center mb-8 md:mb-0">
              <div className="w-12 h-12 bg-kagzat-yellow rounded-full flex items-center justify-center text-black font-bold text-xl mb-4">
                2
              </div>
              <h4 className="font-semibold text-lg text-kagzat-black mb-2">Encrypt</h4>
              <p className="text-gray-600 max-w-xs">Generate unique digital keys and cryptographic signatures</p>
            </div>
            
            <div className="hidden md:block w-16 h-1 bg-kagzat-green"></div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-kagzat-yellow rounded-full flex items-center justify-center text-black font-bold text-xl mb-4">
                3
              </div>
              <h4 className="font-semibold text-lg text-kagzat-black mb-2">Verify</h4>
              <p className="text-gray-600 max-w-xs">Instant validation and controlled sharing with stakeholders</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
