'use client'
import React, { useState } from 'react';
import Tabs from './Tabs';
import ModuleTabs from '../AcceptedModules';







const Main = () => {

    // States
    const [isOpen, setIsOpen] = useState(false);
    const [newNotification, setNewNotification] = useState(false);



    return (
        <>
            <ModuleTabs />


        </>
    );
};

export default Main;