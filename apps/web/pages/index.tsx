import { Box, Container, Heading, Text, Button, Grid, Stack } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import CampaignCard from '../components/campaigns/CampaignCard';
import { apiClient } from '../lib/api';

export default function Home({ featuredCampaigns }: any) {
    return (
        <Box>
            {/* Hero Section */}
            <Box bg="green.500" color="white" py={20}>
                <Container maxW="6xl">
                    <Stack spacing={6} align="center" textAlign="center">
                        <Heading size="2xl">
                            Clean Cities, Together
                        </Heading>
                        <Text fontSize="xl" maxW="2xl">
                            Join thousands of citizens funding cleanup campaigns and empowering cleaners
                            to make our cities cleaner, one campaign at a time.
                        </Text>
                        <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
                            <Link href="/campaigns/create">
                                <Button size="lg" colorScheme="whiteAlpha">
                                    Start a Campaign
                                </Button>
                            </Link>
                            <Link href="/campaigns">
                                <Button size="lg" variant="outline" colorScheme="whiteAlpha">
                                    Browse Campaigns
                                </Button>
                            </Link>
                        </Stack>
                    </Stack>
                </Container>
            </Box>

            {/* Featured Campaigns */}
            <Container maxW="6xl" py={16}>
                <Heading mb={8}>Featured Campaigns</Heading>
                <Grid
                    templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }}
                    gap={6}
                >
                    {featuredCampaigns.map((campaign: any) => (
                        <CampaignCard key={campaign.id} campaign={campaign} />
                    ))}
                </Grid>
                <Box textAlign="center" mt={8}>
                    <Link href="/campaigns">
                        <Button colorScheme="green" size="lg">
                            View All Campaigns
                        </Button>
                    </Link>
                </Box>
            </Container>

            {/* How It Works */}
            <Box bg="gray.50" py={16}>
                <Container maxW="6xl">
                    <Heading textAlign="center" mb={12}>How It Works</Heading>
                    <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={8}>
                        <Box textAlign="center">
                            <Box
                                w={16}
                                h={16}
                                bg="green.500"
                                color="white"
                                borderRadius="full"
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                fontSize="2xl"
                                fontWeight="bold"
                                mx="auto"
                                mb={4}
                            >
                                1
                            </Box>
                            <Heading size="md" mb={2}>Create a Campaign</Heading>
                            <Text color="gray.600">
                                Spot a dirty area? Create a cleanup campaign with photos and location.
                            </Text>
                        </Box>
                        <Box textAlign="center">
                            <Box
                                w={16}
                                h={16}
                                bg="green.500"
                                color="white"
                                borderRadius="full"
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                fontSize="2xl"
                                fontWeight="bold"
                                mx="auto"
                                mb={4}
                            >
                                2
                            </Box>
                            <Heading size="md" mb={2}>Citizens Contribute</Heading>
                            <Text color="gray.600">
                                Community members contribute funds to support the cleanup effort.
                            </Text>
                        </Box>
                        <Box textAlign="center">
                            <Box
                                w={16}
                                h={16}
                                bg="green.500"
                                color="white"
                                borderRadius="full"
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                fontSize="2xl"
                                fontWeight="bold"
                                mx="auto"
                                mb={4}
                            >
                                3
                            </Box>
                            <Heading size="md" mb={2}>Cleaners Get Paid</Heading>
                            <Text color="gray.600">
                                Verified cleaners complete the job and receive payment directly.
                            </Text>
                        </Box>
                    </Grid>
                </Container>
            </Box>
        </Box>
    );
}

export const getServerSideProps: GetServerSideProps = async () => {
    try {
        const response = await apiClient.get('/campaigns/featured');
        return {
            props: {
                featuredCampaigns: response.data.campaigns || []
            }
        };
    } catch (error) {
        return {
            props: {
                featuredCampaigns: []
            }
        };
    }
};
