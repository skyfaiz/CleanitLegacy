import { useEffect, useState } from 'react';
import {
    Box,
    Container,
    Heading,
    VStack,
    HStack,
    Text,
    Card,
    CardBody,
    Badge,
    Button,
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
    Spinner,
    Center,
    Image,
    Progress,
    useToast,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    useDisclosure
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useRef } from 'react';
import Layout from '../../components/layout/Layout';
import { useAuth } from '../../hooks/useAuth';
import { apiClient } from '../../lib/api';

interface Campaign {
    id: string;
    title: string;
    description: string;
    location: string;
    imageUrl: string;
    targetAmount: number;
    amountRaised: number;
    status: string;
    expiresAt: string;
    createdAt: string;
    job?: {
        id: string;
        status: string;
        cleanerId: string;
    };
    _count?: {
        contributions: number;
    };
}

export default function MyCampaigns() {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();
    const toast = useToast();
    const [campaigns, setCampaigns] = useState<Campaign[]>([]);
    const [loading, setLoading] = useState(true);
    const [cancellingId, setCancellingId] = useState<string | null>(null);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (!authLoading && !user) {
            router.push('/auth/login');
            return;
        }
        if (user) {
            fetchMyCampaigns();
        }
    }, [user, authLoading]);

    const fetchMyCampaigns = async () => {
        try {
            const response = await apiClient.get('/campaigns/user/my-campaigns');
            setCampaigns(response.data.campaigns || []);
        } catch (error) {
            console.error('Failed to fetch campaigns:', error);
            toast({
                title: 'Error loading campaigns',
                status: 'error',
                duration: 3000
            });
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = async (campaignId: string) => {
        setCancellingId(campaignId);
        try {
            await apiClient.post(`/campaigns/${campaignId}/cancel`, {
                reason: 'Cancelled by creator'
            });
            toast({
                title: 'Campaign cancelled',
                status: 'success',
                duration: 3000
            });
            fetchMyCampaigns();
        } catch (error: any) {
            toast({
                title: 'Cannot cancel campaign',
                description: error.response?.data?.error || 'Something went wrong',
                status: 'error',
                duration: 3000
            });
        } finally {
            setCancellingId(null);
            onClose();
        }
    };

    const activeCampaigns = campaigns.filter(c => ['ACTIVE', 'DRAFT'].includes(c.status));
    const fundedCampaigns = campaigns.filter(c => ['FUNDED', 'COMPLETED'].includes(c.status));
    const endedCampaigns = campaigns.filter(c => ['EXPIRED', 'CANCELLED'].includes(c.status));

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'ACTIVE': return 'green';
            case 'DRAFT': return 'gray';
            case 'FUNDED': return 'blue';
            case 'COMPLETED': return 'purple';
            case 'EXPIRED': return 'orange';
            case 'CANCELLED': return 'red';
            default: return 'gray';
        }
    };

    const getJobStatusText = (job?: Campaign['job']) => {
        if (!job) return null;
        switch (job.status) {
            case 'AVAILABLE': return '🔍 Waiting for cleaner';
            case 'CLAIMED': return '🧹 Cleaner working';
            case 'COMPLETED': return '⏳ Awaiting verification';
            case 'VERIFIED': return '✅ Verified, payment pending';
            case 'PAID': return '💰 Completed & paid';
            default: return job.status;
        }
    };

    if (authLoading || loading) {
        return (
            <Layout>
                <Center minH="50vh">
                    <Spinner size="xl" color="green.500" />
                </Center>
            </Layout>
        );
    }

    const CampaignCard = ({ campaign }: { campaign: Campaign }) => {
        const progress = (campaign.amountRaised / campaign.targetAmount) * 100;
        const daysLeft = campaign.expiresAt 
            ? Math.max(0, Math.ceil((new Date(campaign.expiresAt).getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
            : null;

        return (
            <Card _hover={{ shadow: 'md' }} transition="shadow 0.2s">
                <CardBody>
                    <HStack spacing={4} align="start">
                        <Image
                            src={campaign.imageUrl}
                            alt={campaign.title}
                            boxSize="100px"
                            objectFit="cover"
                            borderRadius="md"
                            fallbackSrc="https://via.placeholder.com/100"
                        />
                        <Box flex={1}>
                            <HStack justify="space-between" mb={1}>
                                <Heading size="sm" noOfLines={1}>{campaign.title}</Heading>
                                <Badge colorScheme={getStatusColor(campaign.status)}>
                                    {campaign.status}
                                </Badge>
                            </HStack>
                            <Text fontSize="sm" color="gray.500" mb={2}>📍 {campaign.location}</Text>
                            
                            <Progress value={progress} colorScheme="green" size="sm" mb={2} />
                            <HStack justify="space-between" fontSize="sm" mb={2}>
                                <Text fontWeight="bold" color="green.600">
                                    ₹{campaign.amountRaised.toLocaleString()}
                                </Text>
                                <Text color="gray.500">
                                    of ₹{campaign.targetAmount.toLocaleString()}
                                </Text>
                            </HStack>

                            {campaign.job && (
                                <Text fontSize="xs" color="blue.600" mb={2}>
                                    {getJobStatusText(campaign.job)}
                                </Text>
                            )}

                            <HStack justify="space-between" align="center">
                                <Text fontSize="xs" color="gray.400">
                                    {campaign._count?.contributions || 0} contributions
                                    {daysLeft !== null && campaign.status === 'ACTIVE' && ` • ${daysLeft} days left`}
                                </Text>
                                <HStack>
                                    <Link href={`/campaigns/${campaign.id}`}>
                                        <Button size="xs" variant="outline">View</Button>
                                    </Link>
                                    {campaign.status === 'ACTIVE' && campaign.amountRaised === 0 && (
                                        <Button 
                                            size="xs" 
                                            colorScheme="red" 
                                            variant="ghost"
                                            onClick={() => {
                                                setCancellingId(campaign.id);
                                                onOpen();
                                            }}
                                        >
                                            Cancel
                                        </Button>
                                    )}
                                </HStack>
                            </HStack>
                        </Box>
                    </HStack>
                </CardBody>
            </Card>
        );
    };

    return (
        <Layout>
            <Container maxW="4xl" py={8}>
                <HStack justify="space-between" mb={8}>
                    <Heading>My Campaigns</Heading>
                    <Link href="/campaigns/create">
                        <Button colorScheme="green">Create New</Button>
                    </Link>
                </HStack>

                <Tabs colorScheme="green">
                    <TabList>
                        <Tab>Active ({activeCampaigns.length})</Tab>
                        <Tab>Funded ({fundedCampaigns.length})</Tab>
                        <Tab>Ended ({endedCampaigns.length})</Tab>
                    </TabList>

                    <TabPanels>
                        <TabPanel px={0}>
                            {activeCampaigns.length === 0 ? (
                                <Center py={8}>
                                    <VStack>
                                        <Text color="gray.500">No active campaigns</Text>
                                        <Link href="/campaigns/create">
                                            <Button size="sm" colorScheme="green">Start a Campaign</Button>
                                        </Link>
                                    </VStack>
                                </Center>
                            ) : (
                                <VStack spacing={4} align="stretch">
                                    {activeCampaigns.map(c => <CampaignCard key={c.id} campaign={c} />)}
                                </VStack>
                            )}
                        </TabPanel>

                        <TabPanel px={0}>
                            {fundedCampaigns.length === 0 ? (
                                <Center py={8}>
                                    <Text color="gray.500">No funded campaigns yet</Text>
                                </Center>
                            ) : (
                                <VStack spacing={4} align="stretch">
                                    {fundedCampaigns.map(c => <CampaignCard key={c.id} campaign={c} />)}
                                </VStack>
                            )}
                        </TabPanel>

                        <TabPanel px={0}>
                            {endedCampaigns.length === 0 ? (
                                <Center py={8}>
                                    <Text color="gray.500">No ended campaigns</Text>
                                </Center>
                            ) : (
                                <VStack spacing={4} align="stretch">
                                    {endedCampaigns.map(c => <CampaignCard key={c.id} campaign={c} />)}
                                </VStack>
                            )}
                        </TabPanel>
                    </TabPanels>
                </Tabs>

                {/* Cancel Confirmation Dialog */}
                <AlertDialog
                    isOpen={isOpen}
                    leastDestructiveRef={cancelRef}
                    onClose={onClose}
                >
                    <AlertDialogOverlay>
                        <AlertDialogContent>
                            <AlertDialogHeader>Cancel Campaign</AlertDialogHeader>
                            <AlertDialogBody>
                                Are you sure you want to cancel this campaign? This action cannot be undone.
                            </AlertDialogBody>
                            <AlertDialogFooter>
                                <Button ref={cancelRef} onClick={onClose}>
                                    No, Keep It
                                </Button>
                                <Button 
                                    colorScheme="red" 
                                    onClick={() => cancellingId && handleCancel(cancellingId)} 
                                    ml={3}
                                    isLoading={!!cancellingId}
                                >
                                    Yes, Cancel
                                </Button>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialogOverlay>
                </AlertDialog>
            </Container>
        </Layout>
    );
}
