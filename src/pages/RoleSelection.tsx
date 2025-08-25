
import { useState } from 'react';
import { User, Badge, Building, ArrowRight, FileCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link, useNavigate } from 'react-router-dom';

interface RoleOption {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  features: string[];
  signupPath: string;
}

const roleOptions: RoleOption[] = [
  {
    id: 'user',
    title: 'Document Owner',
    description: 'I need my documents validated securely and efficiently',
    icon: User,
    features: [
      'Upload and manage personal documents',
      'Submit validation requests',
      'Track validation status',
      'Access validation certificates'
    ],
    signupPath: '/signup/user'
  },
  {
    id: 'organization',
    title: 'Institution',
    description: 'We validate documents as an educational institution, bank, or government body',
    icon: Building,
    features: [
      'Create validation forms',
      'Manage team of validators',
      'Bulk validation processing',
      'Enterprise analytics'
    ],
    signupPath: '/signup/organization'
  }
];

const RoleSelection = () => {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleRoleSelect = (roleId: string) => {
    setSelectedRole(roleId);
  };

  const handleContinue = () => {
    const selectedRoleOption = roleOptions.find(role => role.id === selectedRole);
    if (selectedRoleOption) {
      navigate(selectedRoleOption.signupPath);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-kagzat-black hover:opacity-80 transition-opacity">
              <FileCheck className="h-8 w-8 text-kagzat-yellow" />
              Kagzat
            </Link>
            <div className="text-sm text-gray-600">
              Step 1 of 3
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Title Section */}
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold text-kagzat-black mb-4">
              Getting Started
            </h1>
            <p className="text-xl text-gray-600">
              Choose your role to get a personalized Kagzat experience
            </p>
          </div>

          {/* Role Cards Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {roleOptions.map((role, index) => {
              const Icon = role.icon;
              const isSelected = selectedRole === role.id;
              
              return (
                <Card
                  key={role.id}
                  className={`cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
                    isSelected 
                      ? 'border-kagzat-green border-2 bg-kagzat-green/5' 
                      : 'border-gray-200 hover:border-kagzat-green/50'
                  } animate-scale-in`}
                  style={{ animationDelay: `${index * 100}ms` }}
                  onClick={() => handleRoleSelect(role.id)}
                >
                  <CardHeader className="text-center pb-4">
                    <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
                      isSelected ? 'bg-kagzat-green' : 'bg-kagzat-green/10'
                    } transition-colors duration-300`}>
                      <Icon className={`h-8 w-8 ${
                        isSelected ? 'text-white' : 'text-kagzat-green'
                      } transition-colors duration-300`} />
                    </div>
                    <CardTitle className="text-2xl font-bold text-kagzat-black mb-2">
                      {role.title}
                    </CardTitle>
                    <CardDescription className="text-gray-600 text-base">
                      {role.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <div className="space-y-3 mb-6">
                      {role.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-start gap-3">
                          <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                            isSelected ? 'bg-kagzat-green' : 'bg-gray-400'
                          } transition-colors duration-300`} />
                          <span className="text-gray-700 text-sm leading-relaxed">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                    
                    <Button
                      className={`w-full transition-all duration-300 ${
                        isSelected 
                          ? 'bg-kagzat-green hover:bg-green-600 text-white' 
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRoleSelect(role.id);
                      }}
                    >
                      {isSelected ? 'Selected' : 'Choose This Role'}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Continue Button */}
          {selectedRole && (
            <div className="text-center animate-fade-in">
              <Button
                onClick={handleContinue}
                size="lg"
                className="bg-kagzat-yellow hover:bg-yellow-500 text-kagzat-black font-semibold px-8 py-3 text-lg transition-all duration-200 hover:scale-105"
              >
                Continue
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default RoleSelection;
