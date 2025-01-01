import NotificationsPage from '@/components/apps/dashboard/notifications/components-apps-notifications';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: 'Notifications',
};

const Mailbox = () => {
    return <NotificationsPage />;
};

export default Mailbox;
