import axios from "axios";
import moment from "moment";
import config from "../config";

export const getSchedulesAPI = ({ startDate, endDate }: { startDate: moment.Moment, endDate: moment.Moment }) => {
    const cfg = {
        // headers: {
        //     "Authorization": "Bearer " + access_token
        // }
    }
    return axios.post(config.base_url + '/schedule/read',
        {
            startDate: startDate.format("YYYY-MM-DD"),
            endDate: endDate.format("YYYY-MM-DD"),
        })
};

export const getScheduleKindAPI = () => {
    return axios.get(config.base_url + '/schedule_kind',)
};