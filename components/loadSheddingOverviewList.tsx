import LocalStorageManager, { Subscription } from "@/utils/localStorageManager";
import LoadSheddingOverviewCard from "./loadSheddingOverviewCard";
import { useEffect, useState } from "react";
import ScheduleAPI from "@/api/schedul.api";

export interface ScheduleOverview {
    date: string;
    suburbName: string;
    time: object;
    id: string
}

const LoadSheddingOverviewList = () => {
    const [suburbs, setSuburbs] = useState<Array<ScheduleOverview>>([]);

    const fetchSchedules = async () => {
        const subscriptions: Subscription[] = LocalStorageManager.getSubscriptions();
        subscriptions.forEach(async subs => {
            await ScheduleAPI.fetchSchedule(subs.sid).then(res => {
                const { schedule, suburb } = res;
                const overview: ScheduleOverview = {
                    date: schedule.days[0].date,
                    suburbName: suburb.name,
                    time: schedule.days[0].stages[0],
                    id: subs.sid
                }
                setSuburbs(prevData => [...prevData, overview]);
            });
        });

    }
    useEffect(() => {
        fetchSchedules()
    }, [])

    return (
        <div>
            {
                suburbs.map((suburb, i) => (
                    <LoadSheddingOverviewCard
                        key={i}
                        date={suburb.date}
                        suburbName={suburb.suburbName}
                        time={suburb.time}
                        id={suburb.id}
                    />
                ))
            }
        </div>
    );
}

export default LoadSheddingOverviewList;