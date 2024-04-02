'use client'
import React, { useState } from 'react'
import moment from 'moment';
import { Flex, Tabs, DropdownMenu, Button, IconButton, Grid, Box } from '@radix-ui/themes';
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons'

const Header = () => {
  const [date, setDate] = useState<moment.Moment>(moment(new Date(), "MM-DD-YYYY"))
  const [kind, setKind] = useState<string>("month")
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
    </>
  )
}

export default Header