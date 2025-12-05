import {
    Box,
    Container,
    Heading,
    VStack,
    HStack,
    FormControl,
    FormLabel,
    Input,
    Button,
    Avatar,
    Text,
    Card,
    CardBody,
    Badge,
    useToast,
    Spinner,
    Center,
    Divider
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../hooks/useAuth';
import { apiClient } from '../lib/api';

export default function Profile() {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();
    const toast = useToast();
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        phone: ''
    });

    useEffect(() => {
        if (!authLoading && !user) {
            router.push('/auth/login');
            return;
        }
        if (user) {
            setFormData({
                name: user.name || '',
                phone: user.phone || ''
            });
        }
    }, [user, authLoading]);

    const handleSave = async () => {
        setIsSaving(true);
        try {
            await apiClient.put('/users/profile', formData);
            toast({
                title: 'Profile updated',
                status: 'success',
                duration: 3000
            });
            setIsEditing(false);
        } catch (error) {
            toast({
                title: 'Failed to update profile',
                status: 'error',
                duration: 3000
            });
        } finally {
            setIsSaving(false);
        }
    };

    if (authLoading) {
        return (
            <Center minH="50vh">
                <Spinner size="xl" color="green.500" />
            </Center>
        );
    }

    if (!user) return null;

    return (
        <Container maxW="2xl" py={8}>
            <Heading mb={8}>My Profile</Heading>

            <Card>
                <CardBody>
                    <VStack spacing={6} align="stretch">
                        {/* Avatar & Basic Info */}
                        <HStack spacing={4}>
                            <Avatar size="xl" name={user.name} src={user.avatarUrl} />
                            <Box>
                                <Heading size="md">{user.name}</Heading>
                                <Text color="gray.500">{user.email}</Text>
                                <Badge colorScheme={
                                    user.role === 'ADMIN' ? 'red' :
                                        user.role === 'CLEANER' ? 'blue' : 'green'
                                } mt={2}>
                                    {user.role}
                                </Badge>
                            </Box>
                        </HStack>

                        <Divider />

                        {/* Editable Fields */}
                        <FormControl>
                            <FormLabel>Name</FormLabel>
                            <Input
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                isDisabled={!isEditing}
                            />
                        </FormControl>

                        <FormControl>
                            <FormLabel>Email</FormLabel>
                            <Input value={user.email} isDisabled />
                            <Text fontSize="sm" color="gray.500" mt={1}>
                                Email cannot be changed
                            </Text>
                        </FormControl>

                        <FormControl>
                            <FormLabel>Phone</FormLabel>
                            <Input
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                isDisabled={!isEditing}
                                placeholder="Enter phone number"
                            />
                        </FormControl>

                        <FormControl>
                            <FormLabel>Role</FormLabel>
                            <Input value={user.role} isDisabled />
                        </FormControl>

                        <FormControl>
                            <FormLabel>Member Since</FormLabel>
                            <Input
                                value={new Date(user.createdAt).toLocaleDateString()}
                                isDisabled
                            />
                        </FormControl>

                        <Divider />

                        {/* Actions */}
                        <HStack justify="flex-end" spacing={4}>
                            {isEditing ? (
                                <>
                                    <Button variant="ghost" onClick={() => setIsEditing(false)}>
                                        Cancel
                                    </Button>
                                    <Button
                                        colorScheme="green"
                                        onClick={handleSave}
                                        isLoading={isSaving}
                                    >
                                        Save Changes
                                    </Button>
                                </>
                            ) : (
                                <Button colorScheme="green" onClick={() => setIsEditing(true)}>
                                    Edit Profile
                                </Button>
                            )}
                        </HStack>
                    </VStack>
                </CardBody>
            </Card>
        </Container>
    );
}
