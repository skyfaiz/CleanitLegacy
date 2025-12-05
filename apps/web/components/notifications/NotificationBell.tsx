import { useRef } from 'react';
import {
    Box,
    IconButton,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverFooter,
    VStack,
    HStack,
    Text,
    Badge,
    Button,
    Divider,
    Spinner,
    useDisclosure
} from '@chakra-ui/react';
import { BellIcon } from '@chakra-ui/icons';
import { useNotifications, Notification } from '../../hooks/useNotifications';
import { formatDistanceToNow } from 'date-fns';
import { useRouter } from 'next/router';

// Notification type to icon/color mapping
const notificationStyles: Record<string, { color: string; icon: string }> = {
    CAMPAIGN_FUNDED: { color: 'green', icon: '🎉' },
    CAMPAIGN_CONTRIBUTION: { color: 'blue', icon: '💰' },
    CAMPAIGN_EXPIRED: { color: 'orange', icon: '⏰' },
    CAMPAIGN_CANCELLED: { color: 'red', icon: '❌' },
    CAMPAIGN_APPROVED: { color: 'green', icon: '✅' },
    JOB_CLAIMED: { color: 'blue', icon: '🧹' },
    JOB_COMPLETED: { color: 'green', icon: '✨' },
    JOB_VERIFIED: { color: 'green', icon: '✅' },
    JOB_REJECTED: { color: 'red', icon: '❌' },
    JOB_AUTO_RELEASED: { color: 'orange', icon: '⚠️' },
    PAYOUT_SUCCESS: { color: 'green', icon: '💵' },
    PAYOUT_FAILED: { color: 'red', icon: '❌' },
    REFUND_PROCESSED: { color: 'blue', icon: '↩️' },
    DEADLINE_REMINDER_24H: { color: 'orange', icon: '⏰' },
    DEADLINE_REMINDER_1H: { color: 'red', icon: '🚨' },
    VERIFICATION_NEEDED: { color: 'purple', icon: '👁️' }
};

function NotificationItem({ 
    notification, 
    onRead, 
    onNavigate 
}: { 
    notification: Notification; 
    onRead: () => void;
    onNavigate: () => void;
}) {
    const style = notificationStyles[notification.type] || { color: 'gray', icon: '📢' };
    const timeAgo = formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true });

    const handleClick = () => {
        if (!notification.read) {
            onRead();
        }
        onNavigate();
    };

    return (
        <Box
            p={3}
            bg={notification.read ? 'white' : 'blue.50'}
            borderRadius="md"
            cursor="pointer"
            _hover={{ bg: notification.read ? 'gray.50' : 'blue.100' }}
            onClick={handleClick}
            transition="background 0.2s"
        >
            <HStack align="start" spacing={3}>
                <Text fontSize="xl">{style.icon}</Text>
                <Box flex={1}>
                    <HStack justify="space-between" mb={1}>
                        <Text fontWeight="semibold" fontSize="sm" color={`${style.color}.600`}>
                            {notification.title}
                        </Text>
                        {!notification.read && (
                            <Badge colorScheme="blue" size="sm">New</Badge>
                        )}
                    </HStack>
                    <Text fontSize="sm" color="gray.600" noOfLines={2}>
                        {notification.message}
                    </Text>
                    <Text fontSize="xs" color="gray.400" mt={1}>
                        {timeAgo}
                    </Text>
                </Box>
            </HStack>
        </Box>
    );
}

export default function NotificationBell() {
    const router = useRouter();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const initialFocusRef = useRef(null);
    
    const {
        notifications,
        unreadCount,
        loading,
        fetchNotifications,
        markAsRead,
        markAllAsRead
    } = useNotifications();

    const handleOpen = () => {
        fetchNotifications();
        onOpen();
    };

    const handleNotificationClick = (notification: Notification) => {
        onClose();
        
        // Navigate based on notification type and data
        const data = notification.data || {};
        if (data.campaignId) {
            router.push(`/campaigns/${data.campaignId}`);
        } else if (data.jobId) {
            router.push(`/jobs/${data.jobId}`);
        }
    };

    return (
        <Popover
            isOpen={isOpen}
            onOpen={handleOpen}
            onClose={onClose}
            placement="bottom-end"
            initialFocusRef={initialFocusRef}
        >
            <PopoverTrigger>
                <Box position="relative" display="inline-block">
                    <IconButton
                        aria-label="Notifications"
                        icon={<BellIcon />}
                        variant="ghost"
                        size="md"
                    />
                    {unreadCount > 0 && (
                        <Badge
                            position="absolute"
                            top="-1"
                            right="-1"
                            colorScheme="red"
                            borderRadius="full"
                            minW="5"
                            textAlign="center"
                            fontSize="xs"
                        >
                            {unreadCount > 99 ? '99+' : unreadCount}
                        </Badge>
                    )}
                </Box>
            </PopoverTrigger>

            <PopoverContent width="380px" maxH="500px">
                <PopoverHeader fontWeight="bold" borderBottomWidth={1}>
                    <HStack justify="space-between">
                        <Text>Notifications</Text>
                        {unreadCount > 0 && (
                            <Button
                                size="xs"
                                variant="ghost"
                                colorScheme="blue"
                                onClick={markAllAsRead}
                            >
                                Mark all read
                            </Button>
                        )}
                    </HStack>
                </PopoverHeader>

                <PopoverBody p={0} maxH="350px" overflowY="auto">
                    {loading ? (
                        <Box p={8} textAlign="center">
                            <Spinner />
                        </Box>
                    ) : notifications.length === 0 ? (
                        <Box p={8} textAlign="center">
                            <Text fontSize="3xl" mb={2}>🔔</Text>
                            <Text color="gray.500">No notifications yet</Text>
                        </Box>
                    ) : (
                        <VStack spacing={0} divider={<Divider />} align="stretch">
                            {notifications.map(notification => (
                                <NotificationItem
                                    key={notification.id}
                                    notification={notification}
                                    onRead={() => markAsRead(notification.id)}
                                    onNavigate={() => handleNotificationClick(notification)}
                                />
                            ))}
                        </VStack>
                    )}
                </PopoverBody>

                {notifications.length > 0 && (
                    <PopoverFooter borderTopWidth={1}>
                        <Button
                            size="sm"
                            variant="ghost"
                            width="100%"
                            onClick={() => {
                                onClose();
                                router.push('/notifications');
                            }}
                        >
                            View all notifications
                        </Button>
                    </PopoverFooter>
                )}
            </PopoverContent>
        </Popover>
    );
}
