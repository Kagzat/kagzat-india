
import { useState, useEffect } from 'react';
import { Search as SearchIcon, MapPin, Filter, Star, Heart, Eye } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import SearchFilters from '@/components/search/SearchFilters';
import SearchResults from '@/components/search/SearchResults';
import PopularSearches from '@/components/search/PopularSearches';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('Near me');
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState({
    documentType: [],
    validatorType: [],
    priceRange: [],
    turnaroundTime: [],
    rating: []
  });

  // Simulate search with debounce
  useEffect(() => {
    if (searchQuery.trim()) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [searchQuery]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Find Validators</h1>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2"
            >
              <Filter className="h-4 w-4" />
              Filters
            </Button>
          </div>

          {/* Search Bar */}
          <div className="flex gap-4 mb-6">
            <div className="flex-1 relative">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="What document do you need validated? e.g., Harvard MBA certificate, passport verification"
                className="pl-10 h-12 text-base"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Location"
                className="pl-10 h-12 w-48"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <Button className="h-12 px-8 bg-kagzat-green hover:bg-green-600">
              Search
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-6">
        <div className="flex gap-6">
          {/* Sidebar Filters */}
          {showFilters && (
            <div className="w-80 flex-shrink-0">
              <SearchFilters filters={filters} onFiltersChange={setFilters} />
            </div>
          )}

          {/* Main Content */}
          <div className="flex-1">
            {!searchQuery.trim() ? (
              <PopularSearches onSearch={handleSearch} />
            ) : (
              <SearchResults 
                query={searchQuery} 
                isLoading={isLoading} 
                filters={filters}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
