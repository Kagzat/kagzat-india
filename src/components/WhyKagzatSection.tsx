
import { FolderOpen, Clock, Shield } from 'lucide-react';

const WhyKagzatSection = () => {
  const benefits = [
    {
      icon: FolderOpen,
      title: "Organised documents remove document anxiety",
      description: "Save your document and data links in a universal document library. Document receivers and users use the same document structure.",
      color: "from-green-50 to-yellow-50"
    },
    {
      icon: Clock,
      title: "Simple validation saves time",
      description: "Find your validator, send them your document, receive validation.",
      color: "from-green-50 to-yellow-50"
    },
    {
      icon: Shield,
      title: "Secure exchange",
      description: "You DON'T upload any documents to kagzat.",
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
            Experience the future of document management with our secure and efficient platform.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <div 
              key={benefit.title}
              className={`bg-gradient-to-br ${benefit.color} rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-green-100`}
            >
              <div className="w-12 h-12 bg-kagzat-green rounded-full flex items-center justify-center mb-4">
                <benefit.icon className="h-6 w-6 text-white" />
              </div>
              <h4 className="text-lg font-bold text-kagzat-black mb-2">{benefit.title}</h4>
              <p className="text-gray-600 text-sm">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyKagzatSection;
