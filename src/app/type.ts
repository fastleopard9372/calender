import moment from "moment"

export interface TPlan {
  color?: string | 'indigo'
  width?: number | string | "4px"
  position?: number
  startDate?: moment.Moment,
  endDate?: moment.Moment
  description?: string
}

export interface TOneDay {
  color?: string | 'indigo'
  width?: number | string | "4px"
  datesCnt?: number
  date: moment.Moment,
  month: number,
  no: number,
  plan?: TPlan[]
}
export default TOneDay;