import HomepageClients from '@/components/apps/dashboard/settings/homepage/clients/Homepage-clients';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: 'Home page Clients',
};

const ClientsPage = () => {
    return <HomepageClients />;
};

export default ClientsPage;
