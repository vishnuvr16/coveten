
import Advertisement from '@/src/components/dashboard/benefits/Advertisement';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: 'Advertisement',
};

const AdvertisementPage = () => {
    return <Advertisement />;
};

export default AdvertisementPage;
