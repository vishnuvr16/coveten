"use client"
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { IRootState } from '@/src/store';
import IconBellBing from '@/src/components/icon/icon-bell-bing';
import IconX from '@/src/components/icon/icon-x';
import IconPlus from '@/src/components/icon/icon-plus';

const NotificationsPage = () => {
    const [activeTab, setActiveTab] = useState('received');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newNotification, setNewNotification] = useState({
        title: '',
        message: '',
        recipient: '',
        priority: 'normal'
    });

    // Get theme config
    const themeConfig = useSelector((state: IRootState) => state.themeConfig);
    const isDark = themeConfig.theme === 'dark';

    // Sample notification data
    const [notifications] = useState({
        received: [
            {
                id: 1,
                title: 'Project Update',
                message: 'New features have been deployed to production',
                sender: 'System Admin',
                time: '2 hours ago',
                priority: 'high'
            },
            {
                id: 2,
                title: 'Meeting Reminder',
                message: 'Team standup in 15 minutes',
                sender: 'Calendar Bot',
                time: '15 min ago',
                priority: 'normal'
            }
        ],
        sent: [
            {
                id: 3,
                title: 'Task Assignment',
                message: 'Please review the updated UI designs',
                recipient: 'Design Team',
                time: '1 hour ago',
                priority: 'high'
            }
        ]
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle notification submission logic here
        setIsModalOpen(false);
        setNewNotification({
            title: '',
            message: '',
            recipient: '',
            priority: 'normal'
        });
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'high':
                return 'text-red-500';
            case 'normal':
                return 'text-primary';
            default:
                return 'text-gray-500';
        }
    };

    return (
        <div className="p-4 lg:p-8">
            {/* Header */}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Notifications</h1>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="btn btn-primary flex items-center gap-2"
                >
                    <IconPlus className="h-4 w-4" />
                    New Notification
                </button>
            </div>

            {/* Tabs */}
            <div className="mb-5 border-b border-gray-200 dark:border-gray-700">
                <div className="flex gap-4">
                    <button
                        className={`pb-4 px-2 text-sm font-semibold border-b-2 transition-all duration-300 ${
                            activeTab === 'received'
                                ? 'border-primary text-primary'
                                : 'border-transparent text-gray-500 hover:text-primary'
                        }`}
                        onClick={() => setActiveTab('received')}
                    >
                        Received
                    </button>
                    <button
                        className={`pb-4 px-2 text-sm font-semibold border-b-2 transition-all duration-300 ${
                            activeTab === 'sent'
                                ? 'border-primary text-primary'
                                : 'border-transparent text-gray-500 hover:text-primary'
                        }`}
                        onClick={() => setActiveTab('sent')}
                    >
                        Sent
                    </button>
                </div>
            </div>

            {/* Notifications List */}
            <div className="grid gap-4">
                {notifications[activeTab as keyof typeof notifications].map((notification) => (
                    <div
                        key={notification.id}
                        className="relative flex items-start gap-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all duration-300 hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
                    >
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                            <IconBellBing className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1">
                            <div className="mb-1 flex items-center justify-between">
                                <h3 className="font-semibold text-gray-900 dark:text-white">{notification.title}</h3>
                                <span className={`text-xs font-medium ${getPriorityColor(notification.priority)}`}>
                                    {notification.priority.toUpperCase()}
                                </span>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{notification.message}</p>
                            <div className="mt-2 flex items-center justify-between">
                                <span className="text-xs text-gray-500">
                                    {activeTab === 'received'
                                        ? `From: ${(notification as { sender: string }).sender}`
                                        : `To: ${(notification as { recipient: string }).recipient}`}
                                </span>
                                <span className="text-xs text-gray-500">{notification.time}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="w-full max-w-md rounded-lg bg-white p-6 dark:bg-gray-800">
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">New Notification</h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                                <IconX className="h-5 w-5" />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
                                <input
                                    type="text"
                                    className="form-input"
                                    value={newNotification.title}
                                    onChange={(e) => setNewNotification({ ...newNotification, title: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Message</label>
                                <textarea
                                    className="form-textarea"
                                    rows={3}
                                    value={newNotification.message}
                                    onChange={(e) => setNewNotification({ ...newNotification, message: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Recipient</label>
                                <input
                                    type="text"
                                    className="form-input"
                                    value={newNotification.recipient}
                                    onChange={(e) => setNewNotification({ ...newNotification, recipient: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Priority</label>
                                <select
                                    className="form-select"
                                    value={newNotification.priority}
                                    onChange={(e) => setNewNotification({ ...newNotification, priority: e.target.value })}
                                >
                                    <option value="normal">Normal</option>
                                    <option value="high">High</option>
                                    <option value="low">Low</option>
                                </select>
                            </div>
                            <div className="flex justify-end gap-3">
                                <button
                                    type="button"
                                    className="btn btn-outline-danger"
                                    onClick={() => setIsModalOpen(false)}
                                >
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-primary">
                                    Send Notification
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NotificationsPage;