import CreateQuotation from '@/src/components/dashboard/quotations/components-apps-quotation-add';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: 'Create New Quotations',
};

const createQuotation = () => {
    return <CreateQuotation />;
};

export default createQuotation;
