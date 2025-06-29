
import { Upload, Shield, Clock, Key, UserCheck, Zap } from 'lucide-react';

const WhyKagzatSection = () => {
  const problems = [
    {
      icon: Upload,
      title: "Manual Uploads",
      description: "Repetitive form filling wastes hours of valuable time",
      color: "from-red-50 to-red-100"
    },
    {
      icon: Shield,
      title: "Security Risks", 
      description: "Insecure file sharing threatens privacy and data",
      color: "from-red-50 to-red-100"
    },
    {
      icon: Clock,
      title: "Verification Delays",
      description: "Manual processes take weeks, creating bottlenecks",
      color: "from-red-50 to-red-100"
    }
  ];

  const solutions = [
    {
      icon: Key,
      title: "Digital Keys",
      description: "Cryptographic identifiers ensure authenticity and prevent tampering",
      color: "from-green-50 to-yellow-50"
    },
    {
      icon: UserCheck,
      title: "Controlled Access",
      description: "Share only what's needed with granular permissions",
      color: "from-green-50 to-yellow-50"
    },
    {
      icon: Zap,
      title: "Instant Verification",
      description: "Blockchain-powered validation in minutes, not weeks",
      color: "from-green-50 to-yellow-50"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-kagzat-black mb-4">
            Why Choose Kagzat?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Traditional document workflows are broken. We've built the solution that transforms how documents are shared, verified, and trusted.
          </p>
        </div>

        {/* Problems */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">The Problems We Solve</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {problems.map((problem, index) => (
              <div 
                key={problem.title}
                className={`bg-gradient-to-br ${problem.color} rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300`}
              >
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                  <problem.icon className="h-6 w-6 text-red-500" />
                </div>
                <h4 className="text-lg font-bold text-kagzat-black mb-2">{problem.title}</h4>
                <p className="text-gray-600 text-sm">{problem.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Solutions */}
        <div>
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">The Kagzat Solution</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {solutions.map((solution, index) => (
              <div 
                key={solution.title}
                className={`bg-gradient-to-br ${solution.color} rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-green-100`}
              >
                <div className="w-12 h-12 bg-kagzat-green rounded-full flex items-center justify-center mb-4">
                  <solution.icon className="h-6 w-6 text-white" />
                </div>
                <h4 className="text-lg font-bold text-kagzat-black mb-2">{solution.title}</h4>
                <p className="text-gray-600 text-sm">{solution.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyKagzatSection;
