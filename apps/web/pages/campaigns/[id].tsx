import {
    Box,
    Container,
    Grid,
    Image,
    Heading,
    Text,
    Button,
    Progress,
    HStack,
    VStack,
    Badge,
    Avatar,
    Divider,
    useToast
} from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { useState } from 'react';
import { apiClient } from '../../lib/api';
import ContributeModal from '../../components/campaigns/ContributeModal';

export default function CampaignDetail({ campaign }: any) {
    const [isContributeOpen, setIsContributeOpen] = useState(false);
    const toast = useToast();
    const progress = (campaign.amountRaised / campaign.targetAmount) * 100;

    return (
        <Container maxW="6xl" py={8}>
            <Grid templateColumns={{ base: '1fr', lg: '2fr 1fr' }} gap={8}>
                {/* Main Content */}
                <Box>
                    <Image
                        src={campaign.imageUrl}
                        alt={campaign.title}
                        w="full"
                        h="400px"
                        objectFit="cover"
                        borderRadius="lg"
                        mb={6}
                    />

                    <HStack mb={4}>
                        <Badge colorScheme={campaign.status === 'ACTIVE' ? 'green' : 'gray'} fontSize="md">
                            {campaign.status}
                        </Badge>
                    </HStack>

                    <Heading mb={4}>{campaign.title}</Heading>

                    <HStack mb={6}>
                        <Avatar name={campaign.creator.name} src={campaign.creator.avatarUrl} />
                        <Box>
                            <Text fontWeight="bold">{campaign.creator.name}</Text>
                            <Text fontSize="sm" color="gray.600">Campaign Creator</Text>
                        </Box>
                    </HStack>

                    <Divider mb={6} />

                    <Box mb={6}>
                        <Heading size="md" mb={3}>About this campaign</Heading>
                        <Text whiteSpace="pre-wrap" color="gray.700">
                            {campaign.description}
                        </Text>
                    </Box>

                    <Box mb={6}>
                        <Heading size="md" mb={3}>Location</Heading>
                        <Text color="gray.700">📍 {campaign.location}</Text>
                    </Box>

                    {campaign.job && (
                        <Box>
                            <Heading size="md" mb={3}>Job Status</Heading>
                            <Badge colorScheme="blue" fontSize="md">
                                {campaign.job.status}
                            </Badge>
                            {campaign.job.completionImageUrl && (
                                <Image
                                    src={campaign.job.completionImageUrl}
                                    alt="Completion proof"
                                    mt={4}
                                    maxH="300px"
                                    borderRadius="md"
                                />
                            )}
                        </Box>
                    )}
                </Box>

                {/* Sidebar */}
                <Box position="sticky" top="20px" height="fit-content">
                    <Box borderWidth={1} borderRadius="lg" p={6}>
                        <VStack align="stretch" spacing={4}>
                            <Box>
                                <Text fontSize="3xl" fontWeight="bold" color="green.600">
                                    ₹{campaign.amountRaised.toLocaleString()}
                                </Text>
                                <Text color="gray.600">
                                    raised of ₹{campaign.targetAmount.toLocaleString()} goal
                                </Text>
                            </Box>

                            <Progress value={progress} colorScheme="green" size="lg" />

                            <HStack>
                                <Text fontWeight="bold">{Math.round(progress)}%</Text>
                                <Text color="gray.600">funded</Text>
                            </HStack>

                            <Text>
                                <strong>{campaign._count.contributions}</strong> contributions
                            </Text>

                            {campaign.status === 'ACTIVE' && (
                                <Button
                                    colorScheme="green"
                                    size="lg"
                                    width="full"
                                    onClick={() => setIsContributeOpen(true)}
                                >
                                    Contribute Now
                                </Button>
                            )}

                            {campaign.status === 'FUNDED' && (
                                <Badge colorScheme="green" p={2} textAlign="center">
                                    🎉 Fully Funded! Awaiting cleanup
                                </Badge>
                            )}
                        </VStack>
                    </Box>

                    {/* Recent Contributors */}
                    <Box borderWidth={1} borderRadius="lg" p={6} mt={4}>
                        <Heading size="md" mb={4}>Recent Contributors</Heading>
                        <VStack align="stretch" spacing={3}>
                            {campaign.contributions.slice(0, 5).map((contrib: any) => (
                                <HStack key={contrib.id}>
                                    <Avatar size="sm" name={contrib.user.name} src={contrib.user.avatarUrl} />
                                    <Box flex={1}>
                                        <Text fontWeight="bold" fontSize="sm">{contrib.user.name}</Text>
                                        <Text fontSize="xs" color="gray.600">
                                            ₹{contrib.amount.toLocaleString()}
                                        </Text>
                                    </Box>
                                </HStack>
                            ))}
                        </VStack>
                    </Box>
                </Box>
            </Grid>

            <ContributeModal
                isOpen={isContributeOpen}
                onClose={() => setIsContributeOpen(false)}
                campaign={campaign}
            />
        </Container>
    );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    try {
        const response = await apiClient.get(`/campaigns/${params?.id}`);
        return {
            props: {
                campaign: response.data.campaign
            }
        };
    } catch (error) {
        return {
            notFound: true
        };
    }
};
