import moment from "moment";

export function UnixMicroToDate(time, format, multiplier) {
  let dateFormat = "MM/DD/YYYY hh:mmA"
  let multipVal = 1

  if (format) {
    dateFormat = format
  }
  if (multiplier) {
    multipVal = multiplier
  }

  return moment.unix((+time*multipVal)).format(dateFormat)
}
