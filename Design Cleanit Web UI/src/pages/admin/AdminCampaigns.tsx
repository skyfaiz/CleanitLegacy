'use client';

import { useState } from 'react';
import Navbar from '../../components/Navbar';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Input } from '../../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../components/ui/dialog';
import { Search, Eye, Ban, CheckCircle } from 'lucide-react';
import { mockCampaigns } from '../../data/mockData';
import { toast } from 'sonner';

export default function AdminCampaigns() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedCampaign, setSelectedCampaign] = useState<typeof mockCampaigns[0] | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  let filteredCampaigns = mockCampaigns.filter((c) =>
    c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (statusFilter !== 'all') {
    filteredCampaigns = filteredCampaigns.filter((c) => c.status === statusFilter);
  }

  const handleViewCampaign = (campaign: typeof mockCampaigns[0]) => {
    setSelectedCampaign(campaign);
    setIsDialogOpen(true);
  };

  const handleStatusChange = (status: string) => {
    toast.success(`Campaign status changed to ${status}`);
    setIsDialogOpen(false);
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Campaign Management</h1>
          <p className="text-gray-600 mt-1">Manage and moderate all platform campaigns</p>
        </div>

        {/* Filters */}
        <Card className="p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search campaigns by name or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="funded">Funded</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </Card>

        {/* Table */}
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Campaign</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Creator</TableHead>
                <TableHead>Funding</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCampaigns.map((campaign) => (
                <TableRow key={campaign.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <img
                        src={campaign.image}
                        alt={campaign.title}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div>
                        <p className="font-semibold text-gray-900">{campaign.title}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{campaign.location}</TableCell>
                  <TableCell>{campaign.creator.name}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <p className="font-semibold text-gray-900">
                        ₹{campaign.raised.toLocaleString()}
                      </p>
                      <p className="text-gray-500">of ₹{campaign.goal.toLocaleString()}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={campaign.status === 'active' ? 'default' : 'secondary'}
                      className={campaign.status === 'active' ? 'bg-[#22C55E]' : ''}
                    >
                      {campaign.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(campaign.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleViewCampaign(campaign)}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>

        {/* Detail Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            {selectedCampaign && (
              <>
                <DialogHeader>
                  <DialogTitle>Campaign Details</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                  <img
                    src={selectedCampaign.image}
                    alt={selectedCampaign.title}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <div>
                    <h3 className="font-bold text-lg text-gray-900">{selectedCampaign.title}</h3>
                    <p className="text-gray-600 mt-1">{selectedCampaign.location}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Description</h4>
                    <p className="text-gray-700 text-sm whitespace-pre-line">
                      {selectedCampaign.fullDescription}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Creator</p>
                      <p className="font-semibold">{selectedCampaign.creator.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Status</p>
                      <Badge>{selectedCampaign.status}</Badge>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Raised</p>
                      <p className="font-semibold">₹{selectedCampaign.raised.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Goal</p>
                      <p className="font-semibold">₹{selectedCampaign.goal.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 pt-4 border-t">
                    <Button
                      variant="outline"
                      onClick={() => handleStatusChange('active')}
                      className="flex-1"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Activate
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleStatusChange('expired')}
                      className="flex-1 border-red-500 text-red-500 hover:bg-red-50"
                    >
                      <Ban className="w-4 h-4 mr-2" />
                      Expire
                    </Button>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}