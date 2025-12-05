import {
    Box,
    Container,
    Heading,
    Grid,
    Card,
    CardBody,
    Text,
    VStack,
    HStack,
    Badge,
    Button,
    Image,
    Spinner,
    Center,
    Alert,
    AlertIcon
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useAuth } from '../../hooks/useAuth';
import { apiClient } from '../../lib/api';

interface Job {
    id: string;
    status: string;
    campaign: {
        id: string;
        title: string;
        location: string;
        imageUrl: string;
        targetAmount: number;
    };
    createdAt: string;
}

export default function JobsListing() {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();
    const [jobs, setJobs] = useState<Job[]>([]);
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
            fetchJobs();
        }
    }, [user, authLoading]);

    const fetchJobs = async () => {
        try {
            const response = await apiClient.get('/jobs/available');
            setJobs(response.data.jobs || []);
        } catch (error) {
            console.error('Failed to fetch jobs:', error);
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

    if (user?.role !== 'CLEANER') {
        return (
            <Container maxW="6xl" py={8}>
                <Alert status="warning">
                    <AlertIcon />
                    Only cleaners can view available jobs. Please register as a cleaner.
                </Alert>
            </Container>
        );
    }

    return (
        <Container maxW="6xl" py={8}>
            <HStack justify="space-between" mb={8}>
                <Heading>Available Jobs</Heading>
                <Link href="/jobs/my-jobs">
                    <Button variant="outline">My Jobs</Button>
                </Link>
            </HStack>

            {jobs.length === 0 ? (
                <Center py={16}>
                    <VStack spacing={4}>
                        <Text fontSize="xl" color="gray.500">No available jobs right now</Text>
                        <Text color="gray.400">Check back later for new cleanup opportunities!</Text>
                    </VStack>
                </Center>
            ) : (
                <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} gap={6}>
                    {jobs.map((job) => (
                        <Card key={job.id} overflow="hidden" _hover={{ shadow: 'lg' }} transition="shadow 0.2s">
                            <Image
                                src={job.campaign.imageUrl}
                                alt={job.campaign.title}
                                height="180px"
                                objectFit="cover"
                                fallbackSrc="https://via.placeholder.com/400x200?text=Cleanup+Area"
                            />
                            <CardBody>
                                <VStack align="stretch" spacing={3}>
                                    <Heading size="md">{job.campaign.title}</Heading>
                                    <Text color="gray.600" fontSize="sm">📍 {job.campaign.location}</Text>
                                    <HStack justify="space-between">
                                        <Text fontWeight="bold" color="green.600">
                                            Earn ₹{Math.round(job.campaign.targetAmount * 0.95)}
                                        </Text>
                                        <Badge colorScheme="green">{job.status}</Badge>
                                    </HStack>
                                    <Link href={`/jobs/${job.id}`}>
                                        <Button colorScheme="green" width="full">View Details</Button>
                                    </Link>
                                </VStack>
                            </CardBody>
                        </Card>
                    ))}
                </Grid>
            )}
        </Container>
    );
}
