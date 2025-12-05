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
    Select,
    useToast,
    Spinner,
    Center,
    Text,
    Stat,
    StatLabel,
    StatNumber,
    Grid,
    Card,
    CardBody
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { apiClient } from '../lib/api';

export default function AdminPayouts() {
    const [jobs, setJobs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [statusFilter, setStatusFilter] = useState('VERIFIED');
    const [processingId, setProcessingId] = useState<string | null>(null);
    const toast = useToast();

    useEffect(() => {
        fetchJobs();
    }, [statusFilter]);

    const fetchJobs = async () => {
        try {
            const response = await apiClient.get('/admin/jobs?status=' + statusFilter);
            setJobs(response.data.jobs || []);
        } catch (error) {
            console.error('Failed to fetch jobs:', error);
        } finally {
            setLoading(false);
        }
    };

    const processPayout = async (jobId: string) => {
        setProcessingId(jobId);
        try {
            await apiClient.post(`/admin/jobs/${jobId}/payout`);
            toast({
                title: 'Payout processed',
                description: 'Payment has been sent to the cleaner',
                status: 'success',
                duration: 3000
            });
            fetchJobs();
        } catch (error: any) {
            toast({
                title: 'Payout failed',
                description: error.response?.data?.error || 'Something went wrong',
                status: 'error',
                duration: 3000
            });
        } finally {
            setProcessingId(null);
        }
    };

    const verifiedJobs = jobs.filter(j => j.status === 'VERIFIED');
    const paidJobs = jobs.filter(j => j.status === 'PAID');
    const totalPaid = paidJobs.reduce((sum, j) => sum + (j.payoutAmount || 0), 0);
    const pendingPayout = verifiedJobs.reduce((sum, j) => sum + (j.campaign?.targetAmount * 0.95 || 0), 0);

    if (loading) {
        return (
            <Center minH="50vh">
                <Spinner size="xl" color="green.500" />
            </Center>
        );
    }

    return (
        <Container maxW="6xl" py={8}>
            <Heading mb={8}>Payout Management</Heading>

            {/* Stats */}
            <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={6} mb={8}>
                <Card>
                    <CardBody>
                        <Stat>
                            <StatLabel>Total Paid Out</StatLabel>
                            <StatNumber color="green.600">₹{totalPaid.toLocaleString()}</StatNumber>
                        </Stat>
                    </CardBody>
                </Card>
                <Card>
                    <CardBody>
                        <Stat>
                            <StatLabel>Pending Payout</StatLabel>
                            <StatNumber color="orange.500">₹{Math.round(pendingPayout).toLocaleString()}</StatNumber>
                        </Stat>
                    </CardBody>
                </Card>
                <Card>
                    <CardBody>
                        <Stat>
                            <StatLabel>Jobs Pending</StatLabel>
                            <StatNumber>{verifiedJobs.length}</StatNumber>
                        </Stat>
                    </CardBody>
                </Card>
            </Grid>

            {/* Filter */}
            <HStack mb={6}>
                <Select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    maxW="200px"
                >
                    <option value="VERIFIED">Verified (Ready for Payout)</option>
                    <option value="PAID">Paid</option>
                    <option value="COMPLETED">Completed (Pending Verification)</option>
                </Select>
            </HStack>

            <Box overflowX="auto" bg="white" borderRadius="lg" borderWidth={1}>
                <Table>
                    <Thead bg="gray.50">
                        <Tr>
                            <Th>Campaign</Th>
                            <Th>Cleaner</Th>
                            <Th>Amount</Th>
                            <Th>Status</Th>
                            <Th>Completed At</Th>
                            <Th>Actions</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {jobs.length === 0 ? (
                            <Tr>
                                <Td colSpan={6} textAlign="center" py={8}>
                                    <Text color="gray.500">No jobs found</Text>
                                </Td>
                            </Tr>
                        ) : (
                            jobs.map((job) => (
                                <Tr key={job.id}>
                                    <Td>
                                        <Text fontWeight="medium" maxW="200px" isTruncated>
                                            {job.campaign?.title}
                                        </Text>
                                        <Text fontSize="sm" color="gray.500">
                                            {job.campaign?.location}
                                        </Text>
                                    </Td>
                                    <Td>
                                        <Text>{job.cleaner?.name}</Text>
                                        <Text fontSize="sm" color="gray.500">{job.cleaner?.email}</Text>
                                    </Td>
                                    <Td fontWeight="bold" color="green.600">
                                        ₹{job.payoutAmount || Math.round((job.campaign?.targetAmount || 0) * 0.95)}
                                    </Td>
                                    <Td>
                                        <Badge colorScheme={
                                            job.status === 'PAID' ? 'green' :
                                                job.status === 'VERIFIED' ? 'blue' : 'purple'
                                        }>
                                            {job.status}
                                        </Badge>
                                    </Td>
                                    <Td>
                                        {job.completedAt ? new Date(job.completedAt).toLocaleDateString() : '-'}
                                    </Td>
                                    <Td>
                                        {job.status === 'VERIFIED' && (
                                            <Button
                                                size="sm"
                                                colorScheme="green"
                                                onClick={() => processPayout(job.id)}
                                                isLoading={processingId === job.id}
                                            >
                                                Process Payout
                                            </Button>
                                        )}
                                        {job.status === 'PAID' && (
                                            <Text fontSize="sm" color="green.600">✓ Paid</Text>
                                        )}
                                    </Td>
                                </Tr>
                            ))
                        )}
                    </Tbody>
                </Table>
            </Box>
        </Container>
    );
}
