'use client'
import { Fragment, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Dialog, DialogBackdrop, Transition, TransitionChild } from '@headlessui/react';


//props interface
interface IComplainModal {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
    addComplain: (complain: string) => void;

}


//component
function ComplainModal({ isOpen, setIsOpen, addComplain }: IComplainModal) {


    //handle close modal
    function closeModal() {
        setIsOpen(false);
    }

    //handle open modal
    function openModal() {
        setIsOpen(true);
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        const description = e.target.description.value
        if (description.length) {
            addComplain(description)
        }
    }



    //render
    return (
        <div>


            <Transition show={isOpen} as={Fragment}>
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

                            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                                <p className="focus:outline-none pt-4 pb-8 text-base text-center sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">Comment</p>
                                <form onSubmit={handleSubmit} className=''>


                                    <div className="mb-5">
                                        <label htmlFor="description" className="block  text-gray-700 text-sm mb-1">
                                            Description
                                        </label>
                                        <textarea
                                            id="description"
                                            name="description"
                                            required
                                            className="mt-1 px-4 py-2 border border-gray-200 rounded-md w-full"
                                            rows={3}
                                        />
                                    </div>



                                    <div className="mt-10">
                                        <button
                                            type="submit"
                                            className="px-4 py-2 bg-primary text-white  "
                                        >
                                            Submit
                                        </button>
                                        <button
                                            type="button"
                                            className="ml-2 px-4 py-2 text-gray-500 rounded-md hover:bg-gray-200"
                                            onClick={closeModal}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </TransitionChild>
                    </div>
                </Dialog>
            </Transition>
        </div>
    );
}

export default ComplainModal;
