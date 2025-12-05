import { useState } from 'react';
import {
    Box,
    Container,
    Heading,
    Grid,
    Button,
    Select,
    Input,
    Stack,
    HStack,
    Text
} from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import CampaignCard from '../../components/campaigns/CampaignCard';
import { apiClient } from '../../lib/api';

export default function CampaignsPage({ initialCampaigns, pagination }: any) {
    const [campaigns, setCampaigns] = useState(initialCampaigns);
    const [page, setPage] = useState(1);
    const [status, setStatus] = useState('ACTIVE');
    const [sort, setSort] = useState('createdAt');

    const loadMore = async () => {
        const response = await apiClient.get('/campaigns', {
            params: { page: page + 1, status, sort }
        });
        setCampaigns([...campaigns, ...response.data.campaigns]);
        setPage(page + 1);
    };

    return (
        <Container maxW="6xl" py={8}>
            <Heading mb={8}>Browse Campaigns</Heading>

            {/* Filters */}
            <Stack spacing={4} mb={8}>
                <HStack spacing={4}>
                    <Select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        maxW="200px"
                    >
                        <option value="ACTIVE">Active</option>
                        <option value="FUNDED">Funded</option>
                        <option value="COMPLETED">Completed</option>
                    </Select>
                    <Select
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                        maxW="200px"
                    >
                        <option value="createdAt">Latest</option>
                        <option value="amountRaised">Most Funded</option>
                        <option value="targetAmount">Goal Amount</option>
                    </Select>
                </HStack>
            </Stack>

            {/* Campaign Grid */}
            <Grid
                templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }}
                gap={6}
                mb={8}
            >
                {campaigns.map((campaign: any) => (
                    <CampaignCard key={campaign.id} campaign={campaign} />
                ))}
            </Grid>

            {/* Load More */}
            {pagination.pages > page && (
                <Box textAlign="center">
                    <Button onClick={loadMore} colorScheme="green">
                        Load More
                    </Button>
                </Box>
            )}

            {campaigns.length === 0 && (
                <Text textAlign="center" color="gray.500" py={8}>
                    No campaigns found
                </Text>
            )}
        </Container>
    );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    try {
        const response = await apiClient.get('/campaigns', {
            params: {
                page: query.page || 1,
                status: query.status || 'ACTIVE',
                sort: query.sort || 'createdAt'
            }
        });
        return {
            props: {
                initialCampaigns: response.data.campaigns || [],
                pagination: response.data.pagination || {}
            }
        };
    } catch (error) {
        return {
            props: {
                initialCampaigns: [],
                pagination: {}
            }
        };
    }
};
