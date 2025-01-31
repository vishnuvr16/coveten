import Leads from '@/src/components/Leads';
import React from 'react';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            {children}
            <Leads />
        </>
    )
}
