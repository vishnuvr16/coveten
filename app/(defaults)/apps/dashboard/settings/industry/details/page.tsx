import IndustryPage from '@/components/apps/dashboard/settings/industry/components-industry';
import IndustryDetails from '@/components/apps/dashboard/settings/industry/details/ProductpageAdsDetails';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: 'Support',
};

const IndustryDetailsPage = () => {
    return <IndustryDetails />;
};

export default IndustryDetailsPage;
