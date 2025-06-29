
const HowItWorksSection = () => {
  const steps = [
    {
      step: "1",
      title: "Upload Document",
      description: "Upload your document to Google Drive and submit for validation through Kagzat",
      icon: "📄"
    },
    {
      step: "2", 
      title: "Expert Validation",
      description: "Verified experts and authorities validate your document authenticity",
      icon: "✅"
    },
    {
      step: "3",
      title: "Blockchain Storage",
      description: "Document hash and validation proof stored securely on blockchain",
      icon: "🔗"
    },
    {
      step: "4",
      title: "Instant Verification",
      description: "Anyone can verify your document instantly using the verification link",
      icon: "⚡"
    }
  ];

  return (
    <section id="how-it-works" className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">How Kagzat Works</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Simple 4-step process to make your documents verifiable and fraud-proof
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="text-3xl mb-3">{step.icon}</div>
                <div className="bg-kagzat-yellow text-black font-bold text-lg rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-3">
                  {step.step}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.description}</p>
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
