import WhatWeDoDetailsPage from '@/components/apps/dashboard/settings/homepage/whatwedo/details/whatwedo-details';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: 'WhatWeDo Details',
};

const WhatwedoDetails = () => {
    return <WhatWeDoDetailsPage />;
};

export default WhatwedoDetails;
