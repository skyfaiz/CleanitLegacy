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
    Button,
    Image,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    VStack,
    Text,
    HStack,
    useDisclosure,
    useToast
} from '@chakra-ui/react';
import { useState } from 'react';
import { GetServerSideProps } from 'next';
import { apiClient } from '../lib/api';

export default function VerificationPage({ initialJobs }: any) {
    const [jobs, setJobs] = useState(initialJobs);
    const [selectedJob, setSelectedJob] = useState<any>(null);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();

    const openJobDetails = (job: any) => {
        setSelectedJob(job);
        onOpen();
    };

    const handleVerify = async (jobId: string) => {
        try {
            const token = localStorage.getItem('token');
            await apiClient.post(`/admin/jobs/${jobId}/verify`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setJobs(jobs.filter((j: any) => j.id !== jobId));

            toast({
                title: 'Job verified',
                description: 'Payout will be processed',
                status: 'success',
                duration: 3000
            });

            onClose();
        } catch (error) {
            toast({
                title: 'Verification failed',
                status: 'error',
                duration: 3000
            });
        }
    };

    const handleReject = async (jobId: string) => {
        try {
            const token = localStorage.getItem('token');
            await apiClient.post(`/admin/jobs/${jobId}/reject`, {
                reason: 'Quality not met'
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setJobs(jobs.filter((j: any) => j.id !== jobId));

            toast({
                title: 'Job rejected',
                description: 'Cleaner has been notified',
                status: 'info',
                duration: 3000
            });

            onClose();
        } catch (error) {
            toast({
                title: 'Rejection failed',
                status: 'error',
                duration: 3000
            });
        }
    };

    return (
        <Container maxW="6xl" py={8}>
            <Heading mb={8}>Job Verification</Heading>

            {jobs.length === 0 ? (
                <Box textAlign="center" py={12}>
                    <Text color="gray.500">No jobs pending verification</Text>
                </Box>
            ) : (
                <Box overflowX="auto">
                    <Table variant="simple">
                        <Thead>
                            <Tr>
                                <Th>Campaign</Th>
                                <Th>Location</Th>
                                <Th>Cleaner</Th>
                                <Th>Completed</Th>
                                <Th>Amount</Th>
                                <Th>Actions</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {jobs.map((job: any) => (
                                <Tr key={job.id}>
                                    <Td>{job.campaign.title}</Td>
                                    <Td>{job.campaign.location}</Td>
                                    <Td>{job.cleaner.name}</Td>
                                    <Td>{new Date(job.completedAt).toLocaleDateString()}</Td>
                                    <Td>₹{job.campaign.amountRaised.toLocaleString()}</Td>
                                    <Td>
                                        <Button
                                            size="sm"
                                            colorScheme="blue"
                                            onClick={() => openJobDetails(job)}
                                        >
                                            Review
                                        </Button>
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </Box>
            )}

            {/* Job Details Modal */}
            <Modal isOpen={isOpen} onClose={onClose} size="xl">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Job Verification</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        {selectedJob && (
                            <VStack spacing={4} align="stretch">
                                <Box>
                                    <Text fontWeight="bold" mb={2}>Campaign</Text>
                                    <Text>{selectedJob.campaign.title}</Text>
                                    <Text color="gray.600">{selectedJob.campaign.location}</Text>
                                </Box>

                                <Box>
                                    <Text fontWeight="bold" mb={2}>Before Image</Text>
                                    <Image
                                        src={selectedJob.campaign.imageUrl}
                                        alt="Before"
                                        borderRadius="md"
                                        maxH="300px"
                                    />
                                </Box>

                                <Box>
                                    <Text fontWeight="bold" mb={2}>After Image (Completion Proof)</Text>
                                    <Image
                                        src={selectedJob.completionImageUrl}
                                        alt="After"
                                        borderRadius="md"
                                        maxH="300px"
                                    />
                                </Box>

                                <Box>
                                    <Text fontWeight="bold" mb={2}>Cleaner Details</Text>
                                    <Text>Name: {selectedJob.cleaner.name}</Text>
                                    <Text>Email: {selectedJob.cleaner.email}</Text>
                                    <Text>Phone: {selectedJob.cleaner.phone}</Text>
                                </Box>

                                <Box>
                                    <Text fontWeight="bold" mb={2}>Payout Details</Text>
                                    <Text>Campaign Amount: ₹{selectedJob.campaign.amountRaised}</Text>
                                    <Text>Platform Fee (5%): ₹{(selectedJob.campaign.amountRaised * 0.05).toFixed(2)}</Text>
                                    <Text fontWeight="bold" color="green.600">
                                        Cleaner Payout: ₹{(selectedJob.campaign.amountRaised * 0.95).toFixed(2)}
                                    </Text>
                                </Box>

                                <HStack spacing={4}>
                                    <Button
                                        colorScheme="green"
                                        flex={1}
                                        onClick={() => handleVerify(selectedJob.id)}
                                    >
                                        Approve & Pay
                                    </Button>
                                    <Button
                                        colorScheme="red"
                                        variant="outline"
                                        flex={1}
                                        onClick={() => handleReject(selectedJob.id)}
                                    >
                                        Reject
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

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    try {
        const token = req.cookies.token;
        const response = await apiClient.get('/admin/jobs/pending', {
            headers: { Authorization: `Bearer ${token}` }
        });
        return {
            props: {
                initialJobs: response.data.jobs
            }
        };
    } catch (error) {
        return {
            redirect: {
                destination: '/login',
                permanent: false
            }
        };
    }
};
