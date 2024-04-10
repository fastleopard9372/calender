'use client'
import React, { useState } from 'react'
import moment from 'moment';
import { Flex, Tabs, DropdownMenu, Button, IconButton } from '@radix-ui/themes';
import { ChevronLeftIcon, ChevronRightIcon, PlusIcon } from '@radix-ui/react-icons'
import { useAppSelector, useAppDispatch } from '@/app/redux/hook';
import { setDate, setKind, getCalender, setIsShowDialog, setAction } from '@/app/redux/calenderSlice';
const Header = () => {
  const dispatch = useAppDispatch();
  const { date, isShowDialog } = useAppSelector(getCalender);
  const handleClickMonth = (kind: moment.unitOfTime.DurationConstructor, value: number) => {
    dispatch(setDate(date.clone().add(value, kind)))
  }
  const handleClickMonthD = (value: number) => {
    dispatch(setDate(date.clone().month(value)))
  }
  const handleClickYear = (year: number) => {
    dispatch(setDate(date.clone().year(year)))
  }
  const handleClickToday = () => {
    dispatch(setDate(moment(new Date(), "MM-DD-YYYY")))
  }
  const handleClickKind = (m_kind: string) => {
    dispatch(setKind(m_kind));
  }
  const handleDialogOpen = () => {
    dispatch(setAction("Create"))
    dispatch(setIsShowDialog(true))
  }
  return (
    <>
      <Flex direction="row" justify="between" gap="4" pb="2">
        <Flex pt="2">
          <Button value='Create' className='cursor-pointer' variant='soft' color='cyan' radius='full' onClick={handleDialogOpen}> <PlusIcon />Create</Button>
        </Flex>
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
                  <DropdownMenu.Item key={i} onClick={() => handleClickMonthD(i)}>
                    {moment().month(i).format("MMMM")}
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
            <Tabs.Trigger value="month_1" onClick={() => handleClickKind("month_1")}>Month 1</Tabs.Trigger>
            <Tabs.Trigger value="month_2" onClick={() => handleClickKind("month_2")}>Month 2</Tabs.Trigger>
            <Tabs.Trigger value="week" onClick={() => handleClickKind("week")}>Week</Tabs.Trigger>
          </Tabs.List>
        </Tabs.Root>
      </Flex >
    </>
  )
}

export default Header