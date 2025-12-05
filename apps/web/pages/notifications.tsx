import { useEffect } from 'react';
import {
    Box,
    Container,
    Heading,
    VStack,
    HStack,
    Text,
    Badge,
    Button,
    Spinner,
    Divider,
    IconButton,
    useToast
} from '@chakra-ui/react';
import { DeleteIcon, CheckIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/router';
import { formatDistanceToNow } from 'date-fns';
import Layout from '../components/layout/Layout';
import { useNotifications, Notification } from '../hooks/useNotifications';
import { useAuth } from '../hooks/useAuth';

// Notification type to icon/color mapping
const notificationStyles: Record<string, { color: string; icon: string; label: string }> = {
    CAMPAIGN_FUNDED: { color: 'green', icon: '🎉', label: 'Campaign Funded' },
    CAMPAIGN_CONTRIBUTION: { color: 'blue', icon: '💰', label: 'Contribution' },
    CAMPAIGN_EXPIRED: { color: 'orange', icon: '⏰', label: 'Expired' },
    CAMPAIGN_CANCELLED: { color: 'red', icon: '❌', label: 'Cancelled' },
    CAMPAIGN_APPROVED: { color: 'green', icon: '✅', label: 'Approved' },
    CAMPAIGN_CREATED: { color: 'blue', icon: '📝', label: 'Created' },
    JOB_AVAILABLE: { color: 'green', icon: '🧹', label: 'Job Available' },
    JOB_CLAIMED: { color: 'blue', icon: '🤝', label: 'Job Claimed' },
    JOB_COMPLETED: { color: 'green', icon: '✨', label: 'Completed' },
    JOB_VERIFIED: { color: 'green', icon: '✅', label: 'Verified' },
    JOB_REJECTED: { color: 'red', icon: '❌', label: 'Rejected' },
    JOB_AUTO_RELEASED: { color: 'orange', icon: '⚠️', label: 'Released' },
    JOB_UNCLAIMED: { color: 'orange', icon: '↩️', label: 'Unclaimed' },
    PAYOUT_SUCCESS: { color: 'green', icon: '💵', label: 'Payment' },
    PAYOUT_FAILED: { color: 'red', icon: '❌', label: 'Payment Failed' },
    REFUND_PROCESSED: { color: 'blue', icon: '↩️', label: 'Refund' },
    DEADLINE_REMINDER_24H: { color: 'orange', icon: '⏰', label: 'Reminder' },
    DEADLINE_REMINDER_1H: { color: 'red', icon: '🚨', label: 'Urgent' },
    VERIFICATION_NEEDED: { color: 'purple', icon: '👁️', label: 'Review Needed' }
};

function NotificationCard({
    notification,
    onRead,
    onDelete,
    onNavigate
}: {
    notification: Notification;
    onRead: () => void;
    onDelete: () => void;
    onNavigate: () => void;
}) {
    const style = notificationStyles[notification.type] || { color: 'gray', icon: '📢', label: 'Notification' };
    const timeAgo = formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true });

    return (
        <Box
            p={4}
            bg={notification.read ? 'white' : 'blue.50'}
            borderWidth={1}
            borderColor={notification.read ? 'gray.200' : 'blue.200'}
            borderRadius="lg"
            cursor="pointer"
            _hover={{ shadow: 'md' }}
            transition="all 0.2s"
        >
            <HStack justify="space-between" align="start">
                <HStack align="start" spacing={4} flex={1} onClick={onNavigate}>
                    <Text fontSize="2xl">{style.icon}</Text>
                    <Box flex={1}>
                        <HStack mb={1}>
                            <Badge colorScheme={style.color} fontSize="xs">
                                {style.label}
                            </Badge>
                            {!notification.read && (
                                <Badge colorScheme="blue" fontSize="xs">New</Badge>
                            )}
                        </HStack>
                        <Text fontWeight="semibold" mb={1}>
                            {notification.title}
                        </Text>
                        <Text color="gray.600" fontSize="sm">
                            {notification.message}
                        </Text>
                        <Text fontSize="xs" color="gray.400" mt={2}>
                            {timeAgo}
                        </Text>
                    </Box>
                </HStack>
                <VStack spacing={1}>
                    {!notification.read && (
                        <IconButton
                            aria-label="Mark as read"
                            icon={<CheckIcon />}
                            size="sm"
                            variant="ghost"
                            colorScheme="green"
                            onClick={(e) => {
                                e.stopPropagation();
                                onRead();
                            }}
                        />
                    )}
                    <IconButton
                        aria-label="Delete"
                        icon={<DeleteIcon />}
                        size="sm"
                        variant="ghost"
                        colorScheme="red"
                        onClick={(e) => {
                            e.stopPropagation();
                            onDelete();
                        }}
                    />
                </VStack>
            </HStack>
        </Box>
    );
}

