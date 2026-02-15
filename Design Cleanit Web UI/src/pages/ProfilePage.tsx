'use client';

import { useState } from 'react';
import Navbar from '../components/Navbar';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Badge } from '../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner';
import { User, Calendar } from 'lucide-react';

export default function ProfilePage() {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');

  if (!user) return null;

  const handleSave = () => {
    updateProfile({ name, phone });
    setIsEditing(false);
    toast.success('Profile updated successfully!');
  };

  const handleCancel = () => {
    setName(user.name);
    setPhone(user.phone);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
          <p className="text-gray-600 mt-1">Manage your account settings and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <Card className="p-6 lg:col-span-1 h-fit">
            <div className="text-center">
              <Avatar className="w-24 h-24 mx-auto mb-4">
                <AvatarImage src={user.avatar} />
                <AvatarFallback className="text-2xl">{user.name[0]}</AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-bold text-gray-900 mb-1">{user.name}</h2>
              <p className="text-gray-600 text-sm mb-3">{user.email}</p>
              <Badge
                className={
                  user.role === 'admin'
                    ? 'bg-purple-500'
                    : user.role === 'cleaner'
                    ? 'bg-[#0099CC]'
                    : 'bg-[#22C55E]'
                }
              >
                {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
              </Badge>

              <div className="mt-6 pt-6 border-t text-left space-y-3">
                <div className="flex items-center text-sm text-gray-600">
                  <User className="w-4 h-4 mr-2" />
                  <span>ID: {user.id}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>Joined: {new Date(user.joinedDate).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Details Card */}
          <Card className="p-6 lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Account Details</h2>
              {!isEditing ? (
                <Button
                  variant="outline"
                  onClick={() => setIsEditing(true)}
                  className="border-[#0099CC] text-[#0099CC]"
                >
                  Edit Profile
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button variant="outline" onClick={handleCancel}>
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSave}
                    className="bg-gradient-to-r from-[#0099CC] to-[#22C55E]"
                  >
                    Save Changes
                  </Button>
                </div>
              )}
            </div>

            <div className="space-y-6">
              {/* Name */}
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={!isEditing}
                  className="mt-1"
                />
              </div>

              {/* Email */}
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  value={user.email}
                  disabled
                  className="mt-1 bg-gray-100"
                />
                <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
              </div>

              {/* Phone */}
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  disabled={!isEditing}
                  className="mt-1"
                />
              </div>

              {/* Role */}
              <div>
                <Label htmlFor="role">Account Type</Label>
                <Input
                  id="role"
                  value={user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                  disabled
                  className="mt-1 bg-gray-100"
                />
                <p className="text-xs text-gray-500 mt-1">
                  {user.role === 'citizen'
                    ? 'Create campaigns and contribute to cleanup initiatives'
                    : user.role === 'cleaner'
                    ? 'Find and complete paid cleanup jobs'
                    : 'Platform administrator with full access'}
                </p>
              </div>

              {/* Member Since */}
              <div>
                <Label htmlFor="joined">Member Since</Label>
                <Input
                  id="joined"
                  value={new Date(user.joinedDate).toLocaleDateString('en-IN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                  disabled
                  className="mt-1 bg-gray-100"
                />
              </div>
            </div>
          </Card>
        </div>

        {/* Stats Card */}
        <Card className="p-6 mt-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Activity Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {user.role === 'citizen' && (
              <>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-3xl font-bold text-[#0099CC]">3</p>
                  <p className="text-gray-600 mt-1">Campaigns Created</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-3xl font-bold text-[#22C55E]">₹10,500</p>
                  <p className="text-gray-600 mt-1">Total Contributed</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-3xl font-bold text-purple-600">87%</p>
                  <p className="text-gray-600 mt-1">Impact Score</p>
                </div>
              </>
            )}
            {user.role === 'cleaner' && (
              <>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-3xl font-bold text-[#0099CC]">12</p>
                  <p className="text-gray-600 mt-1">Jobs Completed</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-3xl font-bold text-[#22C55E]">₹68,000</p>
                  <p className="text-gray-600 mt-1">Total Earned</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-3xl font-bold text-yellow-600">4.8</p>
                  <p className="text-gray-600 mt-1">Average Rating</p>
                </div>
              </>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}