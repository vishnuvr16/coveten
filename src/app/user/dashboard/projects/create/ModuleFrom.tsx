'use client'
import React, { useCallback, useState } from 'react';
import { useForm } from "react-hook-form";
import Dropzone from 'react-dropzone';

interface IModuleForm {
    index: number;
    modules: any[];
    setModules: (modules: any[]) => void;
    type: string;
}

interface IModuleInput {
    title: string;
    description: string;
    documents: {
        files: File[];
        images: string[];
    };
}

const ModuleForm = ({ index, setModules, modules, type }: IModuleForm) => {
    const [files, setFiles] = useState<File[]>([]);
    const [selected, setSelected] = useState({ title: '' });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<any>();

    const handleModule = (data: any) => {
        const description = data[`moduleDescription${index}`];
        
        if (selected.title && description) {
            const moduleData: IModuleInput = {
                title: selected.title,
                description,
                documents: {
                    files: files,
                    images: []
                }
            };

            const moduleIndex = modules.findIndex(module => module.hasOwnProperty(`moduleTitle${index}`));

            if (moduleIndex !== -1) {
                const updatedModules = [...modules];
                updatedModules[moduleIndex][`moduleTitle${index}`] = moduleData;
                setModules(updatedModules);
            } else {
                const newModule = {
                    [`moduleTitle${index}`]: moduleData
                };
                setModules([...modules, newModule]);
            }
        }
    };

    const handleDrop = useCallback((acceptedFiles: File[]) => {
        setFiles(prevFiles => [...prevFiles, ...acceptedFiles]);
    }, []);

    const handleRemove = useCallback((index: number) => {
        setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
    }, []);

    return (
        <form onChange={handleSubmit(handleModule)}>
            <div>
                <label htmlFor={`service${index}`}>Service-{index}</label>
                <input
                    type="text"
                    id={`service${index}`}
                    className="h-10 border border-gray-300 mt-1 rounded px-4 w-full"
                    placeholder="Enter service title"
                    value={selected.title}
                    onChange={(e) => setSelected({ title: e.target.value })}
                />
            </div>

            <div className="mt-4">
                <label htmlFor={`description${index}`}>Description</label>
                <textarea
                    required
                    rows={4}
                    id={`description${index}`}
                    className="border border-gray-300 mt-1 rounded px-4 w-full"
                    {...register(`moduleDescription${index}`)}
                />
            </div>

            <div className="mt-4">
                <Dropzone maxSize={10485760} onDrop={handleDrop}>
                    {({ getRootProps, getInputProps }) => (
                        <div {...getRootProps()} className="cursor-pointer">
                            <div className="flex flex-col items-center w-full p-5 mt-2 text-center border-2 border-gray-300 border-dashed rounded-xl">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-8 h-8 text-gray-500"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="1.5"
                                        d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                                    />
                                </svg>
                                <h2 className="mt-1 font-medium text-gray-700">Upload Files</h2>
                                <p className="mt-2 text-xs text-gray-500">
                                    Upload or drag & drop your files (Images, doc, pdf, excel)
                                </p>
                                <input {...getInputProps()} accept=".pdf,.docx,.doc,.xlsx,.xls,image/*" />
                            </div>
                        </div>
                    )}
                </Dropzone>

                <div className="flex flex-wrap mt-2 gap-2">
                    {files.map((file, i) => (
                        <div key={file.name} className="relative w-40 h-40 bg-gray-100 rounded-lg p-2">
                            <div className="absolute top-2 right-2">
                                <button
                                    type="button"
                                    onClick={() => handleRemove(i)}
                                    className="bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                                >
                                    ×
                                </button>
                            </div>
                            <div className="h-full flex items-center justify-center">
                                <p className="text-sm text-gray-600 text-center break-words">
                                    {file.name}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </form>
    );
};

export default ModuleForm;