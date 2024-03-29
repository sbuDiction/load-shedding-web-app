'use client'
import { Area } from "@/types/area";
import LocalStorageManager from "@/utils/localStorageManager";
import { useState } from "react";

type LoadingState = {
    state: boolean
}

const SearchResultsCard: React.FC<Area> = ({
    name,
    region,
    block,
    sid,
    handleSubscription }) => {
    const [isLoading, setLoading] = useState<LoadingState>({ state: false });
    const handleSubscribe = () => {
        setLoading({ state: !isLoading.state });
        LocalStorageManager.saveSubuscription({ sid }).then(status => {
            setLoading({ state: false });
            handleSubscription(true);
        });
    }

    return (
        <div className="w-screen md:w-screen  md:justify-center lg:w-6/12  bg-white rounded-lg border border-gray-200 shadow-md p-3 flex items-center">
            <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            </div>
            <div className="ml-4">
                <div className="text-sm font-medium text-gray-900">{name}</div>
                <div className="text-xs text-gray-500">{region}</div>
            </div>

            <div className="ml-auto">

                <button onClick={handleSubscribe} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    {isLoading.state ?
                        <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                        </svg>
                        : ''
                    }
                    Subscribe
                </button>
            </div>
        </div>

    );
}

export default SearchResultsCard;