import ComponentsAppsMailbox from '@/src/components/dashboard/mailbox/components-apps-mailbox';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: 'Mailbox',
};

const Mailbox = () => {
    return <ComponentsAppsMailbox />;
};

export default Mailbox;
