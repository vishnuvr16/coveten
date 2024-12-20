import CreateQuotation from '@/components/apps/quotations/components-apps-quotation-add';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: 'Create New Quotations',
};

const createQuotation = () => {
    return <CreateQuotation />;
};

export default createQuotation;
