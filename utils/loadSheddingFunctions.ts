import { Event } from "@/types/event";
import moment from "moment-timezone";

const timeZone = 'Africa/Johannesburg';
export default class LoadSheddingUtils {
    static findUpcomingEvent = (events: Event[]) => {
        const now = moment.tz(timeZone); // Current time in user's time zone

        let upcomingEvent: Event | null = null;
        let upcomingEventTime: moment.Moment | null = null;

        // Loop through each event
        for (const event of events) {
            // Parse the event start time with the correct format
            const eventTime = moment.tz(event.start, 'hh:mm A', timeZone);

            // Check if the event is after the current time
            if (eventTime.isAfter(now)) {
                // If the event is after midnight, consider it for the next day
                if (eventTime.diff(now, 'hours') >= 24) {
                    eventTime.subtract(1, 'day');
                }

                // Check if the event is upcoming
                if (!upcomingEvent || eventTime.isBefore(upcomingEventTime)) {
                    upcomingEvent = event;
                    upcomingEventTime = eventTime;
                }
            }
        }

        return upcomingEvent;
    }

    static timeLeft = (startTime: string) => {
        // Parse the start time using Moment.js
        var start = moment(startTime);

        // Get the current time
        var now = moment();

        // Calculate the difference between the start time and the current time
        var duration = moment.duration(start.diff(now));

        // Extract the remaining hours, minutes, and seconds
        var hours = Math.floor(duration.asHours());
        var minutes = Math.floor(duration.asMinutes()) % 60;
        var seconds = Math.floor(duration.asSeconds()) % 60;

        // Format the remaining time
        var timeLeft = hours + " hours " + minutes + " minutes " + seconds + " seconds";

        return timeLeft;
    }
}
