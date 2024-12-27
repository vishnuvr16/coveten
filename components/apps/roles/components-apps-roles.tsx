"use client";
import React, { useState } from "react";
import { Plus, Eye, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

interface Role {
  id: number;
  roleName: string;
  permissions: string;
  status: string;
}

interface Employee {
  id: number;
  name: string;
  role: string;
  status: string;
  email: string;
}

const ComponentsAppRoles = () => {
  const [activeTab, setActiveTab] = useState("roles"); // Switch between roles and employees
  const [roles, setRoles] = useState<Role[]>([
    { id: 1, roleName: "Admin", permissions: "Full Access", status: "Active" },
    { id: 2, roleName: "Editor", permissions: "Limited Access", status: "Inactive" },
  ]);
  const [employees, setEmployees] = useState<Employee[]>([
    { id: 1, name: "John Doe", role: "Admin",email: "john@gmail.com",status: "rejected" },
    { id: 2, name: "Jane Smith", role: "Editor", email: "jane@gmail.com",status: "pending" },
  ]);
  const [isAddRoleModalOpen, setIsAddRoleModalOpen] = useState(false);
  const [isAssignEmployeeModalOpen, setIsAssignEmployeeModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const totalPages = Math.ceil(
    (activeTab === "roles" ? roles.length : employees.length) / itemsPerPage
  );
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems =
    activeTab === "roles"
      ? roles.slice(indexOfFirstItem, indexOfLastItem)
      : employees.slice(indexOfFirstItem, indexOfLastItem);

// ! render table  
  const renderTableRow = (item: Role | Employee) => {
        if (activeTab === "roles") {
          const roleItem = item as Role;
          return (
            <tr key={roleItem.id} className="border-t border-gray-200">
              <td className="px-6 py-4 text-sm">{roleItem.roleName}</td>
              <td className="px-6 py-4 text-sm">{roleItem.permissions}</td>
              <td className="px-6 py-4 text-sm">{roleItem.status}</td>
              <td className="px-6 py-4">
                <div className="flex gap-2">
                  <button className="p-1 text-blue-600 hover:shadow-lg" title="View Details">
                    <Eye className="h-5 w-5" />
                  </button>
                  <button className="p-1 text-red-600 hover:shadow-lg" title="Delete">
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </td>
            </tr>
          );
        } else {
          const employeeItem = item as Employee;
          return (
            <tr key={employeeItem.id} className="border-t border-gray-200">
              <td className="px-6 py-4 text-sm">{employeeItem.id}</td>
              <td className="px-6 py-4 text-sm">{employeeItem.name}</td>
              <td className="px-6 py-4 text-sm">{employeeItem.email}</td>
              <td className="px-6 py-4 text-sm">{employeeItem.role}</td>
              <td className="px-6 py-4 text-sm">{employeeItem.status}</td>
              <td className="px-6 py-4">
                <button className="p-1 text-blue-600 hover:shadow-lg bg-gradien ">
                    Approve
                </button>
              </td>
            </tr>
          );
        }
      };
    

  return (
    <div className="min-h-screen">
      <div className="rounded-xl p-8 shadow-xl panel">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">Roles & Employees Management</h1>
            <div className="flex items-center gap-4">
              {activeTab === "roles" && (
                <button
                  onClick={() => setIsAddRoleModalOpen(true)}
                  className="group flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-2.5 text-white shadow-lg transition-all hover:from-blue-700 hover:to-blue-800"
                >
                  <Plus className="h-5 w-5" />
                  <span className="font-medium">Add Role</span>
                </button>
              )}
              {activeTab === "employees" && (
                <button
                  onClick={() => setIsAssignEmployeeModalOpen(true)}
                  className="group flex items-center gap-2 rounded-lg bg-gradient-to-r from-green-600 to-green-700 px-6 py-2.5 text-white shadow-lg transition-all hover:from-green-700 hover:to-green-800"
                >
                  <Plus className="h-5 w-5" />
                  <span className="font-medium">Assign Employee</span>
                </button>
              )}
            </div>
          </div>

          {/* Tab Switching */}
          <div className="mt-6 flex">
            {["roles", "employees"].map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setCurrentPage(1);
                }}
                className={`px-6 py-3 border-b-2 ${
                  activeTab === tab
                    ? "border-blue-600 text-blue-600 font-medium"
                    : "border-transparent text-gray-600"
                }`}
              >
                {tab === "roles" ? "Roles" : "Employees"}
              </button>
            ))}
          </div>
        </div>

        {/* Table Section */}
        <div className="overflow-x-auto rounded-lg">
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-50">
            {activeTab === "roles" ? (
              <>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Role Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Permissions</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Actions</th>
              </>
            ) : (
              <>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">S.No</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Email</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Role</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Actions</th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {currentItems.map(renderTableRow)}
        </tbody>
      </table>
    </div>

        {/* Pagination */}
        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Showing {indexOfFirstItem + 1} to{" "}
            {Math.min(indexOfLastItem, activeTab === "roles" ? roles.length : employees.length)} of{" "}
            {activeTab === "roles" ? roles.length : employees.length} entries
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="h-9 w-9 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`h-9 w-9 rounded-lg border text-sm ${
                  currentPage === page
                    ? "border-blue-600 bg-blue-600 text-white"
                    : "border-gray-300 text-gray-600 hover:bg-gray-50"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="h-9 w-9 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Add Role Modal */}
{isAddRoleModalOpen && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-xl">
      <h2 className="text-xl font-semibold text-gray-800">Add Role</h2>
      <p className="mt-1 text-sm text-gray-500">Create a new role with specific permissions.</p>
      {/* Form */}
      <form>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">Role Name</label>
          <input
            type="text"
            className="mt-1 w-full rounded-md border-gray-300 px-4 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300"
            placeholder="Enter role name"
          />
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">Permissions</label>
          <select
            className="mt-1 w-full rounded-md border-gray-300 px-4 py-2 text-sm shadow-sm focus:border-green-500 focus:ring focus:ring-green-300"
          >
            <option value="internal-email">Internal Email</option>
            <option value="chats">Ongoing Chats</option>
            <option value="quotations">Quotation</option>
          </select>
        </div>
        <div className="mt-6 flex justify-end gap-4">
          <button
            type="button"
            onClick={() => setIsAddRoleModalOpen(false)}
            className="rounded-md bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  </div>
)}

{/* Assign Employee Modal */}
{isAssignEmployeeModalOpen && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-xl">
      <h2 className="text-xl font-semibold text-gray-800">Assign Employee</h2>
      <p className="mt-1 text-sm text-gray-500">Assign a role to an employee.</p>
      {/* Form */}
      <form>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">Employee Name</label>
          <select
            className="mt-1 w-full rounded-md border-gray-300 px-4 py-2 text-sm shadow-sm focus:border-green-500 focus:ring focus:ring-green-300"
          >
            <option>Select Employee</option>
          </select>
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">Role</label>
          <select
            className="mt-1 w-full rounded-md border-gray-300 px-4 py-2 text-sm shadow-sm focus:border-green-500 focus:ring focus:ring-green-300"
          >
            {roles.map((role) => (
              <option key={role.id} value={role.roleName}>
                {role.roleName}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-6 flex justify-end gap-4">
          <button
            type="button"
            onClick={() => setIsAssignEmployeeModalOpen(false)}
            className="rounded-md bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-green-700"
          >
            Assign
          </button>
        </div>
      </form>
    </div>
  </div>
)}

    </div>
  );
};

export default ComponentsAppRoles;
