import ComponentsAppsSupport from '@/src/components/dashboard/support/components-apps-support';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: 'Support',
};

const Support = () => {
    return <ComponentsAppsSupport />;
};

export default Support;
