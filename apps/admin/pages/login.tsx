import {
    Box,
    Button,
    Container,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Text,
    VStack,
    useToast
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { apiClient } from '../lib/api';

export default function AdminLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const toast = useToast();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await apiClient.post('/auth/login', { email, password });
            const { token, user } = response.data;

            if (!user || user.role !== 'ADMIN') {
                toast({
                    title: 'Access denied',
                    description: 'This account is not an admin. Please use an admin account.',
                    status: 'error',
                    duration: 3000
                });
                setIsLoading(false);
                return;
            }

            document.cookie = `token=${token}; path=/;`;

            toast({
                title: 'Admin login successful',
                status: 'success',
                duration: 3000
            });

            router.push('/');
        } catch (error: any) {
            toast({
                title: 'Login failed',
                description: error.response?.data?.error || 'Invalid credentials',
                status: 'error',
                duration: 3000
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Container maxW="md" py={16}>
            <Box borderWidth={1} borderRadius="lg" p={8} bg="white">
                <Heading mb={6} textAlign="center">
                    Admin Login
                </Heading>

                <form onSubmit={handleSubmit}>
                    <VStack spacing={4}>
                        <FormControl isRequired>
                            <FormLabel>Email</FormLabel>
                            <Input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="admin@example.com"
                            />
                        </FormControl>

                        <FormControl isRequired>
                            <FormLabel>Password</FormLabel>
                            <Input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                            />
                        </FormControl>

                        <Button
                            type="submit"
                            colorScheme="green"
                            width="full"
                            isLoading={isLoading}
                        >
                            Login
                        </Button>
                    </VStack>
                </form>
            </Box>
        </Container>
    );
}
