import HomepageServiceNetworks from '@/src/components/dashboard/settings/homepage/services/network/Homepage-service-network';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: 'Home page capabilities',
};

const ServiceDetailsPage = () => {
    return <HomepageServiceNetworks />;
};

export default ServiceDetailsPage;
