'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { Button } from './ui/button';
import { Bell, User, LogOut, LayoutDashboard, Briefcase, Home, Heart, Menu, Sun, Moon } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Badge } from './ui/badge';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { useState } from 'react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const isAdminRoute = pathname?.startsWith('/admin') || false;

  return (
    <nav className="glass sticky top-0 z-50 border-b border-white/10 shadow-lg backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-[#1DB954] to-[#22C55E] rounded-xl flex items-center justify-center shadow-lg cyber-glow-pulse transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
              <span className="text-white font-bold text-xl relative z-10">C</span>
            </div>
            <span className="text-2xl font-bold text-gradient relative">
              Cleanit
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#4ADE80] to-[#00F0FF] group-hover:w-full transition-all duration-300" />
            </span>
          </Link>

          {/* Navigation Links */}
          {!isAdminRoute && (
            <div className="hidden md:flex items-center space-x-8">
              <Link
                href="/"
                className="text-gray-300 hover:text-[#4ADE80] transition-all duration-300 font-medium relative group"
              >
                Home
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#4ADE80] group-hover:w-full transition-all duration-300 shadow-[0_0_10px_rgba(74,222,128,0.5)]" />
              </Link>
              <Link
                href="/campaigns"
                className="text-gray-300 hover:text-[#4ADE80] transition-all duration-300 font-medium relative group"
              >
                Campaigns
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#4ADE80] group-hover:w-full transition-all duration-300 shadow-[0_0_10px_rgba(74,222,128,0.5)]" />
              </Link>
              <Link
                href="/cleantips"
                className="text-gray-300 hover:text-[#00F0FF] transition-all duration-300 font-medium relative group"
              >
                CleanTips
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#00F0FF] group-hover:w-full transition-all duration-300 shadow-[0_0_10px_rgba(0,240,255,0.5)]" />
              </Link>
              {user && user.role === 'cleaner' && (
                <Link
                  href="/jobs/available"
                  className="text-gray-300 hover:text-[#4ADE80] transition-all duration-300 font-medium relative group"
                >
                  Jobs
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#4ADE80] group-hover:w-full transition-all duration-300 shadow-[0_0_10px_rgba(74,222,128,0.5)]" />
                </Link>
              )}
            </div>
          )}

          {/* Admin Navigation */}
          {isAdminRoute && (
            <div className="hidden md:flex items-center space-x-6">
              <Link
                href="/admin"
                className="text-gray-300 hover:text-[#4ADE80] transition-colors font-medium"
              >
                Overview
              </Link>
              <Link
                href="/admin/campaigns"
                className="text-gray-300 hover:text-[#4ADE80] transition-colors font-medium"
              >
                Campaigns
              </Link>
              <Link
                href="/admin/cleantips"
                className="text-gray-300 hover:text-[#4ADE80] transition-colors font-medium"
              >
                CleanTips
              </Link>
              <Link
                href="/admin/users"
                className="text-gray-300 hover:text-[#4ADE80] transition-colors font-medium"
              >
                Users
              </Link>
              <Link
                href="/admin/verify-jobs"
                className="text-gray-300 hover:text-[#4ADE80] transition-colors font-medium"
              >
                Verify Jobs
              </Link>
              <Link
                href="/admin/payouts"
                className="text-gray-300 hover:text-[#4ADE80] transition-colors font-medium"
              >
                Payouts
              </Link>
            </div>
          )}

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="transition-all duration-300"
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5 text-yellow-500" />
              ) : (
                <Moon className="h-5 w-5 text-blue-500" />
              )}
            </Button>
            
            {/* Mobile Menu */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col space-y-4 mt-8">
                  {!isAdminRoute && (
                    <>
                      <Link
                        href="/"
                        className="text-lg font-medium text-gray-300 hover:text-[#4ADE80] transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Home
                      </Link>
                      <Link
                        href="/campaigns"
                        className="text-lg font-medium text-gray-300 hover:text-[#4ADE80] transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Campaigns
                      </Link>
                      <Link
                        href="/cleantips"
                        className="text-lg font-medium text-gray-300 hover:text-[#00F0FF] transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        CleanTips
                      </Link>
                      {user && user.role === 'cleaner' && (
                        <Link
                          href="/jobs/available"
                          className="text-lg font-medium text-gray-300 hover:text-[#4ADE80] transition-colors"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Jobs
                        </Link>
                      )}
                    </>
                  )}
                  {isAdminRoute && (
                    <>
                      <Link
                        href="/admin"
                        className="text-lg font-medium text-gray-300 hover:text-[#4ADE80] transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Overview
                      </Link>
                      <Link
                        href="/admin/campaigns"
                        className="text-lg font-medium text-gray-300 hover:text-[#4ADE80] transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Campaigns
                      </Link>
                      <Link
                        href="/admin/cleantips"
                        className="text-lg font-medium text-gray-300 hover:text-[#4ADE80] transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        CleanTips
                      </Link>
                      <Link
                        href="/admin/users"
                        className="text-lg font-medium text-gray-300 hover:text-[#4ADE80] transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Users
                      </Link>
                      <Link
                        href="/admin/verify-jobs"
                        className="text-lg font-medium text-gray-300 hover:text-[#4ADE80] transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Verify Jobs
                      </Link>
                      <Link
                        href="/admin/payouts"
                        className="text-lg font-medium text-gray-300 hover:text-[#4ADE80] transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Payouts
                      </Link>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
            
            {user ? (
              <>
                {/* Notifications */}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => router.push('/notifications')}
                  className="relative"
                >
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </Button>

                {/* User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center space-x-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#0099CC] to-[#22C55E] flex items-center justify-center">
                        {user.avatar ? (
                          <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full" />
                        ) : (
                          <User className="h-5 w-5 text-white" />
                        )}
                      </div>
                      <span className="hidden md:block">{user.name}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <div className="px-2 py-1.5">
                      <p className="text-sm font-medium">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                      <Badge className="mt-1" variant={user.role === 'admin' ? 'default' : 'secondary'}>
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </Badge>
                    </div>
                    <DropdownMenuSeparator />
                    {!isAdminRoute && (
                      <>
                        <DropdownMenuItem onClick={() => router.push('/dashboard')}>
                          <LayoutDashboard className="mr-2 h-4 w-4" />
                          Dashboard
                        </DropdownMenuItem>
                        {user.role === 'cleaner' && (
                          <DropdownMenuItem onClick={() => router.push('/jobs/my-jobs')}>
                            <Briefcase className="mr-2 h-4 w-4" />
                            My Jobs
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem onClick={() => router.push('/profile')}>
                          <User className="mr-2 h-4 w-4" />
                          Profile
                        </DropdownMenuItem>
                      </>
                    )}
                    {user.role === 'admin' && !isAdminRoute && (
                      <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => router.push('/admin')}>
                          <LayoutDashboard className="mr-2 h-4 w-4" />
                          Admin Dashboard
                        </DropdownMenuItem>
                      </>
                    )}
                    {isAdminRoute && (
                      <DropdownMenuItem onClick={() => router.push('/dashboard')}>
                        <Home className="mr-2 h-4 w-4" />
                        Back to Main App
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Button variant="ghost" onClick={() => router.push('/login')}>
                  Login
                </Button>
                <Button
                  onClick={() => router.push('/register')}
                  className="bg-gradient-to-r from-[#0099CC] to-[#22C55E] hover:opacity-90"
                >
                  Get Started
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}