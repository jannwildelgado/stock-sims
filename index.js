#!/usr/bin/env node
const _random = require('lodash/random')
const _debounce = require('lodash/debounce')

const MAX = 0.50
const MIN = -0.50

let price = 0

const start = _debounce(() => {
  price += _random(MIN, MAX)

  process.stdout.write(String(price))

  start()
}, 1000)

start()
