'use client';

import { MapPin, Clock } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { useRouter } from 'next/navigation';

interface CampaignCardProps {
  id: string;
  title: string;
  location: string;
  image: string;
  raised: number;
  goal: number;
  status: 'active' | 'funded' | 'completed' | 'expired';
  daysLeft?: number;
}

export default function CampaignCard({
  id,
  title,
  location,
  image,
  raised,
  goal,
  status,
  daysLeft,
}: CampaignCardProps) {
  const router = useRouter();
  const progress = Math.min((raised / goal) * 100, 100);

  const statusColors = {
    active: 'bg-[#0099CC]',
    funded: 'bg-[#22C55E]',
    completed: 'bg-gray-600',
    expired: 'bg-red-500',
  };

  const statusLabels = {
    active: 'Active',
    funded: 'Funded',
    completed: 'Completed',
    expired: 'Expired',
  };

  return (
    <div className="glass rounded-2xl overflow-hidden hover-lift cursor-pointer group transition-all duration-300 hover:shadow-[0_0_30px_rgba(74,222,128,0.3)]">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        <Badge className={`absolute top-3 right-3 ${statusColors[status]} text-white border-0`}>
          {statusLabels[status]}
        </Badge>
      </div>

      {/* Content */}
      <div className="p-5 space-y-4">
        {/* Location */}
        <div className="flex items-center text-gray-400 text-sm">
          <MapPin className="h-4 w-4 mr-1.5 text-[#4ADE80]" />
          <span>{location}</span>
        </div>

        {/* Title */}
        <h3 className="font-semibold text-lg text-white line-clamp-2">{title}</h3>

        {/* Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Collected: ₹{raised.toLocaleString()}</span>
            <span className="text-gray-400">Goal: ₹{goal.toLocaleString()}</span>
          </div>
          <Progress value={progress} className="h-2" />
          <div className="text-right text-xs text-gray-500">{Math.round(progress)}% funded</div>
        </div>

        {/* Days Left */}
        {daysLeft !== undefined && status === 'active' && (
          <div className="flex items-center text-[#4ADE80] text-sm">
            <Clock className="h-4 w-4 mr-1.5" />
            <span>{daysLeft} days left</span>
          </div>
        )}

        {/* Button */}
        <Button
          onClick={() => router.push(`/campaigns/${id}`)}
          className="w-full"
        >
          View Campaign
        </Button>
      </div>
    </div>
  );
}