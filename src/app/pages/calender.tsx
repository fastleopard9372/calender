'use client'
import React, { useEffect, useState } from 'react'
import moment from 'moment';
import { Flex, Tabs, DropdownMenu, Button, IconButton, Grid, Box } from '@radix-ui/themes';
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons'
import OneDay from '../components/oneDay';
import { TPlan } from '../type';

const Calender = () => {
  const [date, setDate] = useState<moment.Moment>(moment(new Date(), "MM-DD-YYYY"))
  const [kind, setKind] = useState<string>("month")
  const [datesOfMonth, setDatesOfMonth] = useState<JSX.Element>()
  const handleClickMonth = (kind: moment.unitOfTime.DurationConstructor, value: number) => {
    setDate(date.clone().add(value, kind));
  }
  const handleClickYear = (year: number) => {
    setDate(date.clone().year(year))
  }
  const handleClickToday = () => {
    setDate(moment(new Date(), "MM-DD-YYYY"))
  }
  const handleClickKind = (m_kind: string) => {
    setKind(m_kind);
  }
  const plan: TPlan[] = [
    { color: 'red', width: 4, description: '', startDate: moment("3-27-2024", "MM-DD-YYYY"), endDate: moment("3-30-2024", "MM-DD-YYYY") },
    { color: 'blue', width: 4, description: '', startDate: moment("3-28-2024", "MM-DD-YYYY"), endDate: moment("4-02-2024", "MM-DD-YYYY") },
    { color: 'green', width: 4, description: '', startDate: moment("3-23-2024", "MM-DD-YYYY"), endDate: moment("4-04-2024", "MM-DD-YYYY") },
    { color: 'cyan', width: 4, description: '', startDate: moment("3-20-2024", "MM-DD-YYYY"), endDate: moment("3-29-2024", "MM-DD-YYYY") }
  ]
  useEffect(() => {
    let startDate = date.clone().startOf('month').startOf('week');
    let endDate = date.clone().endOf('month').endOf('week');
    let datesCount = endDate.diff(startDate, 'days') + 1;
    let day: JSX.Element[] = [];
    for (let i = 0; i < datesCount / 7; i++) {
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
            datesCnt: datesCount,
            plan
          }} />);
      }
      day.push(<Grid columns="7" gap="0" width="auto">{inner_item}
      </Grid>);
    }
    setDatesOfMonth(<>{day}</>);
  }, [date])
  return (
    <>
      <Flex direction="row" justify="between" gap="4" pb="2">
        <Flex gap="3" pt="2">
          <Flex gap="3" >
            <Button variant="soft" onClick={handleClickToday}>
              Today
            </Button>
            <IconButton radius="full" variant="soft" onClick={() => handleClickMonth("months", -1)}>
              <ChevronLeftIcon width="18" height="18" />
            </IconButton>
            <IconButton radius="full" variant="soft">
              <ChevronRightIcon width="18" height="18" onClick={() => handleClickMonth("months", 1)} />
            </IconButton>
          </Flex>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger className='w-[130px]'>
              <Button variant="soft">
                {date.format('MMMM')}
                <DropdownMenu.TriggerIcon />
              </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content className='max-h-[300px]'>
              {
                Array(12).fill(0).map((v: number, i: number) => (
                  <DropdownMenu.Item key={i} onClick={() => handleClickMonth("months", i)}>
                    {moment(new Date()).add(i, "months").format('MMMM')}
                  </DropdownMenu.Item>
                ))
              }
            </DropdownMenu.Content>
          </DropdownMenu.Root>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <Button variant="soft" >
                {date.format('YYYY')}
                <DropdownMenu.TriggerIcon />
              </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content className='max-h-[300px]'>
              {
                Array(12).fill(0).map((v: number, i: number) => (
                  <DropdownMenu.Item key={i} onClick={() => handleClickYear(date.year() + i - 6)}>
                    {date.year() + i - 6}
                  </DropdownMenu.Item>
                ))
              }
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </Flex>
        <Tabs.Root defaultValue="kind">
          <Tabs.List>
            <Tabs.Trigger value="month" onClick={() => handleClickKind("month")}>Month</Tabs.Trigger>
            <Tabs.Trigger value="week" onClick={() => handleClickKind("week")}>Week</Tabs.Trigger>
          </Tabs.List>
        </Tabs.Root>
      </Flex >
      <Grid columns="1" gap="0" width="auto" className='h-[500px]'>
        {datesOfMonth}
      </Grid>
    </>
  )
}

export default Calender