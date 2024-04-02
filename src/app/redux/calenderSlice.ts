import { createSlice } from '@reduxjs/toolkit';
import moment from 'moment';
import { RootState } from './store';
const initialState: { date: moment.Moment, kind: moment.unitOfTime.DurationConstructor } =
{
    date: moment(moment(new Date(), "MM-DD-YYYY")),
    kind: "month"
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
        }
    }
});

export const { setDate, setKind } = CalenderSlice.actions;
export const getCalender = (state: RootState) => state.Calender;

export default CalenderSlice.reducer;