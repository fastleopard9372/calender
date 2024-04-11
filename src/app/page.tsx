'use client'
import { useEffect, useState } from 'react'
import Calender from "./pages/calender";
import MenuBar from "./components/menuBar";
import Header from "@/app/layout/header";
import { Animate } from 'react-simple-animate';
import TaskCreate from "./components/taskCreate";
import { getCalender, setDate } from "./redux/calenderSlice";
import { useAppSelector, useAppDispatch } from "./redux/hook";

export default function Home() {
  const dispatch = useAppDispatch();
  const date = useAppSelector(getCalender).date;
  const kind = useAppSelector(getCalender).kind;
  const [isScrolling, setIsScrolling] = useState(false);
  const [direction, setDirection] = useState(0);
  const [play, setPlay] = useState(true);
  let scrollTimer: any;

  const handleWheel = (e: any) => {
    setIsScrolling(true);
    clearTimeout(scrollTimer);
    setDirection(e.deltaY / Math.abs(e.deltaY));
    setPlay(false);
    scrollTimer = setTimeout(() => {
      setIsScrolling(false);
      setPlay(true);
    }, 400);
  };
  useEffect(() => {
    if (!isScrolling) {
      let kd: moment.unitOfTime.DurationConstructor = "days";
      if (kind == "week") kd = "days";
      else kd = "months";
      dispatch(setDate(date.clone().add(direction, kd)));
    }
  }, [isScrolling, direction, kind])
  console.log(date.format("YYYY-MM-DD"))
  return (
    <div className="container mx-auto px-4" onWheel={handleWheel}>
      <Header />
      <TaskCreate />
      <div className='relative overflow-hidden'>
        <Animate
          play={false}
          start={{ transform: 'translate(0, 0)' }}
          end={{ transform: 'translate(0, 0)' }}
          duration={0.5}
          render={({ style }) => <div style={style}><Calender date={date} /></div>}
        />
      </div>
      {/* <MenuBar /> */}
    </div >
  );
}
