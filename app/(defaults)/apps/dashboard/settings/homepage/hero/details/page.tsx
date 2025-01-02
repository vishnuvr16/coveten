import HomepageHeroDetails from '@/components/apps/dashboard/settings/homepage/hero/details/Homepage-hero-details';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: 'Homepage Hero Details',
};

const HeroDetails = () => {
    return <HomepageHeroDetails />;
};

export default HeroDetails;
