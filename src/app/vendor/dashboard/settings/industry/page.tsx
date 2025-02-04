import IndustryPage from '@/src/components/dashboard/settings/industry/components-industry';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: 'Support',
};

const Industry = () => {
    return <IndustryPage />;
};

export default Industry;
