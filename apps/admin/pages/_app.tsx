import { ChakraProvider, Box, Flex, VStack, HStack, Text, Button, Divider } from '@chakra-ui/react';
import { AppProps } from 'next/app';
import Link from 'next/link';
import { useRouter } from 'next/router';

const navItems = [
    { label: 'Dashboard', href: '/' },
    { label: 'Verification', href: '/verification' },
    { label: 'Users', href: '/users' },
    { label: 'Campaigns', href: '/campaigns' },
    { label: 'Payouts', href: '/payouts' },
];

function AdminLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();

    return (
        <Flex minH="100vh">
            {/* Sidebar */}
            <Box w="250px" bg="gray.800" color="white" py={6} position="fixed" h="100vh">
                <VStack align="stretch" spacing={1}>
                    <Text fontSize="xl" fontWeight="bold" px={6} mb={4}>
                        🌿 Cleanit Admin
                    </Text>
                    <Divider borderColor="gray.600" />

                    {navItems.map((item) => (
                        <Link key={item.href} href={item.href}>
                            <Box
                                px={6}
                                py={3}
                                cursor="pointer"
                                bg={router.pathname === item.href ? 'green.600' : 'transparent'}
                                _hover={{ bg: router.pathname === item.href ? 'green.600' : 'gray.700' }}
                                transition="background 0.2s"
                            >
                                <Text>{item.label}</Text>
                            </Box>
                        </Link>
                    ))}

                    <Divider borderColor="gray.600" mt={4} />

                    <Link href="http://localhost:3000" target="_blank">
                        <Box px={6} py={3} cursor="pointer" _hover={{ bg: 'gray.700' }}>
                            <Text fontSize="sm" color="gray.400">← Back to Main Site</Text>
                        </Box>
                    </Link>
                </VStack>
            </Box>

            {/* Main Content */}
            <Box ml="250px" flex={1} bg="gray.50" minH="100vh">
                {children}
            </Box>
        </Flex>
    );
}

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ChakraProvider>
            <AdminLayout>
                <Component {...pageProps} />
            </AdminLayout>
        </ChakraProvider>
    );
}

export default MyApp;
