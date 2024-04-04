'use client'
import React, { useEffect, useState } from 'react'
import { Popover, Button, Flex, Box, TextArea, Link, Heading } from '@radix-ui/themes'
import { useAppSelector } from '@/app/redux/hook';
import { getCalender } from '@/app/redux/calenderSlice';
import { TPlan } from '../type';
const Comment = () => {
  const { date, plan } = useAppSelector(getCalender);
  const [demo, setDemo] = useState<string>(plan == undefined ? "" : plan[0].demo)
  const handleDemoShow = (i: number) => {
    console.log(plan)
    setDemo(plan == undefined ? "" : plan[i].demo);
  }
  const handleChange = (e: any) => {
    setDemo(e.target.value)
  }
  useEffect(() => {
    if (plan !== undefined) {
      setDemo(plan[0].demo);
    }
  })
  return (
    <>
      <Popover.Content width="640px">
        <Heading size="3" mb="1" style={{ textAlign: 'center' }}>
          {date.format("YYYY-MM-DD")}
        </Heading>
        <Flex gap="3">
          <Flex direction={'column'}>
            {
              plan?.map((v: TPlan, i: number) => {
                if (date.isBetween(v.startDate, v.endDate, "day", "[]")) {
                  return <Link key={i} className='cursor-pointer' onClick={e => handleDemoShow(i)}>Schedule {i + 1}</Link>
                }
              })
            }
          </Flex>
          <Box flexGrow="1">
            <TextArea placeholder="Write a comment…" name='demo' value={demo} style={{ height: 80 }} onChange={handleChange} />
            <Flex gap="3" mt="3" justify="between">
              {/* <Flex align="center" gap="2" asChild>
                <Text as="label" size="2">
                  <Checkbox />
                  <Text>Send to group</Text>
                </Text>
              </Flex> */}

              <Popover.Close>
                <Button size="1">Comment</Button>
              </Popover.Close>
            </Flex>
          </Box>
        </Flex>
      </Popover.Content>
    </>
  )
}

export default Comment