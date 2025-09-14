
const HowItWorksSection = () => {
  const steps = [
    {
      step: "1",
      title: "Organize your documents",
      description: "NO upload required. Your documents and data stay on your storage. Link your document URLs from your Google Drive, One Drive etc.",
      icon: "📁",
      example: "Link your passport URL to \"Passport\". Link your Driving License URL to \"Driving License\""
    },
    {
      step: "2", 
      title: "Validate your documents",
      description: "Find a validator (University, Institution) and get your document validated securely.",
      icon: "✅"
    },
    {
      step: "3",
      title: "Fill forms in one click",
      description: "Fill forms, with attached required validated documents, in one click.",
      icon: "⚡"
    }
  ];

  return (
    <section id="how-it-works" className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">How Kagzat Works</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Simple 3-step process to make your documents verifiable and fraud-proof
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="text-3xl mb-3">{step.icon}</div>
                <div className="bg-kagzat-yellow text-black font-bold text-lg rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-3">
                  {step.step}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.description}</p>
                {step.example && (
                  <p className="text-kagzat-green text-sm mt-2 italic">
                    Example: {step.example}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">For Verifiers</h3>
            <p className="text-gray-600 mb-4 text-sm">
              Need to verify someone else's document? Simply use their Google Drive link 
              and username to get instant verification results.
            </p>
            <a 
              href="/document-verification" 
              className="inline-block bg-kagzat-green text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors"
            >
              Try Document Verification
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
