'use client'
import { Fragment, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Dialog, DialogBackdrop, Transition, TransitionChild } from '@headlessui/react';
import { useGqlClient } from '@/hooks/UseGqlClient';
import { useMutation, useQuery } from 'graphql-hooks';
import { toast } from 'react-hot-toast';
import MultiSelect from '@/components/Multiselect';



//props interface
interface INotificationModal {
    isModalOpen: boolean;
    setIsModalOpen: (value: boolean) => void;
    addService: (service: string) => void;

}

const GET_SERVICE = `
query Services($where: ServiceWhere, $options: ServiceOptions) {
    services(where: $where, options: $options) {
      id
      title
    }
  }
`

//component
function AddServiceModal({ isModalOpen, setIsModalOpen, addService }: INotificationModal) {

    // states
    const [selectedService, setSelectedService] = useState<any>('');

    // hooks
    const client = useGqlClient()

    // queries and mutations
    const { data: serviceData, loading: serviceLoading, error: serviceError } = useQuery(GET_SERVICE, {
        client,
        variables: {
            "where": {
                "isService": true
            }
        }
    })

    //handle close modal
    function closeModal() {
        setIsModalOpen(false);
    }

    //handle open modal
    function openModal() {
        setIsModalOpen(true);
    }

    //add new industry
    const handleSubmit = async (e: any) => {
        e.preventDefault()

        await addService(selectedService)

    }




    //render
    return (
        <div>


            <Transition show={isModalOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed z-[1000000000000005] inset-0 overflow-y-auto"
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

                            <div className="inline-block  align-bottom bg-white rounded-lg px-4 pt-5 pb-7 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-8">
                                <p className="focus:outline-none pt-4 pb-8 text-base text-center sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800 border-b mb-7">Add New Service</p>
                                <form onSubmit={handleSubmit}>
                                    <div className="flex flex-col space-y-3 w-full">
                                        <div>

                                            <label className="font-medium">
                                                Services
                                            </label>
                                            <select
                                                value={selectedService}
                                                onChange={(e) => setSelectedService(e.target.value)}
                                                className="text-black placeholder-gray-600 w-full px-4 py-1.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-sm bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"

                                            >
                                                <option value="" >Select Service</option>
                                                {serviceData?.services?.map((option: any) => (


                                                    <option key={option?.id} value={option?.title} className='uppercase'>
                                                        {option?.title}
                                                    </option>
                                                ))}
                                            </select>
                                            <div className="relative inline-flex w-full min-w-full ">




                                            </div>
                                        </div>


                                    </div>
                                    <div className="mt-10">
                                        <button
                                            type="submit"
                                            className="px-4 py-2 bg-primary text-white  hover:bg-blue-600"
                                        >
                                            Add New
                                        </button>
                                        <button
                                            type="button"
                                            className="ml-2 px-4 py-2 text-gray-700  hover:bg-gray-200"
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

export default AddServiceModal;
