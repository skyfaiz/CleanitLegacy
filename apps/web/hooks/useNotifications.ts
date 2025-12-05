import { useState, useEffect, useCallback } from 'react';
import { apiClient } from '../lib/api';

export interface Notification {
    id: string;
    type: string;
    title: string;
    message: string;
    data?: Record<string, any>;
    read: boolean;
    createdAt: string;
}

interface NotificationsResponse {
    notifications: Notification[];
    unreadCount: number;
    pagination: {
        page: number;
        limit: number;
        total: number;
        pages: number;
    };
}

export function useNotifications() {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Fetch notifications
    const fetchNotifications = useCallback(async (unreadOnly = false) => {
        try {
            setLoading(true);
            setError(null);
            const response = await apiClient.get<NotificationsResponse>('/notifications', {
                params: { unreadOnly, limit: 20 }
            });
            setNotifications(response.data.notifications);
            setUnreadCount(response.data.unreadCount);
        } catch (err: any) {
            setError(err.response?.data?.error || 'Failed to fetch notifications');
        } finally {
            setLoading(false);
        }
    }, []);

    // Fetch unread count only
    const fetchUnreadCount = useCallback(async () => {
        try {
            const response = await apiClient.get<{ unreadCount: number }>('/notifications/unread-count');
            setUnreadCount(response.data.unreadCount);
        } catch (err) {
            console.error('Failed to fetch unread count:', err);
        }
    }, []);

    // Mark single notification as read
    const markAsRead = useCallback(async (notificationId: string) => {
        try {
            await apiClient.post(`/notifications/${notificationId}/read`);
            setNotifications(prev =>
                prev.map(n => n.id === notificationId ? { ...n, read: true } : n)
            );
            setUnreadCount(prev => Math.max(0, prev - 1));
        } catch (err: any) {
            console.error('Failed to mark notification as read:', err);
        }
    }, []);

    // Mark all notifications as read
    const markAllAsRead = useCallback(async () => {
        try {
            await apiClient.post('/notifications/read-all');
            setNotifications(prev => prev.map(n => ({ ...n, read: true })));
            setUnreadCount(0);
        } catch (err: any) {
            console.error('Failed to mark all as read:', err);
        }
    }, []);

    // Delete a notification
    const deleteNotification = useCallback(async (notificationId: string) => {
        try {
            await apiClient.delete(`/notifications/${notificationId}`);
            const notification = notifications.find(n => n.id === notificationId);
            setNotifications(prev => prev.filter(n => n.id !== notificationId));
            if (notification && !notification.read) {
                setUnreadCount(prev => Math.max(0, prev - 1));
            }
        } catch (err: any) {
            console.error('Failed to delete notification:', err);
        }
    }, [notifications]);

    // Poll for new notifications every 30 seconds
    useEffect(() => {
        fetchUnreadCount();
        const interval = setInterval(fetchUnreadCount, 30000);
        return () => clearInterval(interval);
    }, [fetchUnreadCount]);

    return {
        notifications,
        unreadCount,
        loading,
        error,
        fetchNotifications,
        fetchUnreadCount,
        markAsRead,
        markAllAsRead,
        deleteNotification
    };
}
