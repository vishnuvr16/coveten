import HomepageHero from '@/src/components/dashboard/settings/homepage/hero/Homepage-hero';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: 'Homepage hero',
};

const HeroPage = () => {
    return <HomepageHero />;
};

export default HeroPage;
