'use client'
import React, { useState } from 'react';
import { AiFillEye } from 'react-icons/ai';

interface INotification {
    id: string;
    image: string;
    title: string;
    notificationFor: string;
    description: string;
    createdAt: string;
}

const NotificationList = () => {
    // Sample data - in a real app this would come from props or an API
    const sampleNotifications: INotification[] = [
        {
            id: '1',
            image: '/sample.jpg',
            title: 'New Feature Released',
            notificationFor: 'GENERAL',
            description: 'We have released a new feature for all users',
            createdAt: '2025-02-13T10:30:00Z'
        },
        {
            id: '2',
            image: '/sample2.jpg',
            title: 'System Maintenance',
            notificationFor: 'CLIENT',
            description: 'Scheduled maintenance notification',
            createdAt: '2025-02-13T09:15:00Z'
        }
    ];

    const [currentPage, setCurrentPage] = useState(1);
    const [isNotificationViewModalOpen, setIsNotificationViewModalOpen] = useState(false);
    const [currentNotification, setCurrentNotification] = useState<INotification | null>(null);
    const pageLimit = 10;
    const totalPages = Math.ceil(sampleNotifications.length / pageLimit);

    const handleViewNotification = (notification: INotification) => {
        setIsNotificationViewModalOpen(true);
        setCurrentNotification(notification);
    };

    const Pagination = ({ currentPage, setCurrentPage, totalPages }: any) => {
        return (
            <div className="flex items-center justify-center gap-2 mt-4">
                <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1 bg-gray-100 rounded disabled:opacity-50"
                >
                    Previous
                </button>
                <span>{currentPage} of {totalPages}</span>
                <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 bg-gray-100 rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        );
    };

    const NotificationView = ({ isOpen, onClose, notification }: any) => {
        if (!isOpen || !notification) return null;

        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="bg-white p-6 rounded-lg max-w-lg w-full">
                    <h2 className="text-xl font-bold mb-4">{notification.title}</h2>
                    <p className="mb-4">{notification.description}</p>
                    <p className="text-sm text-gray-500">
                        Created at: {new Date(notification.createdAt).toLocaleString()}
                    </p>
                    <button
                        onClick={onClose}
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Close
                    </button>
                </div>
            </div>
        );
    };

    if (sampleNotifications.length === 0) {
        return <div className="w-full h-full mt-12 text-sm mx-5">No Data Found</div>;
    }

    return (
        <div>
            <div className="w-full h-full">
                <div className="bg-white h-full min-h-[400px] py-4 md:py-7 px-4 md:px-8 xl:px-10">
                    <div className="mt-7 overflow-x-auto">
                        <table className="w-full whitespace-nowrap">
                            <tbody>
                                {sampleNotifications.map((item: INotification) => (
                                    <div key={item.id} className="w-full flex items-center justify-center">
                                        <tr className="focus:outline-none w-full h-16 border border-gray-100 rounded grid grid-cols-8 place-content-center">
                                            <td className="text-center col-span-3 mt-3">
                                                <div className="flex items-center pl-5">
                                                    <p className="text-base font-medium leading-none text-gray-700 mr-2">
                                                        {item.title}
                                                    </p>
                                                </div>
                                            </td>
                                            <td className="text-center mt-3">
                                                <div className="flex items-center">
                                                    <p className="text-sm leading-none text-gray-600 ml-2">
                                                        {new Date(item.createdAt).toLocaleDateString()}
                                                    </p>
                                                </div>
                                            </td>
                                            <td className="ml-2 text-center col-span-2">
                                                <button className="py-3 px-3 text-sm focus:outline-none leading-none text-blue-500 bg-blue-100 rounded">
                                                    Published at {new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </button>
                                            </td>
                                            <td className="text-center col-span-2">
                                                <div className="relative flex items-center justify-around px-8">
                                                    <button
                                                        onClick={() => handleViewNotification(item)}
                                                        className="focus:ring-2 focus:ring-offset-2 text-sm leading-none text-blue-500 py-2 px-2 bg-gray-100 rounded hover:bg-gray-200 focus:outline-none"
                                                    >
                                                        <AiFillEye />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr className="h-3"></tr>
                                    </div>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div className="w-full flex items-center justify-center">
                {sampleNotifications.length > pageLimit && (
                    <Pagination
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        totalPages={totalPages}
                    />
                )}
            </div>

            <NotificationView
                isOpen={isNotificationViewModalOpen}
                onClose={() => setIsNotificationViewModalOpen(false)}
                notification={currentNotification}
            />
        </div>
    );
};

export default NotificationList;