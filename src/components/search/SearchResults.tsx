
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Heart, Clock, MapPin, Eye } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface SearchResultsProps {
  query: string;
  isLoading: boolean;
  filters: any;
}

const SearchResults = ({ query, isLoading, filters }: SearchResultsProps) => {
  const [favorites, setFavorites] = useState<string[]>([]);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(fav => fav !== id)
        : [...prev, id]
    );
  };

  const mockResults = [
    {
      id: '1',
      name: 'Harvard Business School',
      type: 'Organization',
      service: 'Official Harvard Verification',
      price: '₹2,500',
      time: '24-48 hours',
      rating: 4.9,
      reviews: 156,
      description: 'Documents Required: Student ID, Graduation Year, Full Name',
      features: ['Instant Auto-Population Available', 'Official Verification'],
      badge: 'Featured',
      location: 'Boston, MA'
    },
    {
      id: '2',
      name: 'Dr. Sarah Mitchell',
      type: 'Individual',
      service: 'Educational Document Specialist',
      price: '₹800',
      time: '4-6 hours',
      rating: 4.7,
      reviews: 89,
      description: 'Specializes in US university degrees',
      features: ['Express service available', '15 years experience'],
      badge: 'Top Rated',
      location: 'New York, NY'
    },
    {
      id: '3',
      name: 'Mumbai Verification Services',
      type: 'Organization',
      service: 'Authorized Document Verification',
      price: '₹1,200',
      time: '12-24 hours',
      rating: 4.5,
      reviews: 234,
      description: 'Bulk verification discounts available',
      features: ['ISO Certified', '24/7 Support'],
      badge: 'Verified',
      location: 'Mumbai, India'
    }
  ];

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-10 w-32" />
        </div>
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="space-y-4">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
                <div className="flex gap-2">
                  <Skeleton className="h-8 w-20" />
                  <Skeleton className="h-8 w-24" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            Results for "{query}"
          </h2>
          <p className="text-gray-600 mt-1">{mockResults.length} validators found</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Eye className="h-4 w-4 mr-2" />
            Map View
          </Button>
          <select className="px-3 py-2 border rounded-md text-sm">
            <option>Sort by Relevance</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Rating</option>
            <option>Speed</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        {mockResults.map((result) => (
          <Card key={result.id} className="hover:shadow-lg transition-shadow duration-200">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {result.name}
                    </h3>
                    <Badge 
                      variant={result.badge === 'Featured' ? 'default' : 'secondary'}
                      className={result.badge === 'Featured' ? 'bg-kagzat-yellow text-black' : ''}
                    >
                      {result.badge}
                    </Badge>
                    <Badge variant="outline">
                      {result.type}
                    </Badge>
                  </div>

                  <p className="text-gray-700 font-medium mb-2">{result.service}</p>
                  
                  <div className="flex items-center gap-4 mb-3">
                    <div className="flex items-center gap-1">
                      <span className="font-semibold text-kagzat-green">{result.price}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{result.time}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{result.rating}</span>
                      <span className="text-sm text-gray-600">({result.reviews} reviews)</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{result.location}</span>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 mb-3">{result.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {result.features.map((feature, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2 ml-6">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleFavorite(result.id)}
                    className="p-2"
                  >
                    <Heart 
                      className={`h-5 w-5 ${
                        favorites.includes(result.id) 
                          ? 'fill-red-500 text-red-500' 
                          : 'text-gray-400'
                      }`} 
                    />
                  </Button>
                  <Button className="bg-kagzat-green hover:bg-green-600 px-6">
                    Select This Service
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="default" size="sm" className="bg-kagzat-green">
            1
          </Button>
          <Button variant="outline" size="sm">
            2
          </Button>
          <Button variant="outline" size="sm">
            3
          </Button>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
