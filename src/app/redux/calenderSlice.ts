import { createSlice } from '@reduxjs/toolkit';
import moment from 'moment';
import { RootState } from './store';
import { TPlan } from '../type';
const initialState: {
    date: moment.Moment,
    kind: moment.unitOfTime.DurationConstructor,
    plan: TPlan[] | undefined,
    isShowDialog: boolean,
    newPlan: TPlan
} =
{
    date: moment(new Date(), "MM-DD-YYYY"),
    kind: "month",
    plan: undefined,
    isShowDialog: false,
    newPlan: {
        color: 'indigo',
        width: 2,
        position: 0,
        startDate: moment(new Date(), "MM-DD-YYYY"),
        endDate: moment(new Date(), "MM-DD-YYYY"),
        demo: ""
    }
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
        setNewPlan(state, action) {
            state.newPlan = action.payload
        }
    }
});

export const { setDate, setKind, setPlan, setDateAndPlan, setIsShowDialog, setNewPlan } = CalenderSlice.actions;
export const getCalender = (state: RootState) => state.Calender;

export default CalenderSlice.reducer;