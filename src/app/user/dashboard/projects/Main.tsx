'use client'
import React, { useState } from 'react';
import ProjectCard from './ProjectCard';

// Types
interface Module {
    id: string;
    title: string;
    description: string;
    files?: string[];
    moduleticketFor?: {
        ticket: string;
        status: string;
    };
}

interface Project {
    id: string;
    title: string;
    description: string;
    createdAt: string;
    status: string;
    priority: string;
    type: string;
    projectticketFor: {
        projectTicket: string;
    };
    hasModule: Module[];
}

// Pagination Component
const Pagination = ({ currentPage, setCurrentPage, totalPages }: {
    currentPage: number;
    setCurrentPage: (page: number) => void;
    totalPages: number;
}) => {
    return (
        <div className="flex items-center justify-center gap-4 mt-6">
            <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-100 rounded-md disabled:opacity-50 hover:bg-gray-200 transition-colors"
            >
                Previous
            </button>
            <span className="text-gray-700">
                Page {currentPage} of {totalPages}
            </span>
            <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-gray-100 rounded-md disabled:opacity-50 hover:bg-gray-200 transition-colors"
            >
                Next
            </button>
        </div>
    );
};

const Main = () => {
    // Sample data
    const sampleProjects: Project[] = [
        {
            id: '1',
            title: 'E-commerce Platform Redesign',
            description: 'Complete overhaul of the existing e-commerce platform with modern UI/UX principles',
            createdAt: '2025-02-13T10:00:00Z',
            status: 'IN_PROGRESS',
            priority: 'HIGH',
            type: 'Web Development',
            projectticketFor: {
                projectTicket: 'PRJ001'
            },
            hasModule: [
                {
                    id: 'm1',
                    title: 'User Authentication',
                    description: 'Implement secure login and registration system',
                    moduleticketFor: {
                        ticket: 'MOD001',
                        status: 'COMPLETED'
                    }
                },
                {
                    id: 'm2',
                    title: 'Product Catalog',
                    description: 'Design and implement product listing and filtering',
                    moduleticketFor: {
                        ticket: 'MOD002',
                        status: 'PENDING'
                    }
                }
            ]
        },
        {
            id: '2',
            title: 'Mobile App Development',
            description: 'Native mobile application for iOS and Android platforms',
            createdAt: '2025-02-12T15:30:00Z',
            status: 'PENDING',
            priority: 'MEDIUM',
            type: 'Mobile Development',
            projectticketFor: {
                projectTicket: 'PRJ002'
            },
            hasModule: [
                {
                    id: 'm3',
                    title: 'UI Design',
                    description: 'Create user interface mockups and prototypes',
                    moduleticketFor: {
                        ticket: 'MOD003',
                        status: 'IN_PROGRESS'
                    }
                }
            ]
        }
    ];

    // States
    const [pageLimit] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [projects, setProjects] = useState<Project[]>(sampleProjects);

    // Calculate pagination
    const totalProjects = projects.length;
    const totalPages = Math.ceil(totalProjects / pageLimit);
    const startIndex = (currentPage - 1) * pageLimit;
    const endIndex = startIndex + pageLimit;
    const currentProjects = projects.slice(startIndex, endIndex);

    // Delete handlers
    const handleDeleteModule = (moduleId: string) => {
        setProjects(prevProjects => 
            prevProjects.map(project => ({
                ...project,
                hasModule: project.hasModule.filter(module => module.id !== moduleId)
            }))
        );
    };

    const handleDeleteProject = (projectId: string, moduleIds: string[]) => {
        setProjects(prevProjects => 
            prevProjects.filter(project => project.id !== projectId)
        );
        moduleIds.forEach(moduleId => handleDeleteModule(moduleId));
    };

    // Loading state component
    const Loading = () => (
        <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
    );

    return (
        <section className="container mx-auto px-4 py-8">
            <React.Suspense fallback={<Loading />}>
                <div className="space-y-6">
                    {currentProjects.length > 0 ? (
                        <>
                            <ProjectCard 
                                // data={currentProjects} 
                                // deleteProjectById={handleDeleteProject}
                                // deleteModuleById={handleDeleteModule}
                            />
                            {totalProjects > pageLimit && (
                                <Pagination 
                                    currentPage={currentPage}
                                    setCurrentPage={setCurrentPage}
                                    totalPages={totalPages}
                                />
                            )}
                        </>
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-gray-600">No projects found</p>
                        </div>
                    )}
                </div>
            </React.Suspense>
        </section>
    );
};

export default Main;