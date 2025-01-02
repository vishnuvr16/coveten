import HomepageAboutCompany from '@/components/apps/dashboard/settings/homepage/about-company/Homepage-about-company';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: 'About company',
};

const AboutCompany = () => {
    return <HomepageAboutCompany />;
};

export default AboutCompany;
