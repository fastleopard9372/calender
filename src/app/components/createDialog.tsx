'use client'
import React, { useEffect, useState } from 'react'
import { Dialog, Button, Flex, TextArea, TextField, Select, RadioCards } from '@radix-ui/themes'
import DatePicker from "react-datepicker";
import moment from 'moment';
import { TScheduleKind, TPlan } from '../type';
import { useAppDispatch, useAppSelector } from '../redux/hook'
import { setIsShowDialog, getCalender } from '../redux/calenderSlice'
import ColorIcon from './colorIcon';
import LineThickness from './lineThickness';
import Message from "./message"

const CreateDialog = () => {
  const dispatch = useAppDispatch();
  const { isShowDialog, scheduleKind, colors, thickness } = useAppSelector(getCalender);
  const [data, setData] = useState<TPlan>({
    color: 'indigo',
    width: 2,
    startDate: moment(new Date(), "YYYY-MM-DD"),
    endDate: moment(new Date(), "YYYY-MM-DD"),
    demo: "",
    kind: "",
    title: "",
    user: {
      id: "",
      name: "",
      email: "",
    }
  },);
  const [error, setError] = useState({
    message: "",
    open: false
  })

  const handleColorClick = (e: string) => {
    setData({ ...data, color: e })
  }
  const handleLineThicknessClick = (e: number) => {
    setData({ ...data, width: e })
  }
  const handleOpenChange = (open: boolean) => {
    dispatch(setIsShowDialog(open))
  }
  const handleSubmit = () => {
    if (data.endDate.isBefore(data.startDate)) {
      setError({
        message: "End date must be after start date",
        open: true
      })
      return
    }
    if (data.kind == "-1" || data.kind == "") {
      setError({
        message: "Kind must be selected",
        open: true
      })
    }
    if (data.title == "") {
      setError({
        message: "Title must be required",
        open: true
      })
    }
    if (data.demo == "") {
      setError({
        message: "Demo must be required",
        open: true
      })
    }

    dispatch(setIsShowDialog(open))
  }
  const handleStartDateChange = (date: moment.Moment) => {
    console.log(date)
    setData({ ...data, startDate: date })
  }
  const handleEndDateChange = (date: moment.Moment) => {
    setData({ ...data, endDate: date })
  }
  const handleKind = (value: string) => {
    setData({ ...data, kind: value })
  }
  const handleInputChange = (e: any) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  useEffect(() => {
    if (data.kind == "-1") {
      setError({
        message: "Kind must be started",
        open: true
      })
    } else {
      setError({ message: "", open: false })
    }
    if (moment(data.endDate).isBefore(moment(data.startDate))) {
      setError({
        message: "End date must be after start date",
        open: true
      })
    } else {
      setError({ message: "", open: false })
    }
  }, [data])

  return (
    <Dialog.Root open={isShowDialog} onOpenChange={handleOpenChange}>
      <Dialog.Content>
        <Dialog.Title>Create Schedule</Dialog.Title>
        {error.open && <Message message={error.message} />}
        <Dialog.Description className='pb-2'>
          <Flex direction="column" gap="3">
            <Flex direction="row" gap="3">
              <Flex direction="column">
                Start Date:
                <div>
                  <DatePicker
                    selected={data.startDate.toDate()}
                    onChange={(startDate: Date) => handleStartDateChange(moment(startDate))}
                    selectsStart
                    startDate={data.startDate.toDate()}
                    endDate={data.endDate.toDate()}
                  />
                </div>
                {/* <Text
                data-date-format="DD MMMM YYYY" */}
              </Flex>
              <Flex direction="column">
                End Date:
                <div>
                  <DatePicker
                    selected={data.endDate.toDate()}
                    onChange={(endDate: Date) => handleEndDateChange(moment(endDate))}
                    selectsEnd
                    startDate={data.startDate.toDate()}
                    endDate={data.endDate.toDate()}
                    minDate={data.startDate.toDate()}
                  />
                </div>
              </Flex>
              <Flex direction="column" className='w-full'>
                <div >Type:</div>
                <div className='w-full'>
                  <Select.Root defaultValue={"-1"} onValueChange={handleKind}>
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
                <TextField.Root autoFocus={true} size="2" placeholder="Title" name="title" value={data.title} onChange={handleInputChange} />
              </div>
            </Flex>
            <Flex direction="column" className='w-full'>
              <div>Demo:</div>
              <div className='w-full'>
                <TextArea className='w-full'
                  value={data.demo} rows={5} placeholder='Demo' name="demo" onChange={handleInputChange} ></TextArea>
              </div>
            </Flex>
            <Flex direction="column" className='w-full'>
              <div>Line Color:</div>
              <Flex className='row gap-2 flex-wrap w-full'>
                {colors.map((v: string, i: number) => (
                  <ColorIcon value={v} selected={v === data.color} handleClick={handleColorClick} />
                ))}
              </Flex>
            </Flex>
            <Flex direction="column" className='w-full'>
              <div>Line Thickness:</div>
              <Flex className='row gap-2 flex-wrap w-full'>
                <RadioCards.Root className='w-100' defaultValue={thickness[0].toString()} columns={{ initial: '1', sm: '5' }}>
                  {thickness.map((v: number, i: number) => (
                    <LineThickness value={v} color={data.color} handleClick={handleLineThicknessClick} />
                  ))}
                </RadioCards.Root>
              </Flex>
            </Flex>
          </Flex>
        </Dialog.Description>
        <hr />
        <Flex gap="3" justify="end" className='pt-1'>
          <Button variant="soft" color="indigo" onClick={handleSubmit}>
            Submit
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
    </Dialog.Root >
  )
}

export default CreateDialog