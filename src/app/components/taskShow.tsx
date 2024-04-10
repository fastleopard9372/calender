'use client'
import React, { useEffect, useState } from 'react'
import { Popover, Button, Flex, Link, Heading, Text, IconButton, AlertDialog } from '@radix-ui/themes'
import { Pencil1Icon, Cross2Icon, TrashIcon } from '@radix-ui/react-icons'
import { useAppSelector } from '@/app/redux/hook';
import { getCalender } from '@/app/redux/calenderSlice';
import { TPlan } from '../type';

function cutString(str: string) {
  if (str.length > 10) {
    return str.substring(0, 10) + " ...";
  }
  return str;
}

const TaskShow = () => {
  const { date, plan } = useAppSelector(getCalender);
  const [data, setData] = useState<TPlan | null>(plan == undefined ? null : plan[0])
  const handleDataShow = (i: number) => {
    setData(plan == undefined ? null : plan[i]);

  }
  useEffect(() => {
    if (plan !== undefined) {
      setData(plan[0]);
    }
  }, [plan])
  return (
    <>
      <Popover.Content maxWidth="800px" className='max-lg:w-[480px] w-[600px]'>
        <Flex direction="row">
          <div className='flex-grow font-bold text-lg' style={{ textAlign: 'center' }}>
            {date.format("YYYY-MM-DD")}
          </div>
          <Flex className='justify-end gap-1 pb-1'>
            <IconButton size="2" radius='full' variant="soft" className='cursor-pointer'><Pencil1Icon /></IconButton>
            <AlertDialog.Root>
              <AlertDialog.Trigger>
                <IconButton size="2" radius='full' variant="soft" className='cursor-pointer'><TrashIcon /></IconButton>
              </AlertDialog.Trigger>
              <AlertDialog.Content maxWidth="450px">
                <AlertDialog.Title>Information</AlertDialog.Title>
                <AlertDialog.Description size="2">
                  Do you remove this task really?
                </AlertDialog.Description>
                <Flex gap="3" mt="4" justify="end">
                  <AlertDialog.Cancel>
                    <Button variant="soft" color="gray" radius='full' className='cursor-pointer'>
                      Cancel
                    </Button>
                  </AlertDialog.Cancel>
                  <AlertDialog.Action>
                    <Button variant="solid" color="red" radius='full' className='cursor-pointer'>
                      &nbsp;Yes &nbsp;
                    </Button>
                  </AlertDialog.Action>
                </Flex>
              </AlertDialog.Content>
            </AlertDialog.Root>
            <Popover.Close>
              <IconButton size="2" radius='full' variant="soft" className='cursor-pointer'><Cross2Icon /></IconButton>
            </Popover.Close>
          </Flex>
        </Flex>

        <Flex gap="3">
          <Flex direction="column" className='rounded shadow p-2'>
            <Text className='font-bold'>Task List</Text>
            <hr />
            <Flex direction="column" >
              {
                plan?.map((v: TPlan, i: number) => {
                  if (date.isBetween(v.startDate, v.endDate, "day", "[]")) {
                    return <Link key={i} className='cursor-pointer' onClick={e => handleDataShow(i)}>{cutString(v.title)}</Link>
                  }
                })
              }
            </Flex>
          </Flex>
          <Flex flexGrow="1" direction={"column"} gap={"2"} className='rounded shadow p-2'>
            <Flex direction={"column"} className='text-base font-medium'>
              {data?.title}
              <div style={{ backgroundColor: data?.color, height: data?.width, }} className='w-100'></div>
            </Flex>
            <Flex direction={"column"} style={{ minHeight: "150px" }}>{data?.demo}</Flex>
            <Flex direction={"column"} className='text-sm' style={{ color: 'gray ' }}>
              {
                data?.endDate.isSame(data.startDate) ?
                  `${data?.startDate.format("YYYY-MM-DD")}` :
                  `${data?.startDate.format("YYYY-MM-DD")} ~ ${data?.endDate.format("YYYY-MM-DD")} (${data?.endDate.diff(data?.startDate, 'days')} days)`
              }
            </Flex>
          </Flex>
        </Flex>
      </Popover.Content >
    </>
  )
}

export default TaskShow