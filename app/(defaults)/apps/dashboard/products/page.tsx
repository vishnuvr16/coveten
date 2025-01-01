import ComponentsAppsProducts from '@/components/apps/dashboard/product/components-apps-add-product';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: 'Products',
};

const Products = () => {
    return <ComponentsAppsProducts />;
};

export default Products;
