
import { FileText, Upload, Trash2, Download } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const DocumentLibrary = () => {
  const documents = [
    {
      name: 'Harvard_MBA_Certificate.pdf',
      type: 'Educational',
      size: '2.3 MB',
      uploadDate: '2 weeks ago',
      used: 3
    },
    {
      name: 'Passport_Copy.jpg',
      type: 'Identity',
      size: '456 KB',
      uploadDate: '1 month ago',
      used: 5
    },
    {
      name: 'Experience_Letter.pdf',
      type: 'Professional',
      size: '890 KB',
      uploadDate: '3 weeks ago',
      used: 2
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Educational': return 'bg-blue-100 text-blue-800';
      case 'Identity': return 'bg-green-100 text-green-800';
      case 'Professional': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FileText className="h-5 w-5" />
            <span>Document Library</span>
          </div>
          <Button variant="outline" size="sm">
            <Upload className="h-4 w-4 mr-2" />
            Upload
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {documents.map((doc, index) => (
            <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className="font-medium text-gray-900 text-sm">{doc.name}</h4>
                  <Badge variant="outline" className={`text-xs ${getTypeColor(doc.type)}`}>
                    {doc.type}
                  </Badge>
                </div>
                <div className="flex items-center space-x-4 text-xs text-gray-500">
                  <span>{doc.size}</span>
                  <span>Added {doc.uploadDate}</span>
                  <span>Used {doc.used} times</span>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <Button variant="ghost" size="sm">
                  <Download className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DocumentLibrary;
