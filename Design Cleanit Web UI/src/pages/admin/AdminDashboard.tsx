'use client';

import Navbar from '../../components/Navbar';
import { Card } from '../../components/ui/card';
import { TrendingUp, Users, DollarSign, Briefcase, Activity } from 'lucide-react';
import { mockCampaigns, mockJobs, mockUsers } from '../../data/mockData';
import { Badge } from '../../components/ui/badge';

export default function AdminDashboard() {
  const totalCampaigns = mockCampaigns.length;
  const activeCampaigns = mockCampaigns.filter((c) => c.status === 'active').length;
  const totalRaised = mockCampaigns.reduce((sum, c) => sum + c.raised, 0);
  const totalContributions = mockCampaigns.reduce((sum, c) => sum + c.contributors, 0);
  const pendingJobs = mockJobs.filter((j) => j.status === 'completed').length;
  const completedJobs = mockJobs.filter((j) => j.status === 'verified').length;
  const totalUsers = mockUsers.length;

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">Platform overview and management</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Campaigns</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{totalCampaigns}</p>
                <p className="text-xs text-gray-500 mt-1">{activeCampaigns} active</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-[#0099CC]" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Contributions</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{totalContributions}</p>
                <p className="text-xs text-gray-500 mt-1">from all campaigns</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Activity className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Amount Raised</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">
                  ₹{(totalRaised / 100000).toFixed(1)}L
                </p>
                <p className="text-xs text-gray-500 mt-1">total funding</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-[#22C55E]" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Jobs</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">
                  {pendingJobs + completedJobs}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {pendingJobs} pending, {completedJobs} done
                </p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Campaigns */}
          <Card className="p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Campaigns</h2>
            <div className="space-y-4">
              {mockCampaigns.slice(0, 5).map((campaign) => (
                <div
                  key={campaign.id}
                  className="flex items-start space-x-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <img
                    src={campaign.image}
                    alt={campaign.title}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 truncate">{campaign.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{campaign.location}</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <Badge
                        variant={campaign.status === 'active' ? 'default' : 'secondary'}
                        className={campaign.status === 'active' ? 'bg-[#22C55E]' : ''}
                      >
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

          {/* User Stats */}
          <Card className="p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">User Statistics</h2>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Users</p>
                  <p className="text-2xl font-bold text-gray-900">{totalUsers}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-[#0099CC]" />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-[#22C55E] rounded-full"></div>
                    <span className="text-sm text-gray-700">Citizens / Donors</span>
                  </div>
                  <span className="font-semibold text-gray-900">
                    {mockUsers.filter((u) => u.role === 'citizen').length}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-[#0099CC] rounded-full"></div>
                    <span className="text-sm text-gray-700">Cleaners</span>
                  </div>
                  <span className="font-semibold text-gray-900">
                    {mockUsers.filter((u) => u.role === 'cleaner').length}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                    <span className="text-sm text-gray-700">Admins</span>
                  </div>
                  <span className="font-semibold text-gray-900">
                    {mockUsers.filter((u) => u.role === 'admin').length}
                  </span>
                </div>
              </div>

              <div className="pt-6 border-t">
                <h3 className="font-semibold text-gray-900 mb-3">Growth Metrics</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">New users this month</span>
                    <span className="font-semibold text-[#22C55E]">+24</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Active this week</span>
                    <span className="font-semibold text-gray-900">18</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}