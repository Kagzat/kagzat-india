
import { GraduationCap, Building, Users } from 'lucide-react';

const AboutSection = () => {
  const markets = [
    {
      icon: GraduationCap,
      title: "Students",
      description: "Academic credentials verified instantly",
      stats: "2M+ served"
    },
    {
      icon: Building,
      title: "Institutions", 
      description: "Universities and employers streamlining verification",
      stats: "500+ partners"
    },
    {
      icon: Users,
      title: "Professionals",
      description: "Career credentials authenticated securely",
      stats: "50K+ users"
    }
  ];

  return (
    <section id="about" className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">About Kagzat</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            India's first blockchain-powered document validation platform that eliminates document fraud 
            and creates a trusted ecosystem for verification.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Our Mission</h3>
            <p className="text-gray-600 mb-6">
              To create a fraud-free India where every document can be instantly verified, 
              saving time, money, and preventing disputes in property transactions, 
              employment verification, and loan applications.
            </p>
            
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Why Kagzat?</h3>
            <ul className="text-gray-600 space-y-2">
              <li>• <strong>Blockchain Security:</strong> Immutable document records</li>
              <li>• <strong>Instant Verification:</strong> Results in minutes, not days</li>
              <li>• <strong>Trusted Network:</strong> Verified validators and authorities</li>
              <li>• <strong>Cost Effective:</strong> 90% cheaper than traditional methods</li>
            </ul>
          </div>
          
          <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-8 rounded-lg">
            <div className="text-center">
              <div className="text-4xl font-bold text-kagzat-green mb-2">1M+</div>
              <div className="text-gray-600 mb-4">Documents Verified</div>
              
              <div className="text-4xl font-bold text-kagzat-green mb-2">50K+</div>
              <div className="text-gray-600 mb-4">Happy Users</div>
              
              <div className="text-4xl font-bold text-kagzat-green mb-2">99.9%</div>
              <div className="text-gray-600">Accuracy Rate</div>
            </div>
          </div>
        </div>

        {/* Who We Serve */}
        <div>
          <h3 className="text-3xl font-bold text-center text-kagzat-black mb-8">
            Built for India's Digital Future
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {markets.map((market, index) => (
              <div 
                key={market.title}
                className="bg-gradient-to-br from-kagzat-yellow/10 to-kagzat-green/10 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 bg-kagzat-green/10 rounded-full flex items-center justify-center mb-4">
                  <market.icon className="h-6 w-6 text-kagzat-green" />
                </div>
                <h4 className="text-lg font-bold text-kagzat-black mb-2">{market.title}</h4>
                <p className="text-gray-600 text-sm mb-3">{market.description}</p>
                <div className="text-kagzat-green font-semibold text-sm">{market.stats}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
