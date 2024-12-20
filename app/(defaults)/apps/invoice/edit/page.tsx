import ComponentsAppsInvoiceEdit from '@/components/apps/invoice/components-apps-invoice-edit';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: 'Invoice Edit',
};

const InvoiceEdit = () => {
    return <ComponentsAppsInvoiceEdit />;
};

export default InvoiceEdit;
