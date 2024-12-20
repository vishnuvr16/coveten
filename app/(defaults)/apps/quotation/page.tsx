import QuotationPage from '@/components/apps/quotations/components-apps-quotations';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: 'Quotations',
};

const Quotations = () => {
    return <QuotationPage />;
};

export default Quotations;
