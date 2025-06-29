
import { Upload, Shield, Clock } from 'lucide-react';

const ProblemSection = () => {
  const problems = [
    {
      icon: Upload,
      title: "Manual Uploads",
      description: "Repetitive form filling wastes hours of valuable time for students and professionals"
    },
    {
      icon: Shield,
      title: "Security Risks",
      description: "Insecure file sharing threatens privacy and exposes sensitive document data"
    },
    {
      icon: Clock,
      title: "Verification Delays",
      description: "Manual processes take weeks, creating bottlenecks in critical workflows"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-kagzat-black mb-4">
            The Document Dilemma
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Traditional document workflows are broken, creating friction and security risks for millions of users
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {problems.map((problem, index) => (
            <div 
              key={problem.title}
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
                <problem.icon className="h-8 w-8 text-red-500" />
              </div>
              
              <h3 className="text-2xl font-bold text-kagzat-black mb-4">
                {problem.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed">
                {problem.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
