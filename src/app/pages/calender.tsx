'use client'
import React, { useEffect, useState } from 'react'
import moment from 'moment';
import { Grid } from '@radix-ui/themes';
import { useAppSelector, useAppDispatch } from '@/app/redux/hook';
import { getCalender } from '@/app/redux/calenderSlice';
import OneDay from '../components/oneDay';
import { TPlan } from '../type';

const Calender = () => {
  const { date } = useAppSelector(getCalender);
  const [datesOfMonth, setDatesOfMonth] = useState<JSX.Element>()


  const plan: TPlan[] = [
    { color: 'red', width: 2, startDate: moment("3-20-2024", "MM-DD-YYYY"), endDate: moment("3-25-2024", "MM-DD-YYYY"), demo: "This is my demo1" },
    { color: 'black', width: 2, startDate: moment("3-21-2024", "MM-DD-YYYY"), endDate: moment("3-28-2024", "MM-DD-YYYY"), demo: "This is my demo2" },
    { color: 'blue', width: 2, startDate: moment("2-18-2024", "MM-DD-YYYY"), endDate: moment("3-15-2024", "MM-DD-YYYY"), demo: "This is my demo3" },
    { color: 'green', width: 2, startDate: moment("3-23-2024", "MM-DD-YYYY"), endDate: moment("4-19-2024", "MM-DD-YYYY"), demo: "This is my demo4" },
    { color: 'cyan', width: 2, startDate: moment("3-20-2024", "MM-DD-YYYY"), endDate: moment("4-10-2024", "MM-DD-YYYY"), demo: "This is my demo5" }
  ]
  useEffect(() => {
    let startDate = date.clone().startOf('month').startOf('week');
    let endDate = date.clone().endOf('month').endOf('week');
    let datesCnt = endDate.diff(startDate, 'days') + 1;
    let day: JSX.Element[] = [];
    for (let i = 0; i < datesCnt / 7; i++) {
      let inner_item: JSX.Element[] = [];
      for (let j = 0; j < 7; j++) {
        let k = j;
        if (i % 2)
          k = 6 - j
        inner_item.push(<OneDay key={i * 7 + k} {
          ...{
            no: i * 7 + k,
            date: startDate.clone().add(i * 7 + k, "days"),
            month: date.clone().month(),
            datesCnt,
            width: 2,
            plan
          }} />);
      }
      day.push(<Grid columns="7" key={i} gap="0" width="auto">{inner_item}
      </Grid>);
    }
    setDatesOfMonth(<>{day}</>);
  }, [date])
  return (
    <Grid columns="1" gap="0" width="auto" className='h-[500px]'>
      {datesOfMonth}
    </Grid>
  )
}

export default Calender