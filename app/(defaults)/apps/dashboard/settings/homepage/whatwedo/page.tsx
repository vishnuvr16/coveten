import WhatWeDoPage from '@/components/apps/dashboard/settings/homepage/whatwedo/Homepage-whatwedo';
import ComponentsAppsSupport from '@/components/apps/dashboard/support/components-apps-support';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: 'WhatWeDo page',
};

const WhatWeDo = () => {
    return <WhatWeDoPage />;
};

export default WhatWeDo;
