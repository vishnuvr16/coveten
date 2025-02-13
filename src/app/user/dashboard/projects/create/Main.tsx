'use client'
import React, { useState } from 'react';
import { useForm } from "react-hook-form"
import ModuleForm from './ModuleFrom';

interface IProjectInput {
    projectName: string;
    projectDescription: string;
    priority: string;
}

const Main = () => {
    const [moduleCount, setModuleCount] = useState(1);
    const [modules, setModules] = useState<any[]>([]);
    const [type, setType] = useState("SERVICE");

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IProjectInput>();

    const handleProjectSubmit = (data: IProjectInput) => {
        // Here you can handle the form submission
        const formData = {
            ...data,
            type,
            modules
        };
        console.log('Form submitted:', formData);
    };

    return (
        <div className="container max-w-screen-lg mx-auto">
            <form onSubmit={handleSubmit(handleProjectSubmit)} className="bg-white rounded p-4 px-4 md:p-8 mb-6">
                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-2">
                    <div className="lg:col-span-2">
                        <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                            {/* Project Details */}
                            <div className="col-span-full">
                                <label htmlFor="projectName">Project name</label>
                                <input 
                                    type="text" 
                                    id="projectName" 
                                    className="h-10 border border-gray-300 mt-1 rounded px-4 w-full"
                                    {...register('projectName')} 
                                />
                            </div>

                            <div className="col-span-full">
                                <label htmlFor="projectDescription">Project Description</label>
                                <textarea 
                                    rows={4} 
                                    id="projectDescription" 
                                    className="border border-gray-300 mt-1 rounded px-4 w-full"
                                    {...register("projectDescription")} 
                                />
                            </div>

                            <div className="col-span-full">
                                <label htmlFor="type">Type</label>
                                <select
                                    value={type}
                                    onChange={(e) => setType(e.target.value)}
                                    className="border border-gray-300 mt-1 rounded px-4 w-full"
                                >
                                    <option value="SERVICE">SERVICE</option>
                                    <option value="PRODUCT">PRODUCT</option>
                                    <option value="SOLUTION">SOLUTION</option>
                                    <option value="LEARN">LEARN</option>
                                    <option value="EVENTS">EVENTS</option>
                                </select>
                            </div>

                            <div className="col-span-full">
                                <label htmlFor="priority">Priority:</label>
                                <select 
                                    id="priority" 
                                    className="border border-gray-300 mt-1 rounded px-4 w-full"
                                    {...register("priority")} 
                                >
                                    <option value="">Select</option>
                                    <option value="top">Top Priority – response in 2hrs</option>
                                    <option value="high">High Priority – response in 24hrs</option>
                                    <option value="medium">Medium Priority</option>
                                    <option value="low">Low Priority</option>
                                </select>
                            </div>

                            {/* Modules Section */}
                            <div className="md:col-span-5 mt-8">
                                <div className="flex justify-between">
                                    <p className="text-xl font-semibold text-gray-800">Services</p>
                                    <div>
                                        <label>Add More Services</label>
                                        <div className="h-10 w-28 flex border border-gray-300 rounded items-center mt-1">
                                            <button
                                                type="button"
                                                onClick={() => setModuleCount(Math.max(1, moduleCount - 1))}
                                                className="cursor-pointer outline-none focus:outline-none border-r border-gray-300 transition-all text-gray-500 hover:text-blue-600"
                                            >
                                                <span className="mx-2">-</span>
                                            </button>
                                            <input
                                                className="px-2 text-center appearance-none outline-none border-none text-gray-800 w-full bg-transparent"
                                                readOnly
                                                value={moduleCount}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setModuleCount(moduleCount + 1)}
                                                className="cursor-pointer outline-none focus:outline-none border-l border-gray-300 transition-all text-gray-500 hover:text-blue-600"
                                            >
                                                <span className="mx-2">+</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-5">
                                    {[...Array(moduleCount)].map((_, i) => (
                                        <div key={i} className="grid grid-cols-1 gap-4 max-w-2xl">
                                            <ModuleForm
                                                index={i + 1}
                                                setModules={setModules}
                                                modules={modules}
                                                type={type}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-8">
                                <button 
                                    type="submit" 
                                    className="bg-blue-600 text-white font-bold py-3 px-12 text-lg rounded hover:bg-blue-700 transition-colors"
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Main;