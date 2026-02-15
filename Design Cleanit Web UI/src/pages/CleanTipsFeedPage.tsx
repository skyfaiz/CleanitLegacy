'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../components/Navbar';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { mockCleanTips } from '../data/mockData';
import { MapPin, Heart, Users, Plus } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function CleanTipsFeedPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [sortBy, setSortBy] = useState('newest');

  const sortedCleanTips = [...mockCleanTips].sort((a, b) => {
    if (sortBy === 'newest') {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    } else if (sortBy === 'most-tipped') {
      return b.totalTips - a.totalTips;
    }
    return 0;
  });

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">CleanTips</h1>
            <p className="text-gray-600 mt-1">Support cleaners who make a difference in our communities</p>
          </div>
          {user && (
            <Button
              onClick={() => router.push('/cleantips/create')}
              className="bg-gradient-to-r from-[#0099CC] to-[#22C55E] hover:opacity-90"
            >
              <Plus className="w-4 h-4 mr-2" />
              Share Your Cleanup
            </Button>
          )}
        </div>

        {/* Filters */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-sm text-gray-600">
            {sortedCleanTips.length} cleanup {sortedCleanTips.length === 1 ? 'story' : 'stories'}
          </p>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Sort by:</span>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="most-tipped">Most Tipped</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* CleanTips Grid */}
        {sortedCleanTips.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedCleanTips.map((tip) => (
              <Card
                key={tip.id}
                className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => router.push(`/cleantips/${tip.id}`)}
              >
                {/* Image */}
                <div className="aspect-[4/3] overflow-hidden bg-gray-100">
                  <img
                    src={tip.afterPhoto}
                    alt={tip.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Content */}
                <div className="p-5">
                  {/* Title */}
                  <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2">
                    {tip.title}
                  </h3>

                  {/* Location */}
                  <div className="flex items-center text-sm text-gray-600 mb-3">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{tip.location}</span>
                  </div>

                  {/* Creator */}
                  <div className="flex items-center gap-2 mb-4">
                    <img
                      src={tip.creator.avatar}
                      alt={tip.creator.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="text-sm text-gray-700">{tip.creator.name}</span>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Heart className="w-4 h-4 text-[#22C55E]" />
                        <span className="font-medium text-gray-900">₹{tip.totalTips.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{tip.tipperCount} {tip.tipperCount === 1 ? 'tipper' : 'tippers'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Tip Button */}
                  <Button
                    className="w-full bg-gradient-to-r from-[#0099CC] to-[#22C55E] hover:opacity-90"
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(`/cleantips/${tip.id}`);
                    }}
                  >
                    <Heart className="w-4 h-4 mr-2" />
                    Tip this Cleaner
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No CleanTips Yet</h3>
              <p className="text-gray-600 mb-6">
                Be the first to share your cleanup story and inspire others!
              </p>
              {user && (
                <Button
                  onClick={() => router.push('/cleantips/create')}
                  className="bg-gradient-to-r from-[#0099CC] to-[#22C55E] hover:opacity-90"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Share Your Cleanup
                </Button>
              )}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}