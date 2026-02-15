'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Navbar from '../components/Navbar';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { mockCleanTips } from '../data/mockData';
import { MapPin, Heart, Users, Calendar, ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner';

export default function CleanTipDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const [tipAmount, setTipAmount] = useState('');
  const [showBefore, setShowBefore] = useState(false);

  const cleanTip = mockCleanTips.find((tip) => tip.id === id);

  if (!cleanTip) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h1 className="text-2xl font-bold text-gray-900">CleanTip not found</h1>
          <Button onClick={() => router.push('/cleantips')} className="mt-4">
            Back to CleanTips
          </Button>
        </div>
      </div>
    );
  }

  const handleTip = () => {
    if (!user) {
      toast.error('Please log in to tip this cleaner');
      router.push('/login');
      return;
    }

    const amount = parseFloat(tipAmount);
    if (!amount || amount <= 0) {
      toast.error('Please enter a valid tip amount');
      return;
    }

    toast.success(`Thank you for tipping ₹${amount.toLocaleString()}!`);
    setTipAmount('');
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => router.push('/cleantips')}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to CleanTips
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-3">{cleanTip.title}</h1>
              <div className="flex items-center gap-4 text-gray-600">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{cleanTip.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(cleanTip.createdAt)}</span>
                </div>
              </div>
            </div>

            {/* Creator Info */}
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <img
                  src={cleanTip.creator.avatar}
                  alt={cleanTip.creator.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <p className="text-sm text-gray-600">Completed by</p>
                  <p className="font-semibold text-gray-900">{cleanTip.creator.name}</p>
                </div>
              </div>
            </Card>

            {/* Before/After Photos */}
            <Card className="overflow-hidden">
              <div className="relative aspect-[16/10] bg-gray-100">
                <img
                  src={showBefore ? cleanTip.beforePhoto : cleanTip.afterPhoto}
                  alt={showBefore ? 'Before cleanup' : 'After cleanup'}
                  className="w-full h-full object-cover"
                />
                
                {/* Photo Toggle */}
                <div className="absolute top-4 right-4 flex gap-2">
                  <Button
                    variant={!showBefore ? 'default' : 'secondary'}
                    size="sm"
                    onClick={() => setShowBefore(false)}
                    className={!showBefore ? 'bg-[#22C55E]' : ''}
                  >
                    After
                  </Button>
                  <Button
                    variant={showBefore ? 'default' : 'secondary'}
                    size="sm"
                    onClick={() => setShowBefore(true)}
                    className={showBefore ? 'bg-[#0099CC]' : ''}
                  >
                    Before
                  </Button>
                </div>

                {/* Navigation Arrows */}
                <button
                  onClick={() => setShowBefore(!showBefore)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setShowBefore(!showBefore)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                {/* Label */}
                <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1.5 rounded-lg text-sm font-medium">
                  {showBefore ? 'Before Cleanup' : 'After Cleanup'}
                </div>
              </div>
            </Card>

            {/* Story/Description */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">The Story</h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {cleanTip.description}
              </p>
            </Card>

            {/* Map Preview Placeholder */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Location</h2>
              <div className="aspect-[16/9] bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600">{cleanTip.location}</p>
                  <p className="text-sm text-gray-500 mt-1">Map preview</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Tip Panel */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Card className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Support This Cleanup</h2>

                {/* Stats */}
                <div className="bg-gradient-to-br from-[#0099CC]/10 to-[#22C55E]/10 rounded-lg p-4 mb-4">
                  <div className="text-center mb-3">
                    <p className="text-sm text-gray-600 mb-1">Total Tips Raised</p>
                    <p className="text-3xl font-bold bg-gradient-to-r from-[#0099CC] to-[#22C55E] bg-clip-text text-transparent">
                      ₹{cleanTip.totalTips.toLocaleString()}
                    </p>
                  </div>
                  <div className="flex items-center justify-center gap-1 text-sm text-gray-600">
                    <Users className="w-4 h-4" />
                    <span>
                      {cleanTip.tipperCount} {cleanTip.tipperCount === 1 ? 'person has' : 'people have'} tipped this cleanup
                    </span>
                  </div>
                </div>

                {/* Tip Input */}
                <div className="space-y-4 mb-6">
                  <div>
                    <Label htmlFor="tip-amount">Enter Tip Amount</Label>
                    <div className="relative mt-2">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                      <Input
                        id="tip-amount"
                        type="number"
                        placeholder="100"
                        value={tipAmount}
                        onChange={(e) => setTipAmount(e.target.value)}
                        className="pl-7"
                        min="1"
                      />
                    </div>
                  </div>

                  {/* Quick Amount Buttons */}
                  <div className="grid grid-cols-3 gap-2">
                    {[50, 100, 200, 500, 1000, 2000].map((amount) => (
                      <Button
                        key={amount}
                        variant="outline"
                        size="sm"
                        onClick={() => setTipAmount(amount.toString())}
                        className="hover:border-[#0099CC] hover:text-[#0099CC]"
                      >
                        ₹{amount}
                      </Button>
                    ))}
                  </div>

                  <Button
                    onClick={handleTip}
                    className="w-full bg-gradient-to-r from-[#0099CC] to-[#22C55E] hover:opacity-90"
                    size="lg"
                  >
                    <Heart className="w-5 h-5 mr-2" />
                    Tip This Cleaner
                  </Button>
                </div>

                {/* Recent Tippers */}
                {cleanTip.recentTippers && cleanTip.recentTippers.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Recent Tippers</h3>
                    <div className="space-y-2">
                      {cleanTip.recentTippers.map((tipper, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between py-2 border-b last:border-0"
                        >
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gradient-to-br from-[#0099CC] to-[#22C55E] rounded-full flex items-center justify-center text-white text-xs font-medium">
                              {tipper.name.charAt(0)}
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">{tipper.name}</p>
                              <p className="text-xs text-gray-500">
                                {new Date(tipper.date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}
                              </p>
                            </div>
                          </div>
                          <span className="text-sm font-semibold text-[#22C55E]">
                            ₹{tipper.amount}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}