'use client';

import { useState } from 'react';
import Navbar from '../../components/Navbar';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../components/ui/dialog';
import { Eye, CheckCircle, XCircle } from 'lucide-react';
import { mockJobs } from '../../data/mockData';
import { toast } from 'sonner';

export default function AdminJobVerification() {
  const [selectedJob, setSelectedJob] = useState<typeof mockJobs[0] | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const pendingJobs = mockJobs.filter((j) => j.status === 'completed');

  const handleReview = (job: typeof mockJobs[0]) => {
    setSelectedJob(job);
    setIsDialogOpen(true);
  };

  const handleApprove = () => {
    if (selectedJob) {
      toast.success(`Job approved! Payment of ₹${selectedJob.payout.toLocaleString()} will be processed.`);
      setIsDialogOpen(false);
    }
  };

  const handleReject = () => {
    if (selectedJob) {
      toast.error('Job rejected. Cleaner will be notified.');
      setIsDialogOpen(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Job Verification</h1>
          <p className="text-gray-600 mt-1">Review and verify completed cleanup jobs</p>
        </div>

        {/* Table */}
        <Card>
          {pendingJobs.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Campaign</TableHead>
                  <TableHead>Cleaner</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Completed</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingJobs.map((job) => (
                  <TableRow key={job.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <img
                          src={job.image}
                          alt={job.campaignTitle}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div>
                          <p className="font-semibold text-gray-900">{job.campaignTitle}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>Cleaner #{job.claimedBy}</TableCell>
                    <TableCell>{job.location}</TableCell>
                    <TableCell>{job.completedDate}</TableCell>
                    <TableCell>
                      <p className="font-semibold text-[#22C55E]">₹{job.payout.toLocaleString()}</p>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleReview(job)}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Review
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-16">
              <div className="text-gray-400 text-6xl mb-4">✅</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Jobs to Verify</h3>
              <p className="text-gray-600">All jobs have been reviewed</p>
            </div>
          )}
        </Card>

        {/* Review Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
            {selectedJob && (
              <>
                <DialogHeader>
                  <DialogTitle>Review Job Completion</DialogTitle>
                </DialogHeader>
                <div className="space-y-6 pt-4">
                  {/* Job Details */}
                  <Card className="p-4 bg-gray-50">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Campaign</p>
                        <p className="font-semibold">{selectedJob.campaignTitle}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Location</p>
                        <p className="font-semibold">{selectedJob.location}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Cleaner ID</p>
                        <p className="font-semibold">{selectedJob.claimedBy}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Completed Date</p>
                        <p className="font-semibold">{selectedJob.completedDate}</p>
                      </div>
                    </div>
                  </Card>

                  {/* Before/After Photos */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Before & After Photos</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600 mb-2">Before</p>
                        <img
                          src={selectedJob.beforePhoto || selectedJob.image}
                          alt="Before"
                          className="w-full h-64 object-cover rounded-lg"
                        />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-2">After</p>
                        <img
                          src={selectedJob.afterPhoto || selectedJob.image}
                          alt="After"
                          className="w-full h-64 object-cover rounded-lg"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Payout Breakdown */}
                  <Card className="p-4 bg-blue-50">
                    <h3 className="font-semibold text-gray-900 mb-3">Payout Breakdown</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-700">Campaign Amount</span>
                        <span className="font-semibold">₹{selectedJob.payout.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-red-600">
                        <span>Platform Fee (5%)</span>
                        <span className="font-semibold">-₹{Math.round(selectedJob.payout * 0.05).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between pt-2 border-t border-gray-300">
                        <span className="font-bold text-gray-900">Cleaner Payout</span>
                        <span className="font-bold text-[#22C55E]">
                          ₹{Math.round(selectedJob.payout * 0.95).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </Card>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <Button
                      onClick={handleApprove}
                      className="flex-1 bg-[#22C55E] hover:bg-[#1ea84d]"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Approve & Process Payment
                    </Button>
                    <Button
                      onClick={handleReject}
                      variant="outline"
                      className="flex-1 border-red-500 text-red-500 hover:bg-red-50"
                    >
                      <XCircle className="w-4 h-4 mr-2" />
                      Reject Job
                    </Button>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}