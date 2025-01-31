'use client';

import Image from 'next/image';
import { Fragment, useState } from 'react';
import { Dialog, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { LuCircle } from 'react-icons/lu';
import Link from 'next/link';
import logo from "@/public/assets/CovetenLogo.png";

// Types
interface NavLink {
  name: string;
  href: string;
}

// Navigation Links
const navigationLinks: NavLink[] = [
  { name: 'What We Do', href: '/' },
  { name: 'Products', href: '/products' },
  { name: 'Insights', href: '/insights' },
  { name: 'Benefits', href: '/benefits' },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Example state for auth

  return (
    <>
      <style jsx>{`
        .navbar {
          background-color: transparent;
          width: 100%;
          background: rgba(0, 0, 0, 0.8);
          height: 5.5em;
          position: absolute;
          -webkit-backdrop-filter: blur(10px);
          backdrop-filter: blur(10px);
          border-bottom: 2px solid rgba(30, 28, 28, .1);
        }
        
        .blurred-background {
          background-color: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border-bottom: 2px solid rgba(30, 28, 28, 0.1);
          position: fixed;
          z-index: 50;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
        }
      `}</style>

      <header className="z-[50] h-20 navbar">
        <nav className="relative mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8" aria-label="Global">
          {/* Logo */}
          <div className="flex lg:flex-1">
            <Link href="/" className="-m-1.5 p-1.5">
              <Image
                height={300}
                width={300}
                className="block h-12 w-auto rounded-lg transform transition-all hover:scale-110 duration-200"
                src={logo}
                alt="Logo"
              />
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          {/* Desktop navigation */}
          <div className="hidden lg:flex lg:flex-1 lg:justify-center">
            {navigationLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-semibold leading-6 text-white mr-8 transform transition-all hover:scale-110 duration-200 whitespace-nowrap"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop auth section */}
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            {isLoggedIn ? (
              <div className="flex items-center justify-center space-x-3">
                <Link
                  href="/dashboard/projects/create"
                  className="text-sm flex items-center justify-center font-semibold leading-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-2 py-1.5 rounded-md"
                >
                  <span className="mr-1 text-lg"><LuCircle /></span>
                  <span>New Project</span>
                </Link>

                <Menu as="div" className="relative inline-block text-left">
                  <Menu.Button className="w-9 h-9 rounded-full overflow-hidden border-2 dark:border-white border-gray-900">
                    <img src="/assets/no_user.png" alt="" className="w-full h-full object-cover" />
                  </Menu.Button>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1">
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              href="/dashboard"
                              className={classNames(
                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                'block px-4 py-2 text-sm'
                              )}
                            >
                              Dashboard
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              href="/profile"
                              className={classNames(
                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                'block px-4 py-2 text-sm'
                              )}
                            >
                              Profile
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={() => setIsLoggedIn(false)}
                              className={classNames(
                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                'block w-full px-4 py-2 text-left text-sm'
                              )}
                            >
                              Sign out
                            </button>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            ) : (
              <div className="space-x-4 flex items-center justify-center">
                <Link
                  href="/auth/login"
                  className="-mx-3 block rounded-lg py-2.5 px-3 text-sm font-semibold leading-6 text-white transform transition-all hover:scale-110 duration-200"
                >
                  Log in
                </Link>
                <Link
                  href="/auth/signup"
                  className="block rounded-md py-1.5 px-3 text-sm font-semibold leading-6 text-white bg-gradient-to-r from-blue-500 to-purple-500"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </nav>

        {/* Mobile menu */}
        <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
          <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full bg-black bg-opacity-80 backdrop-blur-md overflow-y-auto px-6 py-6 sm:max-w-sm">
            <div className="flex items-center justify-between">
              <Link href="/" className="-m-1.5 p-1.5">
                <Image
                  height={200}
                  width={200}
                  className="block h-8 w-auto rounded-lg"
                  src="/assets/CovetenLogo.png"
                  alt="Logo"
                />
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigationLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className="text-md block pb-3 font-semibold leading-6 text-white mr-8"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
                <div className="py-6">
                  {isLoggedIn ? (
                    <>
                      <Link
                        href="/dashboard"
                        className="-mx-3 block rounded-lg py-2.5 px-3 text-base font-semibold leading-7 text-white hover:bg-gray-50 hover:text-gray-900"
                      >
                        Dashboard
                      </Link>
                      <button
                        onClick={() => setIsLoggedIn(false)}
                        className="-mx-3 block rounded-lg py-2.5 px-3 text-base font-semibold leading-7 text-white hover:bg-gray-50 hover:text-gray-900 w-full text-left"
                      >
                        Sign out
                      </button>
                    </>
                  ) : (
                    <Link
                      href="/auth/login"
                      className="-mx-3 block rounded-lg py-2.5 px-3 text-base font-semibold leading-7 text-white hover:bg-gray-50 hover:text-gray-900"
                    >
                      Log in
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>
    </>
  );
}