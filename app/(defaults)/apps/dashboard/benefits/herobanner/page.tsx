
import HeroBanner from '@/components/apps/dashboard/benefits/HeroBanner';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: 'Hero Banner',
};

const Hero = () => {
    return <HeroBanner />;
};

export default Hero;
