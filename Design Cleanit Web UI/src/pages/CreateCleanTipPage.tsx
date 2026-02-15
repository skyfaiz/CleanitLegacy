'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../components/Navbar';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { ArrowLeft, Upload, Info, ImageIcon } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner';

export default function CreateCleanTipPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
  });
  const [beforePhoto, setBeforePhoto] = useState<string | null>(null);
  const [afterPhoto, setAfterPhoto] = useState<string | null>(null);

  if (!user) {
    router.push('/login');
    return null;
  }

  const handlePhotoUpload = (type: 'before' | 'after', event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // In a real app, this would upload to a server
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === 'before') {
          setBeforePhoto(reader.result as string);
        } else {
          setAfterPhoto(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.title.trim()) {
      toast.error('Please enter a title');
      return;
    }
    if (!formData.description.trim()) {
      toast.error('Please enter a description');
      return;
    }
    if (!formData.location.trim()) {
      toast.error('Please enter a location');
      return;
    }
    if (!beforePhoto || !afterPhoto) {
      toast.error('Please upload both before and after photos');
      return;
    }

    // In a real app, this would submit to API
    toast.success('CleanTip published successfully!');
    
    // Redirect to the feed (in real app, would go to the new CleanTip detail page)
    setTimeout(() => {
      router.push('/cleantips');
    }, 1000);
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => router.push('/cleantips')}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to CleanTips
        </Button>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Share Your Cleanup</h1>
          <p className="text-gray-600">
            Tell your cleanup story and receive tips from the community
          </p>
        </div>

        {/* Tips Card */}
        <Card className="p-4 mb-6 bg-blue-50 border-blue-200">
          <div className="flex gap-3">
            <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Tips for a great CleanTip post</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Use high-quality before/after photos that clearly show the transformation</li>
                <li>• Write a detailed description of what was cleaned and how you did it</li>
                <li>• Be specific about the location to inspire local action</li>
                <li>• Share any challenges you faced and how you overcame them</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <Card className="p-6 mb-6">
            <div className="space-y-6">
              {/* Title */}
              <div>
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  placeholder="e.g., Cleaned up park near my neighborhood"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="mt-2"
                  maxLength={100}
                />
                <p className="text-xs text-gray-500 mt-1">{formData.title.length}/100 characters</p>
              </div>

              {/* Description */}
              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Describe what was dirty before, what you cleaned, how long it took, and the impact it had..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="mt-2 min-h-[150px]"
                  maxLength={1000}
                />
                <p className="text-xs text-gray-500 mt-1">{formData.description.length}/1000 characters</p>
              </div>

              {/* Location */}
              <div>
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  placeholder="e.g., Koramangala, Bangalore"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="mt-2"
                />
              </div>
            </div>
          </Card>

          {/* Photos */}
          <Card className="p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Photos *</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Before Photo */}
              <div>
                <Label className="mb-2 block">Before Photo</Label>
                <div className="relative aspect-[4/3] bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 hover:border-[#0099CC] transition-colors">
                  {beforePhoto ? (
                    <div className="relative w-full h-full">
                      <img
                        src={beforePhoto}
                        alt="Before cleanup"
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <Button
                        type="button"
                        variant="secondary"
                        size="sm"
                        className="absolute top-2 right-2"
                        onClick={() => setBeforePhoto(null)}
                      >
                        Change
                      </Button>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer">
                      <ImageIcon className="w-12 h-12 text-gray-400 mb-2" />
                      <span className="text-sm text-gray-600 mb-1">Upload Before Photo</span>
                      <span className="text-xs text-gray-500">PNG, JPG up to 10MB</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handlePhotoUpload('before', e)}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              </div>

              {/* After Photo */}
              <div>
                <Label className="mb-2 block">After Photo</Label>
                <div className="relative aspect-[4/3] bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 hover:border-[#22C55E] transition-colors">
                  {afterPhoto ? (
                    <div className="relative w-full h-full">
                      <img
                        src={afterPhoto}
                        alt="After cleanup"
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <Button
                        type="button"
                        variant="secondary"
                        size="sm"
                        className="absolute top-2 right-2"
                        onClick={() => setAfterPhoto(null)}
                      >
                        Change
                      </Button>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer">
                      <ImageIcon className="w-12 h-12 text-gray-400 mb-2" />
                      <span className="text-sm text-gray-600 mb-1">Upload After Photo</span>
                      <span className="text-xs text-gray-500">PNG, JPG up to 10MB</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handlePhotoUpload('after', e)}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              </div>
            </div>
          </Card>

          {/* Submit */}
          <div className="flex gap-4 justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push('/cleantips')}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-gradient-to-r from-[#0099CC] to-[#22C55E] hover:opacity-90"
            >
              <Upload className="w-4 h-4 mr-2" />
              Publish CleanTip
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}