// apps/web/pages/_app.tsx

import { ChakraProvider } from '@chakra-ui/react';
import { AppProps } from 'next/app';
import theme from '../styles/theme';
import Layout from '../components/layout/Layout';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
}

export default MyApp;

// ============================================

// apps/web/pages/index.tsx

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

// ============================================

// apps/web/pages/campaigns/index.tsx

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

// ============================================

// apps/web/components/campaigns/CampaignCard.tsx

import {
  Box,
  Image,
  Heading,
  Text,
  Progress,
  HStack,
  Badge,
  Avatar
} from '@chakra-ui/react';
import Link from 'next/link';

interface Campaign {
  id: string;
  title: string;
  imageUrl: string;
  location: string;
  targetAmount: number;
  amountRaised: number;
  status: string;
  creator: {
    name: string;
    avatarUrl?: string;
  };
}

export default function CampaignCard({ campaign }: { campaign: Campaign }) {
  const progress = (campaign.amountRaised / campaign.targetAmount) * 100;

  return (
    <Link href={`/campaigns/${campaign.id}`}>
      <Box
        borderWidth={1}
        borderRadius="lg"
        overflow="hidden"
        cursor="pointer"
        transition="all 0.3s"
        _hover={{ transform: 'translateY(-4px)', shadow: 'lg' }}
      >
        <Image
          src={campaign.imageUrl}
          alt={campaign.title}
          h="200px"
          w="full"
          objectFit="cover"
        />
        <Box p={4}>
          <HStack mb={2}>
            <Badge colorScheme={campaign.status === 'ACTIVE' ? 'green' : 'gray'}>
              {campaign.status}
            </Badge>
          </HStack>
          <Heading size="md" mb={2} noOfLines={2}>
            {campaign.title}
          </Heading>
          <Text color="gray.600" mb={3} fontSize="sm">
            📍 {campaign.location}
          </Text>
          
          <Progress value={progress} colorScheme="green" mb={2} />
          <HStack justify="space-between" mb={3}>
            <Text fontWeight="bold" color="green.600">
              ₹{campaign.amountRaised.toLocaleString()}
            </Text>
            <Text fontSize="sm" color="gray.500">
              of ₹{campaign.targetAmount.toLocaleString()}
            </Text>
          </HStack>

          <HStack>
            <Avatar size="xs" name={campaign.creator.name} src={campaign.creator.avatarUrl} />
            <Text fontSize="sm" color="gray.600">
              by {campaign.creator.name}
            </Text>
          </HStack>
        </Box>
      </Box>
    </Link>
  );
}