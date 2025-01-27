"use client"
import React, { useState, useEffect } from 'react';
import { Search, Plus, Eye, Trash2, Filter, Download, Calendar, ArrowUp, ArrowDown, MoreHorizontal, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

const QuotationPage = () => {
    const [quotations] = useState([
        {
            id: 'QT-2024-001',
            userId: '100003',
            quotationFor: 'Website Development',
            type: 'Service',
            status: 'confirmed',
            expiryDate: '2024-12-31',
            amount: 15000,
            client: 'TechCorp Solutions',
            serialNo: 1
        },
        {
            id: 'QT-2024-002',
            userId: '100004',
            quotationFor: 'Mobile App Development',
            type: 'Product',
            status: 'sent',
            expiryDate: '2024-12-25',
            amount: 25000,
            client: 'Innovation Labs',
            serialNo: 2
        },
        
        {
            id: 'QT-2024-003',
            userId: '100003',
            quotationFor: 'UI/UX Design',
            type: 'Service',
            status: 'complained',
            expiryDate: '2024-12-28',
            amount: 8000,
            client: 'Design Masters',
            serialNo: 3
        }
    ]);

    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [sortField, setSortField] = useState('serialNo');
    const [sortDirection, setSortDirection] = useState('asc');
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [selectedQuotation, setSelectedQuotation] = useState(null);
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

    const filteredQuotations = quotations
        .filter(quote => {
            const matchesSearch = 
                quote.quotationFor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                quote.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                quote.client.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesStatus = statusFilter === 'all' || quote.status === statusFilter;
            return matchesSearch && matchesStatus;
        })
        .sort((a:any, b:any) => {
            if (sortDirection === 'asc') {
                return a[sortField] > b[sortField] ? 1 : -1;
            }
            return a[sortField] < b[sortField] ? 1 : -1;
        });

    const totalPages = Math.ceil(filteredQuotations.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredQuotations.slice(indexOfFirstItem, indexOfLastItem);

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
        <div className="min-h-screen p-3">
            <div className="rounded-xl p-8 shadow-xl panel">
                {/* Header Section */}
                <div className="mb-8">
                    <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                        <div>
                            <h1 className="text-3xl font-bold">Quotation Management</h1>
                            <p className="mt-1 text-sm text-gray-500">Manage and track all your quotations in one place</p>
                        </div>
                        <div className="flex flex-wrap items-center gap-4">
                            <Link href="quotation/create" 
                                onClick={() => setIsCreateModalOpen(true)}
                                className="group relative flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-2.5 text-white shadow-lg transition-all hover:from-blue-700 hover:to-blue-800 hover:shadow-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                <Plus className="h-5 w-5" />
                                <span className="font-medium">New Quotation</span>
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
                                    className="h-11 w-full rounded-lg pl-11 pr-4 text-sm transition-colors focus:border-blue-500 bg-[#1b2e4b] focus:outline-none focus:ring-2 focus:ring-blue-200"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-4">
                            <select
                                className="h-11 rounded-lg pl-4 pr-10 text-sm transition-colors focus:border-blue-500 bg-[#1b2e4b] focus:outline-none focus:ring-2 focus:ring-blue-200"
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                            >
                                <option value="all">All Status</option>
                                <option value="confirmed">Confirmed</option>
                                <option value="complained">Complained</option>
                                <option value="sent">Sent</option>
                            </select>

                            <button className="flex h-11 items-center gap-2 rounded-lg bg-[#1b2e4b] px-4 text-sm font-medium transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-200">
                                <Download className="h-5 w-5" />
                                Export
                            </button>
                        </div>
                    </div>
                </div>

                {/* Table Section */}
                <div className="overflow-x-auto rounded-lg">
                    <table className="w-full table-auto border-collapse ">
                        <thead>
                            <tr className="bg-gray-50">
                                {[
                                    { field: 'serialNo', label: 'S.No' },
                                    { field: 'id', label: 'Quotation ID' },
                                    { field: 'userId', label: 'User Id' },
                                    { field: 'quotationFor', label: 'Quotation For' },
                                    { field: 'type', label: 'Type' },
                                    { field: 'status', label: 'Status' },
                                    { field: 'expiryDate', label: 'Expiry Date' },
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
                            {currentItems.map((quote) => (
                                <tr 
                                    key={quote.id} 
                                    className="group border-t border-gray-200 transition-colors cursor-pointer"
                                >
                                    <td className="px-6 py-4 text-sm ">{quote.serialNo}</td>
                                    <td className="px-6 py-4">
                                        <span className="font-medium">{quote.id}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <span className="text-sm ">{quote.userId}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm">{quote.quotationFor}</td>
                                    <td className="px-6 py-4">
                                        {quote.type}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${getStatusColor(quote.status)}`}>
                                            {quote.status.charAt(0).toUpperCase() + quote.status.slice(1)}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2 text-sm">
                                            <Calendar className="h-4 w-4" />
                                            {quote.expiryDate}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2 opacity-100 transition-opacity ">
                                            <button 
                                                className="rounded-lg p-1 text-gray-600 transition-colors hover:bg-white hover:text-blue-600 hover:shadow-lg"
                                                title="View Details"
                                            >
                                                <Eye className="h-5 w-5" />
                                            </button>
                                            <button 
                                                className="rounded-lg p-1 text-gray-600 transition-colors hover:bg-white hover:text-red-600 hover:shadow-lg"
                                                title="Delete"
                                            >
                                                <Trash2 className="h-5 w-5" />
                                            </button>
                                            
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="mt-6 flex items-center justify-between">
                    <p className="text-sm text-gray-600">
                        Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredQuotations.length)} of {filteredQuotations.length} entries
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

export default QuotationPage