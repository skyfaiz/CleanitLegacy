'use client';

import { useState } from 'react';
import Navbar from '../../components/Navbar';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { DollarSign, TrendingUp } from 'lucide-react';
import { mockJobs } from '../../data/mockData';
import { toast } from 'sonner';

export default function AdminPayouts() {
  const [statusFilter, setStatusFilter] = useState('verified');

  const verifiedJobs = mockJobs.filter((j) => j.status === 'verified');
  const paidJobs = mockJobs.filter((j) => j.status === 'verified'); // In real app, would be separate status

  const totalPaidOut = paidJobs.reduce((sum, j) => sum + Math.round(j.payout * 0.95), 0);
  const pendingPayout = verifiedJobs.reduce((sum, j) => sum + Math.round(j.payout * 0.95), 0);
  const jobsPendingPayout = verifiedJobs.length;

  let filteredJobs = statusFilter === 'verified' ? verifiedJobs : paidJobs;

  const handleProcessPayout = (jobId: string, amount: number) => {
    toast.success(`Payment of ₹${amount.toLocaleString()} processed successfully!`);
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Payout Management</h1>
          <p className="text-gray-600 mt-1">Process payments to cleaners for completed jobs</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Paid Out</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">
                  ₹{totalPaidOut.toLocaleString()}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-[#22C55E]" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending Payout</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">
                  ₹{pendingPayout.toLocaleString()}
                </p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Jobs Pending</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{jobsPendingPayout}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-[#0099CC]" />
              </div>
            </div>
          </Card>
        </div>

        {/* Filter */}
        <Card className="p-6 mb-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Payout List</h2>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="verified">Verified (Pending)</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </Card>

        {/* Table */}
        <Card>
          {filteredJobs.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Campaign</TableHead>
                  <TableHead>Cleaner</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Completed</TableHead>
                  <TableHead>Campaign Amount</TableHead>
                  <TableHead>Platform Fee</TableHead>
                  <TableHead>Payout</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredJobs.map((job) => {
                  const platformFee = Math.round(job.payout * 0.05);
                  const cleanerPayout = Math.round(job.payout * 0.95);

                  return (
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
                      <TableCell>₹{job.payout.toLocaleString()}</TableCell>
                      <TableCell className="text-red-600">-₹{platformFee.toLocaleString()}</TableCell>
                      <TableCell>
                        <p className="font-semibold text-[#22C55E]">
                          ₹{cleanerPayout.toLocaleString()}
                        </p>
                      </TableCell>
                      <TableCell>
                        {statusFilter === 'verified' ? (
                          <Badge className="bg-yellow-500">Verified</Badge>
                        ) : (
                          <Badge className="bg-[#22C55E]">Paid</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        {statusFilter === 'verified' ? (
                          <Button
                            size="sm"
                            onClick={() => handleProcessPayout(job.id, cleanerPayout)}
                            className="bg-gradient-to-r from-[#0099CC] to-[#22C55E]"
                          >
                            Process Payout
                          </Button>
                        ) : (
                          <span className="text-sm text-gray-500">{job.verifiedDate}</span>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-16">
              <div className="text-gray-400 text-6xl mb-4">💰</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {statusFilter === 'verified' ? 'No Pending Payouts' : 'No Payment History'}
              </h3>
              <p className="text-gray-600">
                {statusFilter === 'verified'
                  ? 'All verified jobs have been paid out'
                  : 'No payments have been processed yet'}
              </p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}