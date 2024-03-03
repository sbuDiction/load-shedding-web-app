import { baseURL } from "@/globals";

class ScheduleAPI {
    static fetchSchedule = async (sid: string) => {
        const request = new Request(`${baseURL}/schedule?id=${sid}`, {
            method: 'GET'
        });

        const response = await fetch(request);
        const data = response.json();
        return data;
    }
}

export default ScheduleAPI;