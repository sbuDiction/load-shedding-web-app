"use client"
import { Disclosure, } from '@headlessui/react'
import {
    Bars3Icon,
    XMarkIcon,
    MagnifyingGlassIcon
} from '@heroicons/react/24/outline'
import SearchInput from '@/components/searchInput';
import React, { useState } from 'react';
import SearchAPI from '@/api/search.api';
import { ResultsType } from '@/types/results';

const navigation = [
    { name: 'Home', href: '#', current: true },
    // { name: 'Manage', href: '#', current: false },
    // { name: 'Projects', href: '#', current: false },
    // { name: 'Calendar', href: '#', current: false },
]

function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(' ')
}

type NavBarProps = {
    liftSearchResults: any;
}

const NavigationBar: React.FC<NavBarProps> = ({ liftSearchResults }) => {
    // const [results, setResults] = useState<ResultsType>({ suburbs: [] });
    const [query, setQuery] = useState<string>('');
    const handleSearch = async () => {
        await SearchAPI.search(query).then(searchResults => {
            // setResults(searchResults);
            liftSearchResults(searchResults)
            // console.log(searchResults);

        })
    }

    return (
        <Disclosure as="nav" className="bg-gray-800" >
            {({ open }) => (
                <>
                    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                        <div className="relative flex h-16 items-center ">
                            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                {/* Mobile menu button*/}
                                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" >
                                    <span className="absolute -inset-0.5" />
                                    <span className="sr-only">Open main menu</span>
                                    {
                                        open ? (
                                            <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                        ) : (
                                            <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                        )
                                    }
                                </Disclosure.Button >
                                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                    <span className="absolute -inset-0.5" />
                                    <span className="sr-only">Open main menu</span>
                                    <MagnifyingGlassIcon className="block h-6 w-6" aria-hidden="true" />
                                </Disclosure.Button>
                            </div >
                            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                                <div className="flex flex-shrink-0 items-center">
                                    <svg color='red' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                        <path fillRule="evenodd" d="M12 2.25a.75.75 0 0 1 .75.75v9a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM6.166 5.106a.75.75 0 0 1 0 1.06 8.25 8.25 0 1 0 11.668 0 .75.75 0 1 1 1.06-1.06c3.808 3.807 3.808 9.98 0 13.788-3.807 3.808-9.98 3.808-13.788 0-3.808-3.807-3.808-9.98 0-13.788a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
                                    </svg>


                                </div>
                                <div className="hidden sm:ml-6 sm:block">
                                    <div className="flex space-x-4">
                                        {navigation.map((item) => (
                                            <a
                                                key={item.name}
                                                href={item.href}
                                                className={classNames(
                                                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                    'rounded-md px-3 py-2 text-sm font-medium'
                                                )}
                                                aria-current={item.current ? 'page' : undefined}
                                            >
                                                {item.name}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="hidden sm:ml-6 sm:block absolute inset-y-0 right-0 flex items-center pr-1 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                {/* Search input */}
                                <SearchInput searchQuery={setQuery} handleSearch={handleSearch} />
                            </div>
                        </div >
                    </div >

                    <Disclosure.Panel className="sm:hidden">
                        <div className="space-y-3 px-2 pb-3 pt-2">
                            {navigation.map((item) => (
                                <Disclosure.Button
                                    key={item.name}
                                    as="a"
                                    href={item.href}
                                    className={classNames(
                                        item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                        'block rounded-md px-3 py-2 text-base font-medium'
                                    )}
                                    aria-current={item.current ? 'page' : undefined}
                                >
                                    {item.name}
                                </Disclosure.Button>
                            ))}
                            <SearchInput searchQuery={setQuery} handleSearch={handleSearch} />
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure >
    )
}
export default NavigationBar;