
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface PopularSearchesProps {
  onSearch: (query: string) => void;
}

const PopularSearches = ({ onSearch }: PopularSearchesProps) => {
  const popularSearches = [
    {
      title: "University Degree Verification",
      description: "Verify academic credentials from universities worldwide",
      priceRange: "₹800 - ₹2,500",
      timeRange: "6-48 hours",
      searches: "1,234 searches this month"
    },
    {
      title: "Passport Authentication",
      description: "Official passport verification and authentication",
      priceRange: "₹500 - ₹1,200",
      timeRange: "2-24 hours",
      searches: "892 searches this month"
    },
    {
      title: "Marriage Certificate Validation",
      description: "Legal validation of marriage certificates",
      priceRange: "₹600 - ₹1,500",
      timeRange: "4-12 hours",
      searches: "567 searches this month"
    },
    {
      title: "Employment Letter Verification",
      description: "Verify employment history and letters",
      priceRange: "₹400 - ₹1,000",
      timeRange: "2-8 hours",
      searches: "423 searches this month"
    },
    {
      title: "Bank Statement Validation",
      description: "Authenticate bank statements and financial documents",
      priceRange: "₹300 - ₹800",
      timeRange: "1-6 hours",
      searches: "678 searches this month"
    },
    {
      title: "Property Document Verification",
      description: "Verify property ownership and legal documents",
      priceRange: "₹1,000 - ₹3,000",
      timeRange: "12-72 hours",
      searches: "234 searches this month"
    }
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Popular Searches</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {popularSearches.map((search, index) => (
          <Card 
            key={index} 
            className="cursor-pointer hover:shadow-lg transition-shadow duration-200"
            onClick={() => onSearch(search.title)}
          >
            <CardContent className="p-4">
              <h3 className="font-semibold text-gray-900 mb-2">{search.title}</h3>
              <p className="text-sm text-gray-600 mb-3">{search.description}</p>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Price:</span>
                  <Badge variant="secondary">{search.priceRange}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Time:</span>
                  <Badge variant="outline">{search.timeRange}</Badge>
                </div>
                <div className="text-xs text-gray-400 mt-3">
                  {search.searches}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PopularSearches;
