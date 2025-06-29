
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import WhyKagzatSection from '@/components/WhyKagzatSection';
import AboutSection from '@/components/AboutSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import PricingSection from '@/components/PricingSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <WhyKagzatSection />
      <AboutSection />
      <HowItWorksSection />
      <PricingSection />
      <Footer />
    </div>
  );
};

export default Index;
