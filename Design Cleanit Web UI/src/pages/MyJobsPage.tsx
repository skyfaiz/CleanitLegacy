'use client';

import { useState } from 'react';
import Navbar from '../components/Navbar';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { MapPin, Upload, Eye } from 'lucide-react';
import { mockJobs } from '../data/mockData';

export default function MyJobsPage() {
  const myJobs = mockJobs.filter((j) => j.status !== 'available');
  const activeJobs = myJobs.filter((j) => j.status === 'claimed');
  const pendingJobs = myJobs.filter((j) => j.status === 'completed');
  const completedJobs = myJobs.filter((j) => j.status === 'verified');

  const totalEarnings = completedJobs.reduce((sum, j) => sum + j.payout, 0);
  const jobsCompleted = completedJobs.length;

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Jobs</h1>
          <p className="text-gray-600 mt-1">Track your cleanup jobs and earnings</p>
        </div>

        {/* Earnings Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Earnings</p>
                <p className="text-4xl font-bold text-[#22C55E] mt-1">
                  ₹{totalEarnings.toLocaleString()}
                </p>
              </div>
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">💰</span>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Jobs Completed</p>
                <p className="text-4xl font-bold text-[#0099CC] mt-1">{jobsCompleted}</p>
              </div>
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">✅</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Jobs Tabs */}
        <Tabs defaultValue="active" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="active">Active ({activeJobs.length})</TabsTrigger>
            <TabsTrigger value="pending">Pending ({pendingJobs.length})</TabsTrigger>
            <TabsTrigger value="completed">Completed ({completedJobs.length})</TabsTrigger>
          </TabsList>

          {/* Active Jobs */}
          <TabsContent value="active" className="space-y-4">
            {activeJobs.length > 0 ? (
              activeJobs.map((job) => (
                <Card key={job.id} className="p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <img
                      src={job.image}
                      alt={job.campaignTitle}
                      className="w-full md:w-48 h-32 object-cover rounded-lg"
                    />
                    <div className="flex-1 space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">{job.campaignTitle}</h3>
                          <div className="flex items-center text-gray-600 mt-1">
                            <MapPin className="w-4 h-4 mr-1" />
                            <span>{job.location}</span>
                          </div>
                        </div>
                        <Badge className="bg-blue-500">Claimed</Badge>
                      </div>
                      <p className="text-gray-700">{job.description}</p>
                      <div className="flex items-center justify-between pt-3 border-t">
                        <span className="text-xl font-bold text-[#22C55E]">
                          ₹{job.payout.toLocaleString()}
                        </span>
                        <Button className="bg-gradient-to-r from-[#0099CC] to-[#22C55E]">
                          <Upload className="w-4 h-4 mr-2" />
                          Upload Completion Photos
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <div className="text-center py-16">
                <p className="text-gray-500">No active jobs</p>
              </div>
            )}
          </TabsContent>

          {/* Pending Jobs */}
          <TabsContent value="pending" className="space-y-4">
            {pendingJobs.length > 0 ? (
              pendingJobs.map((job) => (
                <Card key={job.id} className="p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <img
                      src={job.image}
                      alt={job.campaignTitle}
                      className="w-full md:w-48 h-32 object-cover rounded-lg"
                    />
                    <div className="flex-1 space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">{job.campaignTitle}</h3>
                          <div className="flex items-center text-gray-600 mt-1">
                            <MapPin className="w-4 h-4 mr-1" />
                            <span>{job.location}</span>
                          </div>
                        </div>
                        <Badge className="bg-yellow-500">Awaiting Verification</Badge>
                      </div>
                      <p className="text-gray-700">{job.description}</p>
                      <div className="flex items-center justify-between pt-3 border-t">
                        <span className="text-xl font-bold text-[#22C55E]">
                          ₹{job.payout.toLocaleString()}
                        </span>
                        <span className="text-sm text-gray-600">
                          Completed: {job.completedDate}
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <div className="text-center py-16">
                <p className="text-gray-500">No pending jobs</p>
              </div>
            )}
          </TabsContent>

          {/* Completed Jobs */}
          <TabsContent value="completed" className="space-y-4">
            {completedJobs.length > 0 ? (
              completedJobs.map((job) => (
                <Card key={job.id} className="p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <img
                      src={job.image}
                      alt={job.campaignTitle}
                      className="w-full md:w-48 h-32 object-cover rounded-lg"
                    />
                    <div className="flex-1 space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">{job.campaignTitle}</h3>
                          <div className="flex items-center text-gray-600 mt-1">
                            <MapPin className="w-4 h-4 mr-1" />
                            <span>{job.location}</span>
                          </div>
                        </div>
                        <Badge className="bg-[#22C55E]">Verified & Paid</Badge>
                      </div>
                      <p className="text-gray-700">{job.description}</p>

                      {/* Before/After Photos */}
                      {job.beforePhoto && job.afterPhoto && (
                        <div className="grid grid-cols-2 gap-4 pt-3">
                          <div>
                            <p className="text-xs text-gray-600 mb-1">Before</p>
                            <img
                              src={job.beforePhoto}
                              alt="Before"
                              className="w-full h-24 object-cover rounded"
                            />
                          </div>
                          <div>
                            <p className="text-xs text-gray-600 mb-1">After</p>
                            <img
                              src={job.afterPhoto}
                              alt="After"
                              className="w-full h-24 object-cover rounded"
                            />
                          </div>
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-3 border-t">
                        <span className="text-xl font-bold text-[#22C55E]">
                          ₹{job.payout.toLocaleString()}
                        </span>
                        <span className="text-sm text-gray-600">
                          Verified: {job.verifiedDate}
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <div className="text-center py-16">
                <p className="text-gray-500">No completed jobs yet</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}