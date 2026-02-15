'use client';

import { useParams, useRouter } from 'next/navigation';
import Navbar from '../components/Navbar';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { MapPin, Calendar, Users, Heart, ArrowLeft } from 'lucide-react';
import { mockCampaigns } from '../data/mockData';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { toast } from 'sonner';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';

export default function CampaignDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [contributionAmount, setContributionAmount] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const campaign = mockCampaigns.find((c) => c.id === id);

  if (!campaign) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-900">Campaign not found</h1>
          <Button onClick={() => router.push('/campaigns')} className="mt-4">
            Back to Campaigns
          </Button>
        </div>
      </div>
    );
  }

  const progress = Math.min((campaign.raised / campaign.goal) * 100, 100);

  const handleContribute = () => {
    if (!contributionAmount || parseFloat(contributionAmount) <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }
    toast.success(`Thank you for contributing ₹${contributionAmount}!`);
    setIsDialogOpen(false);
    setContributionAmount('');
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button
          variant="ghost"
          onClick={() => router.push('/campaigns')}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Campaigns
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Hero Image */}
            <div className="relative h-96 rounded-2xl overflow-hidden">
              <img
                src={campaign.image}
                alt={campaign.title}
                className="w-full h-full object-cover"
              />
              <Badge
                className={`absolute top-4 right-4 ${
                  campaign.status === 'active' ? 'bg-[#22C55E]' : 'bg-gray-600'
                } text-white border-0`}
              >
                {campaign.status === 'active' ? 'Active Campaign' : campaign.status.toUpperCase()}
              </Badge>
            </div>

            {/* Campaign Info */}
            <Card className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{campaign.title}</h1>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-1 text-[#0099CC]" />
                    <span>{campaign.location}</span>
                  </div>
                </div>
              </div>

              {/* Creator */}
              <div className="flex items-center space-x-3 mb-6 pb-6 border-b">
                <Avatar>
                  <AvatarImage src={campaign.creator.avatar} />
                  <AvatarFallback>{campaign.creator.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-gray-900">{campaign.creator.name}</p>
                  <p className="text-sm text-gray-600">Campaign Creator</p>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-gray-900">About this campaign</h2>
                <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                  {campaign.fullDescription}
                </p>
              </div>

              {/* Fund Allocation */}
              <div className="mt-8 pt-8 border-t">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Fund Allocation</h2>
                <div className="space-y-3">
                  {campaign.fundAllocation.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-gray-700">{item.item}</span>
                      <span className="font-semibold text-gray-900">
                        ₹{item.amount.toLocaleString()} ({item.percentage}%)
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Location */}
            <Card className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Location</h2>
              <div className="flex items-center text-gray-700 mb-4">
                <MapPin className="w-5 h-5 mr-2 text-[#0099CC]" />
                <span>{campaign.location}</span>
              </div>
              <div className="h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-gray-500">Map View</span>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Funding Card */}
            <Card className="p-6 sticky top-24">
              <h3 className="font-bold text-lg text-gray-900 mb-4">Funding Summary</h3>

              {/* Progress */}
              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Raised</span>
                  <span className="font-semibold text-gray-900">
                    ₹{campaign.raised.toLocaleString()}
                  </span>
                </div>
                <Progress value={progress} className="h-3" />
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Goal: ₹{campaign.goal.toLocaleString()}</span>
                  <span className="font-semibold text-[#22C55E]">{Math.round(progress)}%</span>
                </div>
              </div>

              {/* Stats */}
              <div className="space-y-3 mb-6 pb-6 border-b">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Contributors</span>
                  <span className="font-semibold text-gray-900">{campaign.contributors}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Volunteers</span>
                  <span className="font-semibold text-gray-900">{campaign.volunteers}</span>
                </div>
                {campaign.daysLeft && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Days Left</span>
                    <span className="font-semibold text-[#0099CC]">{campaign.daysLeft} days</span>
                  </div>
                )}
              </div>

              {/* CTA */}
              {campaign.status === 'active' && (
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="w-full bg-gradient-to-r from-[#0099CC] to-[#22C55E] hover:opacity-90">
                      <Heart className="w-4 h-4 mr-2" />
                      Contribute Now
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Make a Contribution</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 pt-4">
                      <div>
                        <Label htmlFor="amount">Contribution Amount (₹)</Label>
                        <Input
                          id="amount"
                          type="number"
                          placeholder="Enter amount"
                          value={contributionAmount}
                          onChange={(e) => setContributionAmount(e.target.value)}
                          min="1"
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setContributionAmount('500')}
                        >
                          ₹500
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setContributionAmount('1000')}
                        >
                          ₹1,000
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setContributionAmount('5000')}
                        >
                          ₹5,000
                        </Button>
                      </div>
                      <Button
                        onClick={handleContribute}
                        className="w-full bg-gradient-to-r from-[#0099CC] to-[#22C55E] hover:opacity-90"
                      >
                        Contribute ₹{contributionAmount || '0'}
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              )}

              {/* Recent Contributors */}
              <div className="mt-6 pt-6 border-t">
                <h4 className="font-semibold text-gray-900 mb-3">Recent Contributors</h4>
                <div className="space-y-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`} />
                          <AvatarFallback>U</AvatarFallback>
                        </Avatar>
                        <span className="text-gray-700">Anonymous {i}</span>
                      </div>
                      <span className="font-semibold text-gray-900">₹{(i * 1000).toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}