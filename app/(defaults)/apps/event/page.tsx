import ComponentsAppsEvent from '@/components/apps/event/components-apps-event';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: 'Events',
};

const Events = () => {
    return <ComponentsAppsEvent />;
};

export default Events;
