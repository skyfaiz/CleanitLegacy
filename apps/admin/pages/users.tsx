import {
    Box,
    Container,
    Heading,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Badge,
    Button,
    HStack,
    Input,
    Select,
    useToast,
    Spinner,
    Center,
    Text,
    Avatar
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { apiClient } from '../lib/api';

export default function AdminUsers() {
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [roleFilter, setRoleFilter] = useState('');
    const toast = useToast();

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await apiClient.get('/admin/users');
            setUsers(response.data.users || []);
        } catch (error) {
            console.error('Failed to fetch users:', error);
            toast({
                title: 'Failed to fetch users',
                status: 'error',
                duration: 3000
            });
        } finally {
            setLoading(false);
        }
    };

    const updateUserRole = async (userId: string, newRole: string) => {
        try {
            await apiClient.put(`/admin/users/${userId}/role`, { role: newRole });
            toast({
                title: 'User role updated',
                status: 'success',
                duration: 3000
            });
            fetchUsers();
        } catch (error) {
            toast({
                title: 'Failed to update role',
                status: 'error',
                duration: 3000
            });
        }
    };

    const filteredUsers = users.filter(user => {
        const matchesSearch = !search ||
            user.name?.toLowerCase().includes(search.toLowerCase()) ||
            user.email?.toLowerCase().includes(search.toLowerCase());
        const matchesRole = !roleFilter || user.role === roleFilter;
        return matchesSearch && matchesRole;
    });

    if (loading) {
        return (
            <Center minH="50vh">
                <Spinner size="xl" color="green.500" />
            </Center>
        );
    }

    return (
        <Container maxW="6xl" py={8}>
            <Heading mb={8}>User Management</Heading>

            {/* Filters */}
            <HStack mb={6} spacing={4}>
                <Input
                    placeholder="Search by name or email..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    maxW="300px"
                />
                <Select
                    placeholder="All Roles"
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)}
                    maxW="150px"
                >
                    <option value="CITIZEN">Citizen</option>
                    <option value="CLEANER">Cleaner</option>
                    <option value="ADMIN">Admin</option>
                </Select>
            </HStack>

            <Text mb={4} color="gray.500">{filteredUsers.length} users found</Text>

            <Box overflowX="auto" bg="white" borderRadius="lg" borderWidth={1}>
                <Table>
                    <Thead bg="gray.50">
                        <Tr>
                            <Th>User</Th>
                            <Th>Email</Th>
                            <Th>Phone</Th>
                            <Th>Role</Th>
                            <Th>Joined</Th>
                            <Th>Actions</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {filteredUsers.map((user) => (
                            <Tr key={user.id}>
                                <Td>
                                    <HStack>
                                        <Avatar size="sm" name={user.name} src={user.avatarUrl} />
                                        <Text fontWeight="medium">{user.name || 'N/A'}</Text>
                                    </HStack>
                                </Td>
                                <Td>{user.email}</Td>
                                <Td>{user.phone || '-'}</Td>
                                <Td>
                                    <Badge colorScheme={
                                        user.role === 'ADMIN' ? 'red' :
                                            user.role === 'CLEANER' ? 'blue' : 'green'
                                    }>
                                        {user.role}
                                    </Badge>
                                </Td>
                                <Td>{new Date(user.createdAt).toLocaleDateString()}</Td>
                                <Td>
                                    <Select
                                        size="sm"
                                        value={user.role}
                                        onChange={(e) => updateUserRole(user.id, e.target.value)}
                                        maxW="120px"
                                    >
                                        <option value="CITIZEN">Citizen</option>
                                        <option value="CLEANER">Cleaner</option>
                                        <option value="ADMIN">Admin</option>
                                    </Select>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </Box>
        </Container>
    );
}
