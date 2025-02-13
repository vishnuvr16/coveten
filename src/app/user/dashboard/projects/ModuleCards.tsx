'use client'
import React, { useState } from 'react';
import { HiChevronDown, HiChevronUp, HiOutlineDocumentDownload } from 'react-icons/hi';

// Types
interface ModuleTicket {
    ticket: string;
    status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
}

interface Module {
    id: string;
    title: string;
    description: string;
    files?: string[];
    moduleticketFor?: ModuleTicket;
}

const ModuleCards = () => {
    // Sample data
    const sampleModules: Module[] = [
        {
            id: '1',
            title: 'User Authentication Module',
            description: 'Implementation of secure user authentication system including login, registration, and password recovery features.',
            files: [
                'document1.pdf',
                'specs.doc',
                'diagram.png',
                'requirements.txt'
            ],
            moduleticketFor: {
                ticket: 'MOD-001',
                status: 'PENDING'
            }
        },
        {
            id: '2',
            title: 'Payment Integration Module',
            description: 'Integration with payment gateways including Stripe and PayPal for secure payment processing.',
            files: [
                'payment-flow.pdf',
                'api-docs.md'
            ],
            moduleticketFor: {
                ticket: 'MOD-002',
                status: 'IN_PROGRESS'
            }
        }
    ];

    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    const handleAccordionClick = (index: number) => {
        setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
    };

    const handleDeleteModule = (moduleId: string) => {
        // In a real app, this would trigger a deletion action
        console.log(`Deleting module with ID: ${moduleId}`);
    };

    return (
        <div>
            {sampleModules.map((module, index) => (
                <div key={module.id} className="transition-all duration-500 my-2 hover:bg-white border text-gray-600 border-gray-200 rounded-md">
                    <div
                        className={`accordion-header cursor-pointer transition flex space-x-5 px-2 xl:px-3 items-center h-auto ${
                            expandedIndex === index ? "bg-white" : ""
                        }`}
                        onClick={() => handleAccordionClick(index)}
                    >
                        <i className={`fas ${expandedIndex === index ? "fa-minus" : "fa-plus"}`}></i>
                        <div className="flex items-center justify-between w-full p-3">
                            <div className="flex flex-col space-y-3 w-80% xl:w-[70%]">
                                <p className="text-gray-700 font-semibold text-[10px] xl:text-sm">
                                    Module-{index + 1}
                                </p>
                            </div>

                            <div className="flex items-center justify-center ml-3">
                                <button className="bg-white text-gray-700 font-bold text-sm xl:text-base rounded-lg">
                                    {expandedIndex === index ? <HiChevronUp /> : <HiChevronDown />}
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
                                    <h5 className="text-gray-700 font-bold text-md mb-2">
                                        Ticket Id: {module.moduleticketFor?.ticket || 'Not Assigned Yet'}
                                    </h5>
                                    <h5 className="text-gray-800 uppercase font-semibold text-sm mb-3">
                                        {module.title}
                                    </h5>
                                    <p className="text-gray-600 text-sm">
                                        {module.description}
                                    </p>

                                    <div className="grid grid-cols-4 gap-6 mt-5">
                                        {module.files ? (
                                            module.files.map((file, fileIndex) => (
                                                <div
                                                    key={fileIndex}
                                                    className="h-14 w-full bg-gray-200 rounded-md lg:h-20 lg:w-full cursor-pointer hover:bg-gray-300 transition-colors"
                                                >
                                                    <div className="flex items-center text-xl justify-center space-x-2">
                                                        <div className="mt-5">
                                                            <HiOutlineDocumentDownload />
                                                            <p className="text-xs mt-1">{file}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="mt-3 text-sm col-span-full">No Document Found</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="w-full flex items-center justify-end">
                                {(!module.moduleticketFor || module.moduleticketFor.status === "PENDING") && (
                                    <button
                                        onClick={() => handleDeleteModule(module.id)}
                                        className="bg-red-200 text-red-600 font-semibold text-xs px-3 py-1 rounded text-right hover:bg-red-300 transition-colors"
                                    >
                                        Delete Module
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

export default ModuleCards;