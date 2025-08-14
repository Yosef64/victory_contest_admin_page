// src/context/NotificationContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import axios from 'axios';

interface Notification {
  id: string;
  message: string;
  type: string;
  read: boolean;
  createdAt: string;
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  fetchNotifications: () => Promise<void>;
  markAsRead: () => Promise<void>;
  addNotification: (message: string, type: string) => Promise<void>;
}

const NotificationContext = createContext<NotificationContextType | null>(null);

export const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchNotifications = async () => {
    if (!user) return;
    try {
      const response = await axios.get('/api/notifications');
      // Ensure response.data is an array
      const notifications = Array.isArray(response.data) ? response.data : [];
      setNotifications(notifications);
      setUnreadCount(notifications.filter((n: Notification) => !n.read).length);
    } catch (error) {
      console.error('Failed to fetch notifications', error);
    }
  };

  const markAsRead = async () => {
    try {
      await axios.post('/api/notifications/mark-read');
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
      setUnreadCount(0);
    } catch (error) {
      console.error('Failed to mark notifications as read', error);
    }
  };

  const addNotification = async (message: string, type: string) => {
    if (!user) return;
    try {
      await axios.post('/api/notifications', { message, type });
      await fetchNotifications(); // Refresh notifications
    } catch (error) {
      console.error('Failed to add notification', error);
    }
  };

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000); // Poll every 30 seconds
    return () => clearInterval(interval);
  }, [user]);

  return (
    <NotificationContext.Provider
      value={{ notifications, unreadCount, fetchNotifications, markAsRead, addNotification }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};