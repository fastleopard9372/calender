import { createSlice } from '@reduxjs/toolkit';
import moment from 'moment';
import { RootState } from './store';
import { TPlan, TScheduleKind } from '../type';
const initialState: {
    date: moment.Moment,
    kind: string,
    plan: TPlan[] | undefined,
    isShowDialog: boolean,
    scheduleKind: TScheduleKind[],
    colors: string[],
    thickness: number[],
} =
{
    date: moment(new Date(), "MM-DD-YYYY"),
    kind: "month_1",
    plan: undefined,
    isShowDialog: false,
    scheduleKind: [
        { id: "1", name: "Birthday", avatar: "" },
        { id: "2", name: "Meeting", avatar: "" },
        { id: "3", name: "Holiday", avatar: "" },
        { id: "4", name: "Work", avatar: "" },
        { id: "5", name: "Travel", avatar: "" },
        { id: "6", name: "Memory", avatar: "" },
    ],
    colors: [
        "red", "green", "blue", "yellow", "orange", "purple", "pink", "teal", "brown", "gray", "cyan", "magenta", "indigo", "lime", "olive", "coral"],
    thickness: [2, 3, 4, 5, 6]

};
export const CalenderSlice = createSlice({
    name: "Calender",
    initialState,
    reducers: {
        setDate(state, action) {
            state.date = action.payload
        },
        setKind(state, action) {
            state.kind = action.payload
        },
        setPlan(state, action) {
            state.plan = action.payload
        },
        setDateAndPlan(state, action) {
            state.date = action.payload.date
            state.plan = action.payload.plan
        },
        setIsShowDialog(state, action) {
            state.isShowDialog = action.payload
        },
        setNewScheduleKind(state, action) {
            state.scheduleKind.push(action.payload)
        }
    }
});

export const {
    setDate,
    setKind,
    setPlan,
    setDateAndPlan,
    setIsShowDialog,
    setNewScheduleKind,
} = CalenderSlice.actions;
export const getCalender = (state: RootState) => state.Calender;

export default CalenderSlice.reducer;