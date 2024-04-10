'use client'
import React, { useEffect, useState } from 'react'
import moment from 'moment';
import { Grid } from '@radix-ui/themes';
import { useAppSelector, useAppDispatch } from '@/app/redux/hook';
import { getCalender } from '@/app/redux/calenderSlice';
import OneDay from '../components/oneDay';
import { TPlan } from '../type';

const Calender = ({ date }: { date: moment.Moment }) => {
  // const { date } = useAppSelector(getCalender);
  const kind = useAppSelector(getCalender).kind;
  const [datesOfMonth, setDatesOfMonth] = useState<JSX.Element>()

  const plan: TPlan[] = [
    { color: 'red', width: 2, startDate: moment("3-28-2024", "MM-DD-YYYY"), endDate: moment("4-6-2024", "MM-DD-YYYY"), title: "title1", demo: "This is my demo1", kind: '', user: { id: '', name: '', email: '' } },
    { color: 'black', width: 2, startDate: moment("4-3-2024", "MM-DD-YYYY"), endDate: moment("4-16-2024", "MM-DD-YYYY"), title: "This is my tasks.", demo: "This is my demo2", kind: '', user: { id: '', name: '', email: '' } },
    { color: 'magenta', width: 2, startDate: moment("4-7-2024", "MM-DD-YYYY"), endDate: moment("4-16-2024", "MM-DD-YYYY"), title: "title1", demo: "This is my demo2", kind: '', user: { id: '', name: '', email: '' } },
    { color: 'blue', width: 2, startDate: moment("4-17-2024", "MM-DD-YYYY"), endDate: moment("4-17-2024", "MM-DD-YYYY"), title: "title1", demo: "This is my demo3", kind: '', user: { id: '', name: '', email: '' } },
    { color: 'green', width: 2, startDate: moment("4-19-2024", "MM-DD-YYYY"), endDate: moment("5-4-2024", "MM-DD-YYYY"), title: "title1", demo: "This is my demo4", kind: '', user: { id: '', name: '', email: '' } },
    { color: 'cyan', width: 2, startDate: moment("4-21-2024", "MM-DD-YYYY"), endDate: moment("4-27-2024", "MM-DD-YYYY"), title: "title1", demo: "This is my demo5", kind: '', user: { id: '', name: '', email: '' } }
  ]
  useEffect(() => {
    let startDate = date.clone().startOf('month').startOf('week');
    let endDate = date.clone().endOf('month').endOf('week');
    let datesCnt = endDate.diff(startDate, 'days') + 1;
    let day: JSX.Element[] = [];
    if (kind == "month_1")
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
    else if (kind == "month_2") {
      for (let i = 0; i < datesCnt / 7; i++) {
        let inner_item: JSX.Element[] = [];
        for (let j = 0; j < 7; j++) {
          inner_item.push(<OneDay key={i * 7 + j} {
            ...{
              no: i * 7 + j,
              date: startDate.clone().add(i * 7 + j, "days"),
              month: date.clone().month(),
              datesCnt,
              width: 2,
              plan
            }} />);
        }
        day.push(<Grid columns="7" key={i} gap="0" width="auto">{inner_item}
        </Grid>);
      }
    } else if (kind == "week") {
      let inner_item: JSX.Element[] = [];
      for (let i = 0; i < 7; i++) {
        inner_item.push(<OneDay key={i} {
          ...{
            no: i,
            date: startDate.clone().add(i, "days"),
            month: date.clone().month(),
            datesCnt: 7,
            width: 2,
            plan
          }} />);
      }
      day.push(<Grid columns="7" gap="0" width="auto">{inner_item}
      </Grid>);
    }
    setDatesOfMonth(<>{day}</>);
  }, [date, kind])
  return (
    <>
      <Grid columns="1" gap="0" width="auto" className={kind == "week" ? "h-[80px]" : "h-[580px]"}>
        {datesOfMonth}
      </Grid>
    </>
  )
}

export default Calender