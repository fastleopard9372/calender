'use client'
import React, { useEffect, useState } from 'react'
import { Dialog, Button, Flex, TextArea, TextField, Select, RadioCards } from '@radix-ui/themes'
import DatePicker from "react-datepicker";
import moment from 'moment';
import { TScheduleKind, TPlan } from '../type';
import { useAppDispatch, useAppSelector } from '../redux/hook'
import { setIsShowDialog, getCalender, setNewPlan } from '../redux/calenderSlice'
import ColorIcon from './colorIcon';
import LineThickness from './lineThickness';
import Message from "./message"

const TaskCreate = () => {
  const dispatch = useAppDispatch();
  const { isShowDialog, scheduleKind, colors, thickness, newPlan, action } = useAppSelector(getCalender);

  const [error, setError] = useState({
    message: "",
    open: false
  })

  const handleColorClick = (e: string) => {
    dispatch(setNewPlan({ ...newPlan, color: e }))
  }
  const handleLineThicknessClick = (e: number) => {
    dispatch(setNewPlan({ ...newPlan, width: e }))
  }
  const handleOpenChange = (open: boolean) => {
    dispatch(setIsShowDialog(open))
  }
  const handleSubmit = () => {
    if (newPlan.endDate.isBefore(newPlan.startDate)) {
      setError({
        message: "End date must be after start date",
        open: true
      })
      return
    }
    if (newPlan.kind == "-1" || newPlan.kind == "") {
      setError({
        message: "Kind must be selected",
        open: true
      })
    }
    if (newPlan.title == "") {
      setError({
        message: "Title must be required",
        open: true
      })
    }
    if (newPlan.demo == "") {
      setError({
        message: "Demo must be required",
        open: true
      })
    }

    dispatch(setIsShowDialog(open))
  }
  const handleStartDateChange = (date: moment.Moment) => {
    dispatch(setNewPlan({ ...newPlan, startDate: date }))
  }
  const handleEndDateChange = (date: moment.Moment) => {
    dispatch(setNewPlan({ ...newPlan, endDate: date }))
  }
  const handleKind = (value: string) => {
    dispatch(setNewPlan({ ...newPlan, kind: value }))
  }
  const handleInputChange = (e: any) => {
    dispatch(setNewPlan({ ...newPlan, [e.target.name]: e.target.value }))
  }

  useEffect(() => {
    if (newPlan.kind == "-1") {
      setError({
        message: "Kind must be started",
        open: true
      })
    } else {
      setError({ message: "", open: false })
    }
    if (moment(newPlan.endDate).isBefore(moment(newPlan.startDate))) {
      setError({
        message: "End date must be after start date",
        open: true
      })
    } else {
      setError({ message: "", open: false })
    }
  }, [newPlan])
  return (
    <Dialog.Root open={isShowDialog} onOpenChange={handleOpenChange}>
      <Dialog.Content>
        <Dialog.Title>{action} Schedule</Dialog.Title>
        {error.open && <Message message={error.message} />}
        <Dialog.Description className='pb-2'>
          <Flex direction="column" gap="3">
            <Flex direction="row" gap="3">
              <Flex direction="column">
                Start Date:
                <div>
                  <DatePicker
                    selected={newPlan.startDate.toDate()}
                    onChange={(startDate: Date) => handleStartDateChange(moment(startDate))}
                    selectsStart
                    startDate={newPlan.startDate.toDate()}
                    endDate={newPlan.endDate.toDate()}
                  />
                </div>
                {/* <Text
                data-date-format="DD MMMM YYYY" */}
              </Flex>
              <Flex direction="column">
                End Date:
                <div>
                  <DatePicker
                    selected={newPlan.endDate.toDate()}
                    onChange={(endDate: Date) => handleEndDateChange(moment(endDate))}
                    selectsEnd
                    startDate={newPlan.startDate.toDate()}
                    endDate={newPlan.endDate.toDate()}
                    minDate={newPlan.startDate.toDate()}
                  />
                </div>
              </Flex>
              <Flex direction="column" className='w-full'>
                <div >Type:</div>
                <div className='w-full'>
                  <Select.Root defaultValue={newPlan.kind} value={newPlan.kind} onValueChange={handleKind}>
                    <Select.Trigger />
                    <Select.Content>
                      <Select.Item value={"-1"}>-SELECT-</Select.Item>
                      <Select.Group>
                        {scheduleKind.map((v: TScheduleKind, i: number) => (
                          <Select.Item key={i} value={v.id}>{v.name}</Select.Item>
                        ))}
                      </Select.Group>
                    </Select.Content>
                  </Select.Root>
                </div>
              </Flex>
            </Flex>
            <Flex direction="column">
              <div>Title:</div>
              <div>
                <TextField.Root autoFocus={true} size="2" placeholder="Title" name="title" value={newPlan.title} onChange={handleInputChange} />
              </div>
            </Flex>
            <Flex direction="column" className='w-full'>
              <div>Demo:</div>
              <div className='w-full'>
                <TextArea className='w-full'
                  value={newPlan.demo} rows={5} placeholder='Demo' name="demo" onChange={handleInputChange} ></TextArea>
              </div>
            </Flex>
            <Flex direction="column" className='w-full'>
              <div>Line Color:</div>
              <Flex className='row gap-2 flex-wrap w-full'>
                {colors.map((v: string, i: number) => (
                  <ColorIcon value={v} selected={v === newPlan.color} handleClick={handleColorClick} />
                ))}
              </Flex>
            </Flex>
            <Flex direction="column" className='w-full'>
              <div>Line Thickness:</div>
              <Flex className='row gap-2 flex-wrap w-full'>
                <RadioCards.Root className='w-100' defaultValue={newPlan.width.toString()} columns={{ initial: '1', sm: '5' }}>
                  {thickness.map((v: number, i: number) => (
                    <LineThickness value={v} color={newPlan.color} handleClick={handleLineThicknessClick} />
                  ))}
                </RadioCards.Root>
              </Flex>
            </Flex>
          </Flex>
        </Dialog.Description>
        <hr />
        <Flex gap="3" justify="end" className='pt-2'>
          <Button radius='full' color="indigo" onClick={handleSubmit}>
            Submit
          </Button>
          <Dialog.Close>
            <Button radius='full' color="gray" onClick={e => {
              dispatch(setIsShowDialog(!isShowDialog))
            }}>
              Close
            </Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root >
  )
}

export default TaskCreate