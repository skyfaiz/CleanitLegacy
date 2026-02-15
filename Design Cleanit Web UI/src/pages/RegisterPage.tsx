'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card } from '../components/ui/card';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { toast } from 'sonner';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'citizen' | 'cleaner'>('citizen');
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      register(name, email, phone, password, role);
      toast.success('Account created successfully!');
      router.push('/dashboard');
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Ambient glow effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-[#1DB954] rounded-full blur-[120px]" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-[#4ADE80] rounded-full blur-[120px]" />
      </div>
      
      <Card className="w-full max-w-md p-8 relative glass-heavy glow-green-strong">
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[#1DB954] to-[#22C55E] rounded-2xl flex items-center justify-center glow-green">
            <span className="text-white font-bold text-2xl">C</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Join Cleanit</h1>
          <p className="text-gray-400">Create your account to get started</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-gray-300">Full Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-300">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-gray-300">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+91 98765 43210"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-gray-300">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full"
            />
          </div>

          {/* Role Selection */}
          <div className="space-y-3">
            <Label className="text-gray-300">I want to join as:</Label>
            <RadioGroup value={role} onValueChange={(value) => setRole(value as 'citizen' | 'cleaner')}>
              <div className="flex items-start space-x-3 p-4 glass-light rounded-xl hover:bg-white/10 transition-colors cursor-pointer border border-white/10">
                <RadioGroupItem value="citizen" id="citizen" className="mt-0.5" />
                <div className="flex-1">
                  <Label htmlFor="citizen" className="cursor-pointer font-semibold text-white">
                    Citizen / Donor
                  </Label>
                  <p className="text-sm text-gray-400 mt-1">
                    Create campaigns and contribute funds to cleanup initiatives in your community.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-4 glass-light rounded-xl hover:bg-white/10 transition-colors cursor-pointer border border-white/10">
                <RadioGroupItem value="cleaner" id="cleaner" className="mt-0.5" />
                <div className="flex-1">
                  <Label htmlFor="cleaner" className="cursor-pointer font-semibold text-white">
                    Cleaner
                  </Label>
                  <p className="text-sm text-gray-400 mt-1">
                    Find paid cleanup jobs, complete them, and earn money while making an environmental impact.
                  </p>
                </div>
              </div>
            </RadioGroup>
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </Button>
        </form>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-gray-400">
            Already have an account?{' '}
            <Link href="/login" className="text-[#4ADE80] hover:underline font-semibold">
              Sign in
            </Link>
          </p>
        </div>

        <div className="text-center pt-4 border-t border-white/10 mt-6">
          <Link href="/" className="text-gray-400 hover:text-white text-sm transition-colors">
            ← Back to Home
          </Link>
        </div>
      </Card>
    </div>
  );
}