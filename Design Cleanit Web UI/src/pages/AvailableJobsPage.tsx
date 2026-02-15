'use client';

import Navbar from '../components/Navbar';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { MapPin, Clock, DollarSign } from 'lucide-react';
import { mockJobs } from '../data/mockData';
import { toast } from 'sonner';

export default function AvailableJobsPage() {
  const availableJobs = mockJobs.filter((j) => j.status === 'available');

  const handleClaimJob = (jobId: string, title: string) => {
    toast.success(`You've claimed the job: ${title}`);
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Available Jobs</h1>
          <p className="text-gray-600 mt-1">Find paid cleanup jobs in your area</p>
        </div>

        {/* Jobs Grid */}
        {availableJobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableJobs.map((job) => (
              <Card key={job.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                {/* Image */}
                <div className="relative h-48">
                  <img src={job.image} alt={job.campaignTitle} className="w-full h-full object-cover" />
                  <Badge className="absolute top-3 right-3 bg-[#22C55E] text-white border-0">
                    Available
                  </Badge>
                </div>

                {/* Content */}
                <div className="p-5 space-y-4">
                  {/* Title & Location */}
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 mb-2">{job.campaignTitle}</h3>
                    <div className="flex items-center text-gray-600 text-sm">
                      <MapPin className="w-4 h-4 mr-1 text-[#0099CC]" />
                      <span>{job.location}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-700 text-sm line-clamp-2">{job.description}</p>

                  {/* Details */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center text-gray-600">
                        <Clock className="w-4 h-4 mr-1" />
                        <span>{job.estimatedHours}h estimated</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700 font-medium">Payout:</span>
                      <span className="text-2xl font-bold text-[#22C55E]">
                        ₹{job.payout.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Button */}
                  <Button
                    onClick={() => handleClaimJob(job.id, job.campaignTitle)}
                    className="w-full bg-gradient-to-r from-[#0099CC] to-[#22C55E] hover:opacity-90"
                  >
                    Claim This Job
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-gray-400 text-6xl mb-4">💼</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Jobs Available</h3>
            <p className="text-gray-600">Check back later for new cleanup opportunities</p>
          </div>
        )}
      </div>
    </div>
  );
}