import IndustryPage from '@/src/components/dashboard/settings/industry/components-industry';
import IndustryDetails from '@/src/components/dashboard/settings/industry/details/ProductpageAdsDetails';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: 'Support',
};

const IndustryDetailsPage = () => {
    return <IndustryDetails />;
};

export default IndustryDetailsPage;
