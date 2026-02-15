'use client';

import { useState } from 'react';
import Navbar from '../../components/Navbar';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';
import { mockCleanTips } from '../../data/mockData';
import { Search, Eye, Ban, Trash2, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminCleanTips() {
  const [cleanTips, setCleanTips] = useState(mockCleanTips);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedTip, setSelectedTip] = useState<typeof mockCleanTips[0] | null>(null);

  const filteredTips = cleanTips.filter((tip) => {
    const matchesSearch =
      tip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tip.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tip.creator.name.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || tip.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const updateStatus = (id: string, newStatus: 'published' | 'hidden' | 'reported' | 'removed') => {
    setCleanTips((prev) =>
      prev.map((tip) => (tip.id === id ? { ...tip, status: newStatus } : tip))
    );
    toast.success(`CleanTip status updated to ${newStatus}`);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published':
        return <Badge className="bg-green-500">Published</Badge>;
      case 'hidden':
        return <Badge variant="secondary">Hidden</Badge>;
      case 'reported':
        return <Badge className="bg-yellow-500">Reported</Badge>;
      case 'removed':
        return <Badge variant="destructive">Removed</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-IN', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">CleanTip Management</h1>
          <p className="text-gray-600 mt-1">Monitor and manage CleanTip posts</p>
        </div>

        {/* Filters */}
        <Card className="p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search by title, location, or creator..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="hidden">Hidden</SelectItem>
                <SelectItem value="reported">Reported</SelectItem>
                <SelectItem value="removed">Removed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card className="p-4">
            <p className="text-sm text-gray-600 mb-1">Total CleanTips</p>
            <p className="text-2xl font-bold text-gray-900">{cleanTips.length}</p>
          </Card>
          <Card className="p-4">
            <p className="text-sm text-gray-600 mb-1">Published</p>
            <p className="text-2xl font-bold text-green-600">
              {cleanTips.filter((t) => t.status === 'published').length}
            </p>
          </Card>
          <Card className="p-4">
            <p className="text-sm text-gray-600 mb-1">Reported</p>
            <p className="text-2xl font-bold text-yellow-600">
              {cleanTips.filter((t) => t.status === 'reported').length}
            </p>
          </Card>
          <Card className="p-4">
            <p className="text-sm text-gray-600 mb-1">Total Tips Given</p>
            <p className="text-2xl font-bold text-[#22C55E]">
              ₹{cleanTips.reduce((sum, t) => sum + t.totalTips, 0).toLocaleString()}
            </p>
          </Card>
        </div>

        {/* Table */}
        <Card className="overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>CleanTip</TableHead>
                <TableHead>Creator</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Tips Received</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTips.length > 0 ? (
                filteredTips.map((tip) => (
                  <TableRow key={tip.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <img
                          src={tip.afterPhoto}
                          alt={tip.title}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div className="max-w-[200px]">
                          <p className="font-medium text-gray-900 truncate">{tip.title}</p>
                          <p className="text-xs text-gray-500">{tip.tipperCount} tippers</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <img
                          src={tip.creator.avatar}
                          alt={tip.creator.name}
                          className="w-8 h-8 rounded-full"
                        />
                        <span className="text-sm">{tip.creator.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-gray-600">{tip.location}</span>
                    </TableCell>
                    <TableCell>
                      <span className="font-semibold text-[#22C55E]">
                        ₹{tip.totalTips.toLocaleString()}
                      </span>
                    </TableCell>
                    <TableCell>{getStatusBadge(tip.status)}</TableCell>
                    <TableCell>
                      <span className="text-sm text-gray-600">{formatDate(tip.createdAt)}</span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setSelectedTip(tip)}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle>{selectedTip?.title}</DialogTitle>
                              <DialogDescription>CleanTip Details</DialogDescription>
                            </DialogHeader>
                            {selectedTip && (
                              <div className="space-y-4">
                                {/* Before/After Photos */}
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <p className="text-sm font-medium mb-2">Before</p>
                                    <img
                                      src={selectedTip.beforePhoto}
                                      alt="Before"
                                      className="w-full h-48 object-cover rounded-lg"
                                    />
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium mb-2">After</p>
                                    <img
                                      src={selectedTip.afterPhoto}
                                      alt="After"
                                      className="w-full h-48 object-cover rounded-lg"
                                    />
                                  </div>
                                </div>

                                {/* Details */}
                                <div className="space-y-2">
                                  <div>
                                    <p className="text-sm font-medium text-gray-700">Description</p>
                                    <p className="text-sm text-gray-600">{selectedTip.description}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-gray-700">Location</p>
                                    <p className="text-sm text-gray-600">{selectedTip.location}</p>
                                  </div>
                                  <div className="flex gap-4">
                                    <div>
                                      <p className="text-sm font-medium text-gray-700">Tips Received</p>
                                      <p className="text-sm text-gray-600">₹{selectedTip.totalTips.toLocaleString()}</p>
                                    </div>
                                    <div>
                                      <p className="text-sm font-medium text-gray-700">Number of Tippers</p>
                                      <p className="text-sm text-gray-600">{selectedTip.tipperCount}</p>
                                    </div>
                                  </div>
                                </div>

                                {/* Status Actions */}
                                <div className="flex gap-2 pt-4 border-t">
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => updateStatus(selectedTip.id, 'published')}
                                    className="flex-1"
                                  >
                                    <CheckCircle className="w-4 h-4 mr-2" />
                                    Publish
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => updateStatus(selectedTip.id, 'hidden')}
                                    className="flex-1"
                                  >
                                    <Ban className="w-4 h-4 mr-2" />
                                    Hide
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="destructive"
                                    onClick={() => updateStatus(selectedTip.id, 'removed')}
                                    className="flex-1"
                                  >
                                    <Trash2 className="w-4 h-4 mr-2" />
                                    Remove
                                  </Button>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-12 text-gray-500">
                    No CleanTips found matching your filters
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  );
}