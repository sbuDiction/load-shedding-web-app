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
  time: { start?: string; end?: string; stage?: number };
  id: string;
  eventTime: string;
  timeLeft: string;
  isStarted: boolean;
}

const LoadSheddingOverviewList = () => {
  const [suburbs, setSuburbs] = useState<Array<ScheduleOverview>>([]);
  // const [eventTime, setEventTime] = useState('');
  const [isLoadShedding, setIsLoadShedding] = useState(false);
  // const [timeLeft, setTimeLeft] = useState('');
  // const [isStarted, setIsStarted] = useState<Boolean>(false);

  const fetchSchedules = async () => {
    const subscriptions: Subscription[] =
      LocalStorageManager.getSubscriptions();
    subscriptions.forEach(async (subs) => {
      await ScheduleAPI.fetchSchedule(subs.sid).then((res) => {
        const currentEevent: Event = LoadSheddingUtils.findUpcomingEvent(
          res.schedule.days[0].stages
        );

        const timeLeftBefore = LoadSheddingUtils.timeLeftBeforeEvenStart(
          currentEevent ? currentEevent.start : ""
        );
        // const timeLeftAfter = LoadSheddingUtils.timeLeftAfterEvenHasStarted([currentEevent]);
        const eventState = LoadSheddingUtils.isEventStarted(
          currentEevent ? currentEevent.start : ""
        );

        // setTimeLeft(eventState.message);
        // setIsStarted(eventState.isStarted);
        const { schedule, suburb } = res;
        const overview: ScheduleOverview = {
          date: schedule.days[0].date,
          suburbName: suburb.name,
          time: {
            start: currentEevent?.start,
            end: currentEevent?.end,
            stage: currentEevent?.stage,
          },
          id: subs.sid,
          eventTime: eventState.message,
          timeLeft: !eventState.isStarted
            ? timeLeftBefore
            : `(${currentEevent?.end})`,
          isStarted: eventState.isStarted,
        };
        setSuburbs((prevData) => [...prevData, overview]);
        setIsLoadShedding(
          res.schedule.days[0].stages.length > 0 ? true : false
        );
      });
    });
  };

  const renderAlertStatus = (timeLeft: string, isStarted: boolean) => {
    let message;
    let color;
    let icon;

    if (isStarted) {
      message = `Load Shedding Ends at `;
    } else {
      message = `Load Shedding Starts in `;
    }

    if (isLoadShedding) {
      color = "red";
      icon = (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3.75m0-10.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.25-8.25-3.286Zm0 13.036h.008v.008H12v-.008Z"
          />
        </svg>
      );
    } else {
      message = `Currently NOT LOAD SHEDDING. `;
      color = "green";
      icon = (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6 text-green-700"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
          />
        </svg>
      );
    }
    return (
      <AlertStatus
        time={timeLeft}
        alertMessage={message}
        color={color}
        icon={icon}
        isStarted={isStarted}
      />
    );
  };

  useEffect(() => {
    fetchSchedules();
  }, []);

  return (
    <div className="items-center">
      {suburbs.length != 0 ? (
        suburbs.map((suburb, i) => (
          <LoadSheddingOverviewCard
            key={i}
            date={suburb.date}
            suburbName={suburb.suburbName}
            time={suburb.time}
            id={suburb.id}
            alertStatus={renderAlertStatus(suburb.timeLeft, suburb.isStarted)}
            eventTime={suburb.eventTime}
          />
        ))
      ) : (
        <div className="subscribe-message">
          <p>Looks like you haven't subscribed to any suburbs yet!</p>
          <p>
            Subscribe to receive updates on the latest{" "}
            <span className="font-bold">Load Shedding</span> in your areas of
            interest.
          </p>
        </div>
      )}
    </div>
  );
};

export default LoadSheddingOverviewList;
