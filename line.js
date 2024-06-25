#!/usr/bin/env node

process.stdin.on('data', (buff) => {
  console.log('LINE ->', buff.toString)
})
