import api from './api';

export interface Notification {
    id: string;
    recipient_id: string;
    title: string;
    message: string;
    is_read: boolean;
    sent_at: string;
    type: string;
}

export const notificationService = {
    // Get notifications for a specific admin by email
    async getNotificationsByAdminEmail(adminEmail: string): Promise<Notification[]> {
        try {
            const response = await api.get(`/api/notification/admin/${encodeURIComponent(adminEmail)}`);
            return response.data.notifications || [];
        } catch (error) {
            console.error('Failed to fetch notifications:', error);
            return [];
        }
    },

    // Mark a notification as read
    async markNotificationAsRead(notificationId: string): Promise<void> {
        try {
            await api.patch(`/api/notification/${notificationId}`, {
                is_read: true
            });
        } catch (error) {
            console.error('Failed to mark notification as read:', error);
        }
    },

    // Delete a notification
    async deleteNotification(notificationId: string): Promise<void> {
        try {
            await api.delete(`/api/notification/${notificationId}`);
        } catch (error) {
            console.error('Failed to delete notification:', error);
        }
    },

    // Get unread count for an admin
    async getUnreadCount(adminEmail: string): Promise<number> {
        try {
            const notifications = await this.getNotificationsByAdminEmail(adminEmail);
            return notifications.filter(n => !n.is_read).length;
        } catch (error) {
            console.error('Failed to get unread count:', error);
            return 0;
        }
    }
}; 