import Time from '@/utils/time';
import { MONTHS, WEEKDAYS } from '@/dateConstants';

type Props = {
    date: string;
    suburbName: string;
    time: { start?: string, end?: string, stage?: number };
    id: string;
    alertStatus?: any;
    eventTime: string
}

const LoadSheddingOverviewCard: React.FC<Props> = ({
    date,
    suburbName,
    time,
    alertStatus,
    eventTime }) => {
    const timeInstance = Time.createDate(date);
    return (
        <div className="flex justify-center items-center pt-2 pl-1 md:w-screen md:justify-center">

            <div className="bg-gray-200 rounded-lg shadow-md overflow-hidden p-2 w-full md:w-screen lg:w-6/12">
                {alertStatus}

                <div className="flex justify-between p-2 card_content">
                    <div className="items-center pr-5">
                        <p className="font-bold text-gray-700">{WEEKDAYS[timeInstance.getDay()]}</p>
                        <p className="font-medium text-gray-800">{MONTHS[timeInstance.getMonth()]}</p>
                        <p className="font-medium text-gray-800">{timeInstance.getDate() < 10 ? `0${timeInstance.getDate()}` : timeInstance.getDate()}</p>
                    </div>
                    {time.start === undefined ? '' :
                        <div className="flex-col items-center mr-9">
                            <div className="flex">

                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-gray-500">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
                                </svg>

                                <p className="flex font-bold text-gray-700 pl-1">{`Stage ${time.stage}`}</p>
                            </div>
                            <div className="flex">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-gray-500">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                                <p className="font-medium text-[blue] pl-1">{`${time.start}-${time.end}`}</p>
                            </div>
                        </div>
                    }

                    <div className="flex">
                        <div className="">
                            <svg className="h-6 w-6 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </div>

                        <div className="ml-2">
                            <p className="font-bold text-gray-700">{suburbName}</p>
                            {/* {time.start != undefined ? <p className="font-medium text-[blue] float-right">{`(${eventTime})`}</p> : ''} */}
                        </div>
                    </div>
                </div>
                {time.start === undefined ?
                    ''
                    :
                    <div className="mt-4 w-full h-2 bg-gray-200 rounded-full">
                        <div id="progress-bar" className="h-full bg-blue-500 rounded-full"></div>
                    </div>
                }
            </div>
        </div>
    );
}

export default LoadSheddingOverviewCard;