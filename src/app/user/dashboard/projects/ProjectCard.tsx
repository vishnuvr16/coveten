'use client'
import React, { useState } from 'react';

// Types
interface Module {
    id: string;
    title: string;
    description: string;
    status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
}

interface Project {
    id: string;
    title: string;
    description: string;
    type: string;
    priority: string;
    status: string;
    createdAt: string;
    projectticketFor: {
        projectTicket: string;
    };
    hasModule: Module[];
}

// Helper function for date formatting
const getNormalDateAndTime = (dateString: string) => {
    return new Date(dateString).toLocaleString();
};

// ModuleCards Component
const ModuleCards = ({ data }: { data: Module[] }) => {
    return (
        <div className="mt-6">
            <h6 className="text-gray-700 font-semibold mb-4">Modules</h6>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data.map((module) => (
                    <div key={module.id} className="p-4 border rounded-lg bg-gray-50">
                        <h6 className="font-medium text-gray-700 mb-2">{module.title}</h6>
                        <p className="text-sm text-gray-600">{module.description}</p>
                        <span className={`inline-block mt-2 px-2 py-1 rounded text-xs ${
                            module.status === 'COMPLETED' ? 'bg-green-100 text-green-600' :
                            module.status === 'IN_PROGRESS' ? 'bg-blue-100 text-blue-600' :
                            'bg-yellow-100 text-yellow-600'
                        }`}>
                            {module.status}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

const ProjectCard = () => {
    // Sample data
    const sampleProjects: Project[] = [
        {
            id: '1',
            title: 'E-commerce Platform Redesign',
            description: 'Complete overhaul of the existing e-commerce platform with modern UI/UX principles',
            type: 'Web Development',
            priority: 'HIGH',
            status: 'IN_PROGRESS',
            createdAt: '2025-02-13T10:00:00Z',
            projectticketFor: {
                projectTicket: 'PRJ001'
            },
            hasModule: [
                {
                    id: 'm1',
                    title: 'User Authentication',
                    description: 'Implement secure login and registration system',
                    status: 'COMPLETED'
                },
                {
                    id: 'm2',
                    title: 'Product Catalog',
                    description: 'Design and implement product listing and filtering',
                    status: 'PENDING'
                }
            ]
        },
        {
            id: '2',
            title: 'Mobile App Development',
            description: 'Native mobile application for iOS and Android platforms',
            type: 'Mobile Development',
            priority: 'MEDIUM',
            status: 'PENDING',
            createdAt: '2025-02-12T15:30:00Z',
            projectticketFor: {
                projectTicket: 'PRJ002'
            },
            hasModule: [
                {
                    id: 'm3',
                    title: 'UI Design',
                    description: 'Create user interface mockups and prototypes',
                    status: 'IN_PROGRESS'
                }
            ]
        }
    ];

    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    const handleAccordionClick = (index: number) => {
        setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
    };

    const checkStatus = (modules: Module[]) => {
        return modules.some(module => module.status === 'PENDING');
    };

    const handleDeleteProject = (projectId: string) => {
        console.log(`Deleting project with ID: ${projectId}`);
    };

    return (
        <div>
            {sampleProjects.map((project, index) => (
                <div key={project.id} className="transition-all duration-500 my-2 hover:bg-white border text-gray-600 border-gray-200 rounded-md">
                    <div
                        className={`accordion-header cursor-pointer transition flex space-x-5 px-2 xl:px-3 items-center h-auto ${
                            expandedIndex === index ? "bg-white" : ""
                        }`}
                        onClick={() => handleAccordionClick(index)}
                    >
                        <i className={`fas ${expandedIndex === index ? "fa-minus" : "fa-plus"}`}></i>
                        <div className="flex items-center justify-between w-full p-3">
                            <div className="flex flex-col space-y-3 w-80% xl:w-[70%]">
                                <p className="text-sm lg:text-xl text-gray-700 font-semibold capitalize">
                                    {project.title}
                                </p>
                                <p className="text-xs xl:text-sm text-dimText">
                                    {project.description}
                                </p>
                                <p className="text-primary text-[10px] xl:text-sm">
                                    Created: {getNormalDateAndTime(project.createdAt)}
                                </p>
                            </div>
                            <div className="flex items-center justify-center ml-3">
                                <button className="bg-white border-2 border-gray-700 text-gray-700 font-bold text-sm xl:text-base rounded-lg px-4 xl:px-6 py-2 xl:py-3">
                                    {expandedIndex === index ? 'Hide Details' : 'View'}
                                </button>
                            </div>
                        </div>
                    </div>

                    <div
                        className={`accordion-content px-2 lg:px-5 pt-0 overflow-hidden ${
                            expandedIndex === index ? "max-h-content" : "max-h-0"
                        }`}
                        style={{
                            transition: "all 0.3s ease-out",
                        }}
                    >
                        <div className="py-8 my-5 px-2 lg:px-12 border border-gray-200 rounded-lg">
                            <div className="">
                                <div className="pb-10 relative">
                                    <h5 className="text-gray-700 font-bold text-lg mb-3">
                                        Ticket Id: #{project.projectticketFor.projectTicket}
                                    </h5>
                                    <h5 className="text-gray-700 font-semibold text-md mb-3">
                                        Project name: {project.title}
                                    </h5>
                                    <h5 className="text-gray-700 font-semibold text-md mb-3">
                                        Project Type: {project.type}
                                    </h5>
                                    <h5 className="text-gray-700 font-semibold text-md mb-3">
                                        Priority: {project.priority}
                                    </h5>
                                    <p className="text-gray-500 text-sm">
                                        {project.description}
                                    </p>

                                    <ModuleCards data={project.hasModule} />
                                </div>
                            </div>

                            <div className="w-full flex items-center justify-end">
                                {(!checkStatus(project.hasModule) || project.status === "PENDING") && (
                                    <button
                                        onClick={() => handleDeleteProject(project.id)}
                                        className="bg-red-200 text-red-600 font-semibold text-xs px-3 py-1 rounded text-right"
                                    >
                                        Delete Project
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProjectCard;