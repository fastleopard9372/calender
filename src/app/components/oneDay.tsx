'use client'
import React from 'react'
import { IconButton, Flex, Box, Popover } from '@radix-ui/themes'
import moment from 'moment'

import { useAppDispatch } from '@/app/redux/hook';
import { setDate, setPlan } from '@/app/redux/calenderSlice';

import TOneDay, { TPlan } from '../type'
import Comment from './comment'

const Bar = ({ color, width, position }: { color: string; position: number; width?: number }) => {

  const wid = width == undefined ? 2 : width
  return <Box position={'absolute'} style={{
    border: `${wid / 2}px solid ${color}`,
  }} top={`calc(50% + ${position}px)`} width={'100%'} height={'0px'}></Box>
}
const Conner = ({ no, width, color, position }: { no: number; width?: number; color?: string; position?: number; }) => {
  let pos = 0;
  let col = 'gray';
  let wid = 2;
  if (width) wid = width
  if (position) pos = position
  if (color) col = color
  if (no == 0) {
    return (<Box style={{
      position: 'absolute',
      top: `calc(50% - ${wid / 2}px + ${pos}px)`,
      borderBottom: `${wid}px solid ${col}`,
      borderLeft: `${wid}px solid ${col}`,
      width: '100%',
      borderRight: 'none',
      borderTop: 'none',
    }}></Box>)
  } else if (no == 1) {
    return (<Box style={{
      position: 'absolute',
      top: `calc(50% - ${wid / 2}px + ${pos}px)`,
      borderBottom: `${wid}px solid ${col}`,
      borderLeft: `${wid}px solid ${col}`,
      width: '100%',
      borderRight: 'none',
      borderTop: 'none',
    }}></Box>)
  } else if (no == 2) {
    return (<Box style={{
      position: 'relative',
      top: pos + 'px',
      borderBottom: `${wid}px solid ${col}`,
      borderLeft: `${wid}px solid ${col}`,
      width: '50%',
      borderRight: 'none',
      borderTop: 'none',
    }}></Box>)
  } else if (no == 3) {
    return (
      <Box style={{
        position: 'absolute',
        borderTop: `${wid}px solid ${col}`,
        borderLeft: `${wid}px solid ${col}`,
        borderRadius: `10px 0px 0px 0px`,
        width: `calc(100% + ${pos}px)`,
        height: '80%',
        left: `${-pos}px`,
        top: `calc(50% - ${wid / 2}px + ${pos}px)`,
        borderRight: 'none',
        borderBottom: 'none',
      }}></Box>
    )
  } else if (no == 4) {
    return (<Box style={{
      position: 'absolute',
      borderBottom: `${wid}px solid ${col}`,
      borderLeft: `${wid}px solid ${col}`,
      borderRadius: `0px 0px 0px 10px`,
      width: `calc(100% + ${pos}px)`,
      left: `${-pos}px`,
      height: '50%',
      bottom: `calc(50% - ${wid / 2}px - ${pos}px)`,
      borderRight: 'none',
      borderTop: 'none',
    }}></Box>)
  } else if (no == 5) {
    return (<Box style={{
      position: 'absolute',
      borderTop: `${wid}px solid ${col}`,
      borderRight: `${wid}px solid ${col}`,
      borderRadius: '0px 10px 0px 0px',
      width: `calc(100% + ${pos}px)`,
      height: '60%',
      top: `calc(50% - ${wid / 2}px + ${pos}px)`,
      borderLeft: 'none',
      borderBottom: 'none',
    }}></Box>)
  } else {
    return (<Box style={{
      position: 'absolute',
      borderBottom: `${wid}px solid ${col}`,
      borderRight: `${wid}px solid ${col}`,
      borderRadius: '0px 0px 10px 0px',
      width: `calc(100% + ${pos}px)`,
      height: '50%',
      bottom: `calc(50% - ${wid / 2}px - ${pos}px)`,
      borderLeft: 'none',
      borderTop: 'none',
    }}></Box>)
  }
}
const OneDay = (prop: TOneDay) => {
  const dispatch = useAppDispatch();
  const { no, date, month, datesCnt, plan, width, color } = prop;

  const handleIconButton = ({ date, plan }: { date: moment.Moment, plan: TPlan[] | undefined }) => {
    dispatch(setPlan(plan));
    dispatch(setDate(date));
  }
  const sort_plan: TPlan[] | undefined = plan?.sort((a, b) => a.startDate.isBefore(b.startDate) ? -1 : 1);
  let cornerL = null
  let cornerR = null
  let k = no;
  if (~~(no / 7) % 2) k = ~~(no / 7) * 7 + (6 - no % 7)
  if (no == 0) {
    let pos = -width / 2;
    let connerPlan = sort_plan?.map((v: TPlan, i: number) => {
      pos += v.width;
      if (date.isBetween(v.startDate, v.endDate, 'day', "[)")) {
        return Conner({ no: 0, width: v.width, color: v.color, position: pos - v.width / 2 })
      } else return <></>
    })
    cornerL = <Box style={{
      position: 'relative',
      width: '50%',
      height: '100%',
    }} > {Conner({ no: 0, width })}{connerPlan}</ Box>

  } else if (datesCnt == no + 1) {

    let pos = -width / 2;
    let connerPlan = sort_plan?.map((v: TPlan, i: number) => {
      pos += v.width;
      if (date.isBetween(v.startDate, v.endDate, 'day', "[)")) {
        return Conner({ no: 1, width: v.width, color: v.color, position: pos - v.width / 2 })
      } else return <></>
    })
    if (~~(datesCnt / 7) % 2) {
      // cornerR = Conner({ no: 1, width })
      cornerR = <Box style={{
        position: 'relative',
        width: '50%',
        height: '100%',
      }} > {Conner({ no: 1, width })}{connerPlan}</ Box>
    } else {
      // cornerL = Conner({ no: 2, width })
      cornerL = <Box style={{
        position: 'relative',
        width: '50%',
        height: '100%',
      }} > {Conner({ no: 1, width })}{connerPlan}</ Box>
    }


  } else if (no % 14 == 13) {
    let pos = -width / 2;
    let connerPlan = sort_plan?.map((v: TPlan, i: number) => {
      pos += v.width;
      if (date.isBetween(v.startDate, v.endDate, 'day', "[)")) {
        return Conner({ no: 3, width: v.width, color: v.color, position: pos - v.width / 2 })
      } else return <></>
    })
    cornerL = <Box style={{
      position: 'relative',
      width: '50%',
      height: '100%',
    }} > {Conner({ no: 3, width })}{connerPlan}</ Box>
  } else if (no % 14 == 0) {
    let pos = -width / 2;
    let connerPlan = sort_plan?.map((v: TPlan, i: number) => {
      pos += v.width;
      if (date.isBetween(v.startDate, v.endDate, 'day', "(]")) {
        return Conner({ no: 4, width: v.width, color: v.color, position: pos - v.width / 2 })
      } else return <></>
    })
    cornerL = <Box style={{
      position: 'relative',
      width: '50%',
      height: '100%',
    }} > {Conner({ no: 4, width })}{connerPlan}</ Box>
  } else if (no % 14 == 6) {
    let pos = -width / 2;
    let connerPlan = sort_plan?.map((v: TPlan, i: number) => {
      pos += v.width;
      if (date.isBetween(v.startDate, v.endDate, 'day', "[)")) {
        return Conner({ no: 5, width: v.width, color: v.color, position: pos - v.width / 2 })
      } else return <></>
    })
    cornerR = <Box style={{
      position: 'relative',
      width: '50%',
      height: '100%',
    }} > {Conner({ no: 5, width })}{connerPlan}</ Box>

  } else if (no % 14 == 7) {
    let pos = -width / 2;
    let connerPlan = sort_plan?.map((v: TPlan, i: number) => {
      pos += v.width;
      if (date.isBetween(v.startDate, v.endDate, 'day', "(]")) {
        return Conner({ no: 6, width: v.width, color: v.color, position: pos - v.width / 2 })
      } else return <></>
    })
    cornerR = <Box style={{
      position: 'relative',
      width: '50%',
      height: '100%',
    }} > {Conner({ no: 6, width })}{connerPlan}</ Box>
  }
  let pos = -(width == undefined ? 1 : width / 2);
  const main_width = (width == undefined ? 1 : width / 2);

  let planDay = false;
  const planBarL = sort_plan?.map((v: TPlan, i: number) => {
    pos += v.width;
    if (date.isSame(v.startDate) || date.isSame(v.endDate)) {
      planDay = true;
    }
    if (v.startDate.isSame(v.endDate) && date.isSame(v.startDate)) {
      planDay = true;
      return <></>;
    }
    if (~~(no / 7) % 2 == 1) {
      if (date.isSame(v.startDate, 'day')) {
        return <Bar color={v.color} position={pos - v.width} width={v.width} />;
      }
    }
    else {
      if (date.isSame(v.endDate, 'day')) {
        return <Bar color={v.color} position={pos - v.width} width={v.width} />;
      }
    }
    if (date.isBetween(v.startDate, v.endDate, 'day')) {
      return <Bar color={v.color} position={pos - v.width} width={v.width} />;
    } else {
      return null;
    }
  });

  pos = -(width == undefined ? 1 : width / 2);
  const planBarR = sort_plan?.map((v: TPlan, i: number) => {
    pos += v.width;
    if (v.startDate.isSame(v.endDate)) {
      return <></>;
    }
    if (~~(no / 7) % 2 == 0) {
      if (date.isSame(v.startDate, 'day')) {
        return <Bar color={v.color} position={pos - v.width} width={v.width} />;
      }
    }
    else {
      if (date.isSame(v.endDate, 'day')) {
        return <Bar color={v.color} position={pos - v.width} width={v.width} />;
      }
    }
    if (date.isBetween(v.startDate, v.endDate, 'day')) {
      return <Bar color={v.color} position={pos - v.width} width={v.width} />;
    } else {
      return null;
    }
  });

  let dateColor = 'white';
  let buttonBorderColor: any = "gray";
  if (date.month() === month) buttonBorderColor = 'indigo'
  if (planDay) buttonBorderColor = "red"
  if (date.isSame(moment(), 'day')) {
    dateColor = 'coral';
  } else if (sort_plan) {
  }

  return (
    <Flex align={'center'} position={'relative'}>
      <Popover.Root>
        <Popover.Trigger className={`!absolute !z-50  cursor-pointer`}>
          <IconButton
            className={` ${dateColor} cursor-pointer border-2 !font-medium`}
            style={{ left: 'calc(50% - 20px)', backgroundColor: dateColor }}
            size="3" radius="full" variant="outline" color={buttonBorderColor} // highContrast={date.month() === month} 
            onClick={e => handleIconButton({ date, plan: sort_plan })}
          >
            {date.date()}
          </IconButton>
        </Popover.Trigger>
        {<Comment />}
      </Popover.Root>

      {cornerL}
      {
        cornerL == null &&
        (<Box position={'relative'} width={'50%'}>
          <Box style={{
            border: `${main_width}px solid gray`,
          }} width={'100%'} height={'0px'}></Box>
          <>{planBarL}</>
        </Box>)
      }
      {
        cornerR == null && (
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