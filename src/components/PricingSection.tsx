
const PricingSection = () => {
  const plans = [
    {
      name: "Individual",
      price: "₹75",
      period: "per document",
      description: "Perfect for personal document verification",
      features: [
        "Document validation",
        "Blockchain storage",
        "Verification certificate",
        "Basic support",
        "Mobile access"
      ],
      popular: false
    },
    {
      name: "Business",
      price: "₹50",
      period: "per document",
      description: "For businesses with regular verification needs",
      features: [
        "Everything in Individual",
        "Bulk verification",
        "Priority support",
        "API integration",
        "Custom branding",
        "Analytics dashboard"
      ],
      popular: true,
      note: "Minimum 50 documents"
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "pricing",
      description: "For large organizations and institutions",
      features: [
        "Everything in Business",
        "Dedicated support",
        "Custom validation workflows",
        "White-label solution",
        "SLA guarantee",
        "Advanced security"
      ],
      popular: false
    }
  ];

  return (
    <section id="pricing" className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Simple, Transparent Pricing</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the plan that works best for your document verification needs
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`relative bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-8 ${
                plan.popular ? 'border-2 border-kagzat-yellow' : 'border border-gray-200'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-kagzat-yellow text-black px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="text-center mb-6">
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">{plan.name}</h3>
                <div className="text-4xl font-bold text-kagzat-green mb-1">{plan.price}</div>
                <div className="text-gray-600 mb-3">{plan.period}</div>
                <p className="text-gray-600">{plan.description}</p>
                {plan.note && (
                  <p className="text-sm text-gray-500 mt-2">{plan.note}</p>
                )}
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <span className="text-kagzat-green mr-3">✓</span>
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>

              <button className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
                plan.popular 
                  ? 'bg-kagzat-yellow text-black hover:bg-yellow-500' 
                  : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
              }`}>
                {plan.name === 'Enterprise' ? 'Contact Sales' : 'Get Started'}
              </button>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="bg-gray-50 p-6 rounded-lg max-w-4xl mx-auto">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Additional Services</h3>
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Express Verification</h4>
                <p className="text-gray-600">Get verification results in 5 minutes for ₹150 per document</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Document Verification (Public)</h4>
                <p className="text-gray-600">Verify any document without an account for ₹75</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
