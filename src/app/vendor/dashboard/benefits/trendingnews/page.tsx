
import TrendingNews from '@/src/components/dashboard/benefits/TrendingNews';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: 'Trending News',
};

const News = () => {
    return <TrendingNews />;
};

export default News;
