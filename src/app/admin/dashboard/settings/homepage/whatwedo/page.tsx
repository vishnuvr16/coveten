import WhatWeDoPage from '@/src/components/dashboard/settings/homepage/whatwedo/Homepage-whatwedo';
import ComponentsAppsSupport from '@/src/components/dashboard/support/components-apps-support';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: 'WhatWeDo page',
};

const WhatWeDo = () => {
    return <WhatWeDoPage />;
};

export default WhatWeDo;
