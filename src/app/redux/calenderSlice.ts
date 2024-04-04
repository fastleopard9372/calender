import { createSlice } from '@reduxjs/toolkit';
import moment from 'moment';
import { RootState } from './store';
import { TPlan } from '../type';
const initialState: { date: moment.Moment, kind: moment.unitOfTime.DurationConstructor, plan: TPlan[] | undefined } =
{
    date: moment(new Date(), "MM-DD-YYYY"),
    kind: "month",
    plan: undefined
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
        }
    }
});

export const { setDate, setKind, setPlan, setDateAndPlan } = CalenderSlice.actions;
export const getCalender = (state: RootState) => state.Calender;

export default CalenderSlice.reducer;