import CategoriesPage from '@/components/apps/dashboard/settings/category/Components-category';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: 'Categories',
};

const Category = () => {
    return <CategoriesPage />;
};

export default Category;