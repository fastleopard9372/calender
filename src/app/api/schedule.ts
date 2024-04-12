import axios from "axios";
import moment from "moment";
import config from "../config";
import { TPlan } from "../type";
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
export const updateScheduleAPI = (plan: TPlan) => {
    const cfg = {
        // headers: {
        //     "Authorization": "Bearer " + access_token
        // }
    }
    console.log(plan)
    return axios.put(config.base_url + '/schedule/' + plan._id, plan)
};

export const getScheduleKindAPI = () => {
    return axios.get(config.base_url + '/schedule_kind',)
};