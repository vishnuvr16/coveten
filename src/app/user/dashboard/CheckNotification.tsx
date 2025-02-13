
// CheckNotification.tsx
'use client'
import React, { useEffect, useState } from 'react';

interface Props {
  setNewNotificationCount: (count: number) => void;
}

const CheckNotification = ({ setNewNotificationCount }: Props) => {
  const [viewedNotifications, setViewedNotifications] = useState<string[]>([]);

  const handleNotificationView = (id: string) => {
    setViewedNotifications(prev => [...prev, id]);
  };

  // This is a placeholder for demonstration purposes
  // Replace with actual notification data from your backend
  const mockNotifications = [
    {
      id: '1',
      title: 'New Message',
      description: 'You have a new message',
      image: '/notification.png'
    }
  ];

  useEffect(() => {
    // Update notification count based on unviewed notifications
    const unviewedCount = mockNotifications.filter(
      notification => !viewedNotifications.includes(notification.id)
    ).length;
    setNewNotificationCount(unviewedCount);
  }, [mockNotifications, viewedNotifications]);

  return null;
};

export default CheckNotification;