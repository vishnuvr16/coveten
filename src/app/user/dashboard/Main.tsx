'use client'

import React from 'react';
import NotificationBlock from '@/src/components/NotificationBlock';
import InfoCards from '@/src/components/InfoCards';

const Main = () => {
    // Sample static data to replace API calls
    const sampleData = {
        totalProjects: 5,
        totalTickets: 12,
        ongoingTickets: 4,
        completedTickets: 8,
        notifications: [
            {
                title: "New Project Added",
                description: "Project X has been added to your dashboard",
                createdAt: "2025-02-13"
            },
            {
                title: "Ticket Updated",
                description: "Ticket #123 status changed to In Progress",
                createdAt: "2025-02-12"
            }
        ],
        latestTickets: [
            {
                ticket: "Bug Fix #123",
                status: "PENDING",
                createdAt: "2025-02-13"
            },
            {
                ticket: "Feature Request #456",
                status: "IN_PROGRESS",
                createdAt: "2025-02-12"
            },
            {
                ticket: "Documentation Update #789",
                status: "COMPLETED",
                createdAt: "2025-02-11"
            }
        ]
    };

    // Format numbers to always show two digits
    const formatNumber = (num:any) => num < 10 ? `0${num}` : num;

    return (
        <>
            {/* Status Section */}
            <section className="grid lg:grid-cols-3 md:grid-cols-2 gap-6 w-full max-w-6xl">
                <div className='mb-5'>
                    <InfoCards title='Total Projects' value={formatNumber(sampleData.totalProjects)} />
                </div>
                <div className='mb-5'>
                    <InfoCards title='Tickets Created' value={formatNumber(sampleData.totalTickets)} />
                </div>
                <div className='mb-5'>
                    <InfoCards title='On Going' value={formatNumber(sampleData.ongoingTickets)} />
                </div>
                <div className='mb-5'>
                    <InfoCards title='Completed' value={formatNumber(sampleData.completedTickets)} />
                </div>
            </section>

            {/* Chart Section */}
            <section className="grid lg:grid-cols-2 gap-6 w-full my-8 rounded">
                {/* Notifications Panel */}
                <div className="bg-white rounded shadow pb-6 dark:bg-darkBgLight dark:text-white overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
                    <p className="focus:outline-none px-5 pt-5 text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-700">
                        Notifications
                    </p>
                    <NotificationBlock data={sampleData.notifications} />
                </div>

                {/* Latest Tickets Panel */}
                <div className="bg-white rounded shadow dark:bg-darkBgLight dark:text-white">
                    <p className="focus:outline-none px-5 pb-3 pt-5 text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-700">
                        Latest Tickets
                    </p>
                    <div className='space-y-3 mt-3'>
                        {sampleData.latestTickets.map((item, i) => (
                            <div key={i} className='w-full flex items-center justify-between px-3 py-2 border-b'>
                                <div className='flex items-center space-x-3'>
                                    <div className='h-3 w-3 rounded-full bg-green-500'></div>
                                    <div className='text-sm'>
                                        <p className='text-desktopText text-xs xl:text-base'>{item.ticket}</p>
                                        <p className='text-desktopTextLight text-[10px] xl:text-sm'>{item.createdAt}</p>
                                    </div>
                                </div>
                                <div className='flex items-center justify-center space-x-3'>
                                    <button className='bg-primary/10 text-primary text-[10px] xl:text-sm px-4 py-1 rounded-2xl'>
                                        {item.status}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default Main;