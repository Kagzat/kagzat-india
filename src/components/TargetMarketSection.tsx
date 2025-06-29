
import { GraduationCap, Building, Users } from 'lucide-react';

const TargetMarketSection = () => {
  const markets = [
    {
      icon: GraduationCap,
      title: "Students",
      description: "Academic credentials, transcripts, and certificates verified instantly",
      stats: "2M+ students served"
    },
    {
      icon: Building,
      title: "Institutions",
      description: "Universities, employers, and government agencies streamlining verification",
      stats: "500+ institutions"
    },
    {
      icon: Users,
      title: "Professionals",
      description: "Career credentials, licenses, and work documents authenticated securely",
      stats: "50K+ professionals"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-kagzat-yellow/10 to-kagzat-green/10">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-kagzat-black mb-4">
            Built for India's Digital Future
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Serving students, professionals, and institutions across emerging markets with cutting-edge document validation technology
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {markets.map((market, index) => (
            <div 
              key={market.title}
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="w-16 h-16 bg-kagzat-green/10 rounded-full flex items-center justify-center mb-6">
                <market.icon className="h-8 w-8 text-kagzat-green" />
              </div>
              
              <h3 className="text-2xl font-bold text-kagzat-black mb-4">
                {market.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed mb-4">
                {market.description}
              </p>
              
              <div className="text-kagzat-green font-semibold">
                {market.stats}
              </div>
            </div>
          ))}
        </div>

        {/* Use Cases */}
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-xl">
          <h3 className="text-3xl font-bold text-center text-kagzat-black mb-8">
            Real-World Impact
          </h3>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="border-l-4 border-kagzat-green pl-6">
                <h4 className="font-bold text-lg text-kagzat-black mb-2">Job Applications</h4>
                <p className="text-gray-600">Graduates share verified degrees instantly with employers, reducing hiring time from weeks to days</p>
              </div>
              
              <div className="border-l-4 border-kagzat-yellow pl-6">
                <h4 className="font-bold text-lg text-kagzat-black mb-2">University Admissions</h4>
                <p className="text-gray-600">Students apply to multiple universities with one-click credential sharing, eliminating redundant paperwork</p>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="border-l-4 border-kagzat-green pl-6">
                <h4 className="font-bold text-lg text-kagzat-black mb-2">Professional Licensing</h4>
                <p className="text-gray-600">Doctors, lawyers, and engineers validate credentials across state boundaries seamlessly</p>
              </div>
              
              <div className="border-l-4 border-kagzat-yellow pl-6">
                <h4 className="font-bold text-lg text-kagzat-black mb-2">Government Services</h4>
                <p className="text-gray-600">Citizens access benefits and services with pre-verified documents, reducing bureaucratic delays</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TargetMarketSection;
