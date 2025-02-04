
import Leads from '@/src/components/Leads';
import React from 'react';
import Navbar from '../Navbar';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <Navbar />
            {children}
            <Leads/>
        </>
    )
}
