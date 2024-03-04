import LocalStorageManager, { Subscription } from "@/utils/localStorageManager";
import LoadSheddingOverviewCard from "./loadSheddingOverviewCard";
import { useEffect, useState } from "react";
import ScheduleAPI from "@/api/schedul.api";
import LoadSheddingUtils from "@/utils/loadSheddingFunctions";
import AlertStatus from "./alertStatus";
import { Event } from "@/types/event";

export interface ScheduleOverview {
    date: string;
    suburbName: string;
    time: { start?: string, end?: string, stage?: number };
    id: string
}

const LoadSheddingOverviewList = () => {
    const [suburbs, setSuburbs] = useState<Array<ScheduleOverview>>([]);

    const fetchSchedules = async () => {
        const subscriptions: Subscription[] = LocalStorageManager.getSubscriptions();
        subscriptions.forEach(async subs => {
            await ScheduleAPI.fetchSchedule(subs.sid).then(res => {
                const event = LoadSheddingUtils.findUpcomingEvent(res.schedule.days[0].stages);
                console.log(LoadSheddingUtils.timeLeft(event ? event.start : ''));

                const { schedule, suburb } = res;
                // const { start, end, stage } = schedule.days[0].stages[0];
                const overview: ScheduleOverview = {
                    date: schedule.days[0].date,
                    suburbName: suburb.name,
                    time: { start: event?.start, end: event?.end, stage: event?.stage },
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
                        alertStatus={<AlertStatus />}
                    />
                ))
            }
        </div>
    );
}

export default LoadSheddingOverviewList;