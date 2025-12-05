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
    MenuDivider,
    Avatar,
    Badge
} from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../../hooks/useAuth';
import NotificationBell from '../notifications/NotificationBell';

export default function Header() {
    const { user, logout } = useAuth();
    const router = useRouter();

    return (
        <Box bg="white" borderBottomWidth={1} py={4} position="sticky" top={0} zIndex={100}>
            <Container maxW="6xl">
                <HStack justify="space-between">
                    <Link href="/">
                        <Text fontSize="2xl" fontWeight="bold" color="green.600" cursor="pointer">
                            🌿 Cleanit
                        </Text>
                    </Link>

                    <HStack spacing={4}>
                        <Link href="/campaigns">
                            <Button variant="ghost">Browse</Button>
                        </Link>

                        {user?.role === 'CLEANER' && (
                            <Link href="/jobs">
                                <Button variant="ghost">Jobs</Button>
                            </Link>
                        )}

                        {user ? (
                            <>
                                <Link href="/campaigns/create">
                                    <Button colorScheme="green">Start Campaign</Button>
                                </Link>
                                <NotificationBell />
                                <Menu>
                                    <MenuButton>
                                        <HStack>
                                            <Avatar size="sm" name={user.name} src={user.avatarUrl} />
                                            {user.role === 'CLEANER' && (
                                                <Badge colorScheme="blue" fontSize="xs">Cleaner</Badge>
                                            )}
                                            {user.role === 'ADMIN' && (
                                                <Badge colorScheme="red" fontSize="xs">Admin</Badge>
                                            )}
                                        </HStack>
                                    </MenuButton>
                                    <MenuList>
                                        <MenuItem onClick={() => router.push('/dashboard')}>
                                            Dashboard
                                        </MenuItem>
                                        <MenuItem onClick={() => router.push('/profile')}>
                                            Profile
                                        </MenuItem>
                                        <MenuDivider />
                                        {user.role === 'CLEANER' && (
                                            <MenuItem onClick={() => router.push('/jobs/my-jobs')}>
                                                My Jobs
                                            </MenuItem>
                                        )}
                                        {user.role === 'ADMIN' && (
                                            <MenuItem onClick={() => window.open('/admin', '_blank')}>
                                                Admin Panel
                                            </MenuItem>
                                        )}
                                        <MenuDivider />
                                        <MenuItem onClick={logout} color="red.500">
                                            Logout
                                        </MenuItem>
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
