import { Event } from "@/types/event";
import moment from "moment-timezone";

const timeZone = 'Africa/Johannesburg';
export default class LoadSheddingUtils {
    static findUpcomingEvent = (events: Event[]) => {
        // Get the current time in the specified timezone
        let currentTime = moment().tz(timeZone);

        // Find the upcoming event
        let upcomingEvent: Event = events[0];
        for (let i = 0; i < events.length; i++) {
            let event = events[i];
            let eventStartTime = moment.tz(event.start, 'h:mm A', timeZone);
            let eventEndTime = moment.tz(event.end, 'h:mm A', timeZone);

            // Check if the event is ongoing or upcoming
            if (currentTime.isBetween(eventStartTime, eventEndTime, null, '[]')) {
                upcomingEvent = event;
                break;
            } else if (currentTime.isBefore(eventStartTime)) {
                upcomingEvent = event;
                break;
            }
        }

        return upcomingEvent;
    }

    static timeLeftBeforeEvenStart = (startTime: string) => {
        // Parse the start time using Moment.js
        const start = moment.tz(startTime, 'hh:mm A', timeZone);

        // Get the current time
        const now = moment().tz(timeZone);

        // Calculate the difference between the start time and the current time
        const duration = moment.duration(start.diff(now));

        // Extract the remaining hours, minutes, and seconds
        // const days = Math.floor(duration.asDays());
        const hours = Math.floor(duration.asHours());
        const minutes = Math.floor(duration.asMinutes()) % 60;

        // Format the remaining time
        const timeLeft = `${hours}h ${minutes}m (${startTime})`;

        return timeLeft.replace('NaNd NaNh NaNm ()', '');
    }

    static timeLeftAfterEvenHasStarted = (events: Event[]) => {
        // Get the current moment
        const now = moment().tz(timeZone);

        // Loop through each event
        for (const event of events) {
            // Parse the start and end times as moments
            const startTime = moment(`2024-03-07T${event.start}`, 'YYYY-MM-DD HH:mm A').tz(timeZone);
            const endTime = moment(`2024-03-07T${event.end}`, 'YYYY-MM-DD HH:mm A').tz(timeZone);

            // Check if the event is happening now (start <= now < end)
            if (startTime.isBefore(now) && now.isBefore(endTime)) {
                // Calculate the difference between now and end time
                const timeRemaining = moment.duration(endTime.diff(now));

                // Format the time remaining (hours and minutes)
                const hours = timeRemaining.asHours();
                const minutes = timeRemaining.minutes();

                // Return the message with stage information
                return `${hours.toFixed(0)} hours and ${minutes.toFixed(0)} minutes remaining in stage ${event.stage}`;
            }
        }
        // If no event is happening, return a message
        return "All events have ended.";
    }

    static isEventStarted = (eventTime: string) => {
        // Append today's date to the time string
        const today = moment().format('YYYY-MM-DD');
        const eventDateTimeString = `${today} ${eventTime}`;
        let isStarted = false;

        // Parse the event time using Moment.js
        const eventStartTime = moment(eventDateTimeString, 'YYYY-MM-DD HH:mm A');

        // Get the current time
        const currentTime = moment().tz(timeZone);

        // Calculate the difference between current time and event start time
        const duration = moment.duration(eventStartTime.diff(currentTime))
        // console.log(moment.duration(eventStartTime.diff(currentTime)).humanize());
        const hours = Math.floor(duration.asHours());
        const minutes = Math.floor(duration.asMinutes()) - hours * 60;
        // Check if the event has started or not
        if (duration.asSeconds() <= 0) {
            // Event has already started
            isStarted = true;
            if (hours > 0) return {
                isStarted,
                message: `${hours} hours ago`
            };
            else return {
                isStarted,
                message: `${minutes} minutes ago`
            };
        } else {
            // Event has not started yet
            isStarted = false;
            if (hours > 0) return {
                isStarted,
                message: `${hours} hour${hours > 1 ? 's' : ''} left`
            };
            else return {
                isStarted,
                message: `${minutes} minute${minutes > 1 ? 's' : ''} left`
            }
        }
    }

}