export default function NotificationsPage() {
    const router = useRouter();
    const toast = useToast();
    const { user, loading: authLoading } = useAuth();
    const {
        notifications,
        unreadCount,
        loading,
        error,
        fetchNotifications,
        markAsRead,
        markAllAsRead,
        deleteNotification
    } = useNotifications();

    useEffect(() => {
        if (!authLoading && !user) {
            router.push('/auth/login');
        }
    }, [user, authLoading, router]);

    useEffect(() => {
        if (user) {
            fetchNotifications();
        }
    }, [user, fetchNotifications]);

    const handleNotificationClick = (notification: Notification) => {
        if (!notification.read) {
            markAsRead(notification.id);
        }

        const data = notification.data || {};
        if (data.campaignId) {
            router.push(`/campaigns/${data.campaignId}`);
        } else if (data.jobId) {
            router.push(`/jobs/${data.jobId}`);
        }
    };

    const handleDelete = async (id: string) => {
        await deleteNotification(id);
        toast({
            title: 'Notification deleted',
            status: 'success',
            duration: 2000
        });
    };

    if (authLoading || !user) {
        return (
            <Layout>
                <Container maxW="4xl" py={8}>
                    <Box textAlign="center" py={20}>
                        <Spinner size="xl" />
                    </Box>
                </Container>
            </Layout>
        );
    }

    return (
        <Layout>
            <Container maxW="4xl" py={8}>
                <HStack justify="space-between" mb={6}>
                    <Box>
                        <Heading size="lg">Notifications</Heading>
                        {unreadCount > 0 && (
                            <Text color="gray.500" fontSize="sm">
                                {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
                            </Text>
                        )}
                    </Box>
                    {unreadCount > 0 && (
                        <Button
                            size="sm"
                            colorScheme="blue"
                            variant="outline"
                            onClick={markAllAsRead}
                        >
                            Mark all as read
                        </Button>
                    )}
                </HStack>

                {loading ? (
                    <Box textAlign="center" py={20}>
                        <Spinner size="xl" />
                    </Box>
                ) : error ? (
                    <Box textAlign="center" py={20}>
                        <Text color="red.500">{error}</Text>
                        <Button mt={4} onClick={() => fetchNotifications()}>
                            Retry
                        </Button>
                    </Box>
                ) : notifications.length === 0 ? (
                    <Box textAlign="center" py={20}>
                        <Text fontSize="5xl" mb={4}>🔔</Text>
                        <Heading size="md" color="gray.500" mb={2}>
                            No notifications yet
                        </Heading>
                        <Text color="gray.400">
                            You'll see updates about your campaigns and jobs here
                        </Text>
                    </Box>
                ) : (
                    <VStack spacing={3} align="stretch">
                        {notifications.map(notification => (
                            <NotificationCard
                                key={notification.id}
                                notification={notification}
                                onRead={() => markAsRead(notification.id)}
                                onDelete={() => handleDelete(notification.id)}
                                onNavigate={() => handleNotificationClick(notification)}
                            />
                        ))}
                    </VStack>
                )}
            </Container>
        </Layout>
    );
}
