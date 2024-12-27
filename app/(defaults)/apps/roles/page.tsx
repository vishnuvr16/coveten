import ComponentsAppsRoles from '@/components/apps/roles/components-apps-roles';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: 'Roles',
};

const Roles = () => {
    return <ComponentsAppsRoles />;
};

export default Roles;
