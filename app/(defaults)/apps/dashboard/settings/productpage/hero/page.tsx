import ProductpageHero from '@/components/apps/dashboard/settings/productpage/hero/Productpage-hero';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: 'Support',
};

const HeroPage = () => {
    return <ProductpageHero />;
};

export default HeroPage;
