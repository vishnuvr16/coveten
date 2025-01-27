import QuotationComplaints from '@/src/components/dashboard/quotations/components-apps-quotations-complaints';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: 'Quotation Complaints',
};

const QuotationComplaintsPage = () => {
    return <QuotationComplaints />;
};

export default QuotationComplaintsPage;
