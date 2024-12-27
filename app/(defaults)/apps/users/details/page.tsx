import ComponentsAppsUserDetails from '@/components/apps/users/components-apps-users-details';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: 'User Details',
};

const UserDetails = () => {
    return <ComponentsAppsUserDetails />;
};

export default UserDetails;
