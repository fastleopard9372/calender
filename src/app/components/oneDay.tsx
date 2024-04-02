'use client'
import React from 'react'
import { IconButton, Flex, Box } from '@radix-ui/themes'
import moment from 'moment'
import TOneDay, { TPlan } from '../type'
const OneDay = (prop: TOneDay) => {
  const { no, date, month, datesCnt, plan, width, color } = prop;
  const sort_plan = plan?.sort((a, b) => a.startDate.diff(b.startDate, "days"))
  let cornerL = <></>
  let cornerR = <></>
  let k = no;
  if (~~(no / 7) % 2) k = ~~(no / 7) * 7 + (6 - no % 7)
  if (no == 0) {
    cornerL = <Box style={{
      position: 'relative',
      borderBottom: '4px solid gray',
      borderLeft: '4px solid gray',
      width: '50%',
      borderRight: 'none',
      borderTop: 'none',
    }}></Box>
  } else if (datesCnt == no + 1) {
    if (~~(datesCnt / 7) % 2) {
      cornerR = <Box style={{
        position: 'relative',
        borderBottom: '4px solid gray',
        borderLeft: '4px solid gray',
        width: '50%',
        borderRight: 'none',
        borderTop: 'none',
      }}></Box>
    } else {
      cornerL = <Box style={{
        position: 'relative',
        borderBottom: '4px solid gray',
        borderLeft: '4px solid gray',
        width: '50%',
        borderRight: 'none',
        borderTop: 'none',
      }}></Box>
    }
  } else if (no % 14 == 13) {
    cornerL = <Box style={{
      position: 'relative',
      borderTop: '4px solid gray',
      borderLeft: '4px solid gray',
      borderRadius: '20px 0px 0px 0px',
      width: '50%',
      height: '60%',
      top: 'calc(30% - 2px)',
      borderRight: 'none',
      borderBottom: 'none',
    }}></Box>
  } else if (no % 14 == 0) {
    cornerL = <Box style={{
      position: 'relative',
      borderBottom: '4px solid gray',
      borderLeft: '4px solid gray',
      borderRadius: '0px 0px 0px 20px',
      width: '50%',
      height: '50%',
      top: 'calc(-25% + 2px)',
      borderRight: 'none',
      borderTop: 'none',
    }}></Box>
  } else if (no % 14 == 6) {
    cornerR = <Box style={{
      position: 'relative',
      borderTop: '4px solid gray',
      borderRight: '4px solid gray',
      borderRadius: '0px 20px 0px 0px',
      width: '50%',
      height: '60%',
      top: 'calc(30% - 2px)',
      borderLeft: 'none',
      borderBottom: 'none',
    }}></Box>
  } else if (no % 14 == 7) {
    cornerR = <Box style={{
      position: 'relative',
      borderBottom: '4px solid gray',
      borderRight: '4px solid gray',
      borderRadius: '0px 0px 20px 0px',
      width: '50%',
      height: '50%',
      top: 'calc(-25% + 2px)',
      borderLeft: 'none',
      borderTop: 'none',
    }}></Box>
  }
  console.log(date.format("YYYY-MM-DD"))
  let pos = (width == undefined ? -2 : -width / 2)
  const main_width = -pos;
  const planBar = sort_plan?.map((v: TPlan, i: number) => {
    pos += v.width;
    if (date.diff(v.startDate, 'days') > 0 && v.endDate.diff(date, 'days') > 0)
      return <Box position={'absolute'} style={{
        border: `2px solid ${v.color}`,
      }} top={`calc(50% + ${pos}px)`} width={'100%'} height={'0px'}></Box>
    else
      return <></>
  })

  let dateColor = 'white';
  if (date.diff(moment(new Date(), "MM-DD-YYYY"), 'days') == 0)
    dateColor = 'coral';
  return (
    <Flex align={'center'} position={'relative'}>
      <IconButton
        className={`!absolute !z-50 ${dateColor}`}
        style={{ left: 'calc(50% - 20px)', backgroundColor: dateColor }}
        size="3" radius="full" variant="outline" color={date.month() === month ? 'indigo' : 'gray'}
        highContrast={date.month() === month} >
        {date.date()}
      </IconButton>
      {cornerL}
      <Box position={'relative'} width={'50%'}>
        <Box style={{
          border: `${main_width}px solid gray`,
        }} width={'100%'} height={'0px'}></Box>
        <>{planBar}</>
      </Box>
      <Box position={'relative'} width={'50%'}>
        <Box style={{
          border: `${main_width}px solid gray`,
        }} width={'100%'} height={'0px'}></Box>
        <>{planBar}</>
      </Box>
      {cornerR}
    </Flex >
  )
}

export default OneDay