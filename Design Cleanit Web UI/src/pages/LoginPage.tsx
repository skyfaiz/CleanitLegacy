'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card } from '../components/ui/card';
import { toast } from 'sonner';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      // Demo accounts for easy testing
      let role = 'citizen';
      if (email === 'admin@cleanit.com') role = 'admin';
      else if (email === 'cleaner@example.com') role = 'cleaner';

      login(email, password, role);
      toast.success('Welcome back!');
      
      // Redirect based on role
      if (role === 'admin') {
        router.push('/admin');
      } else {
        router.push('/dashboard');
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
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
          <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-gray-400">Sign in to continue to Cleanit</p>
        </div>

        {/* Demo Accounts Info */}
        <div className="glass-light border border-[#4ADE80]/30 rounded-xl p-4 text-sm mb-6">
          <p className="font-semibold text-[#4ADE80] mb-2">Demo Accounts:</p>
          <ul className="space-y-1 text-gray-300">
            <li>• Admin: admin@cleanit.com</li>
            <li>• Cleaner: cleaner@example.com</li>
            <li>• Citizen: Any other email</li>
            <li className="text-xs text-gray-400 mt-2">Password: anything</li>
          </ul>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
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
            <Label htmlFor="password" className="text-gray-300">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full"
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-gray-400">
            Don't have an account?{' '}
            <Link href="/register" className="text-[#4ADE80] hover:underline font-semibold">
              Create account
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