import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { X, FileIcon, ExternalLinkIcon } from 'lucide-react';

interface ModuleDetails {
  title: string;
  description: string;
  reports: string[];
}

interface ViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  moduleDetails?: ModuleDetails;
}

const ViewModal: React.FC<ViewModalProps> = ({ isOpen, onClose, moduleDetails }) => {
  if (!moduleDetails) return null;

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog onClose={onClose} className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex min-h-screen items-center justify-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Panel className="fixed inset-0 bg-black/40" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="relative mx-auto w-full max-w-2xl transform rounded-xl bg-white p-6 shadow-xl transition-all">
              <div className="absolute right-4 top-4">
                <button
                  onClick={onClose}
                  className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <Dialog.Title className="text-center text-2xl font-semibold text-gray-900">
                Module Details
              </Dialog.Title>

              <div className="mt-6 space-y-6">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Module Name
                  </label>
                  <div className="mt-1 rounded-lg border border-gray-300 p-3 text-gray-700">
                    {moduleDetails.title || 'N/A'}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <div className="mt-1 rounded-lg border border-gray-300 p-3 text-gray-700">
                    {moduleDetails.description || 'N/A'}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Documents
                  </label>
                  <div className="mt-3">
                    {moduleDetails.reports && moduleDetails.reports.length > 0 ? (
                      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                        {moduleDetails.reports.map((report, index) => (
                          <a
                            key={index}
                            href={report}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex flex-col items-center rounded-lg border border-gray-200 p-4 transition-all hover:border-blue-500 hover:bg-blue-50"
                          >
                            <FileIcon className="h-8 w-8 text-gray-400 transition-colors group-hover:text-blue-500" />
                            <div className="mt-2 flex items-center space-x-1">
                              <span className="text-sm text-gray-600 group-hover:text-blue-600">
                                View
                              </span>
                              <ExternalLinkIcon className="h-4 w-4" />
                            </div>
                          </a>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500">No documents available</p>
                    )}
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={onClose}
                    className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ViewModal;