type Props = {
    alertIcon?: any;
    alertMessage: string;
    time: string;
    color: string;
    icon: any;
    isStarted: Boolean
}

const AlertStatus: React.FC<Props> = ({
    alertIcon,
    alertMessage,
    time,
    color,
    icon,
    isStarted }) => {
    return (
        <div className={`flex text-center items-center bg-${color}-100 px-4 py-2 text-${color}-700 font-bold justify-center`} >
            {icon}
            {time === 'undefined' ?
                <p className="text-gray-700 text-sm font-bold pl-1">{alertMessage} {time}</p>
                :
                <p className="text-gray-700 text-sm font-bold pl-1">{alertMessage}</p>
            }
        </div>
    );
}
export default AlertStatus;