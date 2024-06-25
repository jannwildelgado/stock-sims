const dayjs = require("dayjs")

/**
  * @typedef {Object} Duration
  * @property {string} startAt - The start time
  * @property {string} next - The next round time
  * @property {string} timeleft - The timeleft from the timer
  * */

/**
  * @example
  * const { durations } = require('./common')
  *
  * console.log(durations(2))
  *
  * @param {number} minutes - How many minutes of durations
  * @param {string=} date - Set the date for the durations
  * @returns {Duration} - Duration of x minutes
  */
function durations(minutes, date) {
  if (!date) {
    date = dayjs().format('YYYY-MM-DD hh:mm:ss')
  }

  const currAt = dayjs(date)
  let startAt = currAt
  let endAt

  if (currAt.minute() % minutes !== 0) {
    startAt = currAt.subtract(currAt.minute() % minutes, "minute")
  }

  startAt = startAt.second(0)
  endAt = startAt.add(minutes, "minute")

  const seconds = endAt.diff(currAt, "second")

  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60

  /** @type {string} */
  let timeleft = [
    mins > 9 ? mins : `0${mins}`,
    secs > 9 ? secs : `0${secs}`
  ].join(':')

  if (mins === minutes && secs === 0) {
    timeleft = "00:00"
  }

  return { 
    currentAt: currAt.format("YYYY-MM-DD hh:mm:ss"),
    startAt: startAt.format("YYYY-MM-DD hh:mm:ss"),
    next: endAt.format("YYYY-MM-DD hh:mm:ss"),
    timeleft
  }
} 

module.exports = {
  durations
}
