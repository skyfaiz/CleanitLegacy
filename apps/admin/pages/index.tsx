import { Box, Container, Heading, Grid, Stat, StatLabel, StatNumber, StatHelpText } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { apiClient } from '../lib/api';

export default function AdminDashboard({ stats }: any) {
    return (
        <Container maxW="6xl" py={8}>
            <Heading mb={8}>Admin Dashboard</Heading>

            <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }} gap={6}>
                <Box p={6} borderWidth={1} borderRadius="lg" bg="white">
                    <Stat>
                        <StatLabel>Total Campaigns</StatLabel>
                        <StatNumber>{stats.totalCampaigns}</StatNumber>
                        <StatHelpText>{stats.activeCampaigns} active</StatHelpText>
                    </Stat>
                </Box>

                <Box p={6} borderWidth={1} borderRadius="lg" bg="white">
                    <Stat>
                        <StatLabel>Total Contributions</StatLabel>
                        <StatNumber>{stats.totalContributions}</StatNumber>
                        <StatHelpText>All time</StatHelpText>
                    </Stat>
                </Box>

                <Box p={6} borderWidth={1} borderRadius="lg" bg="white">
                    <Stat>
                        <StatLabel>Total Amount</StatLabel>
                        <StatNumber>₹{stats.totalAmount.toLocaleString()}</StatNumber>
                        <StatHelpText>Raised</StatHelpText>
                    </Stat>
                </Box>

                <Box p={6} borderWidth={1} borderRadius="lg" bg="white">
                    <Stat>
                        <StatLabel>Pending Jobs</StatLabel>
                        <StatNumber>{stats.pendingJobs}</StatNumber>
                        <StatHelpText>{stats.completedJobs} completed</StatHelpText>
                    </Stat>
                </Box>
            </Grid>
        </Container>
    );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    try {
        const token = req.cookies.token;
        const response = await apiClient.get('/admin/dashboard/stats', {
            headers: { Authorization: `Bearer ${token}` }
        });
        return {
            props: {
                stats: response.data.stats
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
