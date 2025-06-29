
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, MapPin, Clock, DollarSign, CheckCircle } from 'lucide-react';

interface SearchResultsProps {
  query: string;
  isLoading: boolean;
  filters: {
    documentType: string[];
    validatorType: string[];
    priceRange: string[];
    turnaroundTime: string[];
    rating: string[];
  };
  onStartRequest?: () => void;
}

const SearchResults = ({ query, isLoading, filters, onStartRequest }: SearchResultsProps) => {
  const [selectedValidator, setSelectedValidator] = useState<string | null>(null);

  const mockResults = [
    {
      id: '1',
      name: 'Harvard Business School',
      type: 'Educational Institution',
      rating: 4.9,
      reviews: 156,
      price: 2500,
      currency: '₹',
      timeRange: '24-48 hours',
      location: 'Boston, MA',
      specialty: 'MBA & Business Programs',
      verified: true,
      description: 'Official verification service for Harvard Business School degrees and certificates.'
    },
    {
      id: '2',
      name: 'MIT Registrar Office',
      type: 'Educational Institution',
      rating: 4.8,
      reviews: 203,
      price: 2800,
      currency: '₹',
      timeRange: '48-72 hours',
      location: 'Cambridge, MA',
      specialty: 'Engineering & Technology',
      verified: true,
      description: 'Official verification for MIT degrees, certificates, and transcripts.'
    },
    {
      id: '3',
      name: 'Stanford University',
      type: 'Educational Institution',
      rating: 4.9,
      reviews: 189,
      price: 2600,
      currency: '₹',
      timeRange: '24-48 hours',
      location: 'Stanford, CA',
      specialty: 'All Academic Programs',
      verified: true,
      description: 'Comprehensive verification services for all Stanford University programs.'
    }
  ];

  const handleSelectValidator = (validatorId: string) => {
    setSelectedValidator(validatorId);
    if (onStartRequest) {
      onStartRequest();
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Found {mockResults.length} validators for "{query}"
        </p>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">Sort by:</span>
          <select className="text-sm border border-gray-300 rounded px-2 py-1">
            <option>Best Match</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Rating</option>
            <option>Response Time</option>
          </select>
        </div>
      </div>

      {mockResults.map((validator) => (
        <Card key={validator.id} className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <CardTitle className="text-lg flex items-center space-x-2">
                  <span>{validator.name}</span>
                  {validator.verified && (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  )}
                </CardTitle>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <Badge variant="secondary">{validator.type}</Badge>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span>{validator.rating}</span>
                    <span>({validator.reviews} reviews)</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-green-600">
                  {validator.currency}{validator.price.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600 flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {validator.timeRange}
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700">{validator.description}</p>
            
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <MapPin className="h-4 w-4" />
                <span>{validator.location}</span>
              </div>
              <div className="flex items-center space-x-1">
                <span className="font-medium">Specialty:</span>
                <span>{validator.specialty}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4">
              <div className="flex items-center space-x-2">
                <Badge className="bg-blue-100 text-blue-800">
                  Instant Quotes
                </Badge>
                <Badge className="bg-green-100 text-green-800">
                  Fast Response
                </Badge>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline">View Profile</Button>
                <Button 
                  onClick={() => handleSelectValidator(validator.id)}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Select & Continue
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default SearchResults;
