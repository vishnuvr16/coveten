import ComponentsAppsTickets from '@/components/apps/dashboard/tickets/components-apps-tickets';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: 'All Tickets',
};

const Tickets = () => {
    return <ComponentsAppsTickets />;
};

export default Tickets;