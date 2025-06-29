
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';

interface SearchFiltersProps {
  filters: {
    documentType: string[];
    validatorType: string[];
    priceRange: string[];
    turnaroundTime: string[];
    rating: string[];
  };
  onFiltersChange: (filters: any) => void;
}

const SearchFilters = ({ filters, onFiltersChange }: SearchFiltersProps) => {
  const filterOptions = {
    documentType: [
      { label: 'Educational', count: 23 },
      { label: 'Identity', count: 45 },
      { label: 'Financial', count: 12 },
      { label: 'Legal', count: 8 },
      { label: 'Property', count: 5 }
    ],
    validatorType: [
      { label: 'Organizations', count: 15 },
      { label: 'Individual Validators', count: 28 },
      { label: 'Government Bodies', count: 3 }
    ],
    priceRange: [
      { label: 'Under ₹500', count: 12 },
      { label: '₹500 - ₹1,000', count: 18 },
      { label: '₹1,000 - ₹2,500', count: 8 },
      { label: 'Above ₹2,500', count: 5 }
    ],
    turnaroundTime: [
      { label: 'Express (< 6 hours)', count: 8 },
      { label: 'Standard (1-2 days)', count: 25 },
      { label: 'Economy (3-5 days)', count: 10 }
    ],
    rating: [
      { label: '4.5+ stars', count: 35 },
      { label: '4.0+ stars', count: 8 },
      { label: '3.5+ stars', count: 2 }
    ]
  };

  const handleFilterChange = (category: string, value: string, checked: boolean) => {
    const newFilters = { ...filters };
    if (checked) {
      newFilters[category] = [...newFilters[category], value];
    } else {
      newFilters[category] = newFilters[category].filter(item => item !== value);
    }
    onFiltersChange(newFilters);
  };

  return (
    <div className="space-y-6">
      {Object.entries(filterOptions).map(([category, options]) => (
        <Card key={category}>
          <CardHeader className="pb-3">
            <CardTitle className="text-base capitalize">
              {category.replace(/([A-Z])/g, ' $1').trim()}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {options.map((option) => (
              <div key={option.label} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={`${category}-${option.label}`}
                    checked={filters[category].includes(option.label)}
                    onCheckedChange={(checked) => 
                      handleFilterChange(category, option.label, checked as boolean)
                    }
                  />
                  <label 
                    htmlFor={`${category}-${option.label}`}
                    className="text-sm font-medium cursor-pointer"
                  >
                    {option.label}
                  </label>
                </div>
                <Badge variant="secondary" className="text-xs">
                  {option.count}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default SearchFilters;
