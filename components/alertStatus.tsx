type Props = {
    alertIcon?: any;
    alertMessage?: string
}

const AlertStatus: React.FC<Props> = ({ alertIcon, alertMessage }) => {
    return (
        <div className="flex text-center items-center bg-red-100 px-4 py-2 text-red-700 font-bold justify-center">

            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
            </svg>

            <p className="text-gray-700 text-sm font-bold">Load Shedding ends in 0d 0h 37m (20:30)</p>
        </div>
    );
}
export default AlertStatus;