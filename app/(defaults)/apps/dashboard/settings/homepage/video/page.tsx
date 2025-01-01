import HomepageVideo from '@/components/apps/dashboard/settings/homepage/HomepageVideo';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: 'Home page',
};

const Video = () => {
    return <HomepageVideo />;
};

export default Video;
