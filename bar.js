#!/usr/bin/env node
const { durations } = require('./common')

const UP = 0
const DOWN = 1

/**
  * @typedef {Object} Category
  * @property {number} label
  * @property {number} start
  * @property {number} close
  * @property {number} high
  * @property {number} low
  * */

/** @type {Map<number, Category>} Map */
const params = new Map()

/** @type {Array.<number>} List of timers */
const intervals = [2, 5, 10]

process.stdin.on('data', (buff) => {
  const price = Number(buff.toString())

  if (isNaN(price)) {
    console.error('received is invalid price:', price)
    return
  }

  /** @type {Object.<number, Category & import('./common').Duration>} */
  let categories = {}

  for (let i = 0; i < intervals.length; i++) {
    const span = durations(intervals[i])

    if (!params.has(intervals[i])) {
      params.set(intervals[i], {
        label: intervals[i],
        start: price,
        close: price,
        high: price,
        low: price
      })
    }

    const category = params.get(intervals[i])

    if (span.timeleft === '00:00') {
      category.start = price
    }

    if (price > category.high) {
      category.high = price
    }

    if (price < category.low) {
      category.low = price
    }

    category.close = price

    categories[intervals[i]] = {
      ...category,
      ...span
    }
  }

  console.log('BAR ->', {
    ...categories,
    price
  })
})
