import ProductpageHeroDetails from '@/components/apps/dashboard/settings/productpage/hero/details/Productpage-hero-details';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: 'Support',
};

const HeroDetails = () => {
    return <ProductpageHeroDetails />;
};

export default HeroDetails;
