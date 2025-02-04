'use client'
import { Fragment, useState } from 'react';
import { Dialog, DialogBackdrop, Transition, TransitionChild } from '@headlessui/react';
import { useGqlClient } from '@/hooks/UseGqlClient';
import { useQuery } from 'graphql-hooks';

import { HiOutlineDocumentDownload } from 'react-icons/hi';
import Link from 'next/link';
import Loading from '@/app/loading';

//props interface
interface IUserModalProps {
    isModalOpen: boolean;
    setIsModalOpen: (value: boolean) => void;
    currentModuleId: string
}



const GET_MODULE_DETAILS = `
query Modules($where: ModuleWhere) {
    modules(where: $where) {
      title
      description
      files
    }
  }

`


//component
function ViewModal({ setIsModalOpen, isModalOpen, currentModuleId }: IUserModalProps) {

    //hooks
    const client = useGqlClient();

    // fetching data

    const { data, loading, error } = useQuery(GET_MODULE_DETAILS, {
        client,
        variables: {
            where: {
                id: currentModuleId
            }
        }
    })




    //handle close modal
    function closeModal() {
        setIsModalOpen(false);
    }

    if (loading) return <Loading />


    //render
    return (
        <div>


            <Transition show={isModalOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed z-[120000000000] inset-0 overflow-y-auto"
                    onClose={closeModal}
                >
                    <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                        <TransitionChild
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <DialogBackdrop className="fixed inset-0 bg-black bg-opacity-30" />
                        </TransitionChild>

                        <span
                            className="hidden sm:inline-block sm:align-middle sm:h-screen"
                            aria-hidden="true"
                        >
                            &#8203;
                        </span>

                        <TransitionChild
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >

                            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl sm:w-full sm:p-6">
                                <p className="focus:outline-none pt-4 pb-8 text-base text-center sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">Module Details</p>
                                <div className=''>
                                    <div className="mb-5">
                                        <p className="block  text-gray-700 text-sm mb-1 ">
                                            Module Name: <span className='uppercase'>{data?.modules[0]?.title || 'N/A'}</span>
                                        </p>

                                    </div>
                                    <div className="mb-5">
                                        <p className="block  text-gray-700 text-sm mb-1 ">
                                            Description : {data?.modules[0]?.description || 'N/A'}
                                        </p>

                                    </div>

                                    <div className="mb-5">
                                        <div className=''>
                                            <p className='text-xs lg:text-sm  text-gray-700'>Documents</p>

                                            <div className='mt-3 grid grid-cols-3 lg:grid-cols-6 gap-2 lg:gap-6'>
                                                {
                                                    data?.modules[0]?.files ?
                                                        data?.modules[0]?.files?.map((item: string, index: number) =>
                                                            <Link href={item} target='_blank' key={index} className=' h-14 w-full bg-gray-200 rounded-md lg:h-20 lg:w-full '>
                                                                <div className='flex items-center text-xl  justify-center space-x-2'>
                                                                    <p className='mt-5'><HiOutlineDocumentDownload /></p>

                                                                </div>
                                                            </Link>

                                                        )
                                                        :

                                                        <p className='mt-3 text-sm col-span-full'>No Document Found</p>
                                                }


                                            </div>


                                        </div>
                                    </div>


                                    <div className="mt-10">

                                        <button
                                            type="button"
                                            className="ml-2 px-4 py-2 text-gray-500 rounded-md hover:bg-gray-200"
                                            onClick={closeModal}
                                        >
                                            Close
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </TransitionChild>
                    </div>
                </Dialog>
            </Transition>
        </div>
    );
}

export default ViewModal;
