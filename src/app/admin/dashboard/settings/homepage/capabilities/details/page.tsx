import CapabilitiesPage from '@/src/components/dashboard/settings/homepage/capabilities/details/page';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: 'Home page capabilities',
};

const CapabilitiesDetails = () => {
    return <CapabilitiesPage />;
};

export default CapabilitiesDetails;
