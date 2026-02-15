'use client';

import { useRouter } from 'next/navigation';
import Navbar from '../components/Navbar';
import CampaignCard from '../components/CampaignCard';
import { Button } from '../components/ui/button';
import { Recycle, Users, Target, TrendingUp } from 'lucide-react';
import { mockCampaigns } from '../data/mockData';

export default function HomePage() {
  const router = useRouter();
  const featuredCampaigns = mockCampaigns.filter(c => c.status === 'active').slice(0, 3);

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Geometric Pattern Background */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="hexagons" x="0" y="0" width="100" height="87" patternUnits="userSpaceOnUse">
                <path d="M25 0 L75 0 L100 43.5 L75 87 L25 87 L0 43.5 Z" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="1"
                      className="text-[#4ADE80]" />
              </pattern>
              <pattern id="triangles" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
                <path d="M40 0 L80 80 L0 80 Z" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="1"
                      className="text-[#00F0FF]" 
                      opacity="0.5" />
              </pattern>
            </defs>
            <rect x="0" y="0" width="100%" height="100%" fill="url(#hexagons)" />
            <rect x="0" y="0" width="100%" height="100%" fill="url(#triangles)" />
          </svg>
        </div>
        
        {/* Ambient glow effects */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#1DB954] rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#4ADE80] rounded-full blur-[120px]" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <div className="inline-block mb-6 px-4 py-2 glass rounded-full">
            <p className="text-[#4ADE80] text-sm font-medium">🌱 Join India's Cleanup Movement</p>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="text-gradient">Clean Cities,</span>
            <br />
            <span className="text-white">Together</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-gray-300">
            Gamifying India's cleanup movement through incentives and community impact. 
            Join thousands of eco-warriors making a real difference, one cleanup at a time.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => router.push('/register')}
              className="text-lg px-8"
            >
              Join the Mission
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => router.push('/campaigns')}
              className="text-lg px-8"
            >
              Start a Cleanup
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-2xl glass glow-green flex items-center justify-center">
                <Recycle className="w-10 h-10 text-[#4ADE80]" />
              </div>
              <div className="text-3xl font-bold text-white mb-1">2M+</div>
              <div className="text-gray-400">Kgs Collected</div>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-2xl glass glow-green flex items-center justify-center">
                <Users className="w-10 h-10 text-[#4ADE80]" />
              </div>
              <div className="text-3xl font-bold text-white mb-1">2,500+</div>
              <div className="text-gray-400">Volunteers</div>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-2xl glass glow-green flex items-center justify-center">
                <Target className="w-10 h-10 text-[#4ADE80]" />
              </div>
              <div className="text-3xl font-bold text-white mb-1">8,161+</div>
              <div className="text-gray-400">Cleanups</div>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-2xl glass glow-green flex items-center justify-center">
                <TrendingUp className="w-10 h-10 text-[#4ADE80]" />
              </div>
              <div className="text-3xl font-bold text-white mb-1">79.1%</div>
              <div className="text-gray-400">Impact Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Campaigns */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Running Campaigns</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Join active cleanup missions across India. Every contribution makes a difference.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {featuredCampaigns.map((campaign) => (
              <CampaignCard key={campaign.id} {...campaign} />
            ))}
          </div>
          <div className="text-center">
            <Button
              size="lg"
              variant="outline"
              onClick={() => router.push('/campaigns')}
            >
              View All Campaigns
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 relative">
        {/* Subtle glow */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#22C55E] rounded-full blur-[120px]" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">How It Works</h2>
            <p className="text-xl text-gray-400">Simple steps to make a big impact</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Step 1 */}
            <div className="text-center glass p-8 rounded-2xl glow-green hover-lift">
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[#1DB954] to-[#22C55E] text-white flex items-center justify-center text-2xl font-bold glow-green">
                1
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Create a Campaign</h3>
              <p className="text-gray-400 text-lg">
                Spot a dirty area that needs cleaning? Post campaign details with photos, location, and funding goal.
              </p>
            </div>
            {/* Step 2 */}
            <div className="text-center glass p-8 rounded-2xl glow-green hover-lift">
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[#1DB954] to-[#22C55E] text-white flex items-center justify-center text-2xl font-bold glow-green">
                2
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Citizens Contribute</h3>
              <p className="text-gray-400 text-lg">
                Community members fund the cleanup campaign. Track progress as contributions reach the goal.
              </p>
            </div>
            {/* Step 3 */}
            <div className="text-center glass p-8 rounded-2xl glow-green hover-lift">
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[#1DB954] to-[#22C55E] text-white flex items-center justify-center text-2xl font-bold glow-green">
                3
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Cleaners Get Paid</h3>
              <p className="text-gray-400 text-lg">
                Verified cleaners complete the job, upload photos for verification, and receive payment directly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#1DB954]/20 to-[#22C55E]/20" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#4ADE80] rounded-full blur-[150px] opacity-20" />
        </div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center glass-heavy p-12 rounded-3xl glow-green-strong">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl mb-8 text-gray-300">
            Join our community of changemakers and help build cleaner, greener cities across India.
          </p>
          <Button
            size="lg"
            onClick={() => router.push('/register')}
            className="text-lg px-12"
          >
            Get Started Today
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="glass border-t border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4 text-white">Cleanit</h3>
              <p className="text-gray-400">
                Turning cleanups into community wins across India.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Platform</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-[#4ADE80] transition-colors">How It Works</a></li>
                <li><a href="#" className="hover:text-[#4ADE80] transition-colors">Campaigns</a></li>
                <li><a href="#" className="hover:text-[#4ADE80] transition-colors">Join as Cleaner</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-[#4ADE80] transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-[#4ADE80] transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-[#4ADE80] transition-colors">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-[#4ADE80] transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-[#4ADE80] transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-[#4ADE80] transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 text-center text-gray-500">
            <p>&copy; 2025 Cleanit. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}