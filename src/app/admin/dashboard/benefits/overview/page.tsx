
import Overview from '@/src/components/dashboard/benefits/overview';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: 'Overview',
};

const OverviewPage = () => {
    return <Overview />;
};

export default OverviewPage;
