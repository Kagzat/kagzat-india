
import { CheckCircle, Download, Star, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const RecentSubmissions = () => {
  const recentSubmissions = [
    {
      id: 'SUB-STAN-240625-001',
      document: 'Stanford MS Computer Science',
      completedDate: '3 days ago',
      validator: 'Stanford University',
      status: 'Verified',
      fee: 1800,
      rating: 5
    },
    {
      id: 'SUB-PASS-240620-002',
      document: 'Passport Verification',
      completedDate: '1 week ago',
      validator: 'Government Authority',
      status: 'Verified',
      fee: 400,
      rating: 4
    },
    {
      id: 'SUB-EXP-240615-003',
      document: 'Experience Letter',
      completedDate: '2 weeks ago',
      validator: 'HR Professional',
      status: 'Rejected',
      fee: 600,
      rating: null,
      rejectionReason: 'Document quality insufficient'
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <CheckCircle className="h-5 w-5 text-green-600" />
          <span>Recent Submissions</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentSubmissions.map((submission) => (
            <div key={submission.id} className="border rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-xs font-mono text-gray-500">{submission.id}</span>
                    <Badge 
                      variant="outline" 
                      className={submission.status === 'Verified' 
                        ? 'bg-green-100 text-green-800 border-green-300' 
                        : 'bg-red-100 text-red-800 border-red-300'
                      }
                    >
                      {submission.status}
                    </Badge>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-1">{submission.document}</h4>
                  <p className="text-sm text-gray-600 mb-2">Validator: {submission.validator}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>Completed {submission.completedDate}</span>
                    <span>₹{submission.fee.toLocaleString()}</span>
                    {submission.rating && (
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span>{submission.rating}</span>
                      </div>
                    )}
                  </div>
                  {submission.status === 'Rejected' && submission.rejectionReason && (
                    <p className="text-sm text-red-600 mt-2">
                      Reason: {submission.rejectionReason}
                    </p>
                  )}
                </div>
                <div className="flex flex-col space-y-2">
                  {submission.status === 'Verified' && (
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  )}
                  {submission.status === 'Rejected' && (
                    <Button variant="outline" size="sm">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Resubmit
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentSubmissions;
