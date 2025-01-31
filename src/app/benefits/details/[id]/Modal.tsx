'use client'
import { Fragment, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { useGqlClient } from '@/hooks/UseGqlClient';
import { useManualQuery, useMutation } from 'graphql-hooks';
import { toast } from 'react-hot-toast';
import Button from '@/components/Button';
import { HiOutlineCalendar } from 'react-icons/hi';
import AuthConfig from '@/firebase/oauth.config';

//props interface
interface IModalProps {
    isModalOpen: boolean;
    setIsModalOpen: (value: boolean) => void;
    event: string

}

const CREATE_LEAD = `
mutation CreateLeads($input: [LeadsCreateInput!]!) {
    createLeads(input: $input) {
      info {
        nodesCreated
      }
    }
  }
`

const GET_USER_INFO = `
query Users($where: UserWhere) {
    users(where: $where) {
      name
      email
      phone
    }
  }
`


//component
function Modal({ isModalOpen, setIsModalOpen, event }: IModalProps) {




    //states

    const [email, setEmail] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [error, setError] = useState<string>('');


    // hooks
    const client = useGqlClient()
    const { user } = AuthConfig()

    // queries and mutations
    const [getUserFn, userState] = useManualQuery(GET_USER_INFO, {
        client
    })
    const [createLead, createState] = useMutation(CREATE_LEAD, { client })



    const handlePhoneChange = (inputValue: any) => {
        const numericValue = inputValue.replace(/\D/g, '');
        const indianPhonePattern = /^[789]\d{9}$/;

        if (!indianPhonePattern.test(numericValue)) {
            setError('Please enter a valid Indian phone number');
        } else if (numericValue.length > 10) {
            setError('Phone number cannot be more than 10 digits');
        } else if (numericValue.length < 10) {
            setError('Phone number cannot be less than 10 digits');
        } else {
            setPhone(numericValue);
            setError('');
        }
    };



    // functions

    const createLeads = async () => {
        if (error) return
        const { data } = await createLead({
            variables: {
                input: [
                    {
                        email: email,
                        name: name,
                        phone: phone,
                        type: 'EVENT',
                        interest: event,
                        createdAt: new Date().toISOString(),
                        message: message
                    }
                ]
            }
        })


        if (data.createLeads.info.nodesCreated) {
            toast.success('Interest submitted ')
            setEmail('')
            setPhone('')
            setMessage('')
            closeModal()
        }
    }


    const handleSubmit = (e: any) => {
        e.preventDefault()
        createLeads()
        e.target.reset()


    }




    // get user info after login
    useEffect(() => {
        if (user?.email) {
            getUserFn({
                variables: {
                    "where": {
                        "email": user?.email
                    }
                }
            })
        }
    }, [user?.email])


    // set user info after data fetch

    useEffect(() => {
        if (userState?.data?.users?.length) {
            const { name, email, phone } = userState?.data?.users[0]
            setName(name)
            setEmail(email)
            setPhone(phone)
        }
    }, [userState.data?.users?.length])




    const closeModal = () => {
        setIsModalOpen(false);
    }



    //render
    return (

        
        // <div>
        //     <Transition show={isModalOpen} as={Fragment}>
        //         <Dialog
        //             as="div"
        //             className="fixed z-[564645656] inset-0 overflow-y-auto"
        //             onClose={closeModal}
        //             open={isModalOpen}
        //         >
        //             <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        //                 <TransitionChild
        //                     as={Fragment}
        //                     enter="ease-out duration-300"
        //                     enterFrom="opacity-0"
        //                     enterTo="opacity-100"
        //                     leave="ease-in duration-200"
        //                     leaveFrom="opacity-100"
        //                     leaveTo="opacity-0"
        //                 >
        //                     <DialogBackdrop className="fixed inset-0 bg-black bg-opacity-30" />
        //                 </TransitionChild>

        //                 <span
        //                     className="hidden sm:inline-block sm:align-middle sm:h-screen"
        //                     aria-hidden="true"
        //                 >
        //                     &#8203;
        //                 </span>

        //                 <TransitionChild
        //                     as={Fragment}
        //                     enter="ease-out duration-300"
        //                     enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        //                     enterTo="opacity-100 translate-y-0 sm:scale-100"
        //                     leave="ease-in duration-200"
        //                     leaveFrom="opacity-100 translate-y-0 sm:scale-100"
        //                     leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        //                 >

        //                     <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
        //                         <p className="focus:outline-none pt-4 pb-8 text-base text-center sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">Interest</p>
        //                         <form onSubmit={handleSubmit} className=" bg-white  ">

        //                             <div className="px-5 pb-5">
        //                                 <input
        //                                     placeholder="Name"
        //                                     required
        //                                     onChange={(e) => setName(e.target.value)}
        //                                     defaultValue={name}
        //                                     className=" text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-sm bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"

        //                                 />
        //                                 <input
        //                                     placeholder="Email"
        //                                     required

        //                                     onChange={(e) => setEmail(e.target.value)}
        //                                     defaultValue={email}
        //                                     className=" text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-sm bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"

        //                                 />
        //                                 <input
        //                                     placeholder="Phone"
        //                                     required
        //                                     type='number'
        //                                     onChange={(e) => handlePhoneChange(e.target.value)}
        //                                     defaultValue={phone}
        //                                     className="text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-sm bg-gray-200 focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
        //                                     pattern="[789]\d{9}" 
        //                                 />
        //                                 {error ? <p className='text-red-500 text-xs'>{error}</p> : null}


        //                                 <div className="flex">
        //                                     <textarea
        //                                         rows={3}
        //                                         placeholder="message"
        //                                         required
        //                                         onChange={(e) => setMessage(e.target.value)}
        //                                         defaultValue={message}
        //                                         className=" text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-sm bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"

        //                                     />
        //                                 </div>
        //                                 <div className="mt-8">
        //                                     <button type='submit' className='bg-primary font-bold text-white px-7 py-2.5 '>
        //                                         {createState.loading ? 'Loading..' : 'Submit'}
        //                                     </button>
        //                                 </div>

        //                             </div>

        //                         </form>
        //                     </div>
        //                 </TransitionChild>
        //             </div>
        //         </Dialog>
        //     </Transition>
        // </div>
         <div>


<Transition show={isModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
          {/* Background overlay */}
          <div className="fixed inset-0 bg-black bg-opacity-30" aria-hidden="true" />

          <div className="fixed inset-0 flex items-center justify-center p-4">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-lg p-6 bg-white rounded-lg shadow-xl">
                <DialogTitle as="h3" className="text-lg font-medium leading-6 text-gray-900">
                  Interest
                </DialogTitle>
                <div className="mt-2">
                  <form onSubmit={handleSubmit} className="bg-white">
                    <div className="px-5 pb-5">
                      <input
                        placeholder="Name"
                        required
                        onChange={(e) => setName(e.target.value)}
                        defaultValue={name}
                        className="text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base border-transparent rounded-sm bg-gray-200 focus:border-blueGray-500 focus:bg-white focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                      />
                      <input
                        placeholder="Email"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                        defaultValue={email}
                        className="text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base border-transparent rounded-sm bg-gray-200 focus:border-blueGray-500 focus:bg-white focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                      />
                      <input
                        placeholder="Phone"
                        required
                        type="number"
                        onChange={(e) => handlePhoneChange(e.target.value)}
                        defaultValue={phone}
                        className="text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base border-transparent rounded-sm bg-gray-200 focus:border-blueGray-500 focus:bg-white focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                        pattern="[789]\d{9}"
                      />
                      {error && <p className="text-red-500 text-xs">{error}</p>}
                      <textarea
                        rows={3}
                        placeholder="Message"
                        required
                        onChange={(e) => setMessage(e.target.value)}
                        defaultValue={message}
                        className="text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base border-transparent rounded-sm bg-gray-200 focus:border-blueGray-500 focus:bg-white focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                      />
                      <div className="mt-8">
                        <button type="submit" className="bg-primary font-bold text-white px-7 py-2.5">
                          {createState.loading ? 'Loading..' : 'Submit'}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
                <div className="mt-4">
                  <button onClick={closeModal} className="bg-gray-300 text-black px-4 py-2 rounded">
                    Cancel
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </Transition>
        </div>
    );
}

export default Modal;
