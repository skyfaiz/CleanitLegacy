import {
    Box,
    Container,
    Heading,
    Grid,
    GridItem,
    Stat,
    StatLabel,
    StatNumber,
    StatHelpText,
    Card,
    CardHeader,
    CardBody,
    Text,
    VStack,
    HStack,
    Badge,
    Button,
    Spinner,
    Center
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useAuth } from '../hooks/useAuth';
import { apiClient } from '../lib/api';
import CampaignCard from '../components/campaigns/CampaignCard';

interface DashboardData {
    myCampaigns: any[];
    myContributions: any[];
    myJobs?: any[];
    stats: {
        totalCampaigns: number;
        totalContributed: number;
        totalEarned?: number;
        jobsCompleted?: number;
    };
}

export default function Dashboard() {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();
    const [data, setData] = useState<DashboardData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!authLoading && !user) {
            router.push('/auth/login');
            return;
        }
        if (user) {
            fetchDashboardData();
        }
    }, [user, authLoading]);

    const fetchDashboardData = async () => {
        try {
            const [campaignsRes, contributionsRes] = await Promise.all([
                apiClient.get('/campaigns?creatorId=' + user.id),
                apiClient.get('/contributions/user/' + user.id)
            ]);

            let myJobs: any[] = [];
            if (user.role === 'CLEANER') {
                try {
                    const jobsRes = await apiClient.get('/jobs/cleaner');
                    myJobs = jobsRes.data.jobs || [];
                } catch (e) {
                    console.error('Failed to fetch jobs');
                }
            }

            const campaigns = campaignsRes.data.campaigns || [];
            const contributions = contributionsRes.data.contributions || [];

            setData({
                myCampaigns: campaigns.slice(0, 3),
                myContributions: contributions.slice(0, 5),
                myJobs: myJobs.slice(0, 3),
                stats: {
                    totalCampaigns: campaigns.length,
                    totalContributed: contributions.reduce((sum: number, c: any) => sum + c.amount, 0),
                    totalEarned: myJobs.filter((j: any) => j.status === 'PAID').reduce((sum: number, j: any) => sum + (j.payoutAmount || 0), 0),
                    jobsCompleted: myJobs.filter((j: any) => j.status === 'COMPLETED' || j.status === 'VERIFIED' || j.status === 'PAID').length
                }
            });
        } catch (error) {
            console.error('Failed to fetch dashboard data:', error);
        } finally {
            setLoading(false);
        }
    };

    if (authLoading || loading) {
        return (
            <Center minH="50vh">
                <Spinner size="xl" color="green.500" />
            </Center>
        );
    }

    if (!user) return null;

    return (
        <Container maxW="6xl" py={8}>
            <Heading mb={8}>Welcome back, {user.name}!</Heading>

            {/* Stats */}
            <Grid templateColumns={{ base: '1fr', md: 'repeat(4, 1fr)' }} gap={6} mb={8}>
                <GridItem>
                    <Card>
                        <CardBody>
                            <Stat>
                                <StatLabel>Campaigns Created</StatLabel>
                                <StatNumber>{data?.stats.totalCampaigns || 0}</StatNumber>
                            </Stat>
                        </CardBody>
                    </Card>
                </GridItem>
                <GridItem>
                    <Card>
                        <CardBody>
                            <Stat>
                                <StatLabel>Total Contributed</StatLabel>
                                <StatNumber>₹{data?.stats.totalContributed || 0}</StatNumber>
                            </Stat>
                        </CardBody>
                    </Card>
                </GridItem>
                {user.role === 'CLEANER' && (
                    <>
                        <GridItem>
                            <Card>
                                <CardBody>
                                    <Stat>
                                        <StatLabel>Jobs Completed</StatLabel>
                                        <StatNumber>{data?.stats.jobsCompleted || 0}</StatNumber>
                                    </Stat>
                                </CardBody>
                            </Card>
                        </GridItem>
                        <GridItem>
                            <Card>
                                <CardBody>
                                    <Stat>
                                        <StatLabel>Total Earned</StatLabel>
                                        <StatNumber>₹{data?.stats.totalEarned || 0}</StatNumber>
                                    </Stat>
                                </CardBody>
                            </Card>
                        </GridItem>
                    </>
                )}
            </Grid>

            {/* My Campaigns */}
            <Box mb={8}>
                <HStack justify="space-between" mb={4}>
                    <Heading size="md">My Campaigns</Heading>
                    <Link href="/campaigns/create">
                        <Button size="sm" colorScheme="green">Create New</Button>
                    </Link>
                </HStack>
                {data?.myCampaigns.length === 0 ? (
                    <Text color="gray.500">You haven't created any campaigns yet.</Text>
                ) : (
                    <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={4}>
                        {data?.myCampaigns.map((campaign) => (
                            <CampaignCard key={campaign.id} campaign={campaign} />
                        ))}
                    </Grid>
                )}
            </Box>

            {/* My Contributions */}
            <Box mb={8}>
                <Heading size="md" mb={4}>Recent Contributions</Heading>
                {data?.myContributions.length === 0 ? (
                    <Text color="gray.500">You haven't contributed to any campaigns yet.</Text>
                ) : (
                    <VStack align="stretch" spacing={2}>
                        {data?.myContributions.map((contribution) => (
                            <Card key={contribution.id} size="sm">
                                <CardBody>
                                    <HStack justify="space-between">
                                        <Box>
                                            <Text fontWeight="medium">{contribution.campaign?.title}</Text>
                                            <Text fontSize="sm" color="gray.500">
                                                {new Date(contribution.createdAt).toLocaleDateString()}
                                            </Text>
                                        </Box>
                                        <Text fontWeight="bold" color="green.600">₹{contribution.amount}</Text>
                                    </HStack>
                                </CardBody>
                            </Card>
                        ))}
                    </VStack>
                )}
            </Box>

            {/* My Jobs (Cleaners only) */}
            {user.role === 'CLEANER' && (
                <Box>
                    <HStack justify="space-between" mb={4}>
                        <Heading size="md">My Jobs</Heading>
                        <Link href="/jobs/my-jobs">
                            <Button size="sm" variant="outline">View All</Button>
                        </Link>
                    </HStack>
                    {data?.myJobs?.length === 0 ? (
                        <Text color="gray.500">
                            No jobs yet.{' '}
                            <Link href="/jobs">
                                <Text as="span" color="green.500" cursor="pointer">Browse available jobs</Text>
                            </Link>
                        </Text>
                    ) : (
                        <VStack align="stretch" spacing={2}>
                            {data?.myJobs?.map((job) => (
                                <Card key={job.id} size="sm">
                                    <CardBody>
                                        <HStack justify="space-between">
                                            <Box>
                                                <Text fontWeight="medium">{job.campaign?.title}</Text>
                                                <Text fontSize="sm" color="gray.500">{job.campaign?.location}</Text>
                                            </Box>
                                            <Badge colorScheme={
                                                job.status === 'PAID' ? 'green' :
                                                    job.status === 'VERIFIED' ? 'blue' :
                                                        job.status === 'COMPLETED' ? 'purple' : 'yellow'
                                            }>
                                                {job.status}
                                            </Badge>
                                        </HStack>
                                    </CardBody>
                                </Card>
                            ))}
                        </VStack>
                    )}
                </Box>
            )}
        </Container>
    );
}
