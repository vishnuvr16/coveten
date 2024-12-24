"use client"
import { useState } from 'react';
import { ChevronDown, ChevronUp, Clock, User, Building2, Tag, AlertTriangle, FileText, Download, Search } from 'lucide-react';
import Link from 'next/link';

interface Module {
  id: number;
  name: string;
  ticketId: string;
  testingName: string;
  documents: {
    name: string;
    url: string;
  }[];
}

interface Project {
  id: number;
  title: string;
  userId: string;
  status: ProjectStatus;
  createdAt: string;
  clientCompany: string;
  ticketId: string;
  priority: Priority;
  type: string;
  modules: Module[];
}

type ProjectStatus = 'Completed' | 'In Progress' | 'Pending' | 'Delayed';
type Priority = 'High' | 'Medium' | 'Low';

const ComponentsAppsProjects: React.FC = () => {
  const [expandedProjects, setExpandedProjects] = useState<Set<number>>(new Set());
  const [expandedModules, setExpandedModules] = useState<Set<number>>(new Set());
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchFilter, setSearchFilter] = useState<'all' | 'title' | 'company' | 'ticketId'>('all');

  // Sample data with modules
  const projects: Project[] = [
    {
      id: 1,
      title: "E-commerce Platform Redesign",
      userId: "USR-789",
      status: "In Progress",
      createdAt: "2024-12-20T10:30:00",
      clientCompany: "TechCorp Solutions",
      ticketId: "TKT-456",
      priority: "High",
      type: "Website Redesign",
      modules: [
        {
          id: 101,
          name: "User Authentication",
          ticketId: "MOD-001",
          testingName: "Integration Testing",
          documents: [
            { name: "Test Cases", url: "/docs/test-cases.pdf" },
            { name: "Test Results", url: "/docs/results.pdf" }
          ]
        },
        {
          id: 102,
          name: "Payment Gateway",
          ticketId: "MOD-002",
          testingName: "Security Testing",
          documents: [
            { name: "Security Report", url: "/docs/security.pdf" }
          ]
        }
      ]
    },
    {
      id: 2,
      title: "Mobile App Development",
      userId: "USR-456",
      status: "Pending",
      createdAt: "2024-12-19T15:45:00",
      clientCompany: "Innovation Labs",
      ticketId: "TKT-789",
      priority: "Medium",
      type: "Mobile Development",
      modules: [
        {
          id: 201,
          name: "Push Notifications",
          ticketId: "MOD-003",
          testingName: "Unit Testing",
          documents: [
            { name: "Test Plan", url: "/docs/test-plan.pdf" }
          ]
        }
      ]
    }
  ];

  const filterProjects = (projects: Project[]): Project[] => {
    return projects.filter((project: Project) => {
      const searchLower = searchQuery.toLowerCase();
      
      switch (searchFilter) {
        case 'title':
          return project.title.toLowerCase().includes(searchLower);
        case 'company':
          return project.clientCompany.toLowerCase().includes(searchLower);
        case 'ticketId':
          return project.ticketId.toLowerCase().includes(searchLower);
        case 'all':
        default:
          return (
            project.title.toLowerCase().includes(searchLower) ||
            project.clientCompany.toLowerCase().includes(searchLower) ||
            project.ticketId.toLowerCase().includes(searchLower) ||
            project.modules.some(module => 
              module.name.toLowerCase().includes(searchLower) ||
              module.ticketId.toLowerCase().includes(searchLower)
            )
          );
      }
    });
  };

  const toggleProject = (projectId: number): void => {
    const newExpanded = new Set(expandedProjects);
    if (newExpanded.has(projectId)) {
      newExpanded.delete(projectId);
    } else {
      newExpanded.add(projectId);
    }
    setExpandedProjects(newExpanded);
  };

  const toggleModule = (moduleId: number): void => {
    const newExpanded = new Set(expandedModules);
    if (newExpanded.has(moduleId)) {
      newExpanded.delete(moduleId);
    } else {
      newExpanded.add(moduleId);
    }
    setExpandedModules(newExpanded);
  };

  const statusColors: Record<ProjectStatus, string> = {
    'Completed': 'bg-green-100 text-green-800',
    'In Progress': 'bg-blue-100 text-blue-800',
    'Pending': 'bg-yellow-100 text-yellow-800',
    'Delayed': 'bg-red-100 text-red-800'
  };

  const getStatusColor = (status: ProjectStatus): string => {
    return statusColors[status] || 'bg-gray-100 text-gray-800';
  };

  const priorityColors: Record<Priority, string> = {
    'High': 'text-red-600',
    'Medium': 'text-yellow-600',
    'Low': 'text-green-600'
  };

  const getPriorityColor = (priority: Priority): string => {
    return priorityColors[priority] || 'text-gray-600';
  };

  const handleCreateQuotation = (projectId: number): void => {
    console.log(`Creating quotation for project ${projectId}`);
  };

  const filteredProjects = filterProjects(projects);

  return (
    <div className="max-w-7xl mx-auto p-6 panel min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Projects</h1>
        
        {/* Search Section */}
        <div className="flex space-x-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 bg-[#1b2e4b] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
            />
          </div>
          
          <select
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value as 'all' | 'title' | 'company' | 'ticketId')}
            className="bg-[#1b2e4b] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Fields</option>
            <option value="title">Title</option>
            <option value="company">Company</option>
            <option value="ticketId">Ticket ID</option>
          </select>
        </div>
      </div>

      {/* No Results Message */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No projects found matching your search criteria.</p>
        </div>
      )}

      <div className="space-y-4">
        {filteredProjects.map((project: Project) => (
          <div 
            key={project.id} 
            className="bg-[#1b2e4b] rounded-lg shadow-md overflow-hidden hover:border-blue-300 transition-colors duration-200"
          >
            {/* Project Header */}
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-4">
                    <h2 className="text-xl font-semibold text-gray-200">{project.title}</h2>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(project.status)}`}>
                      {project.status}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <User size={16} className="mr-1" />
                      <span>{project.userId}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock size={16} className="mr-1" />
                      <span>{new Date(project.createdAt).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-4">
                  <Link href="/quotation/create"
                    className="px-4 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors duration-200"
                  >
                    Create Quotation
                  </Link>
                  <button
                    onClick={() => toggleProject(project.id)}
                    className="flex items-center px-4 py-2 bg-gray-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors duration-200"
                  >
                    {expandedProjects.has(project.id) ? (
                      <>
                        <span>Hide Details</span>
                        <ChevronUp size={20} className="ml-2" />
                      </>
                    ) : (
                      <>
                        <span>View Details</span>
                        <ChevronDown size={20} className="ml-2" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Expanded Details */}
            {expandedProjects.has(project.id) && (
              <div className="px-6 pb-6 pt-2 border-t border-gray-200">
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Building2 size={18} className="text-gray-400" />
                      <span className="text-md text-gray-300">Client Company:</span>
                      <span className="text-lg font-medium">{project.clientCompany}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Tag size={18} className="text-gray-400" />
                      <span className="text-md text-gray-300">Ticket ID:</span>
                      <span className="text-lg font-medium">{project.ticketId}</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <AlertTriangle size={18} className="text-gray-400" />
                      <span className="text-md text-gray-300">Priority:</span>
                      <span className={`text-lg font-medium ${getPriorityColor(project.priority)}`}>
                        {project.priority}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-md text-gray-300">Type:</span>
                      <span className="text-lg font-medium">{project.type}</span>
                    </div>
                  </div>
                </div>

                {/* Modules Section */}
                <div className="mt-6">
                  <h3 className="text-xl font-bold mb-4 text-gray-200">Modules</h3>
                  <div className="space-y-3">
                    {project.modules.map((module: Module) => (
                      <div key={module.id} className="bg-[#1b2e4b] border border-gray-700 rounded-lg overflow-hidden">
                        <button
                          onClick={() => toggleModule(module.id)}
                          className="w-full flex items-center justify-between p-4 hover:bg-[#253657] transition-colors duration-200"
                        >
                          <div className="flex items-center space-x-3">
                            <span className="font-medium text-gray-200">{module.name}</span>
                            <span className="text-sm text-gray-400">({module.ticketId})</span>
                          </div>
                          {expandedModules.has(module.id) ? (
                            <ChevronUp size={20} className="text-gray-400" />
                          ) : (
                            <ChevronDown size={20} className="text-gray-400" />
                          )}
                        </button>
                        
                        {expandedModules.has(module.id) && (
                          <div className="p-4 bg-[#253657] border-t border-gray-700">
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div className="flex items-center space-x-2">
                                  <Tag size={16} className="text-gray-400" />
                                  <span className="text-sm text-gray-400">Ticket ID:</span>
                                  <span className="text-sm font-medium text-gray-200">{module.ticketId}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <FileText size={16} className="text-gray-400" />
                                  <span className="text-sm text-gray-400">Testing Name:</span>
                                  <span className="text-sm font-medium text-gray-200">{module.testingName}</span>
                                </div>
                              </div>
                              
                              <div className="border-t border-gray-700 pt-4">
                                <h4 className="text-sm font-medium text-gray-400 mb-3">Documents</h4>
                                <div className="grid grid-cols-2 gap-3">
                                  {module.documents.map((doc, index) => (
                                    <a
                                      key={index}
                                      href={doc.url}
                                      className="flex items-center space-x-2 px-3 py-2 bg-[#1b2e4b] rounded-lg hover:bg-[#2d4875] transition-colors duration-200 group"
                                    >
                                      <Download size={16} className="text-gray-400 group-hover:text-blue-400" />
                                      <span className="text-sm text-gray-200 group-hover:text-blue-400">
                                        {doc.name}
                                      </span>
                                    </a>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComponentsAppsProjects;