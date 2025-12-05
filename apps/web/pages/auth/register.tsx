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
    useToast,
    Select
} from '@chakra-ui/react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useAuth } from '../../hooks/useAuth';

export default function Register() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
        role: 'CITIZEN'
    });
    const [isLoading, setIsLoading] = useState(false);
    const { register } = useAuth();
    const router = useRouter();
    const toast = useToast();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await register(formData);
            toast({
                title: 'Account created!',
                description: 'You can now start creating campaigns',
                status: 'success',
                duration: 3000
            });
            router.push('/');
        } catch (error: any) {
            toast({
                title: 'Registration failed',
                description: error.response?.data?.error || 'Something went wrong',
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
                <Heading mb={6} textAlign="center">Create Account</Heading>

                <form onSubmit={handleSubmit}>
                    <VStack spacing={4}>
                        <FormControl isRequired>
                            <FormLabel>Name</FormLabel>
                            <Input
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="John Doe"
                            />
                        </FormControl>

                        <FormControl isRequired>
                            <FormLabel>Email</FormLabel>
                            <Input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="your@email.com"
                            />
                        </FormControl>

                        <FormControl isRequired>
                            <FormLabel>Phone</FormLabel>
                            <Input
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="+91 98765 43210"
                            />
                        </FormControl>

                        <FormControl isRequired>
                            <FormLabel>Password</FormLabel>
                            <Input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="••••••••"
                            />
                        </FormControl>

                        <FormControl>
                            <FormLabel>I am a</FormLabel>
                            <Select name="role" value={formData.role} onChange={handleChange}>
                                <option value="CITIZEN">Citizen</option>
                                <option value="CLEANER">Cleaner</option>
                            </Select>
                        </FormControl>

                        <Button
                            type="submit"
                            colorScheme="green"
                            width="full"
                            isLoading={isLoading}
                        >
                            Create Account
                        </Button>

                        <Text fontSize="sm">
                            Already have an account?{' '}
                            <Link href="/auth/login">
                                <Text as="span" color="green.500" cursor="pointer">
                                    Login
                                </Text>
                            </Link>
                        </Text>
                    </VStack>
                </form>
            </Box>
        </Container>
    );
}
