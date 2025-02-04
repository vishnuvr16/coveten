import AboutUs from '@/src/components/dashboard/settings/aboutus/components-aboutus';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: 'About us',
};

const AboutPage = () => {
    return <AboutUs />;
};

export default AboutPage;
