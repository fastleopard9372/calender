'use client'
import React from 'react'
import { IconButton, Flex, Box } from '@radix-ui/themes'
import moment from 'moment'
import TOneDay, { TPlan } from '../type'
import { Josefin_Sans } from 'next/font/google'

const Bar = ({ color, position }: { color: string; position: number; }) => (
  <Box position={'absolute'} style={{
    border: `2px solid ${color}`,
  }} top={`calc(50% + ${position}px)`} width={'100%'} height={'0px'}></Box>
)
const Conner = ({ no, color, position }: { no: number; color?: string; position?: number; }) => {
  let pos = 0;
  let col = 'gray';
  if (position) pos = position
  if (color) col = color
  let radius = 20 + pos
  if (no == 0) {
    return (<Box style={{
      position: 'relative',
      top: pos + 'px',
      borderBottom: `4px solid ${col}`,
      borderLeft: `4px solid ${col}`,
      width: '50%',
      borderRight: 'none',
      borderTop: 'none',
    }}></Box>)
  } else if (no == 1) {
    return (<Box style={{
      position: 'relative',
      top: pos + 'px',
      borderBottom: `4px solid ${col}`,
      borderLeft: `4px solid ${col}`,
      width: '50%',
      borderRight: 'none',
      borderTop: 'none',
    }}></Box>)
  } else if (no == 2) {
    return (<Box style={{
      position: 'relative',
      top: pos + 'px',
      borderBottom: `4px solid ${col}`,
      borderLeft: `4px solid ${col}`,
      width: '50%',
      borderRight: 'none',
      borderTop: 'none',
    }}></Box>)
  } else if (no == 3) {
    return (
      <Box style={{
        position: 'absolute',
        borderTop: `4px solid ${col}`,
        borderLeft: `4px solid ${col}`,
        borderRadius: `10px 0px 0px 0px`,
        width: `calc(100% + ${pos}px)`,
        height: '60%',
        left: `${-pos}px`,
        top: `calc(50% - 2px + ${pos}px)`,
        borderRight: 'none',
        borderBottom: 'none',
      }}></Box>
    )
  } else if (no == 4) {
    return (<Box style={{
      position: 'absolute',
      borderBottom: `4px solid ${col}`,
      borderLeft: `4px solid ${col}`,
      // borderRadius: `0px 0px 0px calc(10px + ${pos}px`,
      borderRadius: `0px 0px 0px 10px`,
      width: `calc(100% + ${pos}px)`,
      left: `${-pos}px`,
      height: '50%',
      bottom: `calc(50% - 2px - ${pos}px)`,
      borderRight: 'none',
      borderTop: 'none',
    }}></Box>)
  } else if (no == 5) {
    return (<Box style={{
      position: 'relative',
      borderTop: `4px solid ${col}`,
      borderRight: `4px solid ${col}`,
      borderRadius: '0px 10px 0px 0px',
      width: '50%',
      height: '60%',
      top: 'calc(30% - 2px)',
      borderLeft: 'none',
      borderBottom: 'none',
    }}></Box>)
  }
  return (<Box style={{
    position: 'relative',
    borderBottom: `4px solid ${col}`,
    borderRight: `4px solid ${col}`,
    borderRadius: '0px 0px 10px 0px',
    width: '50%',
    height: '50%',
    top: 'calc(-25% + 2px)',
    borderLeft: 'none',
    borderTop: 'none',
  }}></Box>)
}
const OneDay = (prop: TOneDay) => {
  const { no, date, month, datesCnt, plan, width, color } = prop;
  const sort_plan = plan?.sort((a, b) => a.startDate.isBefore(b.startDate) ? -1 : 1)
  let cornerL = null
  let cornerR = null
  let k = no;
  if (~~(no / 7) % 2) k = ~~(no / 7) * 7 + (6 - no % 7)
  if (no == 0) {
    cornerL = Conner({ no: 1 });
  } else if (datesCnt == no + 1) {
    if (~~(datesCnt / 7) % 2) {
      cornerR = Conner({ no: 1 })
    } else {
      cornerL = Conner({ no: 2 })
    }
  } else if (no % 14 == 13) {
    let pos = 0;
    let connerPlan = sort_plan?.map((v: TPlan, i: number) => {
      pos += v.width;
      if (date.isBetween(v.startDate, v.endDate, 'day', "[]")) {
        return Conner({ no: 3, color: v.color, position: pos })
      } else return <></>
    })
    cornerL = <Box style={{
      position: 'relative',
      width: '50%',
      height: '100%',
    }} > {Conner({ no: 3 })}{connerPlan}</ Box>
  } else if (no % 14 == 0) {
    // cornerL = Conner({ no: 4 })
    let pos = 0;
    let connerPlan = sort_plan?.map((v: TPlan, i: number) => {
      pos += v.width;
      if (date.isBetween(v.startDate, v.endDate, 'day', "[]")) {
        return Conner({ no: 4, color: v.color, position: pos })
      } else return <></>
    })
    cornerL = <Box style={{
      position: 'relative',
      width: '50%',
      height: '100%',
    }} > {Conner({ no: 4 })}{connerPlan}</ Box>
  } else if (no % 14 == 6) {
    cornerR = Conner({ no: 5 })
  } else if (no % 14 == 7) {
    cornerR = Conner({ no: 6 })
  }
  let pos = (width == undefined ? -2 : -width / 2)
  const main_width = -pos;

  const planBarL = sort_plan?.map((v: TPlan, i: number) => {
    pos += v.width;
    if (~~(no / 7) % 2 == 1) {
      if (date.isSame(v.startDate, 'day')) {
        return <Bar color={v.color} position={pos} />;
      }
    }
    else {
      if (date.isSame(v.endDate, 'day')) {
        return <Bar color={v.color} position={pos} />;
      }
    }
    if (date.isBetween(v.startDate, v.endDate, 'day')) {
      return <Bar color={v.color} position={pos} />;
    } else {
      return null;
    }
  });

  pos = (width == undefined ? -2 : -width / 2)
  const planBarR = sort_plan?.map((v: TPlan, i: number) => {
    pos += v.width;
    if (~~(no / 7) % 2 == 0) {
      if (date.isSame(v.startDate, 'day')) {
        return <Bar color={v.color} position={pos} />;
      }
    }
    else {
      if (date.isSame(v.endDate, 'day')) {
        return <Bar color={v.color} position={pos} />;
      }
    }
    if (date.isBetween(v.startDate, v.endDate, 'day')) {
      return <Bar color={v.color} position={pos} />;
    } else {
      return null;
    }
  });
  let dateColor = 'white';
  if (date.isSame(moment(), 'day')) {
    dateColor = 'coral';
  }
  return (
    <Flex align={'center'} position={'relative'}>
      <IconButton
        className={`!absolute !z-50 ${dateColor} cursor-pointer`}
        style={{ left: 'calc(50% - 20px)', backgroundColor: dateColor }}
        size="3" radius="full" variant="outline" color={date.month() === month ? 'indigo' : 'gray'}
        highContrast={date.month() === month} >
        {date.date()}
      </IconButton>
      {cornerL}
      {cornerL == null &&
        (<Box position={'relative'} width={'50%'}>
          <Box style={{
            border: `${main_width}px solid gray`,
          }} width={'100%'} height={'0px'}></Box>
          <>{planBarL}</>
        </Box>)
      }
      {cornerR == null && (
        <Box position={'relative'} width={'50%'}>
          <Box style={{
            border: `${main_width}px solid gray`,
          }} width={'100%'} height={'0px'}></Box>
          <>{planBarR}</>
        </Box>)
      }
      {cornerR}
    </Flex >
  )
}

export default OneDay