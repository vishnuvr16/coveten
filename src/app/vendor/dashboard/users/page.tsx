import ComponentsAppsUsers from '@/src/components/dashboard/users/components-apps-users';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: 'Users',
};

const Users = () => {
    return <ComponentsAppsUsers />;
};

export default Users;
