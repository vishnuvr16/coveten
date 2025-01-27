import HomepageCapabilities from '@/src/components/dashboard/settings/homepage/capabilities/HomepageCapabilities';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: 'Home page capabilities',
};

const Capabilities = () => {
    return <HomepageCapabilities />;
};

export default Capabilities;
