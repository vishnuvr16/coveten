import ServicesPage from '@/src/components/dashboard/settings/services/components-services';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: 'Services',
};

const Services = () => {
    return <ServicesPage />;
};

export default Services;
