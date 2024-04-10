import moment from "moment"

export interface TPlan {
  color: string | 'indigo'
  width: number | 4
  startDate: moment.Moment,
  endDate: moment.Moment,
  demo: string,
  kind: string,
  title: string,
  user: {
    id: string,
    name: string,
    email: string
  }
}
export interface TScheduleKind {
  id: string,
  name: string,
  avatar: string
}

export interface TOneDay {
  color?: string | 'indigo'
  width: number
  datesCnt?: number
  date: moment.Moment,
  month: number,
  no: number,
  plan?: TPlan[]
}
export default TOneDay;