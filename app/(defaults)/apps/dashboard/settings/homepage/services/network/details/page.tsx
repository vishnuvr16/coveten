import HomepageServices from '@/components/apps/dashboard/settings/homepage/services/Homepage-services';
import ServiceNetworkDetails from '@/components/apps/dashboard/settings/homepage/services/network/details/service-networks';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: 'Home page services',
};

const ServiceNetworksPage = () => {
    return <ServiceNetworkDetails />;
};

export default ServiceNetworksPage;