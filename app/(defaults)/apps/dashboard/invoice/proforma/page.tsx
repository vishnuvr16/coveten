import ComponentsAppsProformaInvoice from '@/components/apps/dashboard/invoice/proforma/components-apps-invoice-proforma';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: 'Proforma Invoice',
};

const ProformaInvoice = () => {
    return <ComponentsAppsProformaInvoice />;
};

export default ProformaInvoice;
