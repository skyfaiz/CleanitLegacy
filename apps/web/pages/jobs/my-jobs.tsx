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
    Image
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useAuth } from '../../hooks/useAuth';
import { apiClient } from '../../lib/api';

export default function MyJobs() {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();
    const [jobs, setJobs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!authLoading && !user) {
            router.push('/auth/login');
            return;
        }
        if (!authLoading && user?.role !== 'CLEANER') {
            router.push('/');
            return;
        }
        if (user) {
            fetchMyJobs();
        }
    }, [user, authLoading]);

    const fetchMyJobs = async () => {
        try {
            const response = await apiClient.get('/jobs/cleaner');
            setJobs(response.data.jobs || []);
        } catch (error) {
            console.error('Failed to fetch jobs:', error);
        } finally {
            setLoading(false);
        }
    };

    const activeJobs = jobs.filter(j => ['CLAIMED'].includes(j.status));
    const pendingJobs = jobs.filter(j => ['COMPLETED', 'VERIFIED'].includes(j.status));
    const completedJobs = jobs.filter(j => j.status === 'PAID');

    const totalEarnings = completedJobs.reduce((sum, j) => sum + (j.payoutAmount || 0), 0);

    if (authLoading || loading) {
        return (
            <Center minH="50vh">
                <Spinner size="xl" color="green.500" />
            </Center>
        );
    }

    const JobCard = ({ job }: { job: any }) => (
        <Card key={job.id} _hover={{ shadow: 'md' }} transition="shadow 0.2s">
            <CardBody>
                <HStack spacing={4}>
                    <Image
                        src={job.campaign?.imageUrl}
                        alt={job.campaign?.title}
                        boxSize="80px"
                        objectFit="cover"
                        borderRadius="md"
                        fallbackSrc="https://via.placeholder.com/80"
                    />
                    <Box flex={1}>
                        <HStack justify="space-between" mb={1}>
                            <Heading size="sm">{job.campaign?.title}</Heading>
                            <Badge colorScheme={
                                job.status === 'CLAIMED' ? 'yellow' :
                                    job.status === 'COMPLETED' ? 'purple' :
                                        job.status === 'VERIFIED' ? 'blue' :
                                            job.status === 'PAID' ? 'green' : 'gray'
                            }>
                                {job.status}
                            </Badge>
                        </HStack>
                        <Text fontSize="sm" color="gray.500">📍 {job.campaign?.location}</Text>
                        <HStack justify="space-between" mt={2}>
                            <Text fontWeight="bold" color="green.600">
                                ₹{job.payoutAmount || Math.round((job.campaign?.targetAmount || 0) * 0.95)}
                            </Text>
                            <Link href={`/jobs/${job.id}`}>
                                <Button size="sm" variant="outline">View</Button>
                            </Link>
                        </HStack>
                    </Box>
                </HStack>
            </CardBody>
        </Card>
    );

    return (
        <Container maxW="4xl" py={8}>
            <HStack justify="space-between" mb={8}>
                <Heading>My Jobs</Heading>
                <Link href="/jobs">
                    <Button colorScheme="green">Find Jobs</Button>
                </Link>
            </HStack>

            {/* Earnings Summary */}
            <Card mb={8} bg="green.50">
                <CardBody>
                    <HStack justify="space-between">
                        <Box>
                            <Text color="green.700">Total Earnings</Text>
                            <Text fontSize="3xl" fontWeight="bold" color="green.600">
                                ₹{totalEarnings}
                            </Text>
                        </Box>
                        <Box textAlign="right">
                            <Text color="green.700">Jobs Completed</Text>
                            <Text fontSize="2xl" fontWeight="bold" color="green.600">
                                {completedJobs.length}
                            </Text>
                        </Box>
                    </HStack>
                </CardBody>
            </Card>

            <Tabs colorScheme="green">
                <TabList>
                    <Tab>Active ({activeJobs.length})</Tab>
                    <Tab>Pending ({pendingJobs.length})</Tab>
                    <Tab>Completed ({completedJobs.length})</Tab>
                </TabList>

                <TabPanels>
                    <TabPanel px={0}>
                        {activeJobs.length === 0 ? (
                            <Center py={8}>
                                <VStack>
                                    <Text color="gray.500">No active jobs</Text>
                                    <Link href="/jobs">
                                        <Button size="sm" colorScheme="green">Browse Available Jobs</Button>
                                    </Link>
                                </VStack>
                            </Center>
                        ) : (
                            <VStack spacing={4} align="stretch">
                                {activeJobs.map(job => <JobCard key={job.id} job={job} />)}
                            </VStack>
                        )}
                    </TabPanel>

                    <TabPanel px={0}>
                        {pendingJobs.length === 0 ? (
                            <Center py={8}>
                                <Text color="gray.500">No pending jobs</Text>
                            </Center>
                        ) : (
                            <VStack spacing={4} align="stretch">
                                {pendingJobs.map(job => <JobCard key={job.id} job={job} />)}
                            </VStack>
                        )}
                    </TabPanel>

                    <TabPanel px={0}>
                        {completedJobs.length === 0 ? (
                            <Center py={8}>
                                <Text color="gray.500">No completed jobs yet</Text>
                            </Center>
                        ) : (
                            <VStack spacing={4} align="stretch">
                                {completedJobs.map(job => <JobCard key={job.id} job={job} />)}
                            </VStack>
                        )}
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Container>
    );
}
