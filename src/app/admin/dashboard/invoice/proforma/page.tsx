import ComponentsAppsProformaInvoice from '@/src/components/dashboard/invoice/proforma/components-apps-invoice-proforma';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: 'Proforma Invoice',
};

const ProformaInvoice = () => {
    return <ComponentsAppsProformaInvoice />;
};

export default ProformaInvoice;
