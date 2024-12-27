"use client"
import React, { useState, useEffect } from 'react';
import { Search, Plus, Eye, Trash2, Filter, Download, Calendar, ArrowUp, ArrowDown, MoreHorizontal, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

const ComponentsAppsUsers = () => {
    const [users] = useState([
        {
            userId: '100006',
            email: "service@gmail.com",
            userType: "SERVICE_PROVIDER",
            connectivity: "OFFLINE",
            status: "Approved",
        },
        {
            userId: '100006',
            email: "service@gmail.com",
            userType: "SERVICE_PROVIDER",
            connectivity: "OFFLINE",
            status: "Approved",
        },
        {
            userId: '100006',
            email: "service@gmail.com",
            userType: "SERVICE_PROVIDER",
            connectivity: "OFFLINE",
            status: "Approved",
        },
        {
            userId: '100006',
            email: "service@gmail.com",
            userType: "SERVICE_PROVIDER",
            connectivity: "OFFLINE",
            status: "Approved",
        },
        {
            userId: '100006',
            email: "service@gmail.com",
            userType: "SERVICE_PROVIDER",
            connectivity: "OFFLINE",
            status: "Approved",
        },
        
    ]);

    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [sortField, setSortField] = useState('serialNo');
    const [sortDirection, setSortDirection] = useState('asc');
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);

    const handleSort = (field:any) => {
        if (sortField === field) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
    };

    const filteredUsers = users
        .filter(user => {
            const matchesSearch = 
                user.userId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.userType.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesStatus = statusFilter === 'all' || user.userType === statusFilter;
            return matchesSearch && matchesStatus;
        })
        .sort((a:any, b:any) => {
            if (sortDirection === 'asc') {
                return a[sortField] > b[sortField] ? 1 : -1;
            }
            return a[sortField] < b[sortField] ? 1 : -1;
        });

    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

    const getStatusColor = (status:any) => {
        switch (status) {
            case 'confirmed':
                return 'bg-gradient-to-r from-green-500 to-green-600 text-white';
            case 'complained':
                return 'bg-gradient-to-r from-red-500 to-red-600 text-white';
            case 'sent':
                return 'bg-gradient-to-r from-blue-500 to-blue-600 text-white';
            default:
                return 'bg-gradient-to-r from-gray-500 to-gray-600 text-white';
        }
    };

    const SortIcon = ({ field }:any) => {
        if (sortField !== field) return <ArrowUp className="h-4 w-4 text-gray-400 opacity-0 group-hover:opacity-100" />;
        return sortDirection === 'asc' 
            ? <ArrowUp className="h-4 w-4 text-blue-500" />
            : <ArrowDown className="h-4 w-4 text-blue-500" />;
    };

    return (
        <div className="min-h-screen">
            <div className="rounded-xl p-8 shadow-xl panel">
                {/* Header Section */}
                <div className="mb-8">
                    <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                        <div>
                            <h1 className="text-3xl font-bold">Users</h1>
                        </div>
                        <div className="flex flex-wrap items-center gap-4">
                            <Link href="leads/create" 
                                onClick={() => setIsCreateModalOpen(true)}
                                className="group relative flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-2.5 text-white shadow-lg transition-all hover:from-blue-700 hover:to-blue-800 hover:shadow-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                <Plus className="h-5 w-5" />
                                <span className="font-medium">Create User</span>
                                <div className="absolute inset-0 rounded-lg bg-white opacity-0 transition-opacity group-hover:opacity-10"></div>
                            </Link>
                        </div>
                    </div>

                    {/* Filters Section */}
                    <div className="mt-6 flex flex-wrap items-center gap-4">
                        <div className="flex-1">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search by ID, name, or client..."
                                    className="h-11 w-full rounded-lg pl-11 pr-4 text-sm transition-colors  bg-[#1b2e4b] focus:outline-none focus:ring-2 "
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-4">
                            <select
                                className="h-11 rounded-lg pl-4 pr-10 text-sm transition-colors bg-[#1b2e4b] focus:outline-none"
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                            >
                                <option value="all">All</option>
                                <option value="service-provider">Service Provider</option>
                                <option value="consumer">Consumer</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Table Section */}
                <div className="overflow-x-auto rounded-lg">
                    <table className="w-full table-auto border-collapse ">
                        <thead>
                            <tr className="bg-gray-50">
                                {[
                                    { field: 'userId', label: 'USER ID' },
                                    { field: 'email', label: 'EMAIL' },
                                    { field: 'user-type', label: 'USER TYPE' },
                                    { field: 'connectivity', label: 'CONNECTIVITY' },
                                    { field: 'status', label: 'STATUS' }
                                ].map(({ field, label }) => (
                                    <th 
                                        key={field}
                                        onClick={() => handleSort(field)}
                                        className="group cursor-pointer px-6 py-4 text-left text-sm font-semibold text-gray-600"
                                    >
                                        <div className="flex items-center gap-2">
                                            {label}
                                            <SortIcon field={field} />
                                        </div>
                                    </th>
                                ))}
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((user) => (
                                <tr 
                                    key={user.userId} 
                                    className="group border-t border-gray-200 transition-colors cursor-pointer"
                                >
                                    <td className="px-6 py-4 text-sm ">{user.userId}</td>
                                    <td className="px-6 py-4">
                                        <span className="font-medium">{user.email}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <span className="text-sm ">{user.userType}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm">{user.connectivity}</td>
                                    <td className="px-6 py-4">
                                        {user.status}
                                    </td>
                                    <td className="px-6 py-4">
                                        <Link href="users/details" 
                                            className="rounded-lg p-1 text-gray-600 transition-colors  hover:shadow-lg"
                                            title="View Details"
                                        >
                                            <Eye className="h-5 w-5" />
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="mt-6 flex items-center justify-between">
                    <p className="text-sm text-gray-600">
                        Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredUsers.length)} of {filteredUsers.length} entries
                    </p>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-300 text-gray-600 transition-colors hover:bg-gray-50 disabled:opacity-50"
                        >
                            <ChevronLeft className="h-5 w-5" />
                        </button>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                className={`flex h-9 w-9 items-center justify-center rounded-lg border text-sm font-medium transition-colors ${
                                    currentPage === page
                                        ? 'border-blue-600 bg-blue-600 text-white'
                                        : 'border-gray-300 text-gray-600 hover:bg-gray-50'
                                }`}
                            >
                                {page}
                            </button>
                        ))}
                        <button
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-300 text-gray-600 transition-colors hover:bg-gray-50 disabled:opacity-50"
                        >
                            <ChevronRight className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ComponentsAppsUsers;