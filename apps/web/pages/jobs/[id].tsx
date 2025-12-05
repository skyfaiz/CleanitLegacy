import {
    Box,
    Container,
    Heading,
    VStack,
    HStack,
    Text,
    Image,
    Button,
    Badge,
    Card,
    CardBody,
    Divider,
    useToast,
    Spinner,
    Center,
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    useDisclosure
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../hooks/useAuth';
import { apiClient } from '../../lib/api';

export default function JobDetail() {
    const router = useRouter();
    const { id } = router.query;
    const { user, loading: authLoading } = useAuth();
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [job, setJob] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [claiming, setClaiming] = useState(false);
    const [completing, setCompleting] = useState(false);
    const [completionImage, setCompletionImage] = useState<File | null>(null);

    useEffect(() => {
        if (!authLoading && !user) {
            router.push('/auth/login');
            return;
        }
        if (id) {
            fetchJob();
        }
    }, [id, user, authLoading]);

    const fetchJob = async () => {
        try {
            const response = await apiClient.get(`/jobs/${id}`);
            setJob(response.data.job);
        } catch (error) {
            console.error('Failed to fetch job:', error);
            toast({
                title: 'Job not found',
                status: 'error',
                duration: 3000
            });
        } finally {
            setLoading(false);
        }
    };

    const handleClaim = async () => {
        setClaiming(true);
        try {
            await apiClient.post(`/jobs/${id}/claim`);
            toast({
                title: 'Job claimed!',
                description: 'You can now complete this cleanup task.',
                status: 'success',
                duration: 3000
            });
            fetchJob();
        } catch (error: any) {
            toast({
                title: 'Failed to claim job',
                description: error.response?.data?.error || 'Something went wrong',
                status: 'error',
                duration: 3000
            });
        } finally {
            setClaiming(false);
        }
    };

    const handleComplete = async () => {
        if (!completionImage) {
            toast({
                title: 'Please upload a completion photo',
                status: 'warning',
                duration: 3000
            });
            return;
        }

        setCompleting(true);
        try {
            const formData = new FormData();
            formData.append('completionImage', completionImage);

            await apiClient.post(`/jobs/${id}/complete`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            toast({
                title: 'Job marked as completed!',
                description: 'An admin will verify your work soon.',
                status: 'success',
                duration: 3000
            });
            onClose();
            fetchJob();
        } catch (error: any) {
            toast({
                title: 'Failed to complete job',
                description: error.response?.data?.error || 'Something went wrong',
                status: 'error',
                duration: 3000
            });
        } finally {
            setCompleting(false);
        }
    };

    if (authLoading || loading) {
        return (
            <Center minH="50vh">
                <Spinner size="xl" color="green.500" />
            </Center>
        );
    }

    if (!job) {
        return (
            <Container maxW="4xl" py={8}>
                <Text>Job not found</Text>
            </Container>
        );
    }

    const isMyJob = job.cleanerId === user?.id;
    const canClaim = job.status === 'AVAILABLE' && user?.role === 'CLEANER';
    const canComplete = job.status === 'CLAIMED' && isMyJob;

    return (
        <Container maxW="4xl" py={8}>
            <Button variant="ghost" mb={4} onClick={() => router.back()}>
                ← Back
            </Button>

            <Card overflow="hidden">
                <Image
                    src={job.campaign?.imageUrl}
                    alt={job.campaign?.title}
                    height="300px"
                    objectFit="cover"
                    fallbackSrc="https://via.placeholder.com/800x300?text=Cleanup+Area"
                />
                <CardBody>
                    <VStack align="stretch" spacing={4}>
                        <HStack justify="space-between">
                            <Heading size="lg">{job.campaign?.title}</Heading>
                            <Badge
                                colorScheme={
                                    job.status === 'AVAILABLE' ? 'green' :
                                        job.status === 'CLAIMED' ? 'yellow' :
                                            job.status === 'COMPLETED' ? 'purple' :
                                                job.status === 'VERIFIED' ? 'blue' : 'gray'
                                }
                                fontSize="md"
                                px={3}
                                py={1}
                            >
                                {job.status}
                            </Badge>
                        </HStack>

                        <Text color="gray.600">📍 {job.campaign?.location}</Text>

                        {job.campaign?.description && (
                            <Text>{job.campaign.description}</Text>
                        )}

                        <Divider />

                        <HStack justify="space-between">
                            <Box>
                                <Text fontSize="sm" color="gray.500">Payout Amount</Text>
                                <Text fontSize="2xl" fontWeight="bold" color="green.600">
                                    ₹{Math.round((job.campaign?.targetAmount || 0) * 0.95)}
                                </Text>
                                <Text fontSize="xs" color="gray.400">After 5% platform fee</Text>
                            </Box>
                            <Box textAlign="right">
                                <Text fontSize="sm" color="gray.500">Campaign Raised</Text>
                                <Text fontSize="lg" fontWeight="semibold">
                                    ₹{job.campaign?.amountRaised || 0}
                                </Text>
                            </Box>
                        </HStack>

                        <Divider />

                        {/* Actions */}
                        {canClaim && (
                            <Button
                                colorScheme="green"
                                size="lg"
                                onClick={handleClaim}
                                isLoading={claiming}
                            >
                                Claim This Job
                            </Button>
                        )}

                        {canComplete && (
                            <Button
                                colorScheme="blue"
                                size="lg"
                                onClick={onOpen}
                            >
                                Mark as Completed
                            </Button>
                        )}

                        {job.status === 'COMPLETED' && isMyJob && (
                            <Box bg="purple.50" p={4} borderRadius="md">
                                <Text fontWeight="medium" color="purple.700">
                                    ✓ Awaiting Verification
                                </Text>
                                <Text fontSize="sm" color="purple.600">
                                    An admin will verify your work and process the payment.
                                </Text>
                            </Box>
                        )}

                        {job.status === 'VERIFIED' && isMyJob && (
                            <Box bg="blue.50" p={4} borderRadius="md">
                                <Text fontWeight="medium" color="blue.700">
                                    ✓ Verified by Admin
                                </Text>
                                <Text fontSize="sm" color="blue.600">
                                    Payment will be processed soon.
                                </Text>
                            </Box>
                        )}

                        {job.status === 'PAID' && isMyJob && (
                            <Box bg="green.50" p={4} borderRadius="md">
                                <Text fontWeight="medium" color="green.700">
                                    ✓ Payment Completed
                                </Text>
                                <Text fontSize="sm" color="green.600">
                                    ₹{job.payoutAmount} has been transferred to your account.
                                </Text>
                            </Box>
                        )}

                        {job.completionImageUrl && (
                            <Box>
                                <Text fontWeight="medium" mb={2}>Completion Photo</Text>
                                <Image
                                    src={job.completionImageUrl}
                                    alt="Completion"
                                    borderRadius="md"
                                    maxH="300px"
                                />
                            </Box>
                        )}
                    </VStack>
                </CardBody>
            </Card>

            {/* Completion Modal */}
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Complete Job</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <VStack spacing={4}>
                            <Text>
                                Upload a photo showing the cleaned area to complete this job.
                            </Text>
                            <FormControl>
                                <FormLabel>Completion Photo</FormLabel>
                                <Input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setCompletionImage(e.target.files?.[0] || null)}
                                    pt={1}
                                />
                            </FormControl>
                            <Button
                                colorScheme="green"
                                width="full"
                                onClick={handleComplete}
                                isLoading={completing}
                            >
                                Submit Completion
                            </Button>
                        </VStack>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Container>
    );
}
