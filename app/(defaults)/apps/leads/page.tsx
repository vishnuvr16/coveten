import ComponentsAppsLeads from '@/components/apps/leads/components-apps-leads';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: 'Leads',
};

const Leads = () => {
    return <ComponentsAppsLeads />;
};

export default Leads;