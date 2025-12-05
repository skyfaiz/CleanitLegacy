// apps/web/components/layout/Layout.tsx

import { Box } from '@chakra-ui/react';
import Header from './Header';
import Footer from './Footer';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Box minH="100vh" display="flex" flexDirection="column">
      <Header />
      <Box flex={1}>{children}</Box>
      <Footer />
    </Box>
  );
}

// ============================================

// apps/web/components/layout/Header.tsx

import {
  Box,
  Container,
  HStack,
  Button,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar
} from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../../hooks/useAuth';

export default function Header() {
  const { user, logout } = useAuth();
  const router = useRouter();

  return (
    <Box bg="white" borderBottomWidth={1} py={4}>
      <Container maxW="6xl">
        <HStack justify="space-between">
          <Link href="/">
            <Text fontSize="2xl" fontWeight="bold" color="green.600" cursor="pointer">
              Cleanit
            </Text>
          </Link>

          <HStack spacing={4}>
            <Link href="/campaigns">
              <Button variant="ghost">Browse</Button>
            </Link>

            {user ? (
              <>
                <Link href="/campaigns/create">
                  <Button colorScheme="green">Start Campaign</Button>
                </Link>
                <Menu>
                  <MenuButton>
                    <Avatar size="sm" name={user.name} src={user.avatarUrl} />
                  </MenuButton>
                  <MenuList>
                    <MenuItem onClick={() => router.push('/profile')}>
                      Profile
                    </MenuItem>
                    <MenuItem onClick={() => router.push('/profile/campaigns')}>
                      My Campaigns
                    </MenuItem>
                    <MenuItem onClick={logout}>Logout</MenuItem>
                  </MenuList>
                </Menu>
              </>
            ) : (
              <>
                <Link href="/auth/login">
                  <Button variant="ghost">Login</Button>
                </Link>
                <Link href="/auth/register">
                  <Button colorScheme="green">Sign Up</Button>
                </Link>
              </>
            )}
          </HStack>
        </HStack>
      </Container>
    </Box>
  );
}

// ============================================

// apps/web/components/layout/Footer.tsx

import { Box, Container, Text, HStack, Link } from '@chakra-ui/react';

export default function Footer() {
  return (
    <Box bg="gray.50" py={8} mt={16}>
      <Container maxW="6xl">
        <HStack justify="space-between">
          <Text color="gray.600">© 2024 Cleanit. All rights reserved.</Text>
          <HStack spacing={6}>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/privacy">Privacy</Link>
          </HStack>
        </HStack>
      </Container>
    </Box>
  );
}

// ============================================

// apps/web/components/campaigns/ContributeModal.tsx

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  useToast
} from '@chakra-ui/react';
import { useState } from 'react';
import { apiClient } from '../../lib/api';

interface ContributeModalProps {
  isOpen: boolean;
  onClose: () => void;
  campaign: any;
}

export default function ContributeModal({ isOpen, onClose, campaign }: ContributeModalProps) {
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleContribute = async () => {
    if (!amount || parseFloat(amount) < 10) {
      toast({
        title: 'Invalid amount',
        description: 'Minimum contribution is ₹10',
        status: 'error',
        duration: 3000
      });
      return;
    }

    setIsLoading(true);

    try {
      const token = localStorage.getItem('token');
      
      // Create order
      const orderResponse = await apiClient.post(
        '/contributions/create-order',
        {
          campaignId: campaign.id,
          amount: parseFloat(amount)
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      const { orderId, keyId } = orderResponse.data;

      // Initialize Razorpay
      const options = {
        key: keyId,
        amount: parseFloat(amount) * 100,
        currency: 'INR',
        name: 'Cleanit',
        description: `Contribution to ${campaign.title}`,
        order_id: orderId,
        handler: async function (response: any) {
          try {
            // Verify payment
            await apiClient.post(
              '/contributions/verify',
              {
                orderId: response.razorpay_order_id,
                paymentId: response.razorpay_payment_id,
                signature: response.razorpay_signature,
                campaignId: campaign.id,
                amount: parseFloat(amount)
              },
              {
                headers: { Authorization: `Bearer ${token}` }
              }
            );

            toast({
              title: 'Contribution successful!',
              description: 'Thank you for supporting this campaign',
              status: 'success',
              duration: 3000
            });

            onClose();
            window.location.reload();
          } catch (error) {
            toast({
              title: 'Payment verification failed',
              status: 'error',
              duration: 3000
            });
          }
        },
        prefill: {
          name: '',
          email: ''
        }
      };

      // @ts-ignore
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.response?.data?.error || 'Failed to process payment',
        status: 'error',
        duration: 3000
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Contribute to Campaign</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <VStack spacing={4}>
            <Text>
              Help clean {campaign.location} by contributing to this campaign
            </Text>
            <FormControl>
              <FormLabel>Amount (₹)</FormLabel>
              <Input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                min={10}
              />
              <Text fontSize="sm" color="gray.600" mt={1}>
                Minimum: ₹10
              </Text>
            </FormControl>
            <Button
              colorScheme="green"
              width="full"
              onClick={handleContribute}
              isLoading={isLoading}
            >
              Contribute ₹{amount || '0'}
            </Button>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

// ============================================

// apps/web/lib/api.ts

import axios from 'axios';

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add auth token to requests
apiClient.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// ============================================

// apps/web/hooks/useAuth.ts

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { apiClient } from '../lib/api';

export function useAuth() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }

      const response = await apiClient.get('/users/profile');
      setUser(response.data.user);
    } catch (error) {
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    const response = await apiClient.post('/auth/login', { email, password });
    localStorage.setItem('token', response.data.token);
    setUser(response.data.user);
    return response.data;
  };

  const register = async (data: any) => {
    const response = await apiClient.post('/auth/register', data);
    localStorage.setItem('token', response.data.token);
    setUser(response.data.user);
    return response.data;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    router.push('/');
  };

  return { user, loading, login, register, logout };
}

// ============================================

// apps/web/styles/theme.ts

import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    green: {
      50: '#e6f7ed',
      100: '#b3e6cc',
      200: '#80d6ab',
      300: '#4dc689',
      400: '#1ab568',
      500: '#00a550',
      600: '#008440',
      700: '#006330',
      800: '#004220',
      900: '#002110'
    }
  },
  fonts: {
    heading: 'Inter, sans-serif',
    body: 'Inter, sans-serif'
  }
});

export default theme;