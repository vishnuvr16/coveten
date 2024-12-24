"use client"
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, FileText, RefreshCw } from 'lucide-react';

interface Document {
  name: string;
  path: string;
}

interface Report {
  title: string;
  description: string;
  status: string;
  documents: Document[];
}

interface Ticket {
  id: string;
  clientId: string;
  vendorId: string;
  module: string;
  moduleStatus: string;
  reportStatus: string;
  date: string;
  report: Report;
}

const ComponentsAppsTickets: React.FC = () => {
  const [isReportModalOpen, setIsReportModalOpen] = useState<boolean>(false);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Sample data with proper typing
  const tickets: Ticket[] = [
    {
      id: 'TK-001',
      clientId: 'CL-123',
      vendorId: 'VN-456',
      module: 'Payments',
      moduleStatus: 'Active',
      reportStatus: 'Pending',
      date: '2024-12-20',
      report: {
        title: 'Payment Integration Issue',
        description: 'Unable to process international payments through the gateway.',
        status: 'In Review',
        documents: [
          { name: 'doc1.pdf', path: '/docs/doc1.pdf' },
          { name: 'doc2.pdf', path: '/docs/doc2.pdf' }
        ]
      }
    },
  ];

  const handleReportClick = (ticket: Ticket): void => {
    setSelectedTicket(ticket);
    setIsReportModalOpen(true);
  };

  return (
    <div className="min-h-screen p-6 panel">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-300">Tickets Overview</h1>
        <p className="text-gray-500 mt-2">Manage and track all ticket activities</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {['Total Tickets', 'Active', 'Pending', 'Resolved'].map((stat: string, index: number) => (
          <div key={index} className="bg-[#1b2e4b]  rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-gray-300 text-sm font-semibold">{stat}</h3>
            <p className="text-2xl font-bold text-gray-500 mt-2">
              {index === 0 ? tickets.length : Math.floor(Math.random() * 100)}
            </p>
          </div>
        ))}
      </div>

      {/* Tickets Table */}
      <div className="bg-[#1b2e4b]  rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Ticket ID</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Client ID</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Vendor ID</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Module Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Report Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {tickets.map((ticket: Ticket) => (
                <tr key={ticket.id} className="hover:bg-gray-700 cursor-pointer transition-colors duration-200">
                  <td className="px-6 py-4 text-sm text-gray-400">{ticket.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-400">{ticket.clientId}</td>
                  <td className="px-6 py-4 text-sm text-gray-400">{ticket.vendorId}</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                      {ticket.moduleStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
                      {ticket.reportStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-400">{ticket.date}</td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-3">
                      <button
                        onClick={() => handleReportClick(ticket)}
                        className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
                      >
                        <FileText className="w-5 h-5" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-800 transition-colors duration-200">
                        <RefreshCw className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 bg-gray-800">
          <p className="text-sm text-gray-500">
            Showing {tickets.length} of {tickets.length} results
          </p>
          <div className="flex items-center space-x-2">
            <button className="p-2 rounded-lg hover:bg-gray-200 transition-colors duration-200">
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 rounded-lg hover:bg-gray-200 transition-colors duration-200">
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Report Modal */}
      {isReportModalOpen && selectedTicket && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800">Ticket Report</h2>
              <p className="text-gray-600 mt-1">Ticket ID: {selectedTicket.id}</p>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <p className="text-gray-800">{selectedTicket.report.title}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <p className="text-gray-800">{selectedTicket.report.description}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <span className="px-3 py-1 text-sm font-medium rounded-full bg-blue-100 text-blue-800">
                  {selectedTicket.report.status}
                </span>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Documents</label>
                <div className="space-y-2">
                  {selectedTicket.report.documents.map((doc: Document, index: number) => (
                    <div key={index} className="flex items-center space-x-2 text-sm text-blue-600 hover:text-blue-800">
                      <FileText className="w-4 h-4" />
                      <span>{doc.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end space-x-4">
              <button
                onClick={() => setIsReportModalOpen(false)}
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors duration-200"
              >
                Close
              </button>
              <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                Approve
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComponentsAppsTickets;