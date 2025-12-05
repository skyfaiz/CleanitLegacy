import {
    Box,
    Container,
    Heading,
    FormControl,
    FormLabel,
    Input,
    Button,
    VStack,
    Text,
    useToast
} from '@chakra-ui/react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useAuth } from '../../hooks/useAuth';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const router = useRouter();
    const toast = useToast();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await login(email, password);
            toast({
                title: 'Login successful!',
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
            <Box borderWidth={1} borderRadius="lg" p={8}>
                <Heading mb={6} textAlign="center">Login</Heading>

                <form onSubmit={handleSubmit}>
                    <VStack spacing={4}>
                        <FormControl isRequired>
                            <FormLabel>Email</FormLabel>
                            <Input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="your@email.com"
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

                        <Text fontSize="sm">
                            Don't have an account?{' '}
                            <Link href="/auth/register">
                                <Text as="span" color="green.500" cursor="pointer">
                                    Sign up
                                </Text>
                            </Link>
                        </Text>
                    </VStack>
                </form>
            </Box>
        </Container>
    );
}
