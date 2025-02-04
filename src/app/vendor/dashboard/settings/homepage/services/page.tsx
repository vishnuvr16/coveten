import HomepageServices from '@/src/components/dashboard/settings/homepage/services/Homepage-services';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: 'Home page services',
};

const Services = () => {
    return <HomepageServices />;
};

export default Services;
