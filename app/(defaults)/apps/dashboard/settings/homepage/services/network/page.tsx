import HomepageServiceNetworks from '@/components/apps/dashboard/settings/homepage/services/network/Homepage-service-network';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: 'Home page services',
};

const ServiceNetwork = () => {
    return <HomepageServiceNetworks />;
};

export default ServiceNetwork;
