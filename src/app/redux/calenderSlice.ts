import { createSlice } from '@reduxjs/toolkit';
import moment from 'moment';
import { RootState } from './store';
const initialState: { date: moment.Moment } =
{
    date: moment(moment(new Date(), "MM-DD-YYYY"))
};
export const CalenderSlice = createSlice({
    name: "Calender",
    initialState,
    reducers: {
        setCalender(state, action) {
            state.date = action.payload;
        }
    }
});

export const { setCalender } = CalenderSlice.actions;
export const getCalender = (state: RootState) => state.Calender.date;

export default CalenderSlice.reducer;