import {
    Box,
    Container,
    Heading,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Badge,
    Button,
    HStack,
    Input,
    Select,
    useToast,
    Spinner,
    Center,
    Text,
    Image,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    VStack
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { apiClient } from '../lib/api';

export default function AdminCampaigns() {
    const [campaigns, setCampaigns] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [selectedCampaign, setSelectedCampaign] = useState<any>(null);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();

    useEffect(() => {
        fetchCampaigns();
    }, []);

    const fetchCampaigns = async () => {
        try {
            const response = await apiClient.get('/admin/campaigns');
            setCampaigns(response.data.campaigns || []);
        } catch (error) {
            console.error('Failed to fetch campaigns:', error);
        } finally {
            setLoading(false);
        }
    };

    const updateCampaignStatus = async (campaignId: string, status: string) => {
        try {
            await apiClient.put(`/admin/campaigns/${campaignId}/status`, { status });
            toast({
                title: 'Campaign status updated',
                status: 'success',
                duration: 3000
            });
            fetchCampaigns();
            onClose();
        } catch (error) {
            toast({
                title: 'Failed to update status',
                status: 'error',
                duration: 3000
            });
        }
    };

    const viewCampaign = (campaign: any) => {
        setSelectedCampaign(campaign);
        onOpen();
    };

    const filteredCampaigns = campaigns.filter(campaign => {
        const matchesSearch = !search ||
            campaign.title?.toLowerCase().includes(search.toLowerCase()) ||
            campaign.location?.toLowerCase().includes(search.toLowerCase());
        const matchesStatus = !statusFilter || campaign.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    if (loading) {
        return (
            <Center minH="50vh">
                <Spinner size="xl" color="green.500" />
            </Center>
        );
    }

    return (
        <Container maxW="6xl" py={8}>
            <Heading mb={8}>Campaign Management</Heading>

            {/* Filters */}
            <HStack mb={6} spacing={4}>
                <Input
                    placeholder="Search campaigns..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    maxW="300px"
                />
                <Select
                    placeholder="All Statuses"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    maxW="150px"
                >
                    <option value="ACTIVE">Active</option>
                    <option value="FUNDED">Funded</option>
                    <option value="COMPLETED">Completed</option>
                    <option value="EXPIRED">Expired</option>
                </Select>
            </HStack>

            <Text mb={4} color="gray.500">{filteredCampaigns.length} campaigns found</Text>

            <Box overflowX="auto" bg="white" borderRadius="lg" borderWidth={1}>
                <Table>
                    <Thead bg="gray.50">
                        <Tr>
                            <Th>Campaign</Th>
                            <Th>Location</Th>
                            <Th>Target</Th>
                            <Th>Raised</Th>
                            <Th>Status</Th>
                            <Th>Created</Th>
                            <Th>Actions</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {filteredCampaigns.map((campaign) => (
                            <Tr key={campaign.id}>
                                <Td>
                                    <HStack>
                                        <Image
                                            src={campaign.imageUrl}
                                            alt={campaign.title}
                                            boxSize="40px"
                                            objectFit="cover"
                                            borderRadius="md"
                                            fallbackSrc="https://via.placeholder.com/40"
                                        />
                                        <Text fontWeight="medium" maxW="200px" isTruncated>
                                            {campaign.title}
                                        </Text>
                                    </HStack>
                                </Td>
                                <Td maxW="150px" isTruncated>{campaign.location}</Td>
                                <Td>₹{campaign.targetAmount}</Td>
                                <Td>₹{campaign.amountRaised}</Td>
                                <Td>
                                    <Badge colorScheme={
                                        campaign.status === 'ACTIVE' ? 'green' :
                                            campaign.status === 'FUNDED' ? 'blue' :
                                                campaign.status === 'COMPLETED' ? 'purple' : 'gray'
                                    }>
                                        {campaign.status}
                                    </Badge>
                                </Td>
                                <Td>{new Date(campaign.createdAt).toLocaleDateString()}</Td>
                                <Td>
                                    <Button size="sm" onClick={() => viewCampaign(campaign)}>
                                        View
                                    </Button>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </Box>

            {/* Campaign Detail Modal */}
            <Modal isOpen={isOpen} onClose={onClose} size="xl">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{selectedCampaign?.title}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        {selectedCampaign && (
                            <VStack align="stretch" spacing={4}>
                                <Image
                                    src={selectedCampaign.imageUrl}
                                    alt={selectedCampaign.title}
                                    maxH="200px"
                                    objectFit="cover"
                                    borderRadius="md"
                                />
                                <Text><strong>Location:</strong> {selectedCampaign.location}</Text>
                                <Text><strong>Description:</strong> {selectedCampaign.description || 'No description'}</Text>
                                <HStack>
                                    <Text><strong>Target:</strong> ₹{selectedCampaign.targetAmount}</Text>
                                    <Text><strong>Raised:</strong> ₹{selectedCampaign.amountRaised}</Text>
                                </HStack>
                                <Text><strong>Creator:</strong> {selectedCampaign.creator?.name} ({selectedCampaign.creator?.email})</Text>

                                <HStack pt={4}>
                                    <Button
                                        colorScheme="green"
                                        onClick={() => updateCampaignStatus(selectedCampaign.id, 'ACTIVE')}
                                        isDisabled={selectedCampaign.status === 'ACTIVE'}
                                    >
                                        Activate
                                    </Button>
                                    <Button
                                        colorScheme="red"
                                        variant="outline"
                                        onClick={() => updateCampaignStatus(selectedCampaign.id, 'EXPIRED')}
                                    >
                                        Expire
                                    </Button>
                                </HStack>
                            </VStack>
                        )}
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Container>
    );
}
