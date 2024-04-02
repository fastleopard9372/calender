import moment from "moment"

export interface TPlan {
  color: string | 'indigo'
  width: number | 4
  position?: number
  startDate: moment.Moment,
  endDate: moment.Moment
  demo: string
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