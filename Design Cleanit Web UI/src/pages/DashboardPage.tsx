'use client';

import Navbar from '../components/Navbar';
import { useAuth } from '../contexts/AuthContext';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { useRouter } from 'next/navigation';
import { TrendingUp, Heart, Briefcase, DollarSign, Plus, Sparkles } from 'lucide-react';
import { mockCampaigns, mockJobs, mockCleanTips } from '../data/mockData';
import { Badge } from '../components/ui/badge';

export default function DashboardPage() {
  const { user } = useAuth();
  const router = useRouter();

  if (!user) return null;

  const userCampaigns = mockCampaigns.slice(0, 3);
  const userContributions = [
    { id: '1', campaign: 'Marina Beach Cleanup', amount: 5000, date: '2025-02-05' },
    { id: '2', campaign: 'Juhu Beach Cleanup', amount: 3000, date: '2025-02-03' },
    { id: '3', campaign: 'Yamuna River Cleanup', amount: 2500, date: '2025-02-01' },
  ];

  const myJobs = mockJobs.filter(j => j.status !== 'available').slice(0, 3);
  const totalEarned = myJobs.filter(j => j.status === 'verified').reduce((sum, j) => sum + j.payout, 0);
  
  // CleanTips data
  const myCleanTips = mockCleanTips.filter(tip => tip.creator.id === user.id).slice(0, 3);
  const totalTipsReceived = myCleanTips.reduce((sum, tip) => sum + tip.totalTips, 0);

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Welcome back, {user.name}!</h1>
          <p className="text-gray-400">Here's what's happening with your account</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {user.role === 'citizen' && (
            <>
              <Card className="p-6 glow-green">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Campaigns Created</p>
                    <p className="text-3xl font-bold text-white">3</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-[#1DB954]/20 to-[#22C55E]/20 rounded-xl flex items-center justify-center border border-[#1DB954]/30">
                    <TrendingUp className="w-6 h-6 text-[#4ADE80]" />
                  </div>
                </div>
              </Card>
              <Card className="p-6 glow-green">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Total Contributed</p>
                    <p className="text-3xl font-bold text-white">₹10,500</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-[#22C55E]/20 to-[#4ADE80]/20 rounded-xl flex items-center justify-center border border-[#22C55E]/30">
                    <Heart className="w-6 h-6 text-[#4ADE80]" />
                  </div>
                </div>
              </Card>
              <Card className="p-6 glow-green">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Active Campaigns</p>
                    <p className="text-3xl font-bold text-white">2</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-[#84CC16]/20 to-[#A3E635]/20 rounded-xl flex items-center justify-center border border-[#84CC16]/30">
                    <TrendingUp className="w-6 h-6 text-[#84CC16]" />
                  </div>
                </div>
              </Card>
              <Card className="p-6 glow-green">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Impact Score</p>
                    <p className="text-3xl font-bold text-white">87%</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-[#22C55E]/20 to-[#1DB954]/20 rounded-xl flex items-center justify-center border border-[#22C55E]/30">
                    <Sparkles className="w-6 h-6 text-[#4ADE80]" />
                  </div>
                </div>
              </Card>
            </>
          )}

          {user.role === 'cleaner' && (
            <>
              <Card className="p-6 glow-green">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Jobs Completed</p>
                    <p className="text-3xl font-bold text-white">12</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-[#1DB954]/20 to-[#22C55E]/20 rounded-xl flex items-center justify-center border border-[#1DB954]/30">
                    <Briefcase className="w-6 h-6 text-[#4ADE80]" />
                  </div>
                </div>
              </Card>
              <Card className="p-6 glow-green">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Total Earned</p>
                    <p className="text-3xl font-bold text-white">₹{totalEarned.toLocaleString()}</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-[#22C55E]/20 to-[#4ADE80]/20 rounded-xl flex items-center justify-center border border-[#22C55E]/30">
                    <DollarSign className="w-6 h-6 text-[#4ADE80]" />
                  </div>
                </div>
              </Card>
              <Card className="p-6 glow-green">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Active Jobs</p>
                    <p className="text-3xl font-bold text-white">1</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-[#84CC16]/20 to-[#A3E635]/20 rounded-xl flex items-center justify-center border border-[#84CC16]/30">
                    <Briefcase className="w-6 h-6 text-[#84CC16]" />
                  </div>
                </div>
              </Card>
              <Card className="p-6 glow-green">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Rating</p>
                    <p className="text-3xl font-bold text-white">4.8</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-[#22C55E]/20 to-[#1DB954]/20 rounded-xl flex items-center justify-center border border-[#22C55E]/30">
                    <Sparkles className="w-6 h-6 text-[#4ADE80]" />
                  </div>
                </div>
              </Card>
            </>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* My Campaigns / Jobs */}
          {user.role === 'citizen' ? (
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">My Campaigns</h2>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => router.push('/campaigns')}
                >
                  <Plus className="w-4 h-4 mr-1" />
                  New Campaign
                </Button>
              </div>
              <div className="space-y-4">
                {userCampaigns.map((campaign) => (
                  <div
                    key={campaign.id}
                    className="flex items-start space-x-4 p-4 glass-light rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
                    onClick={() => router.push(`/campaigns/${campaign.id}`)}
                  >
                    <img
                      src={campaign.image}
                      alt={campaign.title}
                      className="w-16 h-16 rounded-lg object-cover ring-1 ring-white/10"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-white truncate">{campaign.title}</h3>
                      <p className="text-sm text-gray-400 mt-1">{campaign.location}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <Badge variant={campaign.status === 'active' ? 'default' : 'secondary'}>
                          {campaign.status}
                        </Badge>
                        <span className="text-xs text-gray-500">
                          ₹{campaign.raised.toLocaleString()} / ₹{campaign.goal.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          ) : (
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">My Jobs</h2>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => router.push('/jobs/available')}
                >
                  Find Jobs
                </Button>
              </div>
              <div className="space-y-4">
                {myJobs.map((job) => (
                  <div
                    key={job.id}
                    className="flex items-start space-x-4 p-4 glass-light rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
                    onClick={() => router.push('/jobs/my-jobs')}
                  >
                    <img
                      src={job.image}
                      alt={job.campaignTitle}
                      className="w-16 h-16 rounded-lg object-cover ring-1 ring-white/10"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-white truncate">{job.campaignTitle}</h3>
                      <p className="text-sm text-gray-400 mt-1">{job.location}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <Badge variant={job.status === 'verified' ? 'default' : 'secondary'}>
                          {job.status}
                        </Badge>
                        <span className="text-xs font-semibold text-[#4ADE80]">
                          ₹{job.payout.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Recent Contributions / Activity */}
          <Card className="p-6">
            <h2 className="text-xl font-bold text-white mb-6">
              {user.role === 'citizen' ? 'Recent Contributions' : 'Recent Activity'}
            </h2>
            <div className="space-y-4">
              {user.role === 'citizen' ? (
                userContributions.map((contribution) => (
                  <div key={contribution.id} className="flex items-center justify-between p-4 glass-light rounded-xl">
                    <div>
                      <h3 className="font-semibold text-white">{contribution.campaign}</h3>
                      <p className="text-sm text-gray-400 mt-1">{contribution.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-[#4ADE80]">+₹{contribution.amount.toLocaleString()}</p>
                    </div>
                  </div>
                ))
              ) : (
                myJobs.map((job) => (
                  <div key={job.id} className="flex items-center justify-between p-4 glass-light rounded-xl">
                    <div>
                      <h3 className="font-semibold text-white">{job.campaignTitle}</h3>
                      <p className="text-sm text-gray-400 mt-1">
                        {job.completedDate || job.claimedDate || 'Pending'}
                      </p>
                    </div>
                    <div className="text-right">
                      <Badge variant={job.status === 'verified' ? 'default' : 'secondary'}>
                        {job.status}
                      </Badge>
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>
        </div>

        {/* My CleanTips Section */}
        {myCleanTips.length > 0 && (
          <Card className="p-6 mt-8 glow-green">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-[#1DB954] to-[#22C55E] rounded-xl flex items-center justify-center glow-green">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">My CleanTips</h2>
                  <p className="text-sm text-gray-400">
                    {myCleanTips.length} {myCleanTips.length === 1 ? 'post' : 'posts'} • ₹{totalTipsReceived.toLocaleString()} total tips received
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => router.push('/cleantips')}
                >
                  View All
                </Button>
                <Button
                  size="sm"
                  onClick={() => router.push('/cleantips/create')}
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Create CleanTip
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {myCleanTips.map((tip) => (
                <div
                  key={tip.id}
                  className="glass-light rounded-2xl overflow-hidden hover:bg-white/10 transition-all cursor-pointer group"
                  onClick={() => router.push(`/cleantips/${tip.id}`)}
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={tip.afterPhoto}
                      alt={tip.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-white line-clamp-2 mb-2">{tip.title}</h3>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-sm">
                        <Heart className="w-4 h-4 text-[#4ADE80]" />
                        <span className="font-medium text-[#4ADE80]">₹{tip.totalTips.toLocaleString()}</span>
                      </div>
                      <span className="text-xs text-gray-500">
                        {tip.tipperCount} {tip.tipperCount === 1 ? 'tipper' : 'tippers'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* CleanTips CTA for users with no posts */}
        {myCleanTips.length === 0 && (
          <Card className="p-8 mt-8 glass-heavy border-2 border-dashed border-[#1DB954]/30">
            <div className="text-center max-w-2xl mx-auto">
              <div className="w-16 h-16 bg-gradient-to-br from-[#1DB954] to-[#22C55E] rounded-2xl flex items-center justify-center mx-auto mb-4 glow-green">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Share Your Cleanup Story!</h3>
              <p className="text-gray-400 mb-6">
                Have you cleaned up your neighborhood? Share your before/after photos on CleanTips and receive tips from the community to support your efforts.
              </p>
              <div className="flex gap-3 justify-center">
                <Button
                  variant="outline"
                  onClick={() => router.push('/cleantips')}
                >
                  Browse CleanTips
                </Button>
                <Button
                  onClick={() => router.push('/cleantips/create')}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create Your First CleanTip
                </Button>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}