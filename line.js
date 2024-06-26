#!/usr/bin/env node
const { durations } = require('./common')

/**
  * @typedef {Object} Category
  * @property {number} label
  * @property {number} price
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
        price: price
      })
    }

    const category = params.get(intervals[i])

    category.price = price

    categories[intervals[i]] = {
      ...category,
      ...span
    }
  }

  console.log('LINE ->', {
    ...categories,
    price
  })
})
