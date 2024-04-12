'use client'
import React from 'react'
import moment from 'moment';
import { Flex, Tabs, DropdownMenu, Button, IconButton, Avatar } from '@radix-ui/themes';
import { ChevronLeftIcon, ChevronRightIcon, PlusIcon } from '@radix-ui/react-icons'
import { useAppSelector, useAppDispatch } from '@/app/redux/hook';
import { setDate, setKind, getCalender, setIsShowDialog, setAction, setNewPlan } from '@/app/redux/calenderSlice';
const Header = () => {
  const dispatch = useAppDispatch();
  const date = moment(useAppSelector(getCalender).date);
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
    dispatch(setNewPlan({
      id: "",
      color: 'indigo',
      width: 2,
      startDate: moment(new Date()).format("YYYY-MM-DD"),
      endDate: moment(new Date()).format("YYYY-MM-DD"),
      demo: "",
      kind: "-1",
      title: "",
      user: {
        id: "",
        name: "",
        email: "",
      }
    }))
    dispatch(setAction("Create"))
    dispatch(setIsShowDialog(true))
  }
  return (
    <>
      <Flex direction="row" justify="between" gap="4" py="2">
        <Flex pt="2">
          <Button value='Create' className='cursor-pointer' variant='soft' color='cyan' radius='full' onClick={handleDialogOpen}> <PlusIcon />Create</Button>
        </Flex>
        <Flex gap="3" pt="2">
          <Flex gap="3" >
            <Button variant="soft" onClick={handleClickToday} className='cursor-pointer' >
              Today
            </Button>
            <IconButton className='cursor-pointer' radius="full" variant="soft" onClick={() => handleClickMonth("months", -1)}>
              <ChevronLeftIcon width="18" height="18" />
            </IconButton>
            <IconButton className='cursor-pointer' radius="full" variant="soft">
              <ChevronRightIcon width="18" height="18" onClick={() => handleClickMonth("months", 1)} />
            </IconButton>
          </Flex>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger className='w-[130px] cursor-pointer'  >
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
            <DropdownMenu.Trigger className='cursor-pointer'>
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
        <Flex gap="3" align="center">
          <Tabs.Root defaultValue="month_1">
            <Tabs.List>
              <Tabs.Trigger className='cursor-pointer' value="month_1" onClick={() => handleClickKind("month_1")}>Month 1</Tabs.Trigger>
              <Tabs.Trigger className='cursor-pointer' value="month_2" onClick={() => handleClickKind("month_2")}>Month 2</Tabs.Trigger>
              <Tabs.Trigger className='cursor-pointer' value="week" onClick={() => handleClickKind("week")}>Week</Tabs.Trigger>
            </Tabs.List>
          </Tabs.Root>

          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <Avatar
                size="2"
                className='cursor-pointer'
                radius='full'
                src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=256&h=256&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop"
                fallback="A"
              />
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
              <DropdownMenu.Item>My Profile</DropdownMenu.Item>
              <DropdownMenu.Item>Sign Out</DropdownMenu.Item>
              <DropdownMenu.Item>Sign In</DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </Flex>
      </Flex >
    </>
  )
}

export default Header
