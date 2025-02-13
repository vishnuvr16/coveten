
import ComponentsAppsBenefits from '@/src/components/dashboard/benefits/components-apps-benefits';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: 'Add Benefits',
};

const Benefits = () => {
    return <ComponentsAppsBenefits />;
};

export default Benefits;
