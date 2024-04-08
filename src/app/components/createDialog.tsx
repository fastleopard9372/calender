'use client'
import React, { useEffect, useState } from 'react'
import { Dialog, Button, Flex, TextArea, TextField } from '@radix-ui/themes'
import { useAppDispatch, useAppSelector } from '../redux/hook'
import { setIsShowDialog, setNewPlan, getCalender } from '../redux/calenderSlice'
const CreateDialog = () => {
  const dispatch = useAppDispatch();
  const { isShowDialog } = useAppSelector(getCalender);
  const handleOpenChange = (open: boolean) => {
    dispatch(setIsShowDialog(open))
  }
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  return (
    <Dialog.Root open={isShowDialog} onOpenChange={handleOpenChange}>
      <Dialog.Content>
        <Dialog.Title>Create Schedule</Dialog.Title>
        <Dialog.Description className='pb-2'>
          <Flex direction="row" gap="4">
            <Flex direction="column">
              Start Date:
              {/* <DatePicker
                selected={startDate}
                onChange={(date: Date) => setStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
              /> */}
              {/* <Text
                data-date-format="DD MMMM YYYY" */}
            </Flex>
            <Flex direction="column">
              End Date:
              {/* <DatePicker
                selected={endDate}
                onChange={(date: Date) => setEndDate(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
              /> */}
            </Flex>
          </Flex>
          <Flex direction="row" gap="4">
            <Flex gap="4">Line:</Flex>
            <Flex gap="4">

            </Flex>
          </Flex>
          <Flex direction="row" gap="4">
            <Flex gap="4">Line:</Flex>
            <Flex gap="4">Line:</Flex>
          </Flex>
          <Flex direction="row" gap="4" className='w-full'>
            <Flex gap="4">Line:</Flex>
            <Flex gap="4" className='w-full'>
              <TextArea className='w-full'
                value='' rows={10} name='create_demo' id='create_demo'></TextArea>
            </Flex>
          </Flex>
        </Dialog.Description>

        <Flex gap="3" justify="end">
          <Button variant="soft" color="indigo" onClick={e => {
            dispatch(setIsShowDialog(!isShowDialog))
          }}>
            Save
          </Button>
          <Dialog.Close>
            <Button variant="soft" color="gray" onClick={e => {
              dispatch(setIsShowDialog(!isShowDialog))
            }}>
              Close
            </Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export default CreateDialog