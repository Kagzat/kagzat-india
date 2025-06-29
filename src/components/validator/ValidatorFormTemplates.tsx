
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Plus, Search, FileText, Edit, Copy, Trash2, Eye } from 'lucide-react';

const ValidatorFormTemplates = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const templates = [
    {
      id: '1',
      name: 'MBA Degree Verification',
      description: 'Standard form for verifying MBA degrees and certificates',
      category: 'Education',
      fields: 8,
      lastModified: '2 days ago',
      usage: 23,
      status: 'active'
    },
    {
      id: '2',
      name: 'Transcript Verification',
      description: 'Comprehensive form for academic transcript validation',
      category: 'Education',
      fields: 12,
      lastModified: '1 week ago',
      usage: 45,
      status: 'active'
    },
    {
      id: '3',
      name: 'Professional Certificate',
      description: 'Form for validating professional certifications',
      category: 'Professional',
      fields: 6,
      lastModified: '3 days ago',
      usage: 15,
      status: 'draft'
    },
    {
      id: '4',
      name: 'Executive Education',
      description: 'Specialized form for executive education programs',
      category: 'Education',
      fields: 10,
      lastModified: '5 days ago',
      usage: 8,
      status: 'active'
    }
  ];

  const filteredTemplates = templates.filter(template =>
    template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    template.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Form Templates</h2>
          <p className="text-gray-600 mt-1">Create and manage validation forms for different document types</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Create Template
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search templates..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="cursor-pointer hover:bg-gray-50">
            All Categories
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-gray-50">
            Education
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-gray-50">
            Professional
          </Badge>
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <Card key={template.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-lg">{template.name}</CardTitle>
                  <Badge 
                    variant={template.status === 'active' ? 'default' : 'secondary'}
                    className={template.status === 'active' ? 'bg-green-100 text-green-800' : ''}
                  >
                    {template.status}
                  </Badge>
                </div>
                <div className="flex items-center space-x-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600">{template.description}</p>
              
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-4">
                  <span className="text-gray-600">
                    <FileText className="h-4 w-4 inline mr-1" />
                    {template.fields} fields
                  </span>
                  <Badge variant="outline">{template.category}</Badge>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>Used {template.usage} times</span>
                <span>Modified {template.lastModified}</span>
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Copy className="h-4 w-4 mr-1" />
                  Duplicate
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Start Templates */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Quick Start Templates</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { name: 'Basic Degree', description: 'Simple degree verification', icon: '🎓' },
            { name: 'Transcript', description: 'Academic transcript form', icon: '📄' },
            { name: 'Certificate', description: 'Professional certificate', icon: '🏆' },
            { name: 'Custom', description: 'Start from scratch', icon: '✨' }
          ].map((quickTemplate, index) => (
            <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow border-dashed border-2 border-gray-300 hover:border-blue-400">
              <CardContent className="p-6 text-center">
                <div className="text-3xl mb-2">{quickTemplate.icon}</div>
                <h4 className="font-medium text-gray-900">{quickTemplate.name}</h4>
                <p className="text-sm text-gray-600 mt-1">{quickTemplate.description}</p>
                <Button variant="ghost" size="sm" className="mt-3">
                  <Plus className="h-4 w-4 mr-1" />
                  Create
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ValidatorFormTemplates;
