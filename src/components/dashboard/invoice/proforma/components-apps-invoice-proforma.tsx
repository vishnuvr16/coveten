'use client';
import IconEdit from '@/src/components/icon/icon-edit';
import IconEye from '@/src/components/icon/icon-eye';
import IconPlus from '@/src/components/icon/icon-plus';
import IconTrashLines from '@/src/components/icon/icon-trash-lines';
import { MantineProvider } from '@mantine/core';
import { sortBy } from 'lodash';
import { DataTableSortStatus, DataTable, DataTableColumn } from 'mantine-datatable';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

interface InvoiceItem {
    id: number;
    invoice: string;
    userid: string,
    type: string,
    expiryDate: string,
    status: {
        tooltip: string;
        color: string;
    };
}

const ComponentsAppsProformaInvoice = () => {
    const [items, setItems] = useState<InvoiceItem[]>([
        {
            id: 1,
            invoice: 'CIS/IN0027',
            userid: '1000003',
            type: 'SERVICE',
            expiryDate: 'N/A',
            status: { tooltip: 'Cancelled', color: 'success' },
        },
        {
            id: 2,
            invoice: 'CIS/IN0022',
            userid: '1000003',
            type: 'LEARN',
            expiryDate: 'N/A',
            status: { tooltip: 'Cancelled', color: 'success' },
        },
        {
            id: 3,
            invoice: 'CIS/IN0020',
            userid: '1000005',
            type: 'LEARN',
            expiryDate: 'N/A',
            status: { tooltip: 'Cancelled', color: 'success' },
        },
        {
            id: 4,
            invoice: 'CIS/IN0019',
            userid: '1000005',
            type: 'LEARN',
            expiryDate: 'N/A',
            status: { tooltip: 'Cancelled', color: 'success' },
        },
        {
            id: 5,
            invoice: 'CIS/IN008',
            userid: '1000005',
            type: 'SERVICE',
            expiryDate: 'N/A',
            status: { tooltip: 'Cancelled', color: 'success' },
        },
        {
            id: 6,
            invoice: 'CIS/IN007',
            userid: '1000005',
            type: 'SERVICE',
            expiryDate: 'N/A',
            status: { tooltip: 'Cancelled', color: 'success' },
        },
        {
            id: 7,
            invoice: 'CIS/IN006',
            userid: '1000005',
            type: 'PRODUCT',
            expiryDate: 'N/A',
            status: { tooltip: 'Cancelled', color: 'success' },
        }
    ]);

    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState<InvoiceItem[]>(sortBy(items, 'invoice'));
    const [records, setRecords] = useState<InvoiceItem[]>(initialRecords);

    const [search, setSearch] = useState('');
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus<InvoiceItem>>({
        columnAccessor: 'invoice',
        direction: 'asc',
    });

    useEffect(() => {
        setPage(1);
    }, [pageSize]);

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecords([...initialRecords.slice(from, to)]);
    }, [page, pageSize, initialRecords]);

    useEffect(() => {
        setInitialRecords(() => {
            return items.filter((item) => {
                return (
                    item.invoice.toLowerCase().includes(search.toLowerCase()) ||
                    item.type.toLowerCase().includes(search.toLowerCase()) ||
                    item.userid.toLowerCase().includes(search.toLowerCase()) ||
                    item.status.tooltip.toLowerCase().includes(search.toLowerCase())
                );
            });
        });
    }, [search, items]);

    useEffect(() => {
        const data2 = sortBy(initialRecords, sortStatus.columnAccessor);
        setRecords(sortStatus.direction === 'desc' ? data2.reverse() : data2);
        setPage(1);
    }, [sortStatus, initialRecords]);

    const deleteRow = (id: number) => {
        if (window.confirm('Are you sure want to delete selected row ?')) {
            setRecords(items.filter((user) => user.id !== id));
            setInitialRecords(items.filter((user) => user.id !== id));
            setItems(items.filter((user) => user.id !== id));
            setSearch('');
        }
    };

    const handleSortStatusChange = (newSortStatus: DataTableSortStatus<InvoiceItem>) => {
        setSortStatus(newSortStatus);
    };

    const columns: DataTableColumn<InvoiceItem>[] = [
        {
            accessor: 'invoice',
            sortable: true,
            render: ({ invoice }) => (
                <Link href="/apps/invoice/preview">
                    <div className="font-semibold text-primary underline hover:no-underline">{`#${invoice}`}</div>
                </Link>
            ),
        },
        {
            accessor: 'user id',
            render: ({ userid, id }) => (
                <div className="flex items-center font-semibold">
                    <div>{userid}</div>
                </div>
            ),
        },
        {
            accessor: 'type',
            render: ({ type, id }) => (
                <div>{type}</div>
            ),
        },
        {
            accessor: 'expiryDate',
            textAlign: 'center',
            render: ({expiryDate})=>(
                <div>{expiryDate}</div>
            ),
        },
        {
            accessor: 'status',
            textAlign: 'center',
            render: ({ status }) => <span className={`badge badge-outline-${status.color}`}>{status.tooltip}</span>,
        },
        {
            accessor: 'action',
            title: 'Actions',
            sortable: false,
            textAlign: 'center',
            render: ({ id }) => (
                <div className="mx-auto flex w-max items-center gap-4">
                    <Link href="/apps/invoice/edit" className="flex hover:text-info">
                        <IconEdit className="h-4.5 w-4.5" />
                    </Link>
                    <Link href="/apps/invoice/preview" className="flex hover:text-primary">
                        <IconEye />
                    </Link>
                    <button type="button" className="flex hover:text-danger" onClick={() => deleteRow(id)}>
                        <IconTrashLines />
                    </button>
                </div>
            ),
        },
    ];

    return (
        <MantineProvider>
            <div className="panel border-white-light px-0 dark:border-[#1b2e4b]">
                <div className="invoice-table">
                    <div className="mb-4.5 flex flex-col gap-5 px-5 md:flex-row md:items-center">
                        <div className="flex items-center gap-2">
                            <Link href="/apps/invoice/add" className="btn btn-primary gap-2">
                                <IconPlus />
                                Add New
                            </Link>
                        </div>
                        <div className="ltr:ml-auto rtl:mr-auto">
                            <input type="text" className="form-input w-auto" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                        </div>
                    </div>

                    <div className="datatables pagination-padding p-5">
                        <DataTable
                            className="table-hover whitespace-nowrap"
                            records={records}
                            columns={columns}
                            highlightOnHover
                            totalRecords={initialRecords.length}
                            recordsPerPage={pageSize}
                            page={page}
                            onPageChange={(p) => setPage(p)}
                            recordsPerPageOptions={PAGE_SIZES}
                            onRecordsPerPageChange={setPageSize}
                            sortStatus={sortStatus}
                            onSortStatusChange={handleSortStatusChange}
                            paginationText={({ from, to, totalRecords }) => (
                                <div className="flex items-center justify-center text-sm text-gray-600 dark:text-gray-400 mt-4">
                                    <span className="font-medium">{from}</span>
                                    <span className="mx-1">-</span>
                                    <span className="font-medium">{to}</span>
                                    <span className="mx-1">of</span>
                                    <span className="font-medium">{totalRecords}</span>
                                    <span className="ml-1">entries</span>
                                </div>
                            )}
                        />
                    </div>
                </div>
            </div>
        </MantineProvider>
    );
};

export default ComponentsAppsProformaInvoice;