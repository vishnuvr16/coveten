"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import ReactApexChart from 'react-apexcharts';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  TrendingUp,
  FilePlus,
  Clock,
  CheckSquare,
  Check,
  Bell,
  MoreHorizontal,
  ArrowUp,
  ArrowDown,
  Folder,
  AlertCircle
} from 'lucide-react';
import { IRootState } from '@/src/store';
import IconChecks from '@/src/components/icon/icon-checks';
import IconFile from '@/src/components/icon/icon-file';
import IconTrendingUp from '@/src/components/icon/icon-trending-up';
import IconBell from '@/src/components/icon/icon-bell';

interface StatData {
    series: number[] | { name: string; data: number[] }[];
    options: any;
}

interface Stat {
    title: string;
    value: number;
    change: number;
    icon: JSX.Element;
    type: 'radialBar' | 'line' | 'bar' | 'area' | 'donut';
    color: string;
    data: StatData;
}

const DashboardAnalytics = () => {
    const [isMounted, setIsMounted] = useState(false);
    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl';
    
    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Analytics Cards Data
    const analyticsStats: Stat[] = [
        {
            title: 'Total Projects',
            value: 4,
            change: +15,
            icon: <Folder className="w-6 h-6" />,
            type: 'radialBar',
            color: '#4361ee',
            data: {
                series: [65],
                options: {
                    chart: { sparkline: { enabled: true } },
                    plotOptions: {
                        radialBar: {
                            hollow: { size: '65%' },
                            track: { background: '#e0e6ed' },
                            dataLabels: {
                                name: { show: false },
                                value: { offsetY: 5 }
                            }
                        }
                    }
                }
            }
        },
        {
            title: 'Tickets Created',
            value: 5,
            change: -8,
            icon: <FilePlus className="w-6 h-6" />,
            type: 'line',
            color: '#00ab55',
            data: {
                series: [{
                    name: 'Tickets',
                    data: [21, 9, 36, 12, 44, 25, 59]
                }],
                options: {
                    chart: {
                        sparkline: { enabled: true },
                        toolbar: { show: false }
                    },
                    stroke: { curve: 'smooth', width: 2 },
                    markers: { size: 0 }
                }
            }
        },
        {
            title: 'Ongoing Tickets',
            value: 1,
            change: +23,
            icon: <Clock className="w-6 h-6" />,
            type: 'bar',
            color: '#ffc107',
            data: {
                series: [{
                    name: 'Progress',
                    data: [44, 55, 41, 67, 22, 43]
                }],
                options: {
                    chart: {
                        sparkline: { enabled: true },
                        toolbar: { show: false }
                    },
                    plotOptions: {
                        bar: {
                            borderRadius: 2,
                            columnWidth: '60%'
                        }
                    }
                }
            }
        },
        {
            title: 'Rejected Tickets',
            value: 0,
            change: 0,
            icon: <AlertCircle className="w-6 h-6" />,
            type: 'area',
            color: '#dc3545',
            data: {
                series: [{
                    name: 'Rejected',
                    data: [31, 40, 28, 51, 42, 109, 100]
                }],
                options: {
                    chart: {
                        sparkline: { enabled: true },
                        toolbar: { show: false }
                    },
                    fill: {
                        type: 'gradient',
                        gradient: {
                            shadeIntensity: 1,
                            opacityFrom: 0.7,
                            opacityTo: 0.3
                        }
                    }
                }
            }
        },
        {
            title: 'Completed Tickets',
            value: 1,
            change: +12,
            icon: <CheckSquare className="w-6 h-6" />,
            type: 'donut',
            color: '#05b187',
            data: {
                series: [44, 55, 41],
                options: {
                    chart: {
                        sparkline: { enabled: true },
                        toolbar: { show: false }
                    },
                    stroke: { width: 2 },
                    legend: { show: false }
                }
            }
        }
    ];

    // Notifications Data
    const notifications = [
        {
            icon: <IconChecks className="h-5 w-5 text-success" />,
            title: 'Vendor has ACCEPTED a module',
            description: 'Vendor has ACCEPTED a module',
            time: '2024-10-01'
        },
        {
            icon: <IconFile className="h-5 w-5 text-primary" />,
            title: 'A user has complained on a quotation',
            description: 'A user has complained quotation. Check the quotation',
            time: '2024-10-01'
        },
        {
            icon: <IconTrendingUp className="h-5 w-5 text-warning" />,
            title: 'A user has created a new project',
            description: 'A user has created a new project with ticket P-005',
            time: '2024-10-01'
        }
    ];

    // Latest Tickets
    const latestTickets = [
        {
            id: 'M-006',
            title: 'UI/UX Design Issue',
            status: 'In Progress',
            priority: 'High',
            assignee: 'Sarah Johnson'
        },
        {
            id: 'M-007',
            title: 'Backend API Integration',
            status: 'Pending',
            priority: 'Medium',
            assignee: 'Mike Williams'
        },
        {
            id: 'M-008',
            title: 'Mobile App Bug',
            status: 'Resolved',
            priority: 'Low',
            assignee: 'Emily Brown'
        }
    ];

    const StatCard: React.FC<{ stat: Stat }> = ({ stat }) => {
        return (
            <div className="panel h-full p-6 overflow-hidden relative">
                <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center">
                        <span className={`p-2 rounded-lg mr-4`} style={{ backgroundColor: `${stat.color}20` }}>
                            {React.cloneElement(stat.icon, { color: stat.color })}
                        </span>
                        <div>
                            <h5 className="text-lg font-semibold mb-1">{stat.title}</h5>
                            <div className="flex items-center">
                                <span className="text-3xl font-bold mr-2" style={{ color: stat.color }}>{stat.value}</span>
                                {stat.change !== 0 && (
                                    <span className={`flex items-center text-sm ${stat.change > 0 ? 'text-green-500' : 'text-red-500'}`}>
                                        {stat.change > 0 ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                                        {Math.abs(stat.change)}%
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600">
                        <MoreHorizontal className="w-5 h-5" />
                    </button>
                </div>

                <div className="mt-5" style={{ height: '100px' }}>
                    {isMounted && (
                        <ReactApexChart
                            options={stat.data.options}
                            series={stat.data.series}
                            type={stat.type}
                            height="100%"
                        />
                    )}
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Progress</span>
                        <div className="flex items-center">
                            <div className="w-24 h-2 bg-gray-100 rounded-full mr-2">
                                <div 
                                    className="h-full rounded-full" 
                                    style={{ 
                                        width: `${stat.data.series[0]}%`,
                                        backgroundColor: stat.color 
                                    }}
                                />
                            </div>
                            <span className="text-gray-600">
                                {typeof stat.data.series[0] === 'number' ? stat.data.series[0] : 0}%
                            </span>

                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const primaryColor = useSelector((state: IRootState)=> state.themeConfig.primaryColor);
    const backgroundColor = useSelector((state:IRootState) => state.themeConfig.backgroundColor)

    return (
        <div className="space-y-6">
            {/* Breadcrumb */}
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link href="/" className="text-blue-500 hover:underline">
                        Dashboard
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Analytics</span>
                </li>
            </ul>

            {/* Analytics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {analyticsStats.map((stat, index) => (
                    <StatCard key={index} stat={stat} />
                ))}
            </div>

            {/* Notifications and latest tickets */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 " >
                {/* Notifications */}
                <div className="panel" >
                    <div className="mb-5 flex items-center justify-between">
                        <h5 className="text-lg font-semibold flex items-center">
                            <IconBell className="mr-2 text-primary" /> 
                            Notifications
                        </h5>
                        <button className="text-primary hover:underline">
                            View All
                        </button>
                    </div>
                    <PerfectScrollbar className="max-h-80">
                        {notifications.map((notification, index) => (
                            <div 
                                key={index} 
                                className="flex items-center space-x-4 border-b border-gray-200 dark:border-gray-700 py-4 last:border-b-0 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                            >
                                <div className="shrink-0">
                                    {notification.icon}
                                </div>
                                <div className="flex-1">
                                    <h6 className="font-semibold">{notification.title}</h6>
                                    <p className="text-xs text-gray-500">{notification.description}</p>
                                </div>
                                <div className="text-xs text-gray-400">
                                    {notification.time}
                                </div>
                            </div>
                        ))}
                    </PerfectScrollbar>
                </div>

                {/* Latest Tickets */}
                <div className="panel">
                    <div className="mb-5 flex items-center justify-between">
                        <h5 className="text-lg font-semibold">Latest Tickets</h5>
                        <button className="text-primary hover:underline">
                            View All
                        </button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-200 dark:border-gray-700">
                                    <th className="py-2 text-left text-sm font-medium text-gray-500">Ticket ID</th>
                                    <th className="py-2 text-left text-sm font-medium text-gray-500">Title</th>
                                    <th className="py-2 text-left text-sm font-medium text-gray-500">Status</th>
                                    <th className="py-2 text-left text-sm font-medium text-gray-500">Priority</th>
                                    <th className="py-2 text-left text-sm font-medium text-gray-500">Assignee</th>
                                </tr>
                            </thead>
                            <tbody>
                                {latestTickets.map((ticket, index) => (
                                    <tr 
                                        key={index} 
                                        className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                                    >
                                        <td className="py-3 text-sm font-medium">{ticket.id}</td>
                                        <td className="py-3 text-sm">{ticket.title}</td>
                                        <td className="py-3">
                                            <span 
                                                className={`rounded-full px-2 py-1 text-xs font-medium 
                                                    ${ticket.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' : 
                                                      ticket.status === 'Pending' ? 'bg-blue-100 text-blue-800' : 
                                                      'bg-green-100 text-green-800'}`}
                                            >
                                                {ticket.status}
                                            </span>
                                        </td>
                                        <td className="py-3 text-sm">{ticket.priority}</td>
                                        <td className="py-3 text-sm">{ticket.assignee}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardAnalytics;